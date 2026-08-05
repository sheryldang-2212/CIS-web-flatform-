
import { Search, User, Phone, Mail, Calendar, Info, Clock } from 'lucide-react';
import './DoctorPatients.css';

export default function DoctorPatients() {
  return (
    <div className="doctor-patients">
      <div className="dp-header">
        <div>
          <h1>Patient Portal</h1>
          <p>Search and view patient information</p>
        </div>
        <div className="dp-total-badge">
          25 Patients
        </div>
      </div>

      <div className="dp-filters">
        <div className="dp-search">
          <Search size={16} className="dp-search-icon" />
          <input type="text" placeholder="Search by name, MRN, or email..." />
        </div>
        <select className="dp-select">
          <option>All Patients</option>
          <option>My Patients</option>
          <option>Recent</option>
        </select>
      </div>

      <div className="dp-list">
        {/* Patient 1 */}
        <div className="dp-card">
          <div className="dp-card-header">
            <div className="dp-patient-primary">
              <div className="dp-avatar">
                <User size={24} />
              </div>
              <div className="dp-name-group">
                <h3>John Smith</h3>
                <div className="dp-mrn">MRN: <span>MRN001</span> • Age: 41 • Male</div>
              </div>
            </div>
            <div className="dp-risk-badges">
              <span className="dp-badge medium-risk">Medium Risk</span>
              <span className="dp-badge">2 Pending Labs</span>
            </div>
          </div>
          
          <div className="dp-card-body">
            <div className="dp-info-group">
              <div className="dp-info-item">
                <Phone size={14} /> <span>+1 555 123 4567</span>
              </div>
              <div className="dp-info-item" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>LAST VISIT</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12}/> 8/3/2026</span>
                </div>
              </div>
            </div>
            <div className="dp-info-group">
              <div className="dp-info-item">
                <Mail size={14} /> <span>john.smith@email.com</span>
              </div>
              <div className="dp-info-item" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>ALLERGIES</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Info size={12}/> 1</span>
                </div>
              </div>
            </div>
            <div className="dp-info-group">
              <div className="dp-info-item">
                <Calendar size={14} /> <span>DOB: 3/15/1985</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '8px' }}>
            <div className="dp-section-title">MEDICAL HISTORY</div>
            <div className="dp-tags">
              <span className="dp-tag">Hypertension</span>
              <span className="dp-tag">Type 2 Diabetes</span>
            </div>
          </div>

          <div className="dp-card-footer">
            <button className="dp-btn">
              <Info size={16} /> View Details
            </button>
            <span className="dp-id-badge">ID: xml_1</span>
          </div>
        </div>

        {/* Patient 2 */}
        <div className="dp-card">
          <div className="dp-card-header">
            <div className="dp-patient-primary">
              <div className="dp-avatar">
                <User size={24} />
              </div>
              <div className="dp-name-group">
                <h3>Emily Johnson</h3>
                <div className="dp-mrn">MRN: <span>MRN002</span> • Age: 34 • Female</div>
              </div>
            </div>
            <div className="dp-risk-badges">
              <span className="dp-badge low-risk">Low Risk</span>
              <span className="dp-badge">1 Pending Lab</span>
            </div>
          </div>
          
          <div className="dp-card-body">
            <div className="dp-info-group">
              <div className="dp-info-item">
                <Phone size={14} /> <span>+1 555 234 5678</span>
              </div>
              <div className="dp-info-item" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>LAST VISIT</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12}/> No visits</span>
                </div>
              </div>
            </div>
            <div className="dp-info-group">
              <div className="dp-info-item">
                <Mail size={14} /> <span>emily.johnson@email.com</span>
              </div>
              <div className="dp-info-item" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>ALLERGIES</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Info size={12}/> None</span>
                </div>
              </div>
            </div>
            <div className="dp-info-group">
              <div className="dp-info-item">
                <Calendar size={14} /> <span>DOB: 7/22/1992</span>
              </div>
            </div>
          </div>

          <div className="dp-card-footer">
            <button className="dp-btn">
              <Info size={16} /> View Details
            </button>
            <span className="dp-id-badge">ID: xml_2</span>
          </div>
        </div>
        
        {/* Patient 3 */}
        <div className="dp-card">
          <div className="dp-card-header">
            <div className="dp-patient-primary">
              <div className="dp-avatar">
                <User size={24} />
              </div>
              <div className="dp-name-group">
                <h3>Robert Davis</h3>
                <div className="dp-mrn">MRN: <span>MRN003</span> • Age: 50 • Male</div>
              </div>
            </div>
            <div className="dp-risk-badges">
              <span className="dp-badge medium-risk">Medium Risk</span>
              <span className="dp-badge">2 Pending Labs</span>
            </div>
          </div>
          
          <div className="dp-card-body">
            <div className="dp-info-group">
              <div className="dp-info-item">
                <Phone size={14} /> <span>+1 555 345 6789</span>
              </div>
              <div className="dp-info-item" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>LAST VISIT</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12}/> No visits</span>
                </div>
              </div>
            </div>
            <div className="dp-info-group">
              <div className="dp-info-item">
                <Mail size={14} /> <span>robert.davis@email.com</span>
              </div>
              <div className="dp-info-item" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>ALLERGIES</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Info size={12}/> 1</span>
                </div>
              </div>
            </div>
            <div className="dp-info-group">
              <div className="dp-info-item">
                <Calendar size={14} /> <span>DOB: 11/8/1975</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '8px' }}>
            <div className="dp-section-title">MEDICAL HISTORY</div>
            <div className="dp-tags">
              <span className="dp-tag">Hyperlipidemia</span>
            </div>
          </div>

          <div className="dp-card-footer">
            <button className="dp-btn">
              <Info size={16} /> View Details
            </button>
            <span className="dp-id-badge">ID: xml_3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
