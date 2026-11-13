'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, ArrowRight, Shield } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
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
    if (isPinBlocked) { setPinError('ID blocked after 3 invalid PIN attempts.'); return; }
    if (!accessPin) { setPinError('Please enter access PIN'); return; }
    if (accessPin !== ACCESS_PIN) {
      const nextAttempts = pinAttempts + 1;
      setPinAttempts(nextAttempts);
      if (nextAttempts >= 3) { setIsPinBlocked(true); setPinError('ID blocked after 3 invalid PIN attempts.'); }
      else { setPinError(`Invalid access PIN. ${3 - nextAttempts} attempt(s) left.`); }
      return;
    }
    setPinAttempts(0); setIsPinBlocked(false); setPinError(''); setError(''); setIsPinVerified(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) { setError('Please enter your password'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/admin/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) { window.location.href = '/admin'; }
      else { setError(data.error || 'Login failed'); }
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          background: #f5f5f7;
          display: flex;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
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
          background: #ffffff;
        }

        .brand-mark { display: flex; align-items: center; gap: 10px; }

        .logo-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #6339ff, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(99,57,255,0.25);
        }

        .brand-name { font-weight: 700; font-size: 17px; color: #1d1d1f; }

        .hero-content { position: relative; z-index: 2; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(99,57,255,0.06); border: 1px solid rgba(99,57,255,0.12);
          border-radius: 100px; padding: 6px 14px; margin-bottom: 28px;
          font-size: 12px; font-weight: 600; color: #6339ff;
          letter-spacing: 0.5px; text-transform: uppercase;
        }

        .hero-heading {
          font-weight: 800; font-size: clamp(34px, 4vw, 52px);
          line-height: 1.05; letter-spacing: -2px; color: #1d1d1f;
          margin-bottom: 18px;
        }

        .hero-heading span {
          background: linear-gradient(135deg, #6339ff 0%, #8b5cf6 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 16px; line-height: 1.7; color: #888;
          max-width: 360px; font-weight: 400;
        }

        .trust-row { display: flex; align-items: center; gap: 24px; position: relative; z-index: 2; }
        .trust-stat { display: flex; flex-direction: column; gap: 2px; }
        .trust-num { font-weight: 700; font-size: 20px; color: #1d1d1f; }
        .trust-label { font-size: 12px; color: #999; }
        .trust-divider { width: 1px; height: 32px; background: #e5e5e5; }

        /* RIGHT PANEL */
        .right-panel {
          width: 460px; min-height: 100vh;
          background: #ffffff;
          border-left: 1px solid #e5e5e5;
          display: flex; flex-direction: column; justify-content: center;
          padding: 56px 48px;
          position: relative;
        }

        .form-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #999; margin-bottom: 10px; }
        .form-title { font-weight: 700; font-size: 28px; color: #1d1d1f; letter-spacing: -0.8px; margin-bottom: 8px; }
        .form-sub { font-size: 14px; color: #888; margin-bottom: 36px; }

        .field-group { display: flex; flex-direction: column; gap: 18px; margin-bottom: 24px; }
        .field-wrap { display: flex; flex-direction: column; gap: 8px; }
        .field-label { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: #666; }

        .input-shell { position: relative; }

        .input-icon {
          position: absolute; top: 50%; left: 16px; transform: translateY(-50%);
          color: #ccc; display: flex; align-items: center; pointer-events: none;
          transition: color 0.2s;
        }

        .input-shell:focus-within .input-icon { color: #6339ff; }

        .field-input {
          width: 100%; height: 50px; padding: 0 16px 0 46px;
          background: #f9f9f9; border: 1px solid #e5e5e5;
          border-radius: 12px; color: #1d1d1f; font-size: 15px;
          font-family: 'Inter', sans-serif; outline: none;
          transition: all 0.2s;
        }

        .field-input::placeholder { color: #bbb; }

        .field-input:focus {
          border-color: #6339ff; background: #fff;
          box-shadow: 0 0 0 3px rgba(99,57,255,0.08);
        }

        .pwd-toggle {
          position: absolute; top: 50%; right: 14px; transform: translateY(-50%);
          background: none; border: none; color: #bbb; cursor: pointer;
          display: flex; align-items: center; transition: color 0.2s; padding: 4px;
        }
        .pwd-toggle:hover { color: #666; }

        .error-box {
          display: flex; align-items: center; gap: 10px;
          background: #fef2f2; border: 1px solid #fecaca;
          border-radius: 10px; padding: 12px 14px; margin-bottom: 20px;
        }
        .error-dot { width: 6px; height: 6px; border-radius: 50%; background: #ef4444; flex-shrink: 0; }
        .error-text { font-size: 13px; color: #dc2626; }

        .submit-btn {
          width: 100%; height: 52px;
          background: linear-gradient(135deg, #6339ff 0%, #5228e0 100%);
          border: none; border-radius: 12px; color: #fff;
          font-size: 15px; font-weight: 600; font-family: 'Inter', sans-serif;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          gap: 8px; transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(99,57,255,0.3);
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,57,255,0.4); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .form-footer { margin-top: 32px; text-align: center; font-size: 12px; color: #bbb; line-height: 1.6; }
        .form-footer a { color: #999; text-decoration: none; }
        .form-footer a:hover { color: #6339ff; }

        @media (max-width: 768px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; padding: 40px 28px; }
        }
      `}</style>

      <div className="login-root">
        <div className="left-panel">
          <div className="brand-mark">
            <div className="logo-icon">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L17.32 6.5V15.5L10 20L2.68 15.5V6.5L10 2Z" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <span className="brand-name">Shanky Portal</span>
          </div>

          <div className="hero-content">
            <div className="hero-badge">
              <Shield size={11} />
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
                        onChange={(e) => { setAccessPin(e.target.value); if (!isPinBlocked && pinError) setPinError(''); }}
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
                {pinError && <div className="error-box"><div className="error-dot" /><span className="error-text">{pinError}</span></div>}
                <button type="submit" className="submit-btn" disabled={isPinBlocked}>
                  {isPinBlocked ? 'Blocked' : <>Continue <ArrowRight size={16} /></>}
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="form-eyebrow">Admin access</p>
              <h2 className="form-title">Welcome back</h2>
              <p className="form-sub">Enter your password to continue.</p>

              <form onSubmit={handleLogin}>
                <div className="field-group">
                  <div className="field-wrap">
                    <label className="field-label">Password</label>
                    <div className="input-shell">
                      <span className="input-icon"><Lock size={16} /></span>
                      <input
                        type={showPwd ? 'text' : 'password'}
                        className="field-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                        required
                        style={{ paddingRight: '46px' }}
                      />
                      <button type="button" className="pwd-toggle" onClick={() => setShowPwd(!showPwd)}>
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
                {error && <div className="error-box"><div className="error-dot" /><span className="error-text">{error}</span></div>}
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <><div className="spinner" /> Signing in...</> : <>Sign In <ArrowRight size={16} /></>}
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
