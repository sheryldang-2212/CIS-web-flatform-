import { useState } from 'react';
import { AlertTriangle, Link, Users, Edit2, Search, Filter } from 'lucide-react';
import './PossibleDuplicates.css';

const DUPLICATE_PAIRS = [
  {
    id: 'dup-1',
    matchConfidence: '95%',
    matchReason: 'Same National ID and Date of Birth',
    status: 'Pending Review',
    imported: {
      name: 'Kitti Chai',
      idNumber: '11223*****',
      dob: '1990-02-14',
      phone: '0812345678',
      clinic: 'Riverside Medical Center'
    },
    existing: {
      name: 'Kittisak Chaidee',
      idNumber: '11223*****',
      dob: '1990-02-14',
      phone: '0812345678',
      clinic: 'Riverside Medical Center'
    }
  },
  {
    id: 'dup-2',
    matchConfidence: '80%',
    matchReason: 'Same Name and Phone Number',
    status: 'Pending Review',
    imported: {
      name: 'Suda Rakdee',
      idNumber: '11002*****',
      dob: '1975-01-10',
      phone: '0811112222',
      clinic: 'Downtown Clinic'
    },
    existing: {
      name: 'Suda Rakdee',
      idNumber: '22998*****',
      dob: '1975-01-11',
      phone: '0811112222',
      clinic: 'Downtown Clinic'
    }
  }
];

export default function PossibleDuplicates() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPair, setSelectedPair] = useState<any>(null);
  const [linkReason, setLinkReason] = useState('');

  const handleLinkClick = (pair: any) => {
    setSelectedPair(pair);
    setShowConfirmModal(true);
  };

  const confirmLink = () => {
    // In a real app, this would dispatch an API call
    alert(`Linked successfully! Reason: ${linkReason}`);
    setShowConfirmModal(false);
    setSelectedPair(null);
    setLinkReason('');
  };

  return (
    <div className="possible-duplicates-container" style={{ paddingTop: '12px' }}>
      <div className="filters-bar mb-6">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search by name or ID..." className="search-input" />
        </div>
        
        <div className="filter-group">
          <select className="filter-select">
            <option>All Clinics</option>
            <option>Downtown Clinic</option>
            <option>Riverside Medical Center</option>
          </select>
          <select className="filter-select">
            <option>Status: Pending Review</option>
            <option>All Statuses</option>
          </select>
          <button className="btn-icon">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="duplicates-list">
        {DUPLICATE_PAIRS.map(pair => (
          <div key={pair.id} className="duplicate-card">
            <div className="duplicate-card-header">
              <div className="match-info">
                <span className="match-confidence">Match Confidence: {pair.matchConfidence}</span>
                <span className="match-reason">Reason: {pair.matchReason}</span>
              </div>
              <span className="status-badge pending">{pair.status}</span>
            </div>
            
            <div className="duplicate-comparison">
              <div className="comparison-side imported-side">
                <div className="side-header">
                  <span className="side-badge new">Imported Record</span>
                </div>
                <div className="patient-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name</span>
                    <span className="detail-value">{pair.imported.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">National ID / Passport</span>
                    <span className="detail-value">{pair.imported.idNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date of Birth</span>
                    <span className="detail-value">{pair.imported.dob}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone Number</span>
                    <span className="detail-value">{pair.imported.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Clinic</span>
                    <span className="detail-value">{pair.imported.clinic}</span>
                  </div>
                </div>
              </div>

              <div className="comparison-divider">
                <div className="divider-icon">
                  <AlertTriangle size={16} />
                </div>
              </div>

              <div className="comparison-side existing-side">
                <div className="side-header">
                  <span className="side-badge existing">Potential Existing Patient</span>
                </div>
                <div className="patient-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name</span>
                    <span className="detail-value">{pair.existing.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">National ID / Passport</span>
                    <span className="detail-value">{pair.existing.idNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date of Birth</span>
                    <span className="detail-value">{pair.existing.dob}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone Number</span>
                    <span className="detail-value">{pair.existing.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Clinic</span>
                    <span className="detail-value">{pair.existing.clinic}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="duplicate-card-footer">
              <button className="btn-outline">
                <Users size={16} />
                Mark as Different Patients
              </button>
              <button className="btn-outline text-warning" style={{ borderColor: '#fcd34d' }}>
                <Edit2 size={16} />
                Send for Manual Review
              </button>
              <button className="btn-primary" onClick={() => handleLinkClick(pair)}>
                <Link size={16} />
                Link to Existing Patient
              </button>
            </div>
          </div>
        ))}
      </div>

      {showConfirmModal && selectedPair && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h2>Confirm Link Patients</h2>
              <button className="btn-icon" onClick={() => setShowConfirmModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="warning-alert mb-4">
                <AlertTriangle size={20} />
                <div>
                  <strong>Warning</strong>
                  <p>This action will permanently link the imported record to the existing patient. The imported demographic data will NOT overwrite the existing data automatically.</p>
                </div>
              </div>

              <div className="link-summary-grid">
                <div className="summary-box">
                  <div className="summary-title">Imported Record</div>
                  <div className="summary-name">{selectedPair.imported.name}</div>
                  <div className="summary-id">ID: {selectedPair.imported.idNumber}</div>
                </div>
                <div className="summary-arrow">→</div>
                <div className="summary-box">
                  <div className="summary-title">Existing Patient</div>
                  <div className="summary-name">{selectedPair.existing.name}</div>
                  <div className="summary-id">ID: {selectedPair.existing.idNumber}</div>
                </div>
              </div>

              <div className="form-group mt-4">
                <label className="form-label">Reason for linking <span className="text-error">*</span></label>
                <textarea 
                  className="form-input" 
                  rows={3} 
                  placeholder="Enter reason for audit log (e.g., 'Verified same identity via phone call')"
                  value={linkReason}
                  onChange={(e) => setLinkReason(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button 
                className="btn-primary" 
                onClick={confirmLink}
                disabled={!linkReason.trim()}
              >
                Confirm Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
