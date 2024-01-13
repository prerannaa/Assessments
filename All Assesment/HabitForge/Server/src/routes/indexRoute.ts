import { Router } from "express";
import { AuthRoutes } from "./authRoute";
import { verifyAuth } from "../middlewares/auth";
import { HabitRoutes } from "../routes/habitRoutes";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/dashboard", HabitRoutes);
export default router;