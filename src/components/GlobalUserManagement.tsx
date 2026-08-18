import { useState } from 'react';
import { Search, Filter, Shield, UserX, UserCheck, MoreVertical, Mail } from 'lucide-react';
import './Dashboard.css';

const MOCK_GLOBAL_USERS = [
  { id: 'U-001', name: 'Sarah Chen', email: 'sarah.chen@email.com', role: 'Platform Admin', clinics: ['Downtown Clinic'], status: 'Active', lastLogin: '2 mins ago' },
  { id: 'U-002', name: 'John Smith', email: 'j.smith@email.com', role: 'Clinic Admin', clinics: ['Uptown Hospital'], status: 'Active', lastLogin: '1 hour ago' },
  { id: 'U-003', name: 'Mike Johnson', email: 'm.johnson@email.com', role: 'Clinic Admin', clinics: ['North Park Clinic'], status: 'Suspended', lastLogin: '1 month ago' },
  { id: 'U-004', name: 'Emily Davis', email: 'e.davis@email.com', role: 'Doctor', clinics: ['Downtown Clinic', 'Uptown Hospital'], status: 'Active', lastLogin: '3 hours ago' },
];

export default function GlobalUserManagement() {
  const [users] = useState(MOCK_GLOBAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container h-full flex flex-col">
      <div className="dashboard-header">
        <div>
          <h1 className="text-2xl font-bold">Global Users</h1>
          <p className="text-muted">Manage staff accounts across the entire platform and invite Platform Admins.</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <Mail size={16} className="mr-2" />
            Invite Platform Admin
          </button>
        </div>
      </div>

      <div className="table-controls mt-6">
        <div className="search-bar" style={{ width: '300px' }}>
          <Search size={20} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-secondary">
          <Filter size={16} className="mr-2" />
          Filter by Role/Clinic
        </button>
      </div>

      <div className="table-container mt-4 flex-1">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Platform Role</th>
              <th>Assigned Clinics</th>
              <th>Platform Status</th>
              <th>Last Login</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center">
                    <div className="avatar mr-3">{user.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-badge ${user.role === 'Platform Admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                    {user.role === 'Platform Admin' && <Shield size={12} className="mr-1" />}
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {user.clinics.map(c => (
                      <span key={c} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${user.status === 'Active' ? 'success' : 'error'}`}>
                    {user.status === 'Active' ? <UserCheck size={12} className="mr-1" /> : <UserX size={12} className="mr-1" />}
                    {user.status}
                  </span>
                </td>
                <td className="text-sm text-gray-500">{user.lastLogin}</td>
                <td className="text-right">
                  <button className="btn-icon">
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
    </div>
  );
}
