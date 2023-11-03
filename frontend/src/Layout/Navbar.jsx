import Logo from "../../src/assets/images/logo.png"
import "../sass/layout.scss";
import {BsChevronDown, BsPersonFill, BsCart3} from "react-icons/bs"
import {BiSearch, BiLogIn} from "react-icons/bi";
import {FiMenu} from "react-icons/fi"
import {AiOutlineClose} from "react-icons/ai"
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../Redux/Actions/userActions";
import { removeCookie } from "../utils/cookie";


export const Navbar = ({isAuthenticated = false, user}) => {

  const [show, setShow] = useState(false);
  const clickHandler = () =>{
    setShow(true);
    if(show){
      setShow(false);
    }
  }

  const mySidenav = useRef();
const pannelDisplay1 = useRef();
const pannelDisplay2 = useRef();

  const openMenu = ()=>{
    mySidenav.current.style.width = "70%" ;
  }
  const closeMenu = ()=>{
    mySidenav.current.style.width = "0" ;
  }
   
  const pannelDisplayHandler1 = ()=>{
   
  if(pannelDisplay1.current.style.display === "block"){
    pannelDisplay1.current.style.display = "none" ;
  }else{
    pannelDisplay1.current.style.display = "block" ;
  }

  }
  
const pannelDisplayHandler2 = ()=>{

    if(pannelDisplay2.current.style.display === "block"){
        pannelDisplay2.current.style.display = "none" ;
      }else{
        pannelDisplay2.current.style.display = "block" ;
      }
}

const dispatch = useDispatch();

const logOutHandler = () => {
  dispatch(logOut());
  closeMenu();
  setShow(false);
  removeCookie();
}

  return (
    <nav>
      <Link to={"/"} className="logo">
        <img src={Logo} alt="red apple as logo of the brand" />
        <span>E-file storage</span>
      </Link>
      <ul>
      </ul>
     
      {
        isAuthenticated ? <div className="modal">
          <Link onClick={clickHandler}><BsPersonFill/> Account</Link>
               
                {
                  show ? <div className="modal-body">
                  <Link to={"/admin/dashboard"} onClick={()=>setShow(false)}>Profile</Link>
                  <Link onClick={logOutHandler}>Log out</Link>
              </div> : null 
                }
               
        </div> : <Link to={"/login"}><BiLogIn/> Login</Link>
      }
    

      <FiMenu className="mobile-menu" onClick={openMenu}/>
      <div ref={mySidenav} class="sidenav">
            <span href="javascript:void(0)" class="closebtn" onClick={closeMenu}><AiOutlineClose/></span>
            <div className="nav1">
            <Link to={"/"} onClick={closeMenu}>Home</Link>
           
            </div>
            {
              isAuthenticated ? <>
               <a href="#" onClick={pannelDisplayHandler2}>Account<BsChevronDown/></a>
            <div ref={pannelDisplay2} className="panel">
                <Link to={"/profile"}>Profile</Link>
            </div>
            {
              user?.role === "admin" ? <Link to={"/admin/dashboard"} onClick={closeMenu}>Dashboard</Link> : null
            }
            <Link onClick={logOutHandler}>Log out</Link>
               </> : <div className="nav2">
              <Link to={"/login"} onClick={closeMenu}>Login</Link>
              <Link to={"/register"} onClick={closeMenu}>Register</Link>
            </div>
            }
       </div>
    </nav>
  )
}

