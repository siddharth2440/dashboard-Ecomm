import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js"

const getAnalyticsData = async (req,res) => {
    try {

        const total_users = await User.countDocuments();
        const total_products = await Product.countDocuments();

        const salesData = await Order.aggregate([
            {
                $group:{
                    _id:null,    // it groups all documents together
                    totalSales:{$sum:1},
                    totalAmount:{$sum:"$totalAmount"}
                }
            }
        ])
        const { totalSales,totalAmount }  = salesData[0]  || {totalSales:0,totalAmount:0};

        const endDate = new Date();
        const startDate = new Date( endDate.getTime() - 7 * 24 * 60 * 60 * 1000 );

        const dailySalesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group:{
                    _id : { $dateToString : {format:"%Y-%m-%d",date:'$createdAt'} },
                    sales : { $sum : 1},
                    revenue : { $sum : '$totalAmount' }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ])
        
        return res.status(200).json({
            total_users,total_products,salesData
        })
    } catch (error) {
        console.log("ERrored", error);
        return res.status(500).json({ message: "Server error" });      
    }
}

export {
    getAnalyticsData
}