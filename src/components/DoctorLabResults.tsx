import { useState } from 'react';
import { Search, Printer, Download, FileText, AlertTriangle, Clock, Eye, CheckCircle, XCircle, MoreVertical, TrendingUp, TrendingDown, ChevronDown, Calendar } from 'lucide-react';
import ActionReasonModal from './ActionReasonModal';
import LabResultReviewModal from './LabResultReviewModal';
import './DoctorLabResults.css';

export default function DoctorLabResults() {
  const [selectAll, setSelectAll] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [viewingResult, setViewingResult] = useState<any>(null);
  const [approvingResult, setApprovingResult] = useState<any>(null);
  const [rejectingResult, setRejectingResult] = useState<any>(null);

  // New state variables for filter
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | 'Custom'>('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [appliedDateRange, setAppliedDateRange] = useState({ start: '', end: '' });
  const [assignedFilter, setAssignedFilter] = useState('All');
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);

  const toggleFilterDropdown = (filter: string) => {
    setActiveFilterDropdown(activeFilterDropdown === filter ? null : filter);
    setActiveDropdown(null);
  };

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
            <div className="dlr-kpi-icon-wrapper blue">
              <FileText size={16} className="dlr-kpi-icon" />
            </div>
          </div>
          <div className="dlr-kpi-value">20</div>
          <div className="dlr-kpi-trend positive">
            <TrendingUp size={12} /> <span>+5%</span> from last week
          </div>
        </div>

        <div className="dlr-kpi-card">
          <div className="dlr-kpi-header">
            <span>Pending Review</span>
            <div className="dlr-kpi-icon-wrapper yellow">
              <Clock size={16} className="dlr-kpi-icon" />
            </div>
          </div>
          <div className="dlr-kpi-value warning">10</div>
          <div className="dlr-kpi-trend negative">
            <TrendingUp size={12} /> <span>+2</span> this week
          </div>
        </div>

        <div className="dlr-kpi-card">
          <div className="dlr-kpi-header">
            <span>Critical Values</span>
            <div className="dlr-kpi-icon-wrapper red">
              <AlertTriangle size={16} className="dlr-kpi-icon" />
            </div>
          </div>
          <div className="dlr-kpi-value danger">14</div>
          <div className="dlr-kpi-trend positive">
            <TrendingDown size={12} /> <span>-3</span> from yesterday
          </div>
        </div>

        <div className="dlr-kpi-card">
          <div className="dlr-kpi-header">
            <span>Abnormal Results</span>
            <div className="dlr-kpi-icon-wrapper orange">
              <AlertTriangle size={16} className="dlr-kpi-icon" />
            </div>
          </div>
          <div className="dlr-kpi-value info">14</div>
          <div className="dlr-kpi-trend neutral">
            <span>0</span> change today
          </div>
        </div>
      </div>

      <div className="dlr-section">
        <h2 className="dlr-section-title">Laboratory Results</h2>
        <p className="dlr-section-subtitle">Review and manage patient lab results</p>

        <div className="filters-bar dlr-custom-filters" style={{ padding: '0 0 20px 0', borderBottom: 'none' }}>
          <div className="filters-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="search-filter">
              <Search size={18} className="text-muted" />
              <input 
                type="text" 
                placeholder="Search by ID or Patient Name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            

          </div>
          
          <div className="filters-right">
            <div className="toggle-group">
              <button 
                type="button"
                className={`toggle-btn ${dateFilter === 'All' ? 'active' : ''}`}
                onClick={() => { setDateFilter('All'); setAppliedDateRange({ start: '', end: '' }); }}
              >All</button>
              <button 
                type="button"
                className={`toggle-btn ${dateFilter === 'Today' ? 'active' : ''}`}
                onClick={() => { setDateFilter('Today'); setAppliedDateRange({ start: '', end: '' }); }}
              >Today</button>
            </div>

            <div className="filter-dropdown-container date-filter-container">
              <button 
                className={`dropdown-trigger ${dateFilter === 'Custom' ? 'active' : ''}`} 
                style={{ minWidth: '160px', justifyContent: 'space-between' }}
                onClick={() => toggleFilterDropdown('date')}
              >
                <span className="text-muted">
                  {appliedDateRange.start && appliedDateRange.end ? `${appliedDateRange.start} ~ ${appliedDateRange.end}` : 'Date range'}
                </span>
                <Calendar size={14} className="text-muted" />
              </button>
              {activeFilterDropdown === 'date' && (
                <div className="filter-dropdown-menu date-range-menu">
                  <div className="date-range-header">
                    <span className="font-medium text-sm">Select Date Range</span>
                  </div>
                  <div className="date-range-body">
                    <div className="date-input-group">
                      <label>Start Date</label>
                      <input 
                        type="date" 
                        className="date-input" 
                        value={dateRange.start} 
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} 
                      />
                    </div>
                    <div className="date-input-separator">to</div>
                    <div className="date-input-group">
                      <label>End Date</label>
                      <input 
                        type="date" 
                        className="date-input" 
                        value={dateRange.end} 
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} 
                      />
                    </div>
                  </div>
                  <div className="date-range-footer">
                    <button 
                      className="btn-secondary btn-sm" 
                      onClick={() => {
                        setDateRange({ start: '', end: '' });
                        setAppliedDateRange({ start: '', end: '' });
                        setDateFilter('All');
                        setActiveFilterDropdown(null);
                      }}
                    >
                      Clear
                    </button>
                    <button 
                      className="btn-primary btn-sm" 
                      onClick={() => {
                        setAppliedDateRange(dateRange);
                        setDateFilter('Custom');
                        setActiveFilterDropdown(null);
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="filter-dropdown-container">
              <span className="filter-label">Assigned to:</span>
              <button className="dropdown-trigger" onClick={() => toggleFilterDropdown('assigned')}>
                {assignedFilter} <ChevronDown size={14} />
              </button>
              {activeFilterDropdown === 'assigned' && (
                <div className="filter-dropdown-menu" style={{ right: 0, left: 'auto' }}>
                  {['All', 'Dr. James Wilson', 'Dr. Sarah Chen', 'Unassigned'].map(doc => (
                    <button 
                      key={doc} 
                      className={`dropdown-item ${assignedFilter === doc ? 'active' : ''}`}
                      onClick={() => { setAssignedFilter(doc); setActiveFilterDropdown(null); }}
                    >
                      {doc}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="filter-dropdown-container">
              <span className="filter-label">Priority:</span>
              <button className="dropdown-trigger" onClick={() => toggleFilterDropdown('priority')}>
                {priorityFilter} <ChevronDown size={14} />
              </button>
              {activeFilterDropdown === 'priority' && (
                <div className="filter-dropdown-menu" style={{ right: 0, left: 'auto' }}>
                  {['All', 'STAT', 'Urgent', 'Routine'].map(prio => (
                    <button 
                      key={prio} 
                      className={`dropdown-item ${priorityFilter === prio ? 'active' : ''}`}
                      onClick={() => { setPriorityFilter(prio); setActiveFilterDropdown(null); }}
                    >
                      {prio}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="btn-reset" onClick={() => {
              setDateFilter('All');
              setDateRange({ start: '', end: '' });
              setAppliedDateRange({ start: '', end: '' });
              setSearchQuery('');
              setAssignedFilter('All');
              setPriorityFilter('All');
            }}>Reset</button>
          </div>
        </div>

        <div className={`dlr-bulk-actions ${selectAll ? 'active' : ''}`}>
          <label className="dlr-checkbox-label">
            <input 
              type="checkbox" 
              className="dlr-checkbox" 
              checked={selectAll} 
              onChange={() => setSelectAll(!selectAll)} 
            />
            <span className="bulk-text">Select results to bulk approve <strong>(10 approvable)</strong></span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Auto-Approve Normal</span>
              <div className="toggle-switch">
                <input type="checkbox" checked={autoApprove} onChange={() => setAutoApprove(!autoApprove)} />
                <span className="slider"></span>
              </div>
            </label>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#cbd5e1' }}></div>
            <button className="btn-primary bulk-btn" disabled={!selectAll} style={{ opacity: selectAll ? 1 : 0.5 }}>
              <CheckCircle size={16} style={{ marginRight: '6px' }} /> Approve Selected
            </button>
          </div>
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
