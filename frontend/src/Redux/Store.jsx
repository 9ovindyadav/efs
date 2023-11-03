import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducers";
import { productReducer } from "./Reducers/productReducer";

const store = configureStore({
    reducer:{
     user: userReducer,
     product: productReducer
    }
})

export default store ;

export const server = import.meta.env.VITE_BACKEND_URL; 