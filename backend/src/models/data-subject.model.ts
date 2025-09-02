import type { IDataSubject } from "../@types/data-subject.interface.js";
import pool from "../db/db.js";

// - (POST) `/data_subjects`
export const createDataSubjectModel = async (dataSubject: IDataSubject) => {
  const { national_id, name, email, phone } = dataSubject;

  const query = `
    INSERT INTO data_subjects(national_id, name, email, phone)
    VALUES($1, $2, $3, $4)
    RETURNING *; 
  `;

  const values = [national_id, name, email, phone];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

// - (GET) `/data_subjects`
export const readDataSubjectModel = () => {

};

// - (GET) `/data_subjects/<data_subject_id>`
export const readDataSubjectByIdModel = () => {

};

// - (PUT) `/data_subjects/<data_subject_id>`
export const updateDataSubjectByIdModel = () => {
  
};

// - (GET) `/data_subjects/<data_subject_id>/consents`
export const readDataSubjectConsentByIdModel = () => {

};

// - (PUT) `/data_subjects/<data_subject_id>/consents`
export const updateDataSubjectConsentActiveByIdModel = () => {

};
