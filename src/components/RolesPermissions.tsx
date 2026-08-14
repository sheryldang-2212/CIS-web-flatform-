import React, { useState } from 'react';
import { 
  Search, ChevronUp, ChevronDown, 
  MoreVertical, Edit2, Maximize2, Minimize2 
} from 'lucide-react';
import './RolesPermissions.css';

import { ROLES_LIST, PERMISSION_MODULES } from './RolesPermissionsData';

interface RolesPermissionsProps {
  currentRole?: string;
  currentClinic?: any;
  mockClinics?: any[];
}

export default function RolesPermissions({ currentRole, currentClinic, mockClinics }: RolesPermissionsProps) {
  const [activeRole, setActiveRole] = useState(ROLES_LIST[0]);
  const [expandedModules, setExpandedModules] = useState<string[]>(['dashboard', 'patient_management', 'lab_orders']);
  const [roleActive, setRoleActive] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClinicId, setSelectedClinicId] = useState<string>(currentClinic?.id || (mockClinics && mockClinics.length > 0 ? mockClinics[0].id : 'all'));

  const toggleModule = (moduleId: string) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const isAllExpanded = expandedModules.length === PERMISSION_MODULES.length;

  const toggleExpandAll = () => {
    if (isAllExpanded) {
      setExpandedModules([]);
    } else {
      setExpandedModules(PERMISSION_MODULES.map(m => m.id));
    }
  };

  return (
    <div className="rp-container">
      <div className="rp-header">
        <div className="rp-title">
          <h1>Roles & Permissions</h1>
          <p>Configure permissions by role. Users may have multiple roles within each clinic.</p>
        </div>
        {currentRole === 'Platform Admin' && mockClinics && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Clinic Context:</span>
            <select 
              value={selectedClinicId}
              onChange={(e) => setSelectedClinicId(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' }}
            >
              {mockClinics.map((clinic: any) => (
                <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="rp-content">
        
        {/* Left Column: Roles List */}
        <div className="rp-col-roles">
          <div className="rp-col-header">Roles</div>
          <div className="rp-search-bar">
            <Search size={16} className="rp-search-icon" />
            <input type="text" placeholder="Search roles" />
          </div>
          <div className="rp-role-list">
            {ROLES_LIST.map(role => {
              const RoleIcon = role.icon;
              return (
                <div 
                  key={role.id} 
                  className={`rp-role-item ${activeRole.id === role.id ? 'active' : ''}`}
                  onClick={() => setActiveRole(role)}
                >
                  <div className="rp-role-icon"><RoleIcon size={20} /></div>
                  <div className="rp-role-info">
                    <span className="rp-role-name">{role.name}</span>
                    <span className="rp-role-count">permissions</span>
                  </div>
                  <span className={`rp-role-badge ${role.scope.toLowerCase()}`}>{role.scope}</span>
                </div>
              );
            })}
          </div>
        </div>


        {/* Middle Column: Configuration */}
        <div className="rp-col-main">
          <div className="rp-main-header">
            <div className="rp-main-title-row">
              <div className="rp-main-title-left">
                <div className="rp-main-role-icon">
                  <activeRole.icon size={24} />
                </div>
                <div>
                  <div className="rp-main-role-name">
                    {activeRole.name} <span className="rp-system-badge">System Role</span>
                  </div>
                  <div className="rp-main-desc">
                    Handles patient registration and lab order preparation within the active clinic. <Edit2 size={12} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
              </div>
              <div className="rp-main-actions">
                <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>Role active</span>
                <label className="um-toggle-switch">
                  <input type="checkbox" checked={roleActive} onChange={(e) => setRoleActive(e.target.checked)} disabled={!isEditing} />
                  <span className="um-toggle-slider"></span>
                </label>
                <MoreVertical size={20} color="#9ca3af" style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          <div className="rp-toolbar">
            <div className="rp-toolbar-left">
              <div className="rp-search-bar" style={{ padding: 0 }}>
                <Search size={16} className="rp-search-icon" style={{ left: '12px' }} />
                <input type="text" placeholder="Search permissions" style={{ width: '220px', paddingLeft: '32px' }} />
              </div>
              <select className="um-form-select" style={{ width: '160px', borderRadius: '6px' }}>
                <option>All modules</option>
                <option>Dashboard</option>
                <option>Patient Management</option>
              </select>
            </div>
            <button className="rp-expand-btn" onClick={toggleExpandAll}>
              {isAllExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />} 
              {isAllExpanded ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          <div className="rp-table-container">
            <table className="rp-table">
              <thead>
                <tr>
                  <th className="rp-th" style={{ width: '70px' }}></th>
                  <th className="rp-th">Permission</th>
                  <th className="rp-th" style={{ width: '150px' }}>Dependency / Rule</th>
                </tr>
              </thead>
              <tbody>
                {PERMISSION_MODULES.map(module => {
                  const isExpanded = expandedModules.includes(module.id);
                  const selectedCount = module.permissions.filter(p => p.roles && p.roles.includes(activeRole.id)).length;
                  const ModIcon = module.icon;
                  
                  if (!isEditing && selectedCount === 0) return null;
                  
                  return (
                    <React.Fragment key={module.id}>
                      <tr className="rp-module-row" onClick={() => toggleModule(module.id)}>
                        <td className="rp-td" style={{ paddingLeft: '16px' }}>
                          <input type="checkbox" className="rp-checkbox" checked={selectedCount > 0} disabled={!isEditing} readOnly onClick={(e) => e.stopPropagation()} />
                        </td>
                        <td className="rp-td rp-module-cell">
                          <ModIcon size={18} color="#4b5563" />
                          {module.name}
                          <span className="rp-module-stats">{selectedCount} of {module.permissions.length} selected</span>
                        </td>
                        <td className="rp-td" style={{ textAlign: 'right' }}>
                          {isExpanded ? <ChevronUp size={18} color="#9ca3af" /> : <ChevronDown size={18} color="#9ca3af" />}
                        </td>
                      </tr>
                      {isExpanded && module.permissions.map(perm => (
                        <tr key={perm.code} className="rp-perm-row">
                          <td className="rp-td" style={{ paddingLeft: '40px' }}>
                            <input type="checkbox" className="rp-checkbox sub-checkbox" checked={perm.roles && perm.roles.includes(activeRole.id)} disabled={!isEditing} readOnly />
                          </td>
                          <td className="rp-td">
                            <div className="rp-perm-name">{perm.name}</div>
                          </td>
                          <td className="rp-td">
                            {perm.dependency ? (
                              <span className="rp-dependency-badge">{perm.dependency}</span>
                            ) : (
                              <span style={{ color: '#9ca3af' }}>—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="rp-main-footer">
            <div style={{ fontWeight: 600, color: '#111827' }}>14 permissions selected</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {!isEditing ? (
                <button className="um-btn-primary" onClick={() => setIsEditing(true)}>
                  <Edit2 size={16} style={{ marginRight: '8px', display: 'inline' }} /> Edit Permissions
                </button>
              ) : (
                <>
                  <button className="um-btn-outline" onClick={() => setIsEditing(false)}>Discard</button>
                  <button className="um-btn-primary" onClick={() => setIsEditing(false)}>Save Changes</button>
                </>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
