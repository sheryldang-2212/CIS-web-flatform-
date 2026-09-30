import { useState } from 'react';
import { Settings, Save, Smartphone } from 'lucide-react';
import './Dashboard.css';
import MobileAppSettings from './MobileAppSettings';

export default function PlatformSettings() {
  const [activeTab, setActiveTab] = useState('Platform');
  const [multiTenantEnabled, setMultiTenantEnabled] = useState(true);
  const [globalNotifEnabled, setGlobalNotifEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePlatformSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Platform settings saved and recorded in audit log.');
    }, 1000);
  };

  return (
    <div className="dashboard-container h-full flex flex-col relative overflow-hidden bg-slate-50">
      <div className="detail-header" style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Platform Settings</h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px', marginBottom: 0 }}>Manage platform features and mobile app configurations.</p>
        </div>
      </div>

      <div className="detail-tabs" style={{ padding: '0 24px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <button 
          className={`detail-tab ${activeTab === 'Platform' ? 'active' : ''}`}
          onClick={() => setActiveTab('Platform')}
        >
          <Settings size={16} /> Platform Features
        </button>
        <button 
          className={`detail-tab ${activeTab === 'Mobile App' ? 'active' : ''}`}
          onClick={() => setActiveTab('Mobile App')}
        >
          <Smartphone size={16} /> Mobile App Settings
        </button>
      </div>

      <div className="detail-content" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        {activeTab === 'Platform' && (
          <div className="max-w-3xl fadeIn">
            <div className="detail-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <div style={{ padding: '6px', backgroundColor: '#eff6ff', borderRadius: '6px', color: '#3b82f6' }}>
                  <Settings size={18} />
                </div>
                Platform Feature Flags
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '24px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ paddingRight: '32px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px 0' }}>Multi-Tenant Management</h4>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                      Enable multi-clinic management capabilities. If disabled, the system operates in standalone hospital mode. 
                      Disabling this does not delete existing data.
                    </p>
                  </div>
                  <label className="toggle-switch shrink-0" style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                    <input 
                      type="checkbox" 
                      checked={multiTenantEnabled}
                      onChange={() => setMultiTenantEnabled(!multiTenantEnabled)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span className="slider round" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: multiTenantEnabled ? '#3b82f6' : '#cbd5e1', transition: '.4s', borderRadius: '24px' }}>
                      <span style={{ position: 'absolute', height: '18px', width: '18px', left: multiTenantEnabled ? '22px' : '3px', bottom: '3px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                    </span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '8px' }}>
                  <div style={{ paddingRight: '32px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px 0' }}>Global Notifications</h4>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                      Allow platform-wide announcements and automated SMS/Email notifications to all clinics.
                    </p>
                  </div>
                  <label className="toggle-switch shrink-0" style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                    <input 
                      type="checkbox" 
                      checked={globalNotifEnabled}
                      onChange={() => setGlobalNotifEnabled(!globalNotifEnabled)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span className="slider round" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: globalNotifEnabled ? '#3b82f6' : '#cbd5e1', transition: '.4s', borderRadius: '24px' }}>
                      <span style={{ position: 'absolute', height: '18px', width: '18px', left: globalNotifEnabled ? '22px' : '3px', bottom: '3px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                    </span>
                  </label>
                </div>
              </div>
              
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-primary" onClick={handleSavePlatformSettings} disabled={isSaving}>
                  {isSaving ? 'Saving...' : <><Save size={16} className="mr-2 inline" /> Save Settings</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Mobile App' && (
          <div className="fadeIn h-full">
            <MobileAppSettings />
          </div>
        )}
      </div>
    </div>
  );
}
