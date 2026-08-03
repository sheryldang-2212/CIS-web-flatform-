import { useState, useRef, useEffect } from 'react';
import { ClipboardList, Clock, BriefcaseMedical, Flag, Search, MoreVertical, Eye, Printer, Droplet, FileText } from 'lucide-react';
import CollectSampleModal from './CollectSampleModal';
import PrintBarcodeModal from './PrintBarcodeModal';
import PatientDetailModal from './PatientDetailModal';
import LabOrderDetail from './LabOrderDetail';
import './SampleCollectionQueue.css';

const mockOrders = [
  {
    id: 'CLN2023-20260710-EMP001-001',
    patient: { name: 'Somchai Wongsakul', id: 'ID859736813' },
    priority: 'STAT',
    doctor: 'Dr. Narong Phanich',
    notes: 'Rule-out MI',
    tests: ['HbA1c', 'Fasting Glucose', 'Creatinine', 'BUN'],
    extraTests: 12,
    status: 'Pending Collection',
    date: 'Jul 10, 2026, 09:15 AM'
  },
  {
    id: 'CLN2023-20260710-EMP002-002',
    patient: { name: 'Supaporn Rattanakul', id: 'ID638210322' },
    priority: 'Urgent',
    doctor: 'Dr. Preecha Suthiwong',
    notes: 'Severe migraine evaluation',
    tests: ['CBC', 'CD4', 'CRP', 'Ferritin'],
    extraTests: 0,
    status: 'Pending Collection',
    date: 'Jul 10, 2026, 10:30 AM'
  },
  {
    id: 'CLN2023-20260710-EMP002-003',
    patient: { name: 'Thanakorn Jitprasert', id: 'ID205900179' },
    priority: 'Routine',
    doctor: 'Dr. Apinya Chamroenuk',
    notes: 'Annual checkup routine',
    tests: ['TSH', 'Free T4', 'Free T3', 'Anti-TPO'],
    extraTests: 2,
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
    status: 'Cancelled',
    date: 'Jul 10, 2026, 11:20 AM'
  }
];

export default function SampleCollectionQueue() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [selectedOrderForCollection, setSelectedOrderForCollection] = useState<any>(null);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState<string | null>(null);
  const [selectedPatientForDetail, setSelectedPatientForDetail] = useState<any>(null);
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
      />
    );
  }

  return (
    <div className="queue-container">
      <h1 className="page-title">Sample Collection Queue</h1>
      
      <div className="queue-summary">
        <div className="queue-summary-card">
          <div className="queue-summary-icon" style={{ backgroundColor: 'rgba(203, 160, 40, 0.1)', color: 'var(--primary)' }}>
            <ClipboardList size={20} />
          </div>
          <div className="queue-summary-content">
            <span className="queue-summary-label">Total Orders</span>
            <span className="queue-summary-value text-primary">32</span>
          </div>
        </div>
        <div className="queue-summary-card">
          <div className="queue-summary-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            <Clock size={20} />
          </div>
          <div className="queue-summary-content">
            <span className="queue-summary-label">Pending Collection</span>
            <span className="queue-summary-value text-warning">6</span>
          </div>
        </div>
        <div className="queue-summary-card">
          <div className="queue-summary-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
            <BriefcaseMedical size={20} />
          </div>
          <div className="queue-summary-content">
            <span className="queue-summary-label">In Progress</span>
            <span className="queue-summary-value text-info">5</span>
          </div>
        </div>
        <div className="queue-summary-card">
          <div className="queue-summary-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
            <Flag size={20} />
          </div>
          <div className="queue-summary-content">
            <span className="queue-summary-label">STAT Orders</span>
            <span className="queue-summary-value text-danger">3</span>
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
        
        <div className="queue-filters">
          <span className="filter-label">Priority:</span>
          <select 
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="STAT">STAT</option>
            <option value="Urgent">Urgent</option>
            <option value="Routine">Routine</option>
          </select>
          <button className="btn-reset">Reset</button>
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
            {mockOrders.map(order => (
              <tr key={order.id}>
                <td className="col-order-id">
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{order.id}</span>
                </td>
                <td className="col-patient">
                  <div className="patient-name">{order.patient.name}</div>
                </td>
                
                <td className="col-tests">
                  <div className="test-chips">
                    {order.tests.map(t => <span key={t} className="test-chip">{t}</span>)}
                    {order.extraTests > 0 && <span className="test-chip test-chip-more">+{order.extraTests}</span>}
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
                
                <td className="col-actions">
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
                              setSelectedPatientForDetail({
                                name: order.patient.name,
                                idNumber: order.patient.id,
                                age: '38 years',
                                gender: 'Male',
                                dob: '14/03/1988',
                                contact: '082-614-7293\nnatthawut.s@gmail.com',
                                insurance: 'Thai Life\nTL-385190247'
                              });
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

      {selectedPatientForDetail && (
        <PatientDetailModal
          isOpen={true}
          onClose={() => setSelectedPatientForDetail(null)}
          patient={selectedPatientForDetail}
          onEdit={() => {}}
        />
      )}


    </div>
  );
}
