import express from "express";
import { config } from "dotenv";
import authRoute from "./routes/auth.route.js";
import dbConnection from "./db/dbConnection.js";
import morgan from "morgan";
import cors from "cors";
import productRoute from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import cartRoute from "./routes/cart.route.js";
import couponRoute from "./routes/coupons.route.js";
import paymentRoute from "./routes/payment.route.js"
import analyticsRoute from "./routes/analytics.route.js";

config();
const app = express();
const PORT = 6003 || process.env.PORT ;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));

app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use('/api/auth',authRoute);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRoute);
app.use('/api/coupon',couponRoute);
app.use('/api/payment',paymentRoute);
app.use('/api/analytics',analyticsRoute);

app.listen(PORT,()=>{
    dbConnection();
    console.log(`Server is running on port ${PORT}`);
});