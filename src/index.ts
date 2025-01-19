import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import customerRouter from "./routes/customer-route";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/api/v1/customers",customerRouter)