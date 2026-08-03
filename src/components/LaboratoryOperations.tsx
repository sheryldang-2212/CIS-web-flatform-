import React, { useState } from 'react';
import { Truck, Clock, FileText, Settings, ShieldAlert, Mail, MessageSquare, Bell, Save, CheckCircle, Barcode, ClipboardCheck, AlertTriangle } from 'lucide-react';
import './LaboratoryOperations.css';

const TABS = [
  { id: 'delivery', name: 'Logistics & Delivery', icon: Truck },
  { id: 'workflow', name: 'Workflow Settings', icon: Settings },
  { id: 'notifications', name: 'Alerts & Notifications', icon: Bell },
];

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function LaboratoryOperations() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  
  // Delivery State
  const [pickupDays, setPickupDays] = useState<string[]>(['Mon', 'Wed', 'Fri']);
  const [pickupTime, setPickupTime] = useState('14:00 - 16:00');
  const [courierNotes, setCourierNotes] = useState('');

  // Workflow State
  const [autoAssignBarcodes, setAutoAssignBarcodes] = useState(true);
  const [requireDoctorReview, setRequireDoctorReview] = useState(true);
  const [criticalValueAlerts, setCriticalValueAlerts] = useState(true);
  const [turnaroundTime, setTurnaroundTime] = useState('24');

  // Notification State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [labResultAlerts, setLabResultAlerts] = useState(true);

  const toggleDay = (day: string) => {
    setPickupDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    // Mock save
    alert('Settings saved successfully!');
  };

  return (
    <div className="lab-ops-container">
      {/* Sidebar */}
      <div className="lab-ops-sidebar">
        <div className="lab-ops-sidebar-header">
          <h3>Laboratory Operations</h3>
        </div>
        <div style={{ padding: '8px 0' }}>
          {TABS.map(tab => {
            const TabIcon = tab.icon;
            return (
              <button 
                key={tab.id}
                className={`lab-ops-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <TabIcon size={18} />
                {tab.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="lab-ops-content">
        {/* Logistics & Delivery */}
        {activeTab === 'delivery' && (
          <div className="fadeIn">
            <h2 className="lab-ops-section-title">Delivery Scheduling</h2>
            <p className="lab-ops-section-desc">Set courier pickup days and time windows for this clinic.</p>

            <div className="lab-ops-form-group">
              <label className="lab-ops-label">Pickup Days</label>
              <div className="pickup-days-container">
                {DAYS_OF_WEEK.map(day => (
                  <div 
                    key={day}
                    className={`day-pill ${pickupDays.includes(day) ? 'active' : ''}`}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <div className="lab-ops-form-group">
              <label className="lab-ops-label">Pickup Time Window</label>
              <div className="lab-ops-input-wrapper" style={{ maxWidth: '300px' }}>
                <Clock size={18} className="lab-ops-input-icon" />
                <input 
                  type="text" 
                  className="lab-ops-input" 
                  placeholder="e.g. 14:00 - 16:00"
                  value={pickupTime}
                  onChange={e => setPickupTime(e.target.value)}
                />
              </div>
            </div>

            <div className="lab-ops-form-group">
              <label className="lab-ops-label">Courier Notes</label>
              <div className="lab-ops-input-wrapper">
                <FileText size={18} className="lab-ops-input-icon" style={{ top: '14px' }} />
                <textarea 
                  className="lab-ops-input lab-ops-textarea" 
                  placeholder="Optional notes for the courier driver..."
                  value={courierNotes}
                  onChange={e => setCourierNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Workflow Settings */}
        {activeTab === 'workflow' && (
          <div className="fadeIn">
            <h2 className="lab-ops-section-title">Laboratory Workflow</h2>
            <p className="lab-ops-section-desc">Configure processing rules and operational defaults.</p>

            <div className="action-card">
              <div className="action-card-info">
                <div className="action-card-icon"><Barcode size={20} /></div>
                <div className="action-card-text">
                  <span className="action-card-title">Auto-assign Barcodes</span>
                  <span className="action-card-desc">Generate specimen barcodes automatically on new orders.</span>
                </div>
              </div>
              <label className="setting-toggle">
                <input type="checkbox" checked={autoAssignBarcodes} onChange={e => setAutoAssignBarcodes(e.target.checked)} />
                <span className="toggle-bg"></span>
              </label>
            </div>

            <div className="action-card">
              <div className="action-card-info">
                <div className="action-card-icon"><ClipboardCheck size={20} /></div>
                <div className="action-card-text">
                  <span className="action-card-title">Require Doctor Review Before Release</span>
                  <span className="action-card-desc">Results held until a doctor has reviewed and authorized release.</span>
                </div>
              </div>
              <label className="setting-toggle">
                <input type="checkbox" checked={requireDoctorReview} onChange={e => setRequireDoctorReview(e.target.checked)} />
                <span className="toggle-bg"></span>
              </label>
            </div>

            <div className="action-card">
              <div className="action-card-info">
                <div className="action-card-icon"><AlertTriangle size={20} /></div>
                <div className="action-card-text">
                  <span className="action-card-title">Critical Value Alerts</span>
                  <span className="action-card-desc">Notify clinic immediately for critical lab values.</span>
                </div>
              </div>
              <label className="setting-toggle">
                <input type="checkbox" checked={criticalValueAlerts} onChange={e => setCriticalValueAlerts(e.target.checked)} />
                <span className="toggle-bg"></span>
              </label>
            </div>

            <div className="action-card">
              <div className="action-card-info">
                <div className="action-card-icon"><Clock size={20} /></div>
                <div className="action-card-text">
                  <span className="action-card-title">Default Turnaround Time</span>
                  <span className="action-card-desc">Expected hours for routine results delivery.</span>
                </div>
              </div>
              <div className="lab-ops-input-addon">
                <input 
                  type="number" 
                  className="lab-ops-input" 
                  value={turnaroundTime}
                  onChange={e => setTurnaroundTime(e.target.value)}
                />
                <span className="input-addon-text">hours</span>
              </div>
            </div>
          </div>
        )}

        {/* Alerts & Notifications */}
        {activeTab === 'notifications' && (
          <div className="fadeIn">
            <h2 className="lab-ops-section-title">Notification Preferences</h2>
            <p className="lab-ops-section-desc">Manage how and when this clinic receives operational alerts.</p>

            <div className="action-card">
              <div className="action-card-info">
                <div className="action-card-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}><Mail size={20} /></div>
                <div className="action-card-text">
                  <span className="action-card-title">Email Notifications</span>
                  <span className="action-card-desc">Send alerts to the clinic's primary email address.</span>
                </div>
              </div>
              <label className="setting-toggle">
                <input type="checkbox" checked={emailNotifs} onChange={e => setEmailNotifs(e.target.checked)} />
                <span className="toggle-bg"></span>
              </label>
            </div>

            <div className="action-card">
              <div className="action-card-info">
                <div className="action-card-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}><MessageSquare size={20} /></div>
                <div className="action-card-text">
                  <span className="action-card-title">SMS Notifications</span>
                  <span className="action-card-desc">Send text messages to the primary contact number.</span>
                </div>
              </div>
              <label className="setting-toggle">
                <input type="checkbox" checked={smsNotifs} onChange={e => setSmsNotifs(e.target.checked)} />
                <span className="toggle-bg"></span>
              </label>
            </div>

            <div className="action-card">
              <div className="action-card-info">
                <div className="action-card-icon" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}><ShieldAlert size={20} /></div>
                <div className="action-card-text">
                  <span className="action-card-title">System Alerts</span>
                  <span className="action-card-desc">Show in-app notification banners for urgent issues.</span>
                </div>
              </div>
              <label className="setting-toggle">
                <input type="checkbox" checked={systemAlerts} onChange={e => setSystemAlerts(e.target.checked)} />
                <span className="toggle-bg"></span>
              </label>
            </div>

            <div className="action-card">
              <div className="action-card-info">
                <div className="action-card-icon" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}><CheckCircle size={20} /></div>
                <div className="action-card-text">
                  <span className="action-card-title">Lab Result Alerts</span>
                  <span className="action-card-desc">Notify when new patient lab results are ready.</span>
                </div>
              </div>
              <label className="setting-toggle">
                <input type="checkbox" checked={labResultAlerts} onChange={e => setLabResultAlerts(e.target.checked)} />
                <span className="toggle-bg"></span>
              </label>
            </div>
          </div>
        )}

        <div className="lab-ops-footer">
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleSave}>
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
