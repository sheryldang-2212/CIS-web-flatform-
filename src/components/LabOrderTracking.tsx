import React, { useState } from 'react';
import { Printer, Undo2, CheckCircle, Eye, Search } from 'lucide-react';
import LabResultReviewModal from './LabResultReviewModal';
import './LabOrderTracking.css';

const pendingOrders = [
  { id: 'CLINIC01-20260703-EMP001-005', patientName: 'Sophia Bailey', patientId: 'ID334455668', tests: 'CBC, Ferritin', time: 'Jul 30, 07:43', priority: 'Routine' },
  { id: 'CLINIC01-20260703-EMP001-006', patientName: 'Emily Johnson', patientId: 'ID1234567890', tests: 'Fasting Glucose, HbA1c', time: 'Jul 30, 06:43', priority: 'Routine' },
  { id: 'CLINIC02-20260703-EMP006-004', patientName: 'Benjamin Ward', patientId: 'ID445566779', tests: 'Coagulation (PT/INR), aPTT', time: 'Jul 30, 05:43', priority: 'Routine' },
  { id: 'CLINIC03-20260703-EMP009-002', patientName: 'Henry Adams', patientId: 'ID223344557', tests: 'Urinalysis, Creatinine', time: 'Jul 30, 04:43', priority: 'Routine' },
  { id: 'CLINIC03-20260703-EMP009-003', patientName: 'Charlotte Hughes', patientId: 'ID112233446', tests: 'Beta-hCG', time: 'Jul 30, 03:43', priority: 'Urgent' },
];

const inProgressOrders = [
  { id: 'CLINIC01-20260702-EMP001-004', patientName: 'John Smith', patientId: 'ID123456789', tests: 'CBC, Lipid Panel, TSH', collectionTime: 'Jul 29, 03:43', lastUpdated: 'Jul 29, 13:43', status: 'Sent To Lab', priority: 'Routine' },
  { id: 'CLINIC02-20260702-EMP006-003', patientName: 'Sarah Miller', patientId: 'ID678901234', tests: 'ALT, AST', collectionTime: 'Jul 29, 05:43', lastUpdated: 'Jul 29, 15:43', status: 'Sent To Lab', priority: 'Routine' },
  { id: 'CLINIC01-20260702-EMP001-005', patientName: 'Robert Davis', patientId: 'ID345678901', tests: 'CRP, ESR', collectionTime: 'Jul 29, 01:43', lastUpdated: 'Jul 29, 21:43', status: 'Received By Lab', priority: 'Routine' },
  { id: 'CLINIC03-20260702-EMP009-002', patientName: 'Jennifer Garcia', patientId: 'ID690123456', tests: 'CBC, Troponin', collectionTime: 'Jul 29, 13:43', lastUpdated: 'Jul 30, 03:43', status: 'Received By Lab', priority: 'Urgent' },
  { id: 'CLINIC01-20260702-EMP001-006', patientName: 'Lisa Brown', patientId: 'ID456789012', tests: 'HbA1c, Fasting Glucose', collectionTime: 'Jul 28, 21:43', lastUpdated: 'Jul 30, 05:43', status: 'Processing', priority: 'Routine' },
];

const completedOrders = [
  { id: 'CLINIC01-20240116-EMP001-003', patientName: 'Emily Johnson', patientId: 'MRN002', tests: 'Complete Metabolic Panel, TSH, Vitamin D', date: 'Jan 16, 2024', status: 'Result Available', priority: 'Routine' },
  { id: 'CLINIC01-20260701-EMP001-002', patientName: 'David Wilson', patientId: 'MRN005', tests: 'Total Cholesterol, LDL, HDL, Triglycerides', date: 'Jul 30, 2026', status: 'Doctor Review Pending', priority: 'Routine' },
  { id: 'CLINIC01-20260701-EMP001-003', patientName: 'John Smith', patientId: 'MRN001', tests: 'TSH, Free T4', date: 'Jul 29, 2026', status: 'Doctor Review Pending', priority: 'Routine' },
  { id: 'CLINIC01-20260701-EMP001-004', patientName: 'William Turner', patientId: 'MRN013', tests: 'CBC, Ferritin, Vitamin B12', date: 'Jul 29, 2026', status: 'Doctor Review Pending', priority: 'Routine' },
  { id: 'CLINIC02-20260701-EMP006-001', patientName: 'Michael Thompson', patientId: 'MRN007', tests: 'Uric Acid, Creatinine', date: 'Jul 29, 2026', status: 'Doctor Review Pending', priority: 'STAT' },
];

export default function LabOrderTracking() {
  const [activeTab, setActiveTab] = useState('Pending Pickup');
  const [selectedResultToReview, setSelectedResultToReview] = useState<any>(null);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Today');

  const renderTableContent = () => {
    if (activeTab === 'Pending Pickup') {
      return (
        <>
          <div className="lot-toolbar">
            <span className="lot-toolbar-text">Select orders to batch-mark as Picked Up</span>
            <button className="btn-batch-action">
              <CheckCircle size={14} /> Mark Selected as Picked Up
            </button>
          </div>
          <div className="lot-table-wrapper">
            <table className="lot-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" className="lot-table-checkbox" /></th>
                  <th>Lab Order ID</th>
                  <th>Patient</th>
                  <th>Tests Ordered</th>
                  <th>Collected Time</th>
                  <th>Priority</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map(order => (
                  <tr key={order.id}>
                    <td><input type="checkbox" className="lot-table-checkbox" /></td>
                    <td style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{order.id}</td>
                    <td>
                      <div className="lot-patient-cell">
                        <div className="lot-avatar">{order.patientName.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                          <span className="lot-patient-name">{order.patientName}</span>
                          <span className="lot-patient-id">ID: {order.patientId}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="lot-test-chips-container">
                        {order.tests.split(',').map((test, index) => (
                          <span key={index} className="lot-test-chip">{test.trim()}</span>
                        ))}
                      </div>
                    </td>
                    <td>{order.time}</td>
                    <td>
                      <span className={`lot-priority-badge lot-priority-${order.priority.toLowerCase()}`}>
                        {order.priority}
                      </span>
                    </td>
                    <td>
                      <div className="lot-actions">
                        <button className="btn-icon-only"><Printer size={16} /></button>
                        <button className="btn-lot-action"><Undo2 size={14} /> Undo Collection</button>
                        <button className="btn-lot-primary"><CheckCircle size={14} /> Picked Up</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }
    
    if (activeTab === 'In Progress') {
      return (
        <div className="lot-table-wrapper">
          <table className="lot-table">
            <thead>
              <tr>
                <th>Lab Order ID</th>
                <th>Patient</th>
                <th>Tests</th>
                <th>Collection Time</th>
                <th>Priority</th>
                <th>Last Updated</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {inProgressOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{order.id}</td>
                  <td>
                    <div className="lot-patient-cell">
                      <div className="lot-avatar">{order.patientName.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <span className="lot-patient-name">{order.patientName}</span>
                        <span className="lot-patient-id">ID: {order.patientId}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="lot-test-chips-container">
                      {order.tests.split(',').map((test, index) => (
                        <span key={index} className="lot-test-chip">{test.trim()}</span>
                      ))}
                    </div>
                  </td>
                  <td>{order.collectionTime}</td>
                  <td>
                    <span className={`lot-priority-badge lot-priority-${order.priority.toLowerCase()}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td>{order.lastUpdated}</td>
                  <td>
                    <span className={`lot-status-badge status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === 'Completed') {
      return (
        <div className="lot-table-wrapper">
          <table className="lot-table">
            <thead>
              <tr>
                <th>Lab Order ID</th>
                <th>Patient</th>
                <th>Tests</th>
                <th>Completed Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {completedOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{order.id}</td>
                  <td>
                    <div className="lot-patient-cell">
                      <div className="lot-avatar">{order.patientName.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <span className="lot-patient-name">{order.patientName}</span>
                        <span className="lot-patient-id">MRN: {order.patientId}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="lot-test-chips-container">
                      {order.tests.split(',').map((test, index) => (
                        <span key={index} className="lot-test-chip">{test.trim()}</span>
                      ))}
                    </div>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`lot-priority-badge lot-priority-${order.priority.toLowerCase()}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`lot-status-badge status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="lot-actions">
                      <button 
                        className="btn-lot-action"
                        onClick={() => setSelectedResultToReview(order)}
                      >
                        <Eye size={14} /> View Result
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="lot-container">
      <div className="lot-header">
        <h1 className="lot-title">Lab Order Tracking</h1>
        <p className="lot-subtitle">Track lab orders through collection, processing, and completion</p>
      </div>

      <div className="lot-content-card">
        <div className="lot-tabs-container">
          <div className="lot-tabs">
            <button 
              className={`lot-tab ${activeTab === 'Pending Pickup' ? 'active' : ''}`}
              onClick={() => setActiveTab('Pending Pickup')}
            >
              Pending Pickup (5)
            </button>
            <button 
              className={`lot-tab ${activeTab === 'In Progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('In Progress')}
            >
              In Progress (5)
            </button>
            <button 
              className={`lot-tab ${activeTab === 'Completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('Completed')}
            >
              Completed (20)
            </button>
          </div>
        </div>

        <div className="lot-filters-bar">
          <div className="lot-search">
            <Search size={16} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search by Patient Name or Lab Order ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="lot-filter-group">
            <span className="lot-filter-label">Priority:</span>
            <select 
              className="lot-filter-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="STAT">STAT</option>
              <option value="Urgent">Urgent</option>
              <option value="Routine">Routine</option>
            </select>

            <span className="lot-filter-label">Date:</span>
            <select 
              className="lot-filter-select"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="All Time">All Time</option>
            </select>
            
            <button className="btn-lot-reset" onClick={() => {
              setSearchQuery('');
              setPriorityFilter('All');
              setDateFilter('Today');
            }}>Reset</button>
          </div>
        </div>

        {renderTableContent()}
      </div>

      {selectedResultToReview && (
        <LabResultReviewModal 
          result={selectedResultToReview}
          onClose={() => setSelectedResultToReview(null)}
        />
      )}
    </div>
  );
}
