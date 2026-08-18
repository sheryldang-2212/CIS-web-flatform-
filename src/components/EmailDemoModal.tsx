import { X } from 'lucide-react';
import './EmailDemoModal.css';

interface EmailDemoModalProps {
  email: string;
  subject?: string;
  greeting?: string;
  body1?: React.ReactNode;
  body2?: string;
  buttonText?: string;
  onClose: () => void;
  onAccept?: () => void;
}

export default function EmailDemoModal({ 
  email, 
  subject = "Invitation to join Health Hub", 
  greeting = "Dear User,",
  body1 = "You have been registered by the clinic staff.",
  body2 = "To access your account, please accept this invitation to set up your profile.",
  buttonText = "Accept Invitation & Setup Account",
  onClose, 
  onAccept 
}: EmailDemoModalProps) {
  return (
    <div className="modal-overlay email-demo-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
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
              <span className="meta-value font-semibold">{subject}</span>
            </div>
          </div>
          
          <div className="email-body">
            <div className="email-brand-header">
              <h2 className="text-primary">HEALTH HUB</h2>
            </div>
            
            <p>{greeting}</p>
            <p>{body1}</p>
            <p>{body2}</p>
            
            <div className="email-action-box">
              <button className="btn-email-primary" onClick={onAccept}>
                {buttonText}
              </button>
              <p className="email-fallback-text">
                Or copy and paste this link into your browser:<br/>
                <a href="#">https://app.healthhub.com/invite/accept?token=DEMO12345</a>
              </p>
            </div>
            
            <p>This invitation link will expire in 7 days.</p>
            
            <p className="email-signoff">
              Best regards,<br/>
              Health Hub Administration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
