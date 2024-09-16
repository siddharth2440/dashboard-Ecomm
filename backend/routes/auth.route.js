import { Router } from "express"
import { getProfile, login, logout, resfreshToken, signup } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);
router.post("/refresh-token",resfreshToken);
router.get("/profile",protectedRoute,getProfile);

export default router;