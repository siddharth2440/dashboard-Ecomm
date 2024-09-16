import { stripe } from "../lib/stripe.js";
import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";

const createCheckoutSession = async (req, res) => {
    try {
        const {products,couponCode}  = req.body;
        if(!Array.isArray(products) && products.length===0 ){
            return res.status(400).json({message: "No products in the cart"});
        }

        let totalAmount = 0;
        
        const lineItems = products.map(product => {
            const amount = Math.round(product.price * 100)     // stripe wans us to sned in the format of cents
            totalAmount += amount * product.quantity;
            return {
                price_data:{
                    currency: 'usd',
                    product_data:{
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: amount
                }
            }
        });


        let coupon = null;

        if(couponCode){
            coupon = await Coupon.findOne({code: couponCode,isValid: true,userId:req.user.id});
            if(coupon){
                totalAmount -= Math.round(totalAmount * (coupon.percentage/100));
            }
        }

        // create a session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items:lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session_id={ CHECKOUT_SESSION_ID }`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts: coupon 
            ? [
                {
                    coupon: await createStripeCoupon(coupon.discountPercentage),
                    amount_off: Math.round(totalAmount * (coupon.percentage/100)),
                    currency: 'usd'
                }
            ] : [],
            metadata: {
                userId: req.user.id,
                couponCode : couponCode || "",
                products: JSON.stringify(
                    products.map(product=>({
                        id: product._id,
                        name: product.name,
                        quantity: product.quantity,
                        price: product.price
                    }))
                )
            }
        });

        if(totalAmount > 20000){
            await createNewCoupon(req.user.id);
        }

        return res.status(200).json(
            {
                sessionId: session.id,
                totalAmount: totalAmount / 100,
                coupon: coupon? coupon.code : null,
                discount: coupon? coupon.discountPercentage : null,
                expirationDate: coupon? coupon.expirationDate.toISOString().split('T')[0] : null,
                couponCode: coupon? coupon.code : null
            }
        )

    } catch (error) {

        console.log("Error: " + error);
        return res.status(500).json({message: "Server Error"});
    }
}

const checkoutSuccess = async (req,res) => {
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if(session.payment_status="paid"){
            if(session.metadata.couponCode){
                await Coupon.findOneAndUpdate(
                    {
                        code: session.metadata.couponCode,
                        userId:session.metadata.userId
                    },
                    {
                        isActive: false
                    }
                )
            }

            // create an order
            const products = JSON.parse(session.metadata.products);

            const newOrder = new Order({
                user:session.metadata.userId,
                products: products.map(product => ({
                    product:product.id,
                    quantity: product.quantity,
                    price: product.price
                })),
                totalAmount: session.amount_total / 100,   // convert from cents to dollar
                stripeSessionId: sessionId
            })

            await newOrder.save();

            res.status(200).json({message: "Purchase Successful", order: newOrder});
        }
    } catch (error) {
        return res.status(500).json({message: "Purchase Error", error: error});
    }
}

async function createStripeCoupon(discountPercentage){
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: 'once'
    })

    return coupon.id;
}


async function createNewCoupon(userId) {
    const newCoupon = new Coupon({
        userId:req.user.id,
        code: "GIFT"+Math.random().toString(36).substring(2,8).toUpperCase(),
        discountPercentage: Math.floor(Math.random() * 30) + 10,
        expirationDate: new Date(Date.now() + 1000*60*60*24*30),   // 30 days from now
    })
}


export {
    createCheckoutSession,
    checkoutSuccess
}