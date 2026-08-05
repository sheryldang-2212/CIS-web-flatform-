import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import AuthLayout from './AuthLayout';

interface CreatePasswordProps {
  mode?: 'create' | 'reset';
  onNavigate: (route: string) => void;
}

export default function CreatePassword({ mode = 'create', onNavigate }: CreatePasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [step, setStep] = useState<'input' | 'success'>('input');
  
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    });
  }, [password]);

  const allValid = Object.values(validations).every(Boolean) && password === confirmPassword && password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allValid) {
      setStep('success');
    }
  };

  return (
    <AuthLayout>
      {step === 'input' && (
        <div className="fadeIn">
          <div className="auth-header-text">
            <h3>{mode === 'create' ? 'Create password' : 'Set a new password'}</h3>
            <p>Please enter a strong password for your account.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label>New password</label>
              <div className="auth-input-icon-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-form-group" style={{ marginBottom: '16px' }}>
              <label>Confirm password</label>
              <div className="auth-input-icon-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-input-icon-right"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Validation Checklist */}
            <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <ValidationItem isValid={validations.length} text="At least 8 characters" />
              <ValidationItem isValid={validations.uppercase} text="At least 1 uppercase letter (A-Z)" />
              <ValidationItem isValid={validations.number} text="At least 1 number (0-9)" />
              <ValidationItem isValid={validations.special} text="At least 1 special character" />
            </div>

            <button type="submit" className="btn-auth-primary" disabled={!allValid} style={{ opacity: allValid ? 1 : 0.6, cursor: allValid ? 'pointer' : 'not-allowed' }}>
              {mode === 'create' ? 'Create' : 'Set password'}
            </button>
          </form>
        </div>
      )}

      {step === 'success' && (
        <div className="fadeIn" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: '#ecfdf5', borderRadius: '50%', color: '#10b981', marginBottom: '24px' }}>
            <CheckCircle2 size={32} />
          </div>
          
          <div className="auth-header-text">
            <h3>Password {mode === 'create' ? 'created' : 'reset'} successfully</h3>
            <p>Your password has been set. You can now use it to log in to your account.</p>
          </div>

          <button className="btn-auth-primary" onClick={() => onNavigate('login')}>
            Log in
          </button>
        </div>
      )}
    </AuthLayout>
  );
}

function ValidationItem({ isValid, text }: { isValid: boolean, text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: isValid ? '#10b981' : 'var(--text-muted)' }}>
      <CheckCircle2 size={14} color={isValid ? '#10b981' : '#9ca3af'} />
      <span>{text}</span>
    </div>
  );
}
