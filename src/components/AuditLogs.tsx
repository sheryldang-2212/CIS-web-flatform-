import { useState } from 'react';
import { Search, Download, Eye, X } from 'lucide-react';
import './AuditLogs.css';

const MOCK_LOGS = [
  { id: 1, timestamp: '2026-08-03 14:30:22', user: 'Dr. Narong Phanich', role: 'Doctor', clinic: 'Downtown Clinic', event: 'Approved & Released Lab Results (ORD004)', module: 'Laboratory', ip: '10.0.0.15', details: 'Reviewed critical values. Authorized release to patient portal.', status: 'Success' },
  { id: 2, timestamp: '2026-08-03 14:15:05', user: 'System (LIS)', role: 'Integration', clinic: 'Platform', event: 'Received Lab Results (ORD004)', module: 'Laboratory', ip: '10.0.0.99', details: 'HL7 ORU message received. 1 critical value flagged (HbA1c).', status: 'Success' },
  { id: 3, timestamp: '2026-08-03 13:45:10', user: 'Dr. Apinya Chamroenuk', role: 'Doctor', clinic: 'Downtown Clinic', event: 'Rejected Lab Results (ORD003)', module: 'Laboratory', ip: '10.0.0.22', details: 'Sample hemolyzed. Requested recollection.', status: 'Failure' },
  { id: 4, timestamp: '2026-08-03 11:20:00', user: 'Preecha Suthiwong', role: 'Technician', clinic: 'Uptown Hospital', event: 'Updated Sample Status: Sent to Lab (ORD004)', module: 'Laboratory', ip: '192.168.1.88', details: 'Batch transferred to Central Lab via courier.', status: 'Success' },
  { id: 5, timestamp: '2026-08-03 10:45:12', user: 'Sarah Chen', role: 'Platform Admin', clinic: 'Platform', event: 'Modified Permissions: Doctor Role', module: 'Security', ip: '192.168.1.45', details: 'Granted "Approve Lab Results" permission to Doctor role.', status: 'Success' },
  { id: 6, timestamp: '2026-08-03 09:10:00', user: 'John Smith', role: 'Clinic Admin', clinic: 'Uptown Hospital', event: 'Cancelled Order (ORD005)', module: 'Patient Management', ip: '192.168.1.45', details: 'Patient requested cancellation. Refund initiated.', status: 'Success' },
];

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [clinicFilter, setClinicFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState<any>(null);
  
  const [showExportConfirm, setShowExportConfirm] = useState(false);

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'All' || log.module === moduleFilter;
    const matchesClinic = clinicFilter === 'All' || log.clinic === clinicFilter;
    const matchesRole = roleFilter === 'All' || log.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
    
    return matchesSearch && matchesModule && matchesClinic && matchesRole && matchesStatus;
  });

  const handleExport = () => {
    console.log('[AUDIT] Audit logs exported by user.');
    setShowExportConfirm(false);
    alert('Audit logs exported successfully. This action has been recorded in the audit log.');
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden p-6 bg-slate-50/50">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="prem-title">Audit Logs</h1>
          <p className="prem-subtitle mt-2">Review system activities and user logs for compliance.</p>
        </div>
      </div>

      <div className="glass-panel p-4 mb-6 flex flex-wrap gap-4 items-center bg-white/60">
        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200 min-w-[250px]">
          <Search size={16} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search user or event..." 
            className="bg-transparent border-none outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select className="prem-input py-2 text-sm !w-auto" value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)}>
          <option value="All">All Modules</option>
          <option value="Security">Security</option>
          <option value="Patient Management">Patient</option>
          <option value="Laboratory">Laboratory</option>
        </select>

        <select className="prem-input py-2 text-sm !w-auto" value={clinicFilter} onChange={(e) => setClinicFilter(e.target.value)}>
          <option value="All">All Clinics</option>
          <option value="Platform">Platform Level</option>
          <option value="Downtown Clinic">Downtown Clinic</option>
          <option value="Uptown Hospital">Uptown Hospital</option>
        </select>

        <select className="prem-input py-2 text-sm !w-auto" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="Platform Admin">Platform Admin</option>
          <option value="Clinic Admin">Clinic Admin</option>
          <option value="Doctor">Doctor</option>
          <option value="Technician">Technician</option>
        </select>

        <select className="prem-input py-2 text-sm !w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Success">Success</option>
          <option value="Failure">Failure</option>
        </select>

        <select className="prem-input py-2 text-sm !w-auto">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>

        <div className="ml-auto">
          <button className="prem-btn-primary py-2 px-4" onClick={() => setShowExportConfirm(true)}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto glass-panel p-1">
        <table className="prem-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Clinic</th>
              <th>Event</th>
              <th>Module</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td className="font-mono text-sm text-slate-500">{log.timestamp}</td>
                <td>
                  <div className="flex items-center gap-3">
                    {log.user !== 'System (LIS)' && log.user !== 'Unknown' && (
                      <div className="prem-avatar w-8 h-8 text-xs">
                        {log.user.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{log.user}</div>
                      <div className="text-xs text-slate-500 font-medium">{log.role}</div>
                    </div>
                  </div>
                </td>
                <td><span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">{log.clinic}</span></td>
                <td className="text-sm font-medium text-slate-700">{log.event}</td>
                <td>
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium border border-indigo-100">{log.module}</span>
                </td>
                <td>
                  <span className={`prem-badge ${log.status === 'Success' ? 'success' : 'danger'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="text-right">
                  <button className="text-slate-400 hover:text-indigo-600 transition-colors p-2" onClick={() => setSelectedLog(log)}>
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
            
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-500 font-medium bg-slate-50/50 rounded-b-xl">
                  No logs found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="flex justify-between items-center p-4 border-t border-slate-200/50 bg-white/30 rounded-b-xl">
          <div className="text-sm font-medium text-slate-500">Showing {filteredLogs.length} entries (Critical events only)</div>
          <div className="flex gap-2">
            <button className="prem-btn-secondary text-xs py-1" disabled>Previous</button>
            <button className="prem-btn-secondary text-xs py-1">Next</button>
          </div>
        </div>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Event Details</h2>
              <button className="text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setSelectedLog(null)}><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Event:</span>
                <div className="font-semibold text-slate-800">{selectedLog.event}</div>
              </div>
              <div className="mb-6">
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Details:</span>
                <div className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">{selectedLog.details}</div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">User:</span>
                  <div className="font-medium text-slate-800 text-sm">{selectedLog.user} ({selectedLog.role})</div>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Timestamp:</span>
                  <div className="font-mono text-slate-700 text-sm">{selectedLog.timestamp}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                <div>
                  <span className="block text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">IP Address:</span>
                  <div className="font-mono text-indigo-900 text-sm">{selectedLog.ip}</div>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">Module:</span>
                  <div className="font-medium text-indigo-900 text-sm">{selectedLog.module}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showExportConfirm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Export Audit Logs</h2>
              <button className="text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setShowExportConfirm(false)}><X size={20}/></button>
            </div>
            <div className="p-6">
              <p className="text-slate-700 mb-5 leading-relaxed">
                You are about to export {filteredLogs.length} audit records.
              </p>
              <div className="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-sm border border-indigo-200 leading-relaxed">
                <strong>Note:</strong> Exporting audit logs is a restricted action. This export event will itself be recorded in the system audit trail for compliance purposes.
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button className="prem-btn-secondary" onClick={() => setShowExportConfirm(false)}>Cancel</button>
              <button className="prem-btn-primary" onClick={handleExport}>
                Confirm Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
