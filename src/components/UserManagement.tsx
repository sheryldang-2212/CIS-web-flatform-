import { useState, useEffect } from 'react';
import { Settings, UserPlus, Search, Edit, Key, Eye, PowerOff, Shield } from 'lucide-react';
import UserFormModal from './UserFormModal';
import UserDetailsDrawer from './UserDetailsDrawer';
import './UserManagement.css';

const MOCK_USERS = [
  { id: '1', name: 'Robert Clark', email: 'robert.clark@innotechlab.net', phone: '+66 097-2077', clinic: 'All Clinics', role: ['Clinic Admin'], status: 'Active', lastLogin: 'May 6, 2026\n11:11', hasKey: false },
  { id: '2', name: 'Malee Srikul', email: 'malee.srikul@innotechlab.net', phone: '+66 024-2154', clinic: 'Chiang Mai Health Hub', role: ['Clinic Admin'], status: 'Active', lastLogin: 'Jun 11, 2026\n14:22', hasKey: false },
  { id: '3', name: 'Susan Moore', email: 'susan.moore@innotechlab.net', phone: '+66 871-2231', clinic: 'Sathorn Family Clinic', additionalClinics: '+1 more', role: ['Clinic Admin'], status: 'Active', lastLogin: 'Jan 16, 2026\n17:33', hasKey: false },
  { id: '4', name: 'Orawan Petchara', email: 'orawan.petchara@innotechlab.net', phone: '+66 838-2305', clinic: 'Phuket Wellness Center', role: ['Clinic Admin'], status: 'Inactive', lastLogin: 'Feb 21, 2026\n10:44', hasKey: false },
  { id: '5', name: 'David Wilson', email: 'david.wilson@innotechlab.net', phone: '+66 075-2365', clinic: 'Ari Medical Practice', role: ['Clinic Admin'], status: 'Active', lastLogin: 'Mar 26, 2026\n13:55', hasKey: false },
  { id: '6', name: 'Achara Intharachai', email: 'achara.intharachai@innotechlab.net', phone: '+66 032-2462', clinic: 'Lanna Care Clinic', additionalClinics: '+2 more', role: ['Clinic Admin'], status: 'Active', lastLogin: 'Apr 3, 2026\n16:06', hasKey: false },
  { id: '7', name: 'Daniel Srisawat', email: 'daniel.srisawat@innotechlab.net', phone: '+66 079-2539', clinic: 'Ekkamai Dental & Medical', role: ['Doctor'], status: 'Active', lastLogin: 'May 8, 2026\n09:17', hasKey: false },
  { id: '8', name: 'Busaba Phromsri', email: 'busaba.phromsri@innotechlab.net', phone: '+66 836-2615', clinic: 'Khon Kaen City Clinic', role: ['Doctor'], status: 'Active', lastLogin: 'Jun 13, 2026\n12:28', hasKey: false },
  { id: '9', name: 'Michael Wright', email: 'michael.wright@innotechlab.net', phone: '+66 859-2693', clinic: 'Silom Health Services', role: ['Doctor'], status: 'Inactive', lastLogin: 'Jan 10, 2026\n13:39', hasKey: false },
  { id: '10', name: 'Ploy Sukjai', email: 'ploy.sukjai@innotechlab.net', phone: '+66 040-2770', clinic: 'Chiang Rai Wellness', role: ['Doctor'], status: 'Active', lastLogin: 'Feb 23, 2026\n03:50', hasKey: false },
];

interface UserManagementProps {
  currentRole?: string;
  currentClinic?: any;
  mockClinics?: any[];
}

