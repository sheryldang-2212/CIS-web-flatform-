import { useState } from 'react';
import { CheckCircle, FileText, AlertTriangle, FileSearch, Calendar, Users, ClipboardList } from 'lucide-react';
import LabOrderFormModal from './LabOrderFormModal';
import PatientFormModal from './PatientFormModal';
import './DoctorDashboard.css';
import './Dashboard.css';

interface DoctorDashboardProps {
  setActiveTab: (tab: string) => void;
}

export default function DoctorDashboard({ setActiveTab }: DoctorDashboardProps) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [doctorDateRange, setDoctorDateRange] = useState({ start: todayStr, end: todayStr });
  const [isLabOrderModalOpen, setIsLabOrderModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  return (
    <div className="doctor-dashboard">
      <div className="dd-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Doctor Dashboard</h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>Review lab results and manage patient care</p>
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
              <Users size={24} className="text-yellow" />
            </div>
            <div className="rec-action-text">
              <h3>View Patients</h3>
              <p>Access patient records and history</p>
            </div>
          </div>
          <button className="btn-rec-action" onClick={() => setActiveTab('Patients')}>
            View Patients List
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

      <div className="dd-kpis">
        <div className="dd-kpi-card">
          <div className="dd-kpi-header">
            <span>Pending Review</span>
            <FileText size={16} className="dd-kpi-icon" />
          </div>
          <div className="dd-kpi-value warning">0</div>
          <div className="dd-kpi-desc">Results awaiting review</div>
        </div>

        <div className="dd-kpi-card">
          <div className="dd-kpi-header">
            <span>Reviewed Today</span>
            <CheckCircle size={16} className="dd-kpi-icon" />
          </div>
          <div className="dd-kpi-value success">0</div>
          <div className="dd-kpi-desc">Results reviewed today</div>
        </div>

        <div className="dd-kpi-card">
          <div className="dd-kpi-header">
            <span>Critical Results</span>
            <AlertTriangle size={16} className="dd-kpi-icon" />
          </div>
          <div className="dd-kpi-value danger">0</div>
          <div className="dd-kpi-desc">Need attention</div>
        </div>

        <div className="dd-kpi-card">
          <div className="dd-kpi-header">
            <span>Total Completed</span>
            <FileSearch size={16} className="dd-kpi-icon" />
          </div>
          <div className="dd-kpi-value">0</div>
          <div className="dd-kpi-desc">All completed results</div>
        </div>
      </div>

      <div className="dd-section">
        <h2 className="dd-section-title">
          <FileText size={18} /> Lab Results to Review
        </h2>
        <p className="dd-section-subtitle">Recent results requiring your attention</p>
        
        <div className="dd-empty-state">
          No results to review
        </div>

        <button className="dd-view-all" onClick={() => setActiveTab('Lab Results')}>
          <FileSearch size={16} /> View All Results
        </button>
      </div>

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
        onPrintLabels={() => {}}
      />
    </div>
  );
}
