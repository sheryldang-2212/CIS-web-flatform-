import { useState } from 'react';
import { Search, Shield, CheckCircle2, Eye, FileText, Users, Download, X, Filter, GitMerge, Flag, MoreHorizontal, Calendar, RefreshCw } from 'lucide-react';
import './PatientDataPremium.css';

const MOCK_RESULTS = [
  { 
    id: 'P-101', 
    name: 'Mayuree Chan', age: '32Y', gender: 'Female', 
    globalRef: 'GPR-000128', mrn: 'MRN-BKK001-00001234', 
    clinic: 'Bangkok Wellness Clinic', idType: 'ID', maskedId: '****1234', 
    phone: '****8901', email: 'm******@gmail.com', 
    verification: 'Verified', consent: 'Completed' 
  },
  { 
    id: 'P-102', 
    name: 'Daniel Smith', age: '45Y', gender: 'Male', 
    globalRef: 'GPR-000241', mrn: 'MRN-HKT003-00004561', 
    clinic: 'Phuket Care Clinic', idType: 'Passport', maskedId: '****7788', 
    phone: '****4456', email: 'd******@outlook.com', 
    verification: 'Unverified', consent: 'Not Completed' 
  },
  { 
    id: 'P-103', 
    name: 'Arisa Wong', age: '28Y', gender: 'Female', 
    globalRef: 'GPR-000352', mrn: 'MRN-BKK001-00007890', isMultipleMrn: true, extraMrn: 'MRN-CNX002-00001123',
    clinic: 'Bangkok Wellness Clinic', extraClinic: 'Chiang Mai Health Center', idType: 'ID', maskedId: '****5678', 
    phone: '****7766', email: 'a******@gmail.com', 
    verification: 'Verified', consent: 'Completed' 
  },
  { 
    id: 'P-104', 
    name: 'Nattapong Suriya', age: '51Y', gender: 'Male', 
    globalRef: 'GPR-000498', mrn: 'MRN-RYG004-00006789', 
    clinic: 'Rayong Health Clinic', idType: 'ID', maskedId: '****4321', 
    phone: '****2211', email: 'n******@hotmail.com', 
    verification: 'Verified', consent: 'Not Completed' 
  },
  { 
    id: 'P-105', 
    name: 'Priya Patel', age: '38Y', gender: 'Female', 
    globalRef: 'GPR-000621', mrn: 'MRN-PTY005-00003421', 
    clinic: 'Pattaya Medical', idType: 'Passport', maskedId: '****1122', 
    phone: '****9988', email: 'p******@yahoo.com', 
    verification: 'Verified', consent: 'Completed' 
  }
];

