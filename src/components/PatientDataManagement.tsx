import React, { useState } from 'react';
import { Database, Upload, History, UserCheck, Copy } from 'lucide-react';
import BulkPatientUpload from './BulkPatientUpload';
import ImportHistory from './ImportHistory';
import ImportedPatients from './ImportedPatients';
import PossibleDuplicates from './PossibleDuplicates';
import './PatientDataManagement.css';

export default function PatientDataManagement() {
  const [activeTab, setActiveTab] = useState('upload');

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
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <Upload size={16} /> Bulk Upload
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <History size={16} /> Import History
        </button>
        <button 
          className={`tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`}
          onClick={() => setActiveTab('monitoring')}
        >
          <UserCheck size={16} /> Patient Monitoring
        </button>
        <button 
          className={`tab-btn ${activeTab === 'duplicates' ? 'active' : ''}`}
          onClick={() => setActiveTab('duplicates')}
        >
          <Copy size={16} /> Possible Duplicates
        </button>
      </div>

      <div className="tab-content fadeIn">
        {activeTab === 'upload' && <BulkPatientUpload />}
        {activeTab === 'history' && <ImportHistory />}
        {activeTab === 'monitoring' && <ImportedPatients />}
        {activeTab === 'duplicates' && <PossibleDuplicates />}
      </div>
    </div>
  );
}
