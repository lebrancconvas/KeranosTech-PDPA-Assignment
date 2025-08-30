import express, { type Request, type Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("PDPA Management System API starts working!");
});

app.listen(PORT, () => {
  console.log(`[SERVER] Server is running on port: ${PORT}`);
});