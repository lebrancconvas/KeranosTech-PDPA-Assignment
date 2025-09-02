import express, { type Router, type Request, type Response } from "express";
import {
  createDataSubjectController
} from "../controllers/data-subject.controller.js";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("PDPA Management System API starts working!");
});

router.post("/data_subjects", (req: Request, res: Response) => {
  createDataSubjectController(req, res);
});

export default router;