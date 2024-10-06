import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/teams", usersController.getAllTeamsByUser);

export default userRouter;