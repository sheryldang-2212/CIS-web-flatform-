import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import './PatientFormModal.css'; // Reuse the same CSS for now

interface PatientFormProps {
  mode: 'create' | 'edit';
  initialData?: any;
  onSubmitSuccess?: (email: string) => void;
  onCancel: () => void;
}

export default function PatientForm({ mode, initialData, onSubmitSuccess, onCancel }: PatientFormProps) {
  const isEdit = mode === 'edit';
  const submitText = isEdit ? 'Update Patient' : 'Register Patient';

  const [nationalId, setNationalId] = useState(initialData?.nationalId || '');
  const [email, setEmail] = useState(initialData?.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitSuccess) {
      onSubmitSuccess(email || 'patient@example.com');
    }
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit} noValidate>
      {/* General Information */}
      <section className="form-section">
        <div className="section-header-flex">
          <h3 className="section-title mb-0">General Information</h3>
        </div>
        
        <div className="form-group mt-4 mb-4">
          <label>National ID <span className="required">*</span></label>
          <input 
            type="text" 
            placeholder="Enter National ID or Passport Number" 
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            required
          />
        </div>

        <div className="form-row-3">
          <div className="form-group">
            <label>First name <span className="required">*</span></label>
            <input type="text" defaultValue={initialData?.firstName} />
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input type="text" defaultValue={initialData?.middleName} />
          </div>
          <div className="form-group">
            <label>Last Name <span className="required">*</span></label>
            <input type="text" defaultValue={initialData?.lastName} />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Date of Birth <span className="required">*</span></label>
            <div className="input-with-icon">
              <input type="text" placeholder="DD/MM/YYYY" defaultValue={initialData?.dob} />
              <Calendar size={16} className="input-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <div className="select-wrapper">
              <select defaultValue={initialData?.gender || "Select"}>
                <option disabled>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <ChevronDown size={16} className="select-icon" />
            </div>
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Phone Number <span className="required">*</span></label>
            <div className="phone-input">
              <div className="country-code">
                <img src="https://flagcdn.com/w20/th.png" alt="TH" className="flag" />
                <span>+66</span>
                <ChevronDown size={14} className="text-muted" />
              </div>
              <input type="text" defaultValue={initialData?.phone} />
            </div>
          </div>
          <div className="form-group">
            <label>Email Address <span className="required">*</span></label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea rows={3} defaultValue={initialData?.address}></textarea>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="form-section">
        <h3 className="section-title">Emergency Contact</h3>
        
        <div className="form-row-3">
          <div className="form-group">
            <label>Emergency Contact Name</label>
            <input type="text" defaultValue={initialData?.emergencyContactName} />
          </div>
          <div className="form-group">
            <label>Emergency Phone</label>
            <div className="phone-input">
              <div className="country-code">
                <img src="https://flagcdn.com/w20/th.png" alt="TH" className="flag" />
                <span>+66</span>
                <ChevronDown size={14} className="text-muted" />
              </div>
              <input type="text" defaultValue={initialData?.emergencyPhone} />
            </div>
          </div>
          <div className="form-group">
            <label>Relationship</label>
            <div className="select-wrapper">
              <select defaultValue={initialData?.relationship || "Select"}>
                <option disabled>Select</option>
                <option>Spouse</option>
                <option>Parent</option>
                <option>Sibling</option>
                <option>Friend</option>
                <option>Other</option>
              </select>
              <ChevronDown size={16} className="select-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Information */}
      <section className="form-section">
        <h3 className="section-title">Insurance Information</h3>
        <div className="form-row-2">
          <div className="form-group">
            <label>Insurance Provider</label>
            <input type="text" defaultValue={initialData?.insuranceProvider} />
          </div>
          <div className="form-group">
            <label>Policy Number</label>
            <input type="text" defaultValue={initialData?.policyNumber} />
          </div>
        </div>
      </section>

      {/* Allergies */}
      <section className="form-section">
        <h3 className="section-title">Allergies</h3>
        <div className="checkbox-grid">
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.allergies?.includes('Drug Allergy')} />
            <span>Drug Allergy</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.allergies?.includes('Food Allergy')} />
            <span>Food Allergy</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.allergies?.includes('Environmental Allergy')} />
            <span>Environmental Allergy</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.allergies?.includes('No Known Allergy')} />
            <span>No Known Allergy</span>
          </label>
        </div>
        <div className="form-group mt-3">
          <label>Other</label>
          <input type="text" placeholder="Specify other allergy" defaultValue={initialData?.otherAllergy} />
        </div>
      </section>

      {/* Medical History */}
      <section className="form-section">
        <h3 className="section-title">Medical History</h3>
        <div className="checkbox-grid">
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.medicalHistory?.includes('Diabetes')} />
            <span>Diabetes</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.medicalHistory?.includes('Hypertension')} />
            <span>Hypertension</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.medicalHistory?.includes('Cardiovascular Disease')} />
            <span>Cardiovascular Disease</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.medicalHistory?.includes('Respiratory Disease')} />
            <span>Respiratory Disease</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.medicalHistory?.includes('Kidney Disease')} />
            <span>Kidney Disease</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.medicalHistory?.includes('Liver Disease')} />
            <span>Liver Disease</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked={initialData?.medicalHistory?.includes('None')} />
            <span>None</span>
          </label>
        </div>
        <div className="form-group mt-3">
          <label>Other</label>
          <input type="text" placeholder="Specify other condition" defaultValue={initialData?.otherMedicalHistory} />
        </div>
      </section>

      {/* Footer Actions */}
      <div className="modal-actions" style={{ paddingBottom: '24px' }}>
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={!nationalId}>
          {submitText}
        </button>
      </div>
    </form>
  );
}
