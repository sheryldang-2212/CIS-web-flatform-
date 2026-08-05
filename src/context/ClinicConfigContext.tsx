import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Category {
  name: string;
  tests: string[];
}

export interface Package {
  id: string;
  name: string;
  code: string;
  tests: string[];
}

interface ClinicConfigContextType {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  packages: Package[];
  setPackages: (packages: Package[]) => void;
}

const INITIAL_CATEGORIES: Category[] = [
  {
    name: 'Hematology',
    tests: ['CBC', 'Hemoglobin', 'Hematocrit', 'Platelet Count', 'WBC Count', 'RBC Count', 'ESR', 'Coagulation (PT/INR)', 'aPTT', 'ePTT']
  },
  {
    name: 'Clinical Chemistry',
    tests: ['Glucose', 'Fasting Glucose', 'HbA1c', 'Creatinine', 'BUN', 'Uric Acid', 'ALT', 'AST', 'Alkaline Phosphatase', 'Bilirubin', 'Total Bilirubin', 'Total Cholesterol', 'LDL', 'HDL', 'Triglycerides']
  },
  {
    name: 'Hormones',
    tests: ['TSH', 'Free T3', 'Free T4', 'Cortisol', 'Insulin', 'Testosterone', 'Estrogen', 'Progesterone', 'Prolactin', 'FSH', 'LH', 'Estradiol']
  },
  {
    name: 'Infectious Diseases',
    tests: ['HIV', 'HIV Ag/Ab', 'HBsAg', 'Hepatitis B Surface Antigen', 'Hepatitis C Antibody', 'Anti-HCV', 'Syphilis', 'Syphilis (VDRL)', 'Dengue NS1', 'Malaria Smear', 'COVID-19 PCR', 'Influenza A/B']
  },
  {
    name: 'Tumor Markers',
    tests: ['PSA', 'CEA', 'AFP', 'CA 125', 'CA-125', 'CA 19-9', 'CA 15-3', 'Beta-hCG']
  },
  {
    name: 'Others',
    tests: ['Vitamin D', 'Vitamin B12', 'Folate', 'Iron', 'Ferritin', 'CRP', 'Urinalysis', 'Stool Analysis', 'Stool Examination']
  }
];

const INITIAL_PACKAGES: Package[] = [
  {
    id: 'pkg-1',
    name: '11 Tests Health Panel',
    code: '1TH-001',
    tests: ['CBC', 'Glucose', 'HbA1c', 'LDL', 'HDL', 'ALT', 'AST', 'Creatinine']
  },
  {
    id: 'pkg-2',
    name: 'Comprehensive Metabolic Panel',
    code: 'CMP-002',
    tests: ['Glucose', 'BUN', 'Creatinine', 'Sodium', 'Potassium', 'Calcium']
  },
  {
    id: 'pkg-3',
    name: 'Routine Annual Blood Panel',
    code: 'RAB-003',
    tests: []
  },
  {
    id: 'pkg-4',
    name: 'Basic Metabolic Panel',
    code: 'BMP-004',
    tests: []
  },
  {
    id: 'pkg-5',
    name: 'Pre-op Blood Tests',
    code: 'PBT-005',
    tests: []
  },
  {
    id: 'pkg-6',
    name: 'Lipid Panel',
    code: 'LIP-006',
    tests: []
  }
];

const ClinicConfigContext = createContext<ClinicConfigContextType | undefined>(undefined);

export function ClinicConfigProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);

  return (
    <ClinicConfigContext.Provider value={{ categories, setCategories, packages, setPackages }}>
      {children}
    </ClinicConfigContext.Provider>
  );
}

export function useClinicConfig() {
  const context = useContext(ClinicConfigContext);
  if (context === undefined) {
    throw new Error('useClinicConfig must be used within a ClinicConfigProvider');
  }
  return context;
}
