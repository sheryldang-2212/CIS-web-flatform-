import { useState } from 'react';
import { UploadCloud, Download, CheckCircle, AlertTriangle, XCircle, Copy, Search, ChevronDown, CheckCircle2 } from 'lucide-react';
import './BulkPatientUpload.css';

const MOCK_CLINICS = [
  'Downtown Clinic',
  'Uptown Hospital',
  'Riverside Medical Center'
];

const PREVIEW_DATA = [
  { row: 1, firstName: 'John', lastName: 'Doe', idNumber: '12345XXXXX', dob: '1980-05-15', phone: '0812345678', email: 'john@example.com', clinic: 'Downtown Clinic', validation: 'Valid' },
  { row: 2, firstName: 'Jane', lastName: 'Smith', idNumber: '98765XXXXX', dob: '1992-11-20', phone: '', email: 'jane.smith@email.com', clinic: 'Downtown Clinic', validation: 'Missing Required Data' },
  { row: 3, firstName: 'Somchai', lastName: 'Jaidee', idNumber: '31005XXXXX', dob: 'Invalid', phone: '0899999999', email: 'somchai@test.com', clinic: 'Downtown Clinic', validation: 'Invalid Format' },
  { row: 4, firstName: 'Suda', lastName: 'Rakdee', idNumber: '11002XXXXX', dob: '1975-01-10', phone: '0811112222', email: 'suda@email.com', clinic: 'Downtown Clinic', validation: 'Possible Duplicate' },
  { row: 5, firstName: 'Mana', lastName: 'Jai', idNumber: '55555XXXXX', dob: '1988-08-08', phone: '0888888888', email: 'mana@example.com', clinic: 'Downtown Clinic', validation: 'Existing Patient in Clinic' },
];

export default function BulkPatientUpload() {
  const [selectedClinic, setSelectedClinic] = useState(MOCK_CLINICS[0]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setFileUploaded(true);
    }, 1500);
  };

  const handleReset = () => {
    setFileUploaded(false);
    setIsUploading(false);
  };

  const getValidationBadge = (status: string) => {
    switch (status) {
      case 'Valid': return <span className="validation-badge valid"><CheckCircle2 size={14}/> Valid</span>;
      case 'Missing Required Data': return <span className="validation-badge error"><XCircle size={14}/> Missing Required Data</span>;
      case 'Invalid Format': return <span className="validation-badge error"><AlertTriangle size={14}/> Invalid Format</span>;
      case 'Possible Duplicate': return <span className="validation-badge warning"><Copy size={14}/> Possible Duplicate</span>;
      case 'Existing Patient in Clinic': return <span className="validation-badge error"><XCircle size={14}/> Existing Patient in Clinic</span>;
      default: return null;
    }
  };

  return (
    <div className="patient-upload-container" style={{ gap: '16px' }}>
      {!fileUploaded && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <button className="btn-outline">
            <Download size={16} />
            Download Template
          </button>
        </div>
      )}

      {!fileUploaded ? (
        <div className="upload-section">
          <div className="upload-config">
            <label className="form-label">Assign to Clinic</label>
            <div className="custom-select-wrapper" style={{ maxWidth: '300px', marginBottom: '24px' }}>
              <select 
                className="form-input" 
                value={selectedClinic} 
                onChange={(e) => setSelectedClinic(e.target.value)}
              >
                {MOCK_CLINICS.map(clinic => (
                  <option key={clinic} value={clinic}>{clinic}</option>
                ))}
              </select>
              <ChevronDown className="select-icon" size={16} />
            </div>
          </div>

          <div className="drag-drop-area">
            <div className="upload-icon-circle">
              <UploadCloud size={32} />
            </div>
            <h3>Drag & drop your file here</h3>
            <p className="text-muted mt-2">or click to browse from your computer</p>
            <div className="upload-formats mt-4">
              Supported formats: XLSX or CSV. Maximum file size: 10MB
            </div>
            
            <div className="upload-actions mt-6">
              <button className="btn-primary" onClick={handleUpload} disabled={isUploading}>
                {isUploading ? 'Processing...' : 'Upload File'}
              </button>
              <button className="btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="preview-section fadeIn">
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-icon-wrapper" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
                <UploadCloud size={24} />
              </div>
              <div className="card-content">
                <span className="card-label">Total Records</span>
                <span className="card-value">124</span>
              </div>
            </div>
            <div className="summary-card">
              <div className="card-icon-wrapper" style={{ backgroundColor: '#f0fdf4', color: '#22c55e' }}>
                <CheckCircle size={24} />
              </div>
              <div className="card-content">
                <span className="card-label">Valid Records</span>
                <span className="card-value text-success">110</span>
              </div>
            </div>
            <div className="summary-card">
              <div className="card-icon-wrapper" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
                <AlertTriangle size={24} />
              </div>
              <div className="card-content">
                <span className="card-label">Records with Errors</span>
                <span className="card-value text-error">10</span>
              </div>
            </div>
            <div className="summary-card">
              <div className="card-icon-wrapper" style={{ backgroundColor: '#fffbeb', color: '#f59e0b' }}>
                <Copy size={24} />
              </div>
              <div className="card-content">
                <span className="card-label">Possible Duplicates</span>
                <span className="card-value text-warning">4</span>
              </div>
            </div>
          </div>

          <div className="table-container mt-6">
            <div className="table-header-actions" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border-color)', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Preview Upload</h3>
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input type="text" placeholder="Search preview..." className="search-input" />
              </div>
            </div>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Row</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>National ID / Passport</th>
                    <th>Date of Birth</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Assigned Clinic</th>
                    <th>Validation Result</th>
                  </tr>
                </thead>
                <tbody>
                  {PREVIEW_DATA.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.row}</td>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.idNumber}</td>
                      <td>{row.dob}</td>
                      <td>{row.phone || '-'}</td>
                      <td>{row.email || '-'}</td>
                      <td>{row.clinic}</td>
                      <td>{getValidationBadge(row.validation)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="action-footer mt-6" style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 0' }}>
            <div className="action-buttons" style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-outline" onClick={handleReset}>Cancel Upload</button>
              <button className="btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }}>
                <Download size={16} /> Download Error Report
              </button>
              <button className="btn-primary" onClick={() => alert('Valid records imported successfully!')}>
                <CheckCircle2 size={16} /> Import Valid Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
