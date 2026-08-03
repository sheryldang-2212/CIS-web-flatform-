import React, { useState } from 'react';
import { Search, Check, Plus, Edit2, Trash2, X, Package, FileText, Barcode, FlaskConical, Save } from 'lucide-react';
import { useClinicConfig } from '../context/ClinicConfigContext';
import './ServicesAndPackages.css';

export default function ServicesAndPackages() {
  const { categories, setCategories, packages, setPackages } = useClinicConfig();
  
  const [activeTab, setActiveTab] = useState<'tests' | 'packages'>('tests');
  
  // State for Categories and Tests
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name || '');
  const [enabledTests, setEnabledTests] = useState<string[]>(['CBC', 'Hemoglobin', 'Glucose', 'HbA1c', 'TSH']);
  const [searchQuery, setSearchQuery] = useState('');

  // Add new Category State
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Add new Test State
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [newTestName, setNewTestName] = useState('');

  // State for Packages
  const [showDrawer, setShowDrawer] = useState(false);
  
  // New Package Form State
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgCode, setNewPkgCode] = useState('');
  const [newPkgTests, setNewPkgTests] = useState<string[]>([]);

  // Auto-generate package code based on name
  React.useEffect(() => {
    if (newPkgName) {
      const initials = newPkgName
        .split(' ')
        .filter(w => w.length > 0)
        .map(w => w.charAt(0).toUpperCase())
        .join('')
        .substring(0, 3);
      const nextId = String(packages.length + 1).padStart(3, '0');
      setNewPkgCode(`${initials ? initials + '-' : 'PKG-'}${nextId}`);
    } else {
      setNewPkgCode('');
    }
  }, [newPkgName, packages.length]);

  // --- Handlers ---
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    setCategories([...categories, { name: newCategoryName, tests: [] }]);
    setNewCategoryName('');
    setIsAddingCategory(false);
    setActiveCategory(newCategoryName); // Auto-select the new category
  };

  const handleAddTest = () => {
    if (!newTestName.trim()) return;
    setCategories(prev => prev.map(cat => {
      if (cat.name === activeCategory) {
        return { ...cat, tests: [...cat.tests, newTestName] };
      }
      return cat;
    }));
    // Auto-enable the newly added test
    setEnabledTests(prev => [...prev, newTestName]);
    setNewTestName('');
    setIsAddingTest(false);
  };

  const toggleTest = (testName: string) => {
    setEnabledTests(prev => 
      prev.includes(testName) ? prev.filter(t => t !== testName) : [...prev, testName]
    );
  };

  const toggleNewPkgTest = (testName: string) => {
    setNewPkgTests(prev => 
      prev.includes(testName) ? prev.filter(t => t !== testName) : [...prev, testName]
    );
  };

  const handleSavePackage = () => {
    if (!newPkgName.trim() || !newPkgCode.trim()) return;
    const newPkg = {
      id: `pkg-${Date.now()}`,
      name: newPkgName,
      code: newPkgCode,
      tests: newPkgTests
    };
    setPackages([...packages, newPkg]);
    setShowDrawer(false);
    setNewPkgName('');
    setNewPkgCode('');
    setNewPkgTests([]);
  };

  // --- Filtered Data ---
  const filteredCategories = categories.map(cat => ({
    ...cat,
    tests: cat.tests.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(cat => cat.tests.length > 0 || cat.name === activeCategory); // Keep active category even if empty so we can add tests


  return (
    <div className="services-packages-container">
      {/* Horizontal Tabs */}
      <div className="sp-tabs">
        <button 
          className={`sp-tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          Test Availability
        </button>
        <button 
          className={`sp-tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
          onClick={() => setActiveTab('packages')}
        >
          Health Packages
        </button>
      </div>

      <div className="sp-content">
        
        {/* --- TAB: TEST AVAILABILITY --- */}
        {activeTab === 'tests' && (
          <div className="tab-pane fadeIn">
            <div className="sp-header-row">
              <div>
                <h2 className="sp-title">Clinic-Specific Test Availability</h2>
                <p className="sp-subtitle">Enable tests available at this clinic. Receptionists will only see enabled tests.</p>
              </div>
              <div className="sp-search-bar">
                <Search size={16} className="text-muted" />
                <input 
                  type="text" 
                  placeholder="Search tests..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="master-detail-layout">
              {/* Sidebar: Categories */}
              <div className="master-sidebar">
                {categories.map(cat => {
                  const enabledCount = cat.tests.filter(t => enabledTests.includes(t)).length;
                  return (
                    <button
                      key={cat.name}
                      className={`sidebar-cat-btn ${activeCategory === cat.name ? 'active' : ''}`}
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setIsAddingTest(false);
                      }}
                    >
                      <span className="cat-name">
                        <FlaskConical size={16} /> {cat.name}
                      </span>
                      <span className="cat-count">{enabledCount}/{cat.tests.length}</span>
                    </button>
                  );
                })}

                {/* Add Category UI */}
                {isAddingCategory ? (
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'white' }}>
                    <input 
                      autoFocus
                      type="text" 
                      className="form-input" 
                      placeholder="Category name"
                      style={{ padding: '8px 12px', fontSize: '13px', marginBottom: '8px' }}
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', flex: 1 }} onClick={handleAddCategory}>Save</button>
                      <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setIsAddingCategory(false)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button 
                    className="sidebar-cat-btn" 
                    style={{ justifyContent: 'center', color: 'var(--primary)', fontWeight: 600 }}
                    onClick={() => setIsAddingCategory(true)}
                  >
                    <Plus size={16} /> Add Category
                  </button>
                )}
              </div>

              {/* Detail Content: Tests in Selected Category */}
              <div className="detail-content">
                <div className="detail-header">
                  <div>
                    <h3 className="detail-title">{activeCategory} Tests</h3>
                    <p className="detail-subtitle">Manage availability for all tests under {activeCategory}.</p>
                  </div>
                  <button className="btn-primary" onClick={() => setIsAddingTest(true)}>
                    <Plus size={16} /> Add Test
                  </button>
                </div>
                
                <div className="test-settings-list">
                  {/* Inline Add Test Form */}
                  {isAddingTest && (
                    <div className="test-setting-row" style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--primary)' }}>
                      <div className="test-setting-info" style={{ flex: 1, marginRight: '16px' }}>
                        <input 
                          autoFocus
                          type="text" 
                          className="form-input" 
                          placeholder="Enter new test name..."
                          value={newTestName}
                          onChange={(e) => setNewTestName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddTest()}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                         <button className="btn-primary" style={{ padding: '8px 16px' }} onClick={handleAddTest}>
                           <Save size={16} /> Save
                         </button>
                         <button className="btn-secondary" style={{ padding: '8px 12px' }} onClick={() => setIsAddingTest(false)}>
                           <X size={16} />
                         </button>
                      </div>
                    </div>
                  )}

                  {filteredCategories.find(c => c.name === activeCategory)?.tests.map(test => {
                    const isSelected = enabledTests.includes(test);
                    return (
                      <div key={test} className="test-setting-row">
                        <div className="test-setting-info">
                          <span className="test-setting-name">{test}</span>
                          <span className="test-setting-desc">Standard diagnostic test</span>
                        </div>
                        <label className="setting-toggle">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => toggleTest(test)}
                          />
                          <span className="toggle-bg"></span>
                        </label>
                      </div>
                    );
                  })}
                  {(!filteredCategories.find(c => c.name === activeCategory) || 
                    filteredCategories.find(c => c.name === activeCategory)?.tests.length === 0) && (
                    <div style={{ color: 'var(--text-muted)', padding: '24px 0' }}>
                      No tests found matching "{searchQuery}" in this category.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: HEALTH PACKAGES --- */}
        {activeTab === 'packages' && (
          <div className="tab-pane fadeIn">
             <div className="sp-header-row">
              <div>
                <h2 className="sp-title">Health Testing Packages</h2>
                <p className="sp-subtitle">Packages selectable by receptionists. Only tests enabled for this clinic can be included.</p>
              </div>
              <button className="btn-primary" onClick={() => setShowDrawer(true)}>
                <Plus size={16} /> Create Package
              </button>
            </div>

            <div className="packages-list">
              {packages.map(pkg => (
                <div key={pkg.id} className="package-card">
                  <div className="package-info">
                    <div className="package-name">
                      <Package size={18} className="text-muted" />
                      {pkg.name}
                      <span className="package-code">{pkg.code}</span>
                    </div>
                    <div className="package-tests">
                      {pkg.tests.slice(0, 8).map(test => (
                        <span key={test} className="test-tag">{test}</span>
                      ))}
                      {pkg.tests.length > 8 && (
                        <span className="test-tag" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
                          +{pkg.tests.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="package-actions">
                    <button className="btn-icon-action" title="Edit Package">
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon-action danger" title="Delete Package">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              {packages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                  <Package size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
                  <p>No packages created yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* --- ADD PACKAGE DRAWER --- */}
      {showDrawer && (
        <div className="drawer-overlay">
          <div className="drawer-panel">
            <div className="drawer-header">
              <h3 className="drawer-title">Create New Package</h3>
              <button className="drawer-close" onClick={() => setShowDrawer(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="drawer-body">
              <div className="form-group">
                <label className="form-label">Package Name</label>
                <div className="input-with-icon-drawer">
                  <FileText size={18} className="input-icon" />
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Annual Health Checkup" 
                    value={newPkgName}
                    onChange={(e) => setNewPkgName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Package Code</label>
                <div className="input-with-icon-drawer">
                  <Barcode size={18} className="input-icon" />
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Auto-generated code" 
                    value={newPkgCode}
                    disabled
                    style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Included Tests</label>
                  <span className="selected-count-badge">{newPkgTests.length} selected</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>Select tests to include in this package. Only enabled clinic tests are shown.</p>
                
                <div className="tests-selection-area">
                  {/* We only show tests that are currently "enabled" for the clinic */}
                  {categories.map(cat => {
                    const availableTests = cat.tests.filter(t => enabledTests.includes(t));
                    if (availableTests.length === 0) return null;

                    return (
                      <div key={cat.name} className="selection-category">
                        <div className="selection-cat-title">
                          <FlaskConical size={14} className="text-muted" />
                          {cat.name}
                        </div>
                        <div className="selection-tags">
                          {availableTests.map(test => {
                            const isSelected = newPkgTests.includes(test);
                            return (
                              <div 
                                key={test} 
                                className={`selectable-tag ${isSelected ? 'selected' : ''}`}
                                onClick={() => toggleNewPkgTest(test)}
                              >
                                {isSelected ? <Check size={14} /> : <Plus size={14} />}
                                {test}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  {enabledTests.length === 0 && (
                    <div style={{ fontSize: '13px', color: '#ef4444', textAlign: 'center', padding: '16px' }}>
                      No tests are currently enabled for this clinic. Please enable tests in the "Test Availability" tab first.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="drawer-footer">
              <button className="btn-secondary" onClick={() => setShowDrawer(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSavePackage}>Save Package</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
