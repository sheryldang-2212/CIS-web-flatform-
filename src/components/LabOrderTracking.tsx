import React, { useState, useEffect } from 'react';
import { Printer, Undo2, CheckCircle, Eye, Search, Copy, MoreVertical, RefreshCw, Calendar } from 'lucide-react';
import LabResultReviewModal from './LabResultReviewModal';
import './LabOrderTracking.css';

// Mock data encompassing all tabs and statuses
const mockOrdersData = [
  { 
    id: 'LAB-001', 
    patientName: 'Sophia Bailey', 
    patientId: 'ID334455668', 
    tests: ['CBC', 'Ferritin'], 
    collectedAt: 'Jul 30, 07:43', 
    lastUpdated: 'Jul 30, 07:43', 
    priority: 'Routine', 
    status: 'Ready for Pickup', 
    tab: 'Awaiting Pickup' 
  },
  { 
    id: 'LAB-002', 
    patientName: 'Emily Johnson', 
    patientId: 'ID1234567890', 
    tests: ['Fasting Glucose', 'HbA1c', 'Lipid Panel', 'TSH'], 
    collectedAt: 'Jul 30, 06:43', 
    lastUpdated: 'Jul 30, 06:43', 
    priority: 'Urgent', 
    status: 'Ready for Pickup', 
    tab: 'Awaiting Pickup' 
  },
  { 
    id: 'LAB-003', 
    patientName: 'John Smith', 
    patientId: 'ID123456789', 
    tests: ['CBC', 'Lipid Panel', 'TSH'], 
    collectedAt: 'Jul 29, 03:43', 
    lastUpdated: 'Jul 29, 13:43', 
    priority: 'Routine', 
    status: 'Picked Up', 
    tab: 'In Progress' 
  },
  { 
    id: 'LAB-004', 
    patientName: 'Sarah Miller', 
    patientId: 'ID678901234', 
    tests: ['ALT', 'AST'], 
    collectedAt: 'Jul 29, 05:43', 
    lastUpdated: 'Jul 29, 15:43', 
    priority: 'Routine', 
    status: 'Sent to Lab', 
    tab: 'In Progress' 
  },
  { 
    id: 'LAB-005', 
    patientName: 'Robert Davis', 
    patientId: 'ID345678901', 
    tests: ['CRP', 'ESR'], 
    collectedAt: 'Jul 29, 01:43', 
    lastUpdated: 'Jul 29, 21:43', 
    priority: 'Routine', 
    status: 'Received by Lab', 
    tab: 'In Progress' 
  },
  { 
    id: 'LAB-006', 
    patientName: 'Jennifer Garcia', 
    patientId: 'ID690123456', 
    tests: ['CBC', 'Troponin'], 
    collectedAt: 'Jul 29, 13:43', 
    lastUpdated: 'Jul 30, 03:43', 
    priority: 'STAT', 
    status: 'In Analysis', 
    tab: 'In Progress' 
  },
  { 
    id: 'LAB-007', 
    patientName: 'Emily Johnson', 
    patientId: 'MRN002', 
    tests: ['Complete Metabolic Panel', 'TSH', 'Vitamin D'], 
    collectedAt: 'Jan 16, 2026', 
    lastUpdated: 'Jan 16, 2026', 
    priority: 'Routine', 
    status: 'Result Available', 
    tab: 'Result & Review' 
  },
  { 
    id: 'LAB-008', 
    patientName: 'David Wilson', 
    patientId: 'MRN005', 
    tests: ['Total Cholesterol', 'LDL', 'HDL', 'Triglycerides'], 
    collectedAt: 'Jul 30, 2026', 
    lastUpdated: 'Jul 30, 2026', 
    priority: 'Routine', 
    status: 'Doctor Review Pending', 
    tab: 'Result & Review' 
  },
  { 
    id: 'LAB-009', 
    patientName: 'Michael Thompson', 
    patientId: 'MRN007', 
    tests: ['Uric Acid', 'Creatinine'], 
    collectedAt: 'Jul 29, 2026', 
    lastUpdated: 'Jul 29, 2026', 
    priority: 'STAT', 
    status: 'Doctor Review Pending', 
    tab: 'Result & Review' 
  },
  { 
    id: 'LAB-010', 
    patientName: 'William Turner', 
    patientId: 'MRN013', 
    tests: ['CBC', 'Ferritin', 'Vitamin B12'], 
    collectedAt: 'Jul 29, 2026', 
    lastUpdated: 'Jul 29, 2026', 
    priority: 'Routine', 
    status: 'Returned', 
    tab: 'Result & Review' 
  },
  { 
    id: 'LAB-011', 
    patientName: 'Olivia Taylor', 
    patientId: 'MRN020', 
    tests: ['Vitamin D', 'Calcium'], 
    collectedAt: 'Jun 10, 2026', 
    lastUpdated: 'Jun 12, 2026', 
    priority: 'Routine', 
    status: 'Approved', 
    tab: 'Closed' 
  },
  { 
    id: 'LAB-012', 
    patientName: 'James Anderson', 
    patientId: 'MRN021', 
    tests: ['Hepatitis Panel'], 
    collectedAt: 'Jun 15, 2026', 
    lastUpdated: 'Jun 18, 2026', 
    priority: 'Routine', 
    status: 'Released', 
    tab: 'Closed' 
  },
];

