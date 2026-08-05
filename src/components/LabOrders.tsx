import { useState } from 'react';
import { Search, ChevronDown, Plus, MoreVertical, Printer, Eye, Edit2, Copy, FilePlus2, ClipboardList, Clock, BriefcaseMedical, CheckCircle2, XCircle } from 'lucide-react';
import LabOrderFormModal from './LabOrderFormModal';
import LabOrderDetail from './LabOrderDetail';
import AddOnTestModal from './AddOnTestModal';
import PrintModal from './PrintModal';
import PatientFormModal from './PatientFormModal';
import ActionReasonModal from './ActionReasonModal';
import './LabOrders.css';

const initialMockLabOrders = [
  { id: 'ORD001', patientName: 'Somchai Wongsakul', idNumber: 'ORD-DWT-20260710-000001', priority: 'STAT', status: 'Pending Collection', assignedTo: 'Dr. Narong Phanich', date: 'Jul 10, 2026, 09:15 AM', tests: ['HbA1c', 'Fasting Glucose', 'Creatinine', 'BUN', 'Lipid Profile', 'CBC', 'TSH', 'Free T4', 'AST', 'ALT', 'ALP', 'Total Protein', 'Albumin', 'Globulin', 'Bilirubin Total', 'Uric Acid'] },
  { id: 'ORD002', patientName: 'Supaporn Rattanakul', idNumber: 'ORD-DWT-20260710-000002', priority: 'Urgent', status: 'Pending Collection', assignedTo: 'Dr. Preecha Suthiwong', date: 'Jul 10, 2026, 10:30 AM', tests: ['CBC', 'CD4', 'CRP', 'Ferritin'] },
  { id: 'ORD003', patientName: 'Thanakorn Jitprasert', idNumber: 'ORD-DWT-20260710-000003', priority: 'Routine', status: 'Ready for Pickup', assignedTo: 'Dr. Apinya Chamroenuk', date: 'Jul 10, 2026, 08:00 AM', tests: ['TSH', 'Free T4', 'Free T3', 'Anti-TPO', 'Thyroglobulin', 'Calcitonin'] },
  { id: 'ORD004', patientName: 'Pornpimon Srisawat', idNumber: 'ORD-DWT-20260710-000004', priority: 'Routine', status: 'Picked Up/Sent to Lab', assignedTo: 'Dr. Michel Kikuzaki', date: 'Jul 10, 2026, 07:45 AM', tests: ['AST', 'ALT', 'GGT', 'Total Bilirubin', 'Direct Bilirubin', 'ALP', 'Total Protein', 'Albumin', 'Globulin', 'A/G Ratio', 'Amylase', 'Lipase', 'LDH', 'G6PD', 'HBsAg', 'Anti-HBs'] },
  { id: 'ORD005', patientName: 'Kittisak Boonyarattana', idNumber: 'ORD-DWT-20260710-000005', priority: 'STAT', status: 'Cancelled', assignedTo: '-', date: 'Jul 10, 2026, 11:20 AM', tests: ['Troponin I', 'CK-MB'] },
];

