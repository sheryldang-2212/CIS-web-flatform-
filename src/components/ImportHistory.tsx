import React from 'react';
import { Search, Filter, Download, Eye, RotateCw, CheckCircle2, AlertTriangle, XCircle, Clock, MoreVertical } from 'lucide-react';
import './ImportHistory.css';

const HISTORY_DATA = [
  { id: 'BATCH-20260710-01', fileName: 'patients_july.xlsx', uploadedBy: 'Admin User', date: 'Jul 10, 2026, 09:15 AM', clinic: 'Downtown Clinic', total: 124, success: 110, pending: 110, failed: 14, status: 'Completed with Errors' },
  { id: 'BATCH-20260709-02', fileName: 'new_registrations.csv', uploadedBy: 'Admin User', date: 'Jul 09, 2026, 14:30 PM', clinic: 'Uptown Hospital', total: 50, success: 50, pending: 20, failed: 0, status: 'Completed' },
  { id: 'BATCH-20260708-01', fileName: 'migrated_data.xlsx', uploadedBy: 'System Admin', date: 'Jul 08, 2026, 11:00 AM', clinic: 'Riverside Medical Center', total: 200, success: 0, pending: 0, failed: 200, status: 'Failed' },
  { id: 'BATCH-20260708-02', fileName: 'batch_4_processing.csv', uploadedBy: 'Admin User', date: 'Jul 08, 2026, 16:45 PM', clinic: 'Downtown Clinic', total: 500, success: 0, pending: 0, failed: 0, status: 'Processing' },
];

export default function ImportHistory() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return <span className="status-pill success"><CheckCircle2 size={12}/> Completed</span>;
      case 'Completed with Errors': return <span className="status-pill warning"><AlertTriangle size={12}/> Completed with Errors</span>;
      case 'Failed': return <span className="status-pill error"><XCircle size={12}/> Failed</span>;
      case 'Processing': return <span className="status-pill info"><Clock size={12}/> Processing</span>;
      default: return null;
    }
  };

  return (
    <div className="import-history-container" style={{ paddingTop: '12px' }}>
      <div className="filters-bar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search by Batch ID or File Name..." className="search-input" />
        </div>
        
        <div className="filter-group">
          <select className="filter-select">
            <option>All Clinics</option>
            <option>Downtown Clinic</option>
            <option>Uptown Hospital</option>
          </select>
          <select className="filter-select">
            <option>All Statuses</option>
            <option>Processing</option>
            <option>Completed</option>
            <option>Completed with Errors</option>
            <option>Failed</option>
          </select>
          <select className="filter-select">
            <option>Upload Date: Any</option>
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
          </select>
          <select className="filter-select">
            <option>Uploaded By: All</option>
            <option>Admin User</option>
            <option>System Admin</option>
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
                <th>Batch ID</th>
                <th>File Name</th>
                <th>Uploaded By</th>
                <th>Upload Date & Time</th>
                <th>Assigned Clinic</th>
                <th>Total Records</th>
                <th>Success</th>
                <th>Pending Verif.</th>
                <th>Failed</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY_DATA.map((batch, idx) => (
                <tr key={idx}>
                  <td className="font-medium">{batch.id}</td>
                  <td>{batch.fileName}</td>
                  <td>{batch.uploadedBy}</td>
                  <td>{batch.date}</td>
                  <td>{batch.clinic}</td>
                  <td>{batch.total}</td>
                  <td className="text-success">{batch.success}</td>
                  <td className="text-warning">{batch.pending}</td>
                  <td className="text-error">{batch.failed}</td>
                  <td>{getStatusBadge(batch.status)}</td>
                  <td>
                    <div className="action-buttons-sm">
                      <button className="btn-action" title="View Details">
                        <Eye size={16} />
                      </button>
                      {batch.failed > 0 && (
                        <button className="btn-action" title="Download Error Report">
                          <Download size={16} />
                        </button>
                      )}
                      {batch.status === 'Failed' && (
                        <button className="btn-action" title="Retry Failed Records">
                          <RotateCw size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="pagination-container mt-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="text-muted" style={{ fontSize: '13px' }}>Showing 1-4 of 4 batches</span>
        <div className="pagination-controls" style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-outline" disabled style={{ padding: '6px 12px' }}>Previous</button>
          <button className="btn-primary" style={{ padding: '6px 12px' }}>1</button>
          <button className="btn-outline" disabled style={{ padding: '6px 12px' }}>Next</button>
        </div>
      </div>
    </div>
  );
}
