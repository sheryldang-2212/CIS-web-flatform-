import { X, ChevronUp, ChevronDown } from 'lucide-react';
import './UserPermissionsModal.css';

interface UserPermissionsModalProps {
  user: any;
  onClose: () => void;
}

export default function UserPermissionsModal({ user, onClose }: UserPermissionsModalProps) {
  return (
    <div className="um-modal-overlay" onClick={onClose}>
      <div className="um-modal-content" onClick={e => e.stopPropagation()}>
        <div className="um-modal-header">
          <h2>Manage Permissions - {user.name}</h2>
          <button className="um-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="um-modal-body">
          <div className="um-permissions-list">
            
            <div className="um-permission-group">
              <div className="um-permission-group-header">
                <span>Patients</span>
                <ChevronUp size={16} />
              </div>
              <div className="um-permission-items">
                <div className="um-permission-item">
                  <input type="checkbox" className="um-permission-checkbox" defaultChecked />
                  <div className="um-permission-details">
                    <span className="um-permission-name">Patient Registration</span>
                    <span className="um-permission-desc">Register and edit patient records</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="um-permission-group">
              <div className="um-permission-group-header">
                <span>Lab Orders</span>
                <ChevronUp size={16} />
              </div>
              <div className="um-permission-items">
                <div className="um-permission-item">
                  <input type="checkbox" className="um-permission-checkbox" defaultChecked />
                  <div className="um-permission-details">
                    <span className="um-permission-name">Lab Order Creation</span>
                    <span className="um-permission-desc">Create new lab orders</span>
                  </div>
                </div>
                
                <div className="um-permission-item">
                  <input type="checkbox" className="um-permission-checkbox" defaultChecked={false} />
                  <div className="um-permission-details">
                    <span className="um-permission-name">Edit Order (before collection)</span>
                    <span className="um-permission-desc">Edit lab orders only before sample collection</span>
                  </div>
                </div>

                <div className="um-permission-item">
                  <input type="checkbox" className="um-permission-checkbox" defaultChecked={false} />
                  <div className="um-permission-details">
                    <span className="um-permission-name">Add-on Test to Existing Specimen</span>
                    <span className="um-permission-desc">Add tests to an existing collected specimen</span>
                  </div>
                </div>

                <div className="um-permission-item">
                  <input type="checkbox" className="um-permission-checkbox" defaultChecked={false} />
                  <div className="um-permission-details">
                    <span className="um-permission-name">Print / Reprint Order</span>
                    <span className="um-permission-desc">Print and reprint lab requisition forms</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="um-permission-group">
              <div className="um-permission-group-header">
                <span>Lab Operations</span>
                <ChevronDown size={16} />
              </div>
            </div>

          </div>
        </div>

        <div className="um-modal-footer">
          <button className="um-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="um-btn-primary" onClick={onClose}>Save Permissions</button>
        </div>
      </div>
    </div>
  );
}
