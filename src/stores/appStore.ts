import { create } from 'zustand';

interface AppStore {
  selectedSpecialties: string[];
  selectedPlan: string | null;
  selectedAddOns: string[];
  paWorkflow: {
    patientId: string | null;
    insuranceCardUri: string | null;
    diagnosis: string | null;
    medication: string | null;
    tier: string | null;
    stepTherapyComplete: boolean;
  };
  setSelectedSpecialties: (specialties: string[]) => void;
  toggleSpecialty: (id: string) => void;
  setSelectedPlan: (plan: string) => void;
  toggleAddOn: (id: string) => void;
  setPAField: (key: string, value: unknown) => void;
  resetPAWorkflow: () => void;
}

const defaultPAWorkflow = {
  patientId: null,
  insuranceCardUri: null,
  diagnosis: null,
  medication: null,
  tier: null,
  stepTherapyComplete: false,
};

export const useAppStore = create<AppStore>((set) => ({
  selectedSpecialties: [],
  selectedPlan: null,
  selectedAddOns: [],
  paWorkflow: defaultPAWorkflow,

  setSelectedSpecialties: (specialties) => set({ selectedSpecialties: specialties }),

  toggleSpecialty: (id) =>
    set((s) => ({
      selectedSpecialties: s.selectedSpecialties.includes(id)
        ? s.selectedSpecialties.filter((x) => x !== id)
        : [...s.selectedSpecialties, id],
    })),

  setSelectedPlan: (plan) => set({ selectedPlan: plan }),

  toggleAddOn: (id) =>
    set((s) => ({
      selectedAddOns: s.selectedAddOns.includes(id)
        ? s.selectedAddOns.filter((x) => x !== id)
        : [...s.selectedAddOns, id],
    })),

  setPAField: (key, value) =>
    set((s) => ({ paWorkflow: { ...s.paWorkflow, [key]: value } })),

  resetPAWorkflow: () => set({ paWorkflow: defaultPAWorkflow }),
}));
