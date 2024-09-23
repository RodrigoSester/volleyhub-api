import { Router } from "express";
import teamsController from "../controllers/teams.controller.js";

const teamsRouter = Router();

teamsRouter.post("/", teamsController.register);

export default teamsRouter;