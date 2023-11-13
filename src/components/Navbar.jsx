import { useState, useEffect, useRef } from "react";
import React from 'react';
import '../components/stylecss/Login.css';
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  const[user,setUser]=useState({
    name:"",
    email:"",
    password:"",  
    cpassword:""
  }); 
  const[loginEmail,setLoginEmail]=useState("");
  const[loginPassword,setLoginPassword]=useState("");
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const modalRef = useRef(null);

  const handleLoginClick = () => {
    setIsLoginFormVisible(true);
    setModal(true);
  };

  const handleModal = () => {
    setModal(false);
  };

  const handleSignupClick = () => {
    setIsLoginFormVisible(false);
    setModal(true);
    setUser({
      name: "",
      email: "",
      password: "",
      cpassword: ""
    });
  };

  const closeModal = () => {
      setModal(false);
     };
  useEffect(() => {
    const currentNavItem = navLinks.find(nav => nav.title === active);
    if (currentNavItem && currentNavItem.id === 'login') {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [active]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  let name,value;
  const handleInputs=(e)=>{
    console.log(e);
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value});
  }
  const PostData=async(e)=>{
    e.preventDefault();
    const {name,email,password,cpassword  }=user;
    
    const res= await  fetch("/register",{
      method:"POST",
      credentials: 'include',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,password,cpassword
      })
    })
    const data=await res.json();
   // console.log(data);
    if(data.status===422||!data){
      window.alert("Invalid Registration");
      console.log("invalid registration");
    }
    else{
      window.alert("Registration succesfful");
      console.log("registration successful");
      setIsLoginFormVisible(true);
    }
  }
  
  const loginUser=async(e)=>{
    e.preventDefault();
    console.log(loginPassword,loginEmail);
    const res=await fetch('/signin',{
      method:"POST",
      credentials: "include" ,
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:loginEmail,
        password:loginPassword,
      }),
    });
    const data=await res.json();
    console.log(data);
    if(res.status===400 || !data){
      window.alert("Wrong credentials");
      console.log("wrong credentials");
    }
    else{
      window.alert("Login Successfull");
      setModal(false);
    }
  }
  
  return (
    <>
    <nav className={`w-full flex mt-3 justify-between items-center navbar ${modal ? "blur-background" : ""}`}>
      <img src={logo} alt="hoobank" className="w-[150px] h-[52px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1" style={{color:"white"}}>
        <button className="mr-10"> Home </button>
        <button className="mr-10"> About us </button>
        <button className="mr-10"> Timeline </button>
        <button  onClick={handleLoginClick}> Login </button>
        
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col" style={{color:"white"}}>
          <li className="mr-4"> Home </li>
        <li className="mr-4"> About us </li>
        <li className="mr-4"> Timeline </li>
        <li className="mr-4"> Login </li>
        
          </ul>
        </div>
      </div>
    </nav>
    {modal && (
      <div className="wrapper" style={{color:"white"}}>
        <div className="title-text">
          <div className={`title ${isLoginFormVisible ? 'login' : 'signup'}`} style={{color:"white"}}>
            Account
          </div>
          <div className={`title ${!isLoginFormVisible ? 'login' : 'signup'}`} style={{color:"white"}} >
            Account
          </div>
        </div>

        <div ref={modalRef} className="form-container">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLoginFormVisible}
              onChange={handleLoginClick}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLoginFormVisible}
              onChange={handleSignupClick}
            />
            <label htmlFor="login" className={`slide ${isLoginFormVisible ? 'login' : 'signup'}`} style={{color:"white"}}>
              Login
            </label>
            <label
              htmlFor="signup" style={{color:"white"}}
              className={`slide ${!isLoginFormVisible ? 'login' : 'signup'}` }
            >
              SignUp
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            <form method="POST" className={`login ${isLoginFormVisible ? '' : 'hidden'}`}>
              <div className="field">
                <input type="email" name="loginEmail" placeholder="Email Address" id="loginEmail"
                value={loginEmail}
                onChange={(e)=> setLoginEmail(e.target.value)}
                required />
              </div>
              <div className="field">
                <input type="password" name="loginPassword" placeholder="Password" id="loginPassword" 
                value={loginPassword}
                onChange={(e)=> setLoginPassword(e.target.value)}
                required />
              </div>
              <div className="pass-link">
                <a href="#">Reset password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" name="signin" id="signin" value="Log In" onClick={loginUser} />
              </div>
              <div className="signup-link">
                Don't Have Account? <a href="">Create A New</a>
              </div>
            </form>
            <form method="POST" id="registration-form" className={`signup ${!isLoginFormVisible ? '' : 'hidden'}`}>
            <div className="field">
                <input type="text" name="name" id="name" value={user.name} onChange={handleInputs} placeholder="Institute Name" required />
              </div>            
              <div className="field">
                <input type="email" name="email" id="email" value={user.email} onChange={handleInputs} placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" name="password" id="password" value={user.password} onChange={handleInputs} placeholder="Password" required />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInputs}
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" name="signup" id="signup" value="SignUp" onClick={PostData} />
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
    {modal && <div className="overlay" onClick={closeModal}></div>}
    </>
  );
};

export default Navbar;
