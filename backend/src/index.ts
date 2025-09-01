import express from "express";
import router from "./router/index.js";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(morgan('dev'));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`[SERVER] Server is running on port: ${PORT}`);
});