import { setCookie ,getCookie} from "../../utils/cookie";
import { server } from "../Store";


export const login = (email,password)=> async(dispatch)=>{

        dispatch({type:"loginRequest"});

        const url = `${server}/user/login`
        const response = await fetch(url,{
          method:"POST",
          headers:{
           "content-type":"application/json"
          },
          body: JSON.stringify({
            email,password
          })
        })
    
        const data = await response.json();
        console.log(data);
        if(data.message){
        dispatch({ type: "loginSuccess", payload: data});
        setCookie("token",data.token);
        }
        if(data.msg){
          dispatch({ type: "loginFail", payload: data.msg});
        }
};

export const logOut = ()=> async(dispatch)=>{

  dispatch({type:"logOutRequest"});
   const  message ="Logout successfully"
  dispatch({ type: "logOutSuccess", payload: message});
};

export const register = (name,email,password)=> async(dispatch)=>{

  dispatch({type:"registerRequest"});

  const url = `${server}/user/register`
  const response = await fetch(url,{
    method:"POST",
    headers:{
     "content-type":"application/json"
    },
    body: JSON.stringify({
      email,password,name
    })
  })

  const data = await response.json();
  if(data.message){
  dispatch({ type: "registerSuccess", payload: data});
  }
  if(data.msg){
    dispatch({ type: "registerFail", payload: data.msg});
  }
};

export const forgotPassword = (email)=> async(dispatch)=>{

  dispatch({type:"forgotPasswordRequest"});

  const url = `${server}/user/password/forgot` ;
          const response = await fetch(url,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({email})
          })

  const data = await response.json();

  if(data.message){
  dispatch({ type: "forgotPasswordSuccess", payload: data.message});
  }
  if(data.msg){
    dispatch({ type: "forgotPasswordFail", payload: data.msg});
  }
};

export const resetPassword = (password,token)=> async(dispatch)=>{

  dispatch({type:"resetPasswordRequest"});

  const url = `${server}/user/password/reset/${token}` ;
          const response = await fetch(url,{
            method:"PATCH",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({password})
          })

          const data = await response.json();
          console.log(data);
  if(data.message){
  dispatch({ type: "resetPasswordSuccess", payload: data.message});
  }
  if(data.msg){
    dispatch({ type: "resetPasswordFail", payload: data.msg});
  }
};


export const loadUser = ()=> async(dispatch)=>{

  dispatch({type:"loadUserRequest"});
  const token = getCookie();
  const url = `${server}/user` ;
          const response = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization": token
            }
          })

          const data = await response.json();
  console.log(data);
  if(data.message){
  dispatch({ type: "loadUserSuccess", payload: data});
  }
  if(data.msg){
    dispatch({ type: "loadUserFail", payload: data.msg});
  }
};

