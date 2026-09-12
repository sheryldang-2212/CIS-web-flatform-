import React, { useState } from 'react';
import { X, Edit, Trash2 } from 'lucide-react';
import './UserDetailsDrawer.css';

interface UserDetailsDrawerProps {
  user: any;
  onClose: () => void;
  onEdit: () => void;
}

export default function UserDetailsDrawer({ user, onClose, onEdit }: UserDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<'information' | 'history'>('information');

  if (!user) return null;

  const initials = user.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="ud-drawer-overlay" onClick={onClose}>
      <div className="ud-drawer-content" onClick={e => e.stopPropagation()}>
        <div className="ud-drawer-header">
          <h2>User detail</h2>
          <button className="ud-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="ud-drawer-tabs">
          <button 
            className={`ud-tab ${activeTab === 'information' ? 'active' : ''}`}
            onClick={() => setActiveTab('information')}
          >
            Information
          </button>
          <button 
            className={`ud-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History Log
          </button>
        </div>

        <div className="ud-drawer-body">
          {activeTab === 'information' && (
            <div className="ud-info-card">
              <div className="ud-profile-header">
                <div className="ud-avatar">{initials}</div>
                <div className="ud-profile-info">
                  <div className="ud-profile-name">{user.name}</div>
                  <div className="ud-profile-email">{user.email}</div>
                </div>
              </div>

              <div className="ud-details-list">
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Phone Number</span>
                  <span className="ud-detail-value">{user.phone || '—'}</span>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Email Address</span>
                  <span className="ud-detail-value">{user.email}</span>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Role</span>
                  <div className="ud-detail-value">
                    <span className={`um-badge um-badge-role um-role-${(user.role[0] || 'receptionist').replace(/\s+/g, '').toLowerCase()}`}>
                      {user.role[0] || 'Receptionist'}
                    </span>
                  </div>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Status</span>
                  <div className="ud-detail-value">
                    <span className={`um-badge um-badge-status-${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </div>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Clinic access</span>
                  <span className="ud-detail-value">{user.clinic}</span>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Created date</span>
                  <span className="ud-detail-value">Feb 4, 2026, 02:07</span>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Last login</span>
                  <span className="ud-detail-value" style={{ whiteSpace: 'pre-line' }}>{user.lastLogin}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="ud-history-content">
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>No history available.</p>
            </div>
          )}
        </div>

        <div className="ud-drawer-footer">
          <button className="ud-btn-outline" onClick={() => { onClose(); onEdit(); }}>
            <Edit size={16} /> Edit user
          </button>
          <button className="ud-btn-outline ud-btn-danger">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
