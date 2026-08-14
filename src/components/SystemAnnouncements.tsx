import { MessageSquare, Plus, Bell } from 'lucide-react';

export default function SystemAnnouncements() {
  return (
    <div className="fadeIn" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>Announcements</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Manage system announcements and communications</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> New Announcement
        </button>
      </div>

      <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MessageSquare size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h4 style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>System Maintenance Scheduled</h4>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Aug 15, 2026</span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              The system will undergo scheduled maintenance on Sunday from 02:00 AM to 04:00 AM. Access might be interrupted during this window.
            </p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '12px', backgroundColor: '#ecfdf5', color: '#059669', padding: '4px 8px', borderRadius: '4px', fontWeight: 500 }}>Active</span>
              <span style={{ fontSize: '12px', backgroundColor: '#f1f5f9', color: '#64748b', padding: '4px 8px', borderRadius: '4px' }}>All Clinics</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', gap: '16px', opacity: 0.7 }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bell size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h4 style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>New Feature: Bulk Upload</h4>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Aug 01, 2026</span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              We have released a new feature allowing platform admins to bulk upload patient data. Check the Patient Data tab for more details.
            </p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '12px', backgroundColor: '#f1f5f9', color: '#64748b', padding: '4px 8px', borderRadius: '4px', fontWeight: 500 }}>Expired</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
