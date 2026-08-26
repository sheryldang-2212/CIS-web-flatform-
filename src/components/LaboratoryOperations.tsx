import { useState } from 'react';
import { Truck, Clock, FileText, Settings, Save, Barcode, ClipboardCheck, AlertTriangle, List, Shield, Lock } from 'lucide-react';
import './LaboratoryOperations.css';

const TABS = [
  { id: 'reference', name: 'Reference Ranges', icon: List },
  { id: 'config', name: 'Configuration Rules', icon: Shield },
  { id: 'delivery', name: 'Logistics & Delivery', icon: Truck },
  { id: 'workflow', name: 'Workflow Settings', icon: Settings }
];

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MOCK_REFERENCE_RANGES = [
  { id: 'R001', testCode: 'GLU-F', testName: 'Glucose, Fasting', unit: 'mg/dL', ageRange: 'Adult', sex: 'Both', clinic: 'Central Lab', effective: '2025-01-01', version: 'v2.1', status: 'Active' },
  { id: 'R002', testCode: 'HBA1C', testName: 'Hemoglobin A1c', unit: '%', ageRange: 'All', sex: 'Both', clinic: 'Central Lab', effective: '2024-06-15', version: 'v1.4', status: 'Active' },
];

const MOCK_CONFIG_RULES = [
  { id: 'C1', name: 'Order submission timing to LIS', owner: 'CIS', scope: 'Platform', value: 'Immediate on Payment', editable: true, updated: '2026-01-10', by: 'System' },
  { id: 'C2', name: 'Tube/specimen determination', owner: 'LIS', scope: 'Platform', value: 'Determined by LIS Mapping', editable: false, updated: '2026-03-12', by: 'LIS Integration' },
  { id: 'C3', name: 'Edit/Cancel cut-off', owner: 'CIS', scope: 'Clinic', value: 'Before Sample Collection', editable: true, updated: '2026-05-20', by: 'Sarah Chen' },
  { id: 'C4', name: 'Add-on test behaviour', owner: 'CIS', scope: 'Platform', value: 'Requires new order', editable: true, updated: '2026-01-10', by: 'System' },
  { id: 'C5', name: 'Doctor result approval requirement', owner: 'CIS', scope: 'Clinic', value: 'Enabled', editable: true, updated: '2026-08-01', by: 'Clinic Admin' },
];


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
    <div className="h-full flex relative overflow-hidden bg-slate-50/50">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200/60 bg-white/50 backdrop-blur flex flex-col p-4 shrink-0">
        <div className="mb-6 px-2">
          <h3 className="font-bold text-slate-800">Laboratory Operations</h3>
        </div>
        <div className="flex flex-col gap-1">
          {TABS.map(tab => {
            const TabIcon = tab.icon;
            return (
              <button 
                key={tab.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' : 'text-slate-600 hover:bg-slate-100/50 hover:text-slate-800'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <TabIcon size={18} className={activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'} />
                {tab.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
        
        {/* Reference Ranges */}
        {activeTab === 'reference' && (
          <div className="fadeIn max-w-5xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Reference Ranges</h2>
            <p className="text-sm text-slate-500 mb-6">LIS is the System of Record for laboratory information. Reference ranges are managed centrally.</p>
            
            <div className="glass-panel p-1">
              <table className="prem-table">
                <thead>
                  <tr>
                    <th>Test Code & Name</th>
                    <th>Unit</th>
                    <th>Age Range / Sex</th>
                    <th>Clinic/Lab</th>
                    <th>Version & Effective Date</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_REFERENCE_RANGES.map(range => (
                    <tr key={range.id}>
                      <td>
                        <div className="font-semibold text-slate-800">{range.testCode}</div>
                        <div className="text-xs font-medium text-slate-500 mt-0.5">{range.testName}</div>
                      </td>
                      <td className="font-mono text-sm text-slate-600">{range.unit}</td>
                      <td>
                        <div className="text-sm font-medium text-slate-700">{range.ageRange}</div>
                        <div className="text-xs text-slate-500">{range.sex}</div>
                      </td>
                      <td className="text-sm font-medium text-slate-700">{range.clinic}</td>
                      <td>
                        <div className="text-sm font-medium text-slate-700">{range.version}</div>
                        <div className="text-xs text-slate-500">{range.effective}</div>
                      </td>
                      <td>
                        <span className="prem-badge success">{range.status}</span>
                      </td>
                      <td className="text-right">
                        <button className="text-xs flex items-center justify-end gap-1 text-slate-400 opacity-50 cursor-not-allowed ml-auto" disabled title="Managed by LIS - Editing requires confirmation">
                          <Lock size={12} /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Configuration Rules */}
        {activeTab === 'config' && (
          <div className="fadeIn max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Configuration Rules</h2>
            <p className="text-sm text-slate-500 mb-6">System configuration distinguishing LIS-owned vs CIS-owned rules.</p>
            
            <div className="flex flex-col gap-4">
              {MOCK_CONFIG_RULES.map(rule => (
                <div key={rule.id} className="glass-panel p-5 flex items-center justify-between transition-all hover:border-indigo-200 hover:shadow-md">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-slate-800 m-0">{rule.name}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${rule.owner === 'LIS' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                        {rule.owner} Owned
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-bold uppercase tracking-wider border border-slate-200">
                        {rule.scope} Scope
                      </span>
                    </div>
                    <div className="text-sm text-slate-600">Current Value: <span className="font-semibold text-slate-900">{rule.value}</span></div>
                    <div className="text-xs font-medium text-slate-400 mt-2">Last updated {rule.updated} by {rule.by}</div>
                  </div>
                  <div>
                    {rule.editable ? (
                      <button className="prem-btn-secondary py-1.5 px-4">Configure</button>
                    ) : (
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
                        <Lock size={14} className="text-slate-400" /> Read-only
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Logistics & Delivery */}
        {activeTab === 'delivery' && (
          <div className="fadeIn max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Delivery Scheduling</h2>
            <p className="text-sm text-slate-500 mb-6">Set courier pickup days and time windows for this clinic.</p>

            <div className="glass-panel p-6 mb-6">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Pickup Days</label>
              <div className="flex gap-2 flex-wrap">
                {DAYS_OF_WEEK.map(day => (
                  <div 
                    key={day}
                    className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all ${pickupDays.includes(day) ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50'}`}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 mb-6">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Pickup Time Window</label>
              <div className="relative max-w-xs">
                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  className="prem-input pl-9" 
                  placeholder="e.g. 14:00 - 16:00"
                  value={pickupTime}
                  onChange={e => setPickupTime(e.target.value)}
                />
              </div>
            </div>

            <div className="glass-panel p-6">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Courier Notes</label>
              <div className="relative">
                <FileText size={16} className="absolute left-3 top-3 text-slate-400" />
                <textarea 
                  className="prem-input pl-9 min-h-[100px] resize-none py-3" 
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
          <div className="fadeIn max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Laboratory Workflow</h2>
            <p className="text-sm text-slate-500 mb-6">Configure processing rules and operational defaults.</p>

            <div className="flex flex-col gap-4">
              <div className="glass-panel p-5 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Barcode size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Auto-assign Barcodes</h4>
                    <p className="text-sm text-slate-500 mt-1">Generate specimen barcodes automatically on new orders.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={autoAssignBarcodes} onChange={e => setAutoAssignBarcodes(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="glass-panel p-5 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <ClipboardCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Require Doctor Review Before Release</h4>
                    <p className="text-sm text-slate-500 mt-1">Results held until a doctor has reviewed and authorized release.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={requireDoctorReview} onChange={e => setRequireDoctorReview(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="glass-panel p-5 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Critical Value Alerts</h4>
                    <p className="text-sm text-slate-500 mt-1">Notify clinic immediately for critical lab values.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={criticalValueAlerts} onChange={e => setCriticalValueAlerts(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="glass-panel p-5 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Default Turnaround Time</h4>
                    <p className="text-sm text-slate-500 mt-1">Expected hours for routine results delivery.</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    className="prem-input text-right w-20 rounded-r-none border-r-0" 
                    value={turnaroundTime}
                    onChange={e => setTurnaroundTime(e.target.value)}
                  />
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 px-3 py-2 text-sm font-medium rounded-r-lg">hours</span>
                </div>
              </div>
            </div>
          </div>
        )}


        </div>
        <div className="p-4 border-t border-slate-200/60 bg-white/50 flex justify-end">
          <button className="prem-btn-primary" onClick={handleSave}>
            <Save size={16} className="mr-2" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
