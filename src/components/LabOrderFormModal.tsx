import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, X, CheckSquare, Lock, Mail } from 'lucide-react';
import { useClinicConfig } from '../context/ClinicConfigContext';
import Modal from './Modal';
import './LabOrderFormModal.css';

interface LabOrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: any;
  onRegisterPatient?: () => void;
}

export default function LabOrderFormModal({ isOpen, onClose, mode, initialData, onRegisterPatient }: LabOrderFormModalProps) {
  const { categories: testCategories, packages: clinicPackages } = useClinicConfig();
  
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Hematology': true
  });
  
  const [selectedTests, setSelectedTests] = useState<string[]>(initialData?.tests || []);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [patientSearch, setPatientSearch] = useState(initialData?.patientName || '');
  
  // New flags state
  const [isConfidential, setIsConfidential] = useState(false);
  const [isEmailConsent, setIsEmailConsent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedTests(initialData?.tests || []);
      setPatientSearch(initialData?.patientName || '');
      setSelectedPackages([]);
    }
  }, [isOpen, initialData]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleTestToggle = (test: string) => {
    setSelectedTests(prev => 
      prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test]
    );
  };

  const handlePackageToggle = (pkg: string) => {
    setSelectedPackages(prev => 
      prev.includes(pkg) ? prev.filter(p => p !== pkg) : [...prev, pkg]
    );
  };

  const removeTest = (test: string) => {
    setSelectedTests(prev => prev.filter(t => t !== test));
  };

  const isEdit = mode === 'edit';

  const mockPatients = [
    { name: 'Somchai Wongsakul', verification: 'Verified' },
    { name: 'Supaporn Rattanakul', verification: 'Verified' },
    { name: 'Thanakorn Jitprasert', verification: 'Verified' },
    { name: 'Pornpimon Srisawat', verification: 'Verified' },
    { name: 'Kittisak Boonyarattana', verification: 'Unverified' }
  ];

  const selectedPatientData = mockPatients.find(p => p.name === patientSearch);
  const isPatientUnverified = selectedPatientData?.verification === 'Unverified';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isPatientUnverified) {
      alert("Identity verification is required before creating a lab order for this patient.");
      return;
    }
    
    // Simulate system behavior
    let message = `Lab Order ${isEdit ? 'updated' : 'created'} successfully!\n\n`;
    
    if (isConfidential) {
      message += `🔒 Confidential: Results will be visible ONLY to the assigned doctor and patient (or just the patient if unassigned).\n`;
    } else {
      message += `🔓 Standard Visibility applied.\n`;
    }
    
    if (isEmailConsent) {
      message += `📧 Email Consent: Results will be automatically sent to the patient's email when ready.\n`;
    } else {
      message += `🚫 No Email: Results will NOT be sent by email.\n`;
    }

    alert(message);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Lab Order' : 'Create Lab Order'} width="800px">
      <form className="lab-order-form" onSubmit={handleSubmit}>
        
        {/* Patient Selection */}
        <div className="form-section">
          <div className="section-header-flex">
            <h3 className="section-title">Patient</h3>
            {!isEdit && (
              <button type="button" className="text-btn" onClick={onRegisterPatient}>
                + Register New Patient
              </button>
            )}
          </div>
          
          <div className="patient-selector">
            <div className={`patient-input ${showPatientDropdown ? 'active' : ''}`} onClick={() => !isEdit && setShowPatientDropdown(!showPatientDropdown)}>
              {isEdit ? (
                <span>{initialData?.patientName}</span>
              ) : (
                <div className="search-wrapper w-full">
                  <Search size={16} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by name, MRN, ID..." 
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={() => setShowPatientDropdown(true)}
                  />
                </div>
              )}
            </div>
            
            {showPatientDropdown && !isEdit && (
              <div className="patient-dropdown">
                {mockPatients.filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase())).map((p, i) => (
                  <div key={i} className="patient-option" onClick={() => { setPatientSearch(p.name); setShowPatientDropdown(false); }}>
                    <div className="patient-option-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {p.name}
                      {p.verification === 'Unverified' && (
                        <span style={{ fontSize: '11px', color: '#d97706', backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>Unverified</span>
                      )}
                    </div>
                    <div className="patient-option-id text-muted text-xs">MRN00{i+1} • ID: CLN2023-00{i+1}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {isPatientUnverified && (
            <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#dc2626', fontWeight: 600, fontSize: '13px' }}>Identity verification is required before creating a lab order for this patient.</span>
            </div>
          )}
        </div>

        {/* Test Packages */}
        <div className="form-section">
          <div className="section-title-with-badge">
            <h3 className="section-title">Test Packages</h3>
            {selectedPackages.length > 0 && <span className="counter-badge">{selectedPackages.length}</span>}
          </div>
          
          <div className="packages-grid">
            {clinicPackages.map((pkg, i) => (
              <label key={i} className={`package-card ${selectedPackages.includes(pkg.name) ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={selectedPackages.includes(pkg.name)}
                  onChange={() => handlePackageToggle(pkg.name)}
                  className="hidden-checkbox"
                />
                <div className="package-card-content">
                  <span className="package-name">{pkg.name}</span>
                  {selectedPackages.includes(pkg.name) && <CheckSquare size={16} className="text-primary" />}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Individual Tests */}
        <div className="form-section">
          <div className="section-title-with-badge">
            <h3 className="section-title">Individual Tests by Category</h3>
          </div>
          
          <div className="categories-accordion">
            {testCategories.map((category, i) => {
              const isExpanded = expandedCategories[category.name];
              const selectedCount = category.tests.filter(t => selectedTests.includes(t)).length;
              
              return (
                <div key={i} className="category-item">
                  <div className="category-header" onClick={() => toggleCategory(category.name)}>
                    <span className="category-name">{category.name}</span>
                    <div className="category-header-right">
                      {selectedCount > 0 && <span className="counter-badge">{selectedCount}/{category.tests.length}</span>}
                      {isExpanded ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="category-body">
                      <div className="tests-grid">
                        {category.tests.map((test, j) => (
                          <label key={j} className={`test-checkbox-label ${selectedTests.includes(test) ? 'selected' : ''}`}>
                            <input 
                              type="checkbox" 
                              checked={selectedTests.includes(test)}
                              onChange={() => handleTestToggle(test)}
                            />
                            <span>{test}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Tests Summary */}
        <div className="form-section">
          <div className="section-title-with-badge">
            <h3 className="section-title">Selected Tests</h3>
            <span className="counter-badge outline">{selectedTests.length}</span>
          </div>
          
          <div className="selected-tests-container">
            {selectedTests.length === 0 ? (
              <span className="text-muted text-sm">No individual tests selected</span>
            ) : (
              selectedTests.map((test, i) => (
                <div key={i} className="selected-tag">
                  {test}
                  <button type="button" onClick={() => removeTest(test)} className="remove-tag-btn">
                    <X size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className="form-row-2">
          <div className="form-group">
            <label>Assigned Doctor</label>
            <div className="select-wrapper">
              <select defaultValue={initialData?.assignedTo || ""}>
                <option value="">Unassigned</option>
                <option>Dr. Narong Phanich</option>
                <option>Dr. Preecha Suthiwong</option>
                <option>Dr. Apinya Chamroenuk</option>
                <option>Dr. Michel Kikuzaki</option>
              </select>
              <ChevronDown size={16} className="select-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Priority <span className="required">*</span></label>
            <div className="select-wrapper">
              <select defaultValue={initialData?.priority || "Routine"}>
                <option>Routine</option>
                <option>Urgent</option>
                <option>STAT</option>
              </select>
              <ChevronDown size={16} className="select-icon" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Clinical Notes</label>
          <textarea rows={3} placeholder="Add any relevant clinical information, instructions for the lab, etc."></textarea>
        </div>

        {/* Flags */}
        <div className="form-section mt-2 flags-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <label className="flag-checkbox confidential-flag" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              style={{ marginTop: '4px' }} 
              checked={isConfidential}
              onChange={(e) => setIsConfidential(e.target.checked)}
            />
            <div className="flag-content">
              <span className="flag-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                <Lock size={16} /> Confidential Test
              </span>
              <span className="flag-desc" style={{ fontSize: '12px', color: '#6b7280', display: 'block', lineHeight: 1.4 }}>Result visible only to the assigned doctor and patient. If Unassigned Doctor, only the patient.</span>
            </div>
          </label>
          
          <label className="flag-checkbox email-flag" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              style={{ marginTop: '4px' }} 
              checked={isEmailConsent}
              onChange={(e) => setIsEmailConsent(e.target.checked)}
            />
            <div className="flag-content">
              <span className="flag-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                <Mail size={16} /> Patient consents to result/report by email
              </span>
              <span className="flag-desc" style={{ fontSize: '12px', color: '#6b7280', display: 'block', lineHeight: 1.4 }}>If unchecked, results will not be sent by email.</span>
            </div>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="modal-actions sticky-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <div className="actions-right">
            <button type="button" className="btn-secondary">
              {isEdit ? 'Update & Print' : 'Create & Print'}
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? 'Update Order' : 'Create Order'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
