import { redis } from "../lib/redis.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
    const accessToken = jwt.sign({id:userId},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m"
    })
    const refreshToken = jwt.sign({id:userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: "7d"
    })

    return {accessToken,refreshToken};
}

const storeRefreshToken = async (userId,refreshToken) => {
    await redis.set(`refresh_token:${userId}`,refreshToken,"EX",7 * 24 * 60 * 60 )  //  7 days 
}


const setCookies = ( res,accessToken,refreshToken ) => {
    // console.log(accessToken);
    // console.log(refreshToken);
    
    res.cookie("access_token", accessToken, 
        { 
            httpOnly: true, 
            secure: process.env.NODE_ENV == "production", 
            sameSite: "strict",
            maxAge: 15*60*1000
        }
    );
    
    res.cookie("refresh_token", refreshToken, 
        { 
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",   // CSRF attacks prevention
            maxAge: 7*24*60*60*1000
        }
    );
}

const signup = async (req, res) => {
    // console.log("Hits");
    // console.log(req.body);
    
    try {
        // console.log(req.body);
        
        const { email,password,name } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
    
        const newUser = new User({ email, password, name });
        await newUser.save();

        // Generate Tokens        
        const {accessToken,refreshToken} = generateTokens(newUser._id);
        await storeRefreshToken(newUser._id, refreshToken);

        setCookies(res,accessToken,refreshToken)
        
        return res.status(201).json({ message: "User created successfully",user: newUser});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Server error"
        })
        
    }
}

const login = async (req, res) => {
    try {
        const { email,password } = req.body;
        console.log(email, password);
        

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const comparePassowrd = await user.comparePassword(password);
        console.log(comparePassowrd);
        
        if (!comparePassowrd) {
            console.log("Password is different");
            
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const { accessToken,refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken)

        return res.status(200).json({ message: "Logged in successfully",user });

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}

const logout = async (req, res) => {
    try {
        const refresh_token = req.cookies["refresh_token"];

        if(refresh_token){
            const decoded = jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET);
            console.log(decoded);
            
            await redis.del(`refresh_token:${decoded.id}`);
        }
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logout :- ", error.message);
        return res.status(500).json({
            message: "Server error"
        })
    }
}


const resfreshToken = async (req,res) => {
    const refreshToken = req.cookies["refresh_token"];    
    if(!refreshToken){
        return res.status(401).json({message:"Not authorized, no refresh token"});
    }
    const decodedToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
    
    const storedToken = await redis.get(`refresh_token:${decodedToken.id}`);
    
    // console.log(refreshToken,"+", storedToken);

    if(refreshToken != storedToken){
        return res.status(401).json({message:"Not authorized, Invalid Token Details"});
    }

    const accessToken = jwt.sign({id:decodedToken.id},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m"
    })

    // console.log("New Token :- "+accessToken);    

    res.cookie("access_token",accessToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
        maxAge: 15*60*1000
    })

    return res.json({message:"Refreshed Token"});
}

const getProfile = async (req, res) => {
    return res.json({message:"Prifile Details",user:req.user});
}

export {
    signup,
    login,
    logout,
    resfreshToken,
    getProfile
}
