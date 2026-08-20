import { useState } from 'react';
import { ArrowRight, AlertCircle, Clock, CheckCircle2, FileText, FileWarning } from 'lucide-react';
import './DoctorDashboard.css';

interface DoctorDashboardProps {
  setActiveTab: (tab: string) => void;
}

export default function DoctorDashboard({ setActiveTab }: DoctorDashboardProps) {
  const [filter, setFilter] = useState('All');
  
  return (
    <div className="doc-dash-container">
      {/* Header */}
      <div className="doc-dash-header">
        <div>
          <h1 className="doc-dash-title">Doctor Dashboard</h1>
          <p className="doc-dash-subtitle">Review results requiring your attention</p>
        </div>
        <div className="doc-dash-date">
          <span className="date-label">Date:</span> 20 Aug 2026
        </div>
      </div>

      {/* Stats Row */}
      <div className="doc-stats-grid">
        <div className="doc-stat-card">
          <div className="doc-stat-info">
            <span className="doc-stat-label">Pending My<br/>Review</span>
            <span className="doc-stat-value">10</span>
          </div>
          <div className="doc-stat-icon pending"><Clock size={24}/></div>
        </div>
        <div className="doc-stat-card">
          <div className="doc-stat-info">
            <span className="doc-stat-label">Confidential<br/>Test</span>
            <span className="doc-stat-value text-danger">2</span>
          </div>
          <div className="doc-stat-icon critical"><AlertCircle size={24}/></div>
        </div>
        <div className="doc-stat-card">
          <div className="doc-stat-info">
            <span className="doc-stat-label">Urgent<br/>Unreviewed</span>
            <span className="doc-stat-value text-warning">3</span>
          </div>
          <div className="doc-stat-icon urgent"><FileWarning size={24}/></div>
        </div>
        <div className="doc-stat-card">
          <div className="doc-stat-info">
            <span className="doc-stat-label">Reviewed<br/>Today</span>
            <span className="doc-stat-value text-success">8</span>
          </div>
          <div className="doc-stat-icon success"><CheckCircle2 size={24}/></div>
        </div>
      </div>



      <div className="doc-dash-main">
        <div className="doc-dash-col-left">
          {/* My Review Queue */}
          <div className="doc-widget">
            <div className="doc-widget-header border-none pb-0">
              <h2 className="doc-widget-title">MY REVIEW QUEUE</h2>
            </div>
            
            <div className="doc-queue-filters">
              {['All', 'Urgent', 'Normal'].map(f => (
                <button 
                  key={f} 
                  className={`doc-filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="doc-table-container">
              <table className="doc-queue-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Key finding</th>
                    <th>Result flag</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">Emily J.</td>
                    <td>Potassium 6.7</td>
                    <td><span className="badge badge-critical">Critical</span></td>
                    <td className="text-right">
                      <button className="doc-btn-action" onClick={() => setActiveTab('Lab Results')}>Review Now</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">David W.</td>
                    <td>LDL 190</td>
                    <td><span className="badge badge-abnormal">Abnormal</span></td>
                    <td className="text-right">
                      <button className="doc-btn-action" onClick={() => setActiveTab('Lab Results')}>Review Now</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Sarah P.</td>
                    <td>CBC</td>
                    <td><span className="badge badge-normal">Normal</span></td>
                    <td className="text-right">
                      <button className="doc-btn-action" onClick={() => setActiveTab('Lab Results')}>Review Now</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-widget-footer">
              <button className="doc-btn-link" onClick={() => setActiveTab('Lab Results')}>
                View Full Review Queue <ArrowRight size={16}/>
              </button>
            </div>
          </div>
        </div>

        <div className="doc-dash-col-right">
          {/* ATTENTION REQUIRED */}
          <div className="doc-widget">
            <div className="doc-widget-header">
              <h2 className="doc-widget-title">ATTENTION REQUIRED</h2>
            </div>
            <div className="doc-attention-list">
              <div className="doc-attention-item">
                <div className="doc-att-type">
                  <span className="status-dot critical"></span> Critical Result
                </div>
                <div className="doc-att-details">
                  <span className="patient-name">Emily Johnson</span> &bull; Potassium 6.7
                </div>
                <button className="doc-btn-review" onClick={() => setActiveTab('Lab Results')}>Review Now</button>
              </div>
              <div className="doc-attention-item">
                <div className="doc-att-type">
                  <span className="status-dot urgent"></span> Urgent Order
                </div>
                <div className="doc-att-details">
                  <span className="patient-name">David Wilson</span> &bull; Cardiac Panel
                </div>
                <button className="doc-btn-review" onClick={() => setActiveTab('Lab Results')}>Review Now</button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="doc-widget">
            <div className="doc-widget-header">
              <h2 className="doc-widget-title">RECENT ACTIVITY</h2>
            </div>
            <div className="doc-activity-list">
              <div className="doc-activity-item">
                <div className="doc-activity-icon success"><CheckCircle2 size={16}/></div>
                <div className="doc-activity-content">
                  <div className="doc-activity-text">Approved result &bull; <strong>Emily Johnson</strong></div>
                  <div className="doc-activity-time">10:30 AM</div>
                </div>
              </div>
              <div className="doc-activity-item">
                <div className="doc-activity-icon warning"><FileText size={16}/></div>
                <div className="doc-activity-content">
                  <div className="doc-activity-text">Returned result to LIS &bull; <strong>David Wilson</strong></div>
                  <div className="doc-activity-time">09:45 AM</div>
                </div>
              </div>
              <div className="doc-activity-item">
                <div className="doc-activity-icon success"><CheckCircle2 size={16}/></div>
                <div className="doc-activity-content">
                  <div className="doc-activity-text">Approved result &bull; <strong>Sarah Parker</strong></div>
                  <div className="doc-activity-time">09:15 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
