import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { auth, googleProvider, signInWithPopup } from '../firebase';

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem('token')) {
      const queryParams = new URLSearchParams(window.location.search);
      const redirectPath = queryParams.get('redirect') || '/';
      navigate(redirectPath);
    }
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userCredential = result.user;
      
      const res = await api.post('/auth/google', {
        email: userCredential.email,
        name: userCredential.displayName || userCredential.email.split('@')[0]
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      const queryParams = new URLSearchParams(window.location.search);
      const redirectPath = queryParams.get('redirect') || '/';
      navigate(redirectPath);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Google Sign In failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? { name, email, password } : { email, password };

      const res = await api.post(endpoint, payload);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      const queryParams = new URLSearchParams(window.location.search);
      const redirectPath = queryParams.get('redirect') || '/';
      navigate(redirectPath);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      padding: '2rem'
    }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '440px' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '0.5rem',
          background: 'linear-gradient(90deg, #6366f1, #10b981)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'var(--font-title)',
          fontWeight: '700'
        }}>
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          marginBottom: '2rem'
        }}>
          {isRegister ? 'Sign up to manage flatmate expenses' : 'Sign in to access your expenses dashboard'}
        </p>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: 'var(--danger-hover)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Username / Display Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aisha"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. aisha@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : isRegister ? 'Register' : 'Sign In'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: '1rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--panel-border)' }}></div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--panel-border)' }}></div>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: '100%', display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center' }}
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign In with Google
        </button>

        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-hover)',
              cursor: 'pointer',
              fontWeight: '600',
              padding: 0
            }}
          >
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