export default function LabOrders() {
  const [orders, setOrders] = useState(initialMockLabOrders);
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);

  // Filter States
  const [timeFilter, setTimeFilter] = useState('Today');
  const [assignedFilter, setAssignedFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('Urgent');

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [duplicateOrder, setDuplicateOrder] = useState<any>(null);
  const [viewingOrder, setViewingOrder] = useState<any>(null);
  const [addonOrder, setAddonOrder] = useState<any>(null);
  const [printingOrder, setPrintingOrder] = useState<any>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [cancelOrder, setCancelOrder] = useState<any>(null);
  const [undoOrder, setUndoOrder] = useState<any>(null);

  const toggleActionDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
    setActiveFilterDropdown(null);
  };

  const toggleFilterDropdown = (filter: string) => {
    setActiveFilterDropdown(activeFilterDropdown === filter ? null : filter);
    setActiveDropdown(null);
  };

  // State Transition Handlers
  const handleUpdateStatus = (orderId: string, newStatus: string, _reason?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        // In a real app, reason would be appended to the history log here
        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  const handleCancelOrder = (reason: string) => {
    if (cancelOrder) {
      handleUpdateStatus(cancelOrder.id, 'Cancelled', reason);
      setCancelOrder(null);
    }
  };

  const handleUndoCollection = (reason: string) => {
    if (undoOrder) {
      handleUpdateStatus(undoOrder.id, 'Pending Collection', reason);
      setUndoOrder(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Pending Collection': return 'pending-collection';
      case 'Ready for Pickup': return 'ready-for-pickup';
      case 'Picked Up/Sent to Lab': return 'picked-up';
      case 'Cancelled': return 'cancelled';
      default: return '';
    }
  };

  if (viewingOrder) {
    return (
      <LabOrderDetail 
        order={viewingOrder}
        onBack={() => setViewingOrder(null)}
        onEdit={() => {
          setEditingOrder(viewingOrder);
          setViewingOrder(null);
        }}
        onPrint={() => {
          setPrintingOrder(viewingOrder);
          setViewingOrder(null);
        }}
        onCancel={() => {
          setCancelOrder(viewingOrder);
          setViewingOrder(null);
        }}
      />
    );
  }

  return (
    <div className="lab-orders-container" onClick={() => { setActiveDropdown(null); setActiveFilterDropdown(null); }}>
      <div className="patients-header">
        <h1 className="page-title mb-0">Lab Orders</h1>
        <button className="btn-primary" onClick={() => setIsCreateOpen(true)}>
          <Plus size={16} />
          Create Lab Order
        </button>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(203, 160, 40, 0.1)', color: 'var(--primary)' }}>
            <ClipboardList size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Today's Orders</span>
            <span className="card-value text-primary">{orders.length}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            <Clock size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Pending Collection</span>
            <span className="card-value text-warning">{orders.filter(o => o.status === 'Pending Collection').length}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
            <BriefcaseMedical size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Ready for Pickup</span>
            <span className="card-value text-info">{orders.filter(o => o.status === 'Ready for Pickup').length}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Sent to Lab</span>
            <span className="card-value text-success">{orders.filter(o => o.status === 'Picked Up/Sent to Lab').length}</span>
          </div>
        </div>
      </div>

      <div className="patients-card">
        <div className="filters-bar">
          <div className="search-filter">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search..." />
          </div>
          
          <div className="filters-right">
            <div className="toggle-group">
              <button 
                className={`toggle-btn ${timeFilter === 'All' ? 'active' : ''}`}
                onClick={() => setTimeFilter('All')}
              >All</button>
              <button 
                className={`toggle-btn ${timeFilter === 'Today' ? 'active' : ''}`}
                onClick={() => setTimeFilter('Today')}
              >Today</button>
            </div>
            
            <div className="filter-dropdown-container">
              <span className="filter-label">Assigned to:</span>
              <button className="dropdown-trigger" onClick={() => toggleFilterDropdown('assigned')}>
                {assignedFilter} <ChevronDown size={14} />
              </button>
              {activeFilterDropdown === 'assigned' && (
                <div className="filter-dropdown-menu">
                  {['All', 'Dr. Narong Phanich', 'Dr. Preecha Suthiwong', 'Dr. Apinya Chamroenuk', 'Dr. Michel Kikuzaki'].map(doc => (
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
                <div className="filter-dropdown-menu">
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
              setTimeFilter('Today');
              setAssignedFilter('All');
              setPriorityFilter('All');
            }}>Reset</button>
          </div>
        </div>

        <div className="modern-table-container">
          <table className="modern-data-table">
            <thead>
              <tr>
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
              {orders.map((order) => (
                <tr 
                  key={order.id} 
                  onClick={() => setViewingOrder(order)}
                  style={{ cursor: 'pointer' }}
                >
                  <td style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    {order.idNumber}
                  </td>
                  <td>
                    <div className="patient-cell-flex">
                      <div className="patient-avatar">
                        {order.patientName.split(' ').map((n: string) => n[0]).join('').substring(0,2)}
                      </div>
                      <div className="patient-name-table">{order.patientName}</div>
                    </div>
                  </td>
                  
                  <td className="tests-cell">
                    <div className="test-pills-container">
                      {order.tests.slice(0, 4).map((test: string, i: number) => (
                        <span key={i} className="test-pill">{test}</span>
                      ))}
                      {order.tests.length > 4 && (
                        <span className="test-pill" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
                          +{order.tests.length - 4}
                        </span>
                      )}
                    </div>
                    {/* Tooltip containing all tests */}
                    <div className="tests-tooltip">
                      <div className="tooltip-title">Selected Tests ({order.tests.length})</div>
                      <div className="tooltip-test-list">
                        {order.tests.map((test: string, i: number) => (
                          <span key={i} className="tooltip-test-item">{test}</span>
                        ))}
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className={`status-badge-outline ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  
                  <td>
                    <span className={`priority-badge ${order.priority.toLowerCase()}`}>
                      <span className="dot"></span> {order.priority}
                    </span>
                  </td>

                  <td>
                    <div className="assigned-table">{order.assignedTo}</div>
                  </td>
                  
                  <td>
                    <div className="date-table">
                      <Clock size={12} /> {order.date}
                    </div>
                  </td>

                  <td className="actions-cell">
                    <div className="table-actions-wrapper">
                      <button 
                        className="icon-btn-small border-btn" 
                        onClick={(e) => { e.stopPropagation(); setPrintingOrder(order); }} 
                        title="Print"
                      >
                        <Printer size={16} />
                      </button>
                      <button 
                        className="icon-btn-small border-btn" 
                        onClick={(e) => { e.stopPropagation(); toggleActionDropdown(order.id); }}
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {activeDropdown === order.id && (
                        <div className="action-dropdown lab-action-dropdown table-dropdown" onClick={(e) => e.stopPropagation()}>
                          {/* View Detail is always available */}
                          <button className="dropdown-item" onClick={() => { setViewingOrder(order); setActiveDropdown(null); }}>
                            <Eye size={14} /> View detail
                          </button>

                          {/* Pending Collection Actions (Disabled if not Pending Collection) */}
                          <button 
                            className={`dropdown-item ${order.status !== 'Pending Collection' ? 'disabled' : ''}`} 
                            style={order.status !== 'Pending Collection' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                            onClick={() => { 
                              if (order.status === 'Pending Collection') {
                                setEditingOrder(order); setActiveDropdown(null); 
                              }
                            }}
                            disabled={order.status !== 'Pending Collection'}
                          >
                            <Edit2 size={14} /> Edit order
                          </button>
                          <button 
                            className={`dropdown-item ${order.status !== 'Pending Collection' ? 'disabled' : ''}`}
                            style={order.status !== 'Pending Collection' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                            onClick={() => { 
                              if (order.status === 'Pending Collection') {
                                setCancelOrder(order); setActiveDropdown(null); 
                              }
                            }}
                            disabled={order.status !== 'Pending Collection'}
                          >
                            <XCircle size={14} className={order.status === 'Pending Collection' ? 'text-danger' : ''} /> 
                            <span className={order.status === 'Pending Collection' ? 'text-danger' : ''}>Cancel order</span>
                          </button>

                          {/* Generic Actions */}
                          {order.status !== 'Cancelled' && (
                            <button className="dropdown-item" onClick={() => { setAddonOrder(order); setActiveDropdown(null); }}>
                              <FilePlus2 size={14} /> Add-on Test to Existing Specimen
                            </button>
                          )}
                          <button className="dropdown-item" onClick={() => { setDuplicateOrder(order); setActiveDropdown(null); }}>
                            <Copy size={14} /> Duplicate order
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <LabOrderFormModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        mode="create" 
        onRegisterPatient={() => {
          setIsCreateOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <LabOrderFormModal 
        isOpen={!!editingOrder} 
        onClose={() => setEditingOrder(null)} 
        mode="edit" 
        initialData={editingOrder}
      />

      <LabOrderFormModal 
        isOpen={!!duplicateOrder} 
        onClose={() => setDuplicateOrder(null)} 
        mode="create" 
        initialData={duplicateOrder}
        onRegisterPatient={() => {
          setDuplicateOrder(null);
          setIsRegisterOpen(true);
        }}
      />



      <AddOnTestModal 
        isOpen={!!addonOrder} 
        onClose={() => setAddonOrder(null)} 
        order={addonOrder} 
      />

      <PrintModal 
        isOpen={!!printingOrder} 
        onClose={() => setPrintingOrder(null)} 
        order={printingOrder} 
      />

      <PatientFormModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        mode="create"
      />

      <ActionReasonModal
        isOpen={!!cancelOrder}
        onClose={() => setCancelOrder(null)}
        title="Cancel Lab Order"
        actionLabel="Cancel Order"
        isDestructive={true}
        onSubmit={handleCancelOrder}
      />

      <ActionReasonModal
        isOpen={!!undoOrder}
        onClose={() => setUndoOrder(null)}
        title="Undo Collection"
        actionLabel="Confirm Undo"
        isDestructive={false}
        onSubmit={handleUndoCollection}
      />
    </div>
  );
}
