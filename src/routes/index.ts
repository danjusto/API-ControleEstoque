import { Router } from "express";
import { productsRouter } from "./products.routes";
import { fileRouter } from "./file.routes";
import { usersRouter } from "./users.routes";
import { sessionsRouter } from "./sessions.routes";

export const routes = Router();
routes.use("/products", productsRouter);
routes.use("/file", fileRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);