import React, { useState } from 'react';
import { Search, MoreVertical, UserPlus, Settings, Eye, Edit, Key, PowerOff, Trash2 } from 'lucide-react';
import './PlatformUserManagement.css';

const MOCK_PLATFORM_USERS = [
  { id: '1', name: 'Robert Clark', phone: '+66 867-2077', email: 'robert.clark@innotechlab.net', role: 'Clinic Admin', clinics: 'All Clinics', extraClinics: null, status: 'Active', lastLoginDate: 'May 6, 2026', lastLoginTime: '11:11' },
  { id: '2', name: 'Malee Sirikul', phone: '+66 824-2184', email: 'malee.sirikul@innotechlab.net', role: 'Clinic Admin', clinics: 'Chiang Mai Health Hub', extraClinics: null, status: 'Active', lastLoginDate: 'Jun 11, 2026', lastLoginTime: '14:22' },
  { id: '3', name: 'Susan Moore', phone: '+66 871-2231', email: 'susan.moore@innotechlab.net', role: 'Clinic Admin', clinics: 'Sathorn Family Clinic', extraClinics: '+1 more', status: 'Active', lastLoginDate: 'Jan 16, 2026', lastLoginTime: '17:33' },
  { id: '4', name: 'Orawan Petchara', phone: '+66 828-2308', email: 'orawan.petchara@innotechlab.net', role: 'Clinic Admin', clinics: 'Phuket Wellness Center', extraClinics: null, status: 'Inactive', lastLoginDate: 'Feb 21, 2026', lastLoginTime: '10:44' },
  { id: '5', name: 'David Wilson', phone: '+66 875-2385', email: 'david.wilson@innotechlab.net', role: 'Clinic Admin', clinics: 'Ari Medical Practice', extraClinics: null, status: 'Active', lastLoginDate: 'Mar 26, 2026', lastLoginTime: '13:55' },
  { id: '6', name: 'Achara Intharachai', phone: '+66 832-2462', email: 'achara.intharachai@innotechlab.net', role: 'Clinic Admin', clinics: 'Lanna Care Clinic', extraClinics: '+1 more', status: 'Active', lastLoginDate: 'Apr 3, 2026', lastLoginTime: '16:06' },
  { id: '7', name: 'Daniel Srisawat', phone: '+66 879-2539', email: 'daniel.srisawat@innotechlab.net', role: 'Doctor', clinics: 'Ekkamai Dental & Medical', extraClinics: null, status: 'Active', lastLoginDate: 'May 8, 2026', lastLoginTime: '09:17' },
  { id: '8', name: 'Busaba Phromsri', phone: '+66 836-2616', email: 'busaba.phromsri@innotechlab.net', role: 'Doctor', clinics: 'Khon Kaen City Clinic', extraClinics: null, status: 'Active', lastLoginDate: 'Jun 13, 2026', lastLoginTime: '12:28' },
  { id: '9', name: 'Michael Wright', phone: '+66 883-2693', email: 'michael.wright@innotechlab.net', role: 'Doctor', clinics: 'Silom Health Services', extraClinics: null, status: 'Inactive', lastLoginDate: 'Jan 18, 2026', lastLoginTime: '15:39' },
  { id: '10', name: 'Ploy Sukjai', phone: '+66 840-2770', email: 'ploy.sukjai@innotechlab.net', role: 'Doctor', clinics: 'Chiang Rai Wellness', extraClinics: null, status: 'Active', lastLoginDate: 'Feb 23, 2026', lastLoginTime: '08:50' },
];

export default function PlatformUserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="pum-container fadeIn">
      <div className="pum-header">
        <h1 className="pum-title">User Management</h1>
        <div className="pum-actions">
          <button className="pum-btn-secondary">
            <Settings size={16} /> Bulk Actions
          </button>
          <button className="pum-btn-primary">
            <UserPlus size={16} /> Add User
          </button>
        </div>
      </div>

      <div className="pum-kpi-grid">
        <div className="pum-kpi-card">
          <div className="pum-kpi-value">6</div>
          <div className="pum-kpi-label">Clinic Admin</div>
        </div>
        <div className="pum-kpi-card">
          <div className="pum-kpi-value">12</div>
          <div className="pum-kpi-label">Doctor</div>
        </div>
        <div className="pum-kpi-card">
          <div className="pum-kpi-value">6</div>
          <div className="pum-kpi-label">Technician</div>
        </div>
        <div className="pum-kpi-card">
          <div className="pum-kpi-value">5</div>
          <div className="pum-kpi-label">Receptionist</div>
        </div>
      </div>

      <div className="pum-filters-bar">
        <div className="pum-search-container">
          <Search size={16} className="pum-search-icon" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pum-search-input"
          />
        </div>
        <div className="pum-dropdowns">
          <select className="pum-select"><option>Role: All</option></select>
          <select className="pum-select"><option>Clinic: All</option></select>
          <select className="pum-select"><option>Status: All</option></select>
          <button className="pum-reset-btn">Reset</button>
        </div>
      </div>

      <div className="pum-table-wrapper">
        <table className="pum-table">
          <thead>
            <tr>
              <th style={{width: 40}}><input type="checkbox" /></th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>CLINIC ACCESS</th>
              <th>STATUS</th>
              <th>LAST LOGIN</th>
              <th style={{width: 40}}></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PLATFORM_USERS.map((user) => (
              <tr key={user.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="pum-user-name">{user.name}</div>
                  <div className="pum-user-phone">{user.phone}</div>
                </td>
                <td className="pum-email">{user.email}</td>
                <td>
                  <span className={`pum-role-badge ${user.role === 'Clinic Admin' ? 'role-admin' : 'role-doctor'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className="pum-clinic-name">{user.clinics}</span>
                  {user.extraClinics && <span className="pum-clinic-extra">{user.extraClinics}</span>}
                </td>
                <td>
                  <span className={`pum-status-badge ${user.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="pum-date">{user.lastLoginDate}</div>
                  <div className="pum-time">{user.lastLoginTime}</div>
                </td>
                <td style={{ position: 'relative' }}>
                  <button 
                    className="pum-more-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === user.id ? null : user.id);
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>
                  
                  {openMenuId === user.id && (
                    <div className="pum-action-menu" onClick={(e) => e.stopPropagation()}>
                      <button className="pum-action-item">
                        <Eye size={14} className="pum-action-icon" /> View details
                      </button>
                      <button className="pum-action-item">
                        <Edit size={14} className="pum-action-icon" /> Edit user
                      </button>
                      <button className="pum-action-item">
                        <Key size={14} className="pum-action-icon" /> Reset password
                      </button>
                      <button className="pum-action-item">
                        <PowerOff size={14} className="pum-action-icon" /> Suspend user
                      </button>
                      <button className="pum-action-item danger">
                        <Trash2 size={14} className="pum-action-icon" /> Delete user
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="pum-pagination">
          <span>Showing 1-10 of 29 users</span>
          <div className="pum-pages">
            <button className="pum-page-btn">&lt;</button>
            <button className="pum-page-btn active">1</button>
            <button className="pum-page-btn">2</button>
            <button className="pum-page-btn">3</button>
            <button className="pum-page-btn">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
