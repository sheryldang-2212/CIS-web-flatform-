import { useState } from 'react';
import { Search, Link, Filter, FileEdit } from 'lucide-react';
import './Dashboard.css';

const MOCK_MAPPINGS = [
  { id: 'TEST-001', cisName: 'Complete Blood Count', lisCode: 'CBC_01', lisName: 'CBC w/ Auto Diff', specimen: 'Blood', status: 'Mapped' },
  { id: 'TEST-002', cisName: 'Fasting Blood Sugar', lisCode: 'FBS_01', lisName: 'Glucose, Fasting', specimen: 'Blood', status: 'Mapped' },
  { id: 'TEST-003', cisName: 'Lipid Profile', lisCode: 'LIP_PROF', lisName: 'Lipid Panel', specimen: 'Blood', status: 'Mapped' },
  { id: 'TEST-004', cisName: 'Urinalysis', lisCode: '', lisName: '', specimen: 'Urine', status: 'Unmapped' },
  { id: 'TEST-005', cisName: 'HbA1c', lisCode: 'HBA1C_01', lisName: 'Hemoglobin A1c', specimen: 'Blood', status: 'Mapped' },
];

export default function LISMappingManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMappings = MOCK_MAPPINGS.filter(m => 
    m.cisName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.lisCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container h-full flex flex-col">
      <div className="dashboard-header">
        <div>
          <h1 className="text-2xl font-bold">LIS Mapping</h1>
          <p className="text-muted">Manage mapping between CIS Test Names and LIS Test Codes. Clinical definitions are managed by the Laboratory.</p>
        </div>
      </div>

      <div className="table-controls mt-6">
        <div className="search-bar" style={{ width: '350px' }}>
          <Search size={20} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search by CIS Name or LIS Code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-secondary">
          <Filter size={16} className="mr-2" />
          Status: All
        </button>
      </div>

      <div className="table-container mt-4 flex-1">
        <table className="data-table">
          <thead>
            <tr>
              <th>CIS Test ID & Name</th>
              <th>Specimen Type</th>
              <th>Mapping Status</th>
              <th>LIS Test Code & Name</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMappings.map(mapping => (
              <tr key={mapping.id}>
                <td>
                  <div className="font-medium text-gray-900">{mapping.cisName}</div>
                  <div className="text-xs text-gray-500 font-mono mt-1">{mapping.id}</div>
                </td>
                <td className="text-sm">{mapping.specimen}</td>
                <td>
                  <span className={`status-badge ${mapping.status === 'Mapped' ? 'success' : 'warning'}`}>
                    <Link size={12} className="mr-1" />
                    {mapping.status}
                  </span>
                </td>
                <td>
                  {mapping.status === 'Mapped' ? (
                    <div>
                      <div className="font-medium font-mono text-indigo-700">{mapping.lisCode}</div>
                      <div className="text-xs text-gray-500 mt-1">{mapping.lisName}</div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400 italic">No mapping provided</span>
                  )}
                </td>
                <td className="text-right">
                  <button className="btn-icon" title="Edit Mapping">
                    <FileEdit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
