import { Search, Filter, Clock, CheckCircle2, XCircle, AlertTriangle, UserCheck, Eye, RefreshCw, History } from 'lucide-react';
import './ImportedPatients.css';

const IMPORTED_PATIENTS = [
  { id: '1', name: 'John Doe', maskedId: '12345*****', dob: '1980-05-15', clinic: 'Downtown Clinic', batchId: 'BATCH-20260710-01', importDate: 'Jul 10, 2026', status: 'Pending Verification', receptionist: 'Unassigned' },
  { id: '2', name: 'Suda Rakdee', maskedId: '11002*****', dob: '1975-01-10', clinic: 'Downtown Clinic', batchId: 'BATCH-20260710-01', importDate: 'Jul 10, 2026', status: 'In Progress', receptionist: 'Sarah Jenkins' },
  { id: '3', name: 'Jane Smith', maskedId: '98765*****', dob: '1992-11-20', clinic: 'Downtown Clinic', batchId: 'BATCH-20260709-02', importDate: 'Jul 09, 2026', status: 'Verified', receptionist: 'Michael Johnson' },
  { id: '4', name: 'Mana Jai', maskedId: '55555*****', dob: '1988-08-08', clinic: 'Uptown Hospital', batchId: 'BATCH-20260709-02', importDate: 'Jul 09, 2026', status: 'Rejected', receptionist: 'Sarah Jenkins' },
  { id: '5', name: 'Somchai Jaidee', maskedId: '31005*****', dob: '1985-12-01', clinic: 'Downtown Clinic', batchId: 'BATCH-20260710-01', importDate: 'Jul 10, 2026', status: 'Manual Review Required', receptionist: 'Unassigned' },
  { id: '6', name: 'Kitti Chai', maskedId: '11223*****', dob: '1990-02-14', clinic: 'Riverside Medical Center', batchId: 'BATCH-20260708-01', importDate: 'Jul 08, 2026', status: 'Possible Duplicate', receptionist: 'Unassigned' },
];

export default function ImportedPatients() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending Verification': return <span className="status-pill warning"><Clock size={12}/> Pending Verification</span>;
      case 'In Progress': return <span className="status-pill info"><RefreshCw size={12}/> In Progress</span>;
      case 'Verified': return <span className="status-pill success"><CheckCircle2 size={12}/> Verified</span>;
      case 'Rejected': return <span className="status-pill error"><XCircle size={12}/> Rejected</span>;
      case 'Manual Review Required': return <span className="status-pill error"><AlertTriangle size={12}/> Manual Review</span>;
      case 'Possible Duplicate': return <span className="status-pill warning"><AlertTriangle size={12}/> Duplicate</span>;
      default: return null;
    }
  };

  return (
    <div className="imported-patients-container" style={{ paddingTop: '12px' }}>
      <div className="summary-cards mb-6">
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#fffbeb', color: '#f59e0b' }}>
            <Clock size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Pending Verification</span>
            <span className="card-value text-warning">45</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            <RefreshCw size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">In Progress</span>
            <span className="card-value text-info">12</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#f0fdf4', color: '#22c55e' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Verified</span>
            <span className="card-value text-success">1,250</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Rejected or Manual Review</span>
            <span className="card-value text-error">8</span>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search by name, ID or batch..." className="search-input" />
        </div>
        
        <div className="filter-group">
          <select className="filter-select">
            <option>All Clinics</option>
            <option>Downtown Clinic</option>
            <option>Uptown Hospital</option>
          </select>
          <select className="filter-select">
            <option>All Statuses</option>
            <option>Pending Verification</option>
            <option>In Progress</option>
            <option>Verified</option>
            <option>Rejected</option>
          </select>
          <select className="filter-select">
            <option>Batch: All</option>
            <option>BATCH-20260710-01</option>
          </select>
          <select className="filter-select">
            <option>Assigned To: All</option>
            <option>Sarah Jenkins</option>
            <option>Unassigned</option>
          </select>
          <button className="btn-icon">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="table-container mt-6">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Masked National ID / Passport Number</th>
                <th>Date of Birth</th>
                <th>Assigned Clinic</th>
                <th>Import Batch ID</th>
                <th>Imported Date</th>
                <th>Verification Status</th>
                <th>Assigned Receptionist</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {IMPORTED_PATIENTS.map((patient, idx) => (
                <tr key={idx}>
                  <td className="font-medium">{patient.name}</td>
                  <td className="text-muted">{patient.maskedId}</td>
                  <td>{patient.dob}</td>
                  <td>{patient.clinic}</td>
                  <td className="text-muted">{patient.batchId}</td>
                  <td>{patient.importDate}</td>
                  <td>{getStatusBadge(patient.status)}</td>
                  <td>
                    {patient.receptionist === 'Unassigned' ? (
                      <span className="text-muted italic">{patient.receptionist}</span>
                    ) : (
                      patient.receptionist
                    )}
                  </td>
                  <td>
                    <div className="action-buttons-sm">
                      <button className="btn-action" title="View Import Information">
                        <Eye size={16} />
                      </button>
                      <button className="btn-action" title="View Verification Status">
                        <UserCheck size={16} />
                      </button>
                      <button className="btn-action" title="Reassign Clinic">
                        <RefreshCw size={16} />
                      </button>
                      <button className="btn-action" title="View Audit History">
                        <History size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="pagination-container mt-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="text-muted" style={{ fontSize: '13px' }}>Showing 1-6 of 1,315 patients</span>
        <div className="pagination-controls" style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-outline" disabled style={{ padding: '6px 12px' }}>Previous</button>
          <button className="btn-primary" style={{ padding: '6px 12px' }}>1</button>
          <button className="btn-outline" style={{ padding: '6px 12px' }}>2</button>
          <button className="btn-outline" style={{ padding: '6px 12px' }}>3</button>
          <span style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>...</span>
          <button className="btn-outline" style={{ padding: '6px 12px' }}>Next</button>
        </div>
      </div>
    </div>
  );
}
