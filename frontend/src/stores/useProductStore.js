import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

export const useProductStore = create( persist(
    (set,get) => ({
        products: [],
        loading: false,
        error: null,

        createProduct: async (productdata) => {
            set({loading: true});

            try {
                const res = await axiosInstance.post('/product',productdata);
                // console.log(res.data);
                
                set( (prev) => ({
                    products: [...prev.products, res.data.product],
                    loading: false
                }) )
            } catch (error) {
                toast.error("Error in creating product"+error.message);
                set({loading: false, error: error.message})
            }
        },

        getAllProducts: async () => {
            set({loading: true});
            try {
                const res = await axiosInstance.get('/product');
                console.log(res);
                
                
                set({products: res.data.products, loading: false});
                toast.success("All products have been spotted")
            } catch (error) {
                set({products: res.data, loading: false});
                toast.error(error.message);
            }
        },

        featuredProduct : async (productId) => {
            set({loading: true});
            try {
                const res = await axiosInstance.patch(`/product/${productId}`);
                set((state) => ({
                    products: state.products.map((product) =>
                        product._id === productId ? { ...product, isFeatured: res.data.updatedProduct.isFeatured } : product
                    ),
                    loading: false,
                }));

                toast.success("Product Featured updated successfully");
            } catch (error) {
                set({loading: false})
                console.log(error.message);
                toast.error("Error in updating product featured status");
            }
        },
        deleteProduct : async (productId) => {
            set({loading:true});
            try {
                const res = await axiosInstance.delete(`/product/${productId}`);
                    set((state) => {
                        return ({
                            products: state.products.filter((product) => product._id!== productId),
                            loading: false,
                        })
                    } )
                    return toast.success("Product deleted Successfully");

            } catch (error) {
                set({loading: false});
                console.log(error.message);
                return toast.error("Error in deleting the Product"+error.message);
                
            }
        },
        fetchProductsByCategory: async (category) => {
            // console.log("category "+category);
            
            set({loading: true});
            const res = await axiosInstance.get(`/product/category/${category}`)
            set({
                loading: false,
                products: res.data.products
            });            
        }
    }),
    {
        name: "productStore"
    }
) )