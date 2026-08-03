import React from 'react';
import { ChevronDown } from 'lucide-react';
import Modal from './Modal';
import './PrintModal.css';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export default function PrintModal({ isOpen, onClose, order }: PrintModalProps) {
  if (!order) return null;

  const handlePrint = () => {
    // In a real app, this might generate a PDF or call window.print() on a specific element
    window.print();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Print Preview" width="1000px">
      <div className="print-modal-content">
        
        {/* Left Side: Preview */}
        <div className="print-preview-container">
          <div className="print-paper">
            <div className="print-header">
              <h2>HEALTH HUB CLINIC</h2>
              <p>Lab Order Requisition</p>
            </div>
            
            <div className="print-info-grid">
              <div className="print-info-item">
                <span className="print-label">Patient Name:</span>
                <span className="print-value">{order.patientName}</span>
              </div>
              <div className="print-info-item">
                <span className="print-label">ID Number:</span>
                <span className="print-value">{order.idNumber}</span>
              </div>
              <div className="print-info-item">
                <span className="print-label">Order Date:</span>
                <span className="print-value">{order.date}</span>
              </div>
              <div className="print-info-item">
                <span className="print-label">Assigned Doctor:</span>
                <span className="print-value">{order.assignedTo}</span>
              </div>
              <div className="print-info-item">
                <span className="print-label">Priority:</span>
                <span className="print-value">{order.priority}</span>
              </div>
            </div>

            <div className="print-tests-section">
              <h3>Requested Tests</h3>
              <table className="print-tests-table">
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Category</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {order.tests.map((test: string, i: number) => (
                    <tr key={i}>
                      <td>{test}</td>
                      <td>General</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="print-footer">
              <div className="signature-line">Doctor Signature</div>
              <div className="signature-line">Patient Signature</div>
            </div>
          </div>
        </div>

        {/* Right Side: Settings */}
        <div className="print-settings-container">
          <h3 className="settings-title">Print Settings</h3>
          
          <div className="form-group mb-4">
            <label>Printer</label>
            <div className="select-wrapper">
              <select defaultValue="Save as PDF">
                <option>Save as PDF</option>
                <option>Office Printer</option>
              </select>
              <ChevronDown size={16} className="select-icon" />
            </div>
          </div>

          <div className="form-group mb-4">
            <label>Pages</label>
            <div className="select-wrapper">
              <select defaultValue="All">
                <option>All</option>
                <option>Custom</option>
              </select>
              <ChevronDown size={16} className="select-icon" />
            </div>
          </div>

          <div className="form-group mb-4">
            <label>Copies</label>
            <input type="number" defaultValue={1} min={1} />
          </div>

          <div className="form-group mb-4">
            <label>Color</label>
            <div className="select-wrapper">
              <select defaultValue="Default">
                <option>Default</option>
                <option>Black and White</option>
              </select>
              <ChevronDown size={16} className="select-icon" />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label mb-2">
              <input type="checkbox" defaultChecked />
              <span>Headers and footers</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Background graphics</span>
            </label>
          </div>

          <div className="modal-actions" style={{ marginTop: 'auto', borderTop: 'none', paddingTop: '24px' }}>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="button" className="btn-primary" onClick={handlePrint}>Print</button>
          </div>
        </div>

      </div>
    </Modal>
  );
}
