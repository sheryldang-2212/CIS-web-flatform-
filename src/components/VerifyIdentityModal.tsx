import { useState } from 'react';
import { X } from 'lucide-react';
import './VerifyIdentityModal.css';

interface VerifyIdentityModalProps {
  patient: any;
  onClose: () => void;
  onVerify: (verificationDetails: any) => void;
}

export default function VerifyIdentityModal({ patient, onClose, onVerify }: VerifyIdentityModalProps) {
  const [docType, setDocType] = useState('Thai National ID');
  const [isChecked, setIsChecked] = useState(false);

  const handleConfirm = () => {
    if (!isChecked) return;
    onVerify({
      documentType: docType,
      verifiedBy: 'Sarah Chen', // Simulating the current logged-in Receptionist
      verifiedAt: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      verificationMethod: 'In Person',
      verifiedClinic: 'Downtown Medical Center'
    });
  };

  return (
    <div className="verify-identity-overlay" onClick={onClose}>
      <div className="verify-identity-modal" onClick={e => e.stopPropagation()}>
        <div className="vim-header">
          <h2>Verify Identity</h2>
          <button className="vim-close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="vim-body">
          <p className="vim-instruction">
            Please review the patient's original identification document and ensure the following information matches the system record.
          </p>

          <div className="vim-form-group">
            <label>Document Type</label>
            <select className="vim-select" value={docType} onChange={(e) => setDocType(e.target.value)}>
              <option value="Thai National ID">Thai National ID</option>
              <option value="Passport">Passport</option>
            </select>
          </div>

          <div className="vim-comparison-box">
            <div className="vim-comparison-header">Information to Match</div>
            
            <div className="vim-field-row">
              <span className="vim-field-label">Full Name</span>
              <span className="vim-field-value">{patient.name}</span>
            </div>
            
            <div className="vim-field-row">
              <span className="vim-field-label">Date of Birth</span>
              <span className="vim-field-value">{patient.dob}</span>
            </div>

            {docType === 'Thai National ID' && (
              <div className="vim-field-row">
                <span className="vim-field-label">National ID Number</span>
                <span className="vim-field-value">{patient.idNumber}</span>
              </div>
            )}

            {docType === 'Passport' && (
              <>
                <div className="vim-field-row">
                  <span className="vim-field-label">Passport Number</span>
                  <span className="vim-field-value">{patient.idNumber}</span>
                </div>
                <div className="vim-field-row">
                  <span className="vim-field-label">Issuing Country</span>
                  <span className="vim-field-value">Thailand</span>
                </div>
              </>
            )}
          </div>

          <div className="vim-confirmation-section">
            <label className="vim-checkbox-label">
              <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={(e) => setIsChecked(e.target.checked)}
                className="vim-checkbox"
              />
              <span className="vim-checkbox-text">
                I confirm that I have reviewed the patient's original identification document and that the required identity information matches the system record.
              </span>
            </label>
          </div>
        </div>

        <div className="vim-footer">
          <div className="vim-mismatch-warning">
            The identification information does not match? <br/>
            <span style={{ color: '#64748b' }}>Please update the patient information and verify again.</span>
          </div>
          <div className="vim-actions">
            <button className="vim-btn-cancel" onClick={onClose}>Cancel</button>
            <button 
              className={`vim-btn-confirm ${isChecked ? 'active' : ''}`}
              disabled={!isChecked}
              onClick={handleConfirm}
            >
              Confirm Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
