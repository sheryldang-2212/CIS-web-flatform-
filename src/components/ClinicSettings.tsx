import React, { useState } from 'react';
import { 
  Building2, MapPin, Clock, CalendarDays, FlaskConical, 
  UploadCloud, Lock, Phone, Mail, Plus, Trash2, Edit2
} from 'lucide-react';
import './ClinicSettings.css';

export default function ClinicSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [clinicStatus, setClinicStatus] = useState(true);
  const [sampleAvailable, setSampleAvailable] = useState(true);

  // Mock Business Hours
  const [businessHours, setBusinessHours] = useState([
    { day: 'Monday', isOpen: true, slots: [{ start: '08:00', end: '17:00' }] },
    { day: 'Tuesday', isOpen: true, slots: [{ start: '08:00', end: '17:00' }] },
    { day: 'Wednesday', isOpen: true, slots: [{ start: '08:00', end: '17:00' }] },
    { day: 'Thursday', isOpen: true, slots: [{ start: '08:00', end: '17:00' }] },
    { day: 'Friday', isOpen: true, slots: [{ start: '08:00', end: '12:00' }, { start: '13:00', end: '17:00' }] },
    { day: 'Saturday', isOpen: false, slots: [] },
    { day: 'Sunday', isOpen: false, slots: [] },
  ]);

  const toggleDay = (index: number) => {
    const newHours = [...businessHours];
    newHours[index].isOpen = !newHours[index].isOpen;
    if (newHours[index].isOpen && newHours[index].slots.length === 0) {
      newHours[index].slots = [{ start: '08:00', end: '17:00' }];
    }
    setBusinessHours(newHours);
  };

  const tabs = [
    { id: 'general', label: 'General Information', icon: Building2 },
    { id: 'contact', label: 'Contact & Location', icon: MapPin },
    { id: 'hours', label: 'Business Hours', icon: Clock },
    { id: 'holidays', label: 'Holidays & Special Hours', icon: CalendarDays },
    { id: 'operations', label: 'Sample Operations', icon: FlaskConical },
  ];

  return (
    <div className="clinic-settings-container">
      {/* Sidebar Navigation */}
      <div className="settings-sidebar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`settings-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} className="settings-tab-icon" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="settings-content">
        
        {/* TAB 1: General Information */}
        {activeTab === 'general' && (
          <div className="settings-panel">
            <h2 className="settings-section-title">General Information</h2>
            
            <div className="settings-form-grid">
              <div className="settings-form-group">
                <label className="settings-label">
                  Clinic Name <Lock size={12} className="text-muted" />
                </label>
                <input type="text" className="settings-input" value="Downtown Clinic" disabled />
              </div>
              
              <div className="settings-form-group">
                <label className="settings-label">
                  Clinic Code <Lock size={12} className="text-muted" />
                </label>
                <input type="text" className="settings-input" value="CLN-DT-001" disabled />
              </div>

              <div className="settings-form-group full-width" style={{ marginTop: '8px' }}>
                <label className="settings-label">Clinic Logo</label>
                <div className="upload-dropzone">
                  <UploadCloud size={24} className="dropzone-icon" />
                  <div className="dropzone-text">
                    Drag and drop your logo here, or <span>browse</span>
                    <br />
                    <small style={{ color: '#9ca3af', marginTop: '4px', display: 'block' }}>Supports: JPG, PNG, SVG (Max 2MB)</small>
                  </div>
                </div>
              </div>

              <div className="settings-form-group">
                <label className="settings-label">Operating Status</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={clinicStatus} 
                      onChange={(e) => setClinicStatus(e.target.checked)} 
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  {clinicStatus ? (
                    <span className="status-badge active"><span className="status-dot"></span> Active</span>
                  ) : (
                    <span className="status-badge inactive"><span className="status-dot"></span> Inactive</span>
                  )}
                </div>
              </div>
              <div></div> {/* Spacer */}

              <div className="settings-form-group">
                <label className="settings-label">Default Language</label>
                <select className="settings-select" defaultValue="en">
                  <option value="en">English (US)</option>
                  <option value="vi">Vietnamese (VN)</option>
                  <option value="th">Thai (TH)</option>
                </select>
              </div>

              <div className="settings-form-group">
                <label className="settings-label">Timezone</label>
                <select className="settings-select" defaultValue="utc7">
                  <option value="utc7">(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
                  <option value="utc8">(UTC+08:00) Singapore, KL</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Contact & Location */}
        {activeTab === 'contact' && (
          <div className="settings-panel">
            <h2 className="settings-section-title">Contact & Location</h2>
            
            <div className="settings-form-grid">
              <div className="settings-form-group">
                <label className="settings-label">Primary Phone</label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon" />
                  <input type="text" className="settings-input" defaultValue="+84 28 3822 5555" />
                </div>
              </div>

              <div className="settings-form-group">
                <label className="settings-label">Support Email</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input type="email" className="settings-input" defaultValue="support@downtownclinic.com" />
                </div>
              </div>

              <div className="settings-form-group full-width">
                <label className="settings-label">Primary Contact Person</label>
                <input type="text" className="settings-input" defaultValue="Dr. Sarah Chen (Clinic Manager)" />
              </div>

              <div className="settings-form-group full-width" style={{ marginTop: '12px' }}>
                <label className="settings-label">Physical Address</label>
                <textarea className="settings-textarea" defaultValue={"123 Le Loi Street\nDistrict 1\nHo Chi Minh City, Vietnam"}></textarea>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Business Hours */}
        {activeTab === 'hours' && (
          <div className="settings-panel">
            <h2 className="settings-section-title">Business Hours</h2>
            <p className="text-muted" style={{ marginBottom: '24px', fontSize: '14px' }}>Configure standard operating hours. You can add multiple time slots for split shifts (e.g., morning and afternoon).</p>
            
            <div className="schedule-list">
              {businessHours.map((day, index) => (
                <div className="schedule-row" key={day.day}>
                  <div className="schedule-day">
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={day.isOpen} 
                        onChange={() => toggleDay(index)} 
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    {day.day}
                  </div>
                  
                  <div className="schedule-times">
                    {day.isOpen ? (
                      <>
                        {day.slots.map((slot, sIndex) => (
                          <div className="time-slot" key={sIndex}>
                            <input type="time" className="time-input" defaultValue={slot.start} />
                            <span className="time-separator">-</span>
                            <input type="time" className="time-input" defaultValue={slot.end} />
                            <button className="btn-icon" title="Remove slot">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button className="btn-add-text">+ Add hours</button>
                      </>
                    ) : (
                      <span className="closed-text">Closed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Holidays & Special Hours */}
        {activeTab === 'holidays' && (
          <div className="settings-panel">
            <div className="holidays-header">
              <h2 className="settings-section-title" style={{ border: 'none', margin: 0, padding: 0 }}>Holidays & Special Hours</h2>
              <button className="btn-primary-small">
                <Plus size={16} /> Add New Exception
              </button>
            </div>
            
            <div className="holiday-list">
              <div className="holiday-card">
                <div className="holiday-date-box">
                  <div className="holiday-month">Sep</div>
                  <div className="holiday-day">02</div>
                </div>
                <div className="holiday-info">
                  <h4 className="holiday-name">National Day</h4>
                  <span className="holiday-type">Public Holiday</span>
                </div>
                <div>
                  <span className="holiday-badge closure">Full Closure</span>
                </div>
              </div>

              <div className="holiday-card">
                <div className="holiday-date-box">
                  <div className="holiday-month">Dec</div>
                  <div className="holiday-day">24</div>
                </div>
                <div className="holiday-info">
                  <h4 className="holiday-name">Christmas Eve</h4>
                  <span className="holiday-type">Company Policy</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className="holiday-badge special">Special Hours</span>
                  <span className="text-muted" style={{ fontSize: '12px', fontWeight: 500 }}>08:00 - 12:00</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Sample Operations */}
        {activeTab === 'operations' && (
          <div className="settings-panel">
            <h2 className="settings-section-title">Sample Operations</h2>
            
            <div className="sample-ops-card">
              <div className="ops-header">
                <div>
                  <h3 className="ops-title">Sample Collection Availability</h3>
                  <p className="ops-desc">Enable or disable laboratory sample collection at this clinic.</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={sampleAvailable} 
                    onChange={(e) => setSampleAvailable(e.target.checked)} 
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {sampleAvailable && (
              <div className="settings-form-grid">
                <div className="settings-form-group">
                  <label className="settings-label">Daily Cut-off Time</label>
                  <input type="time" className="settings-input" defaultValue="16:00" />
                  <small className="text-muted">Samples collected after this time will be stored for next day processing.</small>
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">Assigned Central Laboratory</label>
                  <select className="settings-select" defaultValue="lab1">
                    <option value="lab1">CorePath Diagnostics Hub (Primary)</option>
                    <option value="lab2">City General Lab Network</option>
                  </select>
                </div>

                <div className="settings-form-group full-width" style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="settings-label">Courier Pickup Schedule</label>
                    <button className="btn-add-text" style={{ padding: 0 }}>+ Add Pickup Time</button>
                  </div>
                  
                  <table className="pickup-schedule-table">
                    <thead>
                      <tr>
                        <th>Pickup Time</th>
                        <th>Courier Company</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>11:00 AM</td>
                        <td>MedEx Logistics</td>
                        <td>
                          <button className="btn-icon"><Edit2 size={14} /></button>
                        </td>
                      </tr>
                      <tr>
                        <td>04:30 PM</td>
                        <td>MedEx Logistics</td>
                        <td>
                          <button className="btn-icon"><Edit2 size={14} /></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
