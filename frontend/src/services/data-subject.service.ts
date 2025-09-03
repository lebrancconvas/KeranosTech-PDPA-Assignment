import api from "../api/axios";
import type { IDataSubject, IDataSubjectWithConsent, IDataSubjectForUpdate, IConsent } from "../../../backend/src/@types/data-subject.interface";
export type { IDataSubject, IDataSubjectWithConsent, IDataSubjectForUpdate, IConsent };

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

export const createDataSubject = async(dataSubjectWithConsentData: IDataSubjectWithConsent) => {
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

export const readDataSubjectConsentsByID = async(dataSubjectID: number) => {
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

export const deleteDataSubjectConsentById = async(dataSubjectID: number) => {
  const response = await api.delete(`/data_subjects/${dataSubjectID}`);
  if(response.data.data) {
    return response.data.data;
  } else {
    return response.data.error;
  }
};

