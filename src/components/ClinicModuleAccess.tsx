import React, { useState } from 'react';
import { 
  LayoutDashboard, User, Shield, Users, Stethoscope, 
  Database, Activity, FileText, Smartphone, Beaker,
  TestTube, ShieldAlert, Lock, AlertTriangle, Eye, Link
} from 'lucide-react';

export default function ClinicModuleAccess() {
  const [modules, setModules] = useState({
    dashboard: true,
    patientManagement: true,
    patientDataImport: true,
    mobileAccount: true,
    doctorReview: true,
    lisIntegration: true,
    wearableSync: false,
    auditLogs: true,
    labOrder: true,
    sampleCollection: true,
    labResult: true,
    clinicReports: true
  });

  const toggleModule = (key: keyof typeof modules) => {
    // Prevent toggling locked modules
    if (key === 'dashboard' || key === 'auditLogs' || key === 'lisIntegration') return;
    setModules({ ...modules, [key]: !modules[key] });
  };

  const enabledCount = Object.values(modules).filter(Boolean).length;

  return (
    <div className="fadeIn" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'flex-start' }}>
      
      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', color: '#111827' }}>Module Access</h2>
          <p style={{ margin: 0, color: '#4b5563', fontSize: '14px' }}>
            Configure which modules are available for this clinic. Clinic Admin can only assign permissions within enabled modules.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {/* Core */}
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: '#1e293b' }}>
              <LayoutDashboard size={18} className="text-blue-600" /> Core
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <LayoutDashboard size={16} className="text-gray-400 mt-1" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Dashboard</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Core module (required)</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '36px', height: '20px', backgroundColor: '#3b82f6', borderRadius: '10px', position: 'relative', cursor: 'not-allowed', opacity: 0.8 }}>
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }} />
                </div>
                <Lock size={14} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Patient */}
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', gridRow: 'span 2' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: '#1e293b' }}>
              <User size={18} className="text-indigo-600" /> Patient
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <User size={16} className="text-gray-400 mt-1" />
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Patient Management</div>
                </div>
                <div 
                  onClick={() => toggleModule('patientManagement')}
                  style={{ width: '36px', height: '20px', backgroundColor: modules.patientManagement ? '#3b82f6' : '#e2e8f0', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: modules.patientManagement ? '18px' : '2px', top: '2px', transition: 'left 0.2s' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Database size={16} className="text-gray-400 mt-1" />
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Patient Data Import</div>
                </div>
                <div 
                  onClick={() => toggleModule('patientDataImport')}
                  style={{ width: '36px', height: '20px', backgroundColor: modules.patientDataImport ? '#3b82f6' : '#e2e8f0', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: modules.patientDataImport ? '18px' : '2px', top: '2px', transition: 'left 0.2s' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Smartphone size={16} className="text-gray-400 mt-1" />
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Mobile Account Linking & Consent</div>
                </div>
                <div 
                  onClick={() => toggleModule('mobileAccount')}
                  style={{ width: '36px', height: '20px', backgroundColor: modules.mobileAccount ? '#3b82f6' : '#e2e8f0', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s', flexShrink: 0 }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: modules.mobileAccount ? '18px' : '2px', top: '2px', transition: 'left 0.2s' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Lab */}
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', gridRow: 'span 2' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: '#1e293b' }}>
              <Beaker size={18} className="text-purple-600" /> Lab
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <FileText size={16} className="text-gray-400 mt-1" />
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Lab Order Management</div>
                </div>
                <div 
                  onClick={() => toggleModule('labOrder')}
                  style={{ width: '36px', height: '20px', backgroundColor: modules.labOrder ? '#3b82f6' : '#e2e8f0', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: modules.labOrder ? '18px' : '2px', top: '2px', transition: 'left 0.2s' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <TestTube size={16} className="text-gray-400 mt-1" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Sample Collection</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Depends on Lab Order Management</div>
                  </div>
                </div>
                <div 
                  onClick={() => toggleModule('sampleCollection')}
                  style={{ width: '36px', height: '20px', backgroundColor: modules.sampleCollection ? '#3b82f6' : '#e2e8f0', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: modules.sampleCollection ? '18px' : '2px', top: '2px', transition: 'left 0.2s' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Activity size={16} className="text-gray-400 mt-1" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Lab Result Management</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Depends on LIS Integration</div>
                  </div>
                </div>
                <div 
                  onClick={() => toggleModule('labResult')}
                  style={{ width: '36px', height: '20px', backgroundColor: modules.labResult ? '#3b82f6' : '#e2e8f0', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s', flexShrink: 0 }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: modules.labResult ? '18px' : '2px', top: '2px', transition: 'left 0.2s' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Doctor */}
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: '#1e293b' }}>
              <Stethoscope size={18} className="text-green-600" /> Doctor
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <User size={16} className="text-gray-400 mt-1" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Doctor Review</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Depends on Lab Result Management</div>
                </div>
              </div>
              <div 
                onClick={() => toggleModule('doctorReview')}
                style={{ width: '36px', height: '20px', backgroundColor: modules.doctorReview ? '#3b82f6' : '#e2e8f0', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
              >
                <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: modules.doctorReview ? '18px' : '2px', top: '2px', transition: 'left 0.2s' }} />
              </div>
            </div>
          </div>

          {/* Security */}
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: '#1e293b' }}>
              <Shield size={18} className="text-red-600" /> Security
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <ShieldAlert size={16} className="text-gray-400 mt-1" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Audit Logs</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Required for all clinics</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '36px', height: '20px', backgroundColor: '#3b82f6', borderRadius: '10px', position: 'relative', cursor: 'not-allowed', opacity: 0.8 }}>
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }} />
                </div>
                <Lock size={14} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Integration */}
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: '#1e293b' }}>
              <Link size={18} className="text-orange-600" /> Integration
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Stethoscope size={16} className="text-gray-400 mt-1" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>LIS Integration</div>
                    <div style={{ fontSize: '12px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%' }} /> Connected
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '36px', height: '20px', backgroundColor: '#3b82f6', borderRadius: '10px', position: 'relative', cursor: 'not-allowed', opacity: 0.8 }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }} />
                  </div>
                  <Lock size={14} className="text-gray-400" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Activity size={16} className="text-gray-400 mt-1" />
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Wearable Data Sync</div>
                </div>
                <div 
                  onClick={() => toggleModule('wearableSync')}
                  style={{ width: '36px', height: '20px', backgroundColor: modules.wearableSync ? '#3b82f6' : '#cbd5e1', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: modules.wearableSync ? '18px' : '2px', top: '2px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Reporting */}
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: '#1e293b' }}>
              <Activity size={18} className="text-cyan-600" /> Reporting
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Activity size={16} className="text-gray-400 mt-1" />
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>Clinic Reports</div>
              </div>
              <div 
                onClick={() => toggleModule('clinicReports')}
                style={{ width: '36px', height: '20px', backgroundColor: modules.clinicReports ? '#3b82f6' : '#e2e8f0', borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
              >
                <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: modules.clinicReports ? '18px' : '2px', top: '2px', transition: 'left 0.2s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Warning Bar */}
        <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fdba74', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle className="text-orange-500" size={20} />
            <span style={{ fontSize: '14px', color: '#c2410c' }}>
              Disabling a module will hide it from clinic users and make related permissions inactive. Existing data is retained for audit.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary" style={{ backgroundColor: 'white' }}>Cancel</button>
            <button className="btn-primary" style={{ backgroundColor: '#2563eb' }}>Save Changes</button>
          </div>
        </div>
      </div>

      {/* Side Panel: Impact Preview */}
      <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye size={18} className="text-blue-600" /> Impact Preview
        </h3>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px 0' }}>
          See how module settings affect what clinic users can access.
        </p>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px 0' }}>1. Navigation (Clinic Portal)</h4>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>These modules will be visible in the clinic portal navigation.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#1e293b' }}>
            {modules.dashboard && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }} /></div> Dashboard</div>}
            {modules.patientManagement && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }} /></div> Patient Management</div>}
            {modules.patientDataImport && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }} /></div> Patient Data Import</div>}
            {modules.mobileAccount && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }} /></div> Mobile Account Linking & Consent</div>}
            {modules.labOrder && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }} /></div> Lab Order Management</div>}
            {modules.sampleCollection && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }} /></div> Sample Collection</div>}
            {modules.labResult && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }} /></div> Lab Result Management</div>}
            {modules.doctorReview && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }} /></div> Doctor Review</div>}
            {modules.clinicReports && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }} /></div> Clinic Reports</div>}
            {modules.auditLogs && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }} /></div> Audit Logs</div>}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px 0' }}>2. Clinic Admin Permissions</h4>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>Clinic Admin can only assign permissions within enabled modules.</p>
          <div style={{ backgroundColor: '#eff6ff', padding: '12px', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Users size={16} className="text-blue-600" />
            <span style={{ fontSize: '13px', color: '#1e40af' }}>
              Permission settings will be available for {enabledCount} enabled modules.
            </span>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px 0' }}>3. Direct URL / API Access</h4>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>Direct access to disabled modules will be blocked.</p>
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #ef4444', position: 'relative', flexShrink: 0 }}>
              <div style={{ width: '14px', height: '2px', backgroundColor: '#ef4444', position: 'absolute', top: '6px', left: '0', transform: 'rotate(45deg)' }} />
            </div>
            <span style={{ fontSize: '13px', color: '#b91c1c' }}>
              Disabled modules {modules.wearableSync ? '' : '(e.g. Wearable Data Sync)'} cannot be accessed via direct URL or API.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
