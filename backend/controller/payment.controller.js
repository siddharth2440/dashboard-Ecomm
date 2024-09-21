// import { stripe } from "../lib/stripe.js";
import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";

const createCheckoutSession = async (req, res) => {};

const checkoutSuccess = async (req,res) => {
    // try {
    //         const {allproducts,couponCode}  = req.body;
    //         if(!Array.isArray(allproducts) && products.length===0 ){
    //             return res.status(400).json({message: "No products in the cart"});
    //         }

    //         let totalAmount = 0;
            
    //         const lineItems = products.map(product => {
    //             const amount = Math.round(product.price * 100)     // stripe wans us to sned in the format of cents
    //             totalAmount += amount * product.quantity;
    //             return {totalAmount}
    //         });

    //         // create an order
    //         const products = JSON.parse(allproducts);


    //         let coupon = null;

    //         if(couponCode){
    //             coupon = await Coupon.findOne({code: couponCode,isValid: true,userId:req.user.id});
    //             if(coupon){
    //                 totalAmount -= Math.round(totalAmount * (coupon.percentage/100));
    //             }
    //         }

    //         const newOrder = new Order({
    //             user:req.user.id,
    //             products: products.map(product => ({
    //                 product:product.id,
    //                 quantity: product.quantity,
    //                 price: product.price
    //             })),
    //             totalAmount: session.amount_total / 100,   // convert from cents to dollar
    //             stripeSessionId: sessionId
    //         })

    //         await newOrder.save();

    //         if(totalAmount > 20000){
    //             await createNewCoupon(req.user.id);
    //         }

    //         return res.status(200).json({message: "Purchase Successful", order: newOrder});
    // } catch (error) {
    //     return res.status(500).json({message: "Purchase Error", error: error});
    // }
}


async function createNewCoupon(userId) {
    await Coupon.findOneAndDelete({userId: userId})
    const newCoupon = new Coupon({
        userId:req.user.id,
        code: "GIFT"+Math.random().toString(36).substring(2,8).toUpperCase(),
        discountPercentage: Math.floor(Math.random() * 30) + 10,
        expirationDate: new Date(Date.now() + 1000*60*60*24*30),   // 30 days from now
    })
    await newCoupon.save();
    return newCoupon;
}

export {
    createCheckoutSession,
    checkoutSuccess
}