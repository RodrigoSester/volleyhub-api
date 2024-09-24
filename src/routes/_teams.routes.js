import { Router } from "express";
import teamsController from "../controllers/teams.controller.js";

const teamsRouter = Router();

teamsRouter.post("/", teamsController.register);
teamsRouter.put("/:id", teamsController.edit);
teamsRouter.delete("/:id", teamsController.remove);
teamsRouter.get("/", teamsController.getAll);
teamsRouter.get("/:id", teamsController.getById);

export default teamsRouter;