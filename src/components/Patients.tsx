import { useState } from 'react';
import { Search, Calendar, ChevronDown, Plus, MoreVertical, Eye, Edit2, Trash2, Send, Link } from 'lucide-react';
import PatientFormModal from './PatientFormModal';
import PatientDetail from './PatientDetail';
import EmailDemoModal from './EmailDemoModal';
import MobileAppSimulator from './MobileAppSimulator';
import './Patients.css';

const mockPatients = [
  { id: 'MRN001', name: 'Natthawut Srisomboon', idNumber: 'ID234567890', gender: 'Male', age: '38 years', dob: '14/03/1988', contact: '082-614-7293\nnatthawut.s@gmail.com', allergy: true, insurance: 'Thai Life\nTL-385190247', lastVisit: '22/07/2026', consentStatus: 'Linked', consentDetail: 'Linked on 30 Jul 2026' },
  { id: 'MRN002', name: 'Sirada Wongsawan', idNumber: 'ID312890456', gender: 'Female', age: '27 years', dob: '09/11/1998', contact: '091-208-5634\nsirada.w@hotmail.com', allergy: true, insurance: 'AIA Thailand\nAIA-724058163', lastVisit: '19/07/2026', consentStatus: 'Not Linked', consentDetail: 'Invitation sent' },
  { id: 'MRN003', name: 'Pongsakorn Thanakit', idNumber: 'ID478123905', gender: 'Male', age: '52 years', dob: '25/06/1974', contact: '087-935-1846\npongsakorn.t@yahoo.com', allergy: true, insurance: 'No insurance', lastVisit: '16/07/2026', consentStatus: 'Linked', consentDetail: 'Linked on 28 Jul 2026' },
  { id: 'MRN004', name: 'Kamolwan Prasertsri', idNumber: 'ID567234801', gender: 'Female', age: '31 years', dob: '18/02/1995', contact: '064-571-8023\nkamolwan.p@gmail.com', allergy: true, insurance: 'Bangkok Insurance\nBI-841260395', lastVisit: '14/07/2026', consentStatus: 'Not Linked', consentDetail: 'Expired' },
  { id: 'MRN005', name: 'Chaiwat Lertpanich', idNumber: 'ID623789014', gender: 'Male', age: '45 years', dob: '07/09/1980', contact: '089-347-6512\nchaiwat.l@outlook.com', allergy: true, insurance: 'No insurance', lastVisit: '10/07/2026', consentStatus: 'Not Linked', consentDetail: 'Declined' },
  { id: 'MRN006', name: 'Pimchanok Ketkaew', idNumber: 'ID890345672', gender: 'Female', age: '34 years', dob: '21/12/1991', contact: '096-482-3197\npimchanok.k@gmail.com', allergy: true, insurance: 'No insurance', lastVisit: '08/07/2026', consentStatus: 'Linked', consentDetail: 'Linked on 20 Jun 2026' },
  { id: 'MRN007', name: 'Sompong Kittisak', idNumber: 'ID745012389', gender: 'Male', age: '58 years', dob: '03/04/1968', contact: '083-926-4175\nsompong.k@hotmail.com', allergy: true, insurance: 'AIA Thailand\nAIA-530918274', lastVisit: '01/07/2026', consentStatus: 'Not Linked', consentDetail: 'Invitation sent' },
  { id: 'MRN008', name: 'Ornuma Chansakul', idNumber: 'ID201567843', gender: 'Female', age: '49 years', dob: '28/05/1977', contact: '061-735-9084\nornuma.c@gmail.com', allergy: false, insurance: 'Thai Life\nTL-692140853', lastVisit: '28/06/2026', consentStatus: 'Not Linked', consentDetail: 'None' },
  { id: 'MRN009', name: 'Ratchanee Boonruang', idNumber: 'ID356901278', gender: 'Female', age: '41 years', dob: '16/08/1984', contact: '088-519-6347\nratchanee.b@yahoo.com', allergy: true, insurance: 'Muang Thai\nMT-418730596', lastVisit: '24/06/2026', consentStatus: 'Linked', consentDetail: 'Linked on 15 May 2026' },
  { id: 'MRN010', name: 'Kittichai Maneerat', idNumber: 'ID489056731', gender: 'Male', age: '33 years', dob: '11/01/1993', contact: '093-264-8701\nkittichai.m@gmail.com', allergy: false, insurance: 'Bangkok Insurance\nBI-275843061', lastVisit: '20/06/2026', consentStatus: 'Linked', consentDetail: 'Linked on 02 Apr 2026' },
];

interface PatientsProps {
  isDoctor?: boolean;
}

