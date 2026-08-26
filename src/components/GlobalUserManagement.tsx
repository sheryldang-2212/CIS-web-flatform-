import { useState } from 'react';
import { Search, Filter, Shield, UserX, UserCheck, MoreVertical, Mail, X, AlertCircle } from 'lucide-react';
import './Dashboard.css';

interface UserClinic {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Invitation Pending' | 'Suspended' | 'Removed';
}

interface GlobalUser {
  id: string;
  name: string;
  email: string;
  globalRole: string;
  globalStatus: 'Active' | 'Invitation Pending' | 'Temporarily Locked' | 'Suspended';
  lastLogin: string;
  clinics: UserClinic[];
}

const MOCK_GLOBAL_USERS: GlobalUser[] = [
  { 
    id: 'U-001', name: 'Sarah Chen', email: 'sarah.chen@email.com', globalRole: 'Platform Admin', globalStatus: 'Active', lastLogin: '2 mins ago',
    clinics: [
      { id: 'clinic-1', name: 'Downtown Clinic', role: 'Clinic Admin', status: 'Active' }
    ]
  },
  { 
    id: 'U-002', name: 'John Smith', email: 'j.smith@email.com', globalRole: 'User', globalStatus: 'Active', lastLogin: '1 hour ago',
    clinics: [
      { id: 'clinic-2', name: 'Uptown Hospital', role: 'Clinic Admin', status: 'Active' }
    ]
  },
  { 
    id: 'U-003', name: 'Mike Johnson', email: 'm.johnson@email.com', globalRole: 'User', globalStatus: 'Suspended', lastLogin: '1 month ago',
    clinics: [
      { id: 'clinic-3', name: 'North Park Clinic', role: 'Clinic Admin', status: 'Suspended' }
    ]
  },
  { 
    id: 'U-004', name: 'Emily Davis', email: 'e.davis@email.com', globalRole: 'User', globalStatus: 'Invitation Pending', lastLogin: '-',
    clinics: [
      { id: 'clinic-1', name: 'Downtown Clinic', role: 'Doctor', status: 'Invitation Pending' },
      { id: 'clinic-2', name: 'Uptown Hospital', role: 'Doctor', status: 'Invitation Pending' }
    ]
  },
];

