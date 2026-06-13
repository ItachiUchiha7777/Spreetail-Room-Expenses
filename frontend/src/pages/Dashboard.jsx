import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');

  const fetchGroups = async () => {
    try {
      const res = await api.get('/groups');
      setGroups(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch groups.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    setCreating(true);
    setError('');

    try {
      const res = await api.post('/groups', { name: newGroupName });
      setGroups([res.data, ...groups]);
      setNewGroupName('');
    } catch (err) {
      console.error(err);
      setError('Failed to create group.');
    } finally {
      setCreating(false);
    }
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    if (!groupCode.trim()) return;
    setJoining(true);
    setError('');

    try {
      const res = await api.post('/groups/join', { uuid: groupCode.trim() });
      const groupId = res.data.group.id;
      navigate(`/group/${groupId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to join group by code. Check the code and try again.');
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-title)' }}>
          Shared Expenses Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Track shared bills, balance debts, and import shared expense CSV reports.
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

      <div className="grid-3" style={{ alignItems: 'start' }}>
        
        {/* Forms Panel */}
        <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Create Group Card */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
              Create New Group
            </h3>
            <form onSubmit={handleCreateGroup}>
              <div className="form-group">
                <label htmlFor="groupName">Group Name</label>
                <input
                  id="groupName"
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g. Flat 404 Roomies"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={creating}
              >
                {creating ? 'Creating...' : 'Create Group'}
              </button>
            </form>
          </div>

          {/* Join Group Card */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
              Join Group by Invite Code
            </h3>
            <form onSubmit={handleJoinGroup}>
              <div className="form-group">
                <label htmlFor="groupCode">Invite Code (UUID)</label>
                <input
                  id="groupCode"
                  type="text"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                  placeholder="Paste UUID here"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-secondary"
                style={{ width: '100%' }}
                disabled={joining}
              >
                {joining ? 'Joining...' : 'Join Group'}
              </button>
            </form>
          </div>

        </div>

        {/* Groups List */}
        <div className="glass-card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
            Your Expense Groups
          </h3>

          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
              Loading your groups...
            </div>
          ) : groups.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 2rem' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>You are not in any expense groups yet.</p>
              <p style={{ fontSize: '0.9rem' }}>Create a group on the left to get started!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {groups.map(group => (
                <div
                  key={group.id}
                  onClick={() => navigate(`/group/${group.id}`)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--panel-border)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--panel-border)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: '#fff' }}>
                      {group.name}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Created by {group.creator?.name || 'You'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--primary-hover)', fontWeight: '600' }}>
                      View Group →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
