import { Router } from "express";
import { AuthRoutes } from "./authRoute";
import { verifyAuth } from "../middlewares/auth";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/dashboard", verifyAuth);
export default router;