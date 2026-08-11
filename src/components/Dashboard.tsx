import { useState } from 'react';
import { ClipboardList, Clock, BriefcaseMedical, CheckCircle2, Stethoscope, AlertCircle, Calendar, Users as UsersIcon, ShieldCheck, Package, History, UserPlus, Settings, Lock, Key, ChevronRight, FlaskConical } from 'lucide-react';
import PatientFormModal from './PatientFormModal';
import LabOrderFormModal from './LabOrderFormModal';
import PrintBarcodeModal from './PrintBarcodeModal';
import CollectSampleModal from './CollectSampleModal';
import LabOrderDetail from './LabOrderDetail';
import { Search } from 'lucide-react';
import './Dashboard.css';

interface DashboardProps {
  currentRole: string;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ currentRole, setActiveTab }: DashboardProps) {
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isLabOrderModalOpen, setIsLabOrderModalOpen] = useState(false);
  const [printBarcodeOrder, setPrintBarcodeOrder] = useState<string | null>(null);
  const [queueSearchTerm, setQueueSearchTerm] = useState('');
  const [collectSampleOrder, setCollectSampleOrder] = useState<any>(null);
  const [completedLabsSearchTerm, setCompletedLabsSearchTerm] = useState('');
  const [completedLabOrder, setCompletedLabOrder] = useState<any>(null);
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [techDateRange, setTechDateRange] = useState({ start: todayStr, end: todayStr });
  const [doctorDateRange, setDoctorDateRange] = useState({ start: todayStr, end: todayStr });

  const renderReceptionistDashboard = () => {
    return (
      <div className="receptionist-dashboard">
        <div className="rec-header">
          <h1 className="page-title mb-0">Receptionist Dashboard</h1>
          <div className="rec-date-range">
            <span className="text-muted">Date range:</span>
            <span>07/06/2026 - 07/06/2026</span>
            <Calendar size={14} className="text-muted" />
          </div>
        </div>

        <div className="rec-action-cards">
          <div className="rec-action-card">
            <div className="rec-action-content">
              <div className="rec-action-icon-wrapper">
                <UserPlus size={24} className="text-yellow" />
              </div>
              <div className="rec-action-text">
                <h3>Register New Patient</h3>
                <p>Add a new patient profile to the system</p>
              </div>
            </div>
            <button className="btn-rec-action" onClick={() => setIsPatientModalOpen(true)}>
              + Register New Patient
            </button>
          </div>

          <div className="rec-action-card">
            <div className="rec-action-content">
              <div className="rec-action-icon-wrapper">
                <FlaskConical size={24} className="text-yellow" />
              </div>
              <div className="rec-action-text">
                <h3>Create Lab Order</h3>
                <p>Generate a new lab request</p>
              </div>
            </div>
            <button className="btn-rec-action" onClick={() => setIsLabOrderModalOpen(true)}>
              + Create Lab Order
            </button>
          </div>
        </div>

        <div className="rec-summary-cards">
          <div className="rec-summary-card">
            <div className="rec-summary-header">
              <ClipboardList size={20} className="text-yellow" />
              <span className="rec-summary-label">Today's Orders</span>
            </div>
            <div className="rec-summary-value text-yellow">15</div>
          </div>
          <div className="rec-summary-card">
            <div className="rec-summary-header">
              <Clock size={20} className="text-orange" />
              <span className="rec-summary-label">Pending Collection</span>
            </div>
            <div className="rec-summary-value text-orange">6</div>
          </div>
          <div className="rec-summary-card">
            <div className="rec-summary-header">
              <BriefcaseMedical size={20} className="text-blue" />
              <span className="rec-summary-label">In Progress</span>
            </div>
            <div className="rec-summary-value text-blue">5</div>
          </div>
          <div className="rec-summary-card">
            <div className="rec-summary-header">
              <CheckCircle2 size={20} className="text-green" />
              <span className="rec-summary-label">Completed</span>
            </div>
            <div className="rec-summary-value text-green">3</div>
          </div>
        </div>

        <div className="rec-recent-orders-section">
          <div className="rec-recent-header">
            <h2>Recent Lab Orders</h2>
            <span className="rec-badge-count">10</span>
          </div>

          <div className="rec-recent-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rec-order-card">
                <div className="rec-order-top">
                  <span className="rec-order-name">Olivia Nguyen</span>
                  <span className={`rec-status-badge ${i === 5 ? 'ready' : i === 6 ? 'sent' : 'pending'}`}>
                    {i === 5 ? 'Ready for Pickup' : i === 6 ? 'Sent to Lab' : 'Pending Collection'}
                  </span>
                </div>
                <div className="rec-order-tests">
                  <span className="rec-test-chip">HbA1c</span>
                  <span className="rec-test-chip">Fasting Glucose</span>
                  <span className="rec-test-chip">Creatinine</span>
                  <span className="rec-test-chip">BUN</span>
                  <span className="rec-test-chip more">+12</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDoctorDashboard = () => (
    <div className="doctor-dashboard-container">
      <div className="rec-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="page-title mb-0">Doctor Dashboard</h1>
          <p className="page-subtitle mt-1 text-muted">Review lab results and manage patient care</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'white', padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Calendar size={16} className="text-muted" />
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginRight: '4px' }}>Date range:</span>
          <input 
            type="date" 
            value={doctorDateRange.start}
            onChange={(e) => setDoctorDateRange(prev => ({ ...prev, start: e.target.value }))}
            style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#334155', background: 'transparent' }}
          />
          <span style={{ color: '#94a3b8' }}>-</span>
          <input 
            type="date" 
            value={doctorDateRange.end}
            onChange={(e) => setDoctorDateRange(prev => ({ ...prev, end: e.target.value }))}
            style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#334155', background: 'transparent' }}
          />
        </div>
      </div>

      <div className="rec-action-cards" style={{ marginBottom: '24px' }}>
        <div className="rec-action-card">
          <div className="rec-action-content">
            <div className="rec-action-icon-wrapper">
              <FlaskConical size={24} className="text-yellow" />
            </div>
            <div className="rec-action-text">
              <h3>Create Lab Order</h3>
              <p>Order new tests for a patient</p>
            </div>
          </div>
          <button className="btn-rec-action" onClick={() => setIsLabOrderModalOpen(true)}>
            + New Lab Order
          </button>
        </div>

        <div className="rec-action-card">
          <div className="rec-action-content">
            <div className="rec-action-icon-wrapper" style={{ background: '#e0f2fe' }}>
              <ClipboardList size={24} style={{ color: '#0284c7' }} />
            </div>
            <div className="rec-action-text">
              <h3>Review Lab Results</h3>
              <p>Check pending results and reports</p>
            </div>
          </div>
          <button className="btn-rec-action" style={{ background: '#0284c7' }} onClick={() => setActiveTab('Lab Results')}>
            View Lab Results
          </button>
        </div>
      </div>

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
    </div>
  );

  const renderTechnicianDashboard = () => {
    const mockTechQueue = [
      { id: 'ORD007', name: 'James Wilson', mrn: 'MRN020', tests: 'Vitamin D, B12', status: 'pending', priority: 'routine', date: '2026-08-09T10:00:00' },
      { id: 'ORD006', name: 'Sarah Connor', mrn: 'MRN018', tests: 'Urinalysis, Microalbumin', status: 'pending', priority: 'routine', date: '2026-08-09T09:45:00' },
      { id: 'ORD005', name: 'David Lee', mrn: 'MRN015', tests: 'Lipid Panel, TSH', status: 'pending', priority: 'routine', date: '2026-08-09T09:30:00' },
      { id: 'ORD004', name: 'Emma Clark', mrn: 'MRN012', tests: 'CBC, HbA1c...', status: 'pending', priority: 'routine', date: '2026-08-09T09:15:00' },
      { id: 'ORD003', name: 'Michael Thompson', mrn: 'MRN007', tests: 'MRI Brain, Neurological Panel', status: 'pending', priority: 'urgent', date: '2026-08-09T09:00:00' },
      { id: 'ORD002', name: 'Lisa Brown', mrn: 'MRN004', tests: 'Peak Flow, IgE Level', status: 'pending', priority: 'routine', date: '2026-08-09T08:45:00' },
      { id: 'ORD001', name: 'John Smith', mrn: 'MRN001', tests: 'Complete Blood Count, HbA1c...', status: 'pending', priority: 'routine', date: '2026-08-09T08:30:00' },
    ];

    const filteredQueue = mockTechQueue.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(queueSearchTerm.toLowerCase()) || 
                          item.mrn.toLowerCase().includes(queueSearchTerm.toLowerCase());
      if (!matchSearch) return false;
      if (techDateRange.start && techDateRange.end) {
        const itemDate = item.date.split('T')[0];
        if (itemDate < techDateRange.start || itemDate > techDateRange.end) return false;
      }
      return true;
    });

    const mockCompletedLabs = [
      { id: 'CLN2023-20260710-EMP001-002', name: 'Emily Johnson', mrn: 'MRN002', patientName: 'Emily Johnson', tests: 'Glucose, HbA1c', status: 'Completed', priority: 'routine', date: '2026-08-09T08:00:00' },
      { id: 'CLN2023-20260701-EMP003-002', name: 'David Wilson', mrn: 'MRN003', patientName: 'David Wilson', tests: 'Troponin, ECG', status: 'Completed', priority: 'urgent', date: '2026-08-09T07:30:00' },
      { id: 'CLN2023-20260701-EMP001-003', name: 'John Smith', mrn: 'MRN001', patientName: 'John Smith', tests: 'Complete Blood Count', status: 'Completed', priority: 'routine', date: '2026-08-09T07:00:00' },
      { id: 'CLN2023-20260701-EMP001-004', name: 'William Turner', mrn: 'MRN005', patientName: 'William Turner', tests: 'Thyroid Panel', status: 'Completed', priority: 'routine', date: '2026-08-08T16:00:00' },
      { id: 'CLN2023-20260701-EMP005-001', name: 'Michael Thompson', mrn: 'MRN007', patientName: 'Michael Thompson', tests: 'MRI Brain', status: 'Completed', priority: 'urgent', date: '2026-08-08T15:30:00' },
      { id: 'CLN2023-20260701-EMP006-001', name: 'Emma Clark', mrn: 'MRN012', patientName: 'Emma Clark', tests: 'CBC, HbA1c', status: 'Completed', priority: 'routine', date: '2026-08-08T14:00:00' },
      { id: 'CLN2023-20260701-EMP007-001', name: 'Sarah Connor', mrn: 'MRN018', patientName: 'Sarah Connor', tests: 'Urinalysis', status: 'Completed', priority: 'routine', date: '2026-08-08T13:00:00' }
    ];

    const filteredCompletedLabs = mockCompletedLabs.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(completedLabsSearchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(completedLabsSearchTerm.toLowerCase());
      if (!matchSearch) return false;
      if (techDateRange.start && techDateRange.end) {
        const itemDate = item.date.split('T')[0];
        if (itemDate < techDateRange.start || itemDate > techDateRange.end) return false;
      }
      return true;
    });

    if (completedLabOrder) {
      return (
        <LabOrderDetail 
          order={completedLabOrder}
          onBack={() => setCompletedLabOrder(null)}
          onEdit={() => {}}
          onPrint={() => setPrintBarcodeOrder(completedLabOrder.id)}
        />
      );
    }

    return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Technician Dashboard</h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'white', padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Calendar size={16} className="text-muted" />
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginRight: '4px' }}>Date Range:</span>
          <input 
            type="date" 
            value={techDateRange.start}
            onChange={(e) => setTechDateRange(prev => ({ ...prev, start: e.target.value }))}
            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#334155' }}
          />
          <span style={{ color: '#94a3b8' }}>-</span>
          <input 
            type="date" 
            value={techDateRange.end}
            onChange={(e) => setTechDateRange(prev => ({ ...prev, end: e.target.value }))}
            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#334155' }}
          />
        </div>
      </div>

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

      <div className="tech-dashboard-grid mt-6" style={{ alignItems: 'stretch' }}>
        {/* Sample Collection Queue */}
        <div className="premium-widget" style={{ height: '100%' }}>
          <div className="premium-widget-header" style={{ paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <div>
                <div className="premium-widget-title">
                  <ClipboardList size={20} style={{ color: '#6b7280' }} />
                  <span>Sample Collection Queue</span>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginTop: '4px' }}>
                  Orders awaiting sample collection
                </span>
              </div>
              <div className="search-input-wrapper" style={{ width: '200px', position: 'relative' }}>
                <Search size={14} className="search-icon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Search queue..." 
                  value={queueSearchTerm}
                  onChange={(e) => setQueueSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '6px 12px 6px 32px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
                />
              </div>
            </div>
          </div>
          
          <div className="recent-orders-list" style={{ borderTop: '1px solid var(--border-color)', flex: 1, overflowY: 'auto', maxHeight: '450px' }}>
            {filteredQueue.length > 0 ? filteredQueue.map(item => (
              <div 
                key={item.id} 
                className="tech-queue-item hover-effect cursor-pointer" 
                style={{ cursor: 'pointer' }}
                onClick={() => setCollectSampleOrder(item)}
              >
                <div className="tech-queue-info">
                  <div className="tech-queue-header">
                    <Clock size={14} className="text-muted" />
                    <span className="tech-queue-name">{item.name}</span>
                  </div>
                  <div className="tech-queue-tests">{item.tests}</div>
                  <div className="tech-queue-mrn">MRN: {item.mrn}</div>
                </div>
                <div className="tech-queue-badges">
                  <span className="status-pill outline status-pending">pending</span>
                  <span className={item.priority === 'urgent' ? 'badge-urgent' : 'badge-routine'}>{item.priority}</span>
                </div>
              </div>
            )) : (
              <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                No pending collections found.
              </div>
            )}
          </div>
        </div>

        {/* Labs Completed */}
        <div className="premium-widget" style={{ height: '100%' }}>
          <div className="premium-widget-header" style={{ paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <div>
                <div className="premium-widget-title">
                  <CheckCircle2 size={20} style={{ color: '#6b7280' }} />
                  <span>Labs Completed</span>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginTop: '4px' }}>
                  Completed lab orders returned from the lab
                </span>
              </div>
              <div className="search-input-wrapper" style={{ width: '200px', position: 'relative' }}>
                <Search size={14} className="search-icon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Search completed..." 
                  value={completedLabsSearchTerm}
                  onChange={(e) => setCompletedLabsSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '6px 12px 6px 32px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
                />
              </div>
            </div>
          </div>
          
          <div className="recent-orders-list" style={{ borderTop: '1px solid var(--border-color)', flex: 1, overflowY: 'auto', maxHeight: '450px' }}>
            {filteredCompletedLabs.length > 0 ? filteredCompletedLabs.map(lab => (
              <div 
                key={lab.id} 
                className="tech-queue-item hover-effect cursor-pointer" 
                style={{ cursor: 'pointer' }}
                onClick={() => setCompletedLabOrder(lab)}
              >
                <div className="tech-queue-info">
                  <div className="tech-queue-header">
                    <CheckCircle2 size={14} className="text-success" />
                    <span className="tech-queue-name">{lab.name}</span>
                  </div>
                  <div className="tech-queue-mrn" style={{ marginLeft: '22px' }}>{lab.id}</div>
                </div>
                <div className="tech-queue-badges">
                  <span className="badge-routine" style={{ backgroundColor: 'transparent', color: '#111' }}>COMPLETED</span>
                </div>
              </div>
            )) : (
              <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                No completed labs found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

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
        onPrintLabels={(id) => setPrintBarcodeOrder(id)}
      />

      {printBarcodeOrder && (
        <PrintBarcodeModal
          orderId={printBarcodeOrder}
          onClose={() => setPrintBarcodeOrder(null)}
          onPrint={() => setPrintBarcodeOrder(null)}
        />
      )}

      {collectSampleOrder && (
        <CollectSampleModal
          order={{...collectSampleOrder, patientName: collectSampleOrder.name}}
          onClose={() => setCollectSampleOrder(null)}
          onPrintBarcode={() => {
            setPrintBarcodeOrder(collectSampleOrder.id);
          }}
          onComplete={() => setCollectSampleOrder(null)}
        />
      )}
    </div>
  );
}