export default function PatientIdentitySupport() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="pdm-container">
      <div className="pdm-header">
        <div>
          <h1 className="pdm-title">Patient Data Management</h1>
          <p className="pdm-subtitle">View cross-clinic patient directory and data access status</p>
        </div>
        <div className="pdm-header-actions">
          <button className="btn-secondary">
            <FileText size={16} style={{ marginRight: '8px' }} /> View Access Logs
          </button>
          <button className="btn-primary">
            <Download size={16} style={{ marginRight: '8px' }} /> Export Report
          </button>
        </div>
      </div>

      {showBanner && (
        <div className="pdm-banner">
          <div className="pdm-banner-content">
            <div className="pdm-banner-icon">
              <Shield size={18} />
            </div>
            <span className="pdm-banner-text">
              Platform view is for operational metadata only. Sensitive identifiers are masked and all access is audited.
            </span>
          </div>
          <button className="pdm-banner-close" onClick={() => setShowBanner(false)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="pdm-stats-grid">
        <div className="pdm-stat-card">
          <div className="pdm-stat-icon blue">
            <Users size={24} />
          </div>
          <div>
            <div className="pdm-stat-value">24,893</div>
            <div className="pdm-stat-label">Total Patients</div>
            <div className="pdm-stat-sublabel">Across 6 clinics</div>
          </div>
        </div>
        
        <div className="pdm-stat-card">
          <div className="pdm-stat-icon green">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="pdm-stat-value">21,402</div>
            <div className="pdm-stat-label">Verified Patients</div>
            <div className="pdm-stat-sublabel">86.0% of total</div>
          </div>
        </div>

        <div className="pdm-stat-card">
          <div className="pdm-stat-icon blue">
            <FileText size={24} />
          </div>
          <div>
            <div className="pdm-stat-value">18,905</div>
            <div className="pdm-stat-label">Consent Completed</div>
            <div className="pdm-stat-sublabel">76.0% of total</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="pdm-filters-container">
        <div className="pdm-filters-top">
          <div className="pdm-filters-label">
            <Filter size={18} color="#3b82f6" /> Filters
          </div>
          <div className="pdm-search-bar">
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Search MRN, masked ID, phone, email, or patient name" />
          </div>
          <button className="btn-secondary" style={{ height: '40px' }}>
            <RefreshCw size={14} style={{ marginRight: '6px' }} /> Clear Filters
          </button>
        </div>
        
        <div className="pdm-filters-grid">
          <div className="pdm-filter-group">
            <label>Clinic</label>
            <select className="pdm-filter-select">
              <option>All Clinics</option>
            </select>
          </div>
          <div className="pdm-filter-group">
            <label>Verification Status</label>
            <select className="pdm-filter-select">
              <option>All Statuses</option>
            </select>
          </div>
          <div className="pdm-filter-group">
            <label>Consent Status</label>
            <select className="pdm-filter-select">
              <option>All Statuses</option>
            </select>
          </div>
          <div className="pdm-filter-group">
            <label>Date Range</label>
            <div className="pdm-search-bar" style={{ height: '38px', color: '#64748b' }}>
               <Calendar size={14} style={{ marginRight: '8px' }} color="#3b82f6" /> Select date range
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="pdm-table-container">
        <div className="pdm-table-header">
          <h2 className="pdm-table-title">Cross-Clinic Patient Directory</h2>
          <div className="pdm-table-actions">
            <span className="pdm-table-info">Showing 1-5 of 24,893 patients</span>
            <div className="pdm-pagination">
              <button className="pdm-page-btn">{"<"}</button>
              <button className="pdm-page-btn">{">"}</button>
            </div>
          </div>
        </div>
        
        <table className="pdm-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Global Patient Ref</th>
              <th>Clinic MRN</th>
              <th>Clinic</th>
              <th>ID/Passport</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Verification</th>
              <th>Consent</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RESULTS.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{patient.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{patient.age} • {patient.gender}</div>
                </td>
                <td style={{ fontWeight: 500 }}>{patient.globalRef}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{patient.mrn}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>{patient.clinic}</div>
                  {patient.extraClinic && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{patient.extraClinic}</div>}
                </td>
                <td style={{ color: '#64748b' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginRight: '4px' }}>{patient.idType}</span> 
                  {patient.maskedId}
                </td>
                <td style={{ color: '#64748b' }}>{patient.phone}</td>
                <td style={{ color: '#64748b' }}>{patient.email}</td>
                <td>
                  <span className={`pdm-badge ${patient.verification === 'Verified' ? 'success' : 'error'}`}>
                    {patient.verification}
                  </span>
                </td>
                <td>
                  <span className={`pdm-badge ${patient.consent === 'Completed' ? 'success' : 'error'}`}>
                    {patient.consent}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div className="pdm-actions-cell" style={{ justifyContent: 'flex-end' }}>
                    <button className="pdm-action-btn"><Eye size={18} /></button>
                    <button className="pdm-action-btn"><GitMerge size={18} /></button>
                    <button className="pdm-action-btn"><Flag size={18} /></button>
                    <button className="pdm-action-btn"><MoreHorizontal size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
