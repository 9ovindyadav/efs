import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../Redux/Actions/userActions";

export const ForgotPassword = () => {

    const [email,setEmail] = useState("");

    const dispatch = useDispatch();
    const submitHandler = async (e) => {
          e.preventDefault();
        dispatch(forgotPassword(email));
    }
  return (
    <div className="container">
<form action="post" onSubmit={submitHandler}>
    <h1>Forgot Password</h1>
    <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
    <button className="btn-register" type="submit">Submit</button>
</form>
</div>
  )
}