import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet, CheckCircle2, X, FileText, XCircle, AlertTriangle, List, Plus } from 'lucide-react';
import './PatientData.css';
import './PatientBulkUpload.css';

export default function PatientBulkUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success'>('idle');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setUploadStatus('success');
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus('idle');
  };

  const removeFile = () => {
    setFile(null);
    setUploadStatus('idle');
  };

  return (
    <div className="pd-bulk-upload">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <a href="/patient_import_template.csv" download className="pd-btn-outline" style={{ textDecoration: 'none' }}>
          <Download size={16} />
          Download Template
        </a>
      </div>

      <div className="pd-bulk-content">
        <div className="pd-bulk-panel pd-bulk-instructions-panel">
          <div className="pd-panel-header">
            <div className="pd-panel-icon"><FileText size={20} color="#3b82f6" /></div>
            <div>
              <h3>Required Information</h3>
              <p>Your Excel file must include the following columns (headers):</p>
            </div>
          </div>
          
          <table className="pd-req-table">
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="req">*</span> Patient Name</td>
                <td>Full name as per ID / passport</td>
              </tr>
              <tr>
                <td><span className="req">*</span> ID / Passport</td>
                <td>National ID, passport, or other unique identifier</td>
              </tr>
              <tr>
                <td><span className="req">*</span> DOB</td>
                <td>Date of birth (DD/MM/YYYY)</td>
              </tr>
              <tr>
                <td><span className="req">*</span> Phone</td>
                <td>Contact number</td>
              </tr>
              <tr>
                <td><span className="req">*</span> Clinic</td>
                <td>Clinic or location name</td>
              </tr>
            </tbody>
          </table>
          <div className="pd-req-footer">
            Supported file formats: .xlsx &nbsp;|&nbsp; Maximum file size: 5 MB &nbsp;|&nbsp; First row must be headers
          </div>
        </div>

        <div className="pd-bulk-panel pd-bulk-upload-panel">
          <div className="pd-panel-header">
            <div className="pd-panel-icon"><Upload size={20} color="#3b82f6" /></div>
            <div>
              <h3>Upload Patient File</h3>
              <p>Drag and drop your file here, or click to browse.</p>
            </div>
          </div>

          <div 
            className={`pd-dropzone-new ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              id="file-upload" 
              accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleChange}
            />
            {!file ? (
              <label htmlFor="file-upload" className="pd-dropzone-content-new">
                <div className="pd-upload-icon-wrapper">
                  <Upload size={24} />
                </div>
                <h4>Drag and drop your file here</h4>
                <p>or click to browse (.xlsx)</p>
              </label>
            ) : (
              <div className="pd-file-selected-card">
                <div className="pd-file-selected-info">
                  <div className="pd-excel-icon">
                    <FileSpreadsheet size={24} color="#16a34a" />
                  </div>
                  <div className="pd-file-details-text">
                    <span className="pd-file-name">{file.name}</span>
                    <span className="pd-file-size">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
                <button className="pd-remove-file-btn" onClick={removeFile}>
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {file && (
            <div className="pd-upload-ready-message">
              <CheckCircle2 size={16} color="#16a34a" />
              <span>File selected. Click "Upload Data" to start importing.</span>
            </div>
          )}

          <div className="pd-upload-actions-new">
            <button 
              className="pd-btn-primary" 
              disabled={!file}
              onClick={handleUpload}
            >
              <Upload size={16} style={{ marginRight: '8px' }} />
              Upload Data
            </button>
          </div>
        </div>
      </div>

      {uploadStatus === 'success' && (
        <div className="pd-import-result fade-in">
          <div className="pd-result-header">
            <div>
              <h2 className="pd-result-title">Import Result</h2>
              <div className="pd-result-meta">
                <span>File: {file?.name || 'patients_import_sep.xlsx'}</span>
                <span className="divider">|</span>
                <span>Uploaded on: 24 Sep 2024, 10:14 AM</span>
                <span className="divider">|</span>
                <span>Upload by: Sarah Johnson</span>
              </div>
            </div>
            <div className="pd-result-actions">
              <button className="pd-btn-outline"><Download size={16} /> Download Result</button>
              <button className="pd-btn-outline"><List size={16} /> View Patient List</button>
              <button className="pd-btn-primary" onClick={resetUpload}><Plus size={16} /> Import Another File</button>
            </div>
          </div>

          <div className="pd-stats-row">
            <div className="pd-stat-card">
              <div className="pd-stat-icon blue"><FileText size={24} /></div>
              <div className="pd-stat-info">
                <span className="pd-stat-label">Total Records</span>
                <span className="pd-stat-value">120</span>
              </div>
            </div>
            <div className="pd-stat-card">
              <div className="pd-stat-icon green"><CheckCircle2 size={24} /></div>
              <div className="pd-stat-info">
                <span className="pd-stat-label">Imported</span>
                <span className="pd-stat-value">112</span>
              </div>
            </div>
            <div className="pd-stat-card">
              <div className="pd-stat-icon red"><XCircle size={24} /></div>
              <div className="pd-stat-info">
                <span className="pd-stat-label">Failed</span>
                <span className="pd-stat-value">5</span>
              </div>
            </div>
            <div className="pd-stat-card">
              <div className="pd-stat-icon yellow"><AlertTriangle size={24} /></div>
              <div className="pd-stat-info">
                <span className="pd-stat-label">Duplicate</span>
                <span className="pd-stat-value">3</span>
              </div>
            </div>
          </div>

          <div className="pd-batch-details">
            <h3 className="pd-batch-title">Imported Batch Details</h3>
            <table className="pd-table">
              <thead>
                <tr>
                  <th>Row No.</th>
                  <th>Patient Name</th>
                  <th>ID / Passport</th>
                  <th>DOB</th>
                  <th>Phone</th>
                  <th>Clinic</th>
                  <th>Status</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Tan Wei Ming</td>
                  <td>S9123456Z</td>
                  <td>12/03/1985</td>
                  <td>+65 9123 4567</td>
                  <td>Central Clinic</td>
                  <td><span className="pd-badge-imported">Imported</span></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Nur Aisyah Binte Karim</td>
                  <td>S8765432A</td>
                  <td>23/07/1990</td>
                  <td>+65 8234 5678</td>
                  <td>Woodlands Clinic</td>
                  <td><span className="pd-badge-imported">Imported</span></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Rajesh Kumar</td>
                  <td>P1234567</td>
                  <td>05/11/1978</td>
                  <td>+65 9456 7890</td>
                  <td>Central Clinic</td>
                  <td><span className="pd-badge-failed">Failed</span></td>
                  <td>Invalid date of birth</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Lim Siew Hua</td>
                  <td>S7654321B</td>
                  <td>18/02/1992</td>
                  <td>+65 8123 9876</td>
                  <td>Jurong Clinic</td>
                  <td><span className="pd-badge-duplicate">Duplicate</span></td>
                  <td>Patient already exists</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Chen Mei Ling</td>
                  <td>S2345678C</td>
                  <td>30/06/1988</td>
                  <td>+65 9333 2211</td>
                  <td>Bedok Clinic</td>
                  <td><span className="pd-badge-imported">Imported</span></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Ahmad bin Salleh</td>
                  <td>S3456789D</td>
                  <td>21/09/1975</td>
                  <td>+65 8444 1100</td>
                  <td>Tampines Clinic</td>
                  <td><span className="pd-badge-failed">Failed</span></td>
                  <td>Missing phone number</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Kavitha Subramaniam</td>
                  <td>S4567890E</td>
                  <td>14/01/1983</td>
                  <td>+65 9666 7788</td>
                  <td>Central Clinic</td>
                  <td><span className="pd-badge-imported">Imported</span></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Miguel Santos</td>
                  <td>P7654321</td>
                  <td>27/04/1991</td>
                  <td>+65 9888 3344</td>
                  <td>Changi Clinic</td>
                  <td><span className="pd-badge-duplicate">Duplicate</span></td>
                  <td>Patient already exists</td>
                </tr>
              </tbody>
            </table>
            <div className="pd-pagination">
              <span className="pd-page-info">Showing 1 - 8 of 120 records</span>
              <div className="pd-page-controls">
                <button className="pd-page-btn">&lt;</button>
                <button className="pd-page-btn active">1</button>
                <button className="pd-page-btn">2</button>
                <button className="pd-page-btn">3</button>
                <button className="pd-page-btn">4</button>
                <button className="pd-page-btn">5</button>
                <span className="pd-page-ellipsis">...</span>
                <button className="pd-page-btn">15</button>
                <button className="pd-page-btn">&gt;</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
