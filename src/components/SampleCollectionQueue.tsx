import { useState, useRef, useEffect } from 'react';
import { ClipboardList, Clock, BriefcaseMedical, Flag, Search, MoreVertical, Eye, Printer, Droplet, FileText, Calendar } from 'lucide-react';
import CollectSampleModal from './CollectSampleModal';
import PrintBarcodeModal from './PrintBarcodeModal';
import PatientDetail from './PatientDetail';
import LabOrderDetail from './LabOrderDetail';
import { initialMockPatients } from './Patients';
import './SampleCollectionQueue.css';

const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const mockOrders = [
  {
    id: 'CLN2023-20260710-EMP001-001',
    patient: { name: 'Somchai Wongsakul', id: 'ID859736813' },
    priority: 'STAT',
    doctor: 'Dr. Narong Phanich',
    notes: 'Rule-out MI',
    tests: ['HbA1c', 'Fasting Glucose', 'Creatinine', 'BUN'],
    extraTests: 12,
    allTests: ['HbA1c', 'Fasting Glucose', 'Creatinine', 'BUN', 'Lipid Profile', 'CBC', 'TSH', 'Free T4', 'AST', 'ALT', 'ALP', 'Total Protein', 'Albumin', 'Globulin', 'Bilirubin Total', 'Uric Acid'],
    status: 'Pending Collection',
    date: `${todayStr}, 09:15 AM`
  },
  {
    id: 'CLN2023-20260710-EMP002-002',
    patient: { name: 'Supaporn Rattanakul', id: 'ID638210322' },
    priority: 'Urgent',
    doctor: 'Dr. Preecha Suthiwong',
    notes: 'Severe migraine evaluation',
    tests: ['CBC', 'CD4', 'CRP', 'Ferritin'],
    extraTests: 0,
    allTests: ['CBC', 'CD4', 'CRP', 'Ferritin'],
    status: 'Pending Collection',
    date: `${todayStr}, 10:30 AM`
  },
  {
    id: 'CLN2023-20260710-EMP002-003',
    patient: { name: 'Thanakorn Jitprasert', id: 'ID205900179' },
    priority: 'Routine',
    doctor: 'Dr. Apinya Chamroenuk',
    notes: 'Annual checkup routine',
    tests: ['TSH', 'Free T4', 'Free T3', 'Anti-TPO'],
    extraTests: 2,
    allTests: ['TSH', 'Free T4', 'Free T3', 'Anti-TPO', 'Thyroglobulin', 'Calcitonin'],
    status: 'Ready for Pickup',
    date: 'Jul 10, 2026, 08:00 AM'
  },
  {
    id: 'CLN2023-20260710-EMP002-004',
    patient: { name: 'Pornpimon Srisawat', id: 'ID792161301' },
    priority: 'Routine',
    doctor: 'Dr. Michel Kikuzaki',
    notes: 'Jul 20, 2026, 09:15 AM',
    tests: ['AST', 'ALT', 'GGT', 'Total Bilirubin'],
    extraTests: 12,
    allTests: ['AST', 'ALT', 'GGT', 'Total Bilirubin', 'Direct Bilirubin', 'ALP', 'Total Protein', 'Albumin', 'Globulin', 'A/G Ratio', 'Amylase', 'Lipase', 'LDH', 'G6PD', 'HBsAg', 'Anti-HBs'],
    status: 'Picked Up/Sent to Lab',
    date: 'Jul 10, 2026, 07:45 AM'
  },
  {
    id: 'CLN2023-20260710-EMP002-005',
    patient: { name: 'Kittisak Boonyarattana', id: 'ID792161301' },
    priority: 'STAT',
    doctor: '-',
    notes: 'Emergency',
    tests: ['Troponin I', 'CK-MB'],
    extraTests: 0,
    allTests: ['Troponin I', 'CK-MB'],
    status: 'Cancelled',
    date: 'Jul 10, 2026, 11:20 AM'
  }
];

