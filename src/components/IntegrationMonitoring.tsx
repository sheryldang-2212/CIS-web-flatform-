import { useState } from 'react';
import { Search, Filter, RefreshCcw, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import './Dashboard.css';

const MOCK_MESSAGES = [
  { id: 'MSG-8821', type: 'Outbound Order', clinic: 'Downtown Clinic', status: 'Failed', attempt: 3, timestamp: '10 mins ago', error: 'ERR_TIMEOUT: LIS endpoint unreachable' },
  { id: 'MSG-8822', type: 'Inbound Result', clinic: 'Uptown Hospital', status: 'Rejected', attempt: 1, timestamp: '1 hour ago', error: 'ERR_UNMAPPED: Unknown LIS Test Code "XYZ_99"' },
  { id: 'MSG-8823', type: 'Outbound Order', clinic: 'Downtown Clinic', status: 'Success', attempt: 1, timestamp: '2 hours ago', error: '-' },
  { id: 'MSG-8824', type: 'Outbound Order', clinic: 'North Park Clinic', status: 'Pending Retry', attempt: 2, timestamp: '3 hours ago', error: 'ERR_NETWORK: Connection reset' },
];

export default function IntegrationMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="dashboard-container h-full flex flex-col">
      <div className="dashboard-header">
        <div>
          <h1 className="text-2xl font-bold">Integration Monitoring</h1>
          <p className="text-muted">Monitor HL7/API integration messages with Laboratory Information Systems.</p>
        </div>
      </div>

      <div className="summary-cards mt-6" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            <Activity size={24} />
          </div>
          <div className="card-content">
            <h3 className="card-label">LIS Connection</h3>
            <div className="card-value text-green-600" style={{ fontSize: '1.25rem' }}>Stable</div>
            <div className="text-xs text-gray-500 font-medium mt-1">Downtown & Uptown</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
            <AlertCircle size={24} />
          </div>
          <div className="card-content">
            <h3 className="card-label">Failed Messages</h3>
            <div className="card-value">12</div>
            <div className="text-xs text-red-600 font-medium mt-1">Last 24 hours</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
            <RefreshCcw size={24} />
          </div>
          <div className="card-content">
            <h3 className="card-label">Pending Retry</h3>
            <div className="card-value">5</div>
            <div className="text-xs text-orange-600 font-medium mt-1">Auto-retry in progress</div>
          </div>
        </div>
      </div>

      <div className="table-controls mt-6">
        <div className="search-bar" style={{ width: '300px' }}>
          <Search size={20} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search by Message ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-secondary">
          <Filter size={16} className="mr-2" />
          Filter by Status
        </button>
      </div>

      <div className="table-container mt-4 flex-1">
        <table className="data-table">
          <thead>
            <tr>
              <th>Message ID & Type</th>
              <th>Clinic</th>
              <th>Status</th>
              <th>Error Details</th>
              <th>Timestamp & Attempt</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_MESSAGES.map(msg => (
              <tr key={msg.id}>
                <td>
                  <div className="font-mono text-indigo-700 font-medium">{msg.id}</div>
                  <div className="text-xs text-gray-500 mt-1">{msg.type}</div>
                </td>
                <td className="text-sm font-medium">{msg.clinic}</td>
                <td>
                  <span className={`status-badge ${msg.status === 'Success' ? 'success' : msg.status === 'Failed' ? 'error' : 'warning'}`}>
                    {msg.status === 'Success' && <CheckCircle2 size={12} className="mr-1" />}
                    {msg.status === 'Failed' && <AlertCircle size={12} className="mr-1" />}
                    {msg.status === 'Pending Retry' && <RefreshCcw size={12} className="mr-1" />}
                    {msg.status}
                  </span>
                </td>
                <td className="text-sm font-mono text-gray-600 max-w-xs truncate" title={msg.error}>
                  {msg.error}
                </td>
                <td>
                  <div className="text-sm">{msg.timestamp}</div>
                  <div className="text-xs text-gray-500 mt-1">Attempt: {msg.attempt}</div>
                </td>
                <td className="text-right">
                  <button className="btn-icon" title="Manual Retry" disabled={msg.status === 'Success'}>
                    <RefreshCcw size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
