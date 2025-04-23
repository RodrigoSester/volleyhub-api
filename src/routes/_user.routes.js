import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/teams", usersController.getAllTeamsByUser);
userRouter.get("/matches", usersController.getAllMatchesByUser);

export default userRouter;