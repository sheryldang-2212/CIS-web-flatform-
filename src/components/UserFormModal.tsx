import { useState } from 'react';
import { X, Edit2, User, Stethoscope, Microscope, Shield, ChevronUp, ChevronDown, Monitor, Users, Beaker, Calendar, Mail, Phone } from 'lucide-react';
import './UserFormModal.css';

interface UserFormModalProps {
  user: any;
  onClose: () => void;
}

export default function UserFormModal({ user, onClose }: UserFormModalProps) {
  const isEdit = !!user;
  const [activeTab, setActiveTab] = useState<'profile' | 'permissions' | 'security'>('permissions');
  
  // Accordion state
  const [assignedRoles, setAssignedRoles] = useState<string[]>(['Receptionist']);
  const [expandedRole, setExpandedRole] = useState<string | null>('Receptionist');

  const toggleRole = (role: string) => {
    setAssignedRoles(prev => {
      const isSelected = prev.includes(role);
      let newRoles;
      if (isSelected) {
        newRoles = prev.filter(r => r !== role);
        if (expandedRole === role) setExpandedRole(null);
      } else {
        newRoles = [...prev, role];
        setExpandedRole(role); // Auto-expand newly assigned role
      }
      return newRoles;
    });
  };

  const roleOptions = [
    { name: 'Receptionist', icon: User },
    { name: 'Technician', icon: Microscope },
    { name: 'Doctor', icon: Stethoscope },
    { name: 'Clinic Admin', icon: Shield }
  ];
  
  const initials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('') : 'AM';

  return (
    <div className="um-modal-overlay" onClick={onClose}>
      <div className="um-modal-content" onClick={e => e.stopPropagation()}>
        <div className="um-modal-header">
          <h2>User Details</h2>
          <button className="um-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="um-top-profile">
          <div className="um-top-profile-info">
            <div className="um-avatar-large">{initials}</div>
            <div className="um-profile-name-group">
              <span className="um-profile-name">
                {user?.name || 'Ananda Meesuk'}
                <span className="um-clinic-badge active">Active</span>
              </span>
              <span className="um-profile-email">{user?.email || 'ananda.m@innotech.co.th'}</span>
            </div>
          </div>
          <button className="um-btn-outline">
            <Edit2 size={14} /> Edit Profile
          </button>
        </div>

        <div className="um-detail-tabs">
          <button 
            className={`um-detail-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`um-detail-tab ${activeTab === 'permissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('permissions')}
          >
            Role & Permissions
          </button>
          <button 
            className={`um-detail-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security & Sessions
          </button>
        </div>

        <div className="um-modal-body">
          {activeTab === 'profile' && (
            <div className="um-profile-tab-content">
              <h3 className="um-section-title">Personal Information</h3>
              <div className="um-form-grid">
                <div className="um-form-group">
                  <label>First Name</label>
                  <div className="um-input-wrapper">
                    <User size={16} className="um-input-icon" />
                    <input type="text" className="um-form-input with-icon" defaultValue="Ananda" />
                  </div>
                </div>
                <div className="um-form-group">
                  <label>Last Name</label>
                  <div className="um-input-wrapper">
                    <User size={16} className="um-input-icon" />
                    <input type="text" className="um-form-input with-icon" defaultValue="Meesuk" />
                  </div>
                </div>
                <div className="um-form-group">
                  <label>Date of Birth</label>
                  <div className="um-input-wrapper">
                    <Calendar size={16} className="um-input-icon" />
                    <input type="date" className="um-form-input with-icon" defaultValue="1990-05-15" />
                  </div>
                </div>
                <div className="um-form-group">
                  <label>Gender</label>
                  <select className="um-form-select">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <h3 className="um-section-title" style={{ marginTop: '24px' }}>Contact Information</h3>
              <div className="um-form-grid">
                <div className="um-form-group">
                  <label>Email Address</label>
                  <div className="um-input-wrapper">
                    <Mail size={16} className="um-input-icon" />
                    <input type="email" className="um-form-input with-icon" defaultValue="ananda.m@innotech.co.th" />
                  </div>
                </div>
                <div className="um-form-group">
                  <label>Phone Number</label>
                  <div className="um-input-wrapper">
                    <Phone size={16} className="um-input-icon" />
                    <input type="tel" className="um-form-input with-icon" defaultValue="+66 82 123 4567" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div>
              <div className="um-roles-selection">
                <div className="um-roles-label">Assigned Roles</div>
                <div className="um-roles-grid">
                  {roleOptions.map(role => {
                    const Icon = role.icon;
                    const isSelected = assignedRoles.includes(role.name);
                    return (
                      <label key={role.name} className={`um-role-checkbox-card ${isSelected ? 'selected' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={isSelected} 
                          onChange={() => toggleRole(role.name)} 
                        />
                        <Icon size={14} className="um-role-icon" />
                        <span className="um-role-name">{role.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {assignedRoles.length > 0 && (
                <div className="um-roles-label">Detailed Permissions Configuration</div>
              )}
              
              {assignedRoles.map(roleName => {
                const isExpanded = expandedRole === roleName;
                const RoleIcon = roleOptions.find(r => r.name === roleName)?.icon || User;
                
                return (
                  <div key={roleName} className="um-role-accordion">
                    <div className="um-role-accordion-header" onClick={() => setExpandedRole(isExpanded ? null : roleName)}>
                      <div className="um-role-accordion-header-left">
                        <RoleIcon size={18} />
                        <span>{roleName} Role Permissions</span>
                      </div>
                      {isExpanded ? <ChevronUp size={20} color="#6b7280" /> : <ChevronDown size={20} color="#6b7280" />}
                    </div>
                    
                    {isExpanded && (
                      <div className="um-permissions-table-container">
                        <table className="um-perm-table">
                          <thead>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '8px 16px', color: '#6b7280', fontSize: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Permission</th>
                              <th style={{ textAlign: 'left', padding: '8px 16px', color: '#6b7280', fontSize: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Code</th>
                              <th style={{ textAlign: 'center', padding: '8px 16px', color: '#6b7280', fontSize: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '60px' }}>Access</th>
                              <th style={{ textAlign: 'left', padding: '8px 16px', color: '#6b7280', fontSize: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '100px' }}>Record Scope</th>
                              <th style={{ textAlign: 'left', padding: '8px 16px', color: '#6b7280', fontSize: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Dependency</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Group: Dashboard */}
                            <tr className="um-perm-cat-row">
                              <td className="um-perm-cat-cell" colSpan={5}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                                <Monitor size={18} className="um-perm-cat-icon" />
                                <span className="um-perm-cat-title">Dashboard</span>
                                <span className="um-perm-cat-count">1 of 1 selected</span>
                              </td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">View {roleName} Dashboard</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">dashboard.{roleName.toLowerCase().replace(' ', '_')}.view</td>
                              <td className="um-perm-detail-cell" style={{ width: '40px', textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>

                            {/* Group: Patient Management */}
                            <tr className="um-perm-cat-row">
                              <td className="um-perm-cat-cell" colSpan={5}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                                <Users size={18} className="um-perm-cat-icon" />
                                <span className="um-perm-cat-title">Patient Management</span>
                                <span className="um-perm-cat-count">5 of 5 selected</span>
                              </td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">View Patient List</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">patient.view.list</td>
                              <td className="um-perm-detail-cell" style={{ width: '40px', textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">Search Patient</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">patient.search</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">View Patient Detail</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">patient.view.detail</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">Register Patient</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">patient.create</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">Edit Patient</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">patient.edit</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">
                                <span className="um-perm-rule-badge">Requires View Detail</span>
                              </td>
                            </tr>

                            {/* Group: Lab Orders */}
                            <tr className="um-perm-cat-row">
                              <td className="um-perm-cat-cell" colSpan={5}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                                <Beaker size={18} className="um-perm-cat-icon" />
                                <span className="um-perm-cat-title">Lab Orders</span>
                                <span className="um-perm-cat-count">8 of 8 selected</span>
                              </td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">View Lab Order List</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">laborder.view.list</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">Search Lab Orders</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">laborder.search</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">Filter Lab Orders</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">laborder.filter</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">View Lab Order Detail</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">laborder.view.detail</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">Create New Lab Order</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">laborder.create</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">Edit Before Collection</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">laborder.edit.before_collection</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">
                                <span className="um-perm-rule-badge">Rule-based</span>
                              </td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">Add-on Test</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">laborder.addon</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">
                                <span className="um-perm-rule-badge">Rule-based</span>
                              </td>
                            </tr>
                            <tr className="um-perm-detail-row">
                              <td className="um-perm-detail-cell um-perm-name-cell">Print Lab Order</td>
                              <td className="um-perm-detail-cell um-perm-code-cell">laborder.print</td>
                              <td className="um-perm-detail-cell" style={{ textAlign: 'center' }}>
                                <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                              </td>
                              <td className="um-perm-detail-cell">
                                <select className="um-form-select" style={{ padding: '4px', fontSize: '0.75rem', height: 'auto', borderRadius: '4px', minWidth: '80px' }}>
                                  <option>All</option>
                                  <option>My only</option>
                                </select>
                              </td>
                              <td className="um-perm-detail-cell">—</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ maxWidth: '500px' }}>
              <div className="um-toggle-group">
                <span className="um-toggle-label">Active User</span>
                <label className="um-toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="um-toggle-slider"></span>
                </label>
              </div>
            </div>
          )}
          
        </div>

        <div className="um-modal-footer">
          <div className="um-unsaved-notice">
            <span style={{ color: '#d97706', fontSize: '24px', lineHeight: '12px' }}>•</span>
            <div>
              <div style={{ fontWeight: 600 }}>You have unsaved changes</div>
              <div style={{ fontSize: '0.75rem' }}>Don't forget to save your changes.</div>
            </div>
          </div>
          <div className="um-footer-actions">
            <button className="um-btn-outline" onClick={onClose}>Discard</button>
            <button className="um-btn-primary" onClick={onClose}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
