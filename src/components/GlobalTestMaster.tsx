import { useState } from 'react';
import { Search, RefreshCw, Database, Filter } from 'lucide-react';
import './GlobalTestMaster.css';

// Mock data for Global Test Master from LIS
const INITIAL_TESTS = [
  { id: 't1', code: 'HEM-001', name: 'Complete Blood Count (CBC)', category: 'Hematology', unit: '—', lisCode: 'LIS-CBC', refRange: 'Male: 13.5-17.5 g/dL\nFemale: 12.0-15.5 g/dL', active: true },
  { id: 't2', code: 'HEM-002', name: 'Hemoglobin', category: 'Hematology', unit: 'g/dL', lisCode: 'LIS-HGB', refRange: 'Male: 13.5-17.5\nFemale: 12.0-15.5', active: true },
  { id: 't3', code: 'BIO-001', name: 'Fasting Glucose', category: 'Biochemistry', unit: 'mg/dL', lisCode: 'LIS-GLU-F', refRange: '70 - 99', active: true },
  { id: 't4', code: 'BIO-002', name: 'HbA1c', category: 'Biochemistry', unit: '%', lisCode: 'LIS-HBA1C', refRange: '< 5.7', active: true },
  { id: 't5', code: 'BIO-003', name: 'Lipid Profile', category: 'Biochemistry', unit: 'mg/dL', lisCode: 'LIS-LIPID', refRange: 'LDL < 100\nHDL > 40', active: true },
  { id: 't6', code: 'IMM-001', name: 'TSH', category: 'Immunology', unit: 'mIU/L', lisCode: 'LIS-TSH', refRange: '0.4 - 4.0', active: true },
  { id: 't7', code: 'IMM-002', name: 'Free T4', category: 'Immunology', unit: 'ng/dL', lisCode: 'LIS-FT4', refRange: '0.8 - 1.8', active: false },
  { id: 't8', code: 'MIC-001', name: 'Urine Culture', category: 'Microbiology', unit: 'CFU/mL', lisCode: 'LIS-UR-CULT', refRange: '< 10,000', active: true },
];

export default function GlobalTestMaster() {
  const [tests, setTests] = useState(INITIAL_TESTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      // In a real app, this would fetch updated list from LIS
    }, 1500);
  };

  const toggleStatus = (id: string) => {
    setTests(tests.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  const filteredTests = tests.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="global-test-master-container fadeIn">
      <div className="gtm-header">
        <div className="gtm-title-area">
          <h2><Database size={24} style={{ color: 'var(--primary)' }}/> Global Test Master</h2>
          <p>Centralized catalog of all available laboratory tests synchronized from LIS.</p>
        </div>
        <div className="gtm-actions">
          <button 
            className="btn-primary" 
            onClick={handleSync} 
            disabled={isSyncing}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={16} className={isSyncing ? 'spin' : ''} /> 
            {isSyncing ? 'Syncing...' : 'Sync from LIS'}
          </button>
        </div>
      </div>

      <div className="gtm-filters">
        <div className="gtm-search">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by code, name or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="gtm-table-container">
        <table className="gtm-table">
          <thead>
            <tr>
              <th>Test Code</th>
              <th>Test Name & Category</th>
              <th>Unit</th>
              <th>LIS Mapping</th>
              <th>Reference Range</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.map(test => (
              <tr key={test.id} style={{ opacity: test.active ? 1 : 0.6 }}>
                <td>
                  <span className="gtm-test-code">{test.code}</span>
                </td>
                <td>
                  <div className="gtm-test-name">{test.name}</div>
                  <span className="gtm-category-badge">{test.category}</span>
                </td>
                <td>{test.unit}</td>
                <td>
                  <div className="gtm-lis-mapping">
                    <Database size={14} /> {test.lisCode}
                  </div>
                </td>
                <td>
                  <div className="gtm-ref-range">{test.refRange}</div>
                </td>
                <td>
                  <div className="gtm-status-cell">
                    <label className="gtm-toggle">
                      <input 
                        type="checkbox" 
                        checked={test.active}
                        onChange={() => toggleStatus(test.id)}
                      />
                      <span className="gtm-slider"></span>
                    </label>
                    <span className={`gtm-status-text ${test.active ? 'gtm-status-active' : 'gtm-status-inactive'}`}>
                      {test.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTests.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
                  No tests found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
