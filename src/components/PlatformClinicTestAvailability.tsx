import { useState } from 'react';
import { Search, Database, Check } from 'lucide-react';
import './PlatformAdmin.css';

// Mock data representing the Global Test Master
const GLOBAL_TESTS = [
  { id: 't1', code: 'HEM-001', name: 'Complete Blood Count (CBC)', category: 'Hematology', active: true },
  { id: 't2', code: 'HEM-002', name: 'Hemoglobin', category: 'Hematology', active: true },
  { id: 't3', code: 'BIO-001', name: 'Fasting Glucose', category: 'Biochemistry', active: true },
  { id: 't4', code: 'BIO-002', name: 'HbA1c', category: 'Biochemistry', active: true },
  { id: 't5', code: 'BIO-003', name: 'Lipid Profile', category: 'Biochemistry', active: true },
  { id: 't6', code: 'IMM-001', name: 'TSH', category: 'Immunology', active: true },
  { id: 't7', code: 'IMM-002', name: 'Free T4', category: 'Immunology', active: false },
  { id: 't8', code: 'MIC-001', name: 'Urine Culture', category: 'Microbiology', active: true },
];

export default function PlatformClinicTestAvailability({ clinic, isEditing }: { clinic: any; isEditing?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Mock clinic allowed tests
  const [allowedTests, setAllowedTests] = useState<string[]>(['t1', 't2', 't3', 't4']);

  const categories = ['All', ...Array.from(new Set(GLOBAL_TESTS.map(t => t.category)))];

  const filteredTests = GLOBAL_TESTS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleTest = (testId: string) => {
    if (!isEditing) return;
    setAllowedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const toggleAllInCategory = (category: string) => {
    if (!isEditing) return;
    const testsInCategory = GLOBAL_TESTS.filter(t => category === 'All' || t.category === category).map(t => t.id);
    const allAssigned = testsInCategory.every(id => allowedTests.includes(id));
    
    if (allAssigned) {
      setAllowedTests(prev => prev.filter(id => !testsInCategory.includes(id)));
    } else {
      setAllowedTests(prev => {
        const newSet = new Set([...prev, ...testsInCategory]);
        return Array.from(newSet);
      });
    }
  };

  return (
    <div className="detail-card fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <div style={{ padding: '6px', backgroundColor: '#eff6ff', borderRadius: '6px', color: '#3b82f6' }}>
              <Database size={18} />
            </div>
            Test Availability for {clinic.name}
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>
            Select the tests from the Global Test Master that this clinic is permitted to offer.
          </p>
        </div>
        <div className="search-bar" style={{ minWidth: '300px' }}>
          <Search size={16} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search tests by code or name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
              border: '1px solid',
              borderColor: activeCategory === cat ? 'var(--primary)' : '#e2e8f0',
              backgroundColor: activeCategory === cat ? 'var(--primary)' : 'white',
              color: activeCategory === cat ? 'white' : '#475569',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="table-container">
        <div style={{ padding: '12px 16px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
            {activeCategory} Tests ({filteredTests.length})
          </span>
          {isEditing && (
            <button 
              onClick={() => toggleAllInCategory(activeCategory)}
              style={{ fontSize: '13px', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
            >
              {filteredTests.every(t => allowedTests.includes(t.id)) && filteredTests.length > 0 ? 'Deselect All' : 'Select All in Category'}
            </button>
          )}
        </div>
        <table className="data-table">
          <thead>
            <tr>
              {isEditing && <th style={{ width: '40px', textAlign: 'center' }}>Allow</th>}
              <th>Test Code</th>
              <th>Test Name</th>
              <th>Category</th>
              <th>Global Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.map(test => {
              const isAllowed = allowedTests.includes(test.id);
              return (
                <tr key={test.id} onClick={() => toggleTest(test.id)} style={{ cursor: isEditing ? 'pointer' : 'default' }}>
                  {isEditing && (
                    <td style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: '1px solid',
                        borderColor: isAllowed ? 'var(--primary)' : '#cbd5e1',
                        backgroundColor: isAllowed ? 'var(--primary)' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto'
                      }}>
                        {isAllowed && <Check size={12} color="white" />}
                      </div>
                    </td>
                  )}
                  <td>
                    <span style={{ fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', color: '#475569' }}>
                      {test.code}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{test.name}</td>
                  <td>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 500, backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                      {test.category}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${test.active ? 'success' : 'bg-gray-100 text-gray-500'}`}>
                      {test.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              );
            })}
            {filteredTests.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
                  No tests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
