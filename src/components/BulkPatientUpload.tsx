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
    <div className="h-full flex flex-col relative overflow-hidden p-6 bg-slate-50/50">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl mb-6 shadow-sm flex items-start gap-4">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="text-amber-800 font-bold">Feature Flag: Proposed Module [TBC]</h3>
          <p className="text-amber-700 text-sm mt-2 leading-relaxed">
            Bulk patient upload may conflict with the clean-start policy. This module is shown for demonstration and requires business confirmation before MVP release.
          </p>
        </div>
      </div>

      {!fileUploaded && (
        <div className="flex justify-between items-center mb-6">
          <h1 className="prem-title">Bulk Patient Upload</h1>
          <button className="prem-btn-secondary">
            <Download size={16} /> Download Template
          </button>
        </div>
      )}

      {!fileUploaded ? (
        <div className="flex-1 max-w-4xl mx-auto w-full">
          <div className="glass-panel p-8 mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Assign to Clinic</label>
            <div className="relative max-w-md mb-8">
              <select 
                className="prem-input appearance-none bg-white pr-10" 
                value={selectedClinic} 
                onChange={(e) => setSelectedClinic(e.target.value)}
              >
                {MOCK_CLINICS.map(clinic => (
                  <option key={clinic} value={clinic}>{clinic}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            <div className="border-2 border-dashed border-indigo-200 rounded-2xl bg-indigo-50/30 flex flex-col items-center justify-center p-12 transition-all hover:bg-indigo-50/50 hover:border-indigo-300">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <UploadCloud size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Drag & drop your file here</h3>
              <p className="text-slate-500 mt-2">or click to browse from your computer</p>
              <div className="text-xs font-medium text-slate-400 mt-6 bg-white/60 px-4 py-2 rounded-full border border-slate-200">
                Supported formats: XLSX or CSV. Maximum file size: 10MB
              </div>
              
              <div className="flex gap-4 mt-8">
                <button className="prem-btn-primary" onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? 'Processing...' : 'Upload File'}
                </button>
                <button className="prem-btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden fadeIn">
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="prem-metric-card">
              <div className="flex items-start justify-between">
                <div className="card-content">
                  <span className="metric-label">Total Records</span>
                  <span className="prem-metric-value">124</span>
                </div>
                <div className="prem-icon-blob" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
                  <UploadCloud size={24} />
                </div>
              </div>
            </div>
            <div className="prem-metric-card">
              <div className="flex items-start justify-between">
                <div className="card-content">
                  <span className="metric-label">Valid Records</span>
                  <span className="prem-metric-value text-emerald-600">110</span>
                </div>
                <div className="prem-icon-blob" style={{ backgroundColor: '#f0fdf4', color: '#22c55e' }}>
                  <CheckCircle size={24} />
                </div>
              </div>
            </div>
            <div className="prem-metric-card">
              <div className="flex items-start justify-between">
                <div className="card-content">
                  <span className="metric-label">Records with Errors</span>
                  <span className="prem-metric-value text-rose-600">10</span>
                </div>
                <div className="prem-icon-blob" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
                  <AlertTriangle size={24} />
                </div>
              </div>
            </div>
            <div className="prem-metric-card">
              <div className="flex items-start justify-between">
                <div className="card-content">
                  <span className="metric-label">Possible Duplicates</span>
                  <span className="prem-metric-value text-amber-500">4</span>
                </div>
                <div className="prem-icon-blob" style={{ backgroundColor: '#fffbeb', color: '#f59e0b' }}>
                  <Copy size={24} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto glass-panel p-1">
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-200/50 bg-white/30">
              <h3 className="font-bold text-slate-800">Preview Upload</h3>
              <div className="flex items-center bg-white rounded-lg px-3 py-1.5 border border-slate-200">
                <Search size={16} className="text-slate-400 mr-2" />
                <input type="text" placeholder="Search preview..." className="bg-transparent border-none outline-none text-sm w-48" />
              </div>
            </div>
            <table className="prem-table">
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
                    <td className="font-mono text-slate-500">{row.row}</td>
                    <td className="font-semibold text-slate-800">{row.firstName}</td>
                    <td className="font-semibold text-slate-800">{row.lastName}</td>
                    <td className="font-mono">{row.idNumber}</td>
                    <td>{row.dob}</td>
                    <td>{row.phone || '-'}</td>
                    <td className="text-slate-500">{row.email || '-'}</td>
                    <td><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-medium">{row.clinic}</span></td>
                    <td>{getValidationBadge(row.validation)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-200/50">
            <button className="prem-btn-secondary" onClick={handleReset}>Cancel Upload</button>
            <button className="prem-btn-secondary text-rose-600 border-rose-200 hover:bg-rose-50">
              <Download size={16} /> Download Error Report
            </button>
            <button className="prem-btn-primary" onClick={() => alert('Valid records imported successfully!')}>
              <CheckCircle2 size={16} /> Import Valid Records
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
