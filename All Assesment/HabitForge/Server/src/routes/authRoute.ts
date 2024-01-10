import { Router } from "express";
import { handleUserLogin, handleUserRegistration } from "../controller/UserController";

const router = Router();

router.post("/register", handleUserRegistration)
router.post("/login",handleUserLogin)
// router.get("/logout",handleUserLogout)

export  {router as AuthRoutes};