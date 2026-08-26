import { useState } from 'react';
import { Search, Filter, RefreshCcw, Activity, AlertCircle, CheckCircle2, Bell, Mail, Smartphone } from 'lucide-react';
import './Dashboard.css';

const MOCK_LIS_MESSAGES = [
  { id: 'MSG-8821', type: 'Outbound Order', clinic: 'Downtown Clinic', status: 'Failed', attempt: 3, timestamp: '10 mins ago', error: 'ERR_TIMEOUT: LIS endpoint unreachable' },
  { id: 'MSG-8822', type: 'Inbound Result', clinic: 'Uptown Hospital', status: 'Rejected', attempt: 1, timestamp: '1 hour ago', error: 'ERR_UNMAPPED: Unknown LIS Test Code "XYZ_99"' },
  { id: 'MSG-8823', type: 'Outbound Order', clinic: 'Downtown Clinic', status: 'Success', attempt: 1, timestamp: '2 hours ago', error: '-' },
  { id: 'MSG-8824', type: 'Outbound Order', clinic: 'North Park Clinic', status: 'Pending Retry', attempt: 2, timestamp: '3 hours ago', error: 'ERR_NETWORK: Connection reset' },
];

const MOCK_NOTIF_MESSAGES = [
  { id: 'NOT-1001', type: 'SMS', clinic: 'Downtown Clinic', recipient: '081-xxx-1234', status: 'Delivered', attempt: 1, timestamp: '5 mins ago', error: '-' },
  { id: 'NOT-1002', type: 'Email', clinic: 'Platform', recipient: 'sarah@example.com', status: 'Failed', attempt: 3, timestamp: '12 mins ago', error: 'ERR_BOUNCE: Invalid address' },
  { id: 'NOT-1003', type: 'In-App', clinic: 'Uptown Hospital', recipient: 'Dr. Narong', status: 'Read', attempt: 1, timestamp: '1 hour ago', error: '-' },
  { id: 'NOT-1004', type: 'SMS', clinic: 'Downtown Clinic', recipient: '089-xxx-5555', status: 'Pending', attempt: 1, timestamp: '2 mins ago', error: '-' },
];