export default function SampleCollectionQueue({ currentRole }: { currentRole?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | 'Custom'>('Today');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [appliedDateRange, setAppliedDateRange] = useState({ start: '', end: '' });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);
  
  const [selectedOrderForCollection, setSelectedOrderForCollection] = useState<any>(null);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState<string | null>(null);
  const [viewingPatientForPage, setViewingPatientForPage] = useState<any>(null);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<any>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (selectedOrderForDetail) {
    return (
      <LabOrderDetail 
        order={selectedOrderForDetail}
        onBack={() => setSelectedOrderForDetail(null)}
        onEdit={() => {}}
        onPrint={() => {}}
        currentRole={currentRole}
      />
    );
  }

  if (viewingPatientForPage) {
    return (
      <PatientDetail 
        patient={viewingPatientForPage}
        onBack={() => setViewingPatientForPage(null)}
        onEdit={() => {}}
        currentRole={currentRole}
      />
    );
  }

  const filteredOrders = mockOrders.filter(order => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!order.id.toLowerCase().includes(q) && !order.patient.name.toLowerCase().includes(q)) return false;
    }
    
    if (priorityFilter !== 'All' && order.priority !== priorityFilter) return false;
    
    if (dateFilter === 'Today') {
      const today = new Date();
      const orderDate = new Date(order.date);
      if (today.toDateString() !== orderDate.toDateString()) return false;
    } else if (dateFilter === 'Custom' && appliedDateRange.start && appliedDateRange.end) {
       const start = new Date(appliedDateRange.start);
       const end = new Date(appliedDateRange.end);
       end.setHours(23, 59, 59, 999);
       const orderDate = new Date(order.date);
       if (!isNaN(orderDate.getTime()) && (orderDate < start || orderDate > end)) return false;
    }
    return true;
  });

  if (dateFilter === 'Today') {
    filteredOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return (
    <div className="queue-container" onClick={() => setActiveFilterDropdown(null)}>
      <h1 className="page-title">Sample Collection Queue</h1>
      
      <div className="queue-summary">
        <div className="queue-summary-card">
          <div className="queue-summary-icon" style={{ backgroundColor: 'rgba(203, 160, 40, 0.1)', color: 'var(--primary)' }}>
            <ClipboardList size={20} />
          </div>
          <div className="queue-summary-content">
            <span className="queue-summary-label">Total Orders</span>
            <span className="queue-summary-value text-primary">{filteredOrders.length}</span>
          </div>
        </div>
        <div className="queue-summary-card">
          <div className="queue-summary-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            <Clock size={20} />
          </div>
          <div className="queue-summary-content">
            <span className="queue-summary-label">Pending Collection</span>
            <span className="queue-summary-value text-warning">{filteredOrders.filter(o => o.status === 'Pending Collection').length}</span>
          </div>
        </div>
        <div className="queue-summary-card">
          <div className="queue-summary-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
            <BriefcaseMedical size={20} />
          </div>
          <div className="queue-summary-content">
            <span className="queue-summary-label">In Progress</span>
            <span className="queue-summary-value text-info">{filteredOrders.filter(o => ['Ready for Pickup', 'Picked Up/Sent to Lab'].includes(o.status)).length}</span>
          </div>
        </div>
        <div className="queue-summary-card">
          <div className="queue-summary-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
            <Flag size={20} />
          </div>
          <div className="queue-summary-content">
            <span className="queue-summary-label">STAT Orders</span>
            <span className="queue-summary-value text-danger">{filteredOrders.filter(o => o.priority === 'STAT').length}</span>
          </div>
        </div>
      </div>

      <div className="queue-controls">
        <div className="queue-search">
          <Search size={16} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search patients, appointments, labs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filters-right">
          <div className="date-segmented-control">
            <button 
              type="button"
              className={dateFilter === 'All' ? 'active' : ''}
              onClick={() => { setDateFilter('All'); setAppliedDateRange({ start: '', end: '' }); }}
            >All</button>
            <button 
              type="button"
              className={dateFilter === 'Today' ? 'active' : ''}
              onClick={() => { setDateFilter('Today'); setAppliedDateRange({ start: '', end: '' }); }}
            >Today</button>
          </div>

          <div className="filter-dropdown-container date-filter-container">
            <button 
              className={`dropdown-trigger ${dateFilter === 'Custom' ? 'active' : ''}`} 
              style={{ minWidth: '160px', justifyContent: 'space-between', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'white', display: 'flex', alignItems: 'center' }}
              onClick={(e) => { e.stopPropagation(); setActiveFilterDropdown(activeFilterDropdown === 'date' ? null : 'date'); }}
            >
              <span className="text-muted" style={{ fontSize: '13px' }}>
                {appliedDateRange.start && appliedDateRange.end ? `${appliedDateRange.start} ~ ${appliedDateRange.end}` : 'Date range'}
              </span>
              <Calendar size={14} className="text-muted" />
            </button>
            {activeFilterDropdown === 'date' && (
              <div className="filter-dropdown-menu date-range-menu" onClick={e => e.stopPropagation()}>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="filter-label" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Priority:</span>
            <select 
              className="filter-select"
              style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '13px' }}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="STAT">STAT</option>
              <option value="Urgent">Urgent</option>
              <option value="Routine">Routine</option>
            </select>
          </div>
          <button 
            className="btn-reset" 
            onClick={() => {
              setDateFilter('Today');
              setDateRange({ start: '', end: '' });
              setAppliedDateRange({ start: '', end: '' });
              setSearchQuery('');
              setPriorityFilter('All');
            }}
          >Reset</button>
        </div>
      </div>

      <div className="queue-table-container" ref={dropdownRef}>
        <table className="queue-data-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>PATIENT</th>
              <th>TESTS</th>
              <th>STATUS</th>
              <th>PRIORITY</th>
              <th>ASSIGNED DOCTOR</th>
              <th>CREATE DATE</th>
              <th className="text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr 
                key={order.id} 
                onClick={() => setSelectedOrderForDetail(order)}
                style={{ cursor: 'pointer' }}
                className="clickable-row"
              >
                <td className="col-order-id">
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{order.id}</span>
                </td>
                <td className="col-patient">
                  <div className="patient-name">{order.patient.name}</div>
                </td>
                
                <td className="col-tests">
                  <div className="test-chips">
                    {order.tests.map(t => <span key={t} className="test-chip">{t}</span>)}
                    {order.extraTests > 0 && (
                      <div className="test-tooltip-wrapper">
                        <span className="test-chip test-chip-more">+{order.extraTests}</span>
                        <div className="test-tooltip">
                          <div className="test-tooltip-header">All Tests ({order.allTests.length})</div>
                          <div className="test-tooltip-body">
                            {order.allTests.map(t => <span key={t} className="test-chip">{t}</span>)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                
                <td className="col-status">
                  <span className={`status-pill outline status-${order.status.toLowerCase().replace(/[\s/]+/g, '-')}`}>
                    {order.status}
                  </span>
                </td>
                
                <td className="col-priority">
                  <span className={`priority-text priority-${order.priority.toLowerCase()}`}>
                    <span className="priority-dot">•</span> {order.priority}
                  </span>
                </td>
                
                <td className="col-doctor">
                  {order.doctor}
                </td>
                
                <td className="col-date">
                  <div className="date-wrapper">
                    <Clock size={14} className="text-muted" />
                    {order.date}
                  </div>
                </td>
                
                <td className="col-actions" onClick={(e) => e.stopPropagation()}>
                  <div className="order-actions">
                    <button 
                      className="btn-icon-square"
                      onClick={() => setSelectedOrderForPrint(order.id)}
                      title="Print"
                    >
                      <Printer size={16} />
                    </button>
                    
                    <div style={{ position: 'relative' }}>
                      <button 
                        className="btn-icon-square"
                        onClick={() => setActiveDropdown(activeDropdown === order.id ? null : order.id)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {activeDropdown === order.id && (
                        <div className="action-dropdown">
                          <button 
                            className="action-dropdown-item"
                            onClick={() => {
                              setActiveDropdown(null);
                              setSelectedOrderForCollection(order);
                            }}
                          >
                            <Droplet size={14} />
                            Collect Sample
                          </button>
                          <button 
                            className="action-dropdown-item"
                            onClick={() => {
                              setActiveDropdown(null);
                              const fullPatient = initialMockPatients.find(p => p.name === order.patient.name) || {
                                id: 'MRN000',
                                name: order.patient.name,
                                idNumber: order.patient.id,
                                gender: 'Unknown',
                                age: 'Unknown',
                                dob: 'Unknown',
                                contact: 'Unknown',
                                allergy: false,
                                insurance: 'Unknown',
                                lastVisit: 'Unknown',
                                createdAt: new Date().toISOString().split('T')[0],
                                consentStatus: 'Not Linked',
                                consentDetail: 'None',
                                identityVerification: 'Unverified',
                                registrationSource: 'Clinic',
                                documentType: null,
                                verifiedBy: null,
                                verifiedAt: null,
                                verificationMethod: null,
                                verifiedClinic: null
                              };
                              setViewingPatientForPage(fullPatient);
                            }}
                          >
                            <Eye size={14} />
                            View patient
                          </button>
                          <button 
                            className="action-dropdown-item"
                            onClick={() => {
                              setActiveDropdown(null);
                              setSelectedOrderForDetail(order);
                            }}
                          >
                            <FileText size={14} />
                            View Lab order detail
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrderForCollection && (
        <CollectSampleModal
          order={selectedOrderForCollection}
          onClose={() => setSelectedOrderForCollection(null)}
          onPrintBarcode={() => {
            setSelectedOrderForPrint(selectedOrderForCollection.id);
            setSelectedOrderForCollection(null);
          }}
          onComplete={() => {
            // handle complete logic
            setSelectedOrderForCollection(null);
          }}
        />
      )}

      {selectedOrderForPrint && (
        <PrintBarcodeModal
          orderId={selectedOrderForPrint}
          onClose={() => setSelectedOrderForPrint(null)}
          onPrint={() => {
            // handle print logic
            setSelectedOrderForPrint(null);
          }}
        />
      )}

    </div>
  );
}
