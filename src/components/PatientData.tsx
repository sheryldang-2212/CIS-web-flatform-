import { useState } from 'react';
import { Search, Eye, Edit2, Trash2 } from 'lucide-react';
import PatientBulkUpload from './PatientBulkUpload';
import './PatientData.css';

const MOCK_PATIENTS = [
  { id: '1', name: 'John Smith', patientId: 'MRN001', idNumber: 'ID123456789', phone: '+1555123456', email: 'john.smith@email.com', dob: '3/15/1985', age: 41, clinic: 'Downtown Medical Center', registered: '1/10/2024', status: 'active' },
  { id: '2', name: 'Emily Johnson', patientId: 'MRN002', idNumber: 'ID234567890', phone: '+1555234567', email: 'emily.johnson@email.com', dob: '7/22/1992', age: 34, clinic: 'Downtown Medical Center', registered: '1/12/2024', status: 'active' },
  { id: '3', name: 'Robert Davis', patientId: 'MRN003', idNumber: 'ID345678901', phone: '+1555345678', email: '-', dob: '11/8/1975', age: 50, clinic: 'Downtown Medical Center', registered: '1/5/2024', status: 'active' },
  { id: '4', name: 'Lisa Brown', patientId: 'MRN004', idNumber: 'ID456789012', phone: '+1555456789', email: 'lisa.brown@email.com', dob: '4/30/1988', age: 38, clinic: 'Downtown Medical Center', registered: '1/8/2024', status: 'active' },
  { id: '5', name: 'David Wilson', patientId: 'MRN005', idNumber: 'ID567890123', phone: '+1555567890', email: '-', dob: '12/12/1990', age: 35, clinic: 'Downtown Medical Center', registered: '1/14/2024', status: 'active' },
  { id: '6', name: 'Sarah Miller', patientId: 'MRN006', idNumber: 'ID678901234', phone: '+1555678901', email: 'sarah.miller@email.com', dob: '9/18/1995', age: 30, clinic: 'Suburban Family Clinic', registered: '1/16/2024', status: 'active' },
  { id: '7', name: 'Michael Thompson', patientId: 'MRN007', idNumber: 'ID789012345', phone: '+1555789012', email: '-', dob: '6/25/1982', age: 44, clinic: 'Suburban Family Clinic', registered: '1/11/2024', status: 'active' },
  { id: '8', name: 'Jennifer Garcia', patientId: 'MRN008', idNumber: 'ID890123456', phone: '+1555890123', email: 'jennifer.garcia@email.com', dob: '2/14/1978', age: 46, clinic: 'Emergency Care Center', registered: '1/9/2024', status: 'active' },
  { id: '9', name: 'Sophie Anderson', patientId: 'MRN009', idNumber: 'ID901234567', phone: '+1555901234', email: '-', dob: '5/12/2018', age: 8, clinic: 'Suburban Family Clinic', registered: '1/7/2024', status: 'active' },
  { id: '10', name: 'James Rodriguez', patientId: 'MRN010', idNumber: 'ID012345678', phone: '+1555012345', email: '-', dob: '12/3/1965', age: 60, clinic: 'Suburban Family Clinic', registered: '1/3/2024', status: 'active' },
  { id: '11', name: 'Alex Emergency', patientId: 'MRN011', idNumber: 'PP987654321', phone: '+1555123987', email: '-', dob: '8/15/1990', age: 36, clinic: 'Emergency Care Center', registered: '1/15/2024', status: 'active' }
];

export default function PatientData() {
  const [activeTab, setActiveTab] = useState('Patient List');
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="patient-data-wrapper">
      <div className="pd-header">
        <h1 className="pd-title">Patients</h1>
        <p className="pd-subtitle">Manage patient records, upload new patients, and keep your database up to date.</p>
      </div>

      <div className="pd-tabs-new">
        <button 
          className={`pd-tab-new ${activeTab === 'Patient List' ? 'active' : ''}`}
          onClick={() => setActiveTab('Patient List')}
        >
          Patient List
        </button>
        <button 
          className={`pd-tab-new ${activeTab === 'Bulk Upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('Bulk Upload')}
        >
          Bulk Upload
        </button>
      </div>

      <div className="pd-card fadeIn">
        {activeTab === 'Patient List' && (
          <>
            <div className="pd-card-header">
              <h2 className="pd-card-title">All Patients</h2>
              <div className="pd-card-subtitle">{MOCK_PATIENTS.length} of {MOCK_PATIENTS.length} patient records</div>
            </div>

            <div className="pd-toolbar">
              <div className="pd-search">
                <Search size={16} className="text-muted" />
                <input 
                  type="text" 
                  placeholder="Search name, Patient ID, ID number, phone, email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="pd-filters">

                <select className="pd-filter-select">
                  <option>All statuses</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="pd-table-container">
              <table className="pd-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Patient ID</th>
                    <th>ID Number</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>DOB</th>
                    <th>Age</th>

                    <th>Registered</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PATIENTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.patientId.toLowerCase().includes(searchQuery.toLowerCase())).map((patient) => (
                    <tr key={patient.id}>
                      <td style={{ fontWeight: 500 }}>{patient.name}</td>
                      <td>{patient.patientId}</td>
                      <td>{patient.idNumber}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.email !== '-' ? <span style={{ color: '#2563eb' }}>{patient.email}</span> : patient.email}</td>
                      <td>{patient.dob}</td>
                      <td>{patient.age}</td>

                      <td>{patient.registered}</td>
                      <td>
                        <span className="pd-badge-active">{patient.status}</span>
                      </td>
                      <td>
                        <div className="pd-actions" style={{ justifyContent: 'flex-end' }}>
                          <button><Eye size={16} /></button>
                          <button><Edit2 size={16} /></button>
                          <button><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        
        {activeTab === 'Bulk Upload' && (
          <PatientBulkUpload />
        )}
      </div>
    </div>
  );
}