export default function UserManagement({ currentRole, currentClinic, mockClinics }: UserManagementProps) {
  const [showUserForm, setShowUserForm] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState<'profile' | 'permissions' | 'security'>('profile');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [viewUser, setViewUser] = useState<any>(null);
  const [selectedClinicId, setSelectedClinicId] = useState<string>(currentClinic?.id || 'all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Temporarily bypass clinic filtering to show mock data
  let filteredUsers = MOCK_USERS;

  // Custom stats based on screenshot
  const stats = [
    { label: 'Clinic Admin', value: 6 },
    { label: 'Doctor', value: 12 },
    { label: 'Technician', value: 6 },
    { label: 'Receptionist', value: 5 },
  ];

  const handleEditUser = (user: any, tab: 'profile' | 'permissions' | 'security' = 'profile') => {
    setSelectedUser(user);
    setActiveFormTab(tab);
    setShowUserForm(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setActiveFormTab('profile');
    setShowUserForm(true);
  };

  return (
    <div className="um-container">
      <div className="um-header">
        <div className="um-title-section">
          <h1>User Management</h1>
        </div>
        
        {currentRole === 'Platform Admin' && mockClinics && (
          <div style={{ marginLeft: 'auto', marginRight: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Clinic:</span>
            <select 
              value={selectedClinicId}
              onChange={(e) => setSelectedClinicId(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' }}
            >
              <option value="all">All Clinics</option>
              {mockClinics.map((clinic: any) => (
                <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="um-actions">
          <button className="um-btn-secondary">
            <Settings size={16} /> Bulk Actions
          </button>
          <button className="um-btn-primary" onClick={handleAddUser}>
            <UserPlus size={16} /> Add User
          </button>
        </div>
      </div>

      <div className="um-stats-grid">
            {stats.map(stat => (
              <div key={stat.label} className="um-stat-card">
                <span className="um-stat-value">{stat.value}</span>
                <span className="um-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="um-section">
            <div className="um-toolbar">
              <div className="um-search">
                <Search size={16} className="um-search-icon" />
                <input type="text" placeholder="Search by name or email" />
              </div>
              <div className="um-filters">
                <div className="um-filter-group">
                  <label>Role:</label>
                  <select className="um-filter-select"><option>All</option></select>
                </div>
                <div className="um-filter-group">
                  <label>Clinic:</label>
                  <select className="um-filter-select"><option>All</option></select>
                </div>
                <div className="um-filter-group">
                  <label>Status:</label>
                  <select className="um-filter-select"><option>All</option></select>
                </div>
                <button className="um-btn-reset">Reset</button>
              </div>
            </div>

            <div className="um-table-container">
              <table className="um-table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}><input type="checkbox" className="um-user-checkbox" /></th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>STATUS</th>
                    <th>LAST LOGIN</th>
                    <th style={{ width: 40 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td><input type="checkbox" className="um-user-checkbox" /></td>
                      <td>
                        <div className="um-user-details">
                          <span className="um-user-name">
                            {user.hasKey && <Key size={14} className="um-key-icon" />}
                            {user.name}
                          </span>
                          <span className="um-user-phone">{user.phone}</span>
                        </div>
                      </td>
                      <td>
                        <span className="um-cell-text">{user.email}</span>
                      </td>
                      <td>
                        <div className="um-roles-cell">
                          {user.role.slice(0, 1).map(r => (
                            <span key={r} className={`um-badge um-badge-role um-role-${r.replace(/\s+/g, '').toLowerCase()}`}>{r}</span>
                          ))}
                        </div>
                      </td>
                      <td><span className={`um-badge um-badge-status-${user.status.toLowerCase()}`}>{user.status}</span></td>
                      <td>
                        <span className="um-cell-text" style={{ whiteSpace: 'pre-line' }}>{user.lastLogin}</span>
                      </td>
                      <td style={{ position: 'relative' }}>
                        <div className="um-table-actions">
                          <button 
                            className="um-action-btn-more"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === user.id ? null : user.id);
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                          </button>
                          
                          {openMenuId === user.id && (
                            <div className="um-action-menu" onClick={(e) => e.stopPropagation()}>
                              <button className="um-action-item" onClick={() => { setOpenMenuId(null); setViewUser(user); }}>
                                <Eye size={14} className="um-action-icon" /> View details
                              </button>
                              <button className="um-action-item" onClick={() => { setOpenMenuId(null); handleEditUser(user, 'profile'); }}>
                                <Edit size={14} className="um-action-icon" /> Edit user
                              </button>
                              <button className="um-action-item" onClick={() => { setOpenMenuId(null); handleEditUser(user, 'permissions'); }}>
                                <Shield size={14} className="um-action-icon" /> Manage permissions
                              </button>
                              <button className="um-action-item">
                                <Key size={14} className="um-action-icon" /> Reset password
                              </button>
                              <div className="um-action-divider"></div>
                              <button className="um-action-item">
                                <PowerOff size={14} className="um-action-icon" /> Suspend user
                              </button>
                              <button className="um-action-item danger" style={{ color: '#ef4444' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="um-action-icon"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> Delete user
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="um-pagination">
              <span className="um-pagination-info">Showing 1 - 10 of 29 users</span>
              <div className="um-pagination-controls">
                <button className="um-page-btn">&lt;</button>
                <button className="um-page-btn active">1</button>
                <button className="um-page-btn">2</button>
                <button className="um-page-btn">3</button>
                <button className="um-page-btn">&gt;</button>
              </div>
            </div>
          </div>
      
      {showUserForm && (
        <UserFormModal
          user={selectedUser}
          initialTab={activeFormTab}
          onClose={() => setShowUserForm(false)}
        />
      )}
      
      {viewUser && (
        <UserDetailsDrawer 
          user={viewUser} 
          onClose={() => setViewUser(null)} 
          onEdit={() => {
            setViewUser(null);
            handleEditUser(viewUser, 'profile');
          }}
        />
      )}
    </div>
  );
}
