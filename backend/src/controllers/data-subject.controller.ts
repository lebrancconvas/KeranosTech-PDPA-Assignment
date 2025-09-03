import type { Request, Response } from "express";
import type { 
  IConsent, 
  IDataSubject, 
  IDataSubjectWithConsent,
  IDataSubjectForUpdate
} from "../@types/data-subject.interface.js";
import { 
  createDataSubjectModel,
  createDataSubjectConsentModel,
  readDataSubjectModel,
  readDataSubjectByIdModel,
  readDataSubjectConsentByIdModel,
  updateDataSubjectByIdModel,
  updateDataSubjectConsentActiveByIdModel,
  deleteDataSubjectByIdModel,
  deleteConsentsByDataSubjectIdModel
} from "../models/data-subject.model.js";

// - (POST) `/data_subjects`
export const createDataSubjectController = async (req: Request, res: Response) => {  
  try {
    const { national_id, name, email, phone, consents }: IDataSubjectWithConsent = req.body;
    
    const responseData = await createDataSubjectModel({ national_id, name, email, phone });
    res.status(201).send({ data: `Create data subject success at data_subject_id: ${responseData.rows[0].data_subject_id}` });
    
    for(let i = 0; i < consents.length; i++) {
      const consentType = consents[i]?.consent_type;
      const isConsentActive = consents[i]?.is_consent_active;

      if(typeof consentType !== "undefined" && typeof isConsentActive !== "undefined") {
        await createDataSubjectConsentModel(parseInt(responseData.rows[0].data_subject_id), { consent_type: consentType, is_consent_active: isConsentActive });
        res.status(201);
      } else {
        res.status(422).send({ error: "consent_type or is_consent_active are undefined." });
      }
    }
  } catch(err) {
    res.status(500).send({ error: "Cannot create data subject." });
    console.error(err);
  }
};

// - (GET) `/data_subjects`
export const readDataSubjectController = async (req: Request, res: Response) => {
  try {
    const data = await readDataSubjectModel();
    res.status(200).send({ data });
  } catch(err) {
    res.status(500).send({ error: `Cannot read Subject Data` });
    console.error(err);
  }
};

// - (GET) `/data_subjects/<data_subject_id>`
export const readDataSubjectByIdController = async (req: Request, res: Response) => {
  try {
    const dataSubjectID = req.params.data_subject_id;
    if(dataSubjectID) {
      const dataSubjectIDInt = parseInt(dataSubjectID);
      const data = await readDataSubjectByIdModel(dataSubjectIDInt);
      res.status(200).send({ data });
    } else {
      res.status(422).send({ error: `Data Subject ID is undefined.` });
    }
  } catch(err) {
    res.status(500).send({ error: `Cannot read the data subject by ID.` });
    console.error(err);
  }
};

// - (PUT) `/data_subjects/<data_subject_id>`
export const updateDataSubjectByIdController = async (req: Request, res: Response) => {
  try {
    const dataSubjectID = req.params.data_subject_id;
    if(dataSubjectID) {
      const dataSubjectIDInt = parseInt(dataSubjectID);
      const { name, email, phone, is_restricted }: IDataSubjectForUpdate = req.body;
      await updateDataSubjectByIdModel(dataSubjectIDInt, { name, email, phone, is_restricted });
      res.status(200).send({ data: `Data Subject Update Success at data_subject_id: ${dataSubjectIDInt}.` });
    } else {
      res.status(422).send({ error: `Data Subject ID is undefined.` });
    }
  } catch(err) {
    res.status(500).send({ error: `Cannot update the data subject.` });
    console.error(err);
  }
};

// - (GET) `/data_subjects/<data_subject_id>/consents`
export const readDataSubjectConsentByIdController = async (req: Request, res: Response) => {
  try {
    const dataSubjectID = req.params.data_subject_id;
    if(dataSubjectID) {
      const dataSubjectIDInt = parseInt(dataSubjectID);
      const data = await readDataSubjectConsentByIdModel(dataSubjectIDInt);
      res.status(200).send({ data });
    } else {
      res.status(422).send({ error: `Data Subject ID is undefined.` });
    }
  } catch(err) {
    res.status(500).send({ error: `Cannot read data subject's consents data.` });
    console.error(err);
  }
};

// - (PUT) `/data_subjects/<data_subject_id>/consents`
export const updateDataSubjectConsentActiveByIdController = async (req: Request, res: Response) => {
  try {
    const dataSubjectID = req.params.data_subject_id;
    if(dataSubjectID) {
      const dataSubjectIDInt = parseInt(dataSubjectID);
      const { consent_type, is_consent_active }: IConsent = req.body;
      await updateDataSubjectConsentActiveByIdModel(dataSubjectIDInt, { consent_type, is_consent_active });
      res.status(200).send({ data: `Data Subject Consent: ${consent_type} update at data_subject_id: ${dataSubjectIDInt}` });
    } else {
      res.status(422).send({ error: `Data Subject ID is undefined.` });
    }
  } catch(err) {
    res.status(500).send({ error: `Cannot update data subject's consent data.` });
    console.error(err);
  }
};

export const deleteDataSubjectByIdController = async (req: Request, res: Response) => {
  try {
    const dataSubjectID = req.params.data_subject_id;
    if(dataSubjectID) {
      const dataSubjectIDInt = parseInt(dataSubjectID);

      await deleteConsentsByDataSubjectIdModel(dataSubjectIDInt);
      res.status(200).send({ data: `Delete Consents success for data_subject_id: ${dataSubjectIDInt}.` });

      await deleteDataSubjectByIdModel(dataSubjectIDInt);
      res.status(200).send({ data: `Delete Data Subject success at data_subject_id: ${dataSubjectIDInt}.` });
    } else {
      res.status(422).send({ error: `Data Subject ID is undefined.` });
    }
  } catch(err) {
    res.status(500).send({ error: `Cannot delete data subject.` });
    console.error(err);
  }
};