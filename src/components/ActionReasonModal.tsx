import React, { useState } from 'react';
import Modal from './Modal';

interface ActionReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  actionLabel: string;
  isDestructive?: boolean;
  requireReason?: boolean;
  showReasonField?: boolean;
  onSubmit: (reason: string) => void;
}

export default function ActionReasonModal({ isOpen, onClose, title, actionLabel, isDestructive = false, requireReason = true, showReasonField = true, onSubmit }: ActionReasonModalProps) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showReasonField || !requireReason || reason.trim()) {
      onSubmit(reason);
      setReason('');
    }
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} width="500px">
      <form onSubmit={handleSubmit} style={{ padding: '4px' }}>
        {showReasonField ? (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px' }}>
              Reason {requireReason && <span style={{ color: 'var(--danger)' }}>*</span>}
            </label>
            <textarea 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required={requireReason}
              rows={4}
              placeholder={requireReason ? "Please provide a reason..." : "Optional comment..."}
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid var(--border-color)', 
                borderRadius: '6px',
                fontFamily: 'inherit',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>
        ) : (
          <div style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--text-main)' }}>
            Are you sure you want to {actionLabel.toLowerCase()}?
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
          <button type="button" className="btn-cancel" onClick={handleClose}>
            Cancel
          </button>
          <button 
            type="submit" 
            className={isDestructive ? "btn-danger" : "btn-primary"}
            disabled={showReasonField && requireReason && !reason.trim()}
          >
            {actionLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