export default function LabOrderTracking() {
  const [activeTab, setActiveTab] = useState('Awaiting Pickup');
  const [selectedResultToReview, setSelectedResultToReview] = useState<any>(null);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | 'Custom'>('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [appliedDateRange, setAppliedDateRange] = useState({ start: '', end: '' });
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);

  // Orders State
  const [orders, setOrders] = useState(mockOrdersData);
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());
  
  // Action Dropdown State
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.lot-action-menu-container')) {
        setActiveActionMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    // Ideally a small toast here
  };

  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>, filteredOrders: any[]) => {
    if (e.target.checked) {
      setSelectedOrderIds(new Set(filteredOrders.map(o => o.id)));
    } else {
      setSelectedOrderIds(new Set());
    }
  };

  const handleToggleSelectOrder = (id: string) => {
    const newSelected = new Set(selectedOrderIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedOrderIds(newSelected);
  };
  
  const handleBatchMarkPickedUp = () => {
    setOrders(prev => prev.map(o => {
      if (selectedOrderIds.has(o.id)) {
        return { ...o, status: 'Picked Up', tab: 'In Progress' };
      }
      return o;
    }));
    setSelectedOrderIds(new Set());
  };

  const handleUndoCollection = (id: string) => {
    if (window.confirm('Are you sure you want to undo collection for this order?')) {
       // Mock action
       setOrders(prev => prev.filter(o => o.id !== id));
    }
    setActiveActionMenu(null);
  };

  const getStatusColorClass = (status: string) => {
    switch(status) {
      case 'Ready for Pickup': return 'status-gray';
      case 'Picked Up':
      case 'Sent to Lab':
      case 'Received by Lab':
      case 'In Analysis': return 'status-blue';
      case 'Result Available':
      case 'Doctor Review Pending': return 'status-orange';
      case 'Approved':
      case 'Released': return 'status-green';
      case 'Returned':
      case 'Cancelled':
      case 'Rejected': return 'status-red';
      default: return 'status-gray';
    }
  };

  const renderTableContent = () => {
    let filteredOrders = orders.filter(o => o.tab === activeTab);
    
    // Apply filters
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filteredOrders = filteredOrders.filter(o => 
        o.id.toLowerCase().includes(lowerQuery) || 
        o.patientName.toLowerCase().includes(lowerQuery) ||
        o.patientId.toLowerCase().includes(lowerQuery)
      );
    }
    if (priorityFilter !== 'All') {
      filteredOrders = filteredOrders.filter(o => o.priority === priorityFilter);
    }
    if (statusFilter !== 'All') {
      filteredOrders = filteredOrders.filter(o => o.status === statusFilter);
    }
    
    if (dateFilter === 'Today') {
       // Mock logic
    } else if (dateFilter === 'Custom' && appliedDateRange.start && appliedDateRange.end) {
       const start = new Date(appliedDateRange.start);
       const end = new Date(appliedDateRange.end);
       end.setHours(23, 59, 59, 999);
       filteredOrders = filteredOrders.filter(o => {
         const orderDate = new Date(o.collectedAt); // mock check
         return !isNaN(orderDate.getTime()) && orderDate >= start && orderDate <= end;
       });
    }

    const allSelected = filteredOrders.length > 0 && selectedOrderIds.size === filteredOrders.length;
    const isAwaitingPickup = activeTab === 'Awaiting Pickup';

    return (
      <div className="lot-table-wrapper">
        <table className="lot-table">
          <thead>
            <tr>
              {isAwaitingPickup && (
                <th style={{ width: '40px', paddingRight: '0' }}>
                  <input 
                    type="checkbox" 
                    className="lot-table-checkbox" 
                    checked={allSelected}
                    onChange={(e) => handleToggleSelectAll(e, filteredOrders)}
                  />
                </th>
              )}
              <th>Lab Order ID</th>
              <th>Patient</th>
              <th>Tests</th>
              <th>Collected At</th>
              <th>Last Updated</th>
              <th>Priority</th>
              <th>Status</th>
              <th style={{ textAlign: 'right', minWidth: '140px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={isAwaitingPickup ? 9 : 8} style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  No orders found.
                </td>
              </tr>
            ) : filteredOrders.map(order => (
              <tr key={order.id} className={selectedOrderIds.has(order.id) ? 'row-selected' : ''}>
                {isAwaitingPickup && (
                  <td style={{ paddingRight: '0' }}>
                    <input 
                      type="checkbox" 
                      className="lot-table-checkbox" 
                      checked={selectedOrderIds.has(order.id)}
                      onChange={() => handleToggleSelectOrder(order.id)}
                    />
                  </td>
                )}
                <td>
                  <div className="lot-id-cell">
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 500 }}>{order.id}</span>
                    <button className="btn-copy" onClick={() => handleCopyId(order.id)} title="Copy ID">
                      <Copy size={14} />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="lot-patient-cell">
                    <div className="lot-avatar">{order.patientName.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <span className="lot-patient-name">{order.patientName}</span>
                      <span className="lot-patient-id">ID: {order.patientId}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="lot-test-chips-container">
                    {order.tests.slice(0, 2).map((test, index) => (
                      <span key={index} className="lot-test-chip">{test}</span>
                    ))}
                    {order.tests.length > 2 && (
                      <span className="lot-test-chip lot-test-chip-more">+{order.tests.length - 2} more</span>
                    )}
                  </div>
                </td>
                <td><span style={{ color: '#4b5563' }}>{order.collectedAt}</span></td>
                <td><span style={{ color: '#6b7280' }}>{order.lastUpdated}</span></td>
                <td>
                  <span className={`lot-priority-badge lot-priority-${order.priority.toLowerCase()}`}>
                    {order.priority}
                  </span>
                </td>
                <td>
                  <span className={`lot-status-badge ${getStatusColorClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="lot-actions">
                    {order.status === 'Ready for Pickup' && (
                      <button 
                        className="btn-lot-primary"
                        onClick={() => {
                          setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'Picked Up', tab: 'In Progress' } : o));
                        }}
                      >
                        Pick
                      </button>
                    )}
                    {['Picked Up', 'Sent to Lab', 'Received by Lab', 'In Analysis'].includes(order.status) && (
                      <button className="btn-lot-secondary">View Order</button>
                    )}
                    {['Result Available', 'Doctor Review Pending', 'Approved', 'Released'].includes(order.status) && (
                      <button 
                        className="btn-lot-primary"
                        onClick={() => setSelectedResultToReview(order)}
                      >
                        View Result
                      </button>
                    )}
                    
                    <div className="lot-action-menu-container">
                      <button 
                        className="btn-icon-only" 
                        onClick={() => setActiveActionMenu(activeActionMenu === order.id ? null : order.id)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {activeActionMenu === order.id && (
                        <div className="lot-action-menu">
                          <button className="lot-action-item" onClick={() => setActiveActionMenu(null)}><Eye size={14} /> View Order</button>
                          <button className="lot-action-item" onClick={() => setActiveActionMenu(null)}><Printer size={14} /> Print Label</button>
                          {order.status === 'Ready for Pickup' && (
                            <button className="lot-action-item text-danger" onClick={() => handleUndoCollection(order.id)}>
                              <Undo2 size={14} /> Undo Collection
                            </button>
                          )}
                          {['Approved', 'Released'].includes(order.status) && (
                            <button className="lot-action-item" onClick={() => setActiveActionMenu(null)}><Printer size={14} /> Print/Export</button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="lot-pagination">
          <span className="lot-pagination-info">Showing 1–{Math.max(1, filteredOrders.length)} of {Math.max(1, filteredOrders.length)}</span>
          <div className="lot-pagination-controls">
             <button className="btn-page" disabled>&lt;</button>
             <button className="btn-page active">1</button>
             <button className="btn-page" disabled>&gt;</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="lot-container">
      <div className="lot-header">
        <div>
          <h1 className="lot-title">Laboratory / Lab Order Tracking</h1>
          <p className="lot-subtitle">Track orders after collection through laboratory processing and review.</p>
        </div>
        <div className="lot-header-actions">
          <span className="lot-last-updated">Last updated: 05 Aug 2026, 10:45 AM</span>
          <button className="btn-lot-refresh">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      <div className="lot-summary-cards">
        <div className="lot-summary-card" onClick={() => setActiveTab('Awaiting Pickup')}>
          <div className="lot-summary-content">
             <span className="lot-summary-title">Awaiting Pickup</span>
             <span className="lot-summary-value">{orders.filter(o => o.tab === 'Awaiting Pickup').length}</span>
          </div>
        </div>
        <div className="lot-summary-card" onClick={() => setActiveTab('In Progress')}>
          <div className="lot-summary-content">
             <span className="lot-summary-title">In Transit</span>
             <span className="lot-summary-value">{orders.filter(o => ['Picked Up', 'Sent to Lab'].includes(o.status)).length}</span>
          </div>
        </div>
        <div className="lot-summary-card" onClick={() => setActiveTab('In Progress')}>
          <div className="lot-summary-content">
             <span className="lot-summary-title">Lab Processing</span>
             <span className="lot-summary-value">{orders.filter(o => ['Received by Lab', 'In Analysis'].includes(o.status)).length}</span>
          </div>
        </div>
        <div className="lot-summary-card" onClick={() => setActiveTab('Result & Review')}>
          <div className="lot-summary-content">
             <span className="lot-summary-title">Pending Review</span>
             <span className="lot-summary-value">{orders.filter(o => o.status === 'Doctor Review Pending').length}</span>
          </div>
        </div>
      </div>

      <div className="lot-content-card">
        {selectedOrderIds.size > 0 && activeTab === 'Awaiting Pickup' && (
          <div className="lot-bulk-actions">
            <div className="lot-bulk-info">
              <CheckCircle size={16} /> {selectedOrderIds.size} orders selected
            </div>
            <div className="lot-bulk-buttons">
              <button className="btn-lot-primary" onClick={handleBatchMarkPickedUp}>Mark as Picked Up</button>
              <button className="btn-lot-secondary" onClick={() => setSelectedOrderIds(new Set())}>Clear Selection</button>
            </div>
          </div>
        )}

        <div className="lot-tabs-container">
          <div className="lot-tabs">
            <button 
              className={`lot-tab ${activeTab === 'Awaiting Pickup' ? 'active' : ''}`}
              onClick={() => { setActiveTab('Awaiting Pickup'); setSelectedOrderIds(new Set()); }}
            >
              Awaiting Pickup
            </button>
            <button 
              className={`lot-tab ${activeTab === 'In Progress' ? 'active' : ''}`}
              onClick={() => { setActiveTab('In Progress'); setSelectedOrderIds(new Set()); }}
            >
              In Progress
            </button>
            <button 
              className={`lot-tab ${activeTab === 'Result & Review' ? 'active' : ''}`}
              onClick={() => { setActiveTab('Result & Review'); setSelectedOrderIds(new Set()); }}
            >
              Result & Review
            </button>
            <button 
              className={`lot-tab ${activeTab === 'Closed' ? 'active' : ''}`}
              onClick={() => { setActiveTab('Closed'); setSelectedOrderIds(new Set()); }}
            >
              Closed
            </button>
          </div>
        </div>

        <div className="lot-filters-bar" onClick={() => setActiveFilterDropdown(null)}>
          <div className="lot-search">
            <Search size={16} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search Order ID, Patient Name or Patient ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="lot-filter-group">
            <div className="lot-filter-item">
              <span className="lot-filter-label">Status:</span>
              <select 
                className="lot-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                {activeTab === 'Awaiting Pickup' && <option value="Ready for Pickup">Ready for Pickup</option>}
                {activeTab === 'In Progress' && (
                  <>
                    <option value="Picked Up">Picked Up</option>
                    <option value="Sent to Lab">Sent to Lab</option>
                    <option value="Received by Lab">Received by Lab</option>
                    <option value="In Analysis">In Analysis</option>
                  </>
                )}
                {activeTab === 'Result & Review' && (
                  <>
                    <option value="Result Available">Result Available</option>
                    <option value="Doctor Review Pending">Doctor Review Pending</option>
                    <option value="Returned">Returned</option>
                  </>
                )}
                {activeTab === 'Closed' && (
                  <>
                    <option value="Approved">Approved</option>
                    <option value="Released">Released</option>
                  </>
                )}
              </select>
            </div>

            <div className="lot-filter-item">
              <span className="lot-filter-label">Priority:</span>
              <select 
                className="lot-filter-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="STAT">STAT</option>
                <option value="Urgent">Urgent</option>
                <option value="Routine">Routine</option>
              </select>
            </div>

            <div className="lot-filter-item">
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
            </div>

            <div className="lot-filter-item filter-dropdown-container date-filter-container">
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
            
            <button 
              className="btn-reset" 
              onClick={() => {
                setDateFilter('All');
                setDateRange({ start: '', end: '' });
                setAppliedDateRange({ start: '', end: '' });
                setSearchQuery('');
                setStatusFilter('All');
                setPriorityFilter('All');
              }}
            >Reset</button>
          </div>
        </div>

        {renderTableContent()}
      </div>

      {selectedResultToReview && (
        <LabResultReviewModal 
          result={selectedResultToReview}
          onClose={() => setSelectedResultToReview(null)}
        />
      )}
    </div>
  );
}
