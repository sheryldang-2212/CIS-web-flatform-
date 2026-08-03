import React, { useState } from 'react';
import { ClipboardList, Clock, BriefcaseMedical, CheckCircle2, Stethoscope, AlertCircle, Calendar, Activity, Users as UsersIcon, Wallet } from 'lucide-react';
import PatientFormModal from './PatientFormModal';
import LabOrderFormModal from './LabOrderFormModal';
import './Dashboard.css';

interface DashboardProps {
  currentRole: string;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ currentRole, setActiveTab }: DashboardProps) {
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isLabOrderModalOpen, setIsLabOrderModalOpen] = useState(false);

  const renderReceptionistDashboard = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    return (
      <>
        <h1 className="premium-greeting">Good morning, Sarah</h1>
        <p className="premium-subtitle">{today} • Manage patient registration and lab orders</p>
        
        <div className="premium-summary-cards">
          <div className="premium-summary-card">
            <div className="premium-card-header">
              <span className="premium-card-label">Today's Orders</span>
              <div className="premium-icon-box" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                <ClipboardList size={20} />
              </div>
            </div>
            <span className="premium-card-value">12</span>
            <span className="premium-card-trend" style={{ color: '#059669' }}>
              <Activity size={14} /> Lab orders created today
            </span>
          </div>

          <div className="premium-summary-card">
            <div className="premium-card-header">
              <span className="premium-card-label">Pending Collection</span>
              <div className="premium-icon-box" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                <Clock size={20} />
              </div>
            </div>
            <span className="premium-card-value">5</span>
            <span className="premium-card-trend" style={{ color: '#6b7280' }}>
              <Activity size={14} /> Awaiting technician
            </span>
          </div>

          <div className="premium-summary-card">
            <div className="premium-card-header">
              <span className="premium-card-label">In Progress</span>
              <div className="premium-icon-box" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                <Activity size={20} />
              </div>
            </div>
            <span className="premium-card-value">8</span>
            <span className="premium-card-trend" style={{ color: '#6b7280' }}>
              <Activity size={14} /> Sent to lab
            </span>
          </div>

          <div className="premium-summary-card">
            <div className="premium-card-header">
              <span className="premium-card-label">Completed</span>
              <div className="premium-icon-box" style={{ backgroundColor: '#dcfce3', color: '#16a34a' }}>
                <CheckCircle2 size={20} />
              </div>
            </div>
            <span className="premium-card-value">24</span>
            <span className="premium-card-trend" style={{ color: '#16a34a' }}>
              <Activity size={14} /> Results available
            </span>
          </div>
        </div>

        <div className="premium-grid">
          {/* Recent Lab Orders Widget */}
          <div className="premium-widget">
            <div className="premium-widget-header">
              <div className="premium-widget-title">
                <ClipboardList size={20} style={{ color: '#cba028' }} />
                <span>Recent Lab Orders</span>
              </div>
              <button 
                className="text-primary text-sm font-semibold hover:underline" 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setActiveTab('Lab Orders')}
              >
                View All
              </button>
            </div>
            <div className="premium-recent-orders">
              <div className="order-item">
                <div className="order-patient-info">
                  <div className="order-avatar">ON</div>
                  <div className="order-details">
                    <span className="order-name">Olivia Nguyen</span>
                    <span className="order-tests">Vitamin D, Vitamin B12</span>
                  </div>
                </div>
                <div className="order-status status-pending">
                  <div className="status-dot"></div>
                  pending
                </div>
              </div>
              
              <div className="order-item">
                <div className="order-patient-info">
                  <div className="order-avatar">IR</div>
                  <div className="order-details">
                    <span className="order-name">Isabella Reed</span>
                    <span className="order-tests">Troponin, CBC...</span>
                  </div>
                </div>
                <div className="order-status status-pending">
                  <div className="status-dot"></div>
                  pending
                </div>
              </div>

              <div className="order-item">
                <div className="order-patient-info">
                  <div className="order-avatar">EC</div>
                  <div className="order-details">
                    <span className="order-name">Emma Clark</span>
                    <span className="order-tests">CBC, HbA1c...</span>
                  </div>
                </div>
                <div className="order-status status-pending">
                  <div className="status-dot"></div>
                  pending
                </div>
              </div>

              <div className="order-item">
                <div className="order-patient-info">
                  <div className="order-avatar">WT</div>
                  <div className="order-details">
                    <span className="order-name">William Turner</span>
                    <span className="order-tests">TSH, Free T4...</span>
                  </div>
                </div>
                <div className="order-status status-pending">
                  <div className="status-dot"></div>
                  pending
                </div>
              </div>

              <div className="order-item">
                <div className="order-patient-info">
                  <div className="order-avatar">AF</div>
                  <div className="order-details">
                    <span className="order-name">Ava Foster</span>
                    <span className="order-tests">Glucose, HbA1c...</span>
                  </div>
                </div>
                <div className="order-status status-pending">
                  <div className="status-dot"></div>
                  pending
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Widget */}
          <div className="premium-widget">
            <div className="premium-widget-header">
              <div className="premium-widget-title">
                <UsersIcon size={20} style={{ color: '#cba028' }} />
                <span>Quick Actions</span>
              </div>
            </div>
            <div className="premium-quick-actions">
              
              <button className="quick-action-btn" onClick={() => setIsPatientModalOpen(true)}>
                <div className="qa-icon"><UsersIcon size={24} /></div>
                <div className="qa-text">
                  <span className="qa-title">Register New Patient</span>
                  <span className="qa-desc">Add a new patient profile to the system</span>
                </div>
              </button>

              <button className="quick-action-btn" onClick={() => setIsLabOrderModalOpen(true)}>
                <div className="qa-icon"><BriefcaseMedical size={24} /></div>
                <div className="qa-text">
                  <span className="qa-title">Create Lab Order</span>
                  <span className="qa-desc">Generate a new lab request</span>
                </div>
              </button>
              
              <button className="quick-action-btn" onClick={() => setActiveTab('Patients')}>
                <div className="qa-icon"><Activity size={24} /></div>
                <div className="qa-text">
                  <span className="qa-title">View All Patients</span>
                  <span className="qa-desc">Search and manage patient directory</span>
                </div>
              </button>

            </div>
          </div>
        </div>
      </>
    );
  };

  const renderDoctorDashboard = () => (
    <>
      <h1 className="page-title">Doctor Dashboard</h1>
      <p className="page-subtitle mb-6">Your schedule and patient updates for today.</p>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
            <Calendar size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Appointments Today</span>
            <span className="card-value text-info">24</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
            <AlertCircle size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Critical Results</span>
            <span className="card-value text-danger">2</span>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
            <Stethoscope size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Patients Seen</span>
            <span className="card-value text-success">14</span>
          </div>
        </div>
      </div>
    </>
  );

  const renderTechnicianDashboard = () => (
    <>
      <h1 className="page-title">Technician Dashboard</h1>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            <Clock size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Pending Collection</span>
            <span className="card-value text-warning">6</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
            <ClipboardList size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Samples Collected</span>
            <span className="card-value" style={{ color: '#6366f1' }}>15</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
            <BriefcaseMedical size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Sent to Lab</span>
            <span className="card-value text-info">5</span>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Results Ready</span>
            <span className="card-value text-success">18</span>
          </div>
        </div>
      </div>
    </>
  );

  const renderAdminDashboard = () => (
    <>
      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-subtitle mb-6">Clinic overview and performance metrics.</p>
      
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(203, 160, 40, 0.1)', color: 'var(--primary)' }}>
            <UsersIcon size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Total Patients</span>
            <span className="card-value text-primary">142</span>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
            <Wallet size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Daily Revenue</span>
            <span className="card-value text-success">$4,250</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="dashboard-container">
      {currentRole === 'Receptionist' && renderReceptionistDashboard()}
      {currentRole === 'Doctor' && renderDoctorDashboard()}
      {currentRole === 'Technician' && renderTechnicianDashboard()}
      {currentRole === 'Admin' && renderAdminDashboard()}
      {/* Modals for Quick Actions */}
      <PatientFormModal 
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        mode="create"
      />
      
      <LabOrderFormModal 
        isOpen={isLabOrderModalOpen} 
        onClose={() => setIsLabOrderModalOpen(false)} 
        mode="create" 
        onRegisterPatient={() => {
          setIsLabOrderModalOpen(false);
          setIsPatientModalOpen(true);
        }}
      />
    </div>
  );
}
