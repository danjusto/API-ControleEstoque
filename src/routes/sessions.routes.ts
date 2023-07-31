import { Router } from "express";
import { SessionsController } from "../controller/sessionController";

export const sessionsRouter = Router();
const sessionsController = new SessionsController;

sessionsRouter.post("/", sessionsController.create);
