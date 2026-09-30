import React, { useState } from 'react';
import { Smartphone, LayoutDashboard, Activity, FileQuestion, Bell, LifeBuoy, ShieldCheck, Eye, Save, Plus, Trash2, Edit2, CheckCircle2, ChevronRight, Globe, AlertTriangle } from 'lucide-react';
import './Settings.css';

export default function MobileAppSettings() {
  const [activeTab, setActiveTab] = useState('Dashboard Display');
  const [configStatus, setConfigStatus] = useState('Draft');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('Not saved yet');

  const tabs = [
    { id: 'Dashboard Display', icon: LayoutDashboard },
    { id: 'Test Metrics', icon: Activity },
    { id: 'Questionnaire', icon: FileQuestion },
    { id: 'Notifications', icon: Bell },
    { id: 'Help & Support', icon: LifeBuoy },
    { id: 'Consent Content', icon: ShieldCheck },
    { id: 'Preview & Publish', icon: Eye }
  ];

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setConfigStatus('Draft');
      setLastSaved(new Date().toLocaleTimeString());
    }, 800);
  };

  const handlePublish = () => {
    if (confirm('Are you sure you want to publish these configurations to the live Mobile App?')) {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setConfigStatus('Published');
        alert('Configuration published successfully!');
      }, 1000);
    }
  };

  // Mock data for Dashboard Display
  const [categories] = useState([
    { id: 'c1', nameEn: 'Metabolic', nameTh: 'เมตาบอลิก', order: 1, status: 'Active', metrics: 'Glucose, HbA1c, Insulin, Lipid Profile' },
    { id: 'c2', nameEn: 'Cardio', nameTh: 'คาร์ดิโอ', order: 2, status: 'Active', metrics: 'hs-CRP, Homocysteine' },
  ]);

  // Mock data for Test Metrics
  const [metrics] = useState([
    { id: 'm1', code: 'LDL', nameEn: 'LDL Cholesterol', nameTh: 'LDL โคเลสเตอรอล', category: 'Cardio / Metabolic', unit: 'mg/dL', refLabel: 'Normal / High / Critical', order: 3, status: 'Active' },
  ]);

  // Mock data for Questionnaires
  const [questions] = useState([
    { id: 'q1', qId: 'Q001', en: 'Do you smoke?', th: 'คุณสูบบุหรี่หรือไม่?', type: 'Single choice', required: 'Yes', section: 'Lifestyle', status: 'Active' },
  ]);

  // Mock data for Notifications
  const [notifications] = useState([
    { id: 'n1', event: 'LAB_ORDER_CREATED', title: 'Order Created', template: 'Your lab order has been created.', status: 'Active' },
    { id: 'n2', event: 'RESULT_AVAILABLE', title: 'Results Ready', template: 'Your lab result is now available.', status: 'Active' },
  ]);

  return (
    <div className="settings-container" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', background: 'white', minHeight: '600px' }}>
      <div className="settings-sidebar" style={{ width: '250px' }}>
        <h2 className="settings-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', marginBottom: '8px' }}>
          <Smartphone size={20} style={{ color: 'var(--primary)' }} /> Mobile App Config
        </h2>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Status: 
          <span style={{ 
            fontWeight: 600, 
            color: configStatus === 'Draft' ? 'var(--warning)' : 'var(--success)',
            backgroundColor: configStatus === 'Draft' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)',
            padding: '2px 8px',
            borderRadius: '12px'
          }}>
            {configStatus}
          </span>
        </div>

        <nav className="settings-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} className="settings-icon" />
              <span>{tab.id}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="settings-content" style={{ border: 'none', borderRadius: '0', padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h3 className="section-header">{activeTab}</h3>
            <p className="section-desc" style={{ marginBottom: 0 }}>
              {activeTab === 'Dashboard Display' && 'Configure health groups and mapping for the mobile dashboard.'}
              {activeTab === 'Test Metrics' && 'Configure how specific lab metrics are displayed to patients.'}
              {activeTab === 'Questionnaire' && 'Manage questions asked during patient registration and profile updates.'}
              {activeTab === 'Notifications' && 'Configure push notification and in-app message content by event.'}
              {activeTab === 'Help & Support' && 'Manage contact information and frequently asked questions.'}
              {activeTab === 'Consent Content' && 'Configure text for T&C, Privacy Policy, and Data Sharing explanations.'}
              {activeTab === 'Preview & Publish' && 'Review changes and publish to the live patient application.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary" onClick={handleSaveDraft} disabled={isSaving}>
              <Save size={16} style={{ marginRight: '8px' }} /> 
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            {activeTab !== 'Preview & Publish' && (
              <button className="btn-primary" onClick={() => setActiveTab('Preview & Publish')}>
                Review & Publish <ChevronRight size={16} style={{ marginLeft: '4px' }} />
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Display */}
        {activeTab === 'Dashboard Display' && (
          <div className="fadeIn">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <button className="btn-primary-small"><Plus size={14} style={{ marginRight: '6px' }} /> Add Category</button>
            </div>
            
            <div className="table-container" style={{ marginBottom: '24px' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category EN</th>
                    <th>Category TH</th>
                    <th>Order</th>
                    <th>Linked Metrics</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id}>
                      <td style={{ fontWeight: 600 }}>{cat.nameEn}</td>
                      <td>{cat.nameTh}</td>
                      <td>{cat.order}</td>
                      <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-secondary)' }} title={cat.metrics}>{cat.metrics}</td>
                      <td>
                        <span className="status-pill status-ready">{cat.status}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="icon-btn" title="Edit"><Edit2 size={16} /></button>
                        <button className="icon-btn" title="Delete" style={{ color: 'var(--danger)' }}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <AlertTriangle size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.5 }}>
                <strong>Note:</strong> Lab order workflows and clinical logic are managed in the central clinical configuration module to maintain strict governance. This screen only controls the presentation layer on the patient app.
              </p>
            </div>
          </div>
        )}

        {/* Test Metrics */}
        {activeTab === 'Test Metrics' && (
          <div className="fadeIn">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <button className="btn-primary-small"><Plus size={14} style={{ marginRight: '6px' }} /> Add Metric Config</button>
            </div>
            
            <div className="table-container" style={{ marginBottom: '16px' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Metric Code</th>
                    <th>Display EN / TH</th>
                    <th>Category</th>
                    <th>Reference Label</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((metric) => (
                    <tr key={metric.id}>
                      <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{metric.code}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{metric.nameEn}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{metric.nameTh}</div>
                      </td>
                      <td>{metric.category}</td>
                      <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{metric.refLabel}</td>
                      <td><span className="status-pill status-ready">{metric.status}</span></td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="icon-btn" title="Edit"><Edit2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              <strong>BA Note:</strong> Actual reference ranges are pulled securely from the LIS/Clinical configuration. Mobile App Config strictly manages visual labeling and translations.
            </p>
          </div>
        )}

        {/* Questionnaire */}
        {activeTab === 'Questionnaire' && (
          <div className="fadeIn">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <button className="btn-primary-small"><Plus size={14} style={{ marginRight: '6px' }} /> Add Question</button>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '24px' }}>
              <AlertTriangle size={20} style={{ color: 'var(--warning)', flexShrink: 0 }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Data Retention Rule Active</h4>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Questions with existing patient answers cannot be hard deleted; they may only be deactivated. Modifying answer types of existing questions will trigger a data migration warning.
                </p>
              </div>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Question (EN)</th>
                    <th>Type</th>
                    <th>Section</th>
                    <th>Required</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q) => (
                    <tr key={q.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>{q.qId}</td>
                      <td style={{ fontWeight: 600 }}>{q.en}</td>
                      <td>{q.type}</td>
                      <td>{q.section}</td>
                      <td>{q.required}</td>
                      <td><span className="status-pill status-ready">{q.status}</span></td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="icon-btn" title="Edit"><Edit2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'Notifications' && (
          <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notifications.map((notif) => (
              <div key={notif.id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 8px', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-secondary)', display: 'inline-block', marginBottom: '8px' }}>
                      EVENT: {notif.event}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{notif.title}</h4>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked={notif.status === 'Active'} />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Body Template (EN)</label>
                    <textarea rows={2} defaultValue={notif.template} style={{ resize: 'vertical' }}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Body Template (TH)</label>
                    <textarea rows={2} placeholder="Thai translation..." style={{ resize: 'vertical' }}></textarea>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button className="btn-secondary-small">Save Template</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help & Support */}
        {activeTab === 'Help & Support' && (
          <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="security-card" style={{ marginBottom: 0, backgroundColor: '#fafafa' }}>
              <div className="security-card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Contact Information</h4>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Support Email</label>
                  <input type="email" defaultValue="support@healthhub.com" />
                </div>
                <div className="form-group">
                  <label>Support Phone</label>
                  <input type="text" defaultValue="+66 2 123 4567" />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label>Operating Hours (Display String)</label>
                <input type="text" defaultValue="Mon-Fri, 9:00 AM - 6:00 PM ICT" />
              </div>
            </div>

            <div className="security-card" style={{ marginBottom: 0 }}>
              <div className="security-card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>FAQ Content</h4>
                <button className="btn-secondary-small"><Plus size={14} style={{ marginRight: '4px' }} /> Add FAQ</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'How is my health score calculated?',
                  'How do I view past lab results?',
                  'Is my health data secure?'
                ].map((q, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: '#fafafa' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{q}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="icon-btn"><Edit2 size={16} /></button>
                      <button className="icon-btn" style={{ color: 'var(--danger)' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Consent Content */}
        {activeTab === 'Consent Content' && (
          <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {['Terms & Conditions', 'Privacy Policy', 'Data Sharing Consent'].map(doc => (
              <div key={doc} className="security-card" style={{ marginBottom: 0, backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{doc}</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>v2.4 (Published 14 Sep 2026)</span>
                </div>
                
                <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
                  <button style={{ background: 'none', border: 'none', borderBottom: '2px solid var(--primary)', padding: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', cursor: 'pointer' }}>English</button>
                  <button style={{ background: 'none', border: 'none', padding: '0 0 8px 0', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', cursor: 'pointer' }}>Thai (ภาษาไทย)</button>
                </div>

                <div className="form-group">
                  <textarea 
                    rows={5}
                    style={{ fontFamily: 'monospace', fontSize: '13px', resize: 'vertical' }}
                    defaultValue={`This is the standard content for ${doc}...`}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button className="btn-secondary-small">Save Text Content</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preview & Publish */}
        {activeTab === 'Preview & Publish' && (
          <div className="fadeIn" style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Globe size={32} />
              </div>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700 }}>Publish Configuration</h2>
              <p style={{ margin: '0 0 32px 0', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                You are about to publish the current Draft configuration to the mobile app environment. This will update the patient experience immediately.
              </p>
              
              <div style={{ width: '100%', backgroundColor: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px', marginBottom: '32px', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>
                  Changes in this draft ({lastSaved})
                </h4>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-main)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Updated "Help & Support" FAQs
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-main)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Modified display order in "Dashboard Display"
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-main)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Drafted new Questionnaire: "Lifestyle Survey"
                  </li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Preview on Mobile Simulator
                </button>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1, justifyContent: 'center', backgroundColor: configStatus === 'Published' ? 'var(--success)' : 'var(--primary)' }}
                  onClick={handlePublish}
                  disabled={configStatus === 'Published'}
                >
                  {configStatus === 'Published' ? 'Already Published' : 'Publish to Mobile App'}
                </button>
              </div>
              <p style={{ margin: '24px 0 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                All changes will be permanently recorded in the system audit logs under your account.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
