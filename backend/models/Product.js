import { Schema,model } from "mongoose";

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlenght:[4,"Product Name must be atleast 4 characters"],
        maxlength:[30,"Product Name must be atmost 30 characters"],
        trim:true
    },
    description:{
        type: String,
        required: true,
        minlenght:[5,"Product Name must be atleast 4 characters"],
        maxlength:[100,"Product Name must be atmost 30 characters"],
        trim:true,
        lowercase:true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: [true,"Product Image is required"]
    },
    category:{
        type: String,
        required: true
    },
    isFeatured:{
        type: Boolean,
        default: false
    }
},{timestamps:true});

const productModel = model("Product",productSchema);

export default productModel;