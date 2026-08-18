import { useState } from 'react';
import { ToggleLeft, ToggleRight, Info } from 'lucide-react';
import './Dashboard.css';

const MOCK_FLAGS = [
  { id: 'MULTI_CLINIC', name: 'Multi-Clinic Management', description: 'Enable Platform Administration and tenant isolation.', status: true, scope: 'Global' },
  { id: 'PATIENT_APP', name: 'Patient Mobile App', description: 'Allow patients to log in via mobile application.', status: false, scope: 'Global' },
  { id: 'LIS_INTEGRATION', name: 'LIS Integration', description: 'Enable bidirectional sync with Laboratory Information System.', status: true, scope: 'Clinic' },
  { id: 'AI_HEALTH_SCORE', name: 'AI Health Score', description: 'Show AI-generated health scores on patient profiles.', status: false, scope: 'Global' },
];

export default function FeatureFlagManagement() {
  const [flags, setFlags] = useState(MOCK_FLAGS);

  const toggleFlag = (id: string) => {
    setFlags(flags.map(f => f.id === id ? { ...f, status: !f.status } : f));
  };

  return (
    <div className="dashboard-container h-full flex flex-col">
      <div className="dashboard-header">
        <div>
          <h1 className="text-2xl font-bold">Feature Flags</h1>
          <p className="text-muted">Manage global and clinic-level capabilities.</p>
        </div>
      </div>

      <div className="table-container mt-6 flex-1">
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature Name</th>
              <th>Scope</th>
              <th>Description</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {flags.map(flag => (
              <tr key={flag.id}>
                <td className="font-medium">
                  {flag.name}
                  <div className="text-xs text-gray-500 font-mono mt-1">{flag.id}</div>
                </td>
                <td>
                  <span className={`role-badge ${flag.scope === 'Global' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {flag.scope}
                  </span>
                </td>
                <td className="text-sm text-gray-600 max-w-md">
                  {flag.description}
                </td>
                <td className="text-center">
                  <button 
                    className="btn-icon" 
                    onClick={() => toggleFlag(flag.id)}
                    style={{ color: flag.status ? '#16a34a' : '#9ca3af' }}
                  >
                    {flag.status ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                  <div className="text-xs mt-1" style={{ color: flag.status ? '#16a34a' : '#9ca3af' }}>
                    {flag.status ? 'Enabled' : 'Disabled'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-md flex items-start">
          <Info size={20} className="mr-3 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong>Note:</strong> Disabling a feature flag will hide its corresponding UI elements and APIs, but will <strong>not</strong> delete any underlying data. 
            Modifying global feature flags may affect active users.
          </div>
        </div>
      </div>
    </div>
  );
}
