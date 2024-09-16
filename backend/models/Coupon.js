import { Schema,model } from "mongoose";

const couponSchema = new Schema({
    code:{
        type: String,
        required: true,
        unique: true,
        minlength:5,
        maxlength:10
    },
    discountPercentage:{
        type: Number,
        required: true,
        min:0,
        max:100
    },
    expirationDate:{
        type: Date,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
},{timestamps:true});

const couponModel = model("Coupon", couponSchema);

export default couponModel;