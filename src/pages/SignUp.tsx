import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import './SignUp.css';

interface SignUpProps {
  onNavigate: (screen: string) => void;
}

export default function SignUp({ onNavigate }: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    // In a real app, this would validate and register
    onNavigate('home');
  };

  return (
    <div className="auth-container hide-scrollbar">
      <div className="auth-content">
        <div className="auth-header">
          <h1 className="auth-title">Sign Up</h1>
          <p className="auth-subtitle">Create your account using your email address.</p>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="form-input-wrapper">
            <input 
              type="email" 
              className="form-input" 
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="form-input-wrapper">
            <input 
              type={showPassword ? 'text' : 'password'} 
              className="form-input" 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              className="input-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="password-rules">
          <p className="rule-title">Password must:</p>
          <div className="rule-item">
            <X size={12} />
            <span>Contain at least 12 characters</span>
          </div>
          <div className="rule-item">
            <X size={12} />
            <span>Contain uppercase, lowercase, number, and symbol</span>
          </div>
          <div className="rule-item">
            <X size={12} />
            <span>No common passwords (e.g. "123456", "password")</span>
          </div>
        </div>

        <div className="auth-actions">
          <button 
            className={`btn-primary ${(!email || !password) ? 'disabled' : ''}`}
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button 
            className="btn-outline"
            onClick={() => onNavigate('splash')}
          >
            Back
          </button>
        </div>

        <div className="login-link">
          Already have an account? 
          <a href="#" onClick={(e) => {
            e.preventDefault();
            onNavigate('home'); // Assume login goes to home for demo
          }}>
            Login now
          </a>
        </div>
      </div>
    </div>
  );
}
