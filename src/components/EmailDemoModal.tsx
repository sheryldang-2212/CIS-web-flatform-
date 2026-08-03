import { X } from 'lucide-react';
import './EmailDemoModal.css';

interface EmailDemoModalProps {
  email: string;
  onClose: () => void;
  onAccept?: () => void;
}

export default function EmailDemoModal({ email, onClose, onAccept }: EmailDemoModalProps) {
  return (
    <div className="modal-overlay email-demo-overlay" onClick={onClose}>
      <div className="email-client-container" onClick={e => e.stopPropagation()}>
        <div className="email-client-header">
          <div className="window-controls">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="email-client-title">Inbox - {email}</span>
          <button className="email-close-btn" onClick={onClose}><X size={16} /></button>
        </div>
        
        <div className="email-content">
          <div className="email-meta">
            <div className="email-meta-row">
              <span className="meta-label">From:</span>
              <span className="meta-value">no-reply@healthhub.com &lt;Health Hub System&gt;</span>
            </div>
            <div className="email-meta-row">
              <span className="meta-label">To:</span>
              <span className="meta-value">{email}</span>
            </div>
            <div className="email-meta-row">
              <span className="meta-label">Subject:</span>
              <span className="meta-value font-semibold">Invitation to join Downtown Clinic on Health Hub</span>
            </div>
          </div>
          
          <div className="email-body">
            <div className="email-brand-header">
              <h2 className="text-primary">HEALTH HUB</h2>
            </div>
            
            <p>Dear Patient,</p>
            <p>You have been registered at <strong>Downtown Clinic</strong> by the clinic staff.</p>
            <p>To access your lab results, appointment schedules, and communicate securely with your doctor, please accept this invitation to set up your patient portal account.</p>
            
            <div className="email-action-box">
              <button className="btn-email-primary" onClick={onAccept}>
                Accept Invitation & Setup Account
              </button>
              <p className="email-fallback-text">
                Or copy and paste this link into your browser:<br/>
                <a href="#">https://patient.healthhub.com/invite/accept?token=DEMO12345</a>
              </p>
            </div>
            
            <p>This invitation link will expire in 7 days.</p>
            
            <p className="email-signoff">
              Best regards,<br/>
              The Downtown Clinic Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
