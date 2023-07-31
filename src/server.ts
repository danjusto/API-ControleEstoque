import express from "express";
import dotenv from 'dotenv';
import { migrationsRun } from "./database/migrations";
import { routes } from "./routes";
import cors from "cors";

migrationsRun();
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));