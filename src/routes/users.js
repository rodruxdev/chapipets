import { Router } from "express";
import { UsersController } from "../controllers/user.js";
import { checkRoles } from "../middlewares/authHandler.js";

export const usersRouter = Router();

usersRouter.get("/", UsersController.getAll);
usersRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  UsersController.create
);

usersRouter.get("/:id", UsersController.getById);
usersRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UsersController.update
);
usersRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UsersController.delete
);
