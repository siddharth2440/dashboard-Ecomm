import User from "../models/User.js";

export const protectedRoute = async (req,res,next) => {
    try {
        const accessToken = req.cookies["access_token"];
        if(!accessToken){
            return res.status(401).json({message:"Access Denied. Please Login."})
        }
        const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findOne({_id:decodedToken.id});
        if(!user){
            return res.status(401).json({message:"Access Denied. Unauthorized User."})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectedRoute", error);
        return res.status(500).json({message:"Access Denied. Unauthorized"});   
    }
}


export const adminRoute = (req,res) => {
    if(req.user && req.user.role==="admin"){
        next();
    }
    return res.status(403).json({message:"Access Denied. Only admin can access this route."});
}