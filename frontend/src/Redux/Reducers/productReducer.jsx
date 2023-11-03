import {createReducer} from "@reduxjs/toolkit";

export const productReducer = createReducer({},{

    createProductRequest:(state)=>{
        state.loading = true;
    },
    createProductSuccess:(state,action)=>{
        state.loading = false;
        state.product = action.payload.product;
        state.message = action.payload.message;
    },
    createProductFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    getProductsRequest:(state)=>{
        state.loading = true;
    },
    getProductsSuccess:(state,action)=>{
        state.loading = false;
        state.products = action.payload.products;
        state.nHits = action.payload.nHits ;
    },
    getProductsFail:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    clearError:(state)=>{
        state.error = null;
    },
    clearMessage:(state)=>{
        state.message = null;
    },
})