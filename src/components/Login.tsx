import React, { useState } from 'react';
import { Eye, EyeOff, AlertTriangle, ChevronRight } from 'lucide-react';
import AuthLayout from './AuthLayout';
import Modal from './Modal';

interface LoginProps {
  onLoginSuccess: (clinic: any, role: string) => void;
  onNavigate: (route: string) => void;
  mockClinics: any[];
}

export default function Login({ onLoginSuccess, onNavigate, mockClinics }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Step management: 'credentials' -> 'select-clinic'
  const [step, setStep] = useState<'credentials' | 'select-clinic'>('credentials');
  const [selectedClinicId, setSelectedClinicId] = useState('');
  
  // Modal state for unactivated account
  const [showUnactivatedModal, setShowUnactivatedModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo simulations based on email
    if (email === 'error@test.com') {
      setError('Incorrect email or password.');
      return;
    }

    if (email === 'unactivated@test.com') {
      setShowUnactivatedModal(true);
      return;
    }

    // Default success path -> move to clinic selection if there are multiple
    if (mockClinics.length > 1) {
      setStep('select-clinic');
      setSelectedClinicId(mockClinics[0].id);
    } else {
      // Direct login if only 1 clinic
      onLoginSuccess(mockClinics[0], mockClinics[0].roles[0] || 'Receptionist');
    }
  };

  const handleContinue = () => {
    const clinic = mockClinics.find(c => c.id === selectedClinicId);
    if (clinic) {
      onLoginSuccess(clinic, clinic.roles[0] || 'Receptionist');
    }
  };

  return (
    <AuthLayout>
      {step === 'credentials' && (
        <div className="fadeIn">
          <div className="auth-header-text">
            <h3>Sign-in with Email</h3>
            <p>Sign in to access your clinic dashboard</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="auth-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="name@innotechlab.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error ? 'error' : ''}
                required
              />
            </div>

            <div className="auth-form-group">
              <label>
                <span>Password</span>
                <span className="auth-link" onClick={() => onNavigate('forgot-password')}>Forgot password?</span>
              </label>
              <div className="auth-input-icon-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? 'error' : ''}
                  required
                />
                <button
                  type="button"
                  className="auth-input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {error && <span className="auth-error-text">{error}</span>}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <input type="checkbox" id="remember" style={{ width: 'auto', cursor: 'pointer', accentColor: '#d9a05b' }} />
              <label htmlFor="remember" style={{ margin: 0, fontSize: '13px', cursor: 'pointer', fontWeight: 500, color: '#6b7280' }}>Remember this device for 30 days</label>
            </div>

            <button type="submit" className="btn-auth-primary">
              Sign in
            </button>
          </form>
          
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
            Trouble signing in? <span className="auth-link">Contact your Admin</span>
          </div>
        </div>
      )}

      {step === 'select-clinic' && (
        <div className="fadeIn">
          <div className="auth-header-text">
            <h3>Select Clinic</h3>
            <p>You have access to multiple clinics. Choose one to continue.</p>
          </div>

          <div className="auth-form-group">
            <label>Clinic</label>
            <select 
              style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: '#fff', fontSize: '14px' }}
              value={selectedClinicId}
              onChange={(e) => setSelectedClinicId(e.target.value)}
            >
              {mockClinics.map(clinic => (
                <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
              ))}
            </select>
          </div>

          <button type="button" className="btn-auth-primary" onClick={handleContinue} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            Continue <ChevronRight size={16} />
          </button>
          
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <span className="auth-link" onClick={() => setStep('credentials')}>Back to Sign in</span>
          </div>
        </div>
      )}

      {showUnactivatedModal && (
        <Modal title="" onClose={() => setShowUnactivatedModal(false)} size="sm">
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: '#fee2e2', borderRadius: '50%', color: '#ef4444', marginBottom: '16px' }}>
              <AlertTriangle size={32} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '12px' }}>Account Not Activated</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '24px' }}>
              Your account has not been activated yet. Please check your email inbox for the invitation link to set your password.
            </p>
            <button className="btn-auth-primary" onClick={() => setShowUnactivatedModal(false)}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </AuthLayout>
  );
}
