import Coupon from "../models/Coupon"

export const getCoupon = async (req,res) => {
    try {
        const coupon = await Coupon.find({userId:req.user.id,isActive:true});
        return res.status(200).json(coupon);
    } catch (error) {
        console.log("Error: ",error);
        return res.status(500).json({message: "Server Error"});
    }
}

export const validateCoupon = async (req,res) => {
    try {
        const {code} = req.body;
        const coupon = await Coupon.findOne({code, isActive:true,userId:req.user.id});
        if(!coupon){
            return res.status(400).json({message: "Invalid Coupon Code"});
        }
        if(coupon.expirationDate < new Date() ){
            coupon.isActive = false;
            await coupon.save();
            return res.status(400).json({message: "Coupon Expired"});
        }
        return res.status(200).json({message: "Coupon Validated Successfully", coupon});        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Server Error"});
    }
}