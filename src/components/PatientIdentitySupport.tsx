import { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, Eye, Lock } from 'lucide-react';
import './Dashboard.css';

interface PatientMatch {
  id: string;
  maskedName: string;
  maskedId: string;
  maskedPhone: string;
  matchType: 'Exact Match' | 'Possible Duplicate';
  clinics: string[];
}

const MOCK_RESULTS: PatientMatch[] = [
  { id: 'P-101', maskedName: 'S*** C***', maskedId: '1-10**-*****-**-1', maskedPhone: '081-***-1234', matchType: 'Exact Match', clinics: ['Downtown Clinic', 'Uptown Hospital'] },
  { id: 'P-102', maskedName: 'S*** C***', maskedId: '1-10**-*****-**-8', maskedPhone: '081-***-1234', matchType: 'Possible Duplicate', clinics: ['North Park Clinic'] },
];

export default function PatientIdentitySupport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('National ID');
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<PatientMatch[]>([]);
  
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessReason, setAccessReason] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    
    // Simulate recording the search event in audit log
    console.log(`[AUDIT] Cross-clinic search performed by Platform Admin: ${searchType} = ${searchTerm}`);
    
    setResults(MOCK_RESULTS);
    setHasSearched(true);
  };

  const handleAccessIdentity = () => {
    setShowAccessModal(true);
  };

  const submitAccessReason = () => {
    // Simulate audit log for accessing identity
    console.log(`[AUDIT] Full identity accessed. Reason: ${accessReason}`);
    setShowAccessModal(false);
    setAccessReason('');
    alert("Identity details accessed. Action recorded in Audit Log.");
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden p-6 bg-slate-50/50">
      <div className="bg-rose-50 border-l-4 border-rose-500 p-5 rounded-r-xl mb-8 shadow-sm flex items-start gap-4">
        <ShieldAlert className="text-rose-600 shrink-0 mt-0.5" size={24} />
        <div>
          <h1 className="text-xl font-bold text-rose-900">Restricted Module: Patient Identity Support</h1>
          <p className="text-rose-800 text-sm mt-2 max-w-3xl leading-relaxed">
            This module is intended solely to support duplicate detection and identity troubleshooting across clinics. 
            All searches and profile access events are strictly recorded in the Platform Audit Log. Do not attempt to use this 
            for clinical viewing. Medical records and lab data are not accessible from this view.
          </p>
        </div>
      </div>

      <div className="glass-panel p-6 mb-8 bg-white/60">
        <h2 className="text-lg font-bold text-slate-800 mb-5">Cross-Clinic Identity Search</h2>
        <form onSubmit={handleSearch} className="flex gap-5 items-end">
          <div className="flex-1 max-w-xs">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Search Criteria</label>
            <select className="prem-input" value={searchType} onChange={e => setSearchType(e.target.value)}>
              <option>National ID</option>
              <option>Passport Number</option>
              <option>Name</option>
              <option>DOB (YYYY-MM-DD)</option>
              <option>Phone</option>
              <option>Email</option>
            </select>
          </div>
          <div className="flex-[2]">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Search Value</label>
            <input 
              type="text" 
              className="prem-input" 
              placeholder={`Enter ${searchType}...`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="prem-btn-primary mb-1">
            <Search size={16} /> Search
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="flex-1 overflow-auto glass-panel p-1 bg-white/50">
          <div className="flex items-center justify-between p-4 px-6 border-b border-slate-200/50">
            <h3 className="font-bold text-slate-800">Search Results</h3>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Sensitive PII is masked by default</span>
          </div>
          <table className="prem-table">
            <thead>
              <tr>
                <th>Masked Name</th>
                <th>Masked Identifier</th>
                <th>Masked Contact</th>
                <th>Match Confidence</th>
                <th>Known Clinics</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map(match => (
                <tr key={match.id}>
                  <td className="font-medium font-mono text-slate-800">{match.maskedName}</td>
                  <td className="font-mono text-slate-500">{match.maskedId}</td>
                  <td className="font-mono text-slate-500">{match.maskedPhone}</td>
                  <td>
                    {match.matchType === 'Exact Match' ? (
                      <span className="prem-badge success">
                        <CheckCircle2 size={12} /> Exact Match
                      </span>
                    ) : (
                      <span className="prem-badge warning">
                        <AlertTriangle size={12} /> Possible Duplicate
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {match.clinics.map(c => (
                        <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium border border-slate-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button className="prem-btn-secondary text-xs" onClick={() => handleAccessIdentity()}>
                        <Eye size={14} /> View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-500 font-medium bg-slate-50/50 rounded-b-xl">
                    No cross-clinic matches found for this search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Access Reason Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                <Lock size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Access Identity Details</h2>
            </div>
            
            <div className="p-6">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm mb-6 leading-relaxed">
                You are about to access unmasked Personally Identifiable Information (PII). 
                This action requires justification and will be permanently recorded in the Platform Audit Log.
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Reason for Access <span className="text-rose-500">*</span></label>
                <select 
                  className="prem-input mb-4"
                  value={accessReason}
                  onChange={(e) => setAccessReason(e.target.value)}
                >
                  <option value="" disabled>Select a reason...</option>
                  <option value="Duplicate Resolution">Duplicate Resolution / Merge Request</option>
                  <option value="Support Escalation">Support Escalation / Troubleshooting</option>
                  <option value="Compliance Audit">Compliance Audit</option>
                  <option value="Other">Other (Please specify below)</option>
                </select>
                <textarea 
                  className="prem-input" 
                  rows={3} 
                  placeholder="Provide additional details or ticket reference..."
                ></textarea>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button className="prem-btn-secondary" onClick={() => setShowAccessModal(false)}>Cancel</button>
              <button 
                className="prem-btn-primary" 
                onClick={submitAccessReason}
                disabled={!accessReason}
              >
                Access Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
