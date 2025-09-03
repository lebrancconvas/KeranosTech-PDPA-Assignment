import type { IDataSubject, IConsent, IDataSubjectForUpdate } from "../@types/data-subject.interface.js";
import pool from "../db/db.js";

export const createDataSubjectModel = async (dataSubject: IDataSubject) => {
  const { national_id, name, email, phone } = dataSubject;

  const query = `
    INSERT INTO data_subjects(national_id, name, email, phone)
    VALUES($1, $2, $3, $4)
    RETURNING *; 
  `;

  const values = [national_id, name, email, phone];
  
  const result = await pool.query(query, values);
  return result;
};

export const createDataSubjectConsentModel = async (fkDataSubjectID: number, consent: IConsent) => {
  const { consent_type, is_consent_active } = consent;
  
  const query = `
    INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
    VALUES ($1, $2, $3);
  `;

  const values = [fkDataSubjectID, consent_type, is_consent_active];
  const result = await pool.query(query, values);
  return result;
};

export const readDataSubjectModel = async () => {
  const query = `
    SELECT national_id, name, email, phone, is_restricted, created_at, updated_at
    FROM data_subjects
  `;

  const result = await pool.query(query);
  return result.rows;
};

export const readDataSubjectByIdModel = async (dataSubjectID: number) => {
  const query = `
    SELECT national_id, name, email, phone, is_restricted, created_at, updated_at
    FROM data_subjects
    WHERE data_subject_id = $1
  `;

  const value = [dataSubjectID];

  const result = await pool.query(query, value);
  return result.rows;
};

export const updateDataSubjectByIdModel = async (data_subject_id: number, dataSubjectForUpdate: IDataSubjectForUpdate) => {
  const { name, email, phone, is_restricted } = dataSubjectForUpdate;

  const query = `
    UPDATE data_subjects
    SET name = $2, email = $3, phone = $4, is_restricted = $5, updated_at = CURRENT_TIMESTAMP
    WHERE data_subject_id = $1;
  `;

  const values = [data_subject_id, name, email, phone, is_restricted];

  await pool.query(query, values);
};

export const readDataSubjectConsentByIdModel = async (dataSubjectID: number) => {
  const query = `
    SELECT data_subject_id, national_id, name, email, phone, is_restricted, consent_type, is_consent_active
    FROM data_subjects
    LEFT JOIN consent_records ON data_subjects.data_subject_id = consent_records.fk_data_subject_id
    WHERE consent_records.fk_data_subject_id = $1;  
  `;

  const value = [dataSubjectID];

  const result = await pool.query(query, value);
  return result.rows;
};

export const updateDataSubjectConsentActiveByIdModel = async (fkDataSubjectID: number, consentData: IConsent) => {
  const { consent_type, is_consent_active } = consentData;
  
  const query = `
    UPDATE consent_records
    SET is_consent_active = $3, updated_at = CURRENT_TIMESTAMP
    WHERE fk_data_subject_id = $1 AND consent_type = $2;
  `;

  const values = [fkDataSubjectID, consent_type, is_consent_active];

  await pool.query(query, values);
};
