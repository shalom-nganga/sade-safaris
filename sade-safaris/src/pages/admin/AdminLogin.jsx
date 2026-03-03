import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { adminLogin } from '../../api';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
  setError('');
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  if (!trimmedUsername || !trimmedPassword) { setError('Please enter both username and password.'); return; }
  setLoading(true);
  setTimeout(() => {
    if (trimmedUsername === 'admin' && trimmedPassword === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password.');
      setLoading(false);
    }
  }, 800);
};

  return (
    <div style={{
      minHeight: '100vh', background: '#f0f4ff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Nunito Sans', sans-serif", padding: '20px',
    }}>
      <div style={{
        position: 'fixed', inset: 0, opacity: .04,
        backgroundImage: 'radial-gradient(circle, #1a56db 1px, transparent 1px)',
        backgroundSize: '28px 28px', pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 2 }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: 'white', padding: '14px 24px', borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,.08)', marginBottom: '16px',
          }}>
            <div style={{
              width: '40px', height: '40px', background: 'linear-gradient(135deg, #4a9c2f, #2d6a1a)',
              borderRadius: '8px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '20px',
            }}>🦁</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1a1a2e', letterSpacing: '1px' }}>SADE SAFARIS</div>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#4a9c2f', letterSpacing: '2px' }}>& FAST LANE CAR HIRE</div>
            </div>
          </div>
          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', marginBottom: '6px' }}>
            ADMIN PORTAL
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>Sign in to manage your business</p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 8px 40px rgba(0,0,0,.1)' }}>
          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px',
              padding: '12px 16px', marginBottom: '20px',
              fontSize: '13px', fontWeight: 600, color: '#dc2626',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px',
                padding: '13px 16px', fontSize: '14px', fontFamily: 'inherit',
                outline: 'none', transition: 'border .2s', background: '#f8fafc',
              }}
              onFocus={e => e.target.style.borderColor = '#1a56db'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{
                  width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px',
                  padding: '13px 48px 13px 16px', fontSize: '14px', fontFamily: 'inherit',
                  outline: 'none', transition: 'border .2s', background: '#f8fafc',
                }}
                onFocus={e => e.target.style.borderColor = '#1a56db'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#94a3b8',
                }}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%', padding: '15px', fontSize: '14px', fontWeight: 800,
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #1a56db, #0e3fa5)',
              color: 'white', border: 'none', borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', letterSpacing: '.5px',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(26,86,219,.4)',
              transition: 'all .25s',
            }}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN →'}
          </button>

          <div style={{
            marginTop: '24px', padding: '14px', background: '#f0f4ff',
            borderRadius: '8px', textAlign: 'center', border: '1px solid #e0e7ff',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>DEFAULT CREDENTIALS</div>
            <div style={{ fontSize: '12px', color: '#1a56db', fontWeight: 700 }}>Username: admin &nbsp;|&nbsp; Password: admin123</div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#94a3b8' }}>
          © 2026 Sade Safaris & Fast Lane. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin; 