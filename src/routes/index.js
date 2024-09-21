import { Router } from "express";

import authRoutes from "./_auth.routes.js";
import userRoutes from "./_user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;