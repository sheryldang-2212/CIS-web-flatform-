import { useState } from 'react';
import { Search, Plus, Filter, Building2, MoreVertical, CheckCircle2, XCircle, X, AlertTriangle, UserPlus, Edit2, Clock, Activity } from 'lucide-react';
import EmailDemoModal from './EmailDemoModal';
import PlatformClinicDetail from './PlatformClinicDetail';
import './PlatformAdmin.css';

const INITIAL_CLINICS = [
  { id: 'C-001', code: 'DT-CLINIC', type: 'Clinic', name: 'Downtown Clinic', legalName: 'Downtown Medical Services LLC', address: '123 Main St, City', contactEmail: 'contact@downtown.com', contactPhone: '+66812345671', country: 'Thailand', timezone: 'Asia/Bangkok', language: 'English', status: 'Active', admin: 'sarah.chen@email.com', activeAdmins: 2, pendingAdmins: 0, created: '2023-01-15', createdBy: 'System Admin', firstActivatedDate: '2023-01-20', lastStatusChangedDate: '2023-01-20', lastUpdated: '2023-08-01', updatedBy: 'System Admin' },
  { id: 'C-002', code: 'UP-HOSP', type: 'Hospital', name: 'Uptown Hospital', legalName: 'Uptown General Hospital Corp', address: '456 Oak Ave, City', contactEmail: 'info@uptown.com', contactPhone: '+66812345672', country: 'Thailand', timezone: 'Asia/Bangkok', language: 'Thai', status: 'Active', admin: 'j.smith@email.com', activeAdmins: 5, pendingAdmins: 1, created: '2023-03-22', createdBy: 'System Admin', firstActivatedDate: '2023-04-10', lastStatusChangedDate: '2023-04-10', lastUpdated: '2023-07-15', updatedBy: 'System Admin' },
  { id: 'C-003', code: 'WS-HEALTH', type: 'Clinic', name: 'Westside Health Center', legalName: 'Westside Community Health', address: '789 Pine Rd, City', contactEmail: 'hello@westside.com', contactPhone: '+66812345673', country: 'Thailand', timezone: 'Asia/Bangkok', language: 'English', status: 'Setup Pending', admin: 'Not Assigned', activeAdmins: 0, pendingAdmins: 0, created: '2023-08-10', createdBy: 'System Admin', firstActivatedDate: null, lastStatusChangedDate: '2023-08-10', lastUpdated: '2023-08-10', updatedBy: 'System Admin' },
  { id: 'C-004', code: 'NP-CLINIC', type: 'Clinic', name: 'North Park Clinic', legalName: 'North Park Care LLC', address: '321 Elm St, City', contactEmail: 'support@northpark.com', contactPhone: '+66812345674', country: 'Thailand', timezone: 'Asia/Bangkok', language: 'Thai', status: 'Suspended', admin: 'm.johnson@email.com', activeAdmins: 1, pendingAdmins: 0, created: '2022-11-05', createdBy: 'System Admin', firstActivatedDate: '2022-11-20', lastStatusChangedDate: '2023-08-01', lastUpdated: '2023-08-01', updatedBy: 'System Admin', suspensionReason: 'Non-payment of platform fees', suspendedDate: '2023-08-01', suspendedBy: 'Billing Admin' },
];

