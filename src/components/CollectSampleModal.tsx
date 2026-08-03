import { useState } from 'react';
import { X, Copy, Printer, Check, AlertCircle } from 'lucide-react';
import './CollectSampleModal.css';

interface CollectSampleModalProps {
  order: any;
  onClose: () => void;
  onPrintBarcode: () => void;
  onComplete: () => void;
}

export default function CollectSampleModal({ order, onClose, onPrintBarcode, onComplete }: CollectSampleModalProps) {
  const [notes, setNotes] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(order.id);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content collect-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Collect Sample</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="modal-body">
          <div className="collect-grid">
            {/* Left Column: Patient & Order Info */}
            <div className="collect-sidebar">
              <div className="collect-section">
                <h3 className="section-label">Patient Information</h3>
                <div className="patient-summary">
                  <div className="ps-avatar">{order.patientName ? order.patientName.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'UK'}</div>
                  <div className="ps-details">
                    <div className="ps-name">{order.patientName || 'Unknown Patient'}</div>
                    <div className="ps-meta">DOB: 12 Oct 1985 (38y) • Male</div>
                    <div className="ps-meta">MRN: {order.idNumber || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="collect-section" style={{ marginTop: '24px' }}>
                <h3 className="section-label">Order Details</h3>
                <div className="info-row">
                  <span className="info-label">Order ID:</span>
                  <div className="info-value input-with-icon" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: '#f8fafc', padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }} onClick={handleCopy}>
                    <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>{order.id}</span>
                    <Copy size={12} className="text-muted" />
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-label">Doctor:</span>
                  <span className="info-value">{order.assignedDoctor || 'Unassigned'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Priority:</span>
                  <span className={`info-value badge-${order.priority?.toLowerCase() || 'routine'}`}>{order.priority || 'Routine'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Collection Form */}
            <div className="collect-main">
              <div className="collect-section">
                <h3 className="section-label">Collection Details</h3>
                <div className="form-group">
                  <label>Collected By</label>
                  <select className="form-select">
                    <option>Sarah Chen (Current User)</option>
                    <option>Preecha Suthiwong</option>
                  </select>
                </div>
              </div>

              <div className="collect-section">
                <div className="tests-to-collect">
                  <div className="tests-to-collect-title" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Required Samples
                      <AlertCircle size={14} className="text-warning" />
                    </div>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> Select All
                    </label>
                  </div>
                  
                  <div className="sample-tube-list">
                    <div className="sample-tube">
                      <div className="tube-cap" style={{ backgroundColor: '#dc2626' }}></div> {/* Red Top */}
                      <div className="tube-info">
                        <div className="tube-name">Serum (SST) - 5mL</div>
                        <div className="tube-tests">Tests: BUN, Creatinine</div>
                      </div>
                      <div className="tube-checkbox"><input type="checkbox" defaultChecked /></div>
                    </div>
                    
                    <div className="sample-tube">
                      <div className="tube-cap" style={{ backgroundColor: '#9333ea' }}></div> {/* Purple Top */}
                      <div className="tube-info">
                        <div className="tube-name">EDTA - 3mL</div>
                        <div className="tube-tests">Tests: HbA1c</div>
                      </div>
                      <div className="tube-checkbox"><input type="checkbox" defaultChecked /></div>
                    </div>

                    <div className="sample-tube">
                      <div className="tube-cap" style={{ backgroundColor: '#4b5563' }}></div> {/* Grey Top */}
                      <div className="tube-info">
                        <div className="tube-name">Fluoride Oxalate - 2mL</div>
                        <div className="tube-tests">Tests: Fasting Glucose</div>
                      </div>
                      <div className="tube-checkbox"><input type="checkbox" defaultChecked /></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Collection Notes</label>
                <textarea 
                  rows={2} 
                  placeholder="e.g., Difficult draw, patient fasting verified..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <div className="footer-left">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
          </div>
          <div className="footer-right">
            <button className="btn-print" onClick={onPrintBarcode}>
              <Printer size={16} />
              Print Barcode
            </button>
            <button className="btn-complete" onClick={onComplete}>
              <Check size={16} />
              Complete Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
