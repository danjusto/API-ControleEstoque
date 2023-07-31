import { Router } from "express";
import { UsersController } from "../controller/userController";

export const usersRouter = Router();
const usersController = new UsersController;

usersRouter.post("/", usersController.create);
