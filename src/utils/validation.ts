import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = z
  .object({
    prefix: z.string().min(1, 'Prefix is required'),
    legalName: z.string().min(2, 'Legal name is required'),
    email: z.string().email('Enter a valid email address'),
    npi: z
      .string()
      .length(10, 'NPI must be exactly 10 digits')
      .regex(/^\d+$/, 'NPI must be numeric'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    hipaaAck1: z.boolean(),
    hipaaAck2: z.boolean(),
    termsAgreed: z.boolean(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((d) => d.hipaaAck1 === true, {
    message: 'You must acknowledge HIPAA responsibilities',
    path: ['hipaaAck1'],
  })
  .refine((d) => d.hipaaAck2 === true, {
    message: 'You must certify patient data compliance',
    path: ['hipaaAck2'],
  })
  .refine((d) => d.termsAgreed === true, {
    message: 'You must agree to the Terms of Service',
    path: ['termsAgreed'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  code: z.string().length(6, 'Enter the 6-digit code'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const addPatientSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  mrn: z.string().min(1, 'MRN is required'),
  insuranceName: z.string().optional(),
  insuranceId: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
export type SignupFormInput = z.input<typeof signupSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
export type AddPatientForm = z.infer<typeof addPatientSchema>;
