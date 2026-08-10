import { useState } from 'react';
import { Search, Calendar, Edit2, CheckCircle2, ChevronDown, ChevronUp, XCircle, Activity, Clock, ArrowLeft, Printer, User, ShieldAlert, FileText, AlertTriangle } from 'lucide-react';
import './LabOrderDetail.css';

interface LabOrderDetailProps {
  order: any;
  onBack: () => void;
  onEdit: () => void;
  onPrint: () => void;
  onCancel?: () => void;
  currentRole?: string;
}

export default function LabOrderDetail({ order, onBack, onEdit, onPrint, onCancel, currentRole }: LabOrderDetailProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'history'>('info');
  const [openCategories, setOpenCategories] = useState<string[]>(['Hematology', 'Hormones', 'Infectious Diseases']);

  if (!order) return null;

  const initials = order.patientName ? order.patientName.split(' ').map((n: string) => n[0]).join('') : 'SW';

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Pending Collection': return 'badge-pending';
      case 'Sent to Lab': return 'badge-sent';
      case 'Completed': return 'badge-completed';
      case 'Cancelled': return 'badge-cancelled';
      default: return 'badge-default';
    }
  };

  return (
    <div className="lab-order-detail-container">
      <div className="lab-order-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Lab Orders
        </button>
        <div className="lab-order-actions">
          {order.status === 'Pending Collection' && (
            <>
              <button 
                className="btn-secondary" 
                onClick={onEdit}
                disabled={currentRole === 'Technician'}
                style={currentRole === 'Technician' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
              >
                <Edit2 size={14} style={{ marginRight: '6px' }} /> Edit Order
              </button>
              {onCancel && (
                <button className="btn-secondary text-danger" onClick={onCancel} style={{ borderColor: '#fca5a5' }}>
                  <XCircle size={14} style={{ marginRight: '6px' }} /> Cancel
                </button>
              )}
            </>
          )}
          <button className="btn-secondary" onClick={onPrint}>
            <Printer size={14} style={{ marginRight: '6px' }} /> Print
          </button>
        </div>
      </div>

      <div className="lab-order-grid">
        {/* LEFT COLUMN: Sidebar Profile */}
        <div className="lab-sidebar-card">
          <div className="sidebar-section" style={{ paddingTop: 0 }}>
            <div className="patient-profile-header border-none pb-0" style={{ padding: 0 }}>
              <div className="profile-avatar avatar-yellow large" style={{ margin: '0 auto 12px' }}>{initials}</div>
              <div className="profile-info" style={{ textAlign: 'center' }}>
                <h3 className="profile-name" style={{ justifyContent: 'center' }}>{order.patientName || 'Somchai Wongsakul'}</h3>
                <span className="profile-meta" style={{ justifyContent: 'center' }}>ID: 123456789 • 34 years old • Female</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Order Status</h4>
            <div className="sidebar-item">
              <Activity size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className={`status-badge-outline ${getStatusBadgeClass(order.status)}`} style={{ alignSelf: 'flex-start', marginTop: '2px' }}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Order Details</h4>
            <div className="sidebar-item">
              <FileText size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Order ID</span>
                <span className="sidebar-item-value">{order.idNumber || 'LBO-001'}</span>
              </div>
            </div>
            <div className="sidebar-item">
              <AlertTriangle size={16} className="sidebar-icon" style={{ color: order.priority === 'Urgent' ? '#ef4444' : 'var(--primary)' }} />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Priority</span>
                <span className="sidebar-item-value">{order.priority || 'Routine'}</span>
              </div>
            </div>
            <div className="sidebar-item">
              <Clock size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Create Date</span>
                <span className="sidebar-item-value">{order.date || 'Jul 10, 2026'}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Assigned To</h4>
            <div className="sidebar-item">
              <User size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">{order.assignedTo || 'Dr. James Wilson'}</span>
                <span className="sidebar-item-value">Primary Care</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Main Content */}
        <div className="lab-main-content">
          <div className="lab-tabs">
            <button 
              className={`lab-tab-btn ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Information
            </button>
            <button 
              className={`lab-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History Log
            </button>
          </div>

          <div className="tab-panel">
            {activeTab === 'info' && (
              <div className="info-tab order-detail-info">
                
                <div className="detail-card">
                  <h4 className="card-title">Test Packages <span className="count-badge">7</span></h4>
                  <div className="selected-test-card">
                    <CheckCircle2 className="check-icon-filled" size={16} />
                    <div className="test-card-content">
                      <span className="test-name">Micronutrients Panel</span>
                      <span className="test-desc">Vitamin D, Vitamin B12, Folate, Iron, Ferritin, Zinc, Magnesium</span>
                    </div>
                  </div>
                </div>

                <div className="detail-card p-0">
                  <div className="card-header-padded">
                    <h4 className="card-title m-0">Individual Tests by Category <span className="count-badge">8</span></h4>
                  </div>
                  
                  <div className="category-accordion">
                    {/* Hematology */}
                    <div className="category-item">
                      <button className="category-header" onClick={() => toggleCategory('Hematology')}>
                        <span>Hematology</span>
                        {openCategories.includes('Hematology') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openCategories.includes('Hematology') && (
                        <div className="category-content grid-3">
                          <div className="selected-test-card compact">
                            <CheckCircle2 className="check-icon-filled" size={16} /> CBC
                          </div>
                          <div className="selected-test-card compact">
                            <CheckCircle2 className="check-icon-filled" size={16} /> Hemoglobin
                          </div>
                          <div className="selected-test-card compact">
                            <CheckCircle2 className="check-icon-filled" size={16} /> Platelet Count
                          </div>
                          <div className="selected-test-card compact">
                            <CheckCircle2 className="check-icon-filled" size={16} /> WBC Count
                          </div>
                          <div className="selected-test-card compact">
                            <CheckCircle2 className="check-icon-filled" size={16} /> RBC Count
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hormones */}
                    <div className="category-item">
                      <button className="category-header" onClick={() => toggleCategory('Hormones')}>
                        <span>Hormones</span>
                        {openCategories.includes('Hormones') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openCategories.includes('Hormones') && (
                        <div className="category-content grid-3">
                          <div className="selected-test-card compact">
                            <CheckCircle2 className="check-icon-filled" size={16} /> TSH
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Infectious Diseases */}
                    <div className="category-item border-none">
                      <button className="category-header" onClick={() => toggleCategory('Infectious Diseases')}>
                        <span>Infectious Diseases</span>
                        {openCategories.includes('Infectious Diseases') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openCategories.includes('Infectious Diseases') && (
                        <div className="category-content grid-3">
                          <div className="selected-test-card compact">
                            <CheckCircle2 className="check-icon-filled" size={16} /> COVID-19 PCR
                          </div>
                          <div className="selected-test-card compact">
                            <CheckCircle2 className="check-icon-filled" size={16} /> Influenza A/B
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="detail-card grey-bg">
                  <h4 className="card-title">Selected Tests <span className="count-badge">15</span></h4>
                  <div className="selected-tests-tags">
                    {['Vitamin D', 'Vitamin B12', 'Folate', 'Iron', 'Ferritin', 'Zinc', 'Magnesium', 'CBC', 'Hemoglobin', 'Platelet Count', 'WBC Count', 'RBC Count', 'TSH', 'COVID-19 PCR', 'Influenza A/B'].map(test => (
                      <div key={test} className="simple-tag" style={{
                        display: 'inline-block', padding: '4px 10px', backgroundColor: '#e5e7eb', borderRadius: '4px', fontSize: '12px', margin: '4px', color: '#374151'
                      }}>{test}</div>
                    ))}
                  </div>
                </div>

                <div className="detail-card">
                   <h4 className="card-title">Additional Info</h4>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group-plain mt-2">
                      <span className="plain-label" style={{ fontWeight: 500, fontSize: '13px', color: 'var(--text-muted)' }}>Clinical Notes</span>
                      <p className="plain-value" style={{ margin: '4px 0 0 0', fontSize: '14px', lineHeight: 1.5, color: 'var(--text-main)' }}>Patient presented with mild lower back pain radiating to the left leg. No neurological deficits noted. Recommended physical therapy 2x/week and follow-up in 4 weeks.</p>
                    </div>
                   </div>
                </div>

                <div className="flags-container mt-4">
                  <div className="selected-test-card">
                    <ShieldAlert className="check-icon-filled" size={16} />
                    <div className="test-card-content">
                      <span className="test-name">Confidential Test</span>
                      <span className="test-desc">Result visible only to the assigned doctor and patient. If Unassigned Doctor, only the patient.</span>
                    </div>
                  </div>
                  <div className="selected-test-card">
                    <CheckCircle2 className="check-icon-filled" size={16} />
                    <div className="test-card-content">
                      <span className="test-name">Patient consents to result/report by email</span>
                      <span className="test-desc">If unchecked, results will not be sent by email.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="history-tab">
                <div className="history-filters" style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <div className="search-filter history-search" style={{ flex: 1 }}>
                    <Search size={16} className="text-muted" />
                    <input type="text" placeholder="Search..." />
                  </div>
                  <div className="filter-dropdown date-filter">
                    <button className="dropdown-trigger" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: 'white', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className="text-muted" style={{ fontSize: '14px' }}>Date range</span>
                      <Calendar size={14} className="text-muted" />
                    </button>
                  </div>
                </div>
                <div className="history-content">
                  <div className="timeline">
                    
                    <div className="timeline-item active">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-main">
                          <span className="timeline-status">Status changed to Pending Collection</span>
                          <span className="timeline-desc">Lab order was approved and is now pending sample collection.</span>
                        </div>
                        <div className="timeline-meta">
                          <span className="timeline-time"><Clock size={12} /> Jul 10, 2026, 09:15 AM</span>
                          <span className="timeline-actor"><div className="timeline-avatar">S</div> System</span>
                        </div>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-main">
                          <span className="timeline-status">Lab Order Created</span>
                          <span className="timeline-desc">Lab order was created with 15 tests and Priority: Urgent.</span>
                        </div>
                        <div className="timeline-meta">
                          <span className="timeline-time"><Clock size={12} /> Jul 10, 2026, 09:10 AM</span>
                          <span className="timeline-actor"><div className="timeline-avatar">SC</div> Sarah Chen (Receptionist)</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
