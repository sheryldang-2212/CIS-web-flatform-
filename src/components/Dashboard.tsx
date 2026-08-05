import React, { useState } from 'react';
import { ClipboardList, Clock, BriefcaseMedical, CheckCircle2, Stethoscope, AlertCircle, Calendar, Activity, Users as UsersIcon, Wallet, ShieldCheck, Package, History, UserPlus, Settings, Lock, Server, Key, ChevronRight, Eye, Droplet, Printer, Truck, FileText } from 'lucide-react';
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

      <div className="tech-dashboard-grid mt-6">
        {/* Sample Collection Queue */}
        <div className="premium-widget">
          <div className="premium-widget-header" style={{ paddingBottom: '16px' }}>
            <div className="premium-widget-title">
              <ClipboardList size={20} style={{ color: '#6b7280' }} />
              <span>Sample Collection Queue</span>
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginTop: '4px' }}>
              Orders awaiting sample collection
            </span>
          </div>
          
          <div className="recent-orders-list" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div className="tech-queue-item">
              <div className="tech-queue-info">
                <div className="tech-queue-header">
                  <Clock size={14} className="text-muted" />
                  <span className="tech-queue-name">John Smith</span>
                </div>
                <div className="tech-queue-tests">Complete Blood Count, HbA1c...</div>
                <div className="tech-queue-mrn">MRN: MRN001</div>
              </div>
              <div className="tech-queue-badges">
                <span className="status-pill outline status-pending">pending</span>
                <span className="badge-routine">routine</span>
              </div>
            </div>

            <div className="tech-queue-item">
              <div className="tech-queue-info">
                <div className="tech-queue-header">
                  <AlertCircle size={14} className="text-danger" />
                  <span className="tech-queue-name">Robert Davis</span>
                </div>
                <div className="tech-queue-tests">Troponin, ECG...</div>
                <div className="tech-queue-mrn">MRN: MRN003</div>
              </div>
              <div className="tech-queue-badges">
                <span className="status-pill outline status-pending" style={{ color: '#6366f1' }}>In progress</span>
                <span className="badge-urgent">urgent</span>
              </div>
            </div>

            <div className="tech-queue-item">
              <div className="tech-queue-info">
                <div className="tech-queue-header">
                  <Clock size={14} className="text-muted" />
                  <span className="tech-queue-name">Lisa Brown</span>
                </div>
                <div className="tech-queue-tests">Peak Flow, IgE Level</div>
                <div className="tech-queue-mrn">MRN: MRN004</div>
              </div>
              <div className="tech-queue-badges">
                <span className="status-pill outline status-pending">pending</span>
                <span className="badge-routine">routine</span>
              </div>
            </div>
            
            <div className="tech-queue-item">
              <div className="tech-queue-info">
                <div className="tech-queue-header">
                  <AlertCircle size={14} className="text-danger" />
                  <span className="tech-queue-name">Michael Thompson</span>
                </div>
                <div className="tech-queue-tests">MRI Brain, Neurological Panel</div>
                <div className="tech-queue-mrn">MRN: MRN007</div>
              </div>
              <div className="tech-queue-badges">
                <span className="status-pill outline status-pending">pending</span>
                <span className="badge-urgent">urgent</span>
              </div>
            </div>
            
            <div className="tech-queue-item">
              <div className="tech-queue-info">
                <div className="tech-queue-header">
                  <Clock size={14} className="text-muted" />
                  <span className="tech-queue-name">Emma Clark</span>
                </div>
                <div className="tech-queue-tests">CBC, HbA1c...</div>
                <div className="tech-queue-mrn">MRN: MRN012</div>
              </div>
              <div className="tech-queue-badges">
                <span className="status-pill outline status-pending">pending</span>
                <span className="badge-routine">routine</span>
              </div>
            </div>
          </div>
          
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)' }}>
            <button className="btn-primary w-full justify-center" style={{ backgroundColor: '#cba028', border: 'none' }} onClick={() => setActiveTab('Sample Collection Queue')}>
              <ClipboardList size={16} /> Start Sample Collection
            </button>
          </div>
        </div>

        {/* Labs Completed */}
        <div className="premium-widget">
          <div className="premium-widget-header" style={{ paddingBottom: '16px' }}>
            <div className="premium-widget-title">
              <CheckCircle2 size={20} style={{ color: '#6b7280' }} />
              <span>Labs Completed</span>
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginTop: '4px' }}>
              Completed lab orders returned from the lab
            </span>
          </div>
          
          <div className="recent-orders-list" style={{ borderTop: '1px solid var(--border-color)' }}>
            {[
              { name: 'Emily Johnson', id: 'CLN2023-20260710-EMP001-002' },
              { name: 'David Wilson', id: 'CLN2023-20260701-EMP003-002' },
              { name: 'John Smith', id: 'CLN2023-20260701-EMP001-003' },
              { name: 'William Turner', id: 'CLN2023-20260701-EMP001-004' },
              { name: 'Michael Thompson', id: 'CLN2023-20260701-EMP005-001' }
            ].map(lab => (
              <div key={lab.id} className="tech-queue-item" style={{ padding: '20.5px 24px' }}>
                <div className="tech-queue-info">
                  <div className="tech-queue-header">
                    <CheckCircle2 size={14} className="text-success" />
                    <span className="tech-queue-name">{lab.name}</span>
                  </div>
                  <div className="tech-queue-mrn" style={{ marginLeft: '22px' }}>{lab.id}</div>
                </div>
                <div className="tech-queue-badges">
                  <span className="badge-routine" style={{ backgroundColor: 'transparent', color: '#111' }}>Completed</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)' }}>
            <button className="btn-secondary w-full justify-center" onClick={() => setActiveTab('Lab Order Tracking')}>
              <Eye size={16} /> View Lab Coordination
            </button>
          </div>
        </div>
      </div>

      <div className="admin-section-card mt-6">
        <div className="section-header">
          <h2>Quick Actions</h2>
          <p className="page-subtitle mt-1" style={{ fontSize: '13px' }}>Common laboratory tasks</p>
        </div>
        <div className="quick-actions-grid">
          <button className="quick-action-btn" onClick={() => setActiveTab('Sample Collection Queue')}>
            <div className="action-icon" style={{ backgroundColor: 'rgba(203, 160, 40, 0.1)', color: '#cba028' }}>
              <Droplet size={20} />
            </div>
            <span>Record Sample</span>
          </button>
          
          <button className="quick-action-btn" onClick={() => setActiveTab('Sample Collection Queue')}>
            <div className="action-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Printer size={20} />
            </div>
            <span>Print Barcodes</span>
          </button>

          <button className="quick-action-btn" onClick={() => setActiveTab('Lab Order Tracking')}>
            <div className="action-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Truck size={20} />
            </div>
            <span>Update Tracking</span>
          </button>

          <button className="quick-action-btn" onClick={() => {}}>
            <div className="action-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <FileText size={20} />
            </div>
            <span>View All Results</span>
          </button>
        </div>
      </div>
    </>
  );

  const renderAdminDashboard = () => (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <div>
          <h1 className="page-title mb-0">System Overview</h1>
          <p className="page-subtitle mt-1">Manage users, clinic settings, and monitor system activity.</p>
        </div>
        <div className="admin-status-badge">
          <span className="status-indicator online"></span>
          System Status: Operational
        </div>
      </div>
      
      <div className="admin-metrics-grid">
        <div className="admin-metric-card">
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <UsersIcon size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Total Staff</span>
            <span className="metric-value text-blue-600">24</span>
            <span className="metric-trend positive">↑ 2 this month</span>
          </div>
        </div>
        
        <div className="admin-metric-card">
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
            <Key size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Active Roles</span>
            <span className="metric-value text-purple-600">8</span>
            <span className="metric-trend neutral">No changes</span>
          </div>
        </div>
        
        <div className="admin-metric-card">
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
            <Package size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Active Services</span>
            <span className="metric-value text-green-600">45</span>
            <span className="metric-trend positive">↑ 5 new</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <ShieldCheck size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Security Alerts</span>
            <span className="metric-value text-red-600">2</span>
            <span className="metric-trend negative">Requires attention</span>
          </div>
        </div>
      </div>

      <div className="admin-main-grid">
        <div className="admin-grid-column-left">
          <div className="admin-section-card">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions-grid">
              <button className="quick-action-btn" onClick={() => setActiveTab('Staff Management')}>
                <div className="action-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                  <UserPlus size={20} />
                </div>
                <span>Add New Staff</span>
              </button>
              
              <button className="quick-action-btn" onClick={() => setActiveTab('Roles & Permissions')}>
                <div className="action-icon" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                  <Lock size={20} />
                </div>
                <span>Manage Roles</span>
              </button>

              <button className="quick-action-btn" onClick={() => setActiveTab('Clinic Settings')}>
                <div className="action-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <Settings size={20} />
                </div>
                <span>Clinic Settings</span>
              </button>

              <button className="quick-action-btn" onClick={() => setActiveTab('Audit Logs')}>
                <div className="action-icon" style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }}>
                  <History size={20} />
                </div>
                <span>View Audit Logs</span>
              </button>
            </div>
          </div>

          <div className="admin-section-card mt-6">
            <div className="section-header">
              <h2>Recent System Activity</h2>
              <button className="view-all-btn" onClick={() => setActiveTab('Audit Logs')}>
                View all logs <ChevronRight size={16} />
              </button>
            </div>
            <div className="audit-log-list">
              {[
                { id: 1, action: 'Updated Clinic Working Hours', user: 'Admin User', time: '10 mins ago', type: 'settings' },
                { id: 2, action: 'Created new role: Senior Technician', user: 'Admin User', time: '1 hour ago', type: 'roles' },
                { id: 3, action: 'Failed login attempt (IP: 192.168.1.104)', user: 'Unknown', time: '3 hours ago', type: 'security' },
                { id: 4, action: 'Added new service: Comprehensive Blood Test', user: 'Admin User', time: 'Yesterday', type: 'services' },
                { id: 5, action: 'Password reset requested for Dr. Wilson', user: 'System', time: 'Yesterday', type: 'security' }
              ].map(log => (
                <div key={log.id} className="audit-log-item">
                  <div className={`log-icon ${log.type}`}>
                    {log.type === 'settings' && <Settings size={14} />}
                    {log.type === 'roles' && <Key size={14} />}
                    {log.type === 'security' && <ShieldCheck size={14} />}
                    {log.type === 'services' && <Package size={14} />}
                  </div>
                  <div className="log-details">
                    <span className="log-action">{log.action}</span>
                    <span className="log-meta">By {log.user} • {log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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
