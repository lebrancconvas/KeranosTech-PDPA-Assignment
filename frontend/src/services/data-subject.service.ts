import api from "../api/axios";
import type { IDataSubjectWithConsent, IDataSubjectForUpdate, IConsent } from "../@types/data-subject.interface";

export const readDataSubjects = async() => {
  const response = await api.get(`/data_subjects`);
  if(response.data.data) {
    return response.data.data;
  } else {
    return response.data.error;
  }
};

export const readDataSubjectById = async(dataSubjectID: number) => {
  const response = await api.get(`/data_subjects/${dataSubjectID}`);
  if(response.data.data) {
    return response.data.data[0];
  } else {
    return response.data.error;
  }
};

export const createDataSubject = async(dataSubjectWithConsentData: Omit<IDataSubjectWithConsent, "data_subject_id" | "consent_record_id">) => {
  const response = await api.post(`/data_subjects`, dataSubjectWithConsentData);
  if(response.data.data) {
    return response.data.data;
  } else {
    return response.data.error;
  }
};

export const updateDataSubjectById = async(dataSubjectID: number, dataSubjectForUpdate: IDataSubjectForUpdate) => {
  const response = await api.put(`/data_subjects/${dataSubjectID}`, dataSubjectForUpdate);
  if(response.data.data) {
    return response.data.data;
  } else {
    return response.data.error;
  }
};

export const readDataSubjectConsentsById = async(dataSubjectID: number) => {
  const response = await api.get(`/data_subjects/${dataSubjectID}/consents`);
  if(response.data.data) {
    return response.data.data[0];
  } else {
    return response.data.error;
  }
}

export const updateDataSubjectConsentActiveById = async(dataSubjectID: number, consentData: IConsent) => {
  const response = await api.put(`/data_subjects/${dataSubjectID}/consents`, consentData);
  if(response.data.data) {
    return response.data.data;
  } else {
    return response.data.error;
  }
};

export const deleteDataSubjectById = async(dataSubjectID: number) => {
  const response = await api.delete(`/data_subjects/${dataSubjectID}`);
  if(response.data.data) {
    return response.data.data;
  } else {
    return response.data.error;
  }
};

