import api from './api';
import type { Patient, AddPatientPayload } from '../types/patient';

export const patientService = {
  async getPatients(): Promise<Patient[]> {
    const { data } = await api.get('/patients');
    return data;
  },

  async getPatient(id: string): Promise<Patient> {
    const { data } = await api.get(`/patients/${id}`);
    return data;
  },

  async addPatient(payload: AddPatientPayload): Promise<Patient> {
    const { data } = await api.post('/patients', payload);
    return data;
  },

  async updatePatient(id: string, payload: Partial<AddPatientPayload>): Promise<Patient> {
    const { data } = await api.put(`/patients/${id}`, payload);
    return data;
  },

  async deletePatient(id: string): Promise<void> {
    await api.delete(`/patients/${id}`);
  },
};
