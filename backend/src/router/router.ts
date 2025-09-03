import express, { type Router, type Request, type Response } from "express";
import {
  createDataSubjectController,
  readDataSubjectController,
  readDataSubjectByIdController,
  readDataSubjectConsentByIdController,
  updateDataSubjectByIdController,
  updateDataSubjectConsentActiveByIdController,
  deleteDataSubjectWithConsentsByIdController
} from "../controllers/data-subject.controller.js";
import { request } from "http";

const router: Router = express.Router();

// Health Check
router.get("/", (req: Request, res: Response) => {
  res.send("PDPA Management System API starts working!");
});

// Data Subject
router.post("/data_subjects", (req: Request, res: Response) => {
  createDataSubjectController(req, res);
});
router.get("/data_subjects", (req: Request, res: Response) => {
  readDataSubjectController(req, res);
});
router.get("/data_subjects/:data_subject_id", (req: Request, res: Response) => {
  readDataSubjectByIdController(req, res);
});
router.get("/data_subjects/:data_subject_id/consents", (req: Request, res: Response) => {
  readDataSubjectConsentByIdController(req, res);
});
router.put("/data_subjects/:data_subject_id", (req: Request, res: Response) => {
  updateDataSubjectByIdController(req, res);
});
router.put("/data_subjects/:data_subject_id/consents", (req: Request, res: Response) => {
  updateDataSubjectConsentActiveByIdController(req, res);
});
router.delete("/data_subjects/:data_subject_id", (req: Request, res: Response) => {
  deleteDataSubjectWithConsentsByIdController(req, res);
});

export default router; 