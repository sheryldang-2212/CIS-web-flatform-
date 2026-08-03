import { User, Microscope, Stethoscope, Shield, Lock, Grid, Users, FlaskConical, ClipboardList, FileText } from 'lucide-react';

export const ROLES_LIST = [
  { id: 'receptionist', name: 'Receptionist', icon: User, scope: 'Clinic' },
  { id: 'technician', name: 'Technician', icon: Microscope, scope: 'Clinic' },
  { id: 'doctor', name: 'Doctor', icon: Stethoscope, scope: 'Clinic' },
  { id: 'clinic_admin', name: 'Clinic Admin', icon: Shield, scope: 'Clinic' },
];

export const PERMISSION_MODULES = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: Grid,
    permissions: [
      { name: 'View Dashboard', code: 'dashboard.view', roles: ['receptionist', 'technician', 'doctor', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'View Analytics', code: 'dashboard.analytics', roles: ['clinic_admin', 'platform_admin'], dependency: null }
    ]
  },
  {
    id: 'patient_management',
    name: 'Patient Management',
    icon: Users,
    permissions: [
      { name: 'View Patient List', code: 'patient.view.list', roles: ['receptionist', 'doctor', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Search Patient', code: 'patient.search', roles: ['receptionist', 'doctor', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'View Patient Detail', code: 'patient.view.detail', roles: ['receptionist', 'doctor', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Register Patient', code: 'patient.create', roles: ['receptionist', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Edit Patient', code: 'patient.edit', roles: ['receptionist', 'clinic_admin', 'platform_admin'], dependency: 'Requires View Detail' },
    ]
  },
  {
    id: 'lab_orders',
    name: 'Lab Orders',
    icon: FlaskConical,
    permissions: [
      { name: 'View Lab Order List', code: 'laborder.view.list', roles: ['receptionist', 'technician', 'doctor', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Search Lab Orders', code: 'laborder.search', roles: ['receptionist', 'technician', 'doctor', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'View Lab Order Detail', code: 'laborder.view.detail', roles: ['receptionist', 'technician', 'doctor', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Create New Lab Order', code: 'laborder.create', roles: ['doctor', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Edit Before Collection', code: 'laborder.edit.before_collection', roles: ['doctor', 'clinic_admin'], dependency: 'Rule-based' },
      { name: 'Add-on Test', code: 'laborder.addon', roles: ['doctor', 'clinic_admin'], dependency: 'Rule-based' },
      { name: 'Print Lab Order', code: 'laborder.print', roles: ['receptionist', 'technician', 'doctor', 'clinic_admin'], dependency: null },
      { name: 'Cancel Lab Order', code: 'laborder.cancel', roles: ['doctor', 'clinic_admin', 'platform_admin'], dependency: null },
    ]
  },
  {
    id: 'sample_collection',
    name: 'Sample Collection',
    icon: ClipboardList,
    permissions: [
      { name: 'View Collection Queue', code: 'collection.view.list', roles: ['technician', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Collect Sample', code: 'collection.execute', roles: ['technician', 'clinic_admin'], dependency: null },
      { name: 'Print Barcode', code: 'collection.print_barcode', roles: ['technician', 'clinic_admin'], dependency: null },
    ]
  },
  {
    id: 'lab_results',
    name: 'Lab Results',
    icon: FileText,
    permissions: [
      { name: 'View Lab Results', code: 'result.view', roles: ['doctor', 'clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Enter Results', code: 'result.enter', roles: ['technician', 'clinic_admin'], dependency: null },
      { name: 'Approve Results', code: 'result.approve', roles: ['doctor', 'clinic_admin'], dependency: null },
      { name: 'Print Results', code: 'result.print', roles: ['receptionist', 'doctor', 'clinic_admin'], dependency: null },
    ]
  },
  {
    id: 'user_management',
    name: 'User Management',
    icon: Shield,
    permissions: [
      { name: 'View User List', code: 'user.view.list', roles: ['clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Create User', code: 'user.create', roles: ['clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Edit User', code: 'user.edit', roles: ['clinic_admin', 'platform_admin'], dependency: null },
      { name: 'Manage Roles', code: 'user.roles', roles: ['platform_admin'], dependency: null },
    ]
  }
];
