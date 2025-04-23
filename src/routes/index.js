import { Router } from "express";

import authRoutes from "./_auth.routes.js";
import { authorizer } from "../middlewares/authorizer.middleware.js";
import teamsRouter from "./_teams.routes.js";
import userRoutes from "./_user.routes.js";
import matchesRouter from "./_matches.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", authorizer, userRoutes);
router.use("/teams", authorizer, teamsRouter);
router.use("/matches", authorizer, matchesRouter);

export default router;