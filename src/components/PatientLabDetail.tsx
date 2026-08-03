import { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Printer, Settings } from 'lucide-react';
import LabResultReviewModal from './LabResultReviewModal';
import './PatientLabDetail.css';

interface PatientLabDetailProps {
  onBack: () => void;
}

export default function PatientLabDetail({ onBack }: PatientLabDetailProps) {
  const [filter, setFilter] = useState<'All' | 'Abnormal'>('All');
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const mockResults = [
    { name: 'CBC, ESR, CRP, HbA1c, Alkaline Phosphatase', date: '10/06/2026', status: 'Pending review', flag: 'Abnormal' },
    { name: 'HbA1c, Fasting Glucose, Creatinine, Uric Acid, Triglycerides', date: '08/06/2026', status: 'Pending review', flag: 'Normal' },
    { name: 'Ferritin, Alkaline Phosphatase', date: '31/05/2026', status: 'Pending review', flag: 'Abnormal' },
    { name: 'TSH, Free T4, Free T3, Anti-TPO, Cortisol, Prolactin', date: '15/05/2026', status: 'Approved', flag: 'Abnormal' }
  ];

  const mockOrders = [
    { 
      tests: 'Glucose, HbA1c, Creatinine, BUN, Potassium', 
      status: 'Pending', 
      date: 'Jul 20, 2026, 10:30 AM',
      btn: 'Send to Lab'
    },
    { 
      tests: 'CBC, WBC Count, Hemoglobin, ESR, Platelet Count', 
      status: 'Sent to Lab', 
      date: 'Jul 20, 2026, 08:00 AM',
      btn: 'Track'
    },
    { 
      tests: 'ALT, AST, Bilirubin, Albumin, LDL', 
      status: 'Completed', 
      date: 'Jul 19, 2026, 09:45 AM',
      btn: 'View'
    },
    { 
      tests: 'TSH, Free T4, Free T3, Cortisol', 
      status: 'Completed', 
      date: 'Jul 15, 2026, 11:30 AM',
      btn: 'View'
    }
  ];

  const filteredResults = filter === 'All' 
    ? mockResults 
    : mockResults.filter(r => r.flag === 'Abnormal');

  return (
    <div className="patient-detail-container">
      <div className="back-btn-row">
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={16} />
          View Patient
        </button>
      </div>

      <div className="patient-header-card">
        <div className="patient-header-top">
          <div className="patient-avatar-lg">EJ</div>
          <div className="patient-identity">
            <h2>Emily Johnson</h2>
            <p>ID125566784 • 34 years old • Female</p>
          </div>
        </div>

        <div className="patient-contact-row">
          <div className="contact-item">
            <Phone size={14} />
            +1 555-0198
          </div>
          <div className="contact-item">
            <Mail size={14} />
            emily.johnson@email.com
          </div>
          <div className="contact-item">
            <MapPin size={14} />
            456 Oak Ave, City, State 12345
          </div>
        </div>

        <div className="patient-info-grid">
          <div className="info-block">
            <span className="info-label">Emergency Contact</span>
            <span className="info-value">Brother • Michael Johnson • +44 293-5238</span>
          </div>
          
          <div className="info-block">
            <span className="info-label">Insurance Provider</span>
            <span className="info-value">AIA Thailand</span>
          </div>

          <div className="info-block">
            <span className="info-label">Policy Number</span>
            <span className="info-value">AIA-492938176</span>
          </div>
        </div>

        <div className="patient-info-grid" style={{ marginTop: '24px' }}>
          <div className="info-block">
            <span className="info-label">Medical History</span>
            <div className="badge-list">
              <span className="info-badge">• Diabetes</span>
              <span className="info-badge">• Hypertension</span>
              <span className="info-badge">• Cardiovascular Disease</span>
            </div>
          </div>
          
          <div className="info-block">
            <span className="info-label">Allergies</span>
            <div className="badge-list">
              <span className="info-badge danger">• Drug Allergy</span>
              <span className="info-badge danger">• Food Allergy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h3 className="section-title">Lab Results <span>4</span></h3>
          <div className="section-actions">
            <div className="filter-group">
              <button 
                className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
                onClick={() => setFilter('All')}
              >All Results</button>
              <button 
                className={`filter-btn ${filter === 'Abnormal' ? 'active' : ''}`}
                onClick={() => setFilter('Abnormal')}
              >Abnormal Only</button>
            </div>
            <button className="btn-print-pdf">
              <Printer size={14} />
              Print PDF
            </button>
          </div>
        </div>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Flag</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((res, idx) => (
                <tr key={idx}>
                  <td>{res.name}</td>
                  <td>{res.date}</td>
                  <td>
                    <span className={`status-badge ${res.status === 'Approved' ? 'status-approved' : 'status-pending'}`}>
                      {res.status}
                    </span>
                  </td>
                  <td>
                    <span className={`flag-badge ${res.flag.toLowerCase()}`}>
                      <span style={{ fontSize: '18px', lineHeight: 1 }}>•</span> {res.flag}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="row-action-btn"
                      onClick={() => setSelectedResult(res)}
                    >
                      <Settings size={14} style={{ marginBottom: '-2px' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h3 className="section-title">Lab Orders <span>5</span></h3>
        </div>
        
        <div className="table-wrapper">
          <table>
            <tbody>
              {mockOrders.map((order, idx) => (
                <tr key={idx}>
                  <td style={{ width: '60%' }}>
                    <div style={{ fontWeight: 500, marginBottom: '4px' }}>{order.tests}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ordered • {order.date}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${
                      order.status === 'Completed' ? 'status-completed' : 
                      order.status === 'Sent to Lab' ? 'status-sent' : 'status-pending'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="row-action-btn">{order.btn}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedResult && (
        <LabResultReviewModal 
          result={selectedResult} 
          onClose={() => setSelectedResult(null)} 
        />
      )}
    </div>
  );
}