export default function GlobalUserManagement() {
  const [users] = useState<GlobalUser[]>(MOCK_GLOBAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<GlobalUser | null>(null);
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{title: string, message: string, onConfirm: () => void} | null>(null);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (title: string, message: string) => {
    setConfirmAction({
      title,
      message,
      onConfirm: () => {
        // Mock action execution
        setShowConfirmModal(false);
      }
    });
    setShowConfirmModal(true);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden p-6 bg-slate-50/50">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="prem-title">Global Users</h1>
          <p className="prem-subtitle mt-2">Manage staff accounts across the entire platform and invite Platform Admins.</p>
        </div>
        <div className="header-actions">
          <button className="prem-btn-primary" onClick={() => handleAction('Invite Platform Admin', 'Are you sure you want to invite a new Platform Admin? This grants system-wide access.')}>
            <Mail size={16} />
            Invite Platform Admin
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 glass-panel p-4">
        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200" style={{ width: '300px' }}>
          <Search size={18} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="bg-transparent border-none outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button className="prem-btn-secondary">
            <Filter size={16} /> Status Filter
          </button>
          <button className="prem-btn-secondary">
            <Filter size={16} /> Role Filter
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto glass-panel p-1">
        <table className="prem-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Platform Role</th>
              <th>Assigned Clinics</th>
              <th>Global Status</th>
              <th>Last Login</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="prem-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <div className="font-semibold text-slate-800">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`prem-badge ${user.globalRole === 'Platform Admin' ? 'primary' : 'bg-slate-100 text-slate-600'}`}>
                    {user.globalRole === 'Platform Admin' && <Shield size={12} />}
                    {user.globalRole}
                  </span>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {user.clinics.slice(0, 2).map(c => (
                      <span key={c.id} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium border border-indigo-100">
                        {c.name} <span className="opacity-70 font-normal">({c.role})</span>
                      </span>
                    ))}
                    {user.clinics.length > 2 && <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">+{user.clinics.length - 2}</span>}
                  </div>
                </td>
                <td>
                  <span className={`prem-badge ${user.globalStatus === 'Active' ? 'success' : user.globalStatus === 'Suspended' ? 'danger' : 'warning'}`}>
                    {user.globalStatus === 'Active' ? <UserCheck size={12} /> : <UserX size={12} />}
                    {user.globalStatus}
                  </span>
                </td>
                <td className="text-sm font-medium text-slate-500">{user.lastLogin}</td>
                <td className="text-right">
                  <button className="text-slate-400 hover:text-indigo-600 transition-colors p-2" onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}>
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Detail Drawer */}
      {selectedUser && (
        <div className="prem-drawer-overlay">
          <div className="prem-drawer-content">
            <div className="p-6 border-b border-slate-200/60 flex justify-between items-center bg-white/50 backdrop-blur-md">
              <h2 className="text-lg font-bold text-slate-800">User Details</h2>
              <button className="text-slate-400 hover:text-slate-700 transition-colors" onClick={() => setSelectedUser(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="prem-avatar w-16 h-16 text-xl">{selectedUser.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{selectedUser.name}</h3>
                  <p className="text-slate-500 text-sm mb-2">{selectedUser.email}</p>
                  <span className={`prem-badge ${selectedUser.globalStatus === 'Active' ? 'success' : selectedUser.globalStatus === 'Suspended' ? 'danger' : 'warning'}`}>
                    Global: {selectedUser.globalStatus}
                  </span>
                </div>
              </div>

              <div className="mb-8 glass-panel p-5 border-none shadow-sm bg-white/60">
                <h4 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wider">Global Actions</h4>
                <div className="flex flex-col gap-3">
                  {selectedUser.globalStatus === 'Suspended' ? (
                    <button className="prem-btn-secondary w-full justify-center text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100" onClick={() => handleAction('Enable Account', `Re-enable global account for ${selectedUser.name}?`)}>
                      Enable Global Account
                    </button>
                  ) : (
                    <button className="prem-btn-secondary w-full justify-center text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100" onClick={() => handleAction('Suspend Account', `Suspend global account for ${selectedUser.name}? They will lose access to all clinics.`)}>
                      Suspend Global Account
                    </button>
                  )}
                  {selectedUser.globalStatus === 'Invitation Pending' && (
                    <button className="prem-btn-primary w-full justify-center" onClick={() => handleAction('Resend Invitation', `Resend activation email to ${selectedUser.email}?`)}>
                      Resend Invitation
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Clinic Assignments</h4>
                  <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors" onClick={() => handleAction('Assign Clinic', 'Assign user to a new clinic.')}>
                    + Assign
                  </button>
                </div>
                
                <div className="flex flex-col gap-3">
                  {selectedUser.clinics.map(clinic => (
                    <div key={clinic.id} className="border border-slate-200/80 rounded-xl p-4 bg-white/80 shadow-sm transition-all hover:shadow-md hover:border-indigo-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-slate-800">{clinic.name}</div>
                          <div className="text-sm font-medium text-slate-500 mt-0.5">{clinic.role}</div>
                        </div>
                        <span className={`prem-badge ${clinic.status === 'Active' ? 'success' : clinic.status === 'Suspended' ? 'danger' : 'warning'}`}>
                          {clinic.status}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-slate-100">
                        {clinic.status !== 'Suspended' && (
                          <button className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors" onClick={() => handleAction('Remove Assignment', `Remove ${clinic.role} access from ${clinic.name}?`)}>
                            Remove Access
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {selectedUser.clinics.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-6 bg-slate-50 rounded-xl">No clinics assigned</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && confirmAction && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <div className="modal-header pb-0 border-0 flex justify-between items-start">
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle size={24} />
                <h2 className="text-lg font-bold text-gray-900">{confirmAction.title}</h2>
              </div>
              <button className="btn-icon" onClick={() => setShowConfirmModal(false)}><X size={20}/></button>
            </div>
            <div className="modal-body py-4">
              <p className="text-gray-600">{confirmAction.message}</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className="btn-primary bg-red-600 border-red-600 hover:bg-red-700 text-white" onClick={confirmAction.onConfirm}>
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
