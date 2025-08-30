import express from "express";
import router from "./router/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`[SERVER] Server is running on port: ${PORT}`);
});