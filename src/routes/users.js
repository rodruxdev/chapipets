import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", () => {});
userRouter.post("/", () => {});

userRouter.get("/:id", () => {});
userRouter.patch("/:id", () => {});
userRouter.delete("/:id", () => {});
