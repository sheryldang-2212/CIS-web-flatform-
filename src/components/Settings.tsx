import { User, Shield, Bell, Key, Smartphone, MapPin, X } from 'lucide-react';
import './Settings.css';

interface SettingsModalProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose: () => void;
}

export default function SettingsModal({ activeTab, setActiveTab, onClose }: SettingsModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content settings-modal" onClick={e => e.stopPropagation()}>
        <button className="settings-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="settings-container">
          <div className="settings-sidebar">
            <h2 className="settings-title">Settings</h2>
            <nav className="settings-nav">
              <button 
                className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} className="settings-icon" />
                <span>My Profile</span>
              </button>
              <button 
                className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Shield size={18} className="settings-icon" />
                <span>Account & Security</span>
              </button>
              <button 
                className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18} className="settings-icon" />
                <span>Notifications</span>
              </button>
            </nav>
          </div>

          <div className="settings-content">
            {activeTab === 'profile' && (
              <div className="settings-section">
                <h3 className="section-header">Personal Information</h3>
                <p className="section-desc">Update your personal details and how others see you on the platform.</p>
                
                <div className="profile-form">
                  <div className="avatar-upload-section">
                    <div className="avatar-large">SC</div>
                    <div className="avatar-actions">
                      <button className="btn-primary-small">Change Avatar</button>
                      <button className="btn-secondary-small">Remove</button>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" defaultValue="Sarah" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" defaultValue="Chen" />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" defaultValue="sarah.chen@email.com" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input type="date" defaultValue="1990-05-15" />
                    </div>
                    <div className="form-group">
                      <label>Gender</label>
                      <select defaultValue="female">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Bio / Notes</label>
                    <textarea rows={4} placeholder="Add a short bio..."></textarea>
                  </div>

                  <div className="settings-footer-actions">
                    <button className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={onClose}>Save Changes</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="settings-section">
                <h3 className="section-header">Account & Security</h3>
                <p className="section-desc">Manage your password and secure your account.</p>

                <div className="security-card">
                  <div className="security-card-header">
                    <Key size={20} className="text-primary" />
                    <div className="security-card-title">
                      <h4>Password</h4>
                      <p>Last changed 3 months ago</p>
                    </div>
                    <button className="btn-secondary-small ml-auto">Update</button>
                  </div>
                </div>



                <h4 className="subsection-header mt-8">Recent Login Activity</h4>
                <div className="login-history">
                  <div className="login-item">
                    <div className="device-icon"><Smartphone size={16} /></div>
                    <div className="login-details">
                      <span className="device-name">iPhone 13 Pro</span>
                      <span className="login-meta">Bangkok, Thailand &middot; Active now</span>
                    </div>
                  </div>
                  <div className="login-item">
                    <div className="device-icon"><MapPin size={16} /></div>
                    <div className="login-details">
                      <span className="device-name">MacBook Pro (Chrome)</span>
                      <span className="login-meta">Bangkok, Thailand &middot; 2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h3 className="section-header">Notifications</h3>
                <p className="section-desc">Manage how you receive alerts and updates.</p>
                <div className="empty-state">Notification preferences coming soon.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
