
import Modal from './Modal';
import PatientForm from './PatientForm';
import './PatientFormModal.css';

interface PatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: any;
  onSubmitSuccess?: (email: string, isVerified?: boolean, newPatientData?: any) => void;
}

export default function PatientFormModal({ isOpen, onClose, mode, initialData, onSubmitSuccess }: PatientFormModalProps) {
  const isEdit = mode === 'edit';
  const title = isEdit ? 'Edit Patient' : 'Register New Patient';

  const handleSubmitSuccess = (email: string, isVerified?: boolean, newPatientData?: any) => {
    if (onSubmitSuccess) {
      onSubmitSuccess(email, isVerified, newPatientData);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="880px">
      <PatientForm 
        mode={mode}
        initialData={initialData}
        onSubmitSuccess={handleSubmitSuccess}
        onCancel={onClose}
      />
    </Modal>
  );
}
