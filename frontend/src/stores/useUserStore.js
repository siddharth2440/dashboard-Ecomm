import { create } from "zustand";
import { persist } from "zustand/middleware"
import toast from "react-hot-toast"
import axiosInstance from "../helpers/axiosInstance.js";

export const useUserStore = create( persist( (set,get) => ({
    user:null,
    loading:null,
    checkingAuth:false,

    signup : async ({name,email,password,confirmPassword}) => {
        set( { loading : true } );
        // console.log(name+'\n'+email+'\n'+password+'\n'+confirmPassword);
        if(password != confirmPassword){
            toast.error("Passwords do not match");
            set( { loading : false } );
            return;
        }

        try {
            const res = await axiosInstance.post("/auth/signup",{name,email,password});
            set( { loading : false } );
            set( { user : res.data.user ,checkingAuth:true} );
            return toast.success(res.data.message);
        } catch (error) {
            console.log("Error: " + error);
            return;
        }
    },
    //login
    login: async ({email,password}) => {
        set( { loading : true } );
        try {
            const res = await axiosInstance.post("/auth/login",{email,password});
            console.log(res);
            set( { loading : false } );
            set( { user : res.data.user, checkingAuth:true} );
            return toast.success(res.data.message);
        } catch (error) {
            set( { loading : false } );
            return toast.error("Invalid Credentials");
        }
    }
}),{
    name: "userStore",
    // partialize: (state) =>
    //     Object.fromEntries(
    //       Object.entries(state).filter(([key]) => !['user'].includes(key)),    // i.e., user will be excluded from the state that we're saving
    //     ),
} 
));