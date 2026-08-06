import { useState } from 'react';
import { Edit2, ChevronRight, AlertTriangle, Activity, ArrowLeft, Phone, Mail, MapPin, Shield, PhoneCall, HeartPulse, FileText, Pill, Link2, Lock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import LabResultReviewModal from './LabResultReviewModal';
import LabOrderDetail from './LabOrderDetail';
import VerifyIdentityModal from './VerifyIdentityModal';
import './PatientDetail.css';

interface PatientDetailProps {
  patient: any;
  onEdit: () => void;
  onBack: () => void;
}

// --- Mock Data for Labs ---
// const mockLabResults = [
//   { id: 'RES001', testName: 'Complete Blood Count (CBC)', date: '15/07/2026', status: 'Approved', isAbnormal: false },
//   { id: 'RES002', testName: 'Lipid Panel', date: '10/07/2026', status: 'Approved', isAbnormal: true },
//   { id: 'RES003', testName: 'Liver Function Test', date: '08/07/2026', status: 'Pending Doctor Review', isAbnormal: false },
// ];

const mockLabOrders = [
  { id: 'ORD-20260718-01', tests: 'Thyroid Panel', date: '18/07/2026', status: 'Pending Collection' },
  { id: 'ORD-20260710-03', tests: 'Lipid Panel, CBC', date: '10/07/2026', status: 'Completed' },
];

export default function PatientDetail({ patient, onEdit, onBack }: PatientDetailProps) {
  const [selectedResultToReview, setSelectedResultToReview] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('medical_history');
  const [activeHistoryView, setActiveHistoryView] = useState<string>('main');
  const [viewingLabOrder, setViewingLabOrder] = useState<any>(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [localPatient, setLocalPatient] = useState(patient);

  if (!localPatient) return null;

  const handleVerify = (verificationDetails: any) => {
    setLocalPatient({
      ...localPatient,
      identityVerification: 'Verified',
      ...verificationDetails
    });
    setIsVerifyModalOpen(false);
  };

  if (viewingLabOrder) {
    return (
      <LabOrderDetail 
        order={viewingLabOrder} 

        onBack={() => setViewingLabOrder(null)} 
        onEdit={() => {}}
        onPrint={() => {}}
      />
    );
  }

  const initials = patient.name.split(' ').map((n: string) => n[0]).join('');

  const renderValue = (val: string | undefined | null) => {
    if (!val || val.trim() === '') return <span className="text-muted">Not provided</span>;
    return val;
  };

  return (
    <div className="patient-detail-page">
      <div className="patient-detail-header-bar">
        <button className="btn-back-page" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Patients</span>
        </button>
        <button className="btn-secondary" onClick={onEdit}>
          <Edit2 size={16} /> Edit Patient
        </button>
      </div>

      <div className="patient-detail-grid">
        {/* LEFT COLUMN: Sidebar Profile */}
        <div className="patient-sidebar-card">
          <div className="patient-profile-header">
            <div className="profile-avatar large">{initials}</div>
            <div className="profile-info">
              <h3 className="profile-name">{patient.name}</h3>
              <span className="profile-meta">{patient.idNumber} • {patient.age} • {patient.gender}</span>
            </div>
            {localPatient.allergy && (
              <span className="alert-tag-red">
                <AlertTriangle size={12} style={{ display: 'inline', marginRight: '4px' }} />
                Has Allergies
              </span>
            )}
            {localPatient.registrationSource === 'Mobile App' && (
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontSize: '13px', fontWeight: 600 }}>
                <Lock size={12} />
                <span>Synced with Mobile App</span>
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Identity Verification</h4>
            {localPatient.identityVerification === 'Unverified' ? (
              <div className="sidebar-item">
                <ShieldAlert size={16} className="sidebar-icon" style={{ color: '#d97706' }} />
                <div className="sidebar-item-content">
                  <span className="sidebar-item-label" style={{ color: '#d97706', fontWeight: 600 }}>Unverified</span>
                  <span className="sidebar-item-value text-muted" style={{ fontSize: '13px' }}>Source: {localPatient.registrationSource}</span>
                </div>
              </div>
            ) : (
              <div className="sidebar-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <CheckCircle2 size={16} className="sidebar-icon" style={{ color: '#16a34a', marginTop: '2px' }} />
                  <div className="sidebar-item-content">
                    <span className="sidebar-item-label" style={{ color: '#16a34a', fontWeight: 600 }}>Verified</span>
                    <div className="text-muted" style={{ fontSize: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span>Verified by: {localPatient.verifiedBy}</span>
                      <span>Verified at: {localPatient.verifiedAt}</span>
                      <span>Clinic: {localPatient.verifiedClinic}</span>
                      <span>Doc Type: {localPatient.documentType}</span>
                      <span>Method: {localPatient.verificationMethod}</span>
                    </div>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '16px', padding: '8px', fontSize: '13px' }}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('request-tab-change', { detail: 'Lab Orders' }));
                    setTimeout(() => window.dispatchEvent(new CustomEvent('navigate-to-create-lab-order', { detail: localPatient.id })), 100);
                  }}
                >
                  Create Lab Order
                </button>
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Contact Information <Lock size={12} className="text-muted" />
            </h4>
            <div className="sidebar-item">
              <Phone size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Mobile</span>
                <span className="sidebar-item-value">{renderValue(patient.contact?.split('\n')[0])}</span>
              </div>
            </div>
            <div className="sidebar-item">
              <Mail size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Email</span>
                <span className="sidebar-item-value">{renderValue(patient.contact?.split('\n')[1])}</span>
              </div>
            </div>
            <div className="sidebar-item">
              <MapPin size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Address</span>
                <span className="sidebar-item-value">123 Main St, City, State 12345</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Emergency Contact</h4>
            <div className="sidebar-item">
              <PhoneCall size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Michael Johnson</span>
                <span className="sidebar-item-value">+66 89-123-4567</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Insurance</h4>
            <div className="sidebar-item">
              <Shield size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">{renderValue(patient.insurance?.split('\n')[0])}</span>
                <span className="sidebar-item-value text-muted" style={{ fontSize: '13px' }}>Policy: {renderValue(patient.insurance?.split('\n')[1]) || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Consent History</h4>
            <div className="sidebar-item">
              <Link2 size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Downtown Clinic</span>
                <span className="sidebar-item-value text-muted" style={{ fontSize: '13px' }}>10/05/2026 14:30</span>
              </div>
            </div>
            <div className="sidebar-item">
              <Link2 size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Downtown Clinic</span>
                <span className="sidebar-item-value text-muted" style={{ fontSize: '13px' }}>15/04/2026 09:15</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Main Content */}
        <div className="patient-main-content">
          {localPatient.identityVerification === 'Unverified' && (
            <div className="identity-verification-banner">
              <div className="ivb-content">
                <ShieldAlert size={20} className="ivb-icon" />
                <div>
                  <h4 className="ivb-title">Identity verification required</h4>
                  <p className="ivb-desc">This patient has not been verified at the clinic. Please review the patient's original National ID or Passport.</p>
                </div>
              </div>
              <button className="btn-primary btn-sm" onClick={() => setIsVerifyModalOpen(true)}>
                Verify Identity
              </button>
            </div>
          )}

          <div className="patient-tabs">
            <button 
              className={`patient-tab-btn ${activeTab === 'medical_history' ? 'active' : ''}`}
              onClick={() => { setActiveTab('medical_history'); setActiveHistoryView('main'); }}
            >
              Medical History
            </button>
            <button 
              className={`patient-tab-btn ${activeTab === 'lab_orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('lab_orders')}
            >
              Lab Orders ({mockLabOrders.length})
            </button>
          </div>

          <div className="tab-panel">
            {activeTab === 'medical_history' && (
              <>
                {activeHistoryView === 'main' ? (
                  <>
                    <div className="panel-header">
                      <h3 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Medical History Overview
                        <Lock size={16} className="text-muted" />
                      </h3>
                    </div>
                    <div className="medical-history-grid">
                      <div className="mh-card" onClick={() => setActiveHistoryView('general_health')}>
                        <div className="mh-card-header">
                          <span className="mh-card-title"><HeartPulse size={18} className="mh-card-icon" /> General Health</span>
                          <ChevronRight size={18} className="text-muted" />
                        </div>
                        <div className="mh-card-summary">
                          Blood Type, Height, Weight, BMI data.
                        </div>
                        <span className="mh-alert-tag"><AlertTriangle size={12}/> Needs Update</span>
                      </div>
                      
                      <div className="mh-card" onClick={() => setActiveHistoryView('lifestyle')}>
                        <div className="mh-card-header">
                          <span className="mh-card-title"><Activity size={18} className="mh-card-icon" /> Lifestyle</span>
                          <ChevronRight size={18} className="text-muted" />
                        </div>
                        <div className="mh-card-summary">
                          Habits, nutrition, activity, sleep and stress.
                        </div>
                        <span className="mh-alert-tag"><AlertTriangle size={12}/> Needs Update</span>
                      </div>

                      <div className="mh-card" onClick={() => setActiveHistoryView('medical_conditions')}>
                        <div className="mh-card-header">
                          <span className="mh-card-title"><FileText size={18} className="mh-card-icon" /> Conditions</span>
                          <ChevronRight size={18} className="text-muted" />
                        </div>
                        <div className="mh-card-summary">
                          Cardiovascular, Metabolic, Endocrine and others.
                        </div>
                      </div>

                      <div className="mh-card" onClick={() => setActiveHistoryView('allergies')}>
                        <div className="mh-card-header">
                          <span className="mh-card-title"><Pill size={18} className="mh-card-icon" /> Allergies</span>
                          <ChevronRight size={18} className="text-muted" />
                        </div>
                        <div className="mh-card-summary">
                          Medication, Food, Environmental allergens.
                        </div>
                        {patient.allergy && (
                          <span className="mh-alert-tag"><AlertTriangle size={12}/> Allergies Found</span>
                        )}
                      </div>
                    </div>
                  </>
                ) : activeHistoryView === 'general_health' ? (
                  <div className="mh-subview">
                    <div className="mh-subview-header">
                      <button className="mh-back-btn" onClick={() => setActiveHistoryView('main')}><ArrowLeft size={16}/> Back</button>
                      <h4 className="mh-subview-title">General Health</h4>
                    </div>
                    <div className="mh-detail-row">
                      <span className="mh-detail-label">Blood Type</span>
                      <span className="mh-detail-value">-</span>
                    </div>
                    <div className="mh-detail-row">
                      <span className="mh-detail-label">Weight</span>
                      <span className="mh-detail-value">70 kg</span>
                    </div>
                    <div className="mh-detail-row">
                      <span className="mh-detail-label">Height</span>
                      <span className="mh-detail-value">175 cm</span>
                    </div>
                    <div className="mh-detail-row">
                      <span className="mh-detail-label">BMI</span>
                      <span className="mh-detail-value">22.9</span>
                    </div>
                  </div>
                ) : activeHistoryView === 'lifestyle' ? (
                  <div className="mh-subview">
                    <div className="mh-subview-header">
                      <button className="mh-back-btn" onClick={() => setActiveHistoryView('main')}><ArrowLeft size={16}/> Back</button>
                      <h4 className="mh-subview-title">Lifestyle</h4>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Health Goal</span>
                      <span className="mh-stacked-value">None</span>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Activity</span>
                      <span className="mh-stacked-value">None</span>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Nutrition</span>
                      <span className="mh-stacked-value">None</span>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Smoking Status</span>
                      <span className="mh-stacked-value">None</span>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Alcohol Consumption</span>
                      <span className="mh-stacked-value">None</span>
                    </div>
                  </div>
                ) : activeHistoryView === 'medical_conditions' ? (
                  <div className="mh-subview">
                    <div className="mh-subview-header">
                      <button className="mh-back-btn" onClick={() => setActiveHistoryView('main')}><ArrowLeft size={16}/> Back</button>
                      <h4 className="mh-subview-title">Medical Conditions</h4>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Cardiovascular Health</span>
                      <span className="mh-stacked-value">High Blood Pressure, High Cholesterol, Prediabetes, Stroke</span>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Metabolic</span>
                      <span className="mh-stacked-value">None</span>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Hematologic</span>
                      <span className="mh-stacked-value">None</span>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Endocrine</span>
                      <span className="mh-stacked-value">None</span>
                    </div>
                  </div>
                ) : (
                  <div className="mh-subview">
                    <div className="mh-subview-header">
                      <button className="mh-back-btn" onClick={() => setActiveHistoryView('main')}><ArrowLeft size={16}/> Back</button>
                      <h4 className="mh-subview-title">Allergies</h4>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Medication Allergies</span>
                      <span className="mh-stacked-value">Penicillin, Clindamycin</span>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title" style={{ fontSize: '13px' }}>Symptom</span>
                      <span className="mh-stacked-value">Mild (rash, itching)</span>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Food Allergies</span>
                      <span className="mh-stacked-value">None</span>
                    </div>
                    <div className="mh-detail-stacked">
                      <span className="mh-stacked-title">Environmental</span>
                      <span className="mh-stacked-value">None</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'lab_orders' && (
              <>
                <div className="panel-header">
                  <h3 className="panel-title">Lab Orders</h3>
                </div>
                {mockLabOrders.length === 0 ? (
                  <div className="empty-state-box">
                    <p className="text-muted m-0">No lab orders available</p>
                  </div>
                ) : (
                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Lab Order ID</th>
                          <th>Tests / Package</th>
                          <th>Ordered Date</th>
                          <th>Current Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockLabOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="font-medium">{order.id}</td>
                            <td>{order.tests}</td>
                            <td>{order.date}</td>
                            <td>
                              <span className={`status-pill ${order.status === 'Completed' ? 'status-completed' : 'status-in-progress'}`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn-secondary-small" 
                                onClick={() => setViewingLabOrder(order)}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {selectedResultToReview && (
        <LabResultReviewModal 
          result={selectedResultToReview}
          onClose={() => setSelectedResultToReview(null)}
        />
      )}
      
      {isVerifyModalOpen && (
        <VerifyIdentityModal 
          patient={localPatient}
          onClose={() => setIsVerifyModalOpen(false)}
          onVerify={handleVerify}
        />
      )}
    </div>
  );
}
