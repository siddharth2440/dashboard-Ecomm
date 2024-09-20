import { Schema,model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        trim:true,
        minlength:[6,"Password must be at least 6 characters long"],
        // maxlength:[20,"Password must be at most 20 characters long"],
        // select:false
    },
    cartItems:[
        {
            quantity:{
                type:Number,
                required:true,
                default:1
            },
            product:{
                type: Schema.Types.ObjectId,
                ref:'Product'
            }
        }
    ],
    role:{
        type:String,
        enum:['customer','admin'],
        default:'customer'
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    try {
        if(!this.isModified('password')){
            next();
        }
        this.password = await bcrypt.hash(this.password,10);
        next();
    } catch (error) {
        console.log("Error while hashing password : " + error.message);
    }
})

userSchema.methods = {
    comparePassword : async function(passsword){
        try {
            return bcrypt.compare(passsword,this.password)
        } catch (error) {
            console.log(passsword,"Error Message from comparePassword"+error.message);
        }
    }
}

const userModel = model("User",userSchema);

export default userModel;