import React from 'react';
import { X, Check } from 'lucide-react';
import { ROLES_LIST, PERMISSION_MODULES } from './RolesPermissionsData';
import './PermissionMatrixModal.css';

interface PermissionMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PermissionMatrixModal({ isOpen, onClose }: PermissionMatrixModalProps) {
  if (!isOpen) return null;

  return (
    <div className="pm-modal-overlay" onClick={onClose}>
      <div className="pm-modal-container" onClick={e => e.stopPropagation()}>
        <div className="pm-modal-header">
          <div className="pm-modal-title">
            <Check className="icon" size={24} />
            Permission Matrix
          </div>
          <button className="pm-modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="pm-modal-content">
          <table className="pm-table">
            <thead>
              <tr>
                <th className="pm-th-corner">Permissions</th>
                {ROLES_LIST.map(role => {
                  const RoleIcon = role.icon;
                  return (
                    <th key={role.id} className="pm-th">
                      <div className="pm-role-header">
                        <div className="pm-role-icon">
                          <RoleIcon size={20} />
                        </div>
                        <div className="pm-role-name">{role.name}</div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {PERMISSION_MODULES.map(module => {
                const ModIcon = module.icon;
                return (
                  <React.Fragment key={module.id}>
                    <tr className="pm-module-row">
                      <td className="pm-module-cell">
                        <ModIcon size={18} color="#64748b" />
                        {module.name}
                      </td>
                      {ROLES_LIST.map(role => (
                        <td key={role.id} className="pm-module-empty"></td>
                      ))}
                    </tr>
                    {module.permissions.map(perm => (
                      <tr key={perm.code} className="pm-perm-row">
                        <td className="pm-perm-cell">
                          {perm.name}
                        </td>
                        {ROLES_LIST.map(role => {
                          const hasPermission = perm.roles?.includes(role.id) ?? false;
                          return (
                            <td key={role.id} className="pm-checkbox-cell">
                              <input 
                                type="checkbox" 
                                className="pm-checkbox" 
                                checked={hasPermission} 
                                readOnly 
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pm-modal-footer">
          <button className="um-btn-primary" onClick={onClose}>Close Matrix</button>
        </div>
      </div>
    </div>
  );
}
