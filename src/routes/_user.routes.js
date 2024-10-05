import { Router } from "express";

const userRouter = Router();

userRouter.get("/user/teams", usersController.getAllTeamsByUser);

export default userRouter;