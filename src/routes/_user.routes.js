import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/user/teams", usersController.getAllTeamsByUser);

export default userRouter;