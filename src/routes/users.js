import { Router } from "express";
import { UsersController } from "../controllers/user.js";

export const usersRouter = Router();

usersRouter.get("/", UsersController.getAll);
usersRouter.post("/", UsersController.create);

usersRouter.get("/:id", UsersController.getById);
usersRouter.patch("/:id", UsersController.update);
usersRouter.delete("/:id", UsersController.delete);
