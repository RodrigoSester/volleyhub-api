import { Router } from "express";
import matchesController from "../controllers/matches.controller.js";

const matchesRouter = Router();

matchesRouter.post("/", matchesController.register);

export default matchesRouter;