import { Router } from "express";
import teamPlayersRouter from "./_team-players.routes.js";

import teamsController from "../controllers/teams.controller.js";

const teamsRouter = Router();

teamsRouter.post("/", teamsController.register);
teamsRouter.put("/:id", teamsController.edit);
teamsRouter.delete("/:id", teamsController.remove);
teamsRouter.get("/", teamsController.getAll);
teamsRouter.get("/:id", teamsController.getById);

teamsRouter.use("/:teamId/players", teamPlayersRouter);

export default teamsRouter;