import { useState } from 'react';
import { Settings, UserPlus, Search, Edit, Trash2, Key } from 'lucide-react';
import UserFormModal from './UserFormModal';
import './UserManagement.css';

const MOCK_USERS = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@healthhub.com', phone: '+1234567890', clinic: 'Downtown Medical Center', role: ['Receptionist'], status: 'Active', lastLogin: 'Jan 15, 2024 08:30', hasKey: false },
  { id: '2', name: 'Dr. James Wilson', email: 'james.wilson@healthhub.com', phone: '+1234567891', clinic: 'Downtown Medical Center', role: ['Doctor', 'Clinic Admin'], status: 'Active', lastLogin: 'Jan 15, 2024 07:45', hasKey: true },
  { id: '3', name: 'Maria Rodriguez', email: 'maria.rodriguez@healthhub.com', phone: '+1234567892', clinic: 'Downtown Medical Center', role: ['Technician', 'Receptionist'], status: 'Active', lastLogin: 'Jan 15, 2024 09:00', hasKey: false },
  { id: '4', name: 'Dr. Lisa Park', email: 'lisa.park@healthhub.com', phone: '+1234567893', clinic: 'Downtown Medical Center', role: ['Admin'], status: 'Active', lastLogin: 'Jan 15, 2024 08:00', hasKey: true },
  { id: '5', name: 'Jennifer Thompson', email: 'jennifer.thompson@suburbanfamily.com', phone: '+1234567896', clinic: 'Suburban Family Clinic', role: ['Receptionist'], status: 'Active', lastLogin: 'Jan 15, 2024 08:15', hasKey: false },
  { id: '6', name: 'Dr. Michael Davis', email: 'michael.davis@suburbanfamily.com', phone: '+1234567897', clinic: 'Suburban Family Clinic', role: ['Doctor'], status: 'Active', lastLogin: 'Jan 15, 2024 07:30', hasKey: true },
  { id: '7', name: 'Dr. Anna Martinez', email: 'anna.martinez@suburbanfamily.com', phone: '+1234567898', clinic: 'Suburban Family Clinic', role: ['Admin', 'Doctor', 'Technician'], status: 'Active', lastLogin: 'Jan 15, 2024 08:30', hasKey: true },
  { id: '8', name: 'Robert Johnson', email: 'robert.johnson@urgentcare.com', phone: '+1234567899', clinic: 'Emergency Care Center', role: ['Technician'], status: 'Active', lastLogin: 'Jan 15, 2024 06:00', hasKey: false },
];

interface UserManagementProps {
  currentRole?: string;
  currentClinic?: any;
  mockClinics?: any[];
}

export default function UserManagement({ currentRole, currentClinic, mockClinics }: UserManagementProps) {
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedClinicId, setSelectedClinicId] = useState<string>(currentClinic?.id || 'all');

  // Filter users based on selected clinic
  let filteredUsers = MOCK_USERS;
  if (currentRole === 'Platform Admin' && selectedClinicId !== 'all') {
    const selectedClinicName = mockClinics?.find(c => c.id === selectedClinicId)?.name;
    filteredUsers = MOCK_USERS.filter(user => user.clinic === selectedClinicName);
  } else if (currentRole !== 'Platform Admin' && currentClinic) {
    // If not Platform Admin, only show users from current clinic
    filteredUsers = MOCK_USERS.filter(user => user.clinic === currentClinic.name);
  }

  // Recalculate stats based on filtered users
  const stats = [
    { label: 'Receptionist', value: filteredUsers.filter(u => u.role.includes('Receptionist')).length },
    { label: 'Doctor', value: filteredUsers.filter(u => u.role.includes('Doctor')).length },
    { label: 'Technician', value: filteredUsers.filter(u => u.role.includes('Technician')).length },
    { label: 'Admin', value: filteredUsers.filter(u => u.role.includes('Admin') || u.role.includes('Clinic Admin')).length },
  ];

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowUserForm(true);
  };

  return (
    <div className="um-container">
      <div className="um-header">
        <div className="um-title-section">
          <h1>User Management</h1>
          <p>Manage users, permissions, and security settings</p>
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
            <div className="um-section-header">
              <h2>Users</h2>
              <p>Manage system users and their permissions</p>
            </div>

            <div className="um-toolbar">
              <div className="um-search">
                <Search size={16} className="um-search-icon" />
                <input type="text" placeholder="Search users..." />
              </div>
              <div className="um-filters">
                <select className="um-filter-select">
                  <option>All Roles</option>
                  <option>Receptionist</option>
                  <option>Technician</option>
                  <option>Doctor</option>
                  <option>Admin</option>
                </select>
                <select className="um-filter-select">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="um-table-container">
              <table className="um-table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}><input type="checkbox" className="um-user-checkbox" /></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
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
                        {currentRole === 'Platform Admin' && (
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{user.clinic}</div>
                        )}
                      </td>
                      <td>
                        <div className="um-roles-cell">
                          {user.role.slice(0, 1).map(r => (
                            <span key={r} className="um-badge um-badge-role">{r}</span>
                          ))}
                          {user.role.length > 1 && (
                            <span 
                              className="um-badge um-badge-role-more" 
                              title={user.role.slice(1).join(', ')}
                            >
                              +{user.role.length - 1}
                            </span>
                          )}
                        </div>
                      </td>
                      <td><span className="um-badge um-badge-active">{user.status}</span></td>
                      <td>
                        <span className="um-cell-text">{user.lastLogin}</span>
                      </td>
                      <td>
                        <div className="um-table-actions">
                          <button className="um-action-btn" onClick={() => handleEditUser(user)}>
                            <Edit size={16} />
                          </button>
                          <button className="um-action-btn">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      
      {showUserForm && (
        <UserFormModal
          user={selectedUser}
          onClose={() => setShowUserForm(false)}
        />
      )}
    </div>
  );
}
