import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../Redux/Actions/userActions";

export const ResetPassword = () => {
    
const params = useParams();
const [password,setPassword] = useState("");

const {message} = useSelector(State=>State.user);

const dispatch = useDispatch();
const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const token = params.token;
        dispatch(resetPassword(password,token));
    }

    useEffect(()=>{
      if(message){
        navigate("/login");
      }
    },[message,dispatch]);

  return (
    <div className="container">
    <form action="post" onSubmit={submitHandler}>
        <h1>Reset Password</h1>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="New Password"/>
        <button className="btn-register" type="submit">Submit</button>
    </form>
    </div>
  )
}