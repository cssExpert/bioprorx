export type PAStatus = 'draft' | 'submitted' | 'pending' | 'approved' | 'denied' | 'appealing';

export interface PriorAuthorization {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  diagnosis: string;
  status: PAStatus;
  insuranceName: string;
  submittedAt?: string;
  reviewedAt?: string;
  expiresAt?: string;
  notes?: string;
  referenceNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Specialty {
  id: string;
  name: string;
  code: string;
  icon: string;
  isPrimary?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'annual';
  features: string[];
  isPopular?: boolean;
}