export default function IntegrationMonitoring() {
  const [activeTab, setActiveTab] = useState('LIS');
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="h-full flex flex-col relative overflow-hidden p-6 bg-slate-50/50">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="prem-title">Integration Monitoring</h1>
          <p className="prem-subtitle mt-2">Monitor HL7/API integration messages and Notification Delivery (SMS, Email, In-App).</p>
        </div>
      </div>

      <div className="prem-tabs mb-6 self-start">
        <button 
          className={`prem-tab ${activeTab === 'LIS' ? 'active' : ''}`}
          onClick={() => setActiveTab('LIS')}
        >
          <Activity size={16} /> LIS HL7 / API
        </button>
        <button 
          className={`prem-tab ${activeTab === 'Notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('Notifications')}
        >
          <Bell size={16} /> Notification Delivery
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="prem-metric-card">
          <div className="flex items-start justify-between">
            <div className="card-content">
              <span className="metric-label">LIS Connection</span>
              <span className="prem-metric-value text-emerald-600">Stable</span>
              <div className="text-xs text-slate-500 font-medium mt-1">Downtown & Uptown</div>
            </div>
            <div className="prem-icon-blob" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
              <Activity size={24} />
            </div>
          </div>
        </div>
        <div className="prem-metric-card">
          <div className="flex items-start justify-between">
            <div className="card-content">
              <span className="metric-label">Failed Messages</span>
              <span className="prem-metric-value text-rose-600">12</span>
              <div className="text-xs text-rose-600/80 font-medium mt-1">Last 24 hours</div>
            </div>
            <div className="prem-icon-blob" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
              <AlertCircle size={24} />
            </div>
          </div>
        </div>
        <div className="prem-metric-card">
          <div className="flex items-start justify-between">
            <div className="card-content">
              <span className="metric-label">Pending Retry</span>
              <span className="prem-metric-value text-amber-500">5</span>
              <div className="text-xs text-amber-600/80 font-medium mt-1">Auto-retry in progress</div>
            </div>
            <div className="prem-icon-blob" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
              <RefreshCcw size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4 mb-4 flex items-center justify-between bg-white/60">
        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200" style={{ width: '300px' }}>
          <Search size={16} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search by Message ID..." 
            className="bg-transparent border-none outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="prem-btn-secondary py-2">
          <Filter size={16} /> Filter by Status
        </button>
      </div>

      <div className="flex-1 overflow-auto glass-panel p-1">
        <table className="prem-table">
          <thead>
            {activeTab === 'LIS' ? (
              <tr>
                <th>Message ID & Type</th>
                <th>Clinic</th>
                <th>Status</th>
                <th>Error Details</th>
                <th>Timestamp & Attempt</th>
                <th className="text-right">Actions</th>
              </tr>
            ) : (
              <tr>
                <th>Notification ID & Type</th>
                <th>Clinic</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Error Details</th>
                <th>Timestamp & Attempt</th>
              </tr>
            )}
          </thead>
          <tbody>
            {activeTab === 'LIS' ? MOCK_LIS_MESSAGES.map(msg => (
              <tr key={msg.id}>
                <td>
                  <div className="font-mono text-indigo-700 font-semibold">{msg.id}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{msg.type}</div>
                </td>
                <td className="text-sm font-semibold text-slate-700">{msg.clinic}</td>
                <td>
                  <span className={`prem-badge ${msg.status === 'Success' ? 'success' : msg.status === 'Failed' || msg.status === 'Rejected' ? 'danger' : 'warning'}`}>
                    {msg.status === 'Success' && <CheckCircle2 size={12} />}
                    {(msg.status === 'Failed' || msg.status === 'Rejected') && <AlertCircle size={12} />}
                    {msg.status === 'Pending Retry' && <RefreshCcw size={12} />}
                    {msg.status}
                  </span>
                </td>
                <td className="text-sm font-mono text-slate-500 max-w-xs truncate" title={msg.error}>
                  {msg.error}
                </td>
                <td>
                  <div className="text-sm font-medium text-slate-700">{msg.timestamp}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Attempt: {msg.attempt}</div>
                </td>
                <td className="text-right">
                  <button className="text-slate-400 hover:text-indigo-600 transition-colors p-2 disabled:opacity-30 disabled:hover:text-slate-400" title="Manual Retry" disabled={msg.status === 'Success'}>
                    <RefreshCcw size={16} />
                  </button>
                </td>
              </tr>
            )) : MOCK_NOTIF_MESSAGES.map(msg => (
              <tr key={msg.id}>
                <td>
                  <div className="font-mono text-indigo-700 font-semibold flex items-center gap-2">
                    {msg.type === 'SMS' && <Smartphone size={14} className="text-slate-400" />}
                    {msg.type === 'Email' && <Mail size={14} className="text-slate-400" />}
                    {msg.type === 'In-App' && <Bell size={14} className="text-slate-400" />}
                    {msg.id}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{msg.type}</div>
                </td>
                <td className="text-sm font-semibold text-slate-700">{msg.clinic}</td>
                <td className="text-sm font-medium text-slate-800">{msg.recipient}</td>
                <td>
                  <span className={`prem-badge ${msg.status === 'Delivered' || msg.status === 'Read' ? 'success' : msg.status === 'Failed' ? 'danger' : 'warning'}`}>
                    {(msg.status === 'Delivered' || msg.status === 'Read') && <CheckCircle2 size={12} />}
                    {msg.status === 'Failed' && <AlertCircle size={12} />}
                    {msg.status === 'Pending' && <RefreshCcw size={12} />}
                    {msg.status}
                  </span>
                </td>
                <td className="text-sm font-mono text-slate-500 max-w-xs truncate" title={msg.error}>
                  {msg.error}
                </td>
                <td>
                  <div className="text-sm font-medium text-slate-700">{msg.timestamp}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Attempt: {msg.attempt}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