export default function Patients({ isDoctor = false }: PatientsProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Modal states
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<any>(null);
  const [viewingPatient, setViewingPatient] = useState<any>(null);
  const [demoEmail, setDemoEmail] = useState<string | null>(null);
  const [simEmail, setSimEmail] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const openRegisterModal = () => setIsRegisterOpen(true);
  
  const openEditModal = (patient: any) => {
    setEditingPatient(patient);
    setActiveDropdown(null);
  };

  const openViewModal = (patient: any) => {
    setViewingPatient(patient);
    setActiveDropdown(null);
  };

  const handleSendEmailDemo = (patient: any) => {
    // Extract email from contact string (format is "Phone\nEmail")
    let email = 'patient@example.com';
    if (patient.contact && patient.contact.includes('\n')) {
      email = patient.contact.split('\n')[1];
    }
    setDemoEmail(email);
    setActiveDropdown(null);
  };

  if (viewingPatient) {
    return (
      <PatientDetail 
        patient={viewingPatient}
        onBack={() => setViewingPatient(null)}
        onEdit={() => {
          setEditingPatient(viewingPatient);
          setViewingPatient(null);
        }}
      />
    );
  }

  return (
    <div className="patients-container">
      <div className="patients-header">
        <h1 className="page-title mb-0">Patients</h1>
        {!isDoctor && (
          <button className="btn-primary" onClick={openRegisterModal}>
            <Plus size={16} />
            Register New Patient
          </button>
        )}
      </div>

      <div className="patients-card">
        <div className="filters-bar">
          <div className="search-filter">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search by name, phone, or ID number..." />
          </div>
          
          <div className="filters-right">
            <div className="filter-dropdown">
              <span className="filter-label">Allergy:</span>
              <button className="dropdown-trigger">
                All <ChevronDown size={14} />
              </button>
            </div>
            
            <div className="filter-dropdown date-filter">
              <button className="dropdown-trigger w-full justify-between">
                <span className="text-muted">Date range</span>
                <Calendar size={14} className="text-muted" />
              </button>
            </div>
            
            <button className="btn-reset">Reset</button>
          </div>
        </div>

        <div className="table-container">
          <table className="patients-table">
            <thead>
              <tr>
                <th>MRN</th>
                <th>Patient</th>
                <th>ID Number</th>
                <th>Gender</th>
                <th>Age / DOB</th>
                <th>Contact</th>
                <th>Allergy</th>
                {!isDoctor && <th>Insurance</th>}
                <th>Last Visit</th>
                {!isDoctor && <th>Consent Status</th>}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockPatients.map((patient) => (
                <tr key={patient.id} onClick={() => openViewModal(patient)} style={{ cursor: 'pointer' }} className="patient-row-clickable">
                  <td className="text-muted">{patient.id}</td>
                  <td className="font-medium">{patient.name}</td>
                  <td className="text-muted">{patient.idNumber}</td>
                  <td>{patient.gender}</td>
                  <td>
                    <div>{patient.age}</div>
                    <div className="text-muted text-xs">{patient.dob}</div>
                  </td>
                  <td>
                    <div>{patient.contact.split('\n')[0]}</div>
                    <div className="text-muted text-xs">{patient.contact.split('\n')[1]}</div>
                  </td>
                  <td>
                    {patient.allergy ? (
                      <span className="badge-danger">Yes</span>
                    ) : (
                      <span className="badge-secondary">No</span>
                    )}
                  </td>
                  {!isDoctor && (
                    <td>
                      <div>{patient.insurance.split('\n')[0]}</div>
                      <div className="text-muted text-xs">{patient.insurance.split('\n')[1] || ''}</div>
                    </td>
                  )}
                  <td>{patient.lastVisit}</td>
                  {!isDoctor && (
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                        <div>
                          {patient.consentStatus === 'Linked' ? (
                            <span className="badge-success">Linked</span>
                          ) : (
                            <span className="badge-secondary">Not Linked</span>
                          )}
                        </div>
                        <div className="text-muted text-xs" style={{ whiteSpace: 'nowrap' }}>
                          {patient.consentDetail !== 'None' ? patient.consentDetail : ''}
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="action-cell" onClick={(e) => e.stopPropagation()}>
                    <button 
                      className="icon-btn-small" 
                      onClick={() => toggleDropdown(patient.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === patient.id && (
                      <div className="action-dropdown">
                        {!isDoctor && patient.consentStatus !== 'Linked' && (
                          <button className="dropdown-item" onClick={() => handleSendEmailDemo(patient)}>
                            <Send size={14} /> {patient.consentDetail === 'Invitation sent' || patient.consentDetail === 'Declined' ? 'Resend Invitation' : 'Send Invitation'}
                          </button>
                        )}
                        {!isDoctor && patient.consentStatus === 'Linked' && (
                          <button className="dropdown-item" onClick={() => handleSendEmailDemo(patient)}>
                            <Link size={14} /> Resend Link
                          </button>
                        )}
                        <button className="dropdown-item" onClick={() => openViewModal(patient)}>
                          <Eye size={14} /> {patient.consentStatus === 'Linked' ? 'View Patient' : 'View detail'}
                        </button>
                        {!isDoctor && (
                          <>
                            <button className="dropdown-item" onClick={() => openEditModal(patient)}>
                              <Edit2 size={14} /> Edit patient
                            </button>
                            <button className="dropdown-item text-danger">
                              <Trash2 size={14} /> Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span className="text-muted text-sm">0 of 10 row(s) selected.</span>
          
          <div className="pagination-controls">
            <div className="rows-per-page">
              <span className="text-sm font-medium">Rows per page</span>
              <button className="dropdown-trigger">
                10 <ChevronDown size={14} />
              </button>
            </div>
            
            <span className="text-sm font-medium">Page 1 of 2</span>
            
            <div className="page-nav">
              <button className="page-btn disabled">&laquo;</button>
              <button className="page-btn disabled">&lsaquo;</button>
              <button className="page-btn">&rsaquo;</button>
              <button className="page-btn">&raquo;</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PatientFormModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        mode="create" 
        onSubmitSuccess={(email) => setDemoEmail(email)}
      />
      
      <PatientFormModal 
        isOpen={!!editingPatient} 
        onClose={() => setEditingPatient(null)} 
        mode="edit"
        initialData={editingPatient}
      />
      

      {demoEmail && (
        <EmailDemoModal 
          email={demoEmail} 
          onClose={() => setDemoEmail(null)} 
          onAccept={() => {
            setSimEmail(demoEmail);
            setDemoEmail(null);
          }}
        />
      )}

      {simEmail && (
        <MobileAppSimulator 
          email={simEmail} 
          onClose={() => setSimEmail(null)} 
        />
      )}
    </div>
  );
}
