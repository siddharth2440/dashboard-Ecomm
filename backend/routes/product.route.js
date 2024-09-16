import { Router } from "express";
import { adminRoute, protectedRoute } from "../middleware/auth.middleware.js";
import { createProduct, getAllProducts, getFeaturedProducts, getProductsByategory, getRecommendedProduct, toggleFeaturedProduct } from "../controller/product.controller.js";
const router = Router();

router.get("/",protectedRoute,adminRoute,getAllProducts);
router.get("/featured-products",getFeaturedProducts);
router.post('/',protectedRoute,adminRoute,createProduct);
router.delete('/:id',protectedRoute,adminRoute,deleteProduct);
router.get("/recommendations",getRecommendedProduct);
router.get("/category/:category",getProductsByategory);
router.patch('/:id',protectedRoute,adminRoute,toggleFeaturedProduct);


export default router;