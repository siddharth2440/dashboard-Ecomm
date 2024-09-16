import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controller/cart.controller";
const router = Router();

router.get("/",protectedRoute,getCartProducts);
router.post("/",protectedRoute,addToCart);
router.delete("/",protectedRoute,removeAllFromCart);
router.put("/:id",protectedRoute,updateQuantity);


export default router;