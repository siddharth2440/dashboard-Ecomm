import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({products});
    } catch (error) {
        console.log("Error in getting the All products :"+error.message);
        return res.status(500).json({
            message: "Server error"
        })
    }
}


export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProduct = await redis.get("featured_products");
        if(featuredProduct){
            return res.status(200).json({products:featuredProduct});
        }

        featuredProduct = await Product.findOne({isFeatured:true}).lean();

        if(!featuredProduct){
            return res.status(404).json({message:"No featured products found"});
        }

        await redis.set("featured_products",JSON.stringify(featuredProduct));
        return res.status(200).json({products:featuredProduct});
    } catch (error) {
        console.log("Error in getting the Featured products :"+error.message);
        return res.status(500).json({
            message: "Server error"
        })        
    }
}


export const createProduct = async (req,res) => {
    try {
        const {name,description,price,image,category} = req.body;
        let cloudinaryResponse;

        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image,{
                folder:"products",
                transformation:[{width:400,height:400,crop:"fill"}]
            })
        }

        const product = new Product({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        })

        await product.save();

        res.status(200).json({product})
    } catch (error) {
        console.log("Error in creating the Product :"+error.message);
        return res.status(500).json({
            message: "Server error"
        })        
    }
}


export const deleteProduct = async (req,res) => {
    console.log(req.params.id);    
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        console.log(product)
        // delete the image from the cloudinary
        if(product.image){
            console.log(product.image);
            
            const image_public_id = await product.image.split('/').pop().split('.')[0];
            console.log(image_public_id);
            
            try {
                await cloudinary.uploader.destroy(`/products/${image_public_id}`)
                console.log("Image deleted from cloudinary");
            } catch (error) {
                console.log("Error in deleting th eimage from cloudinary");
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log("Error in deleting the Product ");
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export const getRecommendedProduct = async (req,res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    price:1,
                    image:1
                }
            }
        ])

        return res.status(200).json({products});
    } catch (error) {
        console.log("Error: " + error.message);
        return res.status(500).json({
            message: "Server error"
        })
    }
}


export const getProductsByategory = async (req,res) => {
    const {category} = req.params;
    try {
        const products = await Product.find({category});
        console.log(products);
        
        // if(products.length == 0){
        //     console.log("Yaha aaya");
            
        //     return res.status(404).json({message:"No products found in this category"});
        // }
        console.log("Yahan aaya kya");
        return res.status(200).json({products});        
    } catch (error) {
        return res.status(500).json({message:"Error", error});
    }
}


export const toggleFeaturedProduct = async (req,res) => {
    const {id} = req.params;
    console.log(id);
    
    try {
        // await Product.findByIdAndUpdate(id,{
        //     $set:{isFeatured:!isFeatured}
        // })

        const product = await Product.findById(id);
        product.isFeatured =!product.isFeatured;
        const updatedProduct = await product.save();
        await featuredProductCache();
        return res.status(200).json({message: `Product with id ${id} has been updated`,updatedProduct});
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "Server error"
        })
    }
}

async function featuredProductCache() {
    try {
        const feturedProducts = await Product.find({isFeatured: true}).lean();
        await redis.set("featured_products", JSON.stringify(feturedProducts));
    } catch (error) {
        console.log("error: " + error);

    }
}