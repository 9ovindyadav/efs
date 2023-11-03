import {Cookies} from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name,value) => {

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate()+1);

    cookies.set(name,`Bearer ${value}`,{path: "/",expires: expireDate});
}

export const getCookie = () => {

    
    return cookies.getAll().token ;
}

export const removeCookie = () => {

    cookies.remove("token");
}
