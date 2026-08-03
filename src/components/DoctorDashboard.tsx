import React from 'react';
import { Activity, CheckCircle, FileText, AlertTriangle, FileSearch } from 'lucide-react';
import './DoctorDashboard.css';

export default function DoctorDashboard() {
  return (
    <div className="doctor-dashboard">
      <div className="dd-header">
        <h1>Doctor Dashboard</h1>
        <p>Review lab results and add clinical comments</p>
      </div>

      <div className="dd-kpis">
        <div className="dd-kpi-card">
          <div className="dd-kpi-header">
            <span>Pending Review</span>
            <FileText size={16} className="dd-kpi-icon" />
          </div>
          <div className="dd-kpi-value warning">0</div>
          <div className="dd-kpi-desc">Results awaiting review</div>
        </div>

        <div className="dd-kpi-card">
          <div className="dd-kpi-header">
            <span>Reviewed Today</span>
            <CheckCircle size={16} className="dd-kpi-icon" />
          </div>
          <div className="dd-kpi-value success">0</div>
          <div className="dd-kpi-desc">Results reviewed today</div>
        </div>

        <div className="dd-kpi-card">
          <div className="dd-kpi-header">
            <span>Critical Results</span>
            <AlertTriangle size={16} className="dd-kpi-icon" />
          </div>
          <div className="dd-kpi-value danger">0</div>
          <div className="dd-kpi-desc">Need attention</div>
        </div>

        <div className="dd-kpi-card">
          <div className="dd-kpi-header">
            <span>Total Completed</span>
            <FileSearch size={16} className="dd-kpi-icon" />
          </div>
          <div className="dd-kpi-value">0</div>
          <div className="dd-kpi-desc">All completed results</div>
        </div>
      </div>

      <div className="dd-section">
        <h2 className="dd-section-title">
          <FileText size={18} /> Lab Results to Review
        </h2>
        <p className="dd-section-subtitle">Recent results requiring your attention</p>
        
        <div className="dd-empty-state">
          No results to review
        </div>

        <button className="dd-view-all">
          <FileSearch size={16} /> View All Results
        </button>
      </div>
    </div>
  );
}
