import { useState, useEffect } from 'react';
import { ArrowLeft, Building2, CheckCircle2, AlertTriangle, XCircle, Clock, ShieldAlert, X, Users, Settings, Activity, History, MoreVertical, Save, RefreshCw, Edit2 } from 'lucide-react';
import AssignAdminModal from './AssignAdminModal';
import './PlatformAdmin.css';

interface PlatformClinicDetailProps {
  clinic: any;
  onBack: () => void;
  onUpdateStatus: (clinicId: string, newStatus: string) => void;
  onUpdateClinic?: (updatedClinic: any) => void;
}

export default function PlatformClinicDetail({ clinic, onBack, onUpdateStatus, onUpdateClinic }: PlatformClinicDetailProps) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(clinic);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [showCancelMenu, setShowCancelMenu] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(null);
  
  const [admins, setAdmins] = useState<any[]>(
    clinic.admin && clinic.admin !== 'Not Assigned' ? [
      { id: '1', name: 'Primary Admin', email: clinic.admin, accountStatus: 'Active', assignmentStatus: 'Assigned', otherRoles: 'None', assignedDate: clinic.created }
    ] : []
  );

  const [activities, setActivities] = useState<any[]>([
    { id: 'a1', title: 'Clinic Created', meta: `By ${clinic.createdBy || 'System Admin'} • ${clinic.created}`, desc: `Initial setup pending for ${clinic.name}.` }
  ]);

  useEffect(() => {
    setEditForm(clinic);
  }, [clinic]);

  const handleEditChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const isFormDirty = () => {
    return editForm.name !== clinic.name || editForm.legalName !== clinic.legalName || 
           editForm.address !== clinic.address || editForm.contactEmail !== clinic.contactEmail || 
           editForm.contactPhone !== clinic.contactPhone || editForm.type !== clinic.type;
  };

  const handleCancelEdit = () => {
    if (isFormDirty()) {
      setShowUnsavedModal(true);
    } else {
      setIsEditing(false);
      setErrorMsg('');
      setDuplicateWarning(false);
    }
  };

  const handleSaveEdit = () => {
    if (!editForm.legalName?.trim() || !editForm.name?.trim() || !editForm.address?.trim() || !editForm.contactEmail?.trim() || !editForm.contactPhone?.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (editForm.legalName === 'Conflict') {
      setErrorMsg('This clinic was updated by another administrator. Please reload and review the latest information.');
      return;
    }
    if (editForm.legalName === 'Denied') {
      setErrorMsg('Access Denied: Your permission to update clinics has been revoked.');
      return;
    }

    if (!duplicateWarning && (editForm.name === 'Duplicate' || editForm.contactEmail === 'duplicate@test.com')) {
      setDuplicateWarning(true);
      return;
    }

    setIsSaving(true);
    setErrorMsg('');
    setDuplicateWarning(false);
    
    setTimeout(() => {
      const updated = {
        ...clinic,
        type: clinic.status === 'Setup Pending' ? editForm.type : clinic.type,
        name: editForm.name.trim(),
        legalName: editForm.legalName.trim(),
        address: editForm.address.trim(),
        contactEmail: editForm.contactEmail.trim().toLowerCase(),
        contactPhone: editForm.contactPhone.trim(),
        lastUpdated: new Date().toISOString().split('T')[0],
        updatedBy: 'Current User'
      };
      
      if (onUpdateClinic) onUpdateClinic(updated);
      setIsEditing(false);
      setIsSaving(false);
    }, 800);
  };

  const handleAssignAdmin = async (data: { email: string; name: string; isNew: boolean }) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (data.email === 'concurrent@test.com') {
          reject(new Error('This user was just assigned by another administrator. Please refresh.'));
          return;
        }

        const newAdmin = {
          id: Date.now().toString(),
          name: data.name,
          email: data.email,
          accountStatus: data.isNew ? 'Invitation Pending' : 'Active',
          assignmentStatus: 'Assigned',
          otherRoles: data.isNew ? 'None' : 'Doctor (Other Clinic)',
          assignedDate: new Date().toISOString().split('T')[0]
        };

        const updatedAdmins = [...admins, newAdmin];
        setAdmins(updatedAdmins);
        
        // Update counts
        const activeCount = updatedAdmins.filter(a => a.accountStatus === 'Active' && a.assignmentStatus === 'Assigned').length;
        const pendingCount = updatedAdmins.filter(a => a.accountStatus === 'Invitation Pending' && a.assignmentStatus === 'Assigned').length;
        
        if (onUpdateClinic) {
          onUpdateClinic({
            ...clinic,
            admin: activeCount > 0 ? updatedAdmins.find(a => a.accountStatus === 'Active')?.email : clinic.admin,
            activeAdmins: activeCount,
            pendingAdmins: pendingCount
          });
        }

        // Add audit log
        setActivities([{
          id: `a${Date.now()}`,
          title: 'Clinic Administrator Assigned',
          meta: `By Current User • ${new Date().toISOString().split('T')[0]}`,
          desc: `Assigned ${data.email} as Clinic Admin. ${data.isNew ? `Activation link was sent to ${data.email}.` : ''}`
        }, ...activities]);

        setShowAssignModal(false);
        resolve();
      }, 600);
    });
  };

  const handleRemoveAdmin = () => {
    if (!showRemoveConfirm) return;
    
    const updatedAdmins = admins.map(a => a.id === showRemoveConfirm ? { ...a, assignmentStatus: 'Removed' } : a);
    setAdmins(updatedAdmins);
    
    const activeCount = updatedAdmins.filter(a => a.accountStatus === 'Active' && a.assignmentStatus === 'Assigned').length;
    const pendingCount = updatedAdmins.filter(a => a.accountStatus === 'Invitation Pending' && a.assignmentStatus === 'Assigned').length;
    
    if (onUpdateClinic) {
      onUpdateClinic({
        ...clinic,
        admin: activeCount > 0 ? updatedAdmins.find(a => a.accountStatus === 'Active' && a.assignmentStatus === 'Assigned')?.email : 'Not Assigned',
        activeAdmins: activeCount,
        pendingAdmins: pendingCount
      });
    }
    
    setActivities([{
      id: `a${Date.now()}`,
      title: 'Clinic Administrator Removed',
      meta: `By Current User • ${new Date().toISOString().split('T')[0]}`,
      desc: `Removed administrator access for the user.`
    }, ...activities]);
    
    setShowRemoveConfirm(null);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <span className="status-badge success"><CheckCircle2 size={12} className="mr-1" /> Active</span>;
      case 'Suspended': return <span className="status-badge error"><XCircle size={12} className="mr-1" /> Suspended</span>;
      case 'Cancelled': return <span className="status-badge bg-gray-100 text-gray-700"><XCircle size={12} className="mr-1" /> Cancelled</span>;
      default: return <span className="status-badge warning"><Clock size={12} className="mr-1" /> Setup Pending</span>;
    }
  };

  const renderChecklist = () => (
    <div className="detail-card" style={{ marginTop: '24px' }}>
      <h3><CheckCircle2 className="mr-2 text-indigo-600" size={20} /> Pre-Activation Checklist</h3>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>Complete all blocking items before activating this organization.</p>
      
      <div className="detail-list">
        <div className="checklist-item">
          <CheckCircle2 style={{ color: '#22c55e', marginTop: '2px' }} size={18} />
          <div className="checklist-content">
            <span className="checklist-title">Organization Information</span>
            <span className="checklist-desc">Legal Name, Display Name, Address configured.</span>
          </div>
        </div>
        <div className="checklist-item">
          {clinic.admin !== 'Not Assigned' ? (
            <CheckCircle2 style={{ color: '#22c55e', marginTop: '2px' }} size={18} />
          ) : (
            <AlertTriangle style={{ color: '#ef4444', marginTop: '2px' }} size={18} />
          )}
          <div className="checklist-content">
            <span className="checklist-title">Organization Administrator <span style={{ color: '#ef4444', fontSize: '11px', marginLeft: '4px' }}>(Blocking)</span></span>
            <span className="checklist-desc">
              {clinic.admin !== 'Not Assigned' ? 'At least one active Admin is assigned.' : 'You must assign an Admin before activation.'}
            </span>
          </div>
        </div>
        <div className="checklist-item">
          <CheckCircle2 style={{ color: '#22c55e', marginTop: '2px' }} size={18} />
          <div className="checklist-content">
            <span className="checklist-title">Review Configuration</span>
            <span className="checklist-desc">Country, Timezone, and Default Language are set correctly.</span>
          </div>
        </div>
        <div className="checklist-item" style={{ opacity: 0.7 }}>
          <Activity style={{ color: '#94a3b8', marginTop: '2px' }} size={18} />
          <div className="checklist-content">
            <span className="checklist-title" style={{ color: '#64748b' }}>LIS Configuration <span style={{ color: '#64748b', fontSize: '11px', marginLeft: '4px', fontWeight: 'normal' }}>(Optional)</span></span>
            <span className="checklist-desc">LIS mapping is not required for activation.</span>
          </div>
        </div>
      </div>
      
      {clinic.status === 'Setup Pending' && (
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            className="btn-primary" 
            disabled={clinic.admin === 'Not Assigned'}
            onClick={() => onUpdateStatus(clinic.id, 'Active')}
          >
            Activate Organization
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-container h-full flex flex-col relative">
      {/* Header */}
      <div className="detail-header">
        <button onClick={onBack} className="btn-icon">
          <ArrowLeft size={20} />
        </button>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{clinic.name}</h1>
            {renderStatusBadge(clinic.status)}
          </div>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px', marginBottom: 0 }}>{clinic.code} • {clinic.address}</p>
        </div>
        <div className="detail-header-actions" style={{ position: 'relative', display: 'flex', gap: '8px', alignItems: 'center' }}>
          {clinic.status !== 'Cancelled' && !isEditing && (
            <button className="btn-secondary" style={{ backgroundColor: 'transparent' }} onClick={() => { setEditForm(clinic); setIsEditing(true); }}>
              Edit Information
            </button>
          )}
          
          {clinic.status === 'Setup Pending' && !isEditing && (
            <>
              <button className="btn-primary" onClick={() => onUpdateStatus(clinic.id, 'Active')}>
                Activate Clinic
              </button>
              <div style={{ position: 'relative' }}>
                <button className="btn-icon" onClick={() => setShowCancelMenu(!showCancelMenu)}>
                  <MoreVertical size={20} />
                </button>
                {showCancelMenu && (
                  <>
                    <div className="fixed inset-0 z-0" onClick={() => setShowCancelMenu(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 5 }} />
                    <div className="dropdown-menu" style={{ right: 0, left: 'auto', zIndex: 10 }}>
                      <button className="dropdown-item danger" onClick={() => { onUpdateStatus(clinic.id, 'Cancelled'); setShowCancelMenu(false); }}>
                        <X size={14} className="mr-2" /> Cancel Setup
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          
          {clinic.status === 'Active' && !isEditing && (
            <button className="btn-secondary" style={{ color: '#dc2626', borderColor: '#fecaca', backgroundColor: 'transparent' }} onClick={() => onUpdateStatus(clinic.id, 'Suspended')}>
              Suspend Clinic
            </button>
          )}
          
          {clinic.status === 'Suspended' && !isEditing && (
            <button className="btn-primary" style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }} onClick={() => onUpdateStatus(clinic.id, 'Active')}>
              Reactivate Clinic
            </button>
          )}
          
          {isEditing && (
            <>
              <button className="btn-secondary" onClick={handleCancelEdit} disabled={isSaving}>Cancel</button>
              {duplicateWarning ? (
                <button className="btn-primary" style={{ backgroundColor: '#d97706', borderColor: '#d97706' }} onClick={handleSaveEdit} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Proceed Anyway'}
                </button>
              ) : (
                <button className="btn-primary" onClick={handleSaveEdit} disabled={!isFormDirty() || isSaving}>
                  <Save size={16} className="mr-2 inline" /> {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        {[
          { id: 'Overview', icon: Building2 },
          { id: 'Administrators', icon: Users },
          { id: 'Configuration', icon: Settings },
          { id: 'LIS Integration', icon: Activity },
          { id: 'Activity History', icon: History }
        ].map(tab => (
          <button
            key={tab.id}
            className={`detail-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            {tab.id}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="detail-content">
        {activeTab === 'Overview' && (
          <>
            {errorMsg && (
              <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', marginBottom: '24px' }}>
                <AlertTriangle style={{ color: '#ef4444', marginRight: '12px', flexShrink: 0, marginTop: '2px' }} size={20} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#991b1b', fontWeight: 700, fontSize: '14px', margin: '0 0 4px 0' }}>Error</h4>
                  <p style={{ color: '#b91c1c', fontSize: '13px', margin: 0 }}>{errorMsg}</p>
                </div>
                {(errorMsg.includes('another administrator') || errorMsg.includes('Access Denied')) && (
                  <button onClick={() => window.location.reload()} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                    <RefreshCw size={12} className="mr-2" /> Reload
                  </button>
                )}
              </div>
            )}
            
            {duplicateWarning && (
              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', marginBottom: '24px' }}>
                <AlertTriangle style={{ color: '#d97706', marginRight: '12px', flexShrink: 0, marginTop: '2px' }} size={20} />
                <div>
                  <h4 style={{ color: '#92400e', fontWeight: 700, fontSize: '14px', margin: '0 0 4px 0' }}>Potential Duplicate Detected</h4>
                  <p style={{ color: '#b45309', fontSize: '13px', margin: 0 }}>A potentially matching organization already exists. Please review before proceeding.</p>
                </div>
              </div>
            )}

            {!isEditing ? (
              <div className="detail-grid" style={{ gridTemplateColumns: '1fr', gap: '24px' }}>
                <div className="detail-card">
                  <h3>Basic Information</h3>
                  <div className="detail-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="detail-list-item"><span className="detail-label">Clinic Code</span><span className="detail-value">{clinic.code}</span></div>
                    <div className="detail-list-item"><span className="detail-label">Organization Type</span><span className="detail-value">{clinic.type || 'Clinic'}</span></div>
                    <div className="detail-list-item"><span className="detail-label">Legal Name</span><span className="detail-value">{clinic.legalName}</span></div>
                    <div className="detail-list-item"><span className="detail-label">Display Name</span><span className="detail-value">{clinic.name}</span></div>
                    <div className="detail-list-item"><span className="detail-label">Physical Address</span><span className="detail-value">{clinic.address}</span></div>
                    <div className="detail-list-item"><span className="detail-label">Country</span><span className="detail-value">{clinic.country || 'Thailand'}</span></div>
                    <div className="detail-list-item"><span className="detail-label">Contact Email</span><span className="detail-value">{clinic.contactEmail || `contact@${clinic.code.toLowerCase()}.com`}</span></div>
                    <div className="detail-list-item"><span className="detail-label">Contact Phone</span><span className="detail-value">{clinic.contactPhone || '+66...'}</span></div>
                  </div>
                </div>

                <div className="detail-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div className="detail-card">
                    <h3>Lifecycle Information</h3>
                    <div className="detail-list">
                      <div className="detail-list-item"><span className="detail-label">Clinic Status</span><div style={{ marginTop: '4px' }}>{renderStatusBadge(clinic.status)}</div></div>
                      <div className="detail-list-item"><span className="detail-label">Created Date / By</span><span className="detail-value">{clinic.created} • {clinic.createdBy || 'System Admin'}</span></div>
                      <div className="detail-list-item"><span className="detail-label">First Activated Date</span><span className="detail-value">{clinic.firstActivatedDate || 'Not Activated'}</span></div>
                      <div className="detail-list-item"><span className="detail-label">Last Status Changed Date</span><span className="detail-value">{clinic.lastStatusChangedDate || clinic.created}</span></div>
                      <div className="detail-list-item"><span className="detail-label">Last Updated / By</span><span className="detail-value">{clinic.lastUpdated || clinic.created} • {clinic.updatedBy || 'System Admin'}</span></div>
                    </div>
                  </div>

                  <div className="detail-card">
                    <h3>Administration Summary</h3>
                    <div className="detail-list">
                      <div className="detail-list-item"><span className="detail-label">Total Clinic Administrators</span><span className="detail-value font-bold" style={{ fontSize: '18px' }}>{(clinic.activeAdmins || 0) + (clinic.pendingAdmins || 0)}</span></div>
                      <div className="detail-list-item"><span className="detail-label">Active Administrator Count</span><span className="detail-value" style={{ color: '#16a34a', fontWeight: 600 }}>{clinic.activeAdmins || 0}</span></div>
                      <div className="detail-list-item"><span className="detail-label">Pending Invitation Count</span><span className="detail-value" style={{ color: '#d97706', fontWeight: 600 }}>{clinic.pendingAdmins || 0}</span></div>
                    </div>
                  </div>
                </div>

                {clinic.status === 'Suspended' && (
                  <div className="detail-card" style={{ borderLeft: '4px solid #ef4444' }}>
                    <h3 style={{ color: '#b91c1c' }}><AlertTriangle size={18} className="mr-2 inline" /> Suspension Details</h3>
                    <div className="detail-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <div className="detail-list-item"><span className="detail-label">Suspension Reason</span><span className="detail-value font-medium">{clinic.suspensionReason || 'No reason provided'}</span></div>
                      <div className="detail-list-item"><span className="detail-label">Suspended Date</span><span className="detail-value">{clinic.suspendedDate || 'Unknown'}</span></div>
                      <div className="detail-list-item"><span className="detail-label">Suspended By</span><span className="detail-value">{clinic.suspendedBy || 'System'}</span></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="detail-card" style={{ marginBottom: '24px' }}>
                <h3><Edit2 size={20} className="mr-2 text-indigo-600 inline" /> Edit Organization Information</h3>
                <div className="detail-grid" style={{ marginBottom: '24px', gap: '16px' }}>
                  <div className="form-group mb-0">
                    <label className="form-label">Clinic Code (Locked)</label>
                    <input type="text" className="form-input bg-gray-100 cursor-not-allowed" value={clinic.code} disabled style={{ backgroundColor: '#f3f4f6' }} />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Organization Type {clinic.status !== 'Setup Pending' ? '(Locked)' : '*'}</label>
                    <select 
                      className={`form-input ${clinic.status !== 'Setup Pending' ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                      value={editForm.type || 'Clinic'} 
                      onChange={(e) => handleEditChange('type', e.target.value)}
                      disabled={clinic.status !== 'Setup Pending'}
                      style={clinic.status !== 'Setup Pending' ? { backgroundColor: '#f3f4f6' } : {}}
                    >
                      <option value="Clinic">Clinic</option>
                      <option value="Hospital">Hospital</option>
                    </select>
                  </div>
                  <div className="form-group mb-0" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Legal Name *</label>
                    <input type="text" required className="form-input" value={editForm.legalName} onChange={(e) => handleEditChange('legalName', e.target.value)} />
                  </div>
                  <div className="form-group mb-0" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Display Name *</label>
                    <input type="text" required className="form-input" value={editForm.name} onChange={(e) => handleEditChange('name', e.target.value)} />
                  </div>
                  <div className="form-group mb-0" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Physical Address *</label>
                    <input type="text" required className="form-input" value={editForm.address} onChange={(e) => handleEditChange('address', e.target.value)} />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Country (Locked)</label>
                    <input type="text" className="form-input bg-gray-100 cursor-not-allowed" value={clinic.country || 'Thailand'} disabled style={{ backgroundColor: '#f3f4f6' }} />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Timezone (Managed in Configuration)</label>
                    <input type="text" className="form-input bg-gray-100 cursor-not-allowed" value={clinic.timezone || 'Asia/Bangkok'} disabled style={{ backgroundColor: '#f3f4f6' }} />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Contact Email *</label>
                    <input type="email" required className="form-input" value={editForm.contactEmail} onChange={(e) => handleEditChange('contactEmail', e.target.value)} />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Contact Phone *</label>
                    <input type="tel" required className="form-input" value={editForm.contactPhone} onChange={(e) => handleEditChange('contactPhone', e.target.value)} />
                  </div>
                </div>
              </div>
            )}
            
            {clinic.status === 'Setup Pending' && !isEditing && renderChecklist()}
          </>
        )}

        {activeTab === 'Administrators' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Clinic Administrators</h3>
              <button 
                className="btn-primary" 
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => setShowAssignModal(true)}
                disabled={clinic.status === 'Cancelled'}
              >
                <Users size={16} /> Assign Admin
              </button>
            </div>
            {clinic.status === 'Suspended' && (
              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
                <AlertTriangle style={{ color: '#d97706', marginRight: '12px', flexShrink: 0, marginTop: '2px' }} size={16} />
                <p style={{ color: '#b45309', fontSize: '13px', margin: 0 }}>
                  This clinic is Suspended. Administrators can be assigned but they will not be able to access the clinic until it is Reactivated.
                </p>
              </div>
            )}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Admin Name</th>
                    <th>Email Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.filter(a => a.assignmentStatus === 'Assigned').length > 0 ? (
                    admins.filter(a => a.assignmentStatus === 'Assigned').map(admin => (
                      <tr key={admin.id}>
                        <td style={{ fontWeight: 500 }}>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>
                          <span className={`status-badge ${admin.accountStatus === 'Active' ? 'success' : 'warning'}`}>
                            {admin.accountStatus === 'Active' ? <CheckCircle2 size={12} className="mr-1" /> : <Clock size={12} className="mr-1" />}
                            {admin.accountStatus}
                          </span>
                        </td>
                        <td>
                          <button 
                            style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px' }}
                            onClick={() => setShowRemoveConfirm(admin.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '32px 0', color: '#64748b' }}>No administrators assigned yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldAlert size={12} /> A clinic must have at least one active administrator to be activated.
            </p>
          </div>
        )}

        {activeTab === 'Configuration' && (
          <div className="detail-card">
            <h3 style={{ marginBottom: '24px' }}>Localization & Setup</h3>
            <div className="detail-grid">
              <div className="form-group mb-0">
                <label className="form-label">Timezone</label>
                <select className="form-input" style={{ backgroundColor: '#f8fafc', cursor: 'not-allowed' }} disabled>
                  <option>Asia/Ho_Chi_Minh (UTC+7)</option>
                </select>
                <p style={{ fontSize: '12px', color: '#d97706', marginTop: '8px', margin: 0 }}>Changing timezone affects all historical audit logs and reports.</p>
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Language</label>
                <select className="form-input" style={{ backgroundColor: '#f8fafc', cursor: 'not-allowed' }} disabled>
                  <option>English</option>
                  <option>Vietnamese</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'LIS Integration' && (
          <div className="detail-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px 24px' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#94a3b8' }}>
              <Activity size={32} />
            </div>
            <h3 style={{ fontSize: '18px', margin: '0 0 8px 0' }}>LIS Not Configured</h3>
            <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', maxWidth: '400px', margin: '0 0 24px 0' }}>
              This clinic has not been connected to a Laboratory Information System. They will not be able to process automated lab orders.
            </p>
            <button className="btn-primary">Configure LIS Integration</button>
          </div>
        )}

        {activeTab === 'Activity History' && (
          <div className="detail-card">
            <h3 style={{ marginBottom: '24px' }}>Audit Log</h3>
            <div className="timeline" style={{ position: 'relative', paddingLeft: '16px', borderLeft: '2px solid #e2e8f0', marginLeft: '8px' }}>
              {activities.map((act, i) => (
                <div key={act.id} className="timeline-item" style={{ position: 'relative', marginBottom: i === activities.length - 1 ? 0 : '24px' }}>
                  <div className="timeline-dot" style={{ position: 'absolute', width: '12px', height: '12px', backgroundColor: '#4f46e5', borderRadius: '50%', left: '-23px', top: '4px', border: '2px solid #fff' }}></div>
                  <div className="timeline-title" style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{act.title}</div>
                  <div className="timeline-meta" style={{ fontSize: '12px', color: '#64748b', margin: '4px 0' }}>{act.meta}</div>
                  <div className="timeline-desc" style={{ fontSize: '13px', color: '#475569' }}>{act.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {showAssignModal && (
        <AssignAdminModal 
          clinicName={clinic.name} 
          onClose={() => setShowAssignModal(false)} 
          onAssign={handleAssignAdmin} 
        />
      )}

      {showRemoveConfirm && (
        <div className="modal-overlay" onClick={() => setShowRemoveConfirm(null)} style={{ zIndex: 1000 }}>
          <div className="modal-content !max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-body">
              <h3 className="text-lg font-bold mb-2">Remove Administrator</h3>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to remove this administrator? They will immediately lose access to manage this organization.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowRemoveConfirm(null)}>Cancel</button>
              <button className="btn-primary" style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }} onClick={handleRemoveAdmin}>
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
      {showUnsavedModal && (
        <div className="modal-overlay" onClick={() => setShowUnsavedModal(false)} style={{ zIndex: 1000 }}>
          <div className="modal-content !max-w-md" onClick={e => e.stopPropagation()}>
            <div className="modal-body">
              <div className="flex items-start gap-4">
                <div className="modal-icon-warning">
                  <AlertTriangle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Discard unsaved changes?</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    You have unsaved edits to the organization information. If you close this, all your changes will be lost.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowUnsavedModal(false)} className="btn-secondary">Keep Editing</button>
              <button 
                onClick={() => {
                  setShowUnsavedModal(false);
                  setIsEditing(false);
                  setEditForm(clinic);
                  setErrorMsg('');
                  setDuplicateWarning(false);
                }} 
                className="btn-primary" 
                style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
