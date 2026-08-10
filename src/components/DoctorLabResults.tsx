import { useState } from 'react';
import { Search, Printer, Download, FileText, AlertTriangle, Clock, Eye, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import ActionReasonModal from './ActionReasonModal';
import LabResultReviewModal from './LabResultReviewModal';
import './DoctorLabResults.css';

export default function DoctorLabResults() {
  const [selectAll, setSelectAll] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [viewingResult, setViewingResult] = useState<any>(null);
  const [approvingResult, setApprovingResult] = useState<any>(null);
  const [rejectingResult, setRejectingResult] = useState<any>(null);

  const handleApprove = (reason: string) => {
    console.log("Approved with note:", reason);
    setApprovingResult(null);
  };

  const handleReject = (reason: string) => {
    console.log("Rejected with reason:", reason);
    setRejectingResult(null);
  };

  return (
    <div className="doctor-lab-results">
      <div className="dlr-header">
        <div>
          <h1>Lab Results</h1>
          <p>Review and manage laboratory test results</p>
        </div>
        <div className="dlr-header-actions">
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Printer size={16} /> Print All Results
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={16} /> Export Results
          </button>
        </div>
      </div>

      <div className="dlr-kpis">
        <div className="dlr-kpi-card">
          <div className="dlr-kpi-header">
            <span>Total Results</span>
            <FileText size={16} className="dlr-kpi-icon" />
          </div>
          <div className="dlr-kpi-value">20</div>
          <div className="dlr-kpi-desc">All lab results</div>
        </div>

        <div className="dlr-kpi-card">
          <div className="dlr-kpi-header">
            <span>Pending Review</span>
            <Clock size={16} className="dlr-kpi-icon" />
          </div>
          <div className="dlr-kpi-value warning">10</div>
          <div className="dlr-kpi-desc">Need attention</div>
        </div>

        <div className="dlr-kpi-card">
          <div className="dlr-kpi-header">
            <span>Critical Values</span>
            <AlertTriangle size={16} className="dlr-kpi-icon" />
          </div>
          <div className="dlr-kpi-value danger">14</div>
          <div className="dlr-kpi-desc">Immediate action</div>
        </div>

        <div className="dlr-kpi-card">
          <div className="dlr-kpi-header">
            <span>Abnormal Results</span>
            <AlertTriangle size={16} className="dlr-kpi-icon" />
          </div>
          <div className="dlr-kpi-value info">14</div>
          <div className="dlr-kpi-desc">Outside normal range</div>
        </div>
      </div>

      <div className="dlr-section">
        <h2 className="dlr-section-title">Laboratory Results</h2>
        <p className="dlr-section-subtitle">Review and manage patient lab results</p>

        <div className="dlr-filters">
          <div className="dlr-search">
            <Search size={16} className="dlr-search-icon" />
            <input type="text" placeholder="Search by patient name, MRN, or findings..." />
          </div>
          <div className="dlr-filter-group">
            <select className="dlr-select">
              <option>All Statuses</option>
              <option>Pending Review</option>
              <option>Approved</option>
            </select>
            <select className="dlr-select">
              <option>All Priorities</option>
              <option>Routine</option>
              <option>Urgent</option>
              <option>STAT</option>
            </select>
          </div>
        </div>

        <div className="dlr-bulk-actions">
          <label className="dlr-checkbox-label">
            <input 
              type="checkbox" 
              className="dlr-checkbox" 
              checked={selectAll} 
              onChange={() => setSelectAll(!selectAll)} 
            />
            Select results to bulk approve (10 approvable)
          </label>
          <button className="btn-primary" disabled={!selectAll} style={{ opacity: selectAll ? 1 : 0.5 }}>
            <CheckCircle size={16} style={{ marginRight: '6px' }} /> Approve Selected
          </button>
        </div>

        <div className="modern-table-container" style={{ marginTop: '20px' }}>
          <table className="modern-data-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input type="checkbox" className="dlr-checkbox" checked={selectAll} onChange={() => setSelectAll(!selectAll)} />
                </th>
                <th>Lab Order ID</th>
                <th>Patient</th>
                <th>Tests</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned Doctor</th>
                <th>Create Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Item 1 */}
              <tr>
                <td><input type="checkbox" className="dlr-checkbox" checked={selectAll} readOnly /></td>
                <td style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>ORD-DWT-20260710-000001</td>
                <td>
                  <div className="patient-cell-flex">
                    <div className="patient-avatar">EJ</div>
                    <div className="patient-name-table">Emily Johnson</div>
                  </div>
                </td>
                <td className="tests-cell">
                  <div className="test-pills-container custom-tooltip-container">
                    <span className="test-pill">Complete Metabolic Panel</span>
                    <span className="test-pill">TSH</span>
                    <span className="test-pill">Vitamin D</span>
                    <div className="custom-tooltip">Complete Metabolic Panel, TSH, Vitamin D</div>
                  </div>
                </td>
                <td>
                  <span className="status-badge-outline pending-collection">Pending Review</span>
                </td>
                <td>
                  <span className="priority-badge routine"><span className="dot"></span> Routine</span>
                </td>
                <td><div className="assigned-table">Dr. James Wilson</div></td>
                <td><div className="date-table"><Clock size={12} /> Jan 16, 2026, 07:00 AM</div></td>
                <td className="actions-cell">
                  <div className="table-actions-wrapper">
                    <button className="icon-btn-small border-btn" title="Print"><Printer size={16} /></button>
                    <button className="icon-btn-small border-btn" onClick={() => setActiveDropdown(activeDropdown === '1' ? null : '1')}>
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === '1' && (
                      <div className="action-dropdown lab-action-dropdown table-dropdown">
                        <button className="dropdown-item" onClick={() => { setViewingResult({ id: 1, patientName: 'Emily Johnson', orderId: 'ORD-DWT-20260710-000001', testCount: 3, normalCount: 2, abnormalCount: 1, collectionDate: 'Jan 16, 2026 07:00 AM', resultDate: 'Jan 16, 2026 07:00 AM', status: 'Pending Review', tests: [ { name: 'Glucose', result: '95', unit: 'mg/dL', range: '70-100', flag: 'Normal', notes: 'Within range' }, { name: 'TSH', result: '2.1', unit: 'mIU/L', range: '0.4-4.0', flag: 'Normal', notes: 'Within range' }, { name: 'Vitamin D', result: '28', unit: 'ng/mL', range: '30-100', flag: 'Low', notes: 'Outside reference range' } ] }); setActiveDropdown(null); }}>
                          <Eye size={14} /> View Result
                        </button>
                        <button className="dropdown-item" onClick={() => { setApprovingResult({ id: 1 }); setActiveDropdown(null); }}>
                          <CheckCircle size={14} /> Approve Result
                        </button>
                        <button className="dropdown-item text-danger" onClick={() => { setRejectingResult({ id: 1 }); setActiveDropdown(null); }}>
                          <XCircle size={14} /> Reject Result
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
              {/* Item 2 */}
              <tr>
                <td><input type="checkbox" className="dlr-checkbox" checked={selectAll} readOnly /></td>
                <td style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>ORD-DWT-20260710-000002</td>
                <td>
                  <div className="patient-cell-flex">
                    <div className="patient-avatar">DW</div>
                    <div className="patient-name-table">David Wilson</div>
                  </div>
                </td>
                <td className="tests-cell">
                  <div className="test-pills-container custom-tooltip-container">
                    <span className="test-pill">Total Cholesterol</span>
                    <span className="test-pill">LDL</span>
                    <span className="test-pill">HDL</span>
                    <span className="test-pill">+1</span>
                    <div className="custom-tooltip">Total Cholesterol, LDL, HDL, Triglycerides</div>
                  </div>
                </td>
                <td>
                  <span className="status-badge-outline pending-collection">Pending Review</span>
                </td>
                <td>
                  <span className="priority-badge routine"><span className="dot"></span> Routine</span>
                </td>
                <td><div className="assigned-table">Dr. James Wilson</div></td>
                <td><div className="date-table"><Clock size={12} /> Aug 1, 2026, 09:15 AM</div></td>
                <td className="actions-cell">
                  <div className="table-actions-wrapper">
                    <button className="icon-btn-small border-btn" title="Print"><Printer size={16} /></button>
                    <button className="icon-btn-small border-btn" onClick={() => setActiveDropdown(activeDropdown === '2' ? null : '2')}>
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === '2' && (
                      <div className="action-dropdown lab-action-dropdown table-dropdown">
                        <button className="dropdown-item" onClick={() => { setViewingResult({ id: 2, patientName: 'David Wilson' }); setActiveDropdown(null); }}>
                          <Eye size={14} /> View Result
                        </button>
                        <button className="dropdown-item" onClick={() => { setApprovingResult({ id: 2 }); setActiveDropdown(null); }}>
                          <CheckCircle size={14} /> Approve Result
                        </button>
                        <button className="dropdown-item text-danger" onClick={() => { setRejectingResult({ id: 2 }); setActiveDropdown(null); }}>
                          <XCircle size={14} /> Reject Result
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {viewingResult && (
        <LabResultReviewModal 
          result={viewingResult} 
          onClose={() => setViewingResult(null)} 
        />
      )}

      <ActionReasonModal
        isOpen={!!approvingResult}
        onClose={() => setApprovingResult(null)}
        title="Approve Result"
        actionLabel="Approve"
        requireReason={false}
        showReasonField={false}
        onSubmit={handleApprove}
      />

      <ActionReasonModal
        isOpen={!!rejectingResult}
        onClose={() => setRejectingResult(null)}
        title="Reject Result"
        actionLabel="Reject"
        isDestructive={true}
        requireReason={true}
        onSubmit={handleReject}
      />
    </div>
  );
}
