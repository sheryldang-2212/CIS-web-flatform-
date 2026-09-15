import React, { useState } from 'react';
import { Smartphone, Globe, ShieldCheck, FileQuestion, LifeBuoy, Save, Plus, ChevronDown, Edit2, Trash2 } from 'lucide-react';

export default function MobileAppSettings() {
  const [activeSection, setActiveSection] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Mock state for forms
  const [countryCode, setCountryCode] = useState('+66');
  
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Mobile App Settings saved successfully.');
    }, 800);
  };

  return (
    <div className="flex gap-6 h-full" style={{ minHeight: '600px' }}>
      {/* Sidebar Navigation */}
      <div className="w-64 flex-shrink-0">
        <div className="detail-card" style={{ padding: '16px', position: 'sticky', top: '0' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', padding: '0 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smartphone size={18} className="text-indigo-600" /> Mobile Config
          </h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button 
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', backgroundColor: activeSection === 'general' ? '#eff6ff' : 'transparent', color: activeSection === 'general' ? '#3b82f6' : '#64748b', boxShadow: 'none' }}
              onClick={() => setActiveSection('general')}
            >
              <Globe size={16} className="mr-2" /> General Settings
            </button>
            <button 
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', backgroundColor: activeSection === 'consent' ? '#eff6ff' : 'transparent', color: activeSection === 'consent' ? '#3b82f6' : '#64748b', boxShadow: 'none' }}
              onClick={() => setActiveSection('consent')}
            >
              <ShieldCheck size={16} className="mr-2" /> Privacy & Consents
            </button>
            <button 
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', backgroundColor: activeSection === 'questionnaire' ? '#eff6ff' : 'transparent', color: activeSection === 'questionnaire' ? '#3b82f6' : '#64748b', boxShadow: 'none' }}
              onClick={() => setActiveSection('questionnaire')}
            >
              <FileQuestion size={16} className="mr-2" /> Custom Questionnaires
            </button>
            <button 
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', backgroundColor: activeSection === 'support' ? '#eff6ff' : 'transparent', color: activeSection === 'support' ? '#3b82f6' : '#64748b', boxShadow: 'none' }}
              onClick={() => setActiveSection('support')}
            >
              <LifeBuoy size={16} className="mr-2" /> Help & Support
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="detail-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
              {activeSection === 'general' && 'General Settings'}
              {activeSection === 'consent' && 'Privacy & Consents T&C'}
              {activeSection === 'questionnaire' && 'Custom Questionnaires'}
              {activeSection === 'support' && 'Help & Support FAQs'}
            </h3>
            <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : <><Save size={16} className="mr-2 inline" /> Save Changes</>}
            </button>
          </div>

          <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          
          {/* General Section */}
          {activeSection === 'general' && (
            <div className="max-w-2xl fadeIn">
              <div className="form-group mb-6">
                <label className="form-label font-semibold text-slate-700 block mb-2">Default Country Code</label>
                <p className="text-sm text-slate-500 mb-3">Set the default country code used for mobile number registration and SMS OTP.</p>
                <select 
                  className="form-input max-w-xs"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+1">+1 (United States)</option>
                  <option value="+44">+44 (United Kingdom)</option>
                  <option value="+65">+65 (Singapore)</option>
                  <option value="+66">+66 (Thailand)</option>
                  <option value="+84">+84 (Vietnam)</option>
                  <option value="+91">+91 (India)</option>
                </select>
              </div>
            </div>
          )}

          {/* Consents Section */}
          {activeSection === 'consent' && (
            <div className="fadeIn max-w-3xl">
              <p className="text-sm text-slate-500 mb-6">Configure the legal documents and consent forms displayed in the mobile app during onboarding and in settings.</p>
              
              <div className="space-y-4">
                {['Privacy Policy', 'Terms & Conditions', 'Marketing Consent', 'Data Sharing Consent'].map((doc) => (
                  <div key={doc} className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{doc}</h4>
                        <p className="text-xs text-slate-500">Last updated: 14 Sep 2026</p>
                      </div>
                    </div>
                    <button className="btn-secondary" style={{ backgroundColor: 'white' }}>
                      Edit Content
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questionnaires Section */}
          {activeSection === 'questionnaire' && (
            <div className="fadeIn max-w-4xl">
              <div className="flex justify-between items-center mb-6">
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Manage custom health questionnaires assigned to patients in the mobile app.</p>
                <button className="btn-secondary">
                  <Plus size={16} className="mr-2 inline" /> Create Questionnaire
                </button>
              </div>

              <div className="table-container bg-white">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Questionnaire Title</th>
                      <th>Target Audience</th>
                      <th>Questions</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-medium text-slate-800">Initial Health Assessment</td>
                      <td>All New Patients</td>
                      <td>12</td>
                      <td><span className="status-badge success">Active</span></td>
                      <td>
                        <button className="text-indigo-600 hover:text-indigo-800 mr-3"><Edit2 size={16} /></button>
                        <button className="text-rose-600 hover:text-rose-800"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium text-slate-800">Diabetes Follow-up</td>
                      <td>Diabetic Patients</td>
                      <td>8</td>
                      <td><span className="status-badge bg-gray-100 text-gray-700">Draft</span></td>
                      <td>
                        <button className="text-indigo-600 hover:text-indigo-800 mr-3"><Edit2 size={16} /></button>
                        <button className="text-rose-600 hover:text-rose-800"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Help & Support Section */}
          {activeSection === 'support' && (
            <div className="fadeIn max-w-3xl">
              <div className="flex justify-between items-center mb-6">
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Manage the Frequently Asked Questions (FAQs) displayed in the mobile app.</p>
                <button className="btn-secondary">
                  <Plus size={16} className="mr-2 inline" /> Add FAQ
                </button>
              </div>

              <div className="space-y-3">
                {[
                  'How is my health score calculated?',
                  'How often should I update my medical information?',
                  'Is my health data secure?',
                  'How do I connect my wearable device?',
                  'Can I export my health data?',
                  'Contact us'
                ].map((q, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between group hover:border-indigo-300 transition-colors cursor-pointer">
                    <span className="font-medium text-slate-700">{q}</span>
                    <div className="flex items-center gap-3">
                      <button className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 size={16} /></button>
                      <button className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                      <ChevronDown size={18} className="text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
    </div>
  );
}
