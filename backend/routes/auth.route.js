import { Router } from "express"
import { login, logout, resfreshToken, signup } from "../controller/auth.controller.js";

const router = Router()

router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);
router.post("/refresh-token",resfreshToken);

export default router;