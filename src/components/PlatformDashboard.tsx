import { RefreshCw, Building2, ShieldCheck, Settings, PauseCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import './Dashboard.css';

interface PlatformDashboardProps {
  setActiveTab?: (tab: string) => void;
}

export default function PlatformDashboard({}: PlatformDashboardProps) {
  return (
    <div className="admin-dashboard-container" style={{ padding: '24px', backgroundColor: '#f8fafc', height: '100%', overflowY: 'auto' }}>
      <div className="admin-dashboard-header">
        <div>
          <h1 className="page-title" style={{ marginBottom: '8px', fontSize: '24px', color: '#0f172a' }}>Platform Overview</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '6px', 
            padding: '6px 12px', background: 'white', 
            border: '1px solid #e2e8f0', borderRadius: '6px', 
            fontSize: '13px', fontWeight: 500, cursor: 'pointer', color: '#475569'
          }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Last updated: 24 Aug 2026, 08:45</span>
        </div>
      </div>

      <div className="admin-metrics-grid" style={{ marginBottom: '24px' }}>
        {/* Total Clinics */}
        <div className="admin-metric-card" style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '16px', alignItems: 'stretch' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Total Clinics</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>12</div>
            <div style={{ color: '#94a3b8' }}>
              <Building2 size={24} strokeWidth={1.5} />
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>All registered clinics</div>
        </div>

        {/* Active */}
        <div className="admin-metric-card" style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '16px', alignItems: 'stretch' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Active</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#16a34a', lineHeight: 1 }}>8</div>
            <div style={{ color: '#16a34a' }}>
              <ShieldCheck size={24} strokeWidth={1.5} />
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Clinics online</div>
        </div>

        {/* In Setup */}
        <div className="admin-metric-card" style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '16px', alignItems: 'stretch' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>In Setup</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>2</div>
            <div style={{ color: '#f97316' }}>
              <Settings size={24} strokeWidth={1.5} />
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Setup in progress</div>
        </div>

        {/* Suspended */}
        <div className="admin-metric-card" style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '16px', alignItems: 'stretch' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Suspended</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>2</div>
            <div style={{ color: '#94a3b8' }}>
              <PauseCircle size={24} strokeWidth={1.5} />
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Temporarily suspended</div>
        </div>
      </div>

      <div className="tech-dashboard-grid">
        {/* Clinic Status */}
        <div className="admin-section-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', margin: '0 0 24px 0' }}>Clinic Status</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px', marginBottom: '24px', flex: 1 }}>
            <div style={{ 
              position: 'relative', width: '160px', height: '160px', borderRadius: '50%', 
              background: 'conic-gradient(#ef4444 0% 17%, #f97316 17% 34%, #16a34a 34% 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <div style={{ 
                position: 'absolute', top: '16px', left: '16px', right: '16px', bottom: '16px', backgroundColor: 'white', borderRadius: '50%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>12</span>
                <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Total</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#16a34a' }}></div>
                  <span style={{ color: '#334155', fontWeight: 500 }}>Active</span>
                </div>
                <span style={{ color: '#64748b' }}>8 (67%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f97316' }}></div>
                  <span style={{ color: '#334155', fontWeight: 500 }}>In Setup</span>
                </div>
                <span style={{ color: '#64748b' }}>2 (17%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                  <span style={{ color: '#334155', fontWeight: 500 }}>Suspended</span>
                </div>
                <span style={{ color: '#64748b' }}>2 (17%)</span>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: 'auto' }}>As of 24 Aug 2026</div>
        </div>

        {/* Needs Attention */}
        <div className="admin-section-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', margin: '0 0 16px 0' }}>Needs Attention</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                  9
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>No Active Admin</span>
              </div>
              <span style={{ fontSize: '13px', color: '#64748b' }}>2 clinics</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AlertTriangle size={20} fill="#ffedd5" color="#f97316" strokeWidth={1.5} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>LIS Connection Error</span>
              </div>
              <span style={{ fontSize: '13px', color: '#64748b' }}>1 clinic</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Info size={14} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>Invitation Pending</span>
              </div>
              <span style={{ fontSize: '13px', color: '#64748b' }}>3 admins</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              View all alerts <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
