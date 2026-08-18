import { Building2, Users, AlertTriangle, ShieldAlert, Activity, BellRing, ChevronRight } from 'lucide-react';
import './Dashboard.css'; // Reuse Dashboard styles for consistency

export default function PlatformDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="text-2xl font-bold">Platform Overview</h1>
          <p className="text-muted">High-level operational metrics across all clinics.</p>
        </div>
      </div>

      <div className="summary-cards" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
            <Building2 size={24} />
          </div>
          <div className="card-content">
            <h3 className="card-label">Total Clinics</h3>
            <div className="card-value">12</div>
            <div className="text-xs text-green-600 font-medium mt-1">10 Active · 2 Suspended</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            <Users size={24} />
          </div>
          <div className="card-content">
            <h3 className="card-label">Total Staff Accounts</h3>
            <div className="card-value">248</div>
            <div className="text-xs text-green-600 font-medium mt-1">240 Active · 8 Suspended</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="card-content">
            <h3 className="card-label">LIS Failures</h3>
            <div className="card-value">14</div>
            <div className="text-xs text-red-600 font-medium mt-1">Requires Attention</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
            <ShieldAlert size={24} />
          </div>
          <div className="card-content">
            <h3 className="card-label">Security Alerts</h3>
            <div className="card-value">3</div>
            <div className="text-xs text-red-600 font-medium mt-1">In last 24 hours</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid mt-6">
        <div className="dashboard-widget">
          <div className="widget-header">
            <h2 className="widget-title">Recently Created Clinics</h2>
            <button className="btn-icon"><ChevronRight size={20}/></button>
          </div>
          <div className="widget-body p-0">
            <ul className="queue-list">
              <li className="queue-item">
                <div className="queue-patient-info">
                  <div className="queue-avatar" style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}>
                    <Building2 size={20} />
                  </div>
                  <div className="queue-details">
                    <span className="queue-name">Westside Health Center</span>
                    <span className="queue-purpose">Active · Setup Complete</span>
                  </div>
                </div>
                <div className="queue-status">
                  <span className="queue-time">2 days ago</span>
                </div>
              </li>
              <li className="queue-item">
                <div className="queue-patient-info">
                  <div className="queue-avatar" style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}>
                    <Building2 size={20} />
                  </div>
                  <div className="queue-details">
                    <span className="queue-name">North Park Clinic</span>
                    <span className="queue-purpose text-warning">Setup Pending LIS Config</span>
                  </div>
                </div>
                <div className="queue-status">
                  <span className="queue-time">5 days ago</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="dashboard-widget">
          <div className="widget-header">
            <h2 className="widget-title">System & Integration Status</h2>
            <button className="btn-icon"><ChevronRight size={20}/></button>
          </div>
          <div className="widget-body p-0">
            <ul className="queue-list">
              <li className="queue-item">
                <div className="queue-patient-info">
                  <div className="queue-avatar" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                    <Activity size={20} />
                  </div>
                  <div className="queue-details">
                    <span className="queue-name">LIS Integration (Downtown Clinic)</span>
                    <span className="queue-purpose">14 Failed Messages (Pending Retry)</span>
                  </div>
                </div>
                <div className="queue-status">
                  <span className="queue-time">1 hr ago</span>
                </div>
              </li>
              <li className="queue-item">
                <div className="queue-patient-info">
                  <div className="queue-avatar" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
                    <BellRing size={20} />
                  </div>
                  <div className="queue-details">
                    <span className="queue-name">Notification Delivery</span>
                    <span className="queue-purpose">SMS Provider API Latency High</span>
                  </div>
                </div>
                <div className="queue-status">
                  <span className="queue-time">3 hrs ago</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
