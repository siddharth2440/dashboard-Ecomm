import express from "express";
import { config } from "dotenv";
import authRoute from "./routes/auth.route.js";
import dbConnection from "./db/dbConnection.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

config();
const app = express();
const PORT = 6003 || process.env.PORT ;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));

app.use(cookieParser());

// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true
// }))

app.use('/api/auth',authRoute);
// app.use('api/auth',authRoute);
// app.use('api/auth',authRoute);
// app.use('api/auth',authRoute);
// app.use('api/auth',authRoute);

app.listen(PORT,()=>{
    dbConnection();
    console.log(`Server is running on port ${PORT}`);
});