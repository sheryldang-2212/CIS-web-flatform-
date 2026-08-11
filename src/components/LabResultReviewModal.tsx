import { useState } from 'react';
import { X, FileText, CheckCircle2, TrendingDown } from 'lucide-react';
import './LabResultReviewModal.css';

interface LabResultReviewModalProps {
  result: any;
  onClose: () => void;
}

export default function LabResultReviewModal({ result: _result, onClose }: LabResultReviewModalProps) {
  const [clinicalInterp, setClinicalInterp] = useState('');
  const [doctorComment, setDoctorComment] = useState('');

  const mockParameters = [
    { name: 'Glucose', result: '95', unit: 'mg/dL', ref: '70-100', flag: 'Normal', note: 'Within range' },
    { name: 'TSH', result: '2.1', unit: 'mIU/L', ref: '0.4-4.0', flag: 'Normal', note: 'Within range' },
    { name: 'Vitamin D', result: '28', unit: 'ng/mL', ref: '30-100', flag: 'Low', note: 'Outside reference range' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content review-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ padding: '24px', paddingBottom: '16px' }}>
          <div>
            <h2 className="modal-title">Lab Result Review</h2>
            <p className="modal-subtitle">Order-level review of laboratory results, comments, and approval.</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="modal-body">
          <div className="review-meta-section">
            <div className="review-meta-grid">
              <div className="review-meta-item">
                <span className="review-meta-label">Patient Name</span>
                <span className="review-meta-value">Emily Johnson</span>
              </div>
              <div className="review-meta-item">
                <span className="review-meta-label">Patient ID</span>
                <span className="review-meta-value">ID234567890</span>
              </div>
              <div className="review-meta-item">
                <span className="review-meta-label">Lab Order ID</span>
                <span className="review-meta-value">CLINIC01-20240116-EMP001-003</span>
              </div>
              <div className="review-meta-item">
                <span className="review-meta-label">Package / Tests</span>
                <span className="review-meta-value">3 tests</span>
              </div>
              <div className="review-meta-item">
                <span className="review-meta-label">Collection Date/Time</span>
                <span className="review-meta-value">Jan 16, 2024 07:00</span>
              </div>
              <div className="review-meta-item">
                <span className="review-meta-label">Result Date/Time</span>
                <span className="review-meta-value">Jan 16, 2024 07:00</span>
              </div>
              <div className="review-meta-item">
                <span className="review-meta-label">Assigned Doctor</span>
                <span className="review-meta-value">Dr. Dr. James Wilson</span>
              </div>
              <div className="review-meta-item">
                <span className="review-meta-label">Current Status</span>
                <div>
                  <span className="review-status-pill">Pending Review</span>
                </div>
              </div>
            </div>

            <div className="review-summary-cards">
              <div className="summary-card">
                <span className="summary-card-label">Total Tests</span>
                <span className="summary-card-value">3</span>
              </div>
              <div className="summary-card">
                <span className="summary-card-label">Normal</span>
                <span className="summary-card-value normal">2</span>
              </div>
              <div className="summary-card">
                <span className="summary-card-label">Abnormal / Flagged</span>
                <span className="summary-card-value abnormal">1</span>
              </div>
              <div className="summary-card">
                <span className="summary-card-label">Status</span>
                <div>
                  <span className="review-status-pill">Pending Review</span>
                </div>
              </div>
            </div>
          </div>

          <div className="review-key-findings">
            <div className="key-findings-label">Key Findings</div>
            <div className="key-findings-text">Vitamin D deficiency noted, other values within normal limits</div>
          </div>
          
          <div className="review-content">
            <div className="review-section-header">
              <h3 className="review-section-title">Lab Results</h3>
              <span className="review-section-count">3 parameters</span>
            </div>
            
            <div className="review-table-wrapper">
              <table className="review-table">
                <thead>
                  <tr>
                    <th>Test / Parameter</th>
                    <th>Result</th>
                    <th>Unit</th>
                    <th>Reference Range</th>
                    <th>Flag</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {mockParameters.map((param, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{param.name}</td>
                      <td style={{ fontWeight: 500, color: 'var(--text-main)' }}>{param.result}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{param.unit}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{param.ref}</td>
                      <td>
                        {param.flag === 'Normal' ? (
                          <span className="flag-badge normal"><CheckCircle2 size={12}/> Normal</span>
                        ) : (
                          <span className="flag-badge abnormal"><TrendingDown size={12}/> Low</span>
                        )}
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{param.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="review-comments-grid">
              <div className="comment-group">
                <label>Clinical Interpretation</label>
                <textarea 
                  rows={4} 
                  placeholder="Enter clinical interpretation here..."
                  value={clinicalInterp}
                  onChange={(e) => setClinicalInterp(e.target.value)}
                ></textarea>
              </div>
              <div className="comment-group">
                <label>Doctor Comment</label>
                <textarea 
                  rows={4} 
                  placeholder="Enter doctor comment or note here..."
                  value={doctorComment}
                  onChange={(e) => setDoctorComment(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="review-footer">
          <div className="footer-left">
            <button className="btn-review-secondary"><FileText size={16} /> View PDF</button>
          </div>
          <div className="footer-right">
            <button className="btn-review-close" onClick={onClose}>Cancel</button>
            <button className="btn-review-reject" onClick={onClose}>Reject</button>
            <button className="btn-review-approve" onClick={onClose}>Approve Result</button>
          </div>
        </div>
      </div>
    </div>
  );
}
