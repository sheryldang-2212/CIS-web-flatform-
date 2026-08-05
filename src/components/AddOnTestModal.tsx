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
    <Modal isOpen={isOpen} onClose={onClose} title="Add-on Test to Existing Specimen" width="600px">
      <form className="addon-test-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group addon-selector-group">
          <label>Additional Test <span className="required">*</span></label>
          <div className="select-wrapper addon-dropdown-trigger" onClick={() => setShowDropdown(!showDropdown)}>
            <span>{selectedTests.length > 0 ? `${selectedTests.length} tests selected` : 'Select'}</span>
            <ChevronDown size={16} className="select-icon" />
          </div>

          {showDropdown && (
            <div className="addon-dropdown-menu">
              <div className="search-filter sticky-search">
                <Search size={16} className="text-muted" />
                <input type="text" placeholder="Search..." onClick={(e) => e.stopPropagation()} />
              </div>

              <div className="addon-categories-list">
                {testCategories.map((category, i) => {
                  const isExpanded = expandedCategories[category.name];
                  return (
                    <div key={i} className="addon-category-item">
                      <div className="addon-category-header" onClick={(e) => { e.stopPropagation(); toggleCategory(category.name); }}>
                        {isExpanded ? <ChevronDown size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" style={{transform: 'rotate(-90deg)'}} />}
                        <span className="addon-category-name">{category.name.toUpperCase()}</span>
                      </div>
                      
                      {isExpanded && (
                        <div className="addon-category-body">
                          {category.tests.map((test, j) => (
                            <label key={j} className="addon-test-label" onClick={(e) => e.stopPropagation()}>
                              <input 
                                type="checkbox" 
                                checked={selectedTests.includes(test)}
                                onChange={() => handleTestToggle(test)}
                              />
                              <span>{test}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {selectedTests.length > 0 && (
          <div className="selected-tests-container mb-4">
            {selectedTests.map((test, i) => (
              <div key={i} className="selected-tag">
                {test}
                <button type="button" onClick={() => removeTest(test)} className="remove-tag-btn">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="form-group mt-4">
          <label>Reason / Notes</label>
          <textarea rows={3}></textarea>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">Add Test</button>
        </div>
      </form>
    </Modal>
  );
}
