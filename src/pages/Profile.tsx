import React, { useState } from 'react';
import { MoreVertical, Edit2 } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="flex flex-col h-full hide-scrollbar">
      <div className="profile-header">
        <div className="avatar-container">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
            alt="Patrick Doe" 
            className="avatar-img"
          />
          <div className="edit-badge">
            <Edit2 size={10} />
          </div>
        </div>
        <h2 className="profile-name text-navy">Patrick Doe</h2>
        <p className="profile-email">patrickdoe@example.com</p>
        <p className="profile-vitals">Age: 43 | Weight: 70 | Height: 175</p>
        <span className="profile-tag">Desk-Life Regular</span>
      </div>

      <div className="integration-card">
        <div className="integration-info">
          <p className="title text-navy">Apple Health</p>
          <p className="status">Connected | Last sync: 2 mins ago</p>
        </div>
        <button className="icon-button">
          <MoreVertical size={20} className="text-muted" />
        </button>
      </div>

      <div className="profile-card hide-scrollbar">
        <div className="profile-tabs">
          <button 
            className={`profile-tab-item ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal
          </button>
          <button 
            className={`profile-tab-item ${activeTab === 'medical' ? 'active' : ''}`}
            onClick={() => setActiveTab('medical')}
          >
            Medical
          </button>
          <button 
            className={`profile-tab-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {activeTab === 'personal' && (
          <>
            <div className="info-section">
              <div className="section-header">
                <h3 className="section-title">Personal Information</h3>
                <button className="edit-link">Edit</button>
              </div>
              <div className="info-list">
                <div className="info-row">
                  <span className="info-label">Name</span>
                  <span className="info-value">Patrick Doe</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Nickname</span>
                  <span className="info-value">Pat</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Date of birth</span>
                  <span className="info-value">15/01/1990</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Gender</span>
                  <span className="info-value">Male</span>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="info-section">
              <div className="section-header">
                <h3 className="section-title">Contact Information</h3>
                <button className="edit-link">Edit</button>
              </div>
              <div className="info-list">
                <div className="info-row">
                  <span className="info-label">Phone</span>
                  <span className="info-value">+1 234 567 8900</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Address</span>
                  <span className="info-value">123 Main St, NY 10001</span>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'medical' && (
          <div className="p-4 text-center text-muted">
            Medical information will appear here.
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="p-4 text-center text-muted">
            App settings will appear here.
          </div>
        )}

      </div>
    </div>
  );
}
