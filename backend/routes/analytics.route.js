import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getAnalyticsData } from "../controller/analytics.controller.js";

const router = Router();

router.get("/",protectedRoute,getAnalyticsData);

export default router;