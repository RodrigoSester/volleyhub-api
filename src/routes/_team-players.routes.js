import { Router } from "express";

import playersController from "../controllers/players.controller.js";

const teamPlayersRouter = Router();

teamPlayersRouter.get("/", playersController.getAll);
teamPlayersRouter.get("/:id", playersController.getById);

export default teamPlayersRouter;