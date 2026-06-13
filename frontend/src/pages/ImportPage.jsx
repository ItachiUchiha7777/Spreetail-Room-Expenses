import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function ImportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const groupId = parseInt(id);

  const [group, setGroup] = useState(null);
  const [file, setFile] = useState(null);
  const [csvContent, setCsvContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Staged import states
  const [batch, setBatch] = useState(null);
  const [processedRows, setProcessedRows] = useState([]);
  const [usdRate, setUsdRate] = useState('83.0');

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await api.get(`/groups/${groupId}`);
        setGroup(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch group details.');
      }
    };
    fetchGroup();
  }, [groupId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (evt) => {
        setCsvContent(evt.target.result);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!csvContent) {
      setError('Please select a CSV file first.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');
    setBatch(null);

    try {
      const res = await api.post('/import/upload', {
        csvContent,
        filename: file.name,
        groupId
      });

      setBatch(res.data.batch);
      setProcessedRows(res.data.processedRows);
      setSuccess('CSV successfully analyzed! Please review the anomalies below.');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to upload and analyze CSV file.');
    } finally {
      setUploading(false);
    }
  };

  // Human-in-the-loop: Update properties on specific processed rows before commit
  const updateRowField = (rowIndex, field, value) => {
    setProcessedRows(prev => prev.map(row => {
      if (row.rowIndex === rowIndex) {
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  // Commit the resolved rows to the database
  const handleCommit = async () => {
    if (!batch) return;
    setCommitting(true);
    setError('');

    // Check if there are outstanding requirements
    // e.g. check if any non-rejected row still has a blank resolvedPayer
    const activeRows = processedRows.filter(r => !r.rejected);
    const missingPayers = activeRows.filter(r => !r.resolvedPayer);

    if (missingPayers.length > 0) {
      setError(`Please resolve missing payers for rows: ${missingPayers.map(r => r.rowRef).join(', ')}.`);
      setCommitting(false);
      return;
    }

    try {
      await api.post(`/import/commit/${batch.id}`, {
        usdRate: parseFloat(usdRate),
        resolvedRows: processedRows,
        groupId
      });

      setSuccess('CSV Import completed and committed to database successfully!');
      // Navigate back to group page after a brief delay
      setTimeout(() => {
        navigate(`/group/${groupId}`);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to commit import transaction.');
    } finally {
      setCommitting(false);
    }
  };

  if (!group) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '5rem' }}>
        Loading import wizard...
      </div>
    );
  }

  // Check if foreign currencies exist in the uploaded sheet
  const hasForeignCurrency = processedRows.some(row => row.resolvedCurrency !== 'INR');

  return (
    <div className="container animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <Link to={`/group/${groupId}`} style={{ color: 'var(--primary-hover)', textDecoration: 'none', fontWeight: '600' }}>
          ← Back to Group Workspace
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem', fontFamily: 'var(--font-title)' }}>
          CSV Import Wizard
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Import standard CSV sheets, verify row-level consistency, and resolve anomalies.
        </p>
      </div>

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: 'var(--danger-hover)',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: 'var(--secondary-hover)',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}>
          {success}
        </div>
      )}

      {!batch ? (
        /* FILE UPLOAD STAGE */
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Upload Expenses Sheet</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Select the export CSV file (`expenses_export.csv`). The engine will scan 22 anomaly patterns.
          </p>

          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed var(--panel-border)',
                borderRadius: '8px',
                padding: '2rem',
                width: '100%',
                cursor: 'pointer'
              }}
            />
            {file && (
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                Selected File: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: '200px' }} disabled={uploading || !file}>
              {uploading ? 'Analyzing...' : 'Analyze CSV'}
            </button>
          </form>
        </div>
      ) : (
        /* RESOLUTION STAGE */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Global Import Settings Card */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
              ⚙️ Global Settings
            </h3>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>File Name: </span>
                <strong>{batch.filename}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Anomalies Flagged: </span>
                <strong style={{ color: batch.anomalies.length > 0 ? 'var(--warning)' : 'var(--secondary-hover)' }}>
                  {batch.anomalies.length}
                </strong>
              </div>
              {hasForeignCurrency && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <label htmlFor="usdRate" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <strong>USD to INR rate to apply for USD entries:</strong>
                  </label>
                  <input
                    id="usdRate"
                    type="number"
                    step="0.01"
                    style={{ width: '100px', padding: '0.4rem 0.75rem', margin: 0 }}
                    value={usdRate}
                    onChange={(e) => setUsdRate(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Anomaly Review Report */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
              📋 Anomaly Report & Action Board
            </h3>
            
            {batch.anomalies.length === 0 ? (
              <div style={{ color: 'var(--secondary-hover)', padding: '1rem', fontWeight: '600' }}>
                ✓ No anomalies detected! Everything is clean.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {batch.anomalies.map((anom, idx) => (
                  <div
                    key={anom.id || idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--panel-border)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        background: anom.requiresApproval ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: anom.requiresApproval ? 'var(--danger-hover)' : 'var(--secondary-hover)',
                        border: anom.requiresApproval ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        Anomaly {anom.anomalyType} — {anom.requiresApproval ? 'Action Required' : 'Auto Resolved'}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>
                      {anom.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Staged Rows Detail Grid */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
              🔍 Row-by-Row Review & Overrides
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Confirm individual row classifications, resolve duplicates, and verify payer/split assignments.
            </p>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>CSV Line</th>
                    <th>Raw Row Description</th>
                    <th>Payer</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Splits Participants</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {processedRows.map((row) => {
                    const rowAnoms = row.anomalies || [];
                    const hasUnresolved = rowAnoms.some(a => a.requiresApproval);
                    
                    return (
                      <tr key={row.rowIndex} style={{
                        opacity: row.rejected ? 0.4 : 1,
                        textDecoration: row.rejected ? 'line-through' : 'none',
                        background: hasUnresolved ? 'rgba(245, 158, 11, 0.03)' : 'none'
                      }}>
                        <td>Row {row.rowRef}</td>
                        <td>
                          <strong>{row.description}</strong>
                          {row.noteRaw && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              Note: {row.noteRaw}
                            </div>
                          )}
                        </td>
                        <td>
                          {/* If missing payer (Row 13), show dropdown */}
                          {!row.resolvedPayer ? (
                            <select
                              value={row.resolvedPayer}
                              onChange={(e) => updateRowField(row.rowIndex, 'resolvedPayer', e.target.value)}
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', borderColor: 'var(--warning)', margin: 0 }}
                              required
                            >
                              <option value="">-- Select --</option>
                              {group.memberships.map(m => (
                                <option key={m.id} value={m.user.name}>
                                  {m.user.name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            /* Let them edit anyway */
                            <select
                              value={row.resolvedPayer}
                              onChange={(e) => updateRowField(row.rowIndex, 'resolvedPayer', e.target.value)}
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', margin: 0 }}
                            >
                              {group.memberships.map(m => m.user.name).filter((v, i, a) => a.indexOf(v) === i).map(name => (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td>
                          <strong>
                            {row.resolvedCurrency} {row.parsedAmount}
                          </strong>
                          {row.resolvedCurrency !== 'INR' && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                              ≈ ₹{(row.parsedAmount * parseFloat(usdRate)).toFixed(2)}
                            </div>
                          )}
                        </td>
                        <td>
                          {/* Editable date for Row 34 ambiguous format */}
                          <input
                            type="date"
                            value={row.resolvedDate ? row.resolvedDate.substring(0, 10) : ''}
                            onChange={(e) => updateRowField(row.rowIndex, 'resolvedDate', new Date(e.target.value).toISOString())}
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', margin: 0, width: '125px' }}
                          />
                        </td>
                        <td>
                          <select
                            value={row.isSettlement ? 'settlement' : 'expense'}
                            onChange={(e) => updateRowField(row.rowIndex, 'isSettlement', e.target.value === 'settlement')}
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', margin: 0 }}
                          >
                            <option value="expense">Expense</option>
                            <option value="settlement">Settlement</option>
                          </select>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {row.resolvedSplitWith ? row.resolvedSplitWith.join(', ') : ''}
                          </span>
                        </td>
                        <td>
                          {/* Approve/Reject row buttons (for duplicates Row 6 / 25) */}
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {row.rejected ? (
                              <button
                                className="btn btn-secondary"
                                onClick={() => updateRowField(row.rowIndex, 'rejected', false)}
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px' }}
                              >
                                Restore
                              </button>
                            ) : (
                              <button
                                className="btn btn-danger"
                                onClick={() => updateRowField(row.rowIndex, 'rejected', true)}
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px' }}
                              >
                                Skip Row
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', gap: '1rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setBatch(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCommit}
                disabled={committing}
              >
                {committing ? 'Committing Import...' : 'Commit Import & Save to DB ✓'}
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
