import React from 'react';
import { PieChart, Briefcase, FlaskConical, ClipboardList } from 'lucide-react';
import './AuthLayout.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      {/* Left Side - Hero Card */}
      <div className="auth-hero-card">
        <div className="auth-hero-bg"></div>
        <div className="auth-hero-content">
          <div className="auth-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V4M12 20V22M4 12H2M22 12H20M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="#d9a05b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="#d9a05b" strokeWidth="2" />
              </svg>
            </div>
            <span className="logo-text-auth">HEALTH HUB</span>
          </div>
          <h1 className="auth-title">One Platform</h1>
          <h2 className="auth-subtitle">Complete Healthcare Management</h2>

          <div className="auth-features-list">
            <div className="auth-feature-pill">
              <div className="feature-icon-wrapper">
                <PieChart size={20} strokeWidth={2} />
              </div>
              <span className="feature-text">Dashboard Analytics</span>
            </div>
            
            <div className="auth-feature-pill">
              <div className="feature-icon-wrapper">
                <Briefcase size={20} strokeWidth={2} />
              </div>
              <span className="feature-text">Active Patients</span>
            </div>
            
            <div className="auth-feature-pill">
              <div className="feature-icon-wrapper">
                <FlaskConical size={20} strokeWidth={2} />
              </div>
              <span className="feature-text">Lab Results</span>
            </div>
            
            <div className="auth-feature-pill">
              <div className="feature-icon-wrapper">
                <ClipboardList size={20} strokeWidth={2} />
              </div>
              <span className="feature-text">Today's Appointments</span>
            </div>
          </div>
        </div>
        
        {/* Doctor Image */}
        <div className="auth-hero-image-container">
          <img src="/auth-hero.png" alt="Doctor" className="auth-hero-image" />
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="auth-form-side">
        <div className="auth-form-container fadeIn">
          {children}
        </div>
      </div>
    </div>
  );
}
