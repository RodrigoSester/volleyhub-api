import { Router } from "express";

import authRoutes from "./_auth.routes.js";
import { authorizer } from "../middlewares/authorizer.middleware.js";
import teamsRouter from "./_teams.routes.js";
import userRoutes from "./_user.routes.js";

const router = Router();

router.use("/auth", authorizer, authRoutes);
router.use("/user", authorizer, userRoutes);
router.use("/teams", authorizer, teamsRouter);

export default router;