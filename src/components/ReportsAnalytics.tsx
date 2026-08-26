import { BarChart3, TrendingUp, Download, Building2, Users, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import './ReportsAnalytics.css';

export default function ReportsAnalytics() {
  return (
    <div className="h-full flex flex-col relative overflow-hidden p-6 bg-slate-50/50 fadeIn">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="prem-title">Operational Reports</h2>
          <p className="prem-subtitle mt-2">Lightweight operational metrics and summaries for platform monitoring.</p>
        </div>
        <button className="prem-btn-primary">
          <Download size={16} /> Export CSV Report
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="prem-metric-card">
          <div className="flex items-start justify-between">
            <div className="card-content">
              <span className="metric-label">Pending Collection</span>
              <span className="prem-metric-value text-slate-800">45</span>
              <div className="text-xs text-slate-500 font-medium mt-1">Samples awaiting collection</div>
            </div>
            <div className="prem-icon-blob" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
              <FileText size={24} />
            </div>
          </div>
        </div>
        
        <div className="prem-metric-card">
          <div className="flex items-start justify-between">
            <div className="card-content">
              <span className="metric-label">Pending Doctor Review</span>
              <span className="prem-metric-value text-slate-800">12</span>
              <div className="text-xs text-slate-500 font-medium mt-1">Results awaiting authorization</div>
            </div>
            <div className="prem-icon-blob" style={{ backgroundColor: '#f3e8ff', color: '#a855f7' }}>
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>
        
        <div className="prem-metric-card">
          <div className="flex items-start justify-between">
            <div className="card-content">
              <span className="metric-label">LIS Integration Failures</span>
              <span className="prem-metric-value text-rose-600">4</span>
              <div className="text-xs text-rose-600/80 font-medium mt-1">Requires immediate attention</div>
            </div>
            <div className="prem-icon-blob" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>

        <div className="prem-metric-card">
          <div className="flex items-start justify-between">
            <div className="card-content">
              <span className="metric-label">Order Volume (Today)</span>
              <span className="prem-metric-value text-slate-800">128</span>
              <div className="text-xs text-emerald-600 font-medium mt-1"><TrendingUp size={12} className="inline mr-1" />+12% vs yesterday</div>
            </div>
            <div className="prem-icon-blob" style={{ backgroundColor: '#f0fdf4', color: '#22c55e' }}>
              <BarChart3 size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="glass-panel p-6 hover:shadow-md hover:border-indigo-200 transition-all">
          <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building2 size={20} />
            </div>
            Clinic Status Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Active Clinics</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">10</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Clinics in Setup</span>
              <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">3</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Suspended Clinics</span>
              <span className="font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">2</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 hover:shadow-md hover:border-indigo-200 transition-all">
          <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users size={20} />
            </div>
            User Account Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Active Accounts</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">240</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Pending Invitations</span>
              <span className="font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">7</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Suspended / Locked</span>
              <span className="font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
