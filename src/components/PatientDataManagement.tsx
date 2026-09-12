import { useState } from 'react';
import { Database, UserCheck } from 'lucide-react';
import ImportedPatients from './ImportedPatients';
import './PatientDataManagement.css';

export default function PatientDataManagement() {
  const [activeTab, setActiveTab] = useState('monitoring');

  return (
    <div className="patient-data-management-container">
      <div className="page-header" style={{ marginBottom: 0, paddingBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 className="page-title mb-1">Patient Data Management</h1>
            <Database size={20} className="text-muted" />
          </div>
          <p className="page-subtitle">Manage bulk patient uploads, monitor import progress, and resolve potential data duplicates.</p>
        </div>
      </div>

      <div className="tabs-navigation">
        <button 
          className={`tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`}
          onClick={() => setActiveTab('monitoring')}
        >
          <UserCheck size={16} /> Patient Monitoring
        </button>
      </div>

      <div className="tab-content fadeIn">
        {activeTab === 'monitoring' && <ImportedPatients />}
      </div>
    </div>
  );
}
