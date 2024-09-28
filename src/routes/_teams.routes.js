import { Router } from "express";

import teamsController from "../controllers/teams.controller.js";
import playersController from "../controllers/players.controller.js";

const teamsRouter = Router();

teamsRouter.post("/", teamsController.register);
teamsRouter.put("/:id", teamsController.edit);
teamsRouter.delete("/:id", teamsController.remove);
teamsRouter.get("/", teamsController.getAll);
teamsRouter.get("/:id", teamsController.getById);

teamsRouter.get("/:teamId/players", playersController.getAll);
teamsRouter.get("/:teamId/players/:id", playersController.getById);
teamsRouter.put("/:teamId/players/:id", playersController.edit);
teamsRouter.delete("/:teamId/players/:id", playersController.remove);

export default teamsRouter;