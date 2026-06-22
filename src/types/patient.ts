export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  mrn: string;
  insuranceId?: string;
  insuranceName?: string;
  groupNumber?: string;
  diagnosis?: string[];
  medications?: string[];
  phone?: string;
  email?: string;
  address?: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddPatientPayload {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  mrn: string;
  insuranceId?: string;
  insuranceName?: string;
  phone?: string;
  email?: string;
}
