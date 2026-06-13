import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function BalancesView() {
  const { id } = useParams();
  const groupId = parseInt(id);

  const [balances, setBalances] = useState([]);
  const [debts, setDebts] = useState([]);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Drill-down breakdown states
  const [expandedUser, setExpandedUser] = useState(null); // userId of expanded drill-down
  const [breakdown, setBreakdown] = useState(null);
  const [loadingBreakdown, setLoadingBreakdown] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const groupRes = await api.get(`/groups/${groupId}`);
      setGroup(groupRes.data);

      const balRes = await api.get(`/balances/group/${groupId}`);
      setBalances(balRes.data.balances);
      setDebts(balRes.data.debts);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch balances and simplified debts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [groupId]);

  // Load Rohan's detailed drill-down history
  const handleExpandUser = async (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
      setBreakdown(null);
      return;
    }

    setExpandedUser(userId);
    setLoadingBreakdown(true);
    try {
      const res = await api.get(`/balances/group/${groupId}/user/${userId}/breakdown`);
      setBreakdown(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user breakdown details.');
    } finally {
      setLoadingBreakdown(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '5rem' }}>
        Calculating balances and debts...
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <Link to={`/group/${groupId}`} style={{ color: 'var(--primary-hover)', textDecoration: 'none', fontWeight: '600' }}>
          ← Back to Group Workspace
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem', fontFamily: 'var(--font-title)' }}>
          Balances & Simplified Debts
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Audit exact balances, review greedy debt settlements, and drill down into contributors.
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

      <div className="grid-2" style={{ alignItems: 'start', marginBottom: '2rem' }}>
        
        {/* Simplified Debts List */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
            🤝 Simplified Debts (Greedy Resolution)
          </h3>
          
          {debts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--secondary-hover)', fontWeight: '600' }}>
              🎉 All debts are fully settled!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {debts.map((debt, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(79, 70, 229, 0.05)',
                    border: '1px solid rgba(79, 70, 229, 0.2)',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '1.05rem' }}>
                    <strong>{debt.fromName}</strong> owes <strong>{debt.toName}</strong>
                  </span>
                  <span style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: 'var(--primary-hover)',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px'
                  }}>
                    ₹{debt.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Members Balance Overview */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
            👥 Member Balance Summaries
          </h3>
          <div className="table-container" style={{ margin: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Net Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {balances.map(user => {
                  const isOwed = user.netBalance > 0;
                  const isSettled = Math.abs(user.netBalance) < 0.02;
                  return (
                    <React.Fragment key={user.id}>
                      <tr>
                        <td>
                          <strong>{user.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            Paid: ₹{user.paid.toFixed(2)} | Owed: ₹{user.owed.toFixed(2)}
                          </div>
                        </td>
                        <td style={{
                          color: isSettled ? 'var(--text-muted)' : isOwed ? 'var(--secondary-hover)' : 'var(--danger-hover)',
                          fontWeight: '700',
                          fontSize: '1.1rem'
                        }}>
                          {isSettled ? 'Settled' : `${isOwed ? '+' : ''}₹${user.netBalance.toLocaleString('en-IN')}`}
                        </td>
                        <td>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleExpandUser(user.id)}
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', borderRadius: '6px' }}
                          >
                            {expandedUser === user.id ? 'Hide Audit ▲' : 'Show Audit ▼'}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Drilldown Panel */}
                      {expandedUser === user.id && (
                        <tr>
                          <td colSpan="3" style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem' }}>
                            {loadingBreakdown ? (
                              <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                Loading breakdown data...
                              </div>
                            ) : breakdown ? (
                              <div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem', color: '#fff' }}>
                                  Audit Trail for {user.name}
                                </h4>

                                <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                                  
                                  {/* Expenses Paid */}
                                  <div>
                                    <h5 style={{ color: 'var(--secondary-hover)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                      💰 Paid Expenses (+₹)
                                    </h5>
                                    {breakdown.paid.length === 0 ? (
                                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>None</div>
                                    ) : (
                                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {breakdown.paid.map(p => (
                                          <li key={p.id} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.03)', paddingBottom: '0.25rem' }}>
                                            <span>{p.description} <span style={{ color: 'var(--text-muted)' }}>({new Date(p.date).toLocaleDateString()})</span></span>
                                            <strong>₹{p.amountInInr.toFixed(2)}</strong>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>

                                  {/* Expenses Owed (Splits) */}
                                  <div>
                                    <h5 style={{ color: 'var(--danger-hover)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                      💸 Participated Splits (-₹)
                                    </h5>
                                    {breakdown.owed.length === 0 ? (
                                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>None</div>
                                    ) : (
                                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {breakdown.owed.map(o => (
                                          <li key={o.id} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.03)', paddingBottom: '0.25rem' }}>
                                            <span>{o.description} <span style={{ color: 'var(--text-muted)' }}>({o.paidBy})</span></span>
                                            <strong>₹{o.shareAmountInInr.toFixed(2)}</strong>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>

                                </div>

                                <div className="grid-2" style={{ gap: '1.5rem' }}>
                                  
                                  {/* Settlements Sent */}
                                  <div>
                                    <h5 style={{ color: 'var(--primary-hover)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                      🚀 Sent Settlements (+₹)
                                    </h5>
                                    {breakdown.settlementsSent.length === 0 ? (
                                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>None</div>
                                    ) : (
                                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {breakdown.settlementsSent.map(s => (
                                          <li key={s.id} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.03)', paddingBottom: '0.25rem' }}>
                                            <span>Paid {s.to} <span style={{ color: 'var(--text-muted)' }}>({s.note})</span></span>
                                            <strong>₹{s.amount.toFixed(2)}</strong>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>

                                  {/* Settlements Received */}
                                  <div>
                                    <h5 style={{ color: 'var(--warning)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                      📥 Received Settlements (-₹)
                                    </h5>
                                    {breakdown.settlementsReceived.length === 0 ? (
                                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>None</div>
                                    ) : (
                                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {breakdown.settlementsReceived.map(r => (
                                          <li key={r.id} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.03)', paddingBottom: '0.25rem' }}>
                                            <span>From {r.from} <span style={{ color: 'var(--text-muted)' }}>({r.note})</span></span>
                                            <strong>₹{r.amount.toFixed(2)}</strong>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>

                                </div>
                              </div>
                            ) : (
                              <div style={{ color: 'var(--danger-hover)' }}>Failed to load breakdown history.</div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
