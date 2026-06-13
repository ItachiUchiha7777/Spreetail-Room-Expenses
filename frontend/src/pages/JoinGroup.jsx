import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function JoinGroup() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If not authenticated, redirect to login with redirect parameters
    const token = localStorage.getItem('token');
    if (!token) {
      navigate(`/login?redirect=/join/${uuid}`);
      return;
    }

    const fetchGroupMeta = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/groups/by-uuid/${uuid}`);
        setGroup(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Invalid or expired invite link.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupMeta();
  }, [uuid, navigate]);

  const handleJoin = async () => {
    setJoining(true);
    setError('');

    try {
      const res = await api.post('/groups/join', { uuid });
      const groupId = res.data.group.id;
      navigate(`/group/${groupId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to join group.');
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '5rem' }}>
        Checking invite credentials...
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      padding: '2rem'
    }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
        <span style={{ fontSize: '2rem' }}>✉️</span>
        <h2 style={{
          fontSize: '1.8rem',
          margin: '1rem 0 0.5rem 0',
          fontFamily: 'var(--font-title)',
          fontWeight: '700'
        }}>
          Group Invite
        </h2>
        
        {error ? (
          <div>
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--danger-hover)',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              margin: '1.5rem 0'
            }}>
              {error}
            </div>
            <Link to="/" className="btn btn-secondary" style={{ width: '100%' }}>
              Back to Dashboard
            </Link>
          </div>
        ) : group ? (
          <div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1rem' }}>
              You have been invited to join the expense sharing group:
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--panel-border)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.25rem' }}>
                {group.name}
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Created by {group.creator.name}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/" className="btn btn-secondary" style={{ flex: 1 }}>
                Decline
              </Link>
              <button
                className="btn btn-primary"
                style={{ flex: 1.5 }}
                onClick={handleJoin}
                disabled={joining}
              >
                {joining ? 'Joining...' : 'Accept & Join ✓'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
