import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import LabOrders from './components/LabOrders';
import SampleCollectionQueue from './components/SampleCollectionQueue';
import LabOrderTracking from './components/LabOrderTracking';
import SettingsModal from './components/Settings';
import ContextSwitchModal from './components/ContextSwitchModal';
import UserManagement from './components/UserManagement';
import RolesPermissions from './components/RolesPermissions';
import ClinicSettings from './components/ClinicSettings';
import ServicesAndPackages from './components/ServicesAndPackages';
import LaboratoryOperations from './components/LaboratoryOperations';
import StaffSecurity from './components/StaffSecurity';
import AuditLogs from './components/AuditLogs';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorLabResults from './components/DoctorLabResults';
import DoctorPatients from './components/DoctorPatients';
import './App.css';

const MOCK_CLINICS = [
  { id: 'clinic-1', name: 'Downtown Clinic', roles: ['Receptionist', 'Doctor', 'Technician', 'Admin'] },
  { id: 'clinic-2', name: 'Uptown Hospital', roles: ['Doctor', 'Admin'] }
];

function App() {
  const [activeTab, setActiveTab] = useState('Patients');
  
  // mock user data
  const [currentClinic, setCurrentClinic] = useState(MOCK_CLINICS[0]);
  const [currentRole, setCurrentRole] = useState('Receptionist');

  // Modals state
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsTab, setSettingsTab] = useState('profile');
  const [showContextModal, setShowContextModal] = useState(false);

  const handleSaveContext = (clinic: any, role: string) => {
    setCurrentClinic(clinic);
    setCurrentRole(role);
  };

  return (
    <div className="web-app-container" style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentClinic={currentClinic} 
        currentRole={currentRole} 
      />
      <main className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header 
          currentClinic={currentClinic} 
          currentRole={currentRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSettingsTab={setSettingsTab}
          setShowSettingsModal={setShowSettingsModal}
          setShowContextModal={setShowContextModal}
        />
        <div className="content-area" style={{ flex: 1, overflowY: 'auto', padding: '24px', backgroundColor: '#f8f9fa' }}>
          {activeTab === 'Dashboard' && currentRole !== 'Doctor' && <Dashboard currentRole={currentRole} setActiveTab={setActiveTab} />}
          {activeTab === 'Dashboard' && currentRole === 'Doctor' && <DoctorDashboard />}
          {activeTab === 'Patients' && currentRole !== 'Doctor' && <Patients />}
          {activeTab === 'Patients' && currentRole === 'Doctor' && <Patients isDoctor={true} />}
          {activeTab === 'Lab Results' && currentRole === 'Doctor' && <DoctorLabResults />}
          {activeTab === 'Lab Orders' && <LabOrders />}
          {activeTab === 'Sample Collection Queue' && <SampleCollectionQueue />}
          {activeTab === 'Lab Order Tracking' && <LabOrderTracking />}
          {activeTab === 'Staff Management' && <UserManagement />}
          {activeTab === 'Roles & Permissions' && <RolesPermissions />}
          {activeTab === 'Clinic Settings' && <ClinicSettings />}
          {activeTab === 'Services & Packages' && <ServicesAndPackages />}
          
          {/* New Tabs Placeholders */}
          {activeTab === 'Laboratory Operations' && (
            <div className="fadeIn">
              <LaboratoryOperations />
            </div>
          )}
          {activeTab === 'Staff Security' && (
            <div className="fadeIn">
              <StaffSecurity />
            </div>
          )}
          {activeTab === 'Audit Logs' && (
            <div className="fadeIn">
              <AuditLogs />
            </div>
          )}
        </div>
      </main>

      {showSettingsModal && (
        <SettingsModal 
          activeTab={settingsTab} 
          setActiveTab={setSettingsTab} 
          onClose={() => setShowSettingsModal(false)} 
        />
      )}

      {showContextModal && (
        <ContextSwitchModal
          currentClinic={currentClinic}
          currentRole={currentRole}
          mockClinics={MOCK_CLINICS}
          onSaveContext={handleSaveContext}
          onClose={() => setShowContextModal(false)}
        />
      )}
    </div>
  );
}

export default App;
