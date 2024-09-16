import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware";
import { validateCoupon } from "../controller/coupon.controller";
const router = Router();

router.get("/",protectedRoute,getCoupon);
router.get("/validate",protectedRoute,validateCoupon);

export default router;