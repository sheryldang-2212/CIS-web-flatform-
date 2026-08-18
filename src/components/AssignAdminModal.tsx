import { useState } from 'react';
import { X, Search, Shield, AlertTriangle, CheckCircle2, UserPlus } from 'lucide-react';
import './PlatformAdmin.css';

interface AssignAdminModalProps {
  clinicName: string;
  onClose: () => void;
  onAssign: (data: { email: string; name: string; isNew: boolean }) => Promise<void>;
}

export default function AssignAdminModal({ clinicName, onClose, onAssign }: AssignAdminModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState<'search' | 'new_user' | 'confirm' | 'error'>('search');
  const [errorMsg, setErrorMsg] = useState('');
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSearch = () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    if (normalizedEmail === 'suspended@test.com') {
      setErrorMsg('This account is suspended and cannot be assigned as a Clinic Administrator.');
      setStep('error');
    } else if (normalizedEmail === 'duplicate@test.com') {
      setErrorMsg('This user is already a Clinic Administrator for this organization.');
      setStep('error');
    } else if (normalizedEmail === 'active@test.com') {
      setAccountInfo({ name: 'Active User', email: normalizedEmail, status: 'Active', roles: 'Doctor (Other Clinic)' });
      setName('Active User');
      setStep('confirm');
    } else if (normalizedEmail === 'concurrent@test.com') {
      setAccountInfo({ name: 'Test Concurrent', email: normalizedEmail, status: 'Active', roles: 'None' });
      setName('Test Concurrent');
      setStep('confirm'); // Will fail on save
    } else {
      // New user
      setStep('new_user');
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    setErrorMsg('');
    try {
      await onAssign({ 
        email: email.trim().toLowerCase(), 
        name: name.trim(), 
        isNew: step === 'new_user' || accountInfo?.status === 'Invitation Pending' 
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while assigning the administrator.');
      setStep('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 100 }}>
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h2>Assign Clinic Administrator</h2>
          <button className="btn-icon" onClick={onClose} disabled={isProcessing}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {step === 'search' && (
            <div>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                Enter the user's email address to assign them as an administrator for <strong>{clinicName}</strong>.
              </p>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="email" 
                    className="form-input" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  />
                  <button className="btn-primary" onClick={handleSearch} disabled={!email.trim()}>
                    <Search size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'new_user' && (
            <div>
              <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <UserPlus size={20} style={{ color: '#3b82f6', marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Global Account Not Found</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    No existing account found for <strong>{email.trim().toLowerCase()}</strong>. Please provide a name to send an invitation.
                  </p>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  autoFocus
                />
              </div>
            </div>
          )}

          {step === 'confirm' && accountInfo && (
            <div>
              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} style={{ color: '#16a34a', marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#15803d' }}>Account Found</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#166534' }}>
                    Review the user's details before confirming the assignment.
                  </p>
                </div>
              </div>

              <div className="detail-list" style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                <div className="detail-list-item">
                  <span className="detail-label">User Name</span>
                  <span className="detail-value font-medium">{accountInfo.name}</span>
                </div>
                <div className="detail-list-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{accountInfo.email}</span>
                </div>
                <div className="detail-list-item">
                  <span className="detail-label">Account Status</span>
                  <span className="detail-value">
                    <span className="status-badge success"><CheckCircle2 size={12} className="mr-1" /> {accountInfo.status}</span>
                  </span>
                </div>
                <div className="detail-list-item">
                  <span className="detail-label">Existing Roles</span>
                  <span className="detail-value text-gray-500">{accountInfo.roles}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <div className="detail-list-item">
                  <span className="detail-label text-indigo-600 font-bold">New Assignment</span>
                  <span className="detail-value font-bold text-gray-900" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Shield size={16} className="text-indigo-600" /> Clinic Admin at {clinicName}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 'error' && (
            <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start' }}>
              <AlertTriangle style={{ color: '#ef4444', marginRight: '12px', flexShrink: 0, marginTop: '2px' }} size={20} />
              <div>
                <h4 style={{ color: '#991b1b', fontWeight: 700, fontSize: '14px', margin: '0 0 4px 0' }}>Assignment Failed</h4>
                <p style={{ color: '#b91c1c', fontSize: '13px', margin: 0 }}>{errorMsg}</p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step !== 'search' && !isProcessing && (
            <button className="btn-secondary" onClick={() => { setStep('search'); setErrorMsg(''); }} style={{ marginRight: 'auto' }}>
              Back to Search
            </button>
          )}
          
          <button className="btn-secondary" onClick={onClose} disabled={isProcessing}>
            {step === 'error' ? 'Close' : 'Cancel'}
          </button>
          
          {step === 'new_user' && (
            <button className="btn-primary" onClick={() => setStep('confirm')} disabled={!name.trim()}>
              Continue
            </button>
          )}
          
          {step === 'confirm' && (
            <button className="btn-primary" onClick={handleConfirm} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Confirm Assignment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
