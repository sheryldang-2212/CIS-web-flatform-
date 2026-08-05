import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import AuthLayout from './AuthLayout';

interface ForgotPasswordProps {
  onNavigate: (route: string) => void;
}

export default function ForgotPassword({ onNavigate }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'input-email' | 'email-sent'>('input-email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep('email-sent');
    }
  };

  return (
    <AuthLayout>
      {step === 'input-email' && (
        <div className="fadeIn">
          <div className="auth-header-text">
            <h3>Forgot password?</h3>
            <p>Enter your registered email address and we'll send you a link to reset your password.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label>Registered email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-auth-primary" style={{ marginBottom: '24px' }}>
              Next
            </button>
            
            <div style={{ textAlign: 'center' }}>
              <span className="auth-link" onClick={() => onNavigate('login')}>Back to Sign in</span>
            </div>
          </form>
        </div>
      )}

      {step === 'email-sent' && (
        <div className="fadeIn" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: '#ecfdf5', borderRadius: '50%', color: '#10b981', marginBottom: '24px' }}>
            <Mail size={32} />
          </div>
          
          <div className="auth-header-text">
            <h3>Check your email</h3>
            <p>We have sent a password reset link to <strong>{email}</strong>.</p>
          </div>

          <button className="btn-auth-primary" style={{ marginBottom: '24px' }} onClick={() => setStep('input-email')}>
            Resend email
          </button>
          
          <div>
            <span className="auth-link" onClick={() => onNavigate('login')}>Back to Sign in</span>
          </div>

          {/* Hidden backdoor for testing: click text to simulate opening email link */}
          <div style={{ marginTop: '48px', fontSize: '11px', color: '#ccc' }}>
            [Demo: <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => onNavigate('reset-password')}>Open email link</span>]
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
