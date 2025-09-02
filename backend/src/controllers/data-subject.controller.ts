import type { Request, Response } from "express";
import type { IDataSubject } from "../@types/data-subject.interface.js";
import { 
  createDataSubjectModel,
  readDataSubjectModel,
  readDataSubjectByIdModel
} from "../models/data-subject.model.js";

// - (POST) `/data_subjects`
export const createDataSubjectController = async (req: Request, res: Response) => {  
  try {
    const { national_id, name, email, phone }: IDataSubject = req.body;
    const responseData = await createDataSubjectModel({ national_id, name, email, phone });
    res.status(201).send(`[SUCCESS] Data Subject Create at data_subject_id: ${responseData.id}`);
  } catch(err) {
    res.status(500).send(`[ERROR] Cannot create Subject Data`);
    console.error(err);
  }
};

// - (GET) `/data_subjects`
export const readDataSubjectController = async (req: Request, res: Response) => {
  try {
    const data = await readDataSubjectModel();
    res.status(200).send({ data: data });
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
      res.status(200).send({ data: data });
    } else {
      res.status(422).send({ error: `Data Subject ID is undefined.` });
    }
  } catch(err) {
    res.status(500).send({ error: `Cannot read the data subject by ID.` });
    console.error(err);
  }
};

// - (PUT) `/data_subjects/<data_subject_id>`
export const updateDataSubjectByIdController = (req: Request, res: Response) => {
  
};

// - (GET) `/data_subjects/<data_subject_id>/consents`
export const readDataSubjectConsentByIdController = (req: Request, res: Response) => {

};

// - (PUT) `/data_subjects/<data_subject_id>/consents`
export const updateDataSubjectConsentActiveByIdController = (req: Request, res: Response) => {

};