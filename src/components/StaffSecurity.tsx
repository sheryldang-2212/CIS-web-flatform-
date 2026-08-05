import { useState } from 'react';
import { Key, Clock, Save, Edit2, CheckCircle } from 'lucide-react';
import './StaffSecurity.css';

export default function StaffSecurity() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordExpiry, setPasswordExpiry] = useState('90');
  const [sessionTimeout, setSessionTimeout] = useState('15');

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };





  return (
    <div className="staff-security-container fadeIn">
      <div className="ss-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Staff Security</h1>
          <p>Manage authentication requirements, session limits, and access controls for clinic staff.</p>
        </div>
        {!isEditing && (
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setIsEditing(true)}>
            <Edit2 size={16} /> Edit Settings
          </button>
        )}
      </div>



      {/* Password Policy */}
      <div className="ss-card">
        <div className="ss-card-header">
          <div className="ss-card-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            <Key size={20} />
          </div>
          <div className="ss-card-title">
            <h2>Password Policy</h2>
            <p>Define complexity and expiration rules for staff passwords.</p>
          </div>
        </div>

        <div className="ss-action-row">
          <div className="ss-action-info">
            <h3>Password Expiration</h3>
            <p>Force users to reset their passwords periodically.</p>
          </div>
          <div className="ss-input-group">
            <select className="ss-select" value={passwordExpiry} onChange={(e) => setPasswordExpiry(e.target.value)} disabled={!isEditing} style={{ opacity: !isEditing ? 0.7 : 1 }}>
              <option value="30">Every 30 days</option>
              <option value="60">Every 60 days</option>
              <option value="90">Every 90 days</option>
              <option value="never">Never expire</option>
            </select>
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="ss-card">
        <div className="ss-card-header">
          <div className="ss-card-icon" style={{ backgroundColor: 'rgba(203, 160, 40, 0.1)', color: 'var(--primary)' }}>
            <Clock size={20} />
          </div>
          <div className="ss-card-title">
            <h2>Session Management</h2>
            <p>Control idle timeouts to protect patient data on unattended screens.</p>
          </div>
        </div>

        <div className="ss-action-row">
          <div className="ss-action-info">
            <h3>Idle Session Timeout</h3>
            <p>Automatically log out users after a period of inactivity.</p>
          </div>
          <div className="ss-input-group">
            <select className="ss-select" value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} disabled={!isEditing} style={{ opacity: !isEditing ? 0.7 : 1 }}>
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>
        </div>
      </div>



      {isEditing && (
        <div className="ss-footer">
          <button className="btn-secondary" style={{ marginRight: '12px' }} onClick={() => setIsEditing(false)}>
            Cancel
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleSave}>
            <Save size={16} /> Save Security Settings
          </button>
        </div>
      )}

      {showSuccess && (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
          <div className="modal-content" style={{ width: '400px', textAlign: 'center', padding: '40px 24px' }}>
            <CheckCircle size={48} color="var(--success)" style={{ margin: '0 auto 16px auto' }} />
            <h2 style={{ marginBottom: '8px', fontSize: '20px' }}>Settings Saved!</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Staff security settings have been successfully updated and applied.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
