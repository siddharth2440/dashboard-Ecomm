import Product from "../models/Product.js";

const getCartProducts = async (req,res) => {
    try {
        const products = await Product.find({_id:{$in:req.user.cartItems}});
        
        // add the quantity for each product
        const cartItems = products.map(product => {
            const item = req.user.cartItems.find(cartItem=>cartItem.id === product.id);
            return {...product.toJSON(), quantity: item.quantity}
        } )
        return res.status(200).json({cartItems});
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Server error" });
    }
}

const addToCart = async (req,res) => {
    try {
        const {productId} = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(item=>item.id === productId);
        if(existingItem){
            existingItem.quantity+=1;
        }
        user.cartItems.push(productId);
        await user.save();
        return res.status(200).json({message: "Item added to cart successfully",catItems:user.cartItems});
    } catch (error) {
        console.log("Error in creating the Cart items "+error.message);
        return res.status(500).json({ error: error.message });
    }
}

const removeAllFromCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;
        if(!productId){
            user.cartItems = [];
        }else{
            user.cartItems = user.cartItems.filter(item=>item.id !== productId);
        }
        await user.save();
        return res.status(200).json({message: "All items removed from cart successfully", cartItems: user.cartItems});
    } catch (error) {
        console.log("Error in removing all items from the cart "+error.message);
        return res.status(500).json({ error: error.message });
    }
}


const updateQuantity = async (req, res) => {
    try {
        const {id} = req.params;
        const {quantity} = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find(item=>item.id === id);
        if(existingItem){
            if(quantity==0){
                user.cartItems = user.cartItems.filter(item=>item.id!== id);
                await user.save();
                return res.status(200).json({message: "Item removed from cart successfully", cartItems: user.cartItems});
            }
            existingItem.quantity = quantity;
            await user.save();
            return res.status(200).json({message: "Item quantity updated successfully", cartItems: user.cartItems});
        }else{
            return res.status(404).json({ message: "Item not found in cart" });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        return res.status(500).json({ error: error.message });
    }
}

export {
    getCartProducts,
    addToCart,
    removeAllFromCart,
    updateQuantity
}