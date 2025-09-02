import express from "express";
import router from "./router/router.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";

import { DB } from "./db/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`[SERVER] Server is running on port: ${PORT}`);
  DB();
});