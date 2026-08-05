import React, { useState, useRef, useEffect } from 'react';
import { Edit2, ChevronDown, ChevronRight, Printer, CheckCircle2, AlertTriangle, Eye, Settings, Activity } from 'lucide-react';
import Modal from './Modal';
import LabResultReviewModal from './LabResultReviewModal';
import './PatientDetailModal.css';

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
  onEdit: () => void;
}

// --- Accordion Component ---
const Accordion = ({ title, count, defaultOpen = false, children, onToggle }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const toggle = () => {
    setIsOpen(!isOpen);
    if (onToggle) onToggle(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className="accordion-section">
      <button 
        className="accordion-header" 
        onClick={toggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
      >
        <div className="accordion-title-area">
          <span className="accordion-title">{title}</span>
          {count !== undefined && <span className="accordion-count">({count})</span>}
        </div>
        <div className="accordion-icon">
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
};

// --- Mock Data for Labs ---
const mockLabResults = [
  { id: 'RES001', testName: 'Complete Blood Count (CBC)', date: '15/07/2026', status: 'Approved', isAbnormal: false },
  { id: 'RES002', testName: 'Lipid Panel', date: '10/07/2026', status: 'Approved', isAbnormal: true },
  { id: 'RES003', testName: 'Liver Function Test', date: '08/07/2026', status: 'Pending Doctor Review', isAbnormal: false },
];

const mockLabOrders = [
  { id: 'ORD-20260718-01', tests: 'Thyroid Panel', date: '18/07/2026', status: 'Pending Collection' },
  { id: 'ORD-20260710-03', tests: 'Lipid Panel, CBC', date: '10/07/2026', status: 'Completed' },
];

export default function PatientDetailModal({ isOpen, onClose, patient, onEdit }: PatientDetailModalProps) {
  const [selectedResultToReview, setSelectedResultToReview] = useState<any>(null);
  const [activeHistoryView, setActiveHistoryView] = useState<string>('main');

  if (!patient) return null;

  const initials = patient.name.split(' ').map((n: string) => n[0]).join('');

  const renderValue = (val: string | undefined | null) => {
    if (!val || val.trim() === '') return <span className="text-muted">Not provided</span>;
    return val;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Patient Detail" width="900px">
      
      {/* Header Area */}
      <div className="patient-profile-header mb-4">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-info flex-1">
          <h3 className="profile-name">{patient.name}</h3>
          <span className="profile-meta">{patient.age} • {patient.gender}</span>
        </div>
        <button className="btn-secondary-small" onClick={onEdit}>
          <Edit2 size={14} /> Edit Patient
        </button>
      </div>

      <div className="patient-detail-accordions">
        
        {/* 1. Personal Summary */}
        <Accordion title="Personal Summary" defaultOpen={true}>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">ID Type / Number</span>
              <span className="detail-value">{renderValue(patient.idNumber)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date of Birth</span>
              <span className="detail-value">{renderValue(patient.dob || '12/05/1985')}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone Number</span>
              <span className="detail-value">{renderValue(patient.contact?.split('\n')[0])}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{renderValue(patient.contact?.split('\n')[1])}</span>
            </div>
            <div className="detail-item full-width">
              <span className="detail-label">Address</span>
              <span className="detail-value">{renderValue('123 Main St, City, State 12345')}</span>
            </div>
          </div>

          <div className="section-divider my-3" />
          
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Emergency Contact Name</span>
              <span className="detail-value">{renderValue('Michael Johnson')}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Emergency Phone</span>
              <span className="detail-value">{renderValue('+66 89-123-4567')}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Insurance Provider</span>
              <span className="detail-value">{renderValue(patient.insurance?.split('\n')[0])}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Policy Number</span>
              <span className="detail-value">{renderValue(patient.insurance?.split('\n')[1])}</span>
            </div>
          </div>
        </Accordion>

        {/* 2. Medical History */}
        <Accordion title="Medical History">
          {activeHistoryView === 'main' ? (
            <div className="medical-history-list">
              
              <div className="mh-list-item" onClick={() => setActiveHistoryView('general_health')}>
                <div className="mh-item-left">
                  <Settings size={18} className="mh-icon" />
                  <span>General Health</span>
                </div>
                <div className="mh-item-right">
                  <AlertTriangle size={14} className="mh-alert-icon" />
                  <ChevronRight size={18} className="text-muted" />
                </div>
              </div>

              <div className="mh-list-item" onClick={() => setActiveHistoryView('lifestyle')}>
                <div className="mh-item-left">
                  <Activity size={18} className="mh-icon" />
                  <span>Lifestyle</span>
                </div>
                <div className="mh-item-right">
                  <AlertTriangle size={14} className="mh-alert-icon" />
                  <ChevronRight size={18} className="text-muted" />
                </div>
              </div>

              <div className="mh-list-item" onClick={() => setActiveHistoryView('medical_conditions')}>
                <div className="mh-item-left">
                  <Settings size={18} className="mh-icon" />
                  <span>Medical Conditions</span>
                </div>
                <div className="mh-item-right">
                  <ChevronRight size={18} className="text-muted" />
                </div>
              </div>

              <div className="mh-list-item" onClick={() => setActiveHistoryView('allergies')}>
                <div className="mh-item-left">
                  <Eye size={18} className="mh-icon" />
                  <span>Allergies</span>
                </div>
                <div className="mh-item-right">
                  <ChevronRight size={18} className="text-muted" />
                </div>
              </div>

            </div>
          ) : activeHistoryView === 'general_health' ? (
            <div className="mh-subview">
              <div className="mh-subview-header">
                <button className="mh-back-btn" onClick={() => setActiveHistoryView('main')}>&lt; Back</button>
                <h4 className="mh-subview-title">General Health</h4>
                <button className="mh-edit-btn">Edit</button>
              </div>
              <div className="mh-detail-row">
                <span className="mh-detail-label">Blood Type</span>
                <span className="mh-detail-value">-</span>
              </div>
              <div className="mh-detail-row">
                <span className="mh-detail-label">Weight</span>
                <span className="mh-detail-value">70</span>
              </div>
              <div className="mh-detail-row">
                <span className="mh-detail-label">Height</span>
                <span className="mh-detail-value">175</span>
              </div>
              <div className="mh-detail-row">
                <span className="mh-detail-label">BMI</span>
                <span className="mh-detail-value">22.9</span>
              </div>
            </div>
          ) : activeHistoryView === 'lifestyle' ? (
            <div className="mh-subview">
              <div className="mh-subview-header">
                <button className="mh-back-btn" onClick={() => setActiveHistoryView('main')}>&lt; Back</button>
                <h4 className="mh-subview-title">Lifestyle</h4>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Health Goal</span>
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Activity</span>
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Nutrition</span>
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Smoking Status</span>
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Alcohol Consumption</span>
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Sleep</span>
                </div>
                <div className="mh-stacked-value">Answer</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Stress Level</span>
                </div>
                <div className="mh-stacked-value">Answer</div>
              </div>
            </div>
          ) : activeHistoryView === 'medical_conditions' ? (
            <div className="mh-subview">
              <div className="mh-subview-header">
                <button className="mh-back-btn" onClick={() => setActiveHistoryView('main')}>&lt; Back</button>
                <h4 className="mh-subview-title">Medical Conditions</h4>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Cardiovascular Health</span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
                <div className="mh-stacked-value">High Blood Pressure, High Cholesterol, Prediabetes, Stroke</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Metabolic</span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Hematologic</span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Endocrine</span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Hormonal</span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Respiratory</span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
            </div>
          ) : (
            <div className="mh-subview">
              <div className="mh-subview-header">
                <button className="mh-back-btn" onClick={() => setActiveHistoryView('main')}>&lt; Back</button>
                <h4 className="mh-subview-title">Allergies</h4>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Medication Allergies</span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
                <div className="mh-stacked-value">Penicillin, Clindamycin</div>
              </div>
              <div className="mh-detail-stacked" style={{ borderBottom: '1px solid var(--border-color)', borderTop: 'none', paddingTop: 0 }}>
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title" style={{ fontSize: '13px' }}>Symptom</span>
                </div>
                <div className="mh-stacked-value">Mild (rash, itching)</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Food Allergies</span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
              <div className="mh-detail-stacked">
                <div className="mh-stacked-header">
                  <span className="mh-stacked-title">Environmental</span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
                <div className="mh-stacked-value">None</div>
              </div>
            </div>
          )}
        </Accordion>

        {/* 3. Lab Results */}
        <Accordion title="Lab Results" count={mockLabResults.length}>
          {mockLabResults.length === 0 ? (
            <div className="empty-state-box">
              <p className="text-muted m-0">No lab results available</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Test / Panel Name</th>
                    <th>Result Date</th>
                    <th>Review Status</th>
                    <th>Flag</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLabResults.map((result) => (
                    <tr key={result.id}>
                      <td className="font-medium">{result.testName}</td>
                      <td>{result.date}</td>
                      <td>
                        <span className={`status-pill ${result.status === 'Approved' ? 'status-completed' : 'status-pending'}`}>
                          {result.status}
                        </span>
                      </td>
                      <td>
                        {result.isAbnormal ? (
                          <span className="abnormal-flag text-danger"><AlertTriangle size={14}/> Abnormal</span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>
                        <div className="action-buttons-row">
                          <button 
                            className="icon-btn-small" 
                            title="Review Result"
                            onClick={() => setSelectedResultToReview(result)}
                          >
                            <Settings size={16}/>
                          </button>
                          <button className="icon-btn-small" title="View Result"><Eye size={16}/></button>
                          {result.status === 'Approved' && (
                            <button className="icon-btn-small" title="Print Result"><Printer size={16}/></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Accordion>

        {/* 4. Lab Orders */}
        <Accordion title="Lab Orders" count={mockLabOrders.length}>
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
                        <button className="btn-secondary-small">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Accordion>
        
      </div>

      {selectedResultToReview && (
        <LabResultReviewModal 
          result={selectedResultToReview}
          onClose={() => setSelectedResultToReview(null)}
        />
      )}
    </Modal>
  );
}
