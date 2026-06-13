import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'rgba(17, 24, 39, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--panel-border)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#fff',
          fontFamily: 'var(--font-title)',
          fontSize: '1.4rem',
          fontWeight: '700',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(90deg, #6366f1, #10b981)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ☄ Spreetail expenses
        </Link>
      </div>

      {token && user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Welcome, <strong style={{ color: 'var(--text-primary)' }}>{user.name}</strong>
          </span>
          <button
            className="btn btn-secondary"
            onClick={handleLogout}
            style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
