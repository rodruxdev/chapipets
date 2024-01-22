import { Router } from "express";
import { PetsController } from "../controllers/pet.js";

export const petsRouter = Router();

petsRouter.get("/", PetsController.getAll);
petsRouter.post("/", PetsController.create);

petsRouter.get("/:id", PetsController.getById);
petsRouter.patch("/:id", PetsController.update);
petsRouter.delete("/:id", PetsController.delete);
