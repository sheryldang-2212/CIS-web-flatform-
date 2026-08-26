import { useState } from 'react';
import { Settings, Building2, FlaskConical, Save, CheckCircle, AlertTriangle } from 'lucide-react';
import './Dashboard.css';
import ClinicSettings from './ClinicSettings';
import LISMappingManagement from './LISMappingManagement';

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
    <div className="h-full flex flex-col relative overflow-hidden p-6 bg-slate-50/50">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="prem-title">Configuration & Settings</h1>
          <p className="prem-subtitle mt-2">Manage platform features, clinic information, and LIS integrations.</p>
        </div>
      </div>

      <div className="prem-tabs mb-6 self-start">
        <button 
          className={`prem-tab ${activeTab === 'Platform' ? 'active' : ''}`}
          onClick={() => setActiveTab('Platform')}
        >
          <Settings size={16} /> Platform Features
        </button>
        <button 
          className={`prem-tab ${activeTab === 'Clinic' ? 'active' : ''}`}
          onClick={() => setActiveTab('Clinic')}
        >
          <Building2 size={16} /> Clinic Configurations
        </button>
        <button 
          className={`prem-tab ${activeTab === 'LIS' ? 'active' : ''}`}
          onClick={() => setActiveTab('LIS')}
        >
          <FlaskConical size={16} /> LIS Integration
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'Platform' && (
          <div className="max-w-3xl fadeIn">
            <div className="glass-panel overflow-hidden mb-6">
              <div className="p-5 border-b border-slate-200/60 bg-white/50 backdrop-blur-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Settings size={18} />
                </div>
                <h3 className="font-bold text-slate-800">Platform Feature Flags</h3>
              </div>
              <div className="p-6 bg-white/40">
                <div className="flex items-start justify-between py-5 border-b border-slate-100">
                  <div className="pr-8">
                    <h4 className="font-semibold text-slate-800">Multi-Tenant Management</h4>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Enable multi-clinic management capabilities. If disabled, the system operates in standalone hospital mode. 
                      Disabling this does not delete existing data.
                    </p>
                  </div>
                  <label className="prem-toggle shrink-0">
                    <input 
                      type="checkbox" 
                      checked={multiTenantEnabled}
                      onChange={() => setMultiTenantEnabled(!multiTenantEnabled)}
                    />
                    <span className="prem-toggle-slider"></span>
                  </label>
                </div>

                <div className="flex items-start justify-between py-5">
                  <div className="pr-8">
                    <h4 className="font-semibold text-slate-800">Global Notifications</h4>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Allow platform-wide announcements and automated SMS/Email notifications to all clinics.
                    </p>
                  </div>
                  <label className="prem-toggle shrink-0">
                    <input 
                      type="checkbox" 
                      checked={globalNotifEnabled}
                      onChange={() => setGlobalNotifEnabled(!globalNotifEnabled)}
                    />
                    <span className="prem-toggle-slider"></span>
                  </label>
                </div>
              </div>
              <div className="bg-slate-50/80 p-5 flex justify-end border-t border-slate-200/60">
                <button className="prem-btn-primary" onClick={handleSavePlatformSettings} disabled={isSaving}>
                  {isSaving ? 'Saving...' : <><Save size={16} /> Save Platform Settings</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Clinic' && (
          <div className="fadeIn">
            {/* Reusing existing ClinicSettings */}
            <div className="mb-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r text-sm text-blue-800 flex gap-2">
              <Building2 size={16} className="mt-0.5" />
              <div>
                <strong>Platform Admin Mode:</strong> You are viewing clinic settings. To modify settings for a specific clinic, ensure you have the correct clinic selected in the context switcher.
              </div>
            </div>
            <ClinicSettings />
          </div>
        )}

        {activeTab === 'LIS' && (
          <div className="fadeIn flex flex-col gap-6">
            <div className="glass-panel overflow-hidden">
              <div className="p-5 border-b border-slate-200/60 bg-white/50 backdrop-blur-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle size={18} />
                </div>
                <h3 className="font-bold text-slate-800">LIS Connection Status</h3>
              </div>
              <div className="p-6 flex flex-wrap gap-8 bg-white/40">
                <div className="flex-1 min-w-[200px]">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Status</div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg">
                    <span className="status-dot text-emerald-500"></span> Connected
                  </div>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Last Successful Connection</div>
                  <div className="font-semibold text-slate-800">2026-08-24 12:45:00</div>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Last Failed Connection</div>
                  <div className="font-semibold text-rose-600 flex items-center gap-1">
                    <AlertTriangle size={16} /> 2026-08-23 09:12:00
                  </div>
                </div>
                <div className="w-full mt-4 border-t border-slate-100 pt-6">
                  <button className="prem-btn-secondary">Test Connection</button>
                </div>
              </div>
            </div>

            <div className="glass-panel overflow-hidden h-[600px] p-0 bg-white/60">
              {/* Embed LISMappingManagement to manage the actual test mappings */}
              <LISMappingManagement />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
