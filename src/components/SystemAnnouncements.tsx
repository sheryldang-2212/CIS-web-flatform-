import { useState } from 'react';
import { MessageSquare, Plus, X, Calendar, Globe2, Save, Send, AlertTriangle } from 'lucide-react';
import './Dashboard.css';

export default function SystemAnnouncements() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="h-full flex flex-col relative overflow-hidden p-6 bg-slate-50/50">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl mb-6 shadow-sm flex items-start gap-4">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="text-amber-800 font-bold">Scope Confirmation Required</h3>
          <p className="text-amber-700 text-sm mt-2 leading-relaxed">
            The project scope confirms notification delivery infrastructure, but a full content-management system UI for announcements may be outside MVP. This interface is for demonstration purposes.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="prem-title">Announcements</h2>
          <p className="prem-subtitle mt-2">Manage system announcements and communications</p>
        </div>
        <button className="prem-btn-primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} /> New Announcement
        </button>
      </div>

      <div className="flex-1 overflow-auto flex flex-col gap-4">
        <div className="glass-panel p-6 flex gap-6 items-start transition-all hover:shadow-md hover:border-indigo-200">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MessageSquare size={26} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-3">
              <h4 className="font-bold text-slate-800 text-lg m-0">System Maintenance Scheduled</h4>
              <span className="text-sm font-medium text-slate-500">Aug 15, 2026</span>
            </div>
            <p className="text-sm text-slate-600 m-0 leading-relaxed max-w-4xl">
              The system will undergo scheduled maintenance on Sunday from 02:00 AM to 04:00 AM. Access might be interrupted during this window.
            </p>
            <div className="mt-4 flex gap-2 items-center">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md font-semibold">Published</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">All Clinics</span>
              <span className="text-xs font-medium text-slate-400 ml-auto">Delivered to 1,204 users</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 flex gap-6 items-start opacity-75 transition-all hover:opacity-100 hover:shadow-md hover:border-indigo-200">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Calendar size={26} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-3">
              <h4 className="font-bold text-slate-800 text-lg m-0">Q3 Policy Updates</h4>
              <span className="text-sm font-medium text-slate-500">Scheduled: Sep 01, 2026</span>
            </div>
            <p className="text-sm text-slate-600 m-0 leading-relaxed max-w-4xl">
              New lab requisition policies will take effect on Sep 1st. Please review the updated documentation.
            </p>
            <div className="mt-4 flex gap-2 items-center">
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md font-semibold">Scheduled</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">Downtown Clinic, Uptown Hospital</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">Role: Doctor</span>
              <button className="text-xs text-rose-600 font-semibold ml-auto hover:text-rose-800 transition-colors">Cancel Publication</button>
            </div>
          </div>
        </div>
      </div>

      {showCreate && (
        <div className="prem-drawer-overlay">
          <div className="prem-drawer-content w-[600px] border-l border-slate-200/60 bg-white/95 backdrop-blur-xl">
            <div className="p-6 border-b border-slate-200/60 flex justify-between items-center bg-white/50">
              <h2 className="text-xl font-bold text-slate-800">Create Announcement</h2>
              <button className="text-slate-400 hover:text-slate-700 transition-colors" onClick={() => setShowCreate(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 flex-1 overflow-auto flex flex-col gap-8">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">English Content</label>
                <input type="text" className="prem-input mb-3" placeholder="Subject / Title (EN)" />
                <textarea className="prem-input h-28 resize-none" placeholder="Announcement body in English..."></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Globe2 size={14} /> Thai Content
                </label>
                <input type="text" className="prem-input mb-3" placeholder="Subject / Title (TH)" />
                <textarea className="prem-input h-28 resize-none" placeholder="Announcement body in Thai..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Target Clinics</label>
                  <select className="prem-input h-32" multiple>
                    <option value="all" selected>All Clinics</option>
                    <option value="c1">Downtown Clinic</option>
                    <option value="c2">Uptown Hospital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Target Roles</label>
                  <select className="prem-input h-32" multiple>
                    <option value="all" selected>All Roles</option>
                    <option value="doctor">Doctors</option>
                    <option value="tech">Technicians</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Delivery Channels</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /> In-App Notification
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /> Email
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /> SMS
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200/60 bg-white/50 flex justify-between items-center">
              <button className="prem-btn-secondary" onClick={() => setShowCreate(false)}>Preview</button>
              <div className="flex gap-3">
                <button className="prem-btn-secondary text-indigo-600 border-indigo-200 hover:bg-indigo-50" onClick={() => setShowCreate(false)}>
                  <Save size={16} /> Save Draft
                </button>
                <button className="prem-btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white" onClick={() => setShowCreate(false)}>
                  <Calendar size={16} /> Schedule
                </button>
                <button className="prem-btn-primary" onClick={() => setShowCreate(false)}>
                  <Send size={16} /> Publish Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
