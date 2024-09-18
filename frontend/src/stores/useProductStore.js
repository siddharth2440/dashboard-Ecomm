import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

export const useProductStore = create( persist(
    (set,get) => ({
        products: [],
        loading: true,
        error: null,

        createProduct: async (productdata) => {
            set({loading: true});

            try {
                const res = await axiosInstance.post('/product',productdata);

                set( (prev) => ({
                    products: [...prev.products, res.data],
                    loading: false
                }) )
            } catch (error) {
                toast.error("Error in creating product"+error.message);
                set({loading: false, error: error.message})
            }
        }
    }),
    {
        name: "productStore"
    }
) )