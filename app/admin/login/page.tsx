'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [accessPin, setAccessPin] = useState('');
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [pinAttempts, setPinAttempts] = useState(0);
  const [isPinBlocked, setIsPinBlocked] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [pinError, setPinError] = useState('');
  const [loading, setLoading] = useState(false);
  const ACCESS_PIN = '12345678.';

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPinBlocked) {
      setPinError('ID blocked after 3 invalid PIN attempts.');
      return;
    }
    if (!accessPin) {
      setPinError('Please enter access PIN');
      return;
    }
    if (accessPin !== ACCESS_PIN) {
      const nextAttempts = pinAttempts + 1;
      setPinAttempts(nextAttempts);
      if (nextAttempts >= 3) {
        setIsPinBlocked(true);
        setPinError('ID blocked after 3 invalid PIN attempts.');
      } else {
        setPinError(`Invalid access PIN. ${3 - nextAttempts} attempt(s) left.`);
      }
      return;
    }
    setPinAttempts(0);
    setIsPinBlocked(false);
    setPinError('');
    setError('');
    setIsPinVerified(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        document.cookie = 'admin_token=authenticated; path=/; max-age=86400; SameSite=Lax';
        window.location.href = '/admin';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          background: #080810;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* LEFT PANEL */
        .left-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 56px;
          position: relative;
          overflow: hidden;
        }

        .left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(99, 57, 255, 0.18) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, rgba(20, 184, 166, 0.12) 0%, transparent 50%),
                      radial-gradient(ellipse at 60% 80%, rgba(244, 63, 94, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }

        .brand-mark {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 2;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6339ff, #14b8a6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99, 57, 255, 0.15);
          border: 1px solid rgba(99, 57, 255, 0.3);
          border-radius: 100px;
          padding: 6px 14px;
          margin-bottom: 32px;
          font-size: 12px;
          font-weight: 500;
          color: #a78bfa;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .hero-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(36px, 4vw, 54px);
          line-height: 1.05;
          letter-spacing: -2px;
          color: #fff;
          margin-bottom: 20px;
        }

        .hero-heading span {
          background: linear-gradient(135deg, #6339ff 0%, #14b8a6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255,255,255,0.45);
          max-width: 340px;
          font-weight: 300;
        }

        .trust-row {
          display: flex;
          align-items: center;
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .trust-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .trust-num {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .trust-label {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          font-weight: 400;
        }

        .trust-divider {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.1);
        }

        /* RIGHT PANEL */
        .right-panel {
          width: 480px;
          min-height: 100vh;
          background: #0d0d1a;
          border-left: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 56px 48px;
          position: relative;
        }

        .right-panel::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(99, 57, 255, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .form-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 10px;
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 28px;
          color: #fff;
          letter-spacing: -0.8px;
          margin-bottom: 8px;
        }

        .form-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 36px;
          font-weight: 300;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 24px;
        }

        .field-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        .input-shell {
          position: relative;
        }

        .input-icon {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          pointer-events: none;
          transition: color 0.2s;
        }

        .input-shell:focus-within .input-icon {
          color: #6339ff;
        }

        .field-input {
          width: 100%;
          height: 50px;
          padding: 0 16px 0 46px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .field-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .field-input:focus {
          border-color: rgba(99, 57, 255, 0.5);
          background: rgba(99, 57, 255, 0.06);
          box-shadow: 0 0 0 4px rgba(99, 57, 255, 0.08);
        }

        .pwd-toggle {
          position: absolute;
          top: 50%;
          right: 14px;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255,255,255,0.25);
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: color 0.2s;
          padding: 4px;
        }

        .pwd-toggle:hover { color: rgba(255,255,255,0.6); }

        .error-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 20px;
        }

        .error-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          flex-shrink: 0;
        }

        .error-text {
          font-size: 13px;
          color: #fca5a5;
          font-weight: 400;
        }

        .submit-btn {
          width: 100%;
          height: 52px;
          background: linear-gradient(135deg, #6339ff 0%, #4f46e5 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          box-shadow: 0 8px 32px rgba(99, 57, 255, 0.3);
          letter-spacing: 0.2px;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 12px 40px rgba(99, 57, 255, 0.4);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }

        .divider-text {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.5px;
        }

        .toggle-mode {
          width: 100%;
          height: 50px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: rgba(255,255,255,0.55);
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .toggle-mode:hover {
          border-color: rgba(99, 57, 255, 0.4);
          color: #a78bfa;
          background: rgba(99, 57, 255, 0.06);
        }

        .toggle-mode strong {
          color: #a78bfa;
          font-weight: 600;
        }

        .form-footer {
          margin-top: 32px;
          text-align: center;
          font-size: 12px;
          color: rgba(255,255,255,0.2);
          line-height: 1.6;
        }

        .form-footer a {
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s;
        }
        .form-footer a:hover { color: #a78bfa; }

        /* Decorative floating shapes */
        .shape-1 {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 1px solid rgba(99, 57, 255, 0.15);
          top: 15%;
          right: 8%;
          animation: floatA 8s ease-in-out infinite;
        }
        .shape-2 {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid rgba(20, 184, 166, 0.15);
          top: 25%;
          right: 18%;
          animation: floatB 6s ease-in-out infinite;
        }
        .shape-3 {
          position: absolute;
          bottom: 20%;
          left: 10%;
          width: 120px;
          height: 120px;
          border-radius: 24px;
          border: 1px solid rgba(99, 57, 255, 0.1);
          transform: rotate(15deg);
          animation: floatC 10s ease-in-out infinite;
        }

        @keyframes floatA {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(12px); }
        }
        @keyframes floatC {
          0%, 100% { transform: rotate(15deg) translateY(0px); }
          50% { transform: rotate(15deg) translateY(-14px); }
        }

        @media (max-width: 768px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; padding: 40px 28px; }
        }
      `}</style>

      <div className="login-root">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="grid-overlay" />
          <div className="shape-1" />
          <div className="shape-2" />
          <div className="shape-3" />

          <div className="brand-mark">
            <div className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L17.32 6.5V15.5L10 20L2.68 15.5V6.5L10 2Z" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <span className="brand-name">Shanky Portal</span>
          </div>

          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={11} />
              Secure Access Layer
            </div>
            <h1 className="hero-heading">
              Your control<br />
              <span>center awaits.</span>
            </h1>
            <p className="hero-sub">
              Sign in to manage your platform with full visibility, control, and confidence.
            </p>
          </div>

          <div className="trust-row">
            <div className="trust-stat">
              <span className="trust-num">256-bit</span>
              <span className="trust-label">Encryption</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-stat">
              <span className="trust-num">99.9%</span>
              <span className="trust-label">Uptime SLA</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-stat">
              <span className="trust-num">24/7</span>
              <span className="trust-label">Monitoring</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          {!isPinVerified ? (
            <>
              <p className="form-eyebrow">Admin access</p>
              <h2 className="form-title">Security Check</h2>
              <p className="form-sub">Enter access PIN to continue.</p>

              <form onSubmit={handlePinSubmit}>
                <div className="field-group">
                  <div className="field-wrap">
                    <label className="field-label">Access PIN</label>
                    <div className="input-shell">
                      <span className="input-icon"><Lock size={16} /></span>
                      <input
                        type={showPwd ? 'text' : 'password'}
                        className="field-input"
                        value={accessPin}
                        onChange={(e) => {
                          setAccessPin(e.target.value);
                          if (!isPinBlocked && pinError) setPinError('');
                        }}
                        placeholder="Enter PIN"
                        required
                        disabled={isPinBlocked}
                        style={{ paddingRight: '46px' }}
                      />
                      <button type="button" className="pwd-toggle" onClick={() => setShowPwd(!showPwd)}>
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {pinError && (
                  <div className="error-box">
                    <div className="error-dot" />
                    <span className="error-text">{pinError}</span>
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={isPinBlocked}>
                  {isPinBlocked ? 'Blocked' : <>Continue <ArrowRight size={16} /></>}
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="form-eyebrow">Admin access</p>
              <h2 className="form-title">Welcome back</h2>
              <p className="form-sub">Enter your credentials to continue.</p>

              <form onSubmit={handleLogin}>
                <div className="field-group">

                  <div className="field-wrap">
                    <label className="field-label">Email Address</label>
                    <div className="input-shell">
                      <span className="input-icon"><Mail size={16} /></span>
                      <input
                        type="email"
                        className="field-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">Password</label>
                    <div className="input-shell">
                      <span className="input-icon"><Lock size={16} /></span>
                      <input
                        type={showPwd ? 'text' : 'password'}
                        className="field-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        required
                        style={{ paddingRight: '46px' }}
                      />
                      <button type="button" className="pwd-toggle" onClick={() => setShowPwd(!showPwd)}>
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="error-box">
                    <div className="error-dot" />
                    <span className="error-text">{error}</span>
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <><div className="spinner" /> Signing in...</>
                  ) : (
                    <>Sign In <ArrowRight size={16} /></>
                  )}
                </button>
              </form>
            </>
          )}


          <p className="form-footer">
            By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </>
  );
}