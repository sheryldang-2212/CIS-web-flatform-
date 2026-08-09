import { useState } from 'react';
import { X } from 'lucide-react';
import './PrintBarcodeModal.css';

export interface Specimen {
  id: string;
  name: string;
}

interface PrintBarcodeModalProps {
  orderId: string;
  specimens?: Specimen[];
  onClose: () => void;
  onPrint: () => void;
}

export default function PrintBarcodeModal({ orderId, specimens = [], onClose, onPrint }: PrintBarcodeModalProps) {
  // If specimens aren't provided, mock them based on a common scenario
  const displaySpecimens = specimens.length > 0 ? specimens : [
    { id: 'SPEC-001', name: 'Serum (SST) - 5mL' },
    { id: 'SPEC-002', name: 'EDTA - 3mL' },
    { id: 'SPEC-003', name: 'Fluoride Oxalate - 2mL' }
  ];

  const [selectedSpecimens, setSelectedSpecimens] = useState<string[]>(
    displaySpecimens.map(s => s.id)
  );

  const toggleSpecimen = (id: string) => {
    setSelectedSpecimens(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedSpecimens.length === displaySpecimens.length) {
      setSelectedSpecimens([]);
    } else {
      setSelectedSpecimens(displaySpecimens.map(s => s.id));
    }
  };

  const selectedSpecimenData = displaySpecimens.filter(s => selectedSpecimens.includes(s.id));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content print-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Print Specimen Labels</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="print-modal-body">
          {/* Left Pane: Settings & Selection */}
          <div className="print-settings-pane">
            <div className="specimen-selection-section">
              <div className="specimen-selection-header">
                <h3>Select Labels to Print</h3>
                <label className="select-all-label">
                  <input 
                    type="checkbox" 
                    checked={selectedSpecimens.length === displaySpecimens.length && displaySpecimens.length > 0}
                    onChange={toggleAll}
                  />
                  Select All
                </label>
              </div>
              
              <div className="specimen-list-compact">
                {displaySpecimens.map((specimen) => (
                  <label key={specimen.id} className={`specimen-compact-item ${selectedSpecimens.includes(specimen.id) ? 'selected' : ''}`}>
                    <input 
                      type="checkbox" 
                      style={{ marginTop: '2px' }}
                      checked={selectedSpecimens.includes(specimen.id)}
                      onChange={() => toggleSpecimen(specimen.id)}
                    />
                    <div className="specimen-compact-info">
                      <div className="specimen-compact-name">{specimen.name}</div>
                      <div className="specimen-compact-id">{specimen.id}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="print-form-group">
              <label>Printer</label>
              <select defaultValue="Zebra ZD411">
                <option value="Zebra ZD411">Zebra ZD411</option>
                <option value="Brother QL-820NWB">Brother QL-820NWB</option>
                <option value="Save as PDF">Save as PDF</option>
              </select>
            </div>
            
            <div className="print-form-group">
              <label>Page</label>
              <select defaultValue="2x1">
                <option value="2x1">2" x 1"</option>
                <option value="1x1">1" x 1"</option>
              </select>
            </div>
            
            <div className="print-form-group">
              <label>Copies per label</label>
              <input type="number" defaultValue={1} min={1} max={10} />
            </div>
            
            <div className="print-settings-footer">
              <button className="btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn-print-action" onClick={onPrint} disabled={selectedSpecimens.length === 0}>
                Print {selectedSpecimens.length > 0 ? `(${selectedSpecimens.length})` : ''}
              </button>
            </div>
          </div>
          
          {/* Right Pane: Preview */}
          <div className="print-preview-pane">
            {selectedSpecimenData.length > 0 ? (
              selectedSpecimenData.map((specimen, idx) => (
                <div key={idx} className="barcode-preview-paper">
                  <span className="barcode-text">{orderId}</span>
                  <div className="barcode-image"></div>
                  <span className="barcode-specimen-name">{specimen.id} - {specimen.name}</span>
                </div>
              ))
            ) : (
              <div className="no-preview">No specimens selected for printing.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
