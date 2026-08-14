import React from 'react';
import { BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';
import './ReportsAnalytics.css'; // We'll create a simple CSS for this

export default function ReportsAnalytics() {
  return (
    <div className="reports-container fadeIn">
      <div className="reports-header">
        <div>
          <h2>Reports & Analytics</h2>
          <p>System-wide operational reporting and analysis</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={16} /> Export All
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            <BarChart3 size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Test Orders</span>
            <span className="metric-value">12,450</span>
            <span className="metric-trend positive"><TrendingUp size={14}/> +15% this month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#fce7f3', color: '#db2777' }}>
            <PieChart size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Active Clinics</span>
            <span className="metric-value">48</span>
            <span className="metric-trend positive"><TrendingUp size={14}/> +3 this month</span>
          </div>
        </div>
      </div>

      <div className="reports-content-placeholder">
        <div className="placeholder-chart">
          <p>Detailed charts and data tables will be rendered here.</p>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Includes: Operational reporting, Lab demand and volume analysis, Patient demographic analysis.</span>
        </div>
      </div>
    </div>
  );
}
