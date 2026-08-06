import { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import Modal from './Modal';
import './AddOnTestModal.css';

interface AddOnTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export default function AddOnTestModal({ isOpen, onClose, order }: AddOnTestModalProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Hematology': true
  });

  const testCategories = [
    { name: 'Hematology', tests: ['CBC', 'Hemoglobin', 'Hematocrit', 'Platelet count', 'WBC count'] },
    { name: 'Clinical Chemistry', tests: ['Fasting Glucose', 'HbA1c', 'Creatinine'] },
    { name: 'Hormones', tests: ['TSH', 'Free T3'] },
    { name: 'Infectious Diseases', tests: ['HIV Ag/Ab'] },
    { name: 'Tumor Markers', tests: ['PSA'] },
    { name: 'Others', tests: ['Urinalysis'] }
  ];

  const handleTestToggle = (test: string) => {
    setSelectedTests(prev => 
      prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test]
    );
  };

  const removeTest = (test: string) => {
    setSelectedTests(prev => prev.filter(t => t !== test));
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add-on Test to Existing Specimen" width="800px">
      <form className="addon-test-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group mb-4">
          <label>Select Additional Tests <span className="required">*</span></label>
          
          <div className="test-selector-panel">
            <div className="test-selector-header">
              <div className="search-filter sticky-search w-100">
                <Search size={18} className="text-muted" />
                <input 
                  type="text" 
                  placeholder="Search for tests..." 
                />
              </div>
            </div>
            
            <div className="test-selector-body">
              <div className="test-categories-sidebar">
                {testCategories.map((category, i) => (
                  <div 
                    key={i} 
                    className={`category-nav-item ${expandedCategories[category.name] ? 'active' : ''}`}
                    onClick={() => {
                      // Expand only this category, collapse others
                      setExpandedCategories({ [category.name]: true });
                    }}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
              
              <div className="test-items-container">
                {testCategories.map((category, i) => {
                  if (!expandedCategories[category.name]) return null;
                  return (
                    <div key={i} className="test-items-grid">
                      {category.tests.map((test, j) => (
                        <label key={j} className="test-checkbox-card">
                          <input 
                            type="checkbox" 
                            checked={selectedTests.includes(test)}
                            onChange={() => handleTestToggle(test)}
                          />
                          <span className="test-name">{test}</span>
                        </label>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {selectedTests.length > 0 && (
          <div className="form-group mb-4">
            <label>Selected Tests ({selectedTests.length})</label>
            <div className="selected-tests-container">
              {selectedTests.map((test, i) => (
                <div key={i} className="selected-tag">
                  {test}
                  <button type="button" onClick={() => removeTest(test)} className="remove-tag-btn">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-group mt-2">
          <label>Reason / Notes</label>
          <textarea rows={3} placeholder="Provide a clinical reason for the add-on test..." className="form-control"></textarea>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">Add Test</button>
        </div>
      </form>
    </Modal>
  );
}
