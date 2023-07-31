import { Router } from "express";
import { ProductsController } from "../controller/productsController";
import validationAuth from "../middlewares/validationAuth";

export const productsRouter = Router();
const productsController = new ProductsController;
productsRouter.use(validationAuth);

productsRouter.post("/", productsController.create);
productsRouter.get("/", productsController.showAll);
productsRouter.get("/:id", productsController.details);
productsRouter.put("/:id", productsController.update);
productsRouter.patch("/:id/acrescentar", productsController.add);
productsRouter.patch("/:id/decrementar", productsController.decrease);
productsRouter.delete("/:id", productsController.remove);