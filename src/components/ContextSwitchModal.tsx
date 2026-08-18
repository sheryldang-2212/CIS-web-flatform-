import { useState } from 'react';
import { X, Building2, Users, Check } from 'lucide-react';
import './ContextSwitchModal.css';

interface ContextSwitchModalProps {
  onClose: () => void;
  currentClinic: any;
  currentRole: string;
  mockClinics: any[];
  onSaveContext: (clinic: any, role: string) => void;
}

export default function ContextSwitchModal({
  onClose,
  currentClinic,
  currentRole,
  mockClinics,
  onSaveContext
}: ContextSwitchModalProps) {
  const [selectedClinic, setSelectedClinic] = useState(currentClinic);
  const [selectedRole, setSelectedRole] = useState(currentRole);

  const handleClinicChange = (clinic: any) => {
    setSelectedClinic(clinic);
    if (!clinic.roles.includes(selectedRole)) {
      setSelectedRole(clinic.roles[0]);
    }
  };

  const handleSave = () => {
    onSaveContext(selectedClinic, selectedRole);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content context-switch-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Switch Clinic & Role</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="modal-body p-0">
          <p className="context-desc px-6 pt-4 pb-2 m-0 border-b">
            Select the clinic and role you want to work under. Your access and views will be updated accordingly.
          </p>
          
          <div className="context-split-view">
            {/* Left Side: Clinics & Platform */}
            <div className="context-pane">
              <div className="pane-header">
                <Building2 size={16} />
                <span>1. Select Workspace</span>
              </div>
              <div className="pane-list">
                {/* Platform Administration Option */}
                {mockClinics.some(c => c.roles.includes('Platform Admin')) && (
                  <button
                    className={`pane-list-item ${selectedClinic?.id === 'platform' ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedClinic({ id: 'platform', name: 'Platform Administration', roles: ['Platform Admin'] });
                      setSelectedRole('Platform Admin');
                    }}
                  >
                    <div className="item-content">
                      <span className="item-name font-medium">Platform Administration</span>
                    </div>
                    {selectedClinic?.id === 'platform' && <Check size={16} className="text-primary check-icon" />}
                  </button>
                )}
                
                {/* Clinic Options */}
                {mockClinics.map(clinic => (
                  <button
                    key={clinic.id}
                    className={`pane-list-item ${selectedClinic?.id === clinic.id ? 'active' : ''}`}
                    onClick={() => handleClinicChange(clinic)}
                  >
                    <div className="item-content">
                      <span className="item-name">{clinic.name}</span>
                    </div>
                    {selectedClinic?.id === clinic.id && <Check size={16} className="text-primary check-icon" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side: Roles */}
            <div className="context-pane">
              <div className="pane-header">
                <Users size={16} />
                <span>2. Select Role</span>
              </div>
              <div className="pane-list">
                {selectedClinic.roles.map((role: string) => (
                  <button
                    key={role}
                    className={`pane-list-item ${selectedRole === role ? 'active' : ''}`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div className="item-content">
                      <span className="item-name">{role}</span>
                    </div>
                    {selectedRole === role && <Check size={16} className="text-primary check-icon" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Switch Context</button>
        </div>
      </div>
    </div>
  );
}