export default function PlatformClinics() {
  const [clinics, setClinics] = useState(INITIAL_CLINICS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<any | null>(null);
  
  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState<{clinic: any, newStatus: string} | null>(null);
  const [showEditModal, setShowEditModal] = useState<any | null>(null);
  const [showAssignAdminModal, setShowAssignAdminModal] = useState<any | null>(null);
  const [demoEmailData, setDemoEmailData] = useState<{email: string, clinic: any} | null>(null);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // Filter States
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [adminFilter, setAdminFilter] = useState<string>('');

  // Form State
  const [newClinic, setNewClinic] = useState({ 
    type: 'Clinic', name: '', legalName: '', address: '', country: 'Thailand', timezone: 'Asia/Bangkok', language: 'English', contactEmail: '', contactPhone: ''
  });
  const [editClinicData, setEditClinicData] = useState({ name: '', code: '', address: '' });
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [suspendReason, setSuspendReason] = useState('');

  // Flow 2 State
  const [isCreating, setIsCreating] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleNewClinicChange = (field: string, value: string) => {
    setNewClinic({...newClinic, [field]: value});
    setIsDirty(true);
  };

  const checkDuplicates = () => {
    const email = newClinic.contactEmail.trim().toLowerCase();
    const phone = newClinic.contactPhone.trim();
    const name = newClinic.name.trim().toLowerCase();
    
    // Check against existing clinics
    return clinics.some(c => 
      c.name.toLowerCase() === name || 
      // Simulated checks for legalName, email, phone assuming they were in the data structure
      (c.code === name) // Fallback generic check
    );
  };

  const filteredClinics = clinics.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter === '') {
      matchesStatus = c.status !== 'Cancelled';
    } else if (statusFilter === 'All') {
      matchesStatus = true;
    } else {
      matchesStatus = c.status === statusFilter;
    }

    let matchesAdmin = true;
    if (adminFilter === 'Assigned') {
      matchesAdmin = c.admin !== 'Not Assigned';
    } else if (adminFilter === 'Not Assigned') {
      matchesAdmin = c.admin === 'Not Assigned';
    }

    return matchesSearch && matchesStatus && matchesAdmin;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClinic.name.trim() || !newClinic.legalName.trim() || !newClinic.address.trim()) return;
    
    if (!duplicateWarning && checkDuplicates()) {
      setDuplicateWarning(true);
      return;
    }
    
    proceedCreation();
  };

  const proceedCreation = () => {
    setIsCreating(true);
    
    // Simulate network request
    setTimeout(() => {
      // Auto-generate unique code (simulate backend generation CLN-XXXXXX)
      const newCode = `CLN-${String(clinics.length + 1).padStart(6, '0')}`;
      
      const clinic = {
        id: `C-${String(clinics.length + 1).padStart(3, '0')}`,
        code: newCode,
        type: newClinic.type,
        name: newClinic.name.trim(),
        legalName: newClinic.legalName.trim(), 
        address: newClinic.address.trim(),
        contactEmail: newClinic.contactEmail.trim().toLowerCase(),
        contactPhone: newClinic.contactPhone.trim(),
        country: newClinic.country,
        timezone: newClinic.timezone,
        language: newClinic.language,
        status: 'Setup Pending',
        admin: 'Not Assigned',
        activeAdmins: 0,
        pendingAdmins: 0,
        created: new Date().toISOString().split('T')[0],
        createdBy: 'Current User',
        firstActivatedDate: null,
        lastStatusChangedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        updatedBy: 'Current User'
      };
      
      setClinics([clinic, ...clinics]);
      setShowCreateModal(false);
      setNewClinic({ type: 'Clinic', name: '', legalName: '', address: '', country: 'Thailand', timezone: 'Asia/Bangkok', language: 'English', contactEmail: '', contactPhone: '' });
      setIsDirty(false);
      setDuplicateWarning(false);
      setIsCreating(false);
      
      // Auto navigate to detail view
      setSelectedClinic(clinic);
    }, 1500);
  };

  const handleCloseCreateModal = () => {
    if (isDirty) {
      setShowUnsavedChangesModal(true);
    } else {
      setShowCreateModal(false);
    }
  };

  const handleStatusChange = () => {
    if (!showStatusConfirmModal) return;
    const { clinic, newStatus } = showStatusConfirmModal;
    
    if (newStatus === 'Suspended' && !suspendReason.trim()) {
      alert("A reason is required to suspend a clinic.");
      return;
    }

    setClinics(clinics.map(c => 
      c.id === clinic.id ? { ...c, status: newStatus } : c
    ));
    
    // Also update selectedClinic if it's currently open
    if (selectedClinic && selectedClinic.id === clinic.id) {
      setSelectedClinic({ ...selectedClinic, status: newStatus });
    }
    
    setShowStatusConfirmModal(null);
    setSuspendReason('');
  };

  const openEditModal = (clinic: any) => {
    setEditClinicData({ name: clinic.name, code: clinic.code, address: clinic.address });
    setShowEditModal(clinic);
    setShowActionMenu(null);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditModal) return;

    setClinics(clinics.map(c => 
      c.id === showEditModal.id 
        ? { ...c, name: editClinicData.name, code: editClinicData.code, address: editClinicData.address }
        : c
    ));
    setShowEditModal(null);
  };

  const openAssignAdminModal = (clinic: any) => {
    setNewAdminEmail(clinic.admin === 'Not Assigned' ? '' : clinic.admin);
    setShowAssignAdminModal(clinic);
    setShowActionMenu(null);
  };

  const handleAssignAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAssignAdminModal) return;

    setClinics(clinics.map(c => 
      c.id === showAssignAdminModal.id 
        ? { ...c, admin: newAdminEmail || 'Not Assigned' }
        : c
    ));
    
    if (selectedClinic && selectedClinic.id === showAssignAdminModal.id) {
      setSelectedClinic({ ...selectedClinic, admin: newAdminEmail || 'Not Assigned' });
    }

    setDemoEmailData({ email: newAdminEmail, clinic: showAssignAdminModal });
    setShowAssignAdminModal(null);
  };

  // If a clinic is selected, show the detail view
  if (selectedClinic) {
    return (
      <PlatformClinicDetail 
        clinic={selectedClinic}
        onUpdateClinic={(updatedClinic) => {
          setClinics(clinics.map(c => c.id === updatedClinic.id ? updatedClinic : c));
          setSelectedClinic(updatedClinic);
        }}
        onBack={() => setSelectedClinic(null)} 
        onUpdateStatus={(clinicId, newStatus) => {
          setShowStatusConfirmModal({ clinic: clinics.find(c => c.id === clinicId), newStatus });
        }}
      />
    );
  }

  return (
    <div className="dashboard-container h-full flex flex-col relative animate-fadeIn">
      <div className="dashboard-header">
        <div>
          <h1 className="text-2xl font-bold">Clinic Management</h1>
          <p className="text-muted">Manage tenant clinics, their statuses, and administrators.</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} className="mr-2" />
            Create Clinic
          </button>
        </div>
      </div>

      <div className="table-controls mt-6">
        <div className="search-bar" style={{ width: '300px' }}>
          <Search size={20} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search by name or code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <button className="btn-secondary" onClick={() => setFilterMenuOpen(!filterMenuOpen)}>
            <Filter size={16} className="mr-2" />
            Filter {(statusFilter || adminFilter) && <span className="w-2 h-2 rounded-full bg-indigo-600 ml-2"></span>}
          </button>
          
          {filterMenuOpen && (
            <div className="dropdown-menu p-4" style={{ width: '250px' }}>
              <div className="form-group mb-3">
                <label className="form-label text-xs">Status</label>
                <select className="form-input text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="">Default (Exclude Cancelled)</option>
                  <option value="All">All Statuses</option>
                  <option value="Setup Pending">Setup Pending</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-group mb-0">
                <label className="form-label text-xs">Administrator</label>
                <select className="form-input text-sm" value={adminFilter} onChange={e => setAdminFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="Assigned">Admin Assigned</option>
                  <option value="Not Assigned">Admin Not Assigned</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="table-container mt-4 flex-1">
        <table className="data-table">
          <thead>
            <tr>
              <th>Clinic Code</th>
              <th>Clinic Name & Address</th>
              <th>Status</th>
              <th>Clinic Admin(s)</th>
              <th>Last Updated</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClinics.map(clinic => (
              <tr key={clinic.id} onClick={() => setSelectedClinic(clinic)} className="cursor-pointer">
                <td className="font-medium text-indigo-600 hover:underline" onClick={(e) => { e.stopPropagation(); setSelectedClinic(clinic); }}>
                  {clinic.code}
                </td>
                <td>
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-gray-100 rounded-md">
                      <Building2 size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium">{clinic.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{clinic.address}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${clinic.status === 'Active' ? 'success' : clinic.status === 'Suspended' ? 'error' : clinic.status === 'Cancelled' ? 'bg-gray-100 text-gray-700' : 'warning'}`}>
                    {clinic.status === 'Active' && <CheckCircle2 size={12} className="mr-1" />}
                    {clinic.status === 'Suspended' && <XCircle size={12} className="mr-1" />}
                    {clinic.status === 'Cancelled' && <XCircle size={12} className="mr-1" />}
                    {clinic.status === 'Setup Pending' && <Clock size={12} className="mr-1" />}
                    {clinic.status}
                  </span>
                </td>
                <td className="text-sm">
                  {clinic.admin !== 'Not Assigned' ? (
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold mr-2">
                        {clinic.admin.charAt(0).toUpperCase()}
                      </div>
                      {clinic.admin}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Not Assigned</span>
                  )}
                </td>
                <td className="text-sm text-gray-500">Just now</td>
                <td className="text-right" style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
                  <button 
                    className="btn-icon"
                    onClick={() => setShowActionMenu(showActionMenu === clinic.id ? null : clinic.id)}
                  >
                    <MoreVertical size={16} />
                  </button>
                  
                  {/* Action Menu Dropdown */}
                  {showActionMenu === clinic.id && (
                    <div className="dropdown-menu">
                      <button className="dropdown-item" onClick={() => { setSelectedClinic(clinic); setShowActionMenu(null); }}>
                        <Search size={14} className="mr-2" /> View Details
                      </button>
                      
                      {/* Setup Pending and Active can Edit */}
                      {(clinic.status === 'Setup Pending' || clinic.status === 'Active') && (
                        <button className="dropdown-item" onClick={() => openEditModal(clinic)}>
                          <Edit2 size={14} className="mr-2" /> Edit Information
                        </button>
                      )}
                      
                      {/* Assign/Manage Admin available for Setup Pending, Active, Suspended */}
                      {clinic.status !== 'Cancelled' && (
                        <button className="dropdown-item" onClick={() => openAssignAdminModal(clinic)}>
                          <UserPlus size={14} className="mr-2" /> {clinic.admin !== 'Not Assigned' ? 'Manage Admin' : 'Assign Admin'}
                        </button>
                      )}
                      
                      {clinic.status !== 'Cancelled' && <div className="border-t my-1"></div>}
                      
                      {clinic.status === 'Setup Pending' && (
                        <>
                          <button 
                            className="dropdown-item success"
                            disabled={clinic.admin === 'Not Assigned'}
                            onClick={() => {
                              if (clinic.admin !== 'Not Assigned') {
                                setShowStatusConfirmModal({ clinic, newStatus: 'Active' });
                                setShowActionMenu(null);
                              }
                            }}
                          >
                            <CheckCircle2 size={14} className="mr-2" /> Activate Clinic
                          </button>
                          <button 
                            className="dropdown-item danger"
                            onClick={() => {
                              setShowStatusConfirmModal({ clinic, newStatus: 'Cancelled' });
                              setShowActionMenu(null);
                            }}
                          >
                            <X size={14} className="mr-2" /> Cancel Setup
                          </button>
                        </>
                      )}

                      {clinic.status === 'Active' && (
                        <button 
                          className="dropdown-item danger"
                          onClick={() => {
                            setShowStatusConfirmModal({ clinic, newStatus: 'Suspended' });
                            setShowActionMenu(null);
                          }}
                        >
                          <AlertTriangle size={14} className="mr-2" /> Suspend Clinic
                        </button>
                      )}

                      {clinic.status === 'Suspended' && (
                        <button 
                          className="dropdown-item success"
                          onClick={() => {
                            setShowStatusConfirmModal({ clinic, newStatus: 'Active' });
                            setShowActionMenu(null);
                          }}
                        >
                          <Activity size={14} className="mr-2" /> Reactivate Clinic
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredClinics.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No clinics found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Overlay for closing action menu or filter menu */}
      {(showActionMenu || filterMenuOpen) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => { setShowActionMenu(null); setFilterMenuOpen(false); }}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 5 }}
        />
      )}

      {/* Create Clinic Modal (Extended) */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={handleCloseCreateModal}>
          <div className="modal-content !max-w-2xl" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px' }}>
            <div className="modal-header">
              <h2><Building2 size={20} className="text-indigo-700" /> Create New Organization</h2>
              <button onClick={handleCloseCreateModal} className="btn-icon"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleCreateSubmit}>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                
                {duplicateWarning && (
                  <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <AlertTriangle style={{ color: '#d97706', marginRight: '12px', flexShrink: 0, marginTop: '2px' }} size={20} />
                    <div>
                      <h4 style={{ color: '#92400e', fontWeight: 700, fontSize: '14px', margin: '0 0 4px 0' }}>Potential Duplicate Detected</h4>
                      <p style={{ color: '#b45309', fontSize: '12px', margin: 0 }}>A potentially matching organization already exists based on Name, Email, or Phone. Please review it before creating a new organization.</p>
                    </div>
                  </div>
                )}
                
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginTop: 0 }}>Organization Type</h3>
                <div className="detail-grid" style={{ marginBottom: '24px', gap: '16px' }}>
                  <div className="form-group mb-0" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Type *</label>
                    <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input type="radio" name="orgType" value="Clinic" checked={newClinic.type === 'Clinic'} onChange={(e) => handleNewClinicChange('type', e.target.value)} style={{ width: '16px', height: '16px', accentColor: '#4f46e5' }} />
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Clinic</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input type="radio" name="orgType" value="Hospital" checked={newClinic.type === 'Hospital'} onChange={(e) => handleNewClinicChange('type', e.target.value)} style={{ width: '16px', height: '16px', accentColor: '#4f46e5' }} />
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Hospital</span>
                      </label>
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginTop: 0 }}>Basic Information</h3>
                <div className="detail-grid" style={{ marginBottom: '24px', gap: '16px' }}>
                  <div className="form-group mb-0">
                    <label className="form-label">Legal Name *</label>
                    <input type="text" required className="form-input" value={newClinic.legalName} onChange={(e) => handleNewClinicChange('legalName', e.target.value)} placeholder="Official registered entity name" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Display Name *</label>
                    <input type="text" required className="form-input" value={newClinic.name} onChange={(e) => handleNewClinicChange('name', e.target.value)} placeholder="e.g. City General Hospital" />
                  </div>
                </div>
                
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginTop: 0 }}>Location & Localization</h3>
                <div className="detail-grid" style={{ marginBottom: '24px', gap: '16px' }}>
                  <div className="form-group mb-0" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Physical Address *</label>
                    <input type="text" required className="form-input" value={newClinic.address} onChange={(e) => handleNewClinicChange('address', e.target.value)} placeholder="Full physical address" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Country (Locked for MVP) *</label>
                    <select className="form-input bg-gray-100 cursor-not-allowed" value={newClinic.country} disabled style={{ backgroundColor: '#f3f4f6' }}>
                      <option value="Thailand">Thailand</option>
                    </select>
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Timezone (Locked for MVP) *</label>
                    <select className="form-input bg-gray-100 cursor-not-allowed" value={newClinic.timezone} disabled style={{ backgroundColor: '#f3f4f6' }}>
                      <option value="Asia/Bangkok">Asia/Bangkok (UTC+7)</option>
                    </select>
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Default Language *</label>
                    <select className="form-input" value={newClinic.language} onChange={(e) => handleNewClinicChange('language', e.target.value)}>
                      <option value="English">English</option>
                      <option value="Thai">Thai</option>
                    </select>
                  </div>
                </div>

                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginTop: 0 }}>Contact Details</h3>
                <div className="detail-grid" style={{ marginBottom: '24px', gap: '16px' }}>
                  <div className="form-group mb-0">
                    <label className="form-label">Contact Email *</label>
                    <input type="email" required className="form-input" value={newClinic.contactEmail} onChange={(e) => handleNewClinicChange('contactEmail', e.target.value)} placeholder="info@clinic.com" />
                    <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', margin: '4px 0 0 0' }}>General contact email. Not the admin account.</p>
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Contact Phone *</label>
                    <input type="tel" required className="form-input" value={newClinic.contactPhone} onChange={(e) => handleNewClinicChange('contactPhone', e.target.value)} placeholder="+66..." />
                    <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', margin: '4px 0 0 0' }}>International format (e.g. +66812345678)</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={handleCloseCreateModal} className="btn-secondary" disabled={isCreating}>Cancel</button>
                
                {duplicateWarning ? (
                  <button type="button" onClick={proceedCreation} className="btn-primary bg-amber-600 hover:bg-amber-700 border-amber-600" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Proceed Anyway'}
                  </button>
                ) : (
                  <button type="submit" className="btn-primary" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Organization'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Unsaved Changes Confirmation Modal */}
      {showUnsavedChangesModal && (
        <div className="modal-overlay" onClick={() => setShowUnsavedChangesModal(false)} style={{ zIndex: 1000 }}>
          <div className="modal-content !max-w-md" onClick={e => e.stopPropagation()}>
            <div className="modal-body">
              <div className="flex items-start gap-4">
                <div className="modal-icon-warning">
                  <AlertTriangle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Discard unsaved changes?</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    You have entered information for a new organization. If you close this window, all unsaved information will be lost.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowUnsavedChangesModal(false)} className="btn-secondary">Keep Editing</button>
              <button 
                onClick={() => {
                  setShowUnsavedChangesModal(false);
                  setShowCreateModal(false);
                  setIsDirty(false);
                  setDuplicateWarning(false);
                  setNewClinic({ type: 'Clinic', name: '', legalName: '', address: '', country: 'Thailand', timezone: 'Asia/Bangkok', language: 'English', contactEmail: '', contactPhone: '' });
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

      {/* Edit Clinic Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><Edit2 size={20} className="text-blue-600" /> Edit Clinic Details</h2>
              <button onClick={() => setShowEditModal(null)} className="btn-icon"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Clinic Name *</label>
                  <input type="text" required className="form-input" value={editClinicData.name} onChange={(e) => setEditClinicData({...editClinicData, name: e.target.value})} />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Clinic Code (Cannot be changed)</label>
                  <input type="text" disabled className="form-input mono bg-gray-100 cursor-not-allowed" value={editClinicData.code} />
                </div>
                
                <div className="form-group mb-0">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-input" value={editClinicData.address} onChange={(e) => setEditClinicData({...editClinicData, address: e.target.value})} />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowEditModal(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Admin Modal */}
      {showAssignAdminModal && (
        <div className="modal-overlay" onClick={() => setShowAssignAdminModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><UserPlus size={20} className="text-indigo-700" /> Assign Clinic Admin</h2>
              <button onClick={() => setShowAssignAdminModal(null)} className="btn-icon"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAssignAdminSubmit}>
              <div className="modal-body">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Assigning a new administrator for <strong>{showAssignAdminModal.name}</strong>.</p>
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Admin Email Address *</label>
                  <input type="email" required className="form-input" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} placeholder="admin@clinic.com" />
                  <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-xs rounded-r-md">
                    An invitation link will be sent to this email address.
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAssignAdminModal(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Confirmation Modal */}
      {showStatusConfirmModal && (
        <div className="modal-overlay" onClick={() => {
          setShowStatusConfirmModal(null);
          setSuspendReason('');
        }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-body">
              <div className="flex items-start gap-4">
                <div className={
                  showStatusConfirmModal.newStatus === 'Suspended' || showStatusConfirmModal.newStatus === 'Cancelled' 
                  ? 'modal-icon-warning' 
                  : 'modal-icon-success'
                }>
                  {showStatusConfirmModal.newStatus === 'Suspended' || showStatusConfirmModal.newStatus === 'Cancelled' 
                    ? <AlertTriangle size={24} /> 
                    : <CheckCircle2 size={24} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    {showStatusConfirmModal.newStatus === 'Suspended' && 'Suspend Clinic?'}
                    {showStatusConfirmModal.newStatus === 'Active' && 'Activate Clinic?'}
                    {showStatusConfirmModal.newStatus === 'Cancelled' && 'Cancel Clinic Setup?'}
                  </h3>
                  
                  <div className="text-sm text-gray-600 leading-relaxed mb-4">
                    {showStatusConfirmModal.newStatus === 'Suspended' && (
                      <>
                        <p className="mb-2">Are you sure you want to suspend <strong>{showStatusConfirmModal.clinic.name}</strong>?</p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 font-medium">
                          <li>Staff will be immediately blocked from logging in.</li>
                          <li>No new Lab Orders can be created.</li>
                          <li><span className="text-indigo-600">LIS results for already sent orders will continue to be received.</span></li>
                        </ul>
                      </>
                    )}
                    {showStatusConfirmModal.newStatus === 'Active' && (
                      <p>Activate <strong>{showStatusConfirmModal.clinic.name}</strong>? Clinic staff will gain access to the platform.</p>
                    )}
                    {showStatusConfirmModal.newStatus === 'Cancelled' && (
                      <p>Cancel setup for <strong>{showStatusConfirmModal.clinic.name}</strong>? This action cannot be undone. The Clinic Code will not be available for reuse.</p>
                    )}
                  </div>

                  {(showStatusConfirmModal.newStatus === 'Suspended' || showStatusConfirmModal.newStatus === 'Cancelled') && (
                    <div className="form-group mb-0">
                      <label className="form-label">Reason Required *</label>
                      <textarea 
                        required
                        className="form-input" 
                        rows={3} 
                        placeholder="Please provide a reason for the audit log..."
                        value={suspendReason}
                        onChange={(e) => setSuspendReason(e.target.value)}
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => {
                setShowStatusConfirmModal(null);
                setSuspendReason('');
              }} className="btn-secondary">Cancel</button>
              <button 
                onClick={handleStatusChange} 
                className="btn-primary" 
                style={{ backgroundColor: (showStatusConfirmModal.newStatus === 'Suspended' || showStatusConfirmModal.newStatus === 'Cancelled') ? '#dc2626' : '#16a34a' }}
              >
                {showStatusConfirmModal.newStatus === 'Suspended' && 'Suspend Clinic'}
                {showStatusConfirmModal.newStatus === 'Active' && 'Activate Clinic'}
                {showStatusConfirmModal.newStatus === 'Cancelled' && 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Email Modal */}
      {demoEmailData && (
        <EmailDemoModal 
          email={demoEmailData.email}
          subject={`Invitation to administer ${demoEmailData.clinic.name}`}
          greeting="Dear Administrator,"
          body1={<>You have been invited to serve as the <strong>Clinic Administrator</strong> for <strong>{demoEmailData.clinic.name}</strong> on the Health Hub Platform.</>}
          body2="To accept this invitation and access the clinic's management dashboard, please set up your account credentials and two-factor authentication."
          buttonText="Accept Invitation & Setup Account"
          onClose={() => setDemoEmailData(null)}
          onAccept={() => setDemoEmailData(null)}
        />
      )}
    </div>
  );
}
