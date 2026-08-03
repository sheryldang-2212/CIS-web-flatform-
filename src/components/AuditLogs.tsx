import React, { useState } from 'react';
import { Search, Download, Filter, Eye, X } from 'lucide-react';
import './AuditLogs.css';

const MOCK_LOGS = [
  { id: 1, timestamp: '2026-08-03 14:30:22', user: 'Dr. Narong Phanich', role: 'Doctor', event: 'Approved & Released Lab Results (ORD004)', module: 'Laboratory', ip: '10.0.0.15', details: 'Reviewed critical values. Authorized release to patient portal.', status: 'Success' },
  { id: 2, timestamp: '2026-08-03 14:15:05', user: 'System (LIS)', role: 'Integration', event: 'Received Lab Results (ORD004)', module: 'Laboratory', ip: '10.0.0.99', details: 'HL7 ORU message received. 1 critical value flagged (HbA1c).', status: 'Success' },
  { id: 3, timestamp: '2026-08-03 13:45:10', user: 'Dr. Apinya Chamroenuk', role: 'Doctor', event: 'Rejected Lab Results (ORD003)', module: 'Laboratory', ip: '10.0.0.22', details: 'Sample hemolyzed. Requested recollection.', status: 'Failure' },
  { id: 4, timestamp: '2026-08-03 11:20:00', user: 'Preecha Suthiwong', role: 'Technician', event: 'Updated Sample Status: Sent to Lab (ORD004)', module: 'Laboratory', ip: '192.168.1.88', details: 'Batch transferred to Central Lab via courier.', status: 'Success' },
  { id: 5, timestamp: '2026-08-03 10:45:12', user: 'Sarah Chen', role: 'Clinic Admin', event: 'Modified Permissions: Doctor Role', module: 'Security', ip: '192.168.1.45', details: 'Granted "Approve Lab Results" permission to Doctor role.', status: 'Success' },
  { id: 6, timestamp: '2026-08-03 09:10:00', user: 'Sarah Chen', role: 'Clinic Admin', event: 'Cancelled Order (ORD005)', module: 'Patient Management', ip: '192.168.1.45', details: 'Patient requested cancellation. Refund initiated.', status: 'Success' },
];

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'All' || log.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="audit-logs-container fadeIn">
      <div className="al-header">
        <h1>Audit Logs</h1>
        <p>Review system activities and user logs for compliance.</p>
      </div>

      <div className="al-filters">
        <div className="al-search">
          <Search size={16} className="al-search-icon" />
          <input 
            type="text" 
            placeholder="Search by user or event..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="al-filter-select"
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
        >
          <option value="All">All Modules</option>
          <option value="Authentication">Authentication</option>
          <option value="Security">Security</option>
          <option value="Patient Management">Patient Management</option>
          <option value="Laboratory">Laboratory</option>
          <option value="User Management">User Management</option>
        </select>

        <select className="al-filter-select">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>Custom Range</option>
        </select>

        <button className="al-export-btn">
          <Download size={16} /> Export to CSV
        </button>
      </div>

      <div className="al-table-card">
        <table className="al-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Event</th>
              <th>Module</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td className="al-timestamp">{log.timestamp}</td>
                <td>
                  <div className="al-user-cell">
                    {log.user !== 'System' && log.user !== 'Unknown' && (
                      <div className="al-user-avatar">
                        {log.user.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                    )}
                    <div>
                      <div className="al-user-name">{log.user}</div>
                      <div className="al-user-role">{log.role}</div>
                    </div>
                  </div>
                </td>
                <td className="al-event-cell">{log.event}</td>
                <td>
                  <span className="al-module-badge">{log.module}</span>
                </td>
                <td>
                  <span className={`al-status ${log.status === 'Success' ? 'success' : 'failure'}`}>
                    <span className="al-status-dot"></span>
                    {log.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="icon-btn-small border-btn" onClick={() => setSelectedLog(log)}>
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
            
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                  No logs found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="al-pagination">
          <div className="al-page-info">Showing {filteredLogs.length} entries (Critical events only)</div>
          <div className="al-page-controls">
            <button className="al-page-btn" disabled>Previous</button>
            <button className="al-page-btn">Next</button>
          </div>
        </div>
      </div>

      {selectedLog && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '450px' }}>
            <div className="modal-header">
              <h2>Event Details</h2>
              <button className="close-btn" onClick={() => setSelectedLog(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '16px' }}>
                <span className="al-page-info">Event:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>{selectedLog.event}</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <span className="al-page-info">Details:</span>
                <div style={{ color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>{selectedLog.details}</div>
              </div>
              <div style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span className="al-page-info">User:</span>
                  <div style={{ fontWeight: 500, marginTop: '4px' }}>{selectedLog.user} ({selectedLog.role})</div>
                </div>
                <div>
                  <span className="al-page-info">Timestamp:</span>
                  <div style={{ marginTop: '4px' }}>{selectedLog.timestamp}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div>
                  <span className="al-page-info" style={{ fontSize: '11px', textTransform: 'uppercase' }}>IP Address:</span>
                  <div style={{ fontFamily: 'monospace', fontSize: '13px', marginTop: '2px' }}>{selectedLog.ip}</div>
                </div>
                <div>
                  <span className="al-page-info" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Module:</span>
                  <div style={{ fontSize: '13px', marginTop: '2px' }}>{selectedLog.module}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
