import { getCookie } from "../../utils/cookie";
import { server } from "../Store";

const token = getCookie();

export const createProduct = (myForm)=> async(dispatch)=>{

    dispatch({type:"createProductRequest"});

    const url = `${server}/product/create`
    const response = await fetch(url,{
      method:"POST",
      headers:{
       "content-type":"application/json",
       "Authorization": token
      },
      body: JSON.stringify(myForm)
    })

    const data = await response.json();
    console.log(data)
    if(data.message){
    dispatch({ type: "createProductSuccess", payload: data});
    }
    if(data.msg){
      dispatch({ type: "createProductFail", payload: data.msg});
    }
};

export const getAllProducts = ()=> async(dispatch)=>{
  dispatch({type:"getProductsRequest"});
  let url = `${server}/product?`

  const response = await fetch(url);

  const data = await response.json();
  console.log(data)
  if(data.products){
  dispatch({ type: "getProductsSuccess", payload: data});
  }
  if(data.msg){
    dispatch({ type: "getProductsFail", payload: data.msg});
  }
};