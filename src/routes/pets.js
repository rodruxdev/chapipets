import { Router } from "express";
import { PetsController } from "../controllers/pet.js";
import passport from "passport";

export const petsRouter = Router();

petsRouter.get("/", PetsController.getAll);
petsRouter.post("/", PetsController.create);

petsRouter.get("/:id", PetsController.getById);
petsRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  PetsController.update
);
petsRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  PetsController.delete
);

petsRouter.get("/user/:userId", PetsController.getByUserId);
