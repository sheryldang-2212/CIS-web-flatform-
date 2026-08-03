import { X } from 'lucide-react';
import './PrintBarcodeModal.css';

interface PrintBarcodeModalProps {
  orderId: string;
  onClose: () => void;
  onPrint: () => void;
}

export default function PrintBarcodeModal({ orderId, onClose, onPrint }: PrintBarcodeModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content print-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="print-preview-pane">
          <div className="barcode-preview-paper">
            <span className="barcode-text">{orderId}</span>
            <div className="barcode-image"></div>
          </div>
        </div>
        
        <div className="print-settings-pane">
          <div className="print-settings-header">
            <h2>Print</h2>
          </div>
          
          <div className="print-settings-body">
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
              <label>Number of pages per sheet</label>
              <input type="number" defaultValue={1} min={1} max={10} />
            </div>
            
            <div className="print-form-group">
              <label>Margin</label>
              <select defaultValue="Default">
                <option value="Default">Default</option>
                <option value="None">None</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            
            <div className="print-options-group">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                Headers and footers
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                Background graphics
              </label>
            </div>
          </div>
          
          <div className="print-settings-footer">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-print-action" onClick={onPrint}>Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}
