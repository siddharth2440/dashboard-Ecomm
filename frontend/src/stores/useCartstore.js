import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../helpers/axiosInstance.js";
import toast from "react-hot-toast";

export const useCartstore = create( persist(
    (set,get) => {
        return ({
            cart:[],
            coupon:null,
            total:0,
            subTotal:0,
            isCouponApplied:false,
            
            getCartItems : async () => {
                const res = await axiosInstance.get("/cart");
                // console.log(res.data);

                set({cart: res.data?.cartItems})
                get().calculateTotal();
            },

            addToCart: async (product) => {
                try {
                    console.log(product);
                    
                    const res = await axiosInstance.post("/cart",{productId:product._id});
                    if(!res){
                        return toast.success("Error in add to cart");
                    }

                    set((state) => {
                        const existingItem = state.cart.find(item => item._id === product._id);
                        const newCart = existingItem
                         ? state.cart.map((item) => (item._id === product._id ? {...product,quantity:item.quantity+1} : item ) )
                         : [...state.cart, {...product, quantity:1}];
                        return {cart: newCart};
                    } );

                    get().calculateTotal();
                    return toast.success("Product added Cart successfully");

                } catch (error) {
                    
                }
            },

            removeFromCart: async (productId) => {
                // console.log(product);
                const res = await axiosInstance.delete("/cart",{data:{productId}});
                if(res){
                    set((state) => {
                        return ({
                            cart: state.cart.filter((item) => item._id!== productId),
                    })
                    } )
                    get().calculateTotal();
                    return toast.success("Product deleted successfully");
                }
            },

            updateQuantity: async (productId,quantity) => {
                console.log(productId , quantity);
                
                if(quantity === 0){
                    get().removeFromCart(productId);
                }
                await axiosInstance.put(`/cart/${productId}` , { quantity } );
                
                set((prevState) => ({
                    cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
                }));

                get().calculateTotal();
            },

            calculateTotal: async () => {
                const {cart,coupon} = get();
                const subTotal = cart.reduce((sum,item) => {
                    return sum+(item.quantity * item.price )
                },0 );

                let total = subTotal;

                if(coupon){
                    const discount = subTotal * (coupon.discount / 100 );
                    total = subTotal - discount;
                }

                set({subTotal, total});
            }
        })
    },
    {
        name:"Cart"
    }
) )