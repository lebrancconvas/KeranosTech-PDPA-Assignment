import express, { type Router, type Request, type Response } from "express";
import {
  createDataSubjectController,
  readDataSubjectController,
  readDataSubjectByIdController
} from "../controllers/data-subject.controller.js";

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

export default router;