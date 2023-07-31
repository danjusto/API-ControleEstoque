import { Router } from "express";
import multer from "multer";
import { MULTER } from "../config/upload";
import { FilesController } from "../controller/filesController";

export const fileRouter = Router();
const upload = multer(MULTER);
const filesController = new FilesController;

fileRouter.get("/", upload.single("file"), filesController.validate);
fileRouter.post("/", filesController.create);