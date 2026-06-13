import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const groupId = parseInt(id);

  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // All users in the system to add to group
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('expenses'); // 'expenses' | 'settlements' | 'timeline'
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Manual Expense Form State
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCurrency, setExpCurrency] = useState('INR');
  const [expRate, setExpRate] = useState('1.0');
  const [expSplitType, setExpSplitType] = useState('equal');
  const [expDate, setExpDate] = useState(new Date().toISOString().substring(0, 10));
  const [expPayer, setExpPayer] = useState('');
  const [expParticipants, setExpParticipants] = useState({}); // { [userId]: { selected: boolean, shareValue: string } }

  // Manual Settlement Form State
  const [setFrom, setSetFrom] = useState('');
  const [setTo, setSetTo] = useState('');
  const [setAmount, setSetAmount] = useState('');
  const [setDate, setSetDate] = useState(new Date().toISOString().substring(0, 10));
  const [setNote, setSetNote] = useState('');

  // Add Member Form State
  const [selectedNewUser, setSelectedNewUser] = useState('');
  const [memberJoinDate, setMemberJoinDate] = useState(new Date().toISOString().substring(0, 10));
  const [memberLeaveDate, setMemberLeaveDate] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const groupRes = await api.get(`/groups/${groupId}`);
      setGroup(groupRes.data);

      const expRes = await api.get(`/expenses/group/${groupId}`);
      setExpenses(expRes.data);

      const setRes = await api.get(`/settlements/group/${groupId}`);
      setSettlements(setRes.data);

      // Fetch all system users to allow adding them
      const usersRes = await api.get('/auth/me'); // To ensure auth works, then fetch list
      // Since there is no "all users" endpoint, we will mock or fetch. 
      // Actually we seeded Aisha, Rohan, Priya, Meera, Sam, Dev, Kabir.
      // We can query the group memberships first, and fetch other system users if needed.
      // For testing, let's also fetch all registered users. Let's create an endpoint on backend if needed,
      // or we can just display the active members of this group in the payer/payee selectors.
      
      // Default forms selection
      if (groupRes.data.memberships.length > 0) {
        setExpPayer(groupRes.data.memberships[0].userId.toString());
        setSetFrom(groupRes.data.memberships[0].userId.toString());
        if (groupRes.data.memberships.length > 1) {
          setSetTo(groupRes.data.memberships[1].userId.toString());
        }

        // Initialize expense participants checklist with active members
        const participantsInit = {};
        groupRes.data.memberships.forEach(m => {
          participantsInit[m.userId] = { selected: true, shareValue: '1' };
        });
        setExpParticipants(participantsInit);
      }

    } catch (err) {
      console.error(err);
      setError('Failed to load group details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [groupId]);

  const handleCopyLink = () => {
    const inviteLink = `${window.location.origin}/join/${group.uuid}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle manual expense submission
  const handleAddExpense = async (e) => {
    e.preventDefault();
    setError('');

    // Filter and structure splits
    const selectedSplits = Object.keys(expParticipants)
      .filter(uid => expParticipants[uid].selected)
      .map(uid => ({
        userId: parseInt(uid),
        shareValue: parseFloat(expParticipants[uid].shareValue || '0')
      }));

    if (selectedSplits.length === 0) {
      setError('At least one expense split participant must be selected.');
      return;
    }

    try {
      const payload = {
        groupId,
        paidBy: parseInt(expPayer),
        description: expDesc,
        amount: parseFloat(expAmount),
        currency: expCurrency,
        exchangeRateToInr: expCurrency !== 'INR' ? parseFloat(expRate) : 1.0,
        splitType: expSplitType,
        expenseDate: new Date(expDate).toISOString(),
        splits: selectedSplits
      };

      await api.post('/expenses', payload);
      
      // Reset Form & Refetch
      setExpDesc('');
      setExpAmount('');
      setExpCurrency('INR');
      setExpRate('1.0');
      setExpSplitType('equal');
      fetchData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to add manual expense.');
    }
  };

  // Handle manual settlement submission
  const handleAddSettlement = async (e) => {
    e.preventDefault();
    setError('');

    if (parseInt(setFrom) === parseInt(setTo)) {
      setError('A user cannot record a settlement to themselves.');
      return;
    }

    try {
      const payload = {
        groupId,
        paidBy: parseInt(setFrom),
        paidTo: parseInt(setTo),
        amount: parseFloat(setAmount),
        currency: 'INR',
        settledDate: new Date(setDate).toISOString(),
        note: setNote
      };

      await api.post('/settlements', payload);
      
      // Reset Form & Refetch
      setSetAmount('');
      setSetNote('');
      fetchData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to record settlement.');
    }
  };

  // Delete Expense
  const handleDeleteExpense = async (expId) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      await api.delete(`/expenses/${expId}`);
      fetchData();
    } catch (err) {
      console.error(err);
      setError('Failed to delete expense.');
    }
  };

  // Delete Settlement
  const handleDeleteSettlement = async (setId) => {
    if (!window.confirm('Are you sure you want to delete this settlement record?')) return;
    try {
      await api.delete(`/settlements/${setId}`);
      fetchData();
    } catch (err) {
      console.error(err);
      setError('Failed to delete settlement.');
    }
  };

  // Handle member addition
  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!selectedNewUser) return;
    setError('');

    try {
      await api.post(`/groups/${groupId}/members`, {
        userId: parseInt(selectedNewUser),
        joinedAt: new Date(memberJoinDate).toISOString(),
        leftAt: memberLeaveDate ? new Date(memberLeaveDate).toISOString() : null
      });

      setSelectedNewUser('');
      setMemberLeaveDate('');
      fetchData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to add member membership.');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '5rem' }}>
        Loading group workspace...
      </div>
    );
  }

  if (!group) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
        <h2>Group not found.</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to Dashboard</Link>
      </div>
    );
  }

  // Get active members on the selected expense date
  const toMidnight = (d) => {
    const nd = new Date(d);
    nd.setHours(0, 0, 0, 0);
    return nd;
  };
  const selectedExpDateObj = toMidnight(expDate);
  const activeMembersOnDate = group.memberships.filter(m => {
    const joined = toMidnight(m.joinedAt);
    const left = m.leftAt ? toMidnight(m.leftAt) : null;
    return joined <= selectedExpDateObj && (!left || selectedExpDateObj <= left);
  });

  return (
    <div className="container animate-fade-in">
      
      {/* Header Panel */}
      <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary-hover)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Expense Group
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '0.25rem', fontFamily: 'var(--font-title)' }}>
            {group.name}
          </h1>
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Invite Code: <strong style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>{group.uuid}</strong>
            </span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '4px', margin: 0 }}
            >
              {copied ? 'Copied ✓' : '🔗 Copy Join Link'}
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to={`/group/${groupId}/balances`} className="btn btn-primary">
            📊 View Balances & Debts
          </Link>
          <Link to={`/import/${groupId}`} className="btn btn-secondary">
            📥 Import CSV File
          </Link>
        </div>
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

      {/* Tab Switcher */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--panel-border)',
        marginBottom: '2rem',
        gap: '2rem'
      }}>
        {['expenses', 'settlements', 'timeline'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              padding: '0.75rem 0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              fontFamily: 'var(--font-title)',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            {tab === 'expenses' ? '💸 Group Expenses' : tab === 'settlements' ? '🤝 Settlements Log' : '📅 Membership Timeline'}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="grid-3" style={{ alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Input Form */}
        <div style={{ gridColumn: 'span 1' }}>
          
          {activeTab === 'expenses' && (
            <div className="glass-card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
                Log Expense
              </h3>
              <form onSubmit={handleAddExpense}>
                <div className="form-group">
                  <label htmlFor="expDesc">Description</label>
                  <input
                    id="expDesc"
                    type="text"
                    value={expDesc}
                    onChange={(e) => setExpDesc(e.target.value)}
                    placeholder="e.g. Electricity bill"
                    required
                  />
                </div>

                <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label htmlFor="expAmount">Amount</label>
                    <input
                      id="expAmount"
                      type="number"
                      step="0.01"
                      value={expAmount}
                      onChange={(e) => setExpAmount(e.target.value)}
                      placeholder="500"
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label htmlFor="expCurrency">Currency</label>
                    <select
                      id="expCurrency"
                      value={expCurrency}
                      onChange={(e) => setExpCurrency(e.target.value)}
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                </div>

                {expCurrency !== 'INR' && (
                  <div className="form-group">
                    <label htmlFor="expRate">Exchange Rate (1 USD = ? INR)</label>
                    <input
                      id="expRate"
                      type="number"
                      step="0.0001"
                      value={expRate}
                      onChange={(e) => setExpRate(e.target.value)}
                      placeholder="83.0"
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="expDate">Expense Date</label>
                  <input
                    id="expDate"
                    type="date"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="expPayer">Paid By</label>
                  <select
                    id="expPayer"
                    value={expPayer}
                    onChange={(e) => setExpPayer(e.target.value)}
                  >
                    {group.memberships.map(m => (
                      <option key={m.id} value={m.userId}>
                        {m.user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="expSplitType">Split Type</label>
                  <select
                    id="expSplitType"
                    value={expSplitType}
                    onChange={(e) => setExpSplitType(e.target.value)}
                  >
                    <option value="equal">Split Equally</option>
                    <option value="percentage">Split by Percentage</option>
                    <option value="share">Split by Shares/Ratio</option>
                    <option value="exact">Exact Custom Amounts</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ marginBottom: '0.25rem' }}>Split With (Active on Selected Date)</label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    * Aisha, Meera, Dev are filterable by membership timeline automatically.
                  </span>
                  
                  {activeMembersOnDate.length === 0 ? (
                    <div style={{ fontSize: '0.85rem', color: 'var(--danger-hover)', padding: '0.5rem 0' }}>
                      No active members found on this date. Correct the date or add memberships first!
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
                      {activeMembersOnDate.map(m => (
                        <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={expParticipants[m.userId]?.selected || false}
                              onChange={(e) => setExpParticipants({
                                ...expParticipants,
                                [m.userId]: {
                                  ...expParticipants[m.userId],
                                  selected: e.target.checked
                                }
                              })}
                            />
                            <span>{m.user.name}</span>
                          </div>

                          {expSplitType !== 'equal' && expParticipants[m.userId]?.selected && (
                            <input
                              type="number"
                              step="0.01"
                              style={{ width: '80px', padding: '0.25rem 0.5rem', margin: 0 }}
                              value={expParticipants[m.userId]?.shareValue || ''}
                              onChange={(e) => setExpParticipants({
                                ...expParticipants,
                                [m.userId]: {
                                  ...expParticipants[m.userId],
                                  shareValue: e.target.value
                                }
                              })}
                              placeholder={expSplitType === 'percentage' ? '%' : expSplitType === 'share' ? 'shares' : '₹'}
                              required
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1rem' }}
                  disabled={activeMembersOnDate.length === 0}
                >
                  Log Expense
                </button>
              </form>
            </div>
          )}

          {activeTab === 'settlements' && (
            <div className="glass-card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
                Record Settlement
              </h3>
              <form onSubmit={handleAddSettlement}>
                <div className="form-group">
                  <label htmlFor="setFrom">From (Payer)</label>
                  <select
                    id="setFrom"
                    value={setFrom}
                    onChange={(e) => setSetFrom(e.target.value)}
                  >
                    {group.memberships.map(m => (
                      <option key={m.id} value={m.userId}>
                        {m.user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="setTo">To (Payee)</label>
                  <select
                    id="setTo"
                    value={setTo}
                    onChange={(e) => setSetTo(e.target.value)}
                  >
                    {group.memberships.map(m => (
                      <option key={m.id} value={m.userId}>
                        {m.user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="setAmount">Amount Paid (INR)</label>
                  <input
                    id="setAmount"
                    type="number"
                    step="0.01"
                    value={setAmount}
                    onChange={(e) => setSetAmount(e.target.value)}
                    placeholder="2500"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="setDate">Settled Date</label>
                  <input
                    id="setDate"
                    type="date"
                    value={setDate}
                    onChange={(e) => setSetDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="setNote">Note (Optional)</label>
                  <input
                    id="setNote"
                    type="text"
                    value={setNote}
                    onChange={(e) => setSetNote(e.target.value)}
                    placeholder="e.g. Paid back for dinner"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  Log Payment
                </button>
              </form>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="glass-card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
                Add Membership/Guest
              </h3>
              <form onSubmit={handleAddMember}>
                <div className="form-group">
                  <label htmlFor="selectedNewUser">Select User</label>
                  {/* Since there's no system user endpoint, we let them input/select from default seeded list */}
                  <select
                    id="selectedNewUser"
                    value={selectedNewUser}
                    onChange={(e) => setSelectedNewUser(e.target.value)}
                    required
                  >
                    <option value="">-- Choose User --</option>
                    {group.memberships.map(m => m.user).filter((u, idx, self) => self.findIndex(t => t.id === u.id) === idx).map(u => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="memberJoinDate">Joined Date</label>
                  <input
                    id="memberJoinDate"
                    type="date"
                    value={memberJoinDate}
                    onChange={(e) => setMemberJoinDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="memberLeaveDate">Left Date (Optional)</label>
                  <input
                    id="memberLeaveDate"
                    type="date"
                    value={memberLeaveDate}
                    onChange={(e) => setMemberLeaveDate(e.target.value)}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Leave blank if they are still an active member.
                  </span>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  Add Member Timeline
                </button>
              </form>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Lists (Table Views) */}
        <div style={{ gridColumn: 'span 2' }}>
          
          {activeTab === 'expenses' && (
            <div className="glass-card">
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
                Expense History
              </h3>
              
              {expenses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No expenses logged yet.
                </div>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Paid By</th>
                        <th>Split Details</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map(exp => (
                        <tr key={exp.id}>
                          <td>{new Date(exp.expenseDate).toLocaleDateString()}</td>
                          <td>
                            <strong>{exp.description}</strong>
                            {exp.source === 'import' && (
                              <span className="badge badge-approved" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>
                                Imported
                              </span>
                            )}
                          </td>
                          <td>
                            <strong>₹{parseFloat(exp.amountInInr).toFixed(2)}</strong>
                            {exp.currency !== 'INR' && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                ({parseFloat(exp.amount).toFixed(2)} {exp.currency})
                              </div>
                            )}
                          </td>
                          <td>{exp.payer.name}</td>
                          <td>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                              {exp.splits.map(s => (
                                <span
                                  key={s.id}
                                  style={{
                                    fontSize: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '0.15rem 0.4rem',
                                    borderRadius: '4px',
                                    border: '1px solid var(--panel-border)'
                                  }}
                                >
                                  {s.user.name}: ₹{parseFloat(s.shareAmount).toFixed(2)}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteExpense(exp.id)}
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px' }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settlements' && (
            <div className="glass-card">
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
                Payment History
              </h3>
              
              {settlements.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No settlements recorded yet.
                </div>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>From (Payer)</th>
                        <th>To (Payee)</th>
                        <th>Amount</th>
                        <th>Note</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settlements.map(set => (
                        <tr key={set.id}>
                          <td>{new Date(set.settledDate).toLocaleDateString()}</td>
                          <td><strong>{set.payer.name}</strong></td>
                          <td><strong>{set.payee.name}</strong></td>
                          <td style={{ color: 'var(--secondary-hover)', fontWeight: '600' }}>
                            ₹{parseFloat(set.amount).toFixed(2)}
                          </td>
                          <td>{set.note || <span style={{ color: 'var(--text-muted)' }}>--</span>}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteSettlement(set.id)}
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px' }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="glass-card">
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
                Active Memberships Timeline
              </h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Person</th>
                      <th>Joined Group Date</th>
                      <th>Left Group Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.memberships.map(m => (
                      <tr key={m.id}>
                        <td><strong>{m.user.name}</strong></td>
                        <td>{new Date(m.joinedAt).toLocaleDateString()}</td>
                        <td>
                          {m.leftAt ? new Date(m.leftAt).toLocaleDateString() : <span style={{ color: 'var(--text-muted)' }}>Ongoing membership</span>}
                        </td>
                        <td>
                          {(!m.leftAt || new Date() <= new Date(m.leftAt)) ? (
                            <span className="badge badge-auto">Active</span>
                          ) : (
                            <span className="badge badge-rejected">Departed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
