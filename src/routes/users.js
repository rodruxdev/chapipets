import { Router } from "express";
import { UsersController } from "../controllers/user";

export const userRouter = Router();

userRouter.get("/", UsersController.getAll);
userRouter.post("/", UsersController.create);

userRouter.get("/:id", UsersController.getById);
userRouter.patch("/:id", UsersController.update);
userRouter.delete("/:id", UsersController.delete);
