import express, { type Router, type Request, type Response } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("PDPA Management System API starts working!");
});

export default router;