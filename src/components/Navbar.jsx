import { useState, useEffect, useRef,useContext } from "react";
import React from 'react';
import '../components/stylecss/Login.css';
import '../components/stylecss/Registration.css';
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select';
// import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../App";
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [role1, setRole1] = useState("");
  const RenderLinks = () => {
    console.log("role", role1);
    const tex1 = "District_officer";
    const tex2 = "State_Officer";
    const tex3 = "Institute";
    const tex4 = "";
    if (tex1.length == role1.length) {
      return (
        <>
          <Link to="/search">
            <button className={`mr-${!toggle?10:4}`}>District wise</button>
          </Link>
          <button className={`mr-${!toggle?10:4}`}> About us </button>
          <button className={`mr-${!toggle?10:4}`}> Timeline </button>
          <Link to="/logout">
            <button> Logout </button>
          </Link>
        </>
      );
    } else if (tex2.length == role1.length) {
      // Render different links for other roles or no role
      return (
        <>
          <Link to="/search_so" className={`mr-${!toggle?10:4}`}>
            <button>State Wise</button>
          </Link>
          <button className={`mr-${!toggle?10:4}`}> About us </button>
          <button className={`mr-${!toggle?10:4}`}> Timeline </button>
          <Link to="/logout">
            <button> Logout </button>
          </Link>
        </>
      );
    } else if (tex3.length == role1.length) {
      return (
        <>
          <Link to="/registeredteams">
            <button className={`mr-${!toggle?10:4}`}> Registered Teams </button>
          </Link>
          <button className={`mr-${!toggle?10:4}`}> About us </button>
          <button className={`mr-${!toggle?10:4}`}> Timeline </button>
          <Link to="/logout">
            <button> Logout </button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <button className={`mr-${!toggle?10:4}`}> About us </button>
          <button className={`mr-${!toggle?10:4}`}> Timeline </button>
          <button className={`mr-${!toggle?10:4}`} onClick={handleLoginClick}>
            Login
          </button>
        </>
      );
    }
  };
  const setState = () => {
    const storedRole = localStorage.getItem("myState");
    if (storedRole === null) {
      setRole1("");
    } else {
      const len = storedRole.length;
    if (len == 2) setRole1("");
    else {
      const xin = storedRole.slice(1, len - 1);
      setRole1(xin);
    }
    }
    
  };
  useEffect(() => {
    setState();
    RenderLinks();
  }, [localStorage.getItem("myState")]);
  
const [loading, setLoading] = useState(false);
  
  const invalidRegistration = () => toast.error('Wrong Credentials!',
  {style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
  const RegistrationSuccessful = () => toast.success("Registration succesfful",
  {style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
});
  const wrongCredentials=()=>toast.error("Wrong Credentials", {style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
});
const timedout=()=>toast.error("Connection timedout try again", {style: {
  borderRadius: '10px',
  background: '#333',
  color: '#fff',
},
});
  const loginSuccessfull=()=>toast.success("Login Successfull", {style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
});
  const[user,setUser]=useState({
    name:"",
    email:"",
    password:"",  
    cpassword:""
  
  }); 
  const[loginEmail,setLoginEmail]=useState("");
  const[loginPassword,setLoginPassword]=useState("");
  const[role,setRole]=useState("");
  const[signupRole,setSignupRole]=useState("");
  




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
  const [selectedSchool, setSelectedSchool] = useState(null);

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    return inputValue;
  };

  const handleChange = (selectedOption) => {
    setSelectedSchool(selectedOption);
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
  const PostData = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the fetch request
    const { name, email, password, cpassword} = user;

    try {
      const res = await fetch("/register", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, password, cpassword,role:signupRole
        })
      });

      const data = await res.json();
      console.log(data);

      if (data && data.error) {
         invalidRegistration();
        console.log("invalid registration");
      } else {
        RegistrationSuccessful();
        console.log(data.status);
        setIsLoginFormVisible(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setTimeout(() => {
        setLoading(false); // Set loading back to false after the fetch request is complete
      }, 400);
      // Set loading back to false after the fetch request is complete
    }
  }
  
  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(loginPassword, loginEmail);
  
    try {
      const res = await Promise.race([
        fetch('/api/signin', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
            role: role,
          }),
        }),
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (!resolved) {
              console.log('Request timed out. Please try again.');
              timedout();
              reject(new Error('Request timed out'));
            }
          }, 7000) // Adjust the timeout duration (in milliseconds) as needed
        ),
      ]);
      
      const data = await res.json();
      console.log(data);
  
      if (res.status === 400 || !data) {
        wrongCredentials();
        setLoading(false);
        console.log('Wrong credentials');
      } else {
        loginSuccessfull();
        setLoading(false);
        setModal(false);
        dispatch({ type: "USER", payload: data.message });
      }
    } catch (error) {
      console.error('Error:', error.message);
      setLoading(false);
    } finally {
      resolved = true;
    }
  };
  
  let resolved = false;
  
  
  
  return (

    <>
    <nav className={`w-full flex mt-3 justify-between items-center navbar ${modal ? "blur-background" : ""}`}
    >
      <img src={"/logo.png"} alt="hoobank" className="h-[55px] w-[200px] md:h-[100px] md:w-[360px]" />


      <ul className="list-none sm:flex hidden justify-end items-center flex-1" style={{color:"white"}}>
      <RenderLinks />  
      </ul>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? "/close.svg" : "/menu.svg"}
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
       <RenderLinks/>
          </ul>
        </div>
      </div>
    </nav>
    {modal && (
      <div className="wrapper" style={{color:"white"}}>
          {loading && <LoadingSpinner/>}

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
              <div className="field">
  <select style={{backgroundColor:"black"}} className="name_select" value={role}  onChange={(e)=> setRole(e.target.value)} name="role" id="role" required>
    <option value="">Role</option>
    <option value="Institute">Institute</option>
    <option value="District_Officer">District Officer</option>
    <option value="State_Officer">State Officer</option>
    <option value="Super_Admin">Super-Admin</option>


    </select>
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
  <select style={{backgroundColor:"black"}} className="name_select" value={user.name} onChange={handleInputs} name="name" id="name" required>
    <option value="">Institute Name</option>
    <option value="Sri_Sri_Jagannath_Higher_Secondary_School_Badakera">Sri Sri Jagannath Higher Secondary School, Badakera</option>
    <option value="suraj">suraj</option>
    <option value="purnendu">purnendu</option>
    <option value="suraj sharma">suraj sharma</option>


    
   
  </select>
</div>
<div className="field">
  <select style={{backgroundColor:"black"}} className="name_select" value={signupRole} onChange={(e)=> setSignupRole(e.target.value)} name="signupRole" id="signupRole" required>
    <option value="">Role</option>
    <option value="Institute">Institute</option>
    <option value="District_Officer">District Officer</option>
    <option value="State_Officer">State Officer</option>
    <option value="Super_Admin">Super-Admin</option>
    <option value="Shri Chandrasekhar Higher Secondary School, Bantala">Shri Chandrasekhar Higher Secondary School, Bantala</option>
<option value="Sri Sri Jagannath Higher Secondary School, Badakera">Sri Sri Jagannath Higher Secondary School, Badakera</option>
<option value="Angul Mahila Higher Secondary School, Angul">Angul Mahila Higher Secondary School, Angul</option>
<option value="Evening Higher Secondary School, Angul">Evening Higher Secondary School, Angul</option>
<option value="Government Higher Secondary School, Angul">Government Higher Secondary School, Angul</option>
<option value="Kashi Bishwanath Higher Secondary School, Paikasahi">Kashi Bishwanath Higher Secondary School, Paikasahi</option>
<option value="Satyabadi Meher Higher Secondary School, Madhapur">Satyabadi Meher Higher Secondary School, Madhapur</option>
<option value="Solapada Higher Secondary School, Thakurgarh">Solapada Higher Secondary School, Thakurgarh</option>
<option value="Athamallik Higher Secondary School, Athmallik">Athamallik Higher Secondary School, Athmallik</option>
<option value="Anchalik Higher Secondary School, Talmul">Anchalik Higher Secondary School, Talmul</option>
<option value="Kumanda Jarasingha Anchalik Panchayat Higher Secondary School, Kumanda">Kumanda Jarasingha Anchalik Panchayat Higher Secondary School, Kumanda</option>
<option value="Nalco Nagar Regional Higher Secondary School, Kulad">Nalco Nagar Regional Higher Secondary School, Kulad</option>
<option value="Panchagarh Somanath Singh Jagadev Higher Secondary School, Banarpal">Panchagarh Somanath Singh Jagadev Higher Secondary School, Banarpal</option>
<option value="Bapuji Higher Secondary School, Chhendipada">Bapuji Higher Secondary School, Chhendipada</option>
<option value="Kosala Higher Secondary School, Kosala">Kosala Higher Secondary School, Kosala</option>
<option value="Maharishi Higher Secondary School of Natural Law, Santarabandha">Maharishi Higher Secondary School of Natural Law, Santarabandha</option>
<option value="Patitapaban Higher Secondary School, Jarapada">Patitapaban Higher Secondary School, Jarapada</option>
<option value="Jagamohan Higher Secondary School, Kuluma">Jagamohan Higher Secondary School, Kuluma</option>
<option value="Kaniha Higher Secondary School, Kaniha">Kaniha Higher Secondary School, Kaniha</option>
<option value="Pabitranagar Higher Secondary School, Parbil">Pabitranagar Higher Secondary School, Parbil</option>
<option value="Anchalika Higher Secondary School, Angapada">Anchalika Higher Secondary School, Angapada</option>
<option value="Janata Higher Secondary School, Boinda">Janata Higher Secondary School, Boinda</option>
<option value="Kishore Nagar Higher Secondary School, Kishore Nagar">Kishore Nagar Higher Secondary School, Kishore Nagar</option>
<option value="GURUSULEI GOVT HIGHER SECONDARY SCHOOL, SAHARAGURUJANG">GURUSULEI GOVT HIGHER SECONDARY SCHOOL, SAHARAGURUJANG</option>
<option value="Malyagiri Higher Secondary School, Pallahara">Malyagiri Higher Secondary School, Pallahara</option>
<option value="Utkalmani Gopabandhu Higher Secondary School, Khamar">Utkalmani Gopabandhu Higher Secondary School, Khamar</option>
<option value="Gadtal Regional Higher Secondary School, Gadtal">Gadtal Regional Higher Secondary School, Gadtal</option>
<option value="Hingula Higher Secondary School, Solada">Hingula Higher Secondary School, Solada</option>
<option value="Nilakantheswar Higher Secondary School, South Balanda">Nilakantheswar Higher Secondary School, South Balanda</option>
<option value="Silpanchal Mahila Higher Secondary School, Talcher">Silpanchal Mahila Higher Secondary School, Talcher</option>
<option value="Talcher Higher Secondary School, Talcher">Talcher Higher Secondary School, Talcher</option>
<option value="Bahanaga Higher Secondary School, Bahanaga">Bahanaga Higher Secondary School, Bahanaga</option>
<option value="Belabhumi Higher Secondary School, Avana">Belabhumi Higher Secondary School, Avana</option>
<option value="Bhagaban Chandra Sanskrit Higher Secondary School, Bahanaga">Bhagaban Chandra Sanskrit Higher Secondary School, Bahanaga</option>
<option value="Gopalpur Higher Secondary School, Gopalpur, Balasore">Gopalpur Higher Secondary School, Gopalpur, Balasore</option>
<option value="Khantapara Mahila Higher Secondary School, Khantapara">Khantapara Mahila Higher Secondary School, Khantapara</option>
<option value="Satyanidhi Women's Higher Secondary School, Bishnupur">Satyanidhi Women's Higher Secondary School, Bishnupur</option>
<option value="Balasore Higher Secondary School, Sovarampur">Balasore Higher Secondary School, Sovarampur</option>
<option value="Balasore Mahila Higher Secondary School, Gopalgaon">Balasore Mahila Higher Secondary School, Gopalgaon</option>
<option value="Fakir Mohan Higher Secondary School, Balasore">Fakir Mohan Higher Secondary School, Balasore</option>
<option value="Kuntala Kumari Sabat Women's Higher Secondary School, Balasore">Kuntala Kumari Sabat Women's Higher Secondary School, Balasore</option>
<option value="Balangi Higher Secondary School, Sunahat">Balangi Higher Secondary School, Sunahat</option>
<option value="Dr. Jadunath Higher Secondary School, Rasalpur">Dr. Jadunath Higher Secondary School, Rasalpur</option>
<option value="Golakmani Mahila Higher Secondary School, Uitikiri">Golakmani Mahila Higher Secondary School, Uitikiri</option>
<option value="Nilakantheswar Higher Secondary School, Bangara">Nilakantheswar Higher Secondary School, Bangara</option>
<option value="Nilamani Higher Secondary School, Rupsa">Nilamani Higher Secondary School, Rupsa</option>
<option value="Santilata Higher Secondary School, Uitikiri">Santilata Higher Secondary School, Uitikiri</option>
<option value="Judhisthir Higher Secondary School, Kundali">Judhisthir Higher Secondary School, Kundali</option>
<option value="Krushna Chandra Pipili Higher Secondary School, Jagai">Krushna Chandra Pipili Higher Secondary School, Jagai</option>
<option value="Laxmipriya Mahila Higher Secondary School, Baliapal">Laxmipriya Mahila Higher Secondary School, Baliapal</option>
<option value="Subarna Rekha Higher Secondary School, Baliapal">Subarna Rekha Higher Secondary School, Baliapal</option>
<option value="Chintamani Jena Mahila Higher Secondary School, Chhachina">Chintamani Jena Mahila Higher Secondary School, Chhachina</option>
<option value="Laxminarayan Higher Secondary School, Jamsuli">Laxminarayan Higher Secondary School, Jamsuli</option>
<option value="Nabara Women's Higher Secondary School, Nabara">Nabara Women's Higher Secondary School, Nabara</option>
<option value="RADHA NATH GOVT HIGHER SECONDARY SCHOOL, PAUNSKULI">RADHA NATH GOVT HIGHER SECONDARY SCHOOL, PAUNSKULI</option>
<option value="Sidheswar Higher Secondary School, Amarda Road">Sidheswar Higher Secondary School, Amarda Road</option>
<option value="Anandamayee Women's Higher Secondary School, Dahamunda">Anandamayee Women's Higher Secondary School, Dahamunda</option>
<option value="Baikunthanath Institute of Higher Technical Studies Higher Secondary School, Kachuadi">Baikunthanath Institute of Higher Technical Studies Higher Secondary School, Kachuadi</option>
<option value="Chandaneswar Higher Secondary School, Barbatia">Chandaneswar Higher Secondary School, Barbatia</option>
<option value="Chandaneswar Higher Secondary School, Sahabazpur">Chandaneswar Higher Secondary School, Sahabazpur</option>
<option value="Narendranath Sanskrit Higher Secondary School">Narendranath Sanskrit Higher Secondary School</option>
<option value="Rural Institute of Higher Studies Higher Secondary School, Bhogarai">Rural Institute of Higher Studies Higher Secondary School, Bhogarai</option>
<option value="Surendranath Institute of Higher Technical Studies Higher Secondary School, Kamarda">Surendranath Institute of Higher Technical Studies Higher Secondary School, Kamarda</option>
<option value="Women's Higher Secondary School, Bhogarai">Women's Higher Secondary School, Bhogarai</option>
<option value="Bagiswari Sanskrit Higher Secondary School">Bagiswari Sanskrit Higher Secondary School</option>
<option value="Dinakrushna Higher Secondary School, Jaleswar">Dinakrushna Higher Secondary School, Jaleswar</option>
<option value="Olamara Simanta Higher Secondary School, Olamara">Olamara Simanta Higher Secondary School, Olamara</option>
<option value="Sadhu Charan Higher Secondary School, Raibania">Sadhu Charan Higher Secondary School, Raibania</option>
<option value="Sitala Thakurani Higher Secondary School, Khuluda">Sitala Thakurani Higher Secondary School, Khuluda</option>
<option value="Ustab Charan Gajiani Chandi Higher Secondary School, Bartana">Ustab Charan Gajiani Chandi Higher Secondary School, Bartana</option>
<option value="Jaleswar Womens Higher Secondary School, Jaleswar">Jaleswar Womens Higher Secondary School, Jaleswar</option>
<option value="Sri Jagannath Women's Higher Secondary School, Jaleswar">Sri Jagannath Women's Higher Secondary School, Jaleswar</option>
<option value="Agani Narendra Higher Secondary School, Antara">Agani Narendra Higher Secondary School, Antara</option>
<option value="Dr. Hare Krishna Mahatab Higher Secondary School, Kupari">Dr. Hare Krishna Mahatab Higher Secondary School, Kupari</option>
<option value="Jambeswar Higher Secondary School, Garsang">Jambeswar Higher Secondary School, Garsang</option>
<option value="Kamala Arjuna Higher Secondary School, Gandibed">Kamala Arjuna Higher Secondary School, Gandibed</option>
<option value="Khaira Higher Secondary School, Khaira">Khaira Higher Secondary School, Khaira</option>
<option value="Panchayat Samiti Mahila Higher Secondary School, Nahanga">Panchayat Samiti Mahila Higher Secondary School, Nahanga</option>
<option value="Ajodhya Anchalika Higher Secondary School, Ajodhya">Ajodhya Anchalika Higher Secondary School, Ajodhya</option>
<option value="Berhampur Higher Secondary School, Raj-Berhampur">Berhampur Higher Secondary School, Raj-Berhampur</option>
<option value="Swarnachuda Higher Secondary School, Mitrapur">Swarnachuda Higher Secondary School, Mitrapur</option>
<option value="Nilagiri Higher Secondary School, Nilagiri">Nilagiri Higher Secondary School, Nilagiri</option>
<option value="Nilagiri Women's Higher Secondary School, Nilagiri">Nilagiri Women's Higher Secondary School, Nilagiri</option>
<option value="Baba Panchalingeswar Higher Secondary School, Santaragadia">Baba Panchalingeswar Higher Secondary School, Santaragadia</option>
<option value="Chintamani Sanskrit Higher Secondary School">Chintamani Sanskrit Higher Secondary School</option>
<option value="Laxmikanta Memorial Women's Higher Secondary School, Dakhini-Narasinghpur">Laxmikanta Memorial Women's Higher Secondary School, Dakhini-Narasinghpur</option>
<option value="Oupada Higher Secondary School, Oupada">Oupada Higher Secondary School, Oupada</option>
<option value="Pancha Lingeswar Higher Secondary School, Iswarpur">Pancha Lingeswar Higher Secondary School, Iswarpur</option>
<option value="Bhimeswar Higher Secondary School, Bhimeswar">Bhimeswar Higher Secondary School, Bhimeswar</option>
<option value="Remuna Higher Secondary School, Remuna">Remuna Higher Secondary School, Remuna</option>
<option value="Shri Jagannath Educational Foundation Higher Secondary School, Barunsingh">Shri Jagannath Educational Foundation Higher Secondary School, Barunsingh</option>
<option value="Balikhanda Higher Secondary School, Balikhanda">Balikhanda Higher Secondary School, Balikhanda</option>
<option value="Gopaprana Higher Secondary School, Khirakona">Gopaprana Higher Secondary School, Khirakona</option>
<option value="Kuntala Kumari Mahila Higher Secondary School, Bari">Kuntala Kumari Mahila Higher Secondary School, Bari</option>
<option value="Simulia Higher Secondary School, Markona">Simulia Higher Secondary School, Markona</option>
<option value="Kudei Women's Higher Secondary School, Kudei">Kudei Women's Higher Secondary School, Kudei</option>
<option value="Saraswata Higher Secondary School, Anantapur">Saraswata Higher Secondary School, Anantapur</option>
<option value="Srinibas Higher Secondary School, Mangalpur">Srinibas Higher Secondary School, Mangalpur</option>
<option value="Talanagar Higher Secondary School, Talanagar">Talanagar Higher Secondary School, Talanagar</option>
<option value="Soro Women's Higher Secondary School, Soro">Soro Women's Higher Secondary School, Soro</option>
<option value="Upendra Nath Higher Secondary School, Soro">Upendra Nath Higher Secondary School, Soro</option>
<option value="Mahatma Gandhi Higher Secondary School, Bhukta">Mahatma Gandhi Higher Secondary School, Bhukta</option>
<option value="Swami Vivekananda Higher Secondary School, Dungri">Swami Vivekananda Higher Secondary School, Dungri</option>
<option value="Anchalika Higher Secondary School, Paharsrigida">Anchalika Higher Secondary School, Paharsrigida</option>
<option value="Attabira Higher Secondary School, Attabira">Attabira Higher Secondary School, Attabira</option>
<option value="Kadobahal Higher Secondary School, Kadobahal">Kadobahal Higher Secondary School, Kadobahal</option>
<option value="Larambha Higher Secondary School, Larambha">Larambha Higher Secondary School, Larambha</option>
<option value="Baba Balunkeswar Higher Secondary School, Khuntapali">Baba Balunkeswar Higher Secondary School, Khuntapali</option>
<option value="Gandhi Memorial Higher Secondary School, Kalapani">Gandhi Memorial Higher Secondary School, Kalapani</option>
<option value="Katapali Higher Secondary School, Katapali">Katapali Higher Secondary School, Katapali</option>
<option value="Milita Gram Panchayat Higher Secondary School, Sarsara">Milita Gram Panchayat Higher Secondary School, Sarsara</option>
<option value="Nabajoyti Higher Secondary School, Chakarkend">Nabajoyti Higher Secondary School, Chakarkend</option>
<option value="Tora Higher Secondary School, Tora">Tora Higher Secondary School, Tora</option>
<option value="Bargarh Women's Higher Secondary School, Bargarh">Bargarh Women's Higher Secondary School, Bargarh</option>
<option value="Panchayat Higher Secondary School, Bargarh">Panchayat Higher Secondary School, Bargarh</option>
<option value="Trust Fund Higher Secondary School, Bargarh">Trust Fund Higher Secondary School, Bargarh</option>
<option value="Jagabandhu Das Women's Higher Secondary School, Kadalipali">Jagabandhu Das Women's Higher Secondary School, Kadalipali</option>
<option value="Prof. Ghanshyam Das Gramanchal Higher Secondary School, Katapali">Prof. Ghanshyam Das Gramanchal Higher Secondary School, Katapali</option>
<option value="Satalma Higher Secondary School, Satalma">Satalma Higher Secondary School, Satalma</option>
<option value="Barpali Higher Secondary School, Barpali">Barpali Higher Secondary School, Barpali</option>
<option value="Dadhi Baman Higher Secondary School, Bhatli">Dadhi Baman Higher Secondary School, Bhatli</option>
<option value="Kamgaon Higher Secondary School, Kamgaon">Kamgaon Higher Secondary School, Kamgaon</option>
<option value="Panchayat Higher Secondary School, Goudgaon">Panchayat Higher Secondary School, Goudgaon</option>
<option value="Bheden Anchalika Kisan Higher Secondary School, Bheden">Bheden Anchalika Kisan Higher Secondary School, Bheden</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, RUSUDA">GOVT HIGHER SECONDARY SCHOOL, RUSUDA</option>
<option value="Pallishree Higher Secondary School, Chichinda">Pallishree Higher Secondary School, Chichinda</option>
<option value="Remunda Higher Secondary School, Remunda">Remunda Higher Secondary School, Remunda</option>
<option value="Resham Anchalika Higher Secondary School, Resham">Resham Anchalika Higher Secondary School, Resham</option>
<option value="Bijepur Higher Secondary School, Bijepur">Bijepur Higher Secondary School, Bijepur</option>
<option value="Dora Higher Secondary School, Putukigrinjel">Dora Higher Secondary School, Putukigrinjel</option>
<option value="Panchayat Higher Secondary School, Talpadar">Panchayat Higher Secondary School, Talpadar</option>
<option value="Giridhari Higher Secondary School, Saradhapali">Giridhari Higher Secondary School, Saradhapali</option>
<option value="Goutam Buddha Higher Secondary School, Ganiapali">Goutam Buddha Higher Secondary School, Ganiapali</option>
<option value="Panchayat Samiti Higher Secondary School, Gaisilat">Panchayat Samiti Higher Secondary School, Gaisilat</option>
<option value="Talpali Higher Secondary School, Talpali">Talpali Higher Secondary School, Talpali</option>
<option value="CHANDRA SEKHAR GOVT HIGHER SECONDARY SCHOOL, JAGDALPUR">CHANDRA SEKHAR GOVT HIGHER SECONDARY SCHOOL, JAGDALPUR</option>
<option value="Dava Higher Secondary School, Dava">Dava Higher Secondary School, Dava</option>
<option value="Panchayat Samiti Higher Secondary School, Jharbandh">Panchayat Samiti Higher Secondary School, Jharbandh</option>
<option value="Padampur Women's Higher Secondary School, Padampur">Padampur Women's Higher Secondary School, Padampur</option>
<option value="Lakhmara Higher Secondary School, Lakhmara">Lakhmara Higher Secondary School, Lakhmara</option>
<option value="Mandosil Higher Secondary School, Mandosil">Mandosil Higher Secondary School, Mandosil</option>
<option value="Vindhya Vasini Higher Secondary School, Paikmal">Vindhya Vasini Higher Secondary School, Paikmal</option>
<option value="Anchal Higher Secondary School, Padampur">Anchal Higher Secondary School, Padampur</option>
<option value="Buddhadev Meher Higher Secondary School, Dahita">Buddhadev Meher Higher Secondary School, Dahita</option>
<option value="Jamla Higher Secondary School, Jamla">Jamla Higher Secondary School, Jamla</option>
<option value="Melchhamunda Higher Secondary School, Melchhamunda">Melchhamunda Higher Secondary School, Melchhamunda</option>
<option value="Ghess Higher Secondary School, Ghess">Ghess Higher Secondary School, Ghess</option>
<option value="Sohela Higher Secondary School, Sohela">Sohela Higher Secondary School, Sohela</option>
<option value="Kartik Malati Mahila Higher Secondary School, Jagannathpur">Kartik Malati Mahila Higher Secondary School, Jagannathpur</option>
<option value="Mandari Higher Secondary School, Mandari">Mandari Higher Secondary School, Mandari</option>
<option value="Nabaghana Higher Secondary School , Karanjadia">Nabaghana Higher Secondary School , Karanjadia</option>
<option value="Sahed Memorial Higher Secondary School, Eram">Sahed Memorial Higher Secondary School, Eram</option>
<option value="Saheed Higher Secondary School, Barapur">Saheed Higher Secondary School, Barapur</option>
<option value="Atal Bihari Higher Secondary School, Basudevpur">Atal Bihari Higher Secondary School, Basudevpur</option>
<option value="Trupti Women's Higher Secondary School, Basudevpur">Trupti Women's Higher Secondary School, Basudevpur</option>
<option value="Charampa Higher Secondary School, Charampa">Charampa Higher Secondary School, Charampa</option>
<option value="Damodar Sanskrit Higher Secondary School">Damodar Sanskrit Higher Secondary School</option>
<option value="Kamala Kishori Rout Mahila Higher Secondary School, Kusannagar">Kamala Kishori Rout Mahila Higher Secondary School, Kusannagar</option>
<option value="Radhakanta Behera Higher Secondary School, Arnapala">Radhakanta Behera Higher Secondary School, Arnapala</option>
<option value="Rameswar Higher Secondary School, Randia">Rameswar Higher Secondary School, Randia</option>
<option value="Salandi Higher Secondary School, Uttarbahini">Salandi Higher Secondary School, Uttarbahini</option>
<option value="Bhadrak Higher Secondary School, Bhadrak">Bhadrak Higher Secondary School, Bhadrak</option>
<option value="Bhadrak Women's Higher Secondary School, Bhadrak">Bhadrak Women's Higher Secondary School, Bhadrak</option>
<option value="Bhandaripokhari Higher Secondary School, Bhandaripokhari">Bhandaripokhari Higher Secondary School, Bhandaripokhari</option>
<option value="Naami Higher Secondary School, Naami">Naami Higher Secondary School, Naami</option>
<option value="Nayanmani Women's Higher Secondary School, Saradapur">Nayanmani Women's Higher Secondary School, Saradapur</option>
<option value="NKP GOVT HIGHER SECONDARY SCHOOL, MANINATHPUR">NKP GOVT HIGHER SECONDARY SCHOOL, MANINATHPUR</option>
<option value="Panchayat Higher Secondary School, Barikipur">Panchayat Higher Secondary School, Barikipur</option>
<option value="Agarpara Higher Secondary School, Agarpara">Agarpara Higher Secondary School, Agarpara</option>
<option value="Agarpara Women's Higher Secondary School, Agarpara">Agarpara Women's Higher Secondary School, Agarpara</option>
<option value="Bant Anchalika Higher Secondary School, Bant">Bant Anchalika Higher Secondary School, Bant</option>
<option value="Utkal Keshari Dr. Hare Krushna Mahatab Higher Secondary School, Kenduapara">Utkal Keshari Dr. Hare Krushna Mahatab Higher Secondary School, Kenduapara</option>
<option value="Chandbali Higher Secondary School, Chandbali">Chandbali Higher Secondary School, Chandbali</option>
<option value="Dhamrai Higher Secondary School, Narsinghpur">Dhamrai Higher Secondary School, Narsinghpur</option>
<option value="Ghanteswar Higher Secondary School, Ghanteswar">Ghanteswar Higher Secondary School, Ghanteswar</option>
<option value="Lalit Siba Sankar Higher Secondary School, Motto">Lalit Siba Sankar Higher Secondary School, Motto</option>
<option value="Akhandalamani Higher Secondary School, Pallasahi">Akhandalamani Higher Secondary School, Pallasahi</option>
<option value="Asurali Anchalika Mahila Higher Secondary School, Asurali">Asurali Anchalika Mahila Higher Secondary School, Asurali</option>
<option value="Dhamnagar Higher Secondary School, Dhamnagar">Dhamnagar Higher Secondary School, Dhamnagar</option>
<option value="Indira Gandhi Memorial Higher Secondary School of Science & Technology, Dhusuri">Indira Gandhi Memorial Higher Secondary School of Science & Technology, Dhusuri</option>
<option value="Maa Sarada Devi Higher Secondary School, Kothar">Maa Sarada Devi Higher Secondary School, Kothar</option>
<option value="Saheed Smruti Higher Secondary School, Saheednagar">Saheed Smruti Higher Secondary School, Saheednagar</option>
<option value="Biranchi Narayan Madhab Arjun Higher Secondary School, Paliabindha">Biranchi Narayan Madhab Arjun Higher Secondary School, Paliabindha</option>
<option value="Maniklal Women's Higher Secondary School, Talapada">Maniklal Women's Higher Secondary School, Talapada</option>
<option value="Tihidi Higher Secondary School, Tihidi">Tihidi Higher Secondary School, Tihidi</option>
<option value="Agalapur Panchayat Samiti Higher Secondary School, Roth">Agalapur Panchayat Samiti Higher Secondary School, Roth</option>
<option value="Agalpur Science Higher Secondary School, Agalpur">Agalpur Science Higher Secondary School, Agalpur</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KUTASINGHA">GOVT HIGHER SECONDARY SCHOOL, KUTASINGHA</option>
<option value="Jalandhar Higher Secondary School, Bharsuja">Jalandhar Higher Secondary School, Bharsuja</option>
<option value="Nagaon Higher Secondary School, Nagaon">Nagaon Higher Secondary School, Nagaon</option>
<option value="Amar Jyoti Higher Secondary School, Kutumdola">Amar Jyoti Higher Secondary School, Kutumdola</option>
<option value="Budhadangar Higher Secondary School, Kudasingha">Budhadangar Higher Secondary School, Kudasingha</option>
<option value="Gopinath Higher Secondary School, Sahajbahal">Gopinath Higher Secondary School, Sahajbahal</option>
<option value="Panchayat Higher Secondary School, Shibatala">Panchayat Higher Secondary School, Shibatala</option>
<option value="Sudam Charan Higher Secondary School, Chandanbhati">Sudam Charan Higher Secondary School, Chandanbhati</option>
<option value="Government Higher Secondary School, Bolangir">Government Higher Secondary School, Bolangir</option>
<option value="Government Women's Higher Secondary School, Bolangir">Government Women's Higher Secondary School, Bolangir</option>
<option value="Rajendra Higher Secondary School, Bolangir">Rajendra Higher Secondary School, Bolangir</option>
<option value="Pallishree Higher Secondary School, Sindhekela">Pallishree Higher Secondary School, Sindhekela</option>
<option value="Panchayat Samiti Higher Secondary School, Bangomunda">Panchayat Samiti Higher Secondary School, Bangomunda</option>
<option value="Prasanna Pal Higher Secondary School, Bhalumunda">Prasanna Pal Higher Secondary School, Bhalumunda</option>
<option value="Binapani Higher Secondary School, Dhumabhata">Binapani Higher Secondary School, Dhumabhata</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, PARLIMAL">GOVT HIGHER SECONDARY SCHOOL, PARLIMAL</option>
<option value="Panchayat Higher Secondary School, Sulekela">Panchayat Higher Secondary School, Sulekela</option>
<option value="Panchayat Samiti Higher Secondary School, Belpara">Panchayat Samiti Higher Secondary School, Belpara</option>
<option value="Shree Jagannath Dev Higher Secondary School, Mandal">Shree Jagannath Dev Higher Secondary School, Mandal</option>
<option value="Dhruba Ananda Higher Secondary School, Kuturla">Dhruba Ananda Higher Secondary School, Kuturla</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BANDHAPARA">GOVT HIGHER SECONDARY SCHOOL, BANDHAPARA</option>
<option value="Jarasingha Higher Secondary School, Jarasingha">Jarasingha Higher Secondary School, Jarasingha</option>
<option value="Panchayat Samiti Higher Secondary School, Deogaon">Panchayat Samiti Higher Secondary School, Deogaon</option>
<option value="Anchalik Higher Secondary School, Rusuda">Anchalik Higher Secondary School, Rusuda</option>
<option value="Gram Panchayat Higher Secondary School, Tentulikhunti">Gram Panchayat Higher Secondary School, Tentulikhunti</option>
<option value="Tusra Higher Secondary School, Tusra">Tusra Higher Secondary School, Tusra</option>
<option value="MLA Womens' Higher Secondary School, Kantabanji">MLA Womens' Higher Secondary School, Kantabanji</option>
<option value="HARISHANKAR GOVT HIGHER SECONDARY SCHOOL, RENGALI">HARISHANKAR GOVT HIGHER SECONDARY SCHOOL, RENGALI</option>
<option value="Harishankar Higher Secondary School, Khaprakhol">Harishankar Higher Secondary School, Khaprakhol</option>
<option value="Jawaharlal Nehru Higher Secondary School, Dhandamunda">Jawaharlal Nehru Higher Secondary School, Dhandamunda</option>
<option value="Panchayat Higher Secondary School, Lathor">Panchayat Higher Secondary School, Lathor</option>
<option value="SARVODAYA GOVT HIGHER SECONDARY SCHOOL, LUHASINGHA">SARVODAYA GOVT HIGHER SECONDARY SCHOOL, LUHASINGHA</option>
<option value="Harihar Higher Secondary School, Jogisarda">Harihar Higher Secondary School, Jogisarda</option>
<option value="Kushang Anchalika Higher Secondary School, Kushang">Kushang Anchalika Higher Secondary School, Kushang</option>
<option value="Loisingha Higher Secondary School, Loisingha">Loisingha Higher Secondary School, Loisingha</option>
<option value="Panchayat Samiti Higher Secondary School, Muribahal">Panchayat Samiti Higher Secondary School, Muribahal</option>
<option value="PATANESWARI GOVT HIGHER SECONDARY SCHOOL, LEBEDA">PATANESWARI GOVT HIGHER SECONDARY SCHOOL, LEBEDA</option>
<option value="Jyoti Vikash Higher Secondary School, Bhainsa">Jyoti Vikash Higher Secondary School, Bhainsa</option>
<option value="Panchayat Samiti Higher Secondary School, Ghasian">Panchayat Samiti Higher Secondary School, Ghasian</option>
<option value="Rajendra Meher Higher Secondary School, Jogimunda">Rajendra Meher Higher Secondary School, Jogimunda</option>
<option value="Jawaharlal Higher Secondary School, Patnagarh">Jawaharlal Higher Secondary School, Patnagarh</option>
<option value="Patneswari Women's Higher Secondary School, Patnagarh">Patneswari Women's Higher Secondary School, Patnagarh</option>
<option value="Jamgaon Anchalika Higher Secondary School, Jamgaon">Jamgaon Anchalika Higher Secondary School, Jamgaon</option>
<option value="Judhisthir Higher Secondary School, Chhatamakhana">Judhisthir Higher Secondary School, Chhatamakhana</option>
<option value="Mahimunda Higher Secondary School, Mahimunda">Mahimunda Higher Secondary School, Mahimunda</option>
<option value="Radheshyam Anchalik Higher Secondary School, Bilaisarda">Radheshyam Anchalik Higher Secondary School, Bilaisarda</option>
<option value="Padmalochan Higher Secondary School, Tikrapara">Padmalochan Higher Secondary School, Tikrapara</option>
<option value="Panchayat Higher Secondary School, Ghunsar">Panchayat Higher Secondary School, Ghunsar</option>
<option value="Panchayat Samiti Higher Secondary School, Saintala">Panchayat Samiti Higher Secondary School, Saintala</option>
<option value="Utkalmani Gopabandhu Dash Higher Secondary School, Belgaon">Utkalmani Gopabandhu Dash Higher Secondary School, Belgaon</option>
<option value="DAV Higher Secondary School, Titilagarh">DAV Higher Secondary School, Titilagarh</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BINEKELA">GOVT HIGHER SECONDARY SCHOOL, BINEKELA</option>
<option value="PANCHAYAT GOVT HIGHER SECONDARY SCHOOL ,KHOLAN">PANCHAYAT GOVT HIGHER SECONDARY SCHOOL ,KHOLAN</option>
<option value="Government Women's Higher Secondary School, Titilagarh">Government Women's Higher Secondary School, Titilagarh</option>
<option value="Kantabanji Vocational Higher Secondary School, Kantabanji">Kantabanji Vocational Higher Secondary School, Kantabanji</option>
<option value="Rajiv Gandhi Panchayat Samiti Higher Secondary School, Turekela">Rajiv Gandhi Panchayat Samiti Higher Secondary School, Turekela</option>
<option value="Gandhardi Higher Secondary School, Janhapank">Gandhardi Higher Secondary School, Janhapank</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BRAHMANIPALI">GOVT HIGHER SECONDARY SCHOOL, BRAHMANIPALI</option>
<option value="Maa Maheswari Higher Secondary School, Bausuni">Maa Maheswari Higher Secondary School, Bausuni</option>
<option value="Boudh Panchayat Higher Secondary School, Boudh">Boudh Panchayat Higher Secondary School, Boudh</option>
<option value="Boudh Women's Higher Secondary School, Boudh">Boudh Women's Higher Secondary School, Boudh</option>
<option value="Bhairabi Higher Secondary School, Purunakatak">Bhairabi Higher Secondary School, Purunakatak</option>
<option value="Harbhanga Anchalika Panchayat Higher Secondary School, Harbhanga">Harbhanga Anchalika Panchayat Higher Secondary School, Harbhanga</option>
<option value="SADHU CHARAN GOVT HIGHER SECONDARY SCHOOL, BIRANARASINGHPUR">SADHU CHARAN GOVT HIGHER SECONDARY SCHOOL, BIRANARASINGHPUR</option>
<option value="Panchayat Higher Secondary School, Kantamal">Panchayat Higher Secondary School, Kantamal</option>
<option value="Panchayat Samiti Higher Secondary School, Palasagora">Panchayat Samiti Higher Secondary School, Palasagora</option>
<option value="T.K.S.M.R.G. Higher Secondary School, Ghantapada">T.K.S.M.R.G. Higher Secondary School, Ghantapada</option>
<option value="Choudwar Higher Secondary School, Choudwar">Choudwar Higher Secondary School, Choudwar</option>
<option value="Choudwar Women's Higher Secondary School, Choudwar">Choudwar Women's Higher Secondary School, Choudwar</option>
<option value="Gopabandhu Science Higher Secondary School, Athagarh">Gopabandhu Science Higher Secondary School, Athagarh</option>
<option value="Gopabandhu Women's Higher Secondary School, Athagarh">Gopabandhu Women's Higher Secondary School, Athagarh</option>
<option value="Radhanath Rath Vigyan Higher Secondary School, Khuntuni">Radhanath Rath Vigyan Higher Secondary School, Khuntuni</option>
<option value="Sri Sri Dhabaleswar Higher Secondary School of Science & Technology, Bali">Sri Sri Dhabaleswar Higher Secondary School of Science & Technology, Bali</option>
<option value="Sri Sri Dhabaleswar Higher Secondary School, Gurudijhatia">Sri Sri Dhabaleswar Higher Secondary School, Gurudijhatia</option>
<option value="Ansupa Higher Secondary School of Education & Technology, Saranda">Ansupa Higher Secondary School of Education & Technology, Saranda</option>
<option value="Baideswar Higher Secondary School, Baideswar">Baideswar Higher Secondary School, Baideswar</option>
<option value="Kalapathar Dhalapathar Anchalika Higher Secondary School, Kalapathar">Kalapathar Dhalapathar Anchalika Higher Secondary School, Kalapathar</option>
<option value="Banki Higher Secondary School, Banki">Banki Higher Secondary School, Banki</option>
<option value="Maniabandha Higher Secondary School, Maniabandha">Maniabandha Higher Secondary School, Maniabandha</option>
<option value="Mohan Subudhi Higher Secondary School, Baramba">Mohan Subudhi Higher Secondary School, Baramba</option>
<option value="Sri Sri Swapneswar Deba Anchalika Higher Secondary School of Arts & Technology, Sankhamari">Sri Sri Swapneswar Deba Anchalika Higher Secondary School of Arts & Technology, Sankhamari</option>
<option value="Brahmanajharilo Higher Secondary School, Brahmanajharilo">Brahmanajharilo Higher Secondary School, Brahmanajharilo</option>
<option value="Prabha Routray Higher Secondary School, Godisahi">Prabha Routray Higher Secondary School, Godisahi</option>
<option value="Biren Mitra Memorial Women's Higher Secondary School, Cuttack">Biren Mitra Memorial Women's Higher Secondary School, Cuttack</option>
<option value="Christ Higher Secondary School, Cuttack">Christ Higher Secondary School, Cuttack</option>
<option value="Dr. Keshaba Chandra Sahu Women's Higher Secondary School, Cuttack">Dr. Keshaba Chandra Sahu Women's Higher Secondary School, Cuttack</option>
<option value="Emarti Devi Womens Higher Secondary School, Nayasarak">Emarti Devi Womens Higher Secondary School, Nayasarak</option>
<option value="Indira Gandhi Womens Higher Secondary School, Cuttack">Indira Gandhi Womens Higher Secondary School, Cuttack</option>
<option value="Mahanadi Vihar Women's Higher Secondary School, Cuttack">Mahanadi Vihar Women's Higher Secondary School, Cuttack</option>
<option value="Maulan Abdul Kalam Azad Multipurpose Higher Secondary School, Cuttack">Maulan Abdul Kalam Azad Multipurpose Higher Secondary School, Cuttack</option>
<option value="Netaji Subash Memorial City Higher Secondary School, Cuttack">Netaji Subash Memorial City Higher Secondary School, Cuttack</option>
<option value="Raghunath Jew Higher Secondary School, Deulasahi">Raghunath Jew Higher Secondary School, Deulasahi</option>
<option value="Ravenshaw Higher Secondary School, Cuttack">Ravenshaw Higher Secondary School, Cuttack</option>
<option value="Shailabala Women's Higher Secondary School, Cuttack">Shailabala Women's Higher Secondary School, Cuttack</option>
<option value="Stewart Science Higher Secondary School, Cuttack">Stewart Science Higher Secondary School, Cuttack</option>
<option value="Ananta Balia Higher Secondary School, Nuagarh">Ananta Balia Higher Secondary School, Nuagarh</option>
<option value="Cuttack Higher Secondary School, Nayabazar">Cuttack Higher Secondary School, Nayabazar</option>
<option value="Jatiya Kabi Bira Kishore Government Higher Secondary School, Cuttack">Jatiya Kabi Bira Kishore Government Higher Secondary School, Cuttack</option>
<option value="Kandarpur Higher Secondary School, Kandarpur">Kandarpur Higher Secondary School, Kandarpur</option>
<option value="Kishore Nagar Higher Secondary School, Kishore Nagar">Kishore Nagar Higher Secondary School, Kishore Nagar</option>
<option value="Kusum Devi Satsang Women's Higher Secondary School, Cuttack">Kusum Devi Satsang Women's Higher Secondary School, Cuttack</option>
<option value="Laksheswar Women's Higher Secondary School, Phulnakhara">Laksheswar Women's Higher Secondary School, Phulnakhara</option>
<option value="Sudarsan Higher Secondary School, 42 Mouza">Sudarsan Higher Secondary School, 42 Mouza</option>
<option value="Domapara Anchalika Higher Secondary School, Dampara">Domapara Anchalika Higher Secondary School, Dampara</option>
<option value="Rani Suka Dei Mahila Higher Secondary School, Banki">Rani Suka Dei Mahila Higher Secondary School, Banki</option>
<option value="Govindpur Higher Secondary School, Govindpur">Govindpur Higher Secondary School, Govindpur</option>
<option value="Govindpur Women's Higher Secondary School, Govindpur">Govindpur Women's Higher Secondary School, Govindpur</option>
<option value="Udayanath Higher Secondary School of Science & Technology, Adaspur">Udayanath Higher Secondary School of Science & Technology, Adaspur</option>
<option value="Durga Charan Nayak Memorial Higher Secondary School, Haladia">Durga Charan Nayak Memorial Higher Secondary School, Haladia</option>
<option value="Jawaharlal Nehru Higher Secondary School, Kuanpal">Jawaharlal Nehru Higher Secondary School, Kuanpal</option>
<option value="Jhadeswarpur Higher Secondary School, Jhadeswarpur">Jhadeswarpur Higher Secondary School, Jhadeswarpur</option>
<option value="Mahanga Puspagiri Higher Secondary School, Erkana">Mahanga Puspagiri Higher Secondary School, Erkana</option>
<option value="Mahanga Womens Higher Secondary School, Pallisahi">Mahanga Womens Higher Secondary School, Pallisahi</option>
<option value="Champanatha Dev Higher Secondary School, Champeswar">Champanatha Dev Higher Secondary School, Champeswar</option>
<option value="Kanpur Anchalika Higher Secondary School, Kanpur">Kanpur Anchalika Higher Secondary School, Kanpur</option>
<option value="Narasinghpur Higher Secondary School, Narasinghpur">Narasinghpur Higher Secondary School, Narasinghpur</option>
<option value="ZORUM GOVT HIGHER SECONDARY SCHOOL, ZILLINDA">ZORUM GOVT HIGHER SECONDARY SCHOOL, ZILLINDA</option>
<option value="Devi Kandal Nityananda Higher Secondary School, Eranch">Devi Kandal Nityananda Higher Secondary School, Eranch</option>
<option value="Dola Govinda Braja Kishore Higher Secondary School, Kasarda">Dola Govinda Braja Kishore Higher Secondary School, Kasarda</option>
<option value="MADHABANANDAJEW GOVT HIGHER SECONDARY SCHOOL, MADHAB">MADHABANANDAJEW GOVT HIGHER SECONDARY SCHOOL, MADHAB</option>
<option value="Niali Higher Secondary School, Niali">Niali Higher Secondary School, Niali</option>
<option value="Prachi Women's Higher Secondary School, Niali">Prachi Women's Higher Secondary School, Niali</option>
<option value="Ballavi Devi Mahila Higher Secondary School, Natakai">Ballavi Devi Mahila Higher Secondary School, Natakai</option>
<option value="Mahapurusa Achyutananda Higher Secondary School, Nemala">Mahapurusa Achyutananda Higher Secondary School, Nemala</option>
<option value="Panchayat Prahalad Higher Secondary School, Nischintakoili">Panchayat Prahalad Higher Secondary School, Nischintakoili</option>
<option value="Subhadra Mahatab Higher Secondary School, Asureswar">Subhadra Mahatab Higher Secondary School, Asureswar</option>
<option value="Bahugram Higher Secondary School, Bahugram">Bahugram Higher Secondary School, Bahugram</option>
<option value="Mahanadi Higher Secondary School, Ratilo">Mahanadi Higher Secondary School, Ratilo</option>
<option value="Reba Anchalika Higher Secondary School, Reba">Reba Anchalika Higher Secondary School, Reba</option>
<option value="Salepur Higher Secondary School, Salepur">Salepur Higher Secondary School, Salepur</option>
<option value="Women's Higher Secondary School, Japakuda">Women's Higher Secondary School, Japakuda</option>
<option value="Biswa Nahakani Higher Secondary School, Biswanahakani">Biswa Nahakani Higher Secondary School, Biswanahakani</option>
<option value="Gokhel Ideal Higher Secondary School, Sankarpur">Gokhel Ideal Higher Secondary School, Sankarpur</option>
<option value="Kakhadi Higher Secondary School, Kakhadi">Kakhadi Higher Secondary School, Kakhadi</option>
<option value="Lakshmi Narayan Sahu Higher Secondary School, Jagatpur">Lakshmi Narayan Sahu Higher Secondary School, Jagatpur</option>
<option value="Tangi Higher Secondary School, Tangi">Tangi Higher Secondary School, Tangi</option>
<option value="Chaitanya Sahu Higher Secondary School of Science & Arts, Nuapatna">Chaitanya Sahu Higher Secondary School of Science & Arts, Nuapatna</option>
<option value="Kalinga Women's Higher Secondary School, Tigiria">Kalinga Women's Higher Secondary School, Tigiria</option>
<option value="Prasana Purusotam Dev Higher Secondary School, Tigiria">Prasana Purusotam Dev Higher Secondary School, Tigiria</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, DANTARIBAHAL">GOVT HIGHER SECONDARY SCHOOL, DANTARIBAHAL</option>
<option value="Kandhal Higher Secondary School, Kandhal">Kandhal Higher Secondary School, Kandhal</option>
<option value="PANCHAYAT GOVT HIGHER SECONDARY SCHOOL, KADOPADA , BARKOTE">PANCHAYAT GOVT HIGHER SECONDARY SCHOOL, KADOPADA , BARKOTE</option>
<option value="Panchayat Higher Secondary School, Kalla">Panchayat Higher Secondary School, Kalla</option>
<option value="Panchayat Samiti Higher Secondary School, Danra">Panchayat Samiti Higher Secondary School, Danra</option>
<option value="Deogarh Higher Secondary School, Deogarh">Deogarh Higher Secondary School, Deogarh</option>
<option value="Deogarh Women's Higher Secondary School, Deogarh">Deogarh Women's Higher Secondary School, Deogarh</option>
<option value="Budhapal Anchalika Higher Secondary School, Budhapal">Budhapal Anchalika Higher Secondary School, Budhapal</option>
<option value="Palsama Higher Secondary School, Palsama">Palsama Higher Secondary School, Palsama</option>
<option value="PANCHAPALI GOVT HIGHER SECONDARY SCHOOL,NUADIHI ,REAMAL">PANCHAPALI GOVT HIGHER SECONDARY SCHOOL,NUADIHI ,REAMAL</option>
<option value="Reamal Higher Secondary School, Reamal">Reamal Higher Secondary School, Reamal</option>
<option value="Ekalabya Panchayat Samiti Higher Secondary School, Kansar">Ekalabya Panchayat Samiti Higher Secondary School, Kansar</option>
<option value="JANATA GOVT HIGHER SECONDARY SCHOOL,LAIMURA">JANATA GOVT HIGHER SECONDARY SCHOOL,LAIMURA</option>
<option value="Panchayat Samiti Higher Secondary School, Suguda">Panchayat Samiti Higher Secondary School, Suguda</option>
<option value="Subash Naik Higher Secondary School, Ludhar">Subash Naik Higher Secondary School, Ludhar</option>
<option value="Jiral Higher Secondary School, Jiral">Jiral Higher Secondary School, Jiral</option>
<option value="Mathkargola Higher Secondary School, Mathkorgola">Mathkargola Higher Secondary School, Mathkorgola</option>
<option value="Nuahat Anchalika Panchayat Higher Secondary School, Nuahat">Nuahat Anchalika Panchayat Higher Secondary School, Nuahat</option>
<option value="Sri Sri Balunkeswar Higher Secondary School, Baruan">Sri Sri Balunkeswar Higher Secondary School, Baruan</option>
<option value="Tapoban Higher Secondary School, Kunida">Tapoban Higher Secondary School, Kunida</option>
<option value="Baji Rout Memorial Higher Secondary School, Bhuban">Baji Rout Memorial Higher Secondary School, Bhuban</option>
<option value="Bhuban Women's Higher Secondary School, Bhuban">Bhuban Women's Higher Secondary School, Bhuban</option>
<option value="Dhenkanal Evening Higher Secondary School, Dhenkanal">Dhenkanal Evening Higher Secondary School, Dhenkanal</option>
<option value="Dhenkanal Higher Secondary School, Dhenkanal">Dhenkanal Higher Secondary School, Dhenkanal</option>
<option value="Government Women's Higher Secondary School, Dhenkanal">Government Women's Higher Secondary School, Dhenkanal</option>
<option value="Beltikiri Anchalika Higher Secondary School, Beltikiri">Beltikiri Anchalika Higher Secondary School, Beltikiri</option>
<option value="Debendra Satapathy Memorial Higher Secondary School, Bhapur">Debendra Satapathy Memorial Higher Secondary School, Bhapur</option>
<option value="Panchayat Higher Secondary School of Science & Technology, Gengutia">Panchayat Higher Secondary School of Science & Technology, Gengutia</option>
<option value="Utkalmani Gopabandhu Higher Secondary School, Gobindapur">Utkalmani Gopabandhu Higher Secondary School, Gobindapur</option>
<option value="Kapilash Higher Secondary School, Gondia">Kapilash Higher Secondary School, Gondia</option>
<option value="Mahima Higher Secondary School, Joranda">Mahima Higher Secondary School, Joranda</option>
<option value="Shree Jagannath Higher Secondary School, Pingua">Shree Jagannath Higher Secondary School, Pingua</option>
<option value="SRI SRI CHANDRASEKHAR JEW GOVT HIGHER SECONDARY SCHOOL, DEOGAON">SRI SRI CHANDRASEKHAR JEW GOVT HIGHER SECONDARY SCHOOL, DEOGAON</option>
<option value="Sridhar Swami Higher Secondary School of Education & Technology, Sadangi">Sridhar Swami Higher Secondary School of Education & Technology, Sadangi</option>
<option value="Hindol Higher Secondary School, Khajuriakota">Hindol Higher Secondary School, Khajuriakota</option>
<option value="Janata Higher Secondary School, Satamile">Janata Higher Secondary School, Satamile</option>
<option value="Mahila Higher Secondary School, Rasol">Mahila Higher Secondary School, Rasol</option>
<option value="Parikul Higher Secondary School, Paik purunakote">Parikul Higher Secondary School, Paik purunakote</option>
<option value="Regional Higher Secondary School, Hindol">Regional Higher Secondary School, Hindol</option>
<option value="Anchalika Higher Secondary School, Guneibil">Anchalika Higher Secondary School, Guneibil</option>
<option value="Anchalika Higher Secondary School, Kurumuna">Anchalika Higher Secondary School, Kurumuna</option>
<option value="Parimal Higher Secondary School, Pandua">Parimal Higher Secondary School, Pandua</option>
<option value="Kamakshyanagar Higher Secondary School, Kamakshyanagar">Kamakshyanagar Higher Secondary School, Kamakshyanagar</option>
<option value="Women's Higher Secondary School, Kamakshyanagar">Women's Higher Secondary School, Kamakshyanagar</option>
<option value="Bapuji Higher Secondary School, Garhpalasuni">Bapuji Higher Secondary School, Garhpalasuni</option>
<option value="Birasal Anchalika Higher Secondary School, Birasal">Birasal Anchalika Higher Secondary School, Birasal</option>
<option value="Kankadahad Higher Secondary School, Kankadahad">Kankadahad Higher Secondary School, Kankadahad</option>
<option value="Palasuni Bisa Mahima Higher Secondary School, Mahaviroad">Palasuni Bisa Mahima Higher Secondary School, Mahaviroad</option>
<option value="Anchalika Higher Secondary School, Pragyan Vihar">Anchalika Higher Secondary School, Pragyan Vihar</option>
<option value="Khadagaprasad Anchalika Higher Secondary School, Khadagaprasad">Khadagaprasad Anchalika Higher Secondary School, Khadagaprasad</option>
<option value="Odapada Panchayat Samiti Higher Secondary School, Hindol Road">Odapada Panchayat Samiti Higher Secondary School, Hindol Road</option>
<option value="Sachidananda Higher Secondary School, Indipur">Sachidananda Higher Secondary School, Indipur</option>
<option value="Satyam Sivam Sundaram Higher Secondary School, Gauda Kateni">Satyam Sivam Sundaram Higher Secondary School, Gauda Kateni</option>
<option value="Astasambhu Higher Secondary School, Kualo">Astasambhu Higher Secondary School, Kualo</option>
<option value="Barihapur Higher Secondary School, Barihapur">Barihapur Higher Secondary School, Barihapur</option>
<option value="Parjang Higher Secondary School, Parjang">Parjang Higher Secondary School, Parjang</option>
<option value="Regional Higher Secondary School, Sanda">Regional Higher Secondary School, Sanda</option>
<option value="Meena Ketan Higher Secondary School, Gurandi">Meena Ketan Higher Secondary School, Gurandi</option>
<option value="Binodini Science Higher Secondary School, Padmapur">Binodini Science Higher Secondary School, Padmapur</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, SERANGO">GOVT HIGHER SECONDARY SCHOOL, SERANGO</option>
<option value="Sriram Higher Secondary School, Kasinagar">Sriram Higher Secondary School, Kasinagar</option>
<option value="Hill Top Higher Secondary School, Mohana">Hill Top Higher Secondary School, Mohana</option>
<option value="Indira Memorial Higher Secondary School, Chandiput">Indira Memorial Higher Secondary School, Chandiput</option>
<option value="Baba Saheb Ambedkar Higher Secondary School, Khajuriapada">Baba Saheb Ambedkar Higher Secondary School, Khajuriapada</option>
<option value="BADAPADA HIGHER SECONDARY SCHOOL, NUAGADA">BADAPADA HIGHER SECONDARY SCHOOL, NUAGADA</option>
<option value="Sri Krushna Chandra Gajapati Higher Secondary School, Paralakhemundi">Sri Krushna Chandra Gajapati Higher Secondary School, Paralakhemundi</option>
<option value="Women's Higher Secondary School, Paralakhemundi">Women's Higher Secondary School, Paralakhemundi</option>
<option value="Mahendra Tanaya Higher Secondary School, R. Udayagiri">Mahendra Tanaya Higher Secondary School, R. Udayagiri</option>
<option value="Mahendragiri Higher Secondary School, Ramagiri">Mahendragiri Higher Secondary School, Ramagiri</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, DAMBAL">GOVT HIGHER SECONDARY SCHOOL, DAMBAL</option>
<option value="Parsuram Gurukul Higher Secondary School, Sevakpur">Parsuram Gurukul Higher Secondary School, Sevakpur</option>
<option value="Aska Science Higher Secondary School, Aska">Aska Science Higher Secondary School, Aska</option>
<option value="Nimina Brundaban Chandra Higher Secondary School, Kendupadar">Nimina Brundaban Chandra Higher Secondary School, Kendupadar</option>
<option value="Niranjan Government Higher Secondary School, Aska">Niranjan Government Higher Secondary School, Aska</option>
<option value="Janata Bigyan Higher Secondary School, Beguniapada">Janata Bigyan Higher Secondary School, Beguniapada</option>
<option value="Bellaguntha Women's Higher Secondary School, Bellaguntha">Bellaguntha Women's Higher Secondary School, Bellaguntha</option>
<option value="Kshetriyabarapur Anchalika Science Higher Secondary School, Kshetriyabarapur">Kshetriyabarapur Anchalika Science Higher Secondary School, Kshetriyabarapur</option>
<option value="Prafulla Kumari Women's Higher Secondary School, Gobara">Prafulla Kumari Women's Higher Secondary School, Gobara</option>
<option value="Bellaguntha Science Higher Secondary School, Bellaguntha">Bellaguntha Science Higher Secondary School, Bellaguntha</option>
<option value="Binayak Acharya Higher Secondary School, Berhampur">Binayak Acharya Higher Secondary School, Berhampur</option>
<option value="City Higher Secondary School, Berhampur">City Higher Secondary School, Berhampur</option>
<option value="Deccan Higher Secondary School, Berhampur">Deccan Higher Secondary School, Berhampur</option>
<option value="Khallikote Higher Secondary School, Berhampur">Khallikote Higher Secondary School, Berhampur</option>
<option value="Mahamaye Mahila Higher Secondary School, Gandhinagar">Mahamaye Mahila Higher Secondary School, Gandhinagar</option>
<option value="Sashi Bhusan Rath Government Women's Higher Secondary School, Berhampur">Sashi Bhusan Rath Government Women's Higher Secondary School, Berhampur</option>
<option value="Suprava Devi Women's Higher Secondary School, Berhampur">Suprava Devi Women's Higher Secondary School, Berhampur</option>
<option value="Dandapani Maharatha Science Higher Secondary School, Gallery">Dandapani Maharatha Science Higher Secondary School, Gallery</option>
<option value="GOVT HIGHER SECONDARY SCHOOL,MUJAGADA">GOVT HIGHER SECONDARY SCHOOL,MUJAGADA</option>
<option value="Kabi Samrat Upendra Bhanja Higher Secondary School, Bhanjanagar">Kabi Samrat Upendra Bhanja Higher Secondary School, Bhanjanagar</option>
<option value="Savitri Women's Higher Secondary School, Bhanjanagar">Savitri Women's Higher Secondary School, Bhanjanagar</option>
<option value="Anchalika Science Higher Secondary School, Ballipadar">Anchalika Science Higher Secondary School, Ballipadar</option>
<option value="Manitara Science Higher Secondary School, Manitara">Manitara Science Higher Secondary School, Manitara</option>
<option value="SAKUNTALA GOVT HIGHER SECONDARY SCHOOL, KARACHULI">SAKUNTALA GOVT HIGHER SECONDARY SCHOOL, KARACHULI</option>
<option value="People's Higher Secondary School, Buguda">People's Higher Secondary School, Buguda</option>
<option value="Sri Baladev Jew Mahila Higher Secondary School, Buguda">Sri Baladev Jew Mahila Higher Secondary School, Buguda</option>
<option value="Khetra Mohan Science Higher Secondary School, Narendrapur">Khetra Mohan Science Higher Secondary School, Narendrapur</option>
<option value="Nursingha Nath Higher Secondary School, Mahanadpur">Nursingha Nath Higher Secondary School, Mahanadpur</option>
<option value="Chhatrapur Women's Higher Secondary School, Chhatrapur">Chhatrapur Women's Higher Secondary School, Chhatrapur</option>
<option value="Government Higher Secondary School, Chhatrapur">Government Higher Secondary School, Chhatrapur</option>
<option value="Nuvapada Sri Balaji Higher Secondary School, Nuapada">Nuvapada Sri Balaji Higher Secondary School, Nuapada</option>
<option value="Regional Science Higher Secondary School, Sorola">Regional Science Higher Secondary School, Sorola</option>
<option value="Chikiti Higher Secondary School, Chikiti">Chikiti Higher Secondary School, Chikiti</option>
<option value="Ananta Narayana Higher Secondary School, Dharakote">Ananta Narayana Higher Secondary School, Dharakote</option>
<option value="Somanath Science Higher Secondary School, Mundamarai">Somanath Science Higher Secondary School, Mundamarai</option>
<option value="Biju Patnaik Women's Higher Secondary School, Digapahandi">Biju Patnaik Women's Higher Secondary School, Digapahandi</option>
<option value="Chidananda Saraswati Higher Secondary School, Bamkoi">Chidananda Saraswati Higher Secondary School, Bamkoi</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BORIPADAR">GOVT HIGHER SECONDARY SCHOOL, BORIPADAR</option>
<option value="Khemundi Higher Secondary School, Digapahandi">Khemundi Higher Secondary School, Digapahandi</option>
<option value="Ramjee Higher Secondary School, Bhismagiri">Ramjee Higher Secondary School, Bhismagiri</option>
<option value="Gopal Krushna Vigyan Higher Secondary School, Subalya">Gopal Krushna Vigyan Higher Secondary School, Subalya</option>
<option value="Humma Salt Higher Secondary School, Humma">Humma Salt Higher Secondary School, Humma</option>
<option value="Saheed Bhagat Singh Higher Secondary School, Khandadeuli">Saheed Bhagat Singh Higher Secondary School, Khandadeuli</option>
<option value="Ganjam Higher Secondary School, Ganjam">Ganjam Higher Secondary School, Ganjam</option>
<option value="Gopalpur Higher Secondary School, Gopalpur, Ganjam">Gopalpur Higher Secondary School, Gopalpur, Ganjam</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KANCHURU">GOVT HIGHER SECONDARY SCHOOL, KANCHURU</option>
<option value="Khambeya Dora Science Higher Secondary School, Pochilima">Khambeya Dora Science Higher Secondary School, Pochilima</option>
<option value="Sri Beleswar Higher Secondary School, Gondala">Sri Beleswar Higher Secondary School, Gondala</option>
<option value="Science Higher Secondary School, Hinjilicut">Science Higher Secondary School, Hinjilicut</option>
<option value="ANA GOVT HIGHER SECONDARY SCHOOL , KALINGAPADAR">ANA GOVT HIGHER SECONDARY SCHOOL , KALINGAPADAR</option>
<option value="Anchalika Higher Secondary School, Jagannathprasad">Anchalika Higher Secondary School, Jagannathprasad</option>
<option value="Tentulia Sasan Debasthan Higher Secondary School, Bijaya Dhanurjaya Pur">Tentulia Sasan Debasthan Higher Secondary School, Bijaya Dhanurjaya Pur</option>
<option value="Narayani Science Higher Secondary School, Athagadapatana">Narayani Science Higher Secondary School, Athagadapatana</option>
<option value="SRI DADHIBAMAN GOVT HIGHER SECONDARY SCHOOL, BARIDAA">SRI DADHIBAMAN GOVT HIGHER SECONDARY SCHOOL, BARIDAA</option>
<option value="Kabisurya Baladev Vigyan Higher Secondary School, Kabisuryanagar">Kabisurya Baladev Vigyan Higher Secondary School, Kabisuryanagar</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KHOJAPALLI">GOVT HIGHER SECONDARY SCHOOL, KHOJAPALLI</option>
<option value="K.P. Science Higher Secondary School, Langaleswar">K.P. Science Higher Secondary School, Langaleswar</option>
<option value="K.P. Science Higher Secondary School, Langaleswar">K.P. Science Higher Secondary School, Langaleswar</option>
<option value="Keshpur Higher Secondary School, Panditgaon">Keshpur Higher Secondary School, Panditgaon</option>
<option value="Rama Chandra Mardaraj Science Higher Secondary School, Khallikote">Rama Chandra Mardaraj Science Higher Secondary School, Khallikote</option>
<option value="Laxminarayan Higher Secondary School, Kodala">Laxminarayan Higher Secondary School, Kodala</option>
<option value="Mahuri Kalua Higher Secondary School, Balipada">Mahuri Kalua Higher Secondary School, Balipada</option>
<option value="Science Higher Secondary School, Kukudakhandi">Science Higher Secondary School, Kukudakhandi</option>
<option value="Doki Sanyasi Higher Secondary School, Khariaguda">Doki Sanyasi Higher Secondary School, Khariaguda</option>
<option value="Sri Bharatpati Higher Secondary School, Samantiapali">Sri Bharatpati Higher Secondary School, Samantiapali</option>
<option value="Bartini Science Higher Secondary School, Bartini">Bartini Science Higher Secondary School, Bartini</option>
<option value="Polasara Science Higher Secondary School, Polosara">Polasara Science Higher Secondary School, Polosara</option>
<option value="Regional Women's Higher Secondary School, Polosara">Regional Women's Higher Secondary School, Polosara</option>
<option value="Basudeba Sethy Science Higher Secondary School, Bhatakumarada">Basudeba Sethy Science Higher Secondary School, Bhatakumarada</option>
<option value="Tara Tarini Higher Secondary School, Purusottampur">Tara Tarini Higher Secondary School, Purusottampur</option>
<option value="Sri Jaganath Higher Secondary School, Rambha">Sri Jaganath Higher Secondary School, Rambha</option>
<option value="Rama Narayan Higher Secondary School, Dura">Rama Narayan Higher Secondary School, Dura</option>
<option value="Sidha Bhairabi Science Higher Secondary School, Konisi">Sidha Bhairabi Science Higher Secondary School, Konisi</option>
<option value="Biswas Roy Science Higher Secondary School, Pattapur">Biswas Roy Science Higher Secondary School, Pattapur</option>
<option value="Science Higher Secondary School, Konkorada">Science Higher Secondary School, Konkorada</option>
<option value="Science Higher Secondary School, Pudamari">Science Higher Secondary School, Pudamari</option>
<option value="Pitala Higher Secondary School, Pitalo">Pitala Higher Secondary School, Pitalo</option>
<option value="Udaya Pratap Science Higher Secondary School, Sheragada">Udaya Pratap Science Higher Secondary School, Sheragada</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BORADA , BADAGADA">GOVT HIGHER SECONDARY SCHOOL, BORADA , BADAGADA</option>
<option value="JAWAHAR JYOTI GOVT HIGHER SECONDARY SCHOOL, SURAMANI, NUAGADA">JAWAHAR JYOTI GOVT HIGHER SECONDARY SCHOOL, SURAMANI, NUAGADA</option>
<option value="P.C.M. Women's Higher Secondary School, Surada">P.C.M. Women's Higher Secondary School, Surada</option>
<option value="Rushikulya Higher Secondary School, Surada">Rushikulya Higher Secondary School, Surada</option>
<option value="Balikuda Higher Secondary School, Balikuda">Balikuda Higher Secondary School, Balikuda</option>
<option value="Balikuda Women's Higher Secondary School, Balikuda">Balikuda Women's Higher Secondary School, Balikuda</option>
<option value="Basudev Mahapatra Smarahi Higher Secondary School, Talagaon">Basudev Mahapatra Smarahi Higher Secondary School, Talagaon</option>
<option value="Harispur Baldev Higher Secondary School, Borikina">Harispur Baldev Higher Secondary School, Borikina</option>
<option value="Alaka Higher Secondary School, Anantabata">Alaka Higher Secondary School, Anantabata</option>
<option value="Baisi Mouza Higher Secondary School, Purana">Baisi Mouza Higher Secondary School, Purana</option>
<option value="Dhyan Chand Higher Secondary School, Hazipur">Dhyan Chand Higher Secondary School, Hazipur</option>
<option value="Brundaban Bihari Higher Secondary School, Goda">Brundaban Bihari Higher Secondary School, Goda</option>
<option value="Grameswar Higher Secondary School, Panchapali">Grameswar Higher Secondary School, Panchapali</option>
<option value="KUNJA BIHARI GOVT HIGHER SECONDARY SCHOOL, NUAGAOAN">KUNJA BIHARI GOVT HIGHER SECONDARY SCHOOL, NUAGAOAN</option>
<option value="NILAKANTHESWAR GOVT HIGHER SECONDARY SCHOOL, KANAGULI">NILAKANTHESWAR GOVT HIGHER SECONDARY SCHOOL, KANAGULI</option>
<option value="Sri Sri Jagannath Higher Secondary School, Krushnachandrapur">Sri Sri Jagannath Higher Secondary School, Krushnachandrapur</option>
<option value="Ananta Sanskrit Higher Secondary School">Ananta Sanskrit Higher Secondary School</option>
<option value="Biju Patnaik Higher Secondary School, Ashrampatna">Biju Patnaik Higher Secondary School, Ashrampatna</option>
<option value="Gadibrahma Mahila Higher Secondary School, Kaduapada">Gadibrahma Mahila Higher Secondary School, Kaduapada</option>
<option value="Sidha Baranga Higher Secondary School of Education & Technology, Punanga">Sidha Baranga Higher Secondary School of Education & Technology, Punanga</option>
<option value="Swami Vivekananda Memorial Higher Secondary School, Jagatsinghpur">Swami Vivekananda Memorial Higher Secondary School, Jagatsinghpur</option>
<option value="Kamala Devi Women's Higher Secondary School, Pankapal">Kamala Devi Women's Higher Secondary School, Pankapal</option>
<option value="Kujanga Higher Secondary School, Kujanga">Kujanga Higher Secondary School, Kujanga</option>
<option value="Narayan Birabar Samanta Higher Secondary School, Jhimani">Narayan Birabar Samanta Higher Secondary School, Jhimani</option>
<option value="Panchayat Mahila Higher Secondary School, Balia">Panchayat Mahila Higher Secondary School, Balia</option>
<option value="Sarala Higher Secondary School, Rahama">Sarala Higher Secondary School, Rahama</option>
<option value="Maa Kutam Chandi Higher Secondary School, Devidol">Maa Kutam Chandi Higher Secondary School, Devidol</option>
<option value="Higher_Secondary_School_of_Arts_Science_and_Technology_Bondamunda">Higher Secondary School of Arts, Science & Technology, Bondamunda</option>
<option value="Neelashaila_Higher_Secondary_School_Jagada">Neelashaila Higher Secondary School, Jagada</option>
<option value="Subodh_Routray_Higher_Secondary_School_Bisra">Subodh Routray Higher Secondary School, Bisra</option>
<option value="Balanipat_Higher_Secondary_School_Jhirdapali">Balanipat Higher Secondary School, Jhirdapali</option>
<option value="Banshidhar_Higher_Secondary_School_Kenaveta">Banshidhar Higher Secondary School, Kenaveta</option>
<option value="Bonaigarh_Higher_Secondary_School_Bonaigarh">Bonaigarh Higher Secondary School, Bonaigarh</option>
<option value="Jadupati_Higher_Secondary_School_Sihidia">Jadupati Higher Secondary School, Sihidia</option>
<option value="AGM_GOVT_HIGHER_SECONDARY_SCHOOL_SOLE">AGM GOVT HIGHER SECONDARY SCHOOL, SOLE</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Gurundia">Panchayat Samiti Higher Secondary School, Gurundia</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_KANIKA">GOVT HIGHER SECONDARY SCHOOL, KANIKA</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_LUABAHAL">GOVT HIGHER SECONDARY SCHOOL, LUABAHAL</option>
<option value="Manikeswari_Higher_Secondary_School_Garh-Tumulia">Manikeswari Higher Secondary School, Garh-Tumulia</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Hemgir">Panchayat Samiti Higher Secondary School, Hemgir</option>
<option value="Vesaja_Patel_Higher_Secondary_School_Duduka">Vesaja Patel Higher Secondary School, Duduka</option>
<option value="Koida_Higher_Secondary_School_Koida">Koida Higher Secondary School, Koida</option>
<option value="Dalmia_Higher_Secondary_School_Jharbeda">Dalmia Higher Secondary School, Jharbeda</option>
<option value="Government_Science_Higher_Secondary_School_Kutra">Government Science Higher Secondary School, Kutra</option>
<option value="Veer_Birsamunda_Simanta_Higher_Secondary_School_Gairbahal">Veer Birsamunda Simanta Higher Secondary School, Gairbahal</option>
<option value="Baba_Baneswar_Higher_Secondary_School_Bilaipara">Baba Baneswar Higher Secondary School, Bilaipara</option>
<option value="Lahunipara_Higher_Secondary_School_Lahunipara">Lahunipara Higher Secondary School, Lahunipara</option>
<option value="Gurukul_Sanskrit_Higher_Secondary_School">Gurukul Sanskrit Higher Secondary School</option>
<option value="Priyadarshini_Mahila_Higher_Secondary_School_Jalda">Priyadarshini Mahila Higher Secondary School, Jalda</option>
<option value="Vedvyas_Higher_Secondary_School_Vedvyas">Vedvyas Higher Secondary School, Vedvyas</option>
<option value="BASUDEV_GOVT_HIGHER_SECONDARY_SCHOOL_DUMABAHAL">BASUDEV GOVT HIGHER SECONDARY SCHOOL, DUMABAHAL</option>
<option value="Damodar_Naik_Higher_Secondary_School_Darlipali">Damodar Naik Higher Secondary School, Darlipali</option>
<option value="Lephripara_Higher_Secondary_School_Lephripara">Lephripara Higher Secondary School, Lephripara</option>
<option value="S.R.D.M.N._Panchayat_Higher_Secondary_School_Sargipali">S.R.D.M.N. Panchayat Higher Secondary School, Sargipali</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_HATIBARI">GOVT HIGHER SECONDARY SCHOOL, HATIBARI</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_KHUNTAGAON">GOVT HIGHER SECONDARY SCHOOL, KHUNTAGAON</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Nuagaon">Panchayat Samiti Higher Secondary School, Nuagaon</option>
<option value="Kansbahal_Higher_Secondary_School_Laing">Kansbahal Higher Secondary School, Laing</option>
<option value="Sarbati_Devi_Women's_Higher_Secondary_School_Rajgangpur">Sarbati Devi Women's Higher Secondary School, Rajgangpur</option>
<option value="Gandhi_Higher_Secondary_School_Deogaon">Gandhi Higher Secondary School, Deogaon</option>
<option value="Government_Higher_Secondary_School_Rourkela">Government Higher Secondary School, Rourkela</option>
<option value="Hrushikesh_Ray_Higher_Secondary_School_Chhend">Hrushikesh Ray Higher Secondary School, Chhend</option>
<option value="Ispat_Higher_Secondary_School_Rourkela">Ispat Higher Secondary School, Rourkela</option>
<option value="Kalyani_Ray_Higher_Secondary_School_Hamirpur">Kalyani Ray Higher Secondary School, Hamirpur</option>
<option value="Municipal_Higher_Secondary_School_Rourkela">Municipal Higher Secondary School, Rourkela</option>
<option value="Rourkela_Higher_Secondary_School_Rourkela">Rourkela Higher Secondary School, Rourkela</option>
<option value="Sushilabati_Government_Women's_Higher_Secondary_School_Rourkela">Sushilabati Government Women's Higher Secondary School, Rourkela</option>
<option value="Utkal_Gourav_Madhusudan_Higher_Secondary_School_Rourkela">Utkal Gourav Madhusudan Higher Secondary School, Rourkela</option>
<option value="New_Orissa_Higher_Secondary_School_Gaibira">New Orissa Higher Secondary School, Gaibira</option>
<option value="Subdega_Anchalika_Sahayog_Higher_Secondary_School_Subdega">Subdega Anchalika Sahayog Higher Secondary School, Subdega</option>
<option value="Illa_Memorial_Panchayat_Samiti_Higher_Secondary_School_Kinjirma">Illa Memorial Panchayat Samiti Higher Secondary School, Kinjirma</option>
<option value="Panchayat_Samiti_Science_and_Arts_Higher_Secondary_School_Bhedabahal">Panchayat Samiti Science & Arts Higher Secondary School, Bhedabahal</option>
<option value="Vesaja_Rambhabati_Higher_Secondary_School_Kundukela">Vesaja Rambhabati Higher Secondary School, Kundukela</option>
<option value="Government_Higher_Secondary_School_Sundargarh">Government Higher Secondary School, Sundargarh</option>
<option value="Government_Women's_Higher_Secondary_School_Sundargarh">Government Women's Higher Secondary School, Sundargarh</option>
<option value="Jasoda_Bishnu_N.M.P._Higher_Secondary_School_Jogimal">Jasoda Bishnu N.M.P. Higher Secondary School, Jogimal</option>
<option value="Maharshi_Dayanand_Higher_Secondary_School_Garh-Mahulpali">Maharshi Dayanand Higher Secondary School, Garh-Mahulpali</option>
<option value="Ujalpur_Higher_Secondary_School_Ujalpur">Ujalpur Higher Secondary School, Ujalpur</option>
<option value="Parbati_Giri_Arts_Higher_Secondary_School_Mahulpali">Parbati Giri Arts Higher Secondary School, Mahulpali</option>
<option value="V.S.S._Higher_Secondary_School_Jujomura">V.S.S. Higher Secondary School, Jujomura</option>
<option value="Gokul_Parvati_Rural_Higher_Secondary_School_Kuntara">Gokul Parvati Rural Higher Secondary School, Kuntara</option>
<option value="Kutrachuan_Higher_Secondary_School_Kutrachuan">Kutrachuan Higher Secondary School, Kutrachuan</option>
<option value="Rajiv_Gandhi_Memorial_Tribal_Higher_Secondary_School_Kalheipali">Rajiv Gandhi Memorial Tribal Higher Secondary School, Kalheipali</option>
<option value="Kuchinda_Higher_Secondary_School_Kuchinda">Kuchinda Higher Secondary School, Kuchinda</option>
<option value="Kuchinda_Women's_Higher_Secondary_School_Kuchinda">Kuchinda Women's Higher Secondary School, Kuchinda</option>
<option value="D.P.A._Higher_Secondary_School_Mura">D.P.A. Higher Secondary School, Mura</option>
<option value="Maa_Jhadeswari_Higher_Secondary_School_Dhama">Maa Jhadeswari Higher Secondary School, Dhama</option>
<option value="Mandhata_Baba_Higher_Secondary_School_Maneswar">Mandhata Baba Higher Secondary School, Maneswar</option>
<option value="Batgaon_Higher_Secondary_School_Batgaon">Batgaon Higher Secondary School, Batgaon</option>
<option value="Kisinda_Higher_Secondary_School_Kisinda">Kisinda Higher Secondary School, Kisinda</option>
<option value="Naktideul_Higher_Secondary_School_Naktideul">Naktideul Higher Secondary School, Naktideul</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_KADALIGARH">GOVT HIGHER SECONDARY SCHOOL, KADALIGARH</option>
<option value="Jai_Jagannath_Higher_Secondary_School_R.Badmal">Jai Jagannath Higher Secondary School, R.Badmal</option>
<option value="Bhim_Bhoi_Higher_Secondary_School_Rairakhol">Bhim Bhoi Higher Secondary School, Rairakhol</option>
<option value="Rairakhol_Women's_Higher_Secondary_School_Rairakhol">Rairakhol Women's Higher Secondary School, Rairakhol</option>
<option value="Dutika_Sahu_Higher_Secondary_School_Laida">Dutika Sahu Higher Secondary School, Laida</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_LAPANGA">GOVT HIGHER SECONDARY SCHOOL, LAPANGA</option>
<option value="Netaji_Subash_Chandra_Bose_Higher_Secondary_School_Sambalpur">Netaji Subash Chandra Bose Higher Secondary School, Sambalpur</option>
<option value="Surajmal_Higher_Secondary_School_Rampella">Surajmal Higher Secondary School, Rampella</option>
<option value="Gangadhar_Meher_Higher_Secondary_School_Sambalpur">Gangadhar Meher Higher Secondary School, Sambalpur</option>
<option value="Government_Women's_Higher_Secondary_School_Sambalpur">Government Women's Higher Secondary School, Sambalpur</option>
<option value="R.K.D.T._Higher_Secondary_School_Sambalpur">R.K.D.T. Higher Secondary School, Sambalpur</option>
<option value="Samaleswari_Higher_Secondary_School_Sambalpur">Samaleswari Higher Secondary School, Sambalpur</option>
<option value="Binka_Women’s_Higher_Secondary_School_Phulmuthi">Binka Women’s Higher Secondary School, Phulmuthi</option>
<option value="Shree_Jagannath_Higher_Secondary_School_Bausuni">Shree Jagannath Higher Secondary School, Bausuni</option>
<option value="Siddhartha_Higher_Secondary_School_Binka">Siddhartha Higher Secondary School, Binka</option>
<option value="Birmaharajpur_Higher_Secondary_School_Birmaharajpur">Birmaharajpur Higher Secondary School, Birmaharajpur</option>
<option value="Parameswari_Higher_Secondary_School_Bhutiapali">Parameswari Higher Secondary School, Bhutiapali</option>
<option value="Subalaya_Higher_Secondary_School_Subalaya">Subalaya Higher Secondary School, Subalaya</option>
<option value="Babaji_Sahu_Higher_Secondary_School_Gajabandh">Babaji Sahu Higher Secondary School, Gajabandh</option>
<option value="Dunguripali_Higher_Secondary_School_Dunguripali">Dunguripali Higher Secondary School, Dunguripali</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_SUKHA">GOVT HIGHER SECONDARY SCHOOL, SUKHA</option>
<option value="Panchayat_Women's_Higher_Secondary_School_S._Rampur">Panchayat Women's Higher Secondary School, S. Rampur</option>
<option value="Shreeram_Higher_Secondary_School_S._Rampur">Shreeram Higher Secondary School, S. Rampur</option>
<option value="Gram_Panchayat_Higher_Secondary_School_Lachhipur">Gram Panchayat Higher Secondary School, Lachhipur</option>
<option value="Maa_Maheswari_Higher_Secondary_School_Khambeswaripali">Maa Maheswari Higher Secondary School, Khambeswaripali</option>
<option value="Biju_Pattnaik_Women's_Higher_Secondary_School_Sonepur">Biju Pattnaik Women's Higher Secondary School, Sonepur</option>
<option value="Sonepur_Higher_Secondary_School_Sonepur">Sonepur Higher Secondary School, Sonepur</option>
<option value="M.B.R._Higher_Secondary_School_Menda">M.B.R. Higher Secondary School, Menda</option>
<option value="Panchayat_Higher_Secondary_School_Charbhata">Panchayat Higher Secondary School, Charbhata</option>
<option value="A.E.S._Higher_Secondary_School_Tarbha">A.E.S. Higher Secondary School, Tarbha</option>
<option value="Dharmasala_Higher_Secondary_School_Dharmasala">Dharmasala Higher Secondary School, Dharmasala</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Ullunda">Panchayat Samiti Higher Secondary School, Ullunda</option>
<option value="Satyabadi_Higher_Secondary_School_Kalapathar">Satyabadi Higher Secondary School, Kalapathar</option>
<option value="Kinjirkela_Higher_Secondary_School_Kinjirkela">Kinjirkela Higher Secondary School, Kinjirkela</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Balisankara">Panchayat Samiti Higher Secondary School, Balisankara</option>
<option value="Panchayat_Higher_Secondary_School_Bargaon-Kachhar">Panchayat Higher Secondary School, Bargaon-Kachhar</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Bargaon">Panchayat Samiti Higher Secondary School, Bargaon</option>
<option value="Shrama_Sakti_Higher_Secondary_School_Biramitrapur">Shrama Sakti Higher Secondary School, Biramitrapur</option>
<option value="Kalyanpur_Science_Higher_Secondary_School_Kalyanpur">Kalyanpur Science Higher Secondary School, Kalyanpur</option>
<option value="Panchayat_Higher_Secondary_School_Matiapada_Godiput">Panchayat Higher Secondary School, Matiapada, Godiput</option>
<option value="Gop_Higher_Secondary_School_Gop">Gop Higher Secondary School, Gop</option>
<option value="Konark_Women's_Higher_Secondary_School_Sarada">Konark Women's Higher Secondary School, Sarada</option>
<option value="Nayahat_Higher_Secondary_School_Nayahat">Nayahat Higher Secondary School, Nayahat</option>
<option value="Radhaballav_Higher_Secondary_School_Bairipur">Radhaballav Higher Secondary School, Bairipur</option>
<option value="Mangala_Higher_Secondary_School_Kakatpur">Mangala Higher Secondary School, Kakatpur</option>
<option value="Netrananda_Sahu_Women's_Higher_Secondary_School_Kakatpur">Netrananda Sahu Women's Higher Secondary School, Kakatpur</option>
<option value="Prachi_Higher_Secondary_School_Bangurigaon">Prachi Higher Secondary School, Bangurigaon</option>
<option value="Chouda_Mouza_Bidyut_Higher_Secondary_School_Garhsanput">Chouda Mouza Bidyut Higher Secondary School, Garhsanput</option>
<option value="Dayavihar_Higher_Secondary_School_Kanas">Dayavihar Higher Secondary School, Kanas</option>
<option value="Kanas_Higher_Secondary_School_Kanas">Kanas Higher Secondary School, Kanas</option>
<option value="Konark_Bhagabati_Higher_Secondary_School_Konark">Konark Bhagabati Higher Secondary School, Konark</option>
<option value="Hariswar_Dev_Vocational_Science_Higher_Secondary_School_Panaspada">Hariswar Dev Vocational Science Higher Secondary School, Panaspada</option>
<option value="Kandakhai_Higher_Secondary_School_of_Science_and_Arts_Kandakhai">Kandakhai Higher Secondary School of Science & Arts, Kandakhai</option>
<option value="Maa_Ramachandi_Chilika_Women's_Higher_Secondary_School_Charichhak_Titipa">Maa Ramachandi Chilika Women's Higher Secondary School, Charichhak, Titipa</option>
<option value="Panchayat_Higher_Secondary_School_of_Education_and_Technology_Satapada">Panchayat Higher Secondary School of Education & Technology, Satapada</option>
<option value="Rukmani_Devi_Chilika_Higher_Secondary_School_Nuapada">Rukmani Devi Chilika Higher Secondary School, Nuapada</option>
<option value="Balanga_Higher_Secondary_School_Balanga">Balanga Higher Secondary School, Balanga</option>
<option value="Banishree_Higher_Secondary_School_Kuanarpur">Banishree Higher Secondary School, Kuanarpur</option>
<option value="Lankeswari_Mahila_Higher_Secondary_School_Beraboi_Balanga">Lankeswari Mahila Higher Secondary School, Beraboi, Balanga</option>
<option value="Nigamananda_Mahila_Higher_Secondary_School_Chari_Chhak">Nigamananda Mahila Higher Secondary School, Chari Chhak</option>
<option value="Indira_Gandhi_Women's_Higher_Secondary_School_Nimapara">Indira Gandhi Women's Higher Secondary School, Nimapara</option>
<option value="Nimapada_Higher_Secondary_School_Nimapada">Nimapada Higher Secondary School, Nimapada</option>
<option value="Mahatma_Gandhi_Memorial_Higher_Secondary_School_of_Education_and_Technology_Pubasasan">Mahatma Gandhi Memorial Higher Secondary School of Education and Techchnology, Pubasasan</option>
<option value="Pipili_Higher_Secondary_School_Pipili">Pipili Higher Secondary School, Pipili</option>
<option value="Government_Women's_Higher_Secondary_School_Puri">Government Women's Higher Secondary School, Puri</option>
<option value="Nilachal_Narayan_Ayurveda_Chatuspathi_Higher_Secondary_School">Nilachal Narayan Ayurveda Chatuspathi Higher Secondary School</option>
<option value="Puri_Women's_Higher_Secondary_School_Narendrakona">Puri Women's Higher Secondary School, Narendrakona</option>
<option value="Samanta_Chandra_Sekhar_Higher_Secondary_School_Puri">Samanta Chandra Sekhar Higher Secondary School, Puri</option>
<option value="Surajamala_Saha_Higher_Secondary_School_Saradhabali">Surajamala Saha Higher Secondary School, Saradhabali</option>
<option value="Gopinath_Dev_Higher_Secondary_School_Pratap_Purusottampur">Gopinath Dev Higher Secondary School, Pratap Purusottampur</option>
<option value="Shastri_Smruti_Higher_Secondary_School_Baliput">Shastri Smruti Higher Secondary School, Baliput</option>
<option value="Sri_Sri_Beleswar_Gopinath_Higher_Secondary_School_Balighai">Sri Sri Beleswar Gopinath Higher Secondary School, Balighai</option>
<option value="Utkalmani_Gopabandhu_Smruti_Higher_Secondary_School_Sakhigopal">Utkalmani Gopabandhu Smruti Higher Secondary School, Sakhigopal</option>
<option value="Maa_Markama_Higher_Secondary_School_Bisam_Cuttack">Maa Markama Higher Secondary School, Bisam Cuttack</option>
<option value="PS_GOVT_HIGHER_SECONDARY_SCHOOL_DURGI">PS GOVT HIGHER SECONDARY SCHOOL, DURGI</option>
<option value="CHANDRAPUR_GOVT_HIGHER_SECONDARY_SCHOOL">CHANDRAPUR GOVT HIGHER SECONDARY SCHOOL</option>
<option value="Science_Higher_Secondary_School_Gudari">Science Higher Secondary School, Gudari</option>
<option value="Dr._B.R.N._Higher_Secondary_School_Dombosora">Dr. B.R.N. Higher Secondary School, Dombosora</option>
<option value="Gunupur_Higher_Secondary_School_Gunupur">Gunupur Higher Secondary School, Gunupur</option>
<option value="Thyarama_Women's_Higher_Secondary_School_Gunupur">Thyarama Women's Higher Secondary School, Gunupur</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_TIKIRI">GOVT HIGHER SECONDARY SCHOOL, TIKIRI</option>
<option value="Manikeswari_Adivasi_Higher_Secondary_School_Kashipur">Manikeswari Adivasi Higher Secondary School, Kashipur</option>
<option value="JAGADAMBA_GOVT_HIGHER_SECONDARY_SCHOOL_KOLNORA">JAGADAMBA GOVT HIGHER SECONDARY SCHOOL, KOLNORA</option>
<option value="Ambodala_Samant_Higher_Secondary_School_Ambadola">Ambodala Samant Higher Secondary School, Ambadola</option>
<option value="Muniguda_Higher_Secondary_School_Gobardhana">Muniguda Higher Secondary School, Gobardhana</option>
<option value="R.G._Higher_Secondary_School_Padmapur">R.G. Higher Secondary School, Padmapur</option>
<option value="Droupadi_Higher_Secondary_School_Gumuda">Droupadi Higher Secondary School, Gumuda</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_RAMANAGUDA">GOVT HIGHER SECONDARY SCHOOL, RAMANAGUDA</option>
<option value="Lakshmipati_Singania_Higher_Secondary_School_Jaykaypur">Lakshmipati Singania Higher Secondary School, Jaykaypur</option>
<option value="Ugratara_Higher_Secondary_School_Komtalpeta">Ugratara Higher Secondary School, Komtalpeta</option>
<option value="Rayagada_Higher_Secondary_School_Rayagada">Rayagada Higher Secondary School, Rayagada</option>
<option value="Rayagada_Women's_Higher_Secondary_School_Rayagada">Rayagada Women's Higher Secondary School, Rayagada</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_GARPOSH">GOVT HIGHER SECONDARY SCHOOL, GARPOSH</option>
<option value="Parsuram_Gountia_Higher_Secondary_School_Jarabaga">Parsuram Gountia Higher Secondary School, Jarabaga</option>
<option value="Prabhu_Dayal_Rural_Higher_Secondary_School_Kesaibahal">Prabhu Dayal Rural Higher Secondary School, Kesaibahal</option>
<option value="Trust_Fund_Higher_Secondary_School_Bamra">Trust Fund Higher Secondary School, Bamra</option>
<option value="Burla_N.A.C._Higher_Secondary_School_Burla">Burla N.A.C. Higher Secondary School, Burla</option>
<option value="D.P.A._Higher_Secondary_School_Sason">D.P.A. Higher Secondary School, Sason</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_CHIPILIMA">GOVT HIGHER SECONDARY SCHOOL, CHIPILIMA</option>
<option value="Jai_Durga_Higher_Secondary_School_Padiabahal">Jai Durga Higher Secondary School, Padiabahal</option>
<option value="Saraswat_Higher_Secondary_School_Godbhaga">Saraswat Higher Secondary School, Godbhaga</option>
<option value="V.S.S._Institute_of_Science_Higher_Secondary_School_Dhankauda">V.S.S. Institute of Science Higher Secondary School, Dhankauda</option>
<option value="Hirakud_Higher_Secondary_School_Hirakud">Hirakud Higher Secondary School, Hirakud</option>
<option value="B.R.G._Higher_Secondary_School_Bhojpur">B.R.G. Higher Secondary School, Bhojpur</option>
<option value="Fashimal_Anchalik_Higher_Secondary_School_Fashimal">Fashimal Anchalik Higher Secondary School, Fashimal</option>
<option value="Jamankira_Higher_Secondary_School_Jamankira">Jamankira Higher Secondary School, Jamankira</option>
<option value="Dr._J.K._Sahu_Higher_Secondary_School_Parmanpur">Dr. J.K. Sahu Higher Secondary School, Parmanpur</option>
<option value="Women's_Higher_Secondary_School_Khandapara">Women's Higher Secondary School, Khandapara</option>
<option value="Higher_Secondary_Higher_Secondary_School_Boulasahi">Higher Secondary Higher Secondary School, Boulasahi</option>
<option value="Itamati_Higher_Secondary_School_of_Education_&_Technology_Itamati">Itamati Higher Secondary School of Education & Technology, Itamati</option>
<option value="Naba_Choudhury_Higher_Secondary_School_Kendudhipi">Naba Choudhury Higher Secondary School, Kendudhipi</option>
<option value="Nayagarh_Higher_Secondary_School_Nayagarh">Nayagarh Higher Secondary School, Nayagarh</option>
<option value="Nayagarh_Prajamandal_Mahila_Higher_Secondary_School_Nayagarh">Nayagarh Prajamandal Mahila Higher Secondary School, Nayagarh</option>
<option value="Dadhibamanjew_Higher_Secondary_School_Bahadajhola">Dadhibamanjew Higher Secondary School , Bahadajhola</option>
<option value="Gatiswar_Higher_Secondary_School_Malisahi">Gatiswar Higher Secondary School, Malisahi</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_MAHIPUR">GOVT HIGHER SECONDARY SCHOOL, MAHIPUR</option>
<option value="Nuagaon_Higher_Secondary_School_Nuagaon">Nuagaon Higher Secondary School, Nuagaon</option>
<option value="Ananda_Sahu_Women's_Higher_Secondary_School_Komanda">Ananda Sahu Women's Higher Secondary School, Komanda</option>
<option value="Raghunath_Samabaya_Higher_Secondary_School_Odagaon">Raghunath Samabaya Higher Secondary School, Odagaon</option>
<option value="Sarankul_Higher_Secondary_School_Sarankul">Sarankul Higher Secondary School, Sarankul</option>
<option value="Shree_Ladukesh_Anchalik_Higher_Secondary_School_Godipada">Shree Ladukesh Anchalik Higher Secondary School, Godipada</option>
<option value="Arjuna_Rout_Memorial_Higher_Secondary_School_Mayurjhalia">Arjuna Rout Memorial Higher Secondary School, Mayurjhalia</option>
<option value="Garhbanikilo_Higher_Secondary_School_Garhbanikilo">Garhbanikilo Higher Secondary School, Garhbanikilo</option>
<option value="Maa_Maninag_Durga_Mahila_Higher_Secondary_School_Ranpur">Maa Maninag Durga Mahila Higher Secondary School, Ranpur</option>
<option value="Mohan_Mahila_Higher_Secondary_School_Chandpur">Mohan Mahila Higher Secondary School, Chandpur</option>
<option value="Rajasunakhala_Higher_Secondary_School_Rajasunakhala">Rajasunakhala Higher Secondary School, Rajasunakhala</option>
<option value="Ranapur_Higher_Secondary_School_Ranpur">Ranapur Higher Secondary School, Ranpur</option>
<option value="BASTRAYANI_GOVT_HIGHER_SECONDARY_SCHOOL_DOMJHAR">BASTRAYANI GOVT HIGHER SECONDARY SCHOOL, DOMJHAR</option>
<option value="Biju_Pattnaik_Higher_Secondary_School_Boden">Biju Pattnaik Higher Secondary School, Boden</option>
<option value="Sri_Jagannath_Higher_Secondary_School_Karangamal">Sri Jagannath Higher Secondary School, Karangamal</option>
<option value="Bibekananda_Meher_Higher_Secondary_School_Bhulia_Sikuan">Bibekananda Meher Higher Secondary School, Bhulia Sikuan</option>
<option value="JAI_KISHAN_GOVT_HIGHER_SECONDARY_SCHOOL_BARGAON">JAI KISHAN GOVT HIGHER SECONDARY SCHOOL, BARGAON</option>
<option value="Pallipragati_Higher_Secondary_School_Dohelpada">Pallipragati Higher Secondary School, Dohelpada</option>
<option value="Upendra_Prabhakar_Higher_Secondary_School_Tukla">Upendra Prabhakar Higher Secondary School, Tukla</option>
<option value="Khadial_Mahila_Higher_Secondary_School_Khariar">Khadial Mahila Higher Secondary School, Khariar</option>
<option value="Khariar_Higher_Secondary_School_Khariar">Khariar Higher Secondary School, Khariar</option>
<option value="JAI_KISAN_GOVT_HIGHER_SECONDARY_SCHOOL_LAKHNA">JAI KISAN GOVT HIGHER SECONDARY SCHOOL, LAKHNA</option>
<option value="Panchayat_Higher_Secondary_School_Budhikomna">Panchayat Higher Secondary School, Budhikomna</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Komna">Panchayat Samiti Higher Secondary School, Komna</option>
<option value="Government_Science_Higher_Secondary_School_Nuapada">Government Science Higher Secondary School, Nuapada</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_BHALESWAR">GOVT HIGHER SECONDARY SCHOOL, BHALESWAR</option>
<option value="JANAMANGAL_GOVT_HIGHER_SECONDARY_SCHOOL_KULIABANDHA">JANAMANGAL GOVT HIGHER SECONDARY SCHOOL, KULIABANDHA</option>
<option value="National_Higher_Secondary_School_Nuapada">National Higher Secondary School, Nuapada</option>
<option value="G.M._Higher_Secondary_School_Hatibandh">G.M. Higher Secondary School, Hatibandh</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_PORTIPADA">GOVT HIGHER SECONDARY SCHOOL, PORTIPADA</option>
<option value="Sinapali_Higher_Secondary_School_Sinapali">Sinapali Higher Secondary School, Sinapali</option>
<option value="Astaranga_Higher_Secondary_School_Astaranga">Astaranga Higher Secondary School, Astaranga</option>
<option value="Mahatma_Gandhi_Higher_Secondary_School_of_Education_&_Techchnology_Astaranga">Mahatma Gandhi Higher Secondary School of Education & Techchnology, Astaranga</option>
<option value="Ratanpur_Science_Higher_Secondary_School_Ratanpur">Ratanpur Science Higher Secondary School, Ratanpur</option>
<option value="Alarnath_Dhandamulak_Higher_Secondary_School_Brahmagiri">Alarnath Dhandamulak Higher Secondary School, Brahmagiri</option>
<option value="ATIBADI_JAGANNATH_DAS_GOVT_HIGHER_SECONDARY_SCHOOL_KAPILESWARPUR">ATIBADI JAGANNATH DAS GOVT HIGHER SECONDARY SCHOOL, KAPILESWARPUR</option>
<option value="Baxi_Jagabandhu_Bidyadhar_Higher_Secondary_School_Gadaradang">Baxi Jagabandhu Bidyadhar Higher Secondary School, Gadaradang</option>
<option value="Brahmeswar_Higher_Secondary_School_Dharmakriti">Brahmeswar Higher Secondary School, Dharmakriti</option>
<option value="Harachandi_Mahila_Higher_Secondary_School_Rebana">Harachandi Mahila Higher Secondary School, Rebana</option>
<option value="Manein_Higher_Secondary_School_Kandagoda">Manein Higher Secondary School, Kandagoda</option>
<option value="Acharya_Harihara_Smruti_Higher_Secondary_School_Indipur">Acharya Harihara Smruti Higher Secondary School, Indipur</option>
<option value="Delanga_Higher_Secondary_School_Delanga">Delanga Higher Secondary School, Delanga</option>
<option value="Radha_Govinda_Anchalik_Higher_Secondary_School_Amarda">Radha Govinda Anchalik Higher Secondary School, Amarda</option>
<option value="Sahid_Memorial_Higher_Secondary_School_Manida">Sahid Memorial Higher Secondary School, Manida</option>
<option value="Upendra_Nath_Higher_Secondary_School_Nalagaja">Upendra Nath Higher Secondary School, Nalagaja</option>
<option value="Banabhumi_Higher_Secondary_School_Rangamatia">Banabhumi Higher Secondary School, Rangamatia</option>
<option value="Chaitanya_Prasad_Higher_Secondary_School_Kendua">Chaitanya Prasad Higher Secondary School, Kendua</option>
<option value="Jhansirani_Women's_Higher_Secondary_School_Padasitha">Jhansirani Women's Higher Secondary School, Padasitha</option>
<option value="Saratpal_Higher_Secondary_School_Palvihar">Saratpal Higher Secondary School, Palvihar</option>
<option value="Seemanta_Higher_Secondary_School_Jharpokharia">Seemanta Higher Secondary School, Jharpokharia</option>
<option value="Biju_Patnaik_Higher_Secondary_School_Singda">Biju Patnaik Higher Secondary School, Singda</option>
<option value="Maa_Kitchakeswari_Higher_Secondary_School_Khiching">Maa Kitchakeswari Higher Secondary School, Khiching</option>
<option value="Sukruli_Higher_Secondary_School_Sukruli">Sukruli Higher Secondary School, Sukruli</option>
<option value="Goura_Mohan_Sathua_Higher_Secondary_School_Kosta">Goura Mohan Sathua Higher Secondary School, Kosta</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Dharampura">Panchayat Samiti Higher Secondary School, Dharampura</option>
<option value="Utkal_Banani_Higher_Secondary_School_Chaksuliapada">Utkal Banani Higher Secondary School, Chaksuliapada</option>
<option value="Fulamati_Hembram_Higher_Secondary_School_Padiabeda">Fulamati Hembram Higher Secondary School, Padiabeda</option>
<option value="Maa_Basuli_Higher_Secondary_School_Thakurmunda">Maa Basuli Higher Secondary School, Thakurmunda</option>
<option value="Government_Science_Higher_Secondary_School_Tiringi">Government Science Higher Secondary School, Tiringi</option>
<option value="Luipa_Higher_Secondary_School_Radho">Luipa Higher Secondary School, Radho</option>
<option value="Rohi_Das_Soren_Higher_Secondary_School_Kundabai">Rohi Das Soren Higher Secondary School, Kundabai</option>
<option value="Indira_Gandhi_Mahila_Higher_Secondary_School_Udala">Indira Gandhi Mahila Higher Secondary School, Udala</option>
<option value="Udala_Higher_Secondary_School_Udala">Udala Higher Secondary School, Udala</option>
<option value="Panabedha_Higher_Secondary_School_Chandahandi">Panabedha Higher Secondary School, Chandahandi</option>
<option value="Bhairab_Higher_Secondary_School_Dabugan">Bhairab Higher Secondary School, Dabugan</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_BORIGAM">GOVT HIGHER SECONDARY SCHOOL, BORIGAM</option>
<option value="Jharigam_Higher_Secondary_School_Jharigam">Jharigam Higher Secondary School, Jharigam</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_BANKULI">GOVT HIGHER SECONDARY SCHOOL, BANKULI</option>
<option value="Raj_Chaunria_Higher_Secondary_School_Kodinga">Raj Chaunria Higher Secondary School, Kodinga</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_BHATIGAM">GOVT HIGHER SECONDARY SCHOOL, BHATIGAM</option>
<option value="Nabarangpur_Higher_Secondary_School_Nawarangpur">Nabarangpur Higher Secondary School, Nawarangpur</option>
<option value="Nawarangpur_Women's_Higher_Secondary_School_Nawarangpur">Nawarangpur Women's Higher Secondary School, Nawarangpur</option>
<option value="NANDAHANDI_GOVT_HIGHER_SECONDARY_SCHOOL">NANDAHANDI GOVT HIGHER SECONDARY SCHOOL</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_CHERCHETTA">GOVT HIGHER SECONDARY SCHOOL, CHERCHETTA</option>
<option value="Maidalpur_Higher_Secondary_School_Maidalpur">Maidalpur Higher Secondary School, Maidalpur</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_GONA">GOVT HIGHER SECONDARY SCHOOL, GONA</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_TURUDIHI">GOVT HIGHER SECONDARY SCHOOL, TURUDIHI</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Raighar">Panchayat Samiti Higher Secondary School, Raighar</option>
<option value="Indrabati_Project_Higher_Secondary_School_Khatiguda">Indrabati Project Higher Secondary School, Khatiguda</option>
<option value="SADASIBA_HIGHER_SECONDARY_SCHOOL_DAHANA">SADASIBA HIGHER SECONDARY SCHOOL, DAHANA</option>
<option value="Biju_Pattnaik_ST_Women's_Higher_Secondary_School_Umerkote">Biju Pattnaik ST Women's Higher Secondary School, Umerkote</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_JAMURUNDA">GOVT HIGHER SECONDARY SCHOOL, JAMURUNDA</option>
<option value="Pendrani_Higher_Secondary_School_Umerkote">Pendrani Higher Secondary School, Umerkote</option>
<option value="Bhapur_Anchalik_Higher_Secondary_School_Bhapur">Bhapur Anchalik Higher Secondary School, Bhapur</option>
<option value="Prahallad_Higher_Secondary_School_Padmavati">Prahallad Higher Secondary School, Padmavati</option>
<option value="Brundabana_Subudhi_Higher_Secondary_School_Daspalla">Brundabana Subudhi Higher Secondary School, Daspalla</option>
<option value="Krushna_Priya_Devi_Women's_Higher_Secondary_School_Daspalla">Krushna Priya Devi Women's Higher Secondary School, Daspalla</option>
<option value="Maninag_Bahumukhi_Higher_Secondary_School_Takara">Maninag Bahumukhi Higher Secondary School, Takara</option>
<option value="Banamali_Barik_Higher_Secondary_School_Adakata">Banamali Barik Higher Secondary School, Adakata</option>
<option value="Shree_Shree_Raghunath_Jew_Higher_Secondary_School_Gania">Shree Shree Raghunath Jew Higher Secondary School, Gania</option>
<option value="Nilamadhab_Higher_Secondary_School_Kantilo">Nilamadhab Higher Secondary School, Kantilo</option>
<option value="Pathani_Samanta_Higher_Secondary_School_Khandapara">Pathani Samanta Higher Secondary School, Khandapara</option>
<option value="Binodini_Mahila_Higher_Secondary_School_Banakati">Binodini Mahila Higher Secondary School, Banakati</option>
<option value="Haraprava_Higher_Secondary_School_Kalabadia">Haraprava Higher Secondary School, Kalabadia</option>
<option value="Laxmi_Kanta_Higher_Secondary_School_Bangriposi">Laxmi Kanta Higher Secondary School, Bangriposi</option>
<option value="Baba_Kakharua_Baidyanath_Higher_Secondary_School_Manatri">Baba Kakharua Baidyanath Higher Secondary School, Manatri</option>
<option value="Barasahi_Panchayat_Samiti_Higher_Secondary_School_Barasahi">Barasahi Panchayat Samiti Higher Secondary School, Barasahi</option>
<option value="Shree_Jagannath_Higher_Secondary_School_Balijoda">Shree Jagannath Higher Secondary School, Balijoda</option>
<option value="Baripada_Higher_Secondary_School_Baripada">Baripada Higher Secondary School, Baripada</option>
<option value="Krushna_Chandrapur_Higher_Secondary_School_Krushnachandrapur">Krushna Chandrapur Higher Secondary School, Krushnachandrapur</option>
<option value="Sri_Maa_Mahila_Higher_Secondary_School_Baripada">Sri Maa Mahila Higher Secondary School, Baripada</option>
<option value="Sri_Rama_Chandra_Bhanj_Higher_Secondary_School_Ragdha">Sri Rama Chandra Bhanj Higher Secondary School, Ragdha</option>
<option value="Maharaja_Purna_Chandra_Higher_Secondary_School_Baripada">Maharaja Purna Chandra Higher Secondary School, Baripada</option>
<option value="Anla_Higher_Secondary_School_Anla">Anla Higher Secondary School, Anla</option>
<option value="Betnoti_Higher_Secondary_School_Betnoti">Betnoti Higher Secondary School, Betnoti</option>
<option value="Mahatma_Gandhi_Higher_Secondary_School_Baisingha">Mahatma Gandhi Higher Secondary School, Baisingha</option>
<option value="Kailash_Chandra_Dilip_Kumar_Higher_Secondary_School_Bijatola">Kailash Chandra Dilip Kumar Higher Secondary School, Bijatola</option>
<option value="Rajanikanta_Higher_Secondary_School_Luhasila">Rajanikanta Higher Secondary School, Luhasila</option>
<option value="Gouri_Shankar_Higher_Secondary_School_Khadiasole">Gouri Shankar Higher Secondary School, Khadiasole</option>
<option value="Kalinga_Higher_Secondary_School_Manada">Kalinga Higher Secondary School, Manada</option>
<option value="Anchalika_Higher_Secondary_School_Puruna_Baripada">Anchalika Higher Secondary School, Puruna Baripada</option>
<option value="Saraswata_Higher_Secondary_School_Kuamara">Saraswata Higher Secondary School, Kuamara</option>
<option value="LSPS_GOVT_HIGHER_SECONDARY_SCHOOL_MORANDA">LSPS GOVT HIGHER SECONDARY SCHOOL, MORANDA</option>
<option value="Saheed_Birsa_Munda_Higher_Secondary_School_Jamda">Saheed Birsa Munda Higher Secondary School, Jamda</option>
<option value="Jashipur_Higher_Secondary_School_Jashipur">Jashipur Higher Secondary School, Jashipur</option>
<option value="Ridayanath_Higher_Secondary_School_Barbil">Ridayanath Higher Secondary School, Barbil</option>
<option value="Kaptipada_Higher_Secondary_School_Kaptipada">Kaptipada Higher Secondary School, Kaptipada</option>
<option value="Kaptipada_Higher_Secondary_School_Nuasahi">Kaptipada Higher Secondary School, Nuasahi</option>
<option value="Meghasan_Higher_Secondary_School_Nudadiha">Meghasan Higher Secondary School, Nudadiha</option>
<option value="Pandit_Raghunath_Murmu_Higher_Secondary_School_Sarat">Pandit Raghunath Murmu Higher Secondary School, Sarat</option>
<option value="Deo_Higher_Secondary_School_Tato">Deo Higher Secondary School, Tato</option>
<option value="Raghunath_Higher_Secondary_School_Kadadiha">Raghunath Higher Secondary School, Kadadiha</option>
<option value="Karanjia_Higher_Secondary_School_Karanjia">Karanjia Higher Secondary School, Karanjia</option>
<option value="Panchapir_Womens_Higher_Secondary_School_Karanjia">Panchapir Womens Higher Secondary School, Karanjia</option>
<option value="Bhanjabhumi_Higher_Secondary_School_Dukura">Bhanjabhumi Higher Secondary School, Dukura</option>
<option value="Dhanghera_Higher_Secondary_School_Dhanghera">Dhanghera Higher Secondary School, Dhanghera</option>
<option value="Khunta_Higher_Secondary_School_Khunta">Khunta Higher Secondary School, Khunta</option>
<option value="Panchapalli_Higher_Secondary_School_Sainkula">Panchapalli Higher Secondary School, Sainkula</option>
<option value="Baigan_Badia_Higher_Secondary_School_Baiganbadia">Baigan Badia Higher Secondary School, Baiganbadia</option>
<option value="Maa_Duarsuni_Higher_Secondary_School_Kuabuda">Maa Duarsuni Higher Secondary School, Kuabuda</option>
<option value="Badampahar_Higher_Secondary_School_Badampahar">Badampahar Higher Secondary School, Badampahar</option>
<option value="Janaki_Balava_Higher_Secondary_School_Hatabhadra">Janaki Balava Higher Secondary School, Hatabhadra</option>
<option value="Baba_Jateswar_Higher_Secondary_School_Chataraipur">Baba Jateswar Higher Secondary School, Chhataraipur</option>
<option value="Chitrada_Higher_Secondary_School_Chitrada">Chitrada Higher Secondary School, Chitrada</option>
<option value="Gadia_Anchalika_Higher_Secondary_School_Gadia">Gadia Anchalika Higher Secondary School, Gadia</option>
<option value="Gorumahisani_Iron_Higher_Secondary_School_Gorumahisani">Gorumahisani Iron Higher Secondary School, Gorumahisani</option>
<option value="Mahila_Higher_Secondary_School_Rairangpur">Mahila Higher Secondary School, Rairangpur</option>
<option value="Rairangpur_Higher_Secondary_School_Rairangpur">Rairangpur Higher Secondary School, Rairangpur</option>
<option value="Angarpada_Panchayat_Higher_Secondary_School_Raruan">Angarpada Panchayat Higher Secondary School, Raruan</option>
<option value="Biju_Patnaik_Higher_Secondary_School_Ghagarbeda">Biju Patnaik Higher Secondary School, Ghagarbeda</option>
<option value="Chaitanya_Prasad_Higher_Secondary_School_Bhanjakia">Chaitanya Prasad Higher Secondary School, Bhanjakia</option>
<option value="Binod_Bihari_Anchalik_Higher_Secondary_School_Rasgovindpur">Binod Bihari Anchalik Higher Secondary School, Rasgovindpur</option>
<option value="Khurda_Womens_Higher_Secondary_School_Khurda">Khurda Women's Higher Secondary School, Khurda</option>
<option value="Prananath_Higher_Secondary_School_Khurda">Prananath Higher Secondary School, Khurda</option>
<option value="Durga_Charan_Chilika_Higher_Secondary_School_Tangi">Durga Charan Chilika Higher Secondary School, Tangi</option>
<option value="Janata_Higher_Secondary_School_Kuhudi">Janata Higher Secondary School, Kuhudi</option>
<option value="Kshetrabasi_Dayananda_Anglovedic_Higher_Secondary_School_Nirakarpur">Kshetrabasi Dayananda Anglovedic Higher Secondary School, Nirakarpur</option>
<option value="Raghunath_Adarsha_Higher_Secondary_School_Olasingha">Raghunath Adarsha Higher Secondary School, Olasingha</option>
<option value="Ramachandra_Kalpana_Higher_Secondary_School_Kamaguru">Ramachandra Kalpana Higher Secondary School, Kamaguru</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_BANDHUGAM">GOVT HIGHER SECONDARY SCHOOL, BANDHUGAM</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_KAKALPADA">GOVT HIGHER SECONDARY SCHOOL, KAKALPADA</option>
<option value="Saheed_Laxman_Nayak_Higher_Secondary_School_Boipariguda">Saheed Laxman Nayak Higher Secondary School, Boipariguda</option>
<option value="Bhairaba_Higher_Secondary_School_Borigumma">Bhairaba Higher Secondary School, Borigumma</option>
<option value="Narasingha_Higher_Secondary_School_Tarabhatta">Narasingha Higher Secondary School, Tarabhatta</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_PODAGADA">GOVT HIGHER SECONDARY SCHOOL, PODAGADA</option>
<option value="Radha_Krishna_Adivasi_Higher_Secondary_School_Dasmanthpur">Radha Krishna Adivasi Higher Secondary School, Dasmanthpur</option>
<option value="Government_Womens_Higher_Secondary_School_Jeypore">Government Women's Higher Secondary School, Jeypore</option>
<option value="Vikram_Deb_Higher_Secondary_School_Jeypore">Vikram Deb Higher Secondary School, Jeypore</option>
<option value="Dr_B_R_A_Higher_Secondary_School_Koraput">Dr. B.R.A. Higher Secondary School, Koraput</option>
<option value="Government_Higher_Secondary_School_Landiguda_Koraput">Government Higher Secondary School, Landiguda, Koraput</option>
<option value="Government_Womens_Higher_Secondary_School_Koraput">Government Women's Higher Secondary School, Koraput</option>
<option value="Kotpad_Higher_Secondary_School_Kotpad">Kotpad Higher Secondary School, Kotpad</option>
<option value="Biju_Patnaik_Higher_Secondary_School_Kundra">Biju Patnaik Higher Secondary School, Kundra</option>
<option value="Dr_B_R_A_Higher_Secondary_School_Lamtaput">Dr. B.R.A. Higher Secondary School, Lamtaput</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_KAKIRIGUMMA">GOVT HIGHER SECONDARY SCHOOL, KAKIRIGUMMA</option>
<option value="Laxmipur_Higher_Secondary_School_Laxmipur">Laxmipur Higher Secondary School, Laxmipur</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_PADWA">GOVT HIGHER SECONDARY SCHOOL, PADWA</option>
<option value="Sindha_Devi_Higher_Secondary_School_Nandapur">Sindha Devi Higher Secondary School, Nandapur</option>
<option value="Radha_Krishna_Higher_Secondary_School_Narayanpatana">Radha Krishna Higher Secondary School, Narayanpatana</option>
<option value="Gangeswari_Higher_Secondary_School_Pottangi">Gangeswari Higher Secondary School, Pottangi</option>
<option value="Semiliguda_Higher_Secondary_School_Seimiliguda">Semiliguda Higher Secondary School, Seimiliguda</option>
<option value="Sunabedha_Womens_Higher_Secondary_School_Sunabeda">Sunabedha Women's Higher Secondary School, Sunabeda</option>
<option value="Gopabandhu_Anchalika_Higher_Secondary_School_Kalimela">Gopabandhu Anchalika Higher Secondary School, Kalimela</option>
<option value="MPV_21_GOVT_HIGHER_SECONDARY_SCHOOL_KALIMELA">MPV 21 GOVT HIGHER SECONDARY SCHOOL, KALIMELA</option>
<option value="Biju_Patnaik_Higher_Secondary_School_of_Education_Govindapali">Biju Patnaik Higher Secondary School of Education, Govindapali</option>
<option value="Balimela_Higher_Secondary_School_of_Technology_Niladrinagar">Balimela Higher Secondary School of Technology, Niladrinagar</option>
<option value="CHITRAKONDA_GOVT_BOYS_HIGHER_SECONDARY_SCHOOL">CHITRAKONDA GOVT BOYS HIGHER SECONDARY SCHOOL</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_KORUKONDA">GOVT HIGHER SECONDARY SCHOOL, KORUKONDA</option>
<option value="Darwin_Memorial_Higher_Secondary_School_Kudulugumma">Darwin Memorial Higher Secondary School, Kudulugumma</option>
<option value="Govt_Higher_Secondary_School_Darlabeda">Govt Higher Secondary School, Darlabeda</option>
<option value="BL_GOVT_HIGHER_SECONDARY_SCHOOL_SERPALLY">BL GOVT HIGHER SECONDARY SCHOOL, SERPALLY</option>
<option value="Malkangiri_Higher_Secondary_School_Malkangiri">Malkangiri Higher Secondary School, Malkangiri</option>
<option value="Government_Science_Higher_Secondary_School_Malkanagiri">Government Science Higher Secondary School, Malkanagiri</option>
<option value="Womens_Higher_Secondary_School_Malkangiri">Women's Higher Secondary School, Malkangiri</option>
<option value="BAPUJI_GOVT_HIGHER_SECONDARY_SCHOOL_ANLAPADAR">BAPUJI GOVT HIGHER SECONDARY SCHOOL, ANLAPADAR</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_SALIMI">GOVT HIGHER SECONDARY SCHOOL, SALIMI</option>
<option value="Utkalmani_Gopabandhu_Higher_Secondary_School_Mathili">Utkalmani Gopabandhu Higher Secondary School, Mathili</option>
<option value="Dr_Shyam_Prasad_Higher_Secondary_School_MV-79">Dr. Shyam Prasad Higher Secondary School, MV-79</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_URUBALLI">GOVT HIGHER SECONDARY SCHOOL, URUBALLI</option>
<option value="Regional_Higher_Secondary_School_Podia">Regional Higher Secondary School, Podia</option>
<option value="Dhirajlal_Higher_Secondary_School_Bahalda">Dhirajlal Higher Secondary School, Bahalda</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_JHARADIHI">GOVT HIGHER SECONDARY SCHOOL, JHARADIHI</option>
<option value="Gopaljew_Higher_Secondary_School_Benamunda">Gopaljew Higher Secondary School, Benamunda</option>
<option value="SHREE_JAGANATH_GOVT_HIGHER_SECONDARY_SCHOOL_GOLABANDHA">SHREE JAGANATH GOVT HIGHER SECONDARY SCHOOL, GOLABANDHA</option>
<option value="Sirigida_Anchalika_Bigyan_Higher_Secondary_School_Sirigida">Sirigida Anchalika Bigyan Higher Secondary School, Sirigida</option>
<option value="Jawaharlal_Nehru_Higher_Secondary_School_Balianta">Jawaharlal Nehru Higher Secondary School, Balianta</option>
<option value="Pratap_Sasan_Higher_Secondary_School_Balakati">Pratap Sasan Higher Secondary School, Balakati</option>
<option value="Sri_Sri_Baneswar_Higher_Secondary_School_Bentapur">Sri Sri Baneswar Higher Secondary School, Bentapur</option>
<option value="Banamalipur_Higher_Secondary_School_Banamalipur">Banamalipur Higher Secondary School, Banamalipur</option>
<option value="Odakhanda_Higher_Secondary_School_Odakhanda">Odakhanda Higher Secondary School, Odakhanda</option>
<option value="Sishu_Ananta_Higher_Secondary_School_Balipatna">Sishu Ananta Higher Secondary School, Balipatna</option>
<option value="Balugaon_Higher_Secondary_School_Balugaon">Balugaon Higher Secondary School, Balugaon</option>
<option value="BHETINATH_DEV_GOVT_HIGHER_SECONDARY_SCHOOL_BHETESWAR">BHETINATH DEV GOVT HIGHER SECONDARY SCHOOL, BHETESWAR</option>
<option value="Nachuni_Higher_Secondary_School_Nachuni">Nachuni Higher Secondary School, Nachuni</option>
<option value="Parsuram_Higher_Secondary_School_Gambharimunda">Parsuram Higher Secondary School, Gambharimunda</option>
<option value="Rural_Womens_Higher_Secondary_School_Banapur">Rural Women's Higher Secondary School, Banapur</option>
<option value="Godavarish_Higher_Secondary_School_Banapur">Godavarish Higher Secondary School, Banapur</option>
<option value="Begunia_Higher_Secondary_School_Begunia">Begunia Higher Secondary School, Begunia</option>
<option value="Hattakeswar_Mahila_Higher_Secondary_School_Baghamari">Hattakeswar Mahila Higher Secondary School, Baghamari</option>
<option value="Rama_Chandi_Higher_Secondary_School_Gadamanitri">Rama Chandi Higher Secondary School, Gadamanitri</option>
<option value="Rama_Mani_Higher_Secondary_School_Kantabada">Rama Mani Higher Secondary School, Kantabada</option>
<option value="Chandaka_Higher_Secondary_School_Chandaka">Chandaka Higher Secondary School, Chandaka</option>
<option value="Kunja_Bihari_Higher_Secondary_School_Baranga">Kunja Bihari Higher Secondary School, Baranga</option>
<option value="Acharya_Harihar_Higher_Secondary_School_Chandrasekharpur">Acharya Harihar Higher Secondary School, Chandrasekharpur</option>
<option value="Ambedkar_Centenary_Higher_Secondary_School_of_Education_Technology_Dumduma">Ambedkar Centenary Higher Secondary School of Education & Technology, Dumduma</option>
<option value="Biju_Pattnaik_Higher_Secondary_School_of_Science_Education_Bhubaneswar">Biju Patnaik Higher Secondary School of Science & Education, Bhubaneswar</option>
<option value="Buxi_Jagabandhu_Bidyadhar_Higher_Secondary_School_Bhubaneswar">Buxi Jagabandhu Bidyadhar Higher Secondary School, Bhubaneswar</option>
<option value="City_Womens_Higher_Secondary_School_Siripur">City Women's Higher Secondary School, Siripur</option>
<option value="Deb_Ray_Nayapalli_Higher_Secondary_School_Bhubaneswar">Deb Ray Nayapalli Higher Secondary School, Bhubaneswar</option>
<option value="Ekamra_Higher_Secondary_School_Bhubaneswar">Ekamra Higher Secondary School, Bhubaneswar</option>
<option value="Kamala_Nehru_Womens_Higher_Secondary_School_Bhubaneswar">Kamala Nehru Women's Higher Secondary School, Bhubaneswar</option>
<option value="Maharishi_Higher_Secondary_School_of_Natural_Law_Bhubaneswar">Maharishi Higher Secondary School of Natural Law, Bhubaneswar</option>
<option value="Maharshi_Womens_Higher_Secondary_School_Sailashree_Vihar">Maharshi Women's Higher Secondary School, Sailashree Vihar</option>
<option value="Raja_Madhusudan_Dev_Higher_Secondary_School_of_Science_Education_Patia">Raja Madhusudan Dev Higher Secondary School of Science & Education, Patia</option>
<option value="Rajdhani_Higher_Secondary_School_Bhubaneswar">Rajdhani Higher Secondary School, Bhubaneswar</option>
<option value="Rama_Devi_Womens_Higher_Secondary_School_Bhubaneswar">Rama Devi Women's Higher Secondary School, Bhubaneswar</option>
<option value="Sri_Jayadev_Higher_Secondary_School_of_Education_Technology_Naharkanta">Sri Jayadev Higher Secondary School of Education & Technology, Naharkanta</option>
<option value="Sri_Satya_Sai_Higher_Secondary_School_for_Women_Pokhriput">Sri Satya Sai Higher Secondary School for Women, Pokhriput</option>
<option value="Kali_Charan_Panchagarh_Ananga_Narendra_Higher_Secondary_School_Bankoi">Kali Charan Panchagarh Ananga Narendra Higher Secondary School, Bankoi</option>
<option value="Maa_Sarada_Womens_Higher_Secondary_School_Tikatal">Maa Sarada Women's Higher Secondary School, Tikatal</option>
<option value="Parama_Nanda_Higher_Secondary_School_Bolagarh">Parama Nanda Higher Secondary School, Bolagarh</option>
<option value="Raghunath_Higher_Secondary_School_Deuli">Raghunath Higher Secondary School, Deuli</option>
<option value="Panchupalli_Bhima_Balabantaray_Higher_Secondary_School_AnkulachatI">Panchupalli Bhima Balabantaray Higher Secondary School, AnkulachatI</option>
<option value="Bauri_Bandhu_Higher_Secondary_School_Chhatabar">Bauri Bandhu Higher Secondary School, Chhatabar</option>
<option value="Sanatan_Harichandan_Higher_Secondary_School_Madanpur">Sanatan Harichandan Higher Secondary School, Madanpur</option>
<option value="Sarat_Paikray_Higher_Secondary_School_Argul">Sarat Paikray Higher Secondary School, Argul</option>
<option value="Sri_Somanath_Balunkeswar_Dev_Mahila_Higher_Secondary_School_Kantia">Sri Somanath Balunkeswar Dev Mahila Higher Secondary School, Kantia</option>
<option value="Jatani_Higher_Secondary_School_Jatni">Jatani Higher Secondary School, Jatni</option>
<option value="Haladia_Higher_Secondary_School_Haladia">Haladia Higher Secondary School, Haladia</option>
<option value="Kabi_Prasanna_Patasani_Anchalika_Higher_Secondary_School_Malipada">Kabi Prasanna Patasani Anchalika Higher Secondary School, Malipada</option>
<option value="Kerang_Panchayat_Higher_Secondary_School_Kerang">Kerang Panchayat Higher Secondary School, Kerang</option>
<option value="Sri_Jagannath_Higher_Secondary_School_Kaipadar">Sri Jagannath Higher Secondary School, Kaipadar</option>
<option value="NAGANARAYAN_GOVT_HIGHER_SECONDARY_SCHOOL_DANGAMAL">NAGANARAYAN GOVT HIGHER SECONDARY SCHOOL, DANGAMAL</option>
<option value="Nalinikanta_Higher_Secondary_School_Chandibaunsamul">Nalinikanta Higher Secondary School, Chandibaunsamul</option>
<option value="Sri_Sri_Jagannath_Higher_Secondary_School_Rajnagar">Sri Sri Jagannath Higher Secondary School, Rajnagar</option>
<option value="Swapneswar_Higher_Secondary_School_Barahpur">Swapneswar Higher Secondary School, Barahpur</option>
<option value="Beleswar_Higher_Secondary_School_Belbahali">Beleswar Higher Secondary School, Belbahali</option>
<option value="Kantipal_Anchalika_Higher_Secondary_School_Anandapur">Kantipal Anchalika Higher Secondary School, Anandapur</option>
<option value="LD_GOVT_HIGHER_SECONDARY_SCHOOL_KODAPADA">LD GOVT HIGHER SECONDARY SCHOOL, KODAPADA</option>
<option value="Salbani_G.P._Higher_Secondary_School_Salabani">Salbani G.P. Higher Secondary School, Salabani</option>
<option value="Anandapur_Higher_Secondary_School_Anandapur">Anandapur Higher Secondary School, Anandapur</option>
<option value="Kanak_Manjari_Womens_Higher_Secondary_School_Salapada">Kanak Manjari Women's Higher Secondary School, Salapada</option>
<option value="BAITARANI_GOVT_HIGHER_SECONDARY_SCHOOL">BAITARANI GOVT HIGHER SECONDARY SCHOOL</option>
<option value="PANCHAYAT_GOVT_HIGHER_SECONDARY_SCHOOL_TARAMAKANT">PANCHAYAT GOVT HIGHER SECONDARY SCHOOL, TARAMAKANT</option>
<option value="Pateswar_Higher_Secondary_School_Suakati">Pateswar Higher Secondary School, Suakati</option>
<option value="Barbil_Higher_Secondary_School_Barbil">Barbil Higher Secondary School, Barbil</option>
<option value="Chandra_Sekhar_Higher_Secondary_School_Champua">Chandra Sekhar Higher Secondary School, Champua</option>
<option value="Mahila_Higher_Secondary_School_Champua">Mahila Higher Secondary School, Champua</option>
<option value="Mohandas_Karamchand_Gandhi_Higher_Secondary_School_Sarangi">Mohandas Karamchand Gandhi Higher Secondary School, Sarangi</option>
<option value="Rimuli_Higher_Secondary_School_Rimuli">Rimuli Higher Secondary School, Rimuli</option>
<option value="Jagannath_Higher_Secondary_School_Paramanandapur">Jagannath Higher Secondary School, Paramanandapur</option>
<option value="Kushaleswar_Anchalik_Higher_Secondary_School_Rekutia">Kushaleswar Anchalik Higher Secondary School, Rekutia</option>
<option value="Patita_Paban_Higher_Secondary_School_Sainkula">Patita Paban Higher Secondary School, Sainkula</option>
<option value="Laxmi_Narayan_Higher_Secondary_School_Pipilia">Laxmi Narayan Higher Secondary School, Pipilia</option>
<option value="Regional_S.N._Higher_Secondary_School_Dhenkikote">Regional S.N. Higher Secondary School, Dhenkikote</option>
<option value="Tarini_Thakurani_Higher_Secondary_School_Ghatagaon">Tarini Thakurani Higher Secondary School, Ghatagaon</option>
<option value="Brajabandhu_Higher_Secondary_School_Harichandanpur">Brajabandhu Higher Secondary School, Harichandanpur</option>
<option value="Mahapat_Higher_Secondary_School_Janghira">Mahapat Higher Secondary School, Janghira</option>
<option value="Rangpat_Higher_Secondary_School_Pandapara">Rangpat Higher Secondary School, Pandapara</option>
<option value="Biswa_Tarini_Womens_Higher_Secondary_School_Chhenapadi">Biswa Tarini Women's Higher Secondary School, Chhenapadi</option>
<option value="Boula_Higher_Secondary_School_Soso">Boula Higher Secondary School, Soso</option>
<option value="Hatadihi_Anchalika_Higher_Secondary_School_Hatadihi">Hatadihi Anchalika Higher Secondary School, Hatadihi</option>
<option value="Sadang_Anchalika_Higher_Secondary_School_Sadang">Sadang Anchalika Higher Secondary School, Sadang</option>
<option value="Jhumpura_Panchayat_Samiti_Higher_Secondary_School_Jhumpura">Jhumpura Panchayat Samiti Higher Secondary School, Jhumpura</option>
<option value="Maa_Gramyashree_Higher_Secondary_School_Naradpur">Maa Gramyashree Higher Secondary School, Naradpur</option>
<option value="Utkalmani_Gopabandhu_Higher_Secondary_School_Ukhunda">Utkalmani Gopabandhu Higher Secondary School, Ukhunda</option>
<option value="SREE_JAGANNATH_GOVT_HIGHER_SECONDARY_SCHOOL_JORALI">SREE JAGANNATH GOVT HIGHER SECONDARY SCHOOL, JORALI</option>
<option value="Joda_Womens_Higher_Secondary_School_Joda">Joda Women's Higher Secondary School, Joda</option>
<option value="Padmapur_Anchalika_Higher_Secondary_School_Padmapur">Padmapur Anchalika Higher Secondary School, Padmapur</option>
<option value="Raisuan_Higher_Secondary_School_Raisuan">Raisuan Higher Secondary School, Raisuan</option>
<option value="Santosi_Maa_Regional_Higher_Secondary_School_Jharbelda">Santosi Maa Regional Higher Secondary School, Jharbelda</option>
<option value="Dharanidhar_Higher_Secondary_School_Keonjhar">Dharanidhar Higher Secondary School, Keonjhar</option>
<option value="Government_Womens_Higher_Secondary_School_Keonjhar">Government Women's Higher Secondary School, Keonjhar</option>
<option value="Keonjhar_Higher_Secondary_School_Keonjhar">Keonjhar Higher Secondary School, Keonjhar</option>
<option value="PRAGATI_GOVT_HIGHER_SECONDARY_SCHOOL_MAIDANKEL">PRAGATI GOVT HIGHER SECONDARY SCHOOL, MAIDANKEL</option>
<option value="Bhimkund_Higher_Secondary_School_Dumuria">Bhimkund Higher Secondary School, Dumuria</option>
<option value="Dadhi_Baman_Higher_Secondary_School_Turumunga">Dadhi Baman Higher Secondary School, Turumunga</option>
<option value="Swampatna_Anchalika_Higher_Secondary_School_Swampatna">Swampatna Anchalika Higher Secondary School, Swampatna</option>
<option value="Machhagarh_Higher_Secondary_School_Machhagarh">Machhagarh Higher Secondary School, Machhagarh</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Saharpara">Panchayat Samiti Higher Secondary School, Saharpara</option>
<option value="Udayapur_Anchalika_Higher_Secondary_School_Udayapur">Udayapur Anchalika Higher Secondary School, Udayapur</option>
<option value="Charigarh_Higher_Secondary_School_Telkoi">Charigarh Higher Secondary School, Telkoi</option>
<option value="Government_Higher_Secondary_School_Phulbani">Government Higher Secondary School, Phulbani</option>
<option value="Sanjaya_Memorial_Government_Womens_Higher_Secondary_School_Phulbani">Sanjaya Memorial Government Women's Higher Secondary School, Phulbani</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_BADABARABA">GOVT HIGHER SECONDARY SCHOOL, BADABARABA</option>
<option value="Jeevan_Jyoti_Higher_Secondary_School_Raikia">Jeevan Jyoti Higher Secondary School, Raikia</option>
<option value="AMCS_Higher_Secondary_School_Tikaballi">AMCS Higher Secondary School, Tikaballi</option>
<option value="Netaji_Subash_Boss_Higher_Secondary_School_Tumudibandha">Netaji Subash Boss Higher Secondary School, Tumudibandha</option>
<option value="Aul_Higher_Secondary_School_Aul">Aul Higher Secondary School, Aul</option>
<option value="Debaray_Samarsingh_Higher_Secondary_School_Ganeswarpur">Debaray Samarsingh Higher Secondary School, Ganeswarpur</option>
<option value="Gandhi_Memorial_Higher_Secondary_School_Govindpur">Gandhi Memorial Higher Secondary School, Govindpur</option>
<option value="Laxmi_Barah_Higher_Secondary_School_Ayatpur">Laxmi Barah Higher Secondary School, Ayatpur</option>
<option value="Olaver_Higher_Secondary_School_Olaver">Olaver Higher Secondary School, Olaver</option>
<option value="Sushree_Devi_Womens_Higher_Secondary_School_Aul">Sushree Devi Women's Higher Secondary School, Aul</option>
<option value="Delta_Higher_Secondary_School_Bhitarabampu">Delta Higher Secondary School, Bhitarabampu</option>
<option value="Derabish_Higher_Secondary_School_Derabish">Derabish Higher Secondary School, Derabish</option>
<option value="Derabish_Mahila_Higher_Secondary_School_Derabish">Derabish Mahila Higher Secondary School, Derabish</option>
<option value="Hrudananda_Nayak_Smaraki_Higher_Secondary_School_Chandol">Hrudananda Nayak Smaraki Higher Secondary School, Chandol</option>
<option value="Bijaya_Higher_Secondary_School_Tyendukura">Bijaya Higher Secondary School, Tyendukura</option>
<option value="Chitrotpala_Womens_Higher_Secondary_School_Korua">Chitrotpala Women's Higher Secondary School, Korua</option>
<option value="Gopinathpur_Sanskrit_Higher_Secondary_School">Gopinathpur Sanskrit Higher Secondary School</option>
<option value="Korua_Womens_Higher_Secondary_School_Korua">Korua Women's Higher Secondary School, Korua</option>
<option value="Lokanath_Higher_Secondary_School_Patkura">Lokanath Higher Secondary School, Patkura</option>
<option value="Manab_Sambal_Vikas_Mahila_Higher_Secondary_School_Kalabuda">Manab Sambal Vikas Mahila Higher Secondary School, Kalabuda</option>
<option value="Balia_Womens_Higher_Secondary_School_Balia">Balia Women's Higher Secondary School, Balia</option>
<option value="Birupa_Higher_Secondary_School_Indipur">Birupa Higher Secondary School, Indipur</option>
<option value="Government_Science_Higher_Secondary_School_Ayeba">Government Science Higher Secondary School, Ayeba</option>
<option value="Swami_Vivekananda_Manab_Sambal_Vikas_Higher_Secondary_School_Chaudakulat">Swami Vivekananda Manab Sambal Vikas Higher Secondary School, Chaudakulat</option>
<option value="Veer_Hanumanjew_Higher_Secondary_School_Nikirai">Veer Hanumanjew Higher Secondary School, Nikirai</option>
<option value="Kendrapada_Evening_Higher_Secondary_School_Kendrapara">Kendrapada Evening Higher Secondary School, Kendrapara</option>
<option value="Kendrapara_Higher_Secondary_School_Kendrapara">Kendrapara Higher Secondary School, Kendrapara</option>
<option value="Tulasi_Womens_Higher_Secondary_School_Kendrapara">Tulasi Women's Higher Secondary School, Kendrapara</option>
<option value="Binapani_Higher_Secondary_School_Gayaspur">Binapani Higher Secondary School, Gayaspur</option>
<option value="Maa_Tarini_Higher_Secondary_School_Jayachandrapur">Maa Tarini Higher Secondary School, Jayachandrapur</option>
<option value="RAMACHANDI_BIJAYANANDA_GOVT_HIGHER_SECONDARY_SCHOOL_RAMNAGAR">RAMACHANDI BIJAYANANDA GOVT HIGHER SECONDARY SCHOOL, RAMNAGAR</option>
<option value="Sri_Sri_Bayababa_Higher_Secondary_School_Mahakalpar">Sri Sri Bayababa Higher Secondary School, Mahakalpar</option>
<option value="Thakur_Nigamananda_Higher_Secondary_School_Nigamavihar">Thakur Nigamananda Higher Secondary School, Nigamavihar</option>
<option value="Biju_Patnaik_Higher_Secondary_School_Antei">Biju Patnaik Higher Secondary School, Antei</option>
<option value="Chitrotpola_Higher_Secondary_School_Akhua_Odanga">Chitrotpola Higher Secondary School, Akhua Odanga</option>
<option value="Gandhi_Uccha_Madhyamik_Higher_Secondary_School_Ayatpur">Gandhi Uccha Madhyamik Higher Secondary School, Ayatpur</option>
<option value="Karilopatna_Higher_Secondary_School_Karilopatna">Karilopatna Higher Secondary School, Karilopatna</option>
<option value="Marshaghai_Higher_Secondary_School_Marshaghai">Marshaghai Higher Secondary School, Marshaghai</option>
<option value="Marshaghai_Womens_Higher_Secondary_School_Marshaghai">Marshaghai Women's Higher Secondary School, Marshaghai</option>
<option value="Barpara_Higher_Secondary_School_Barpara">Barpara Higher Secondary School, Barpara</option>
<option value="Brahmani_Higher_Secondary_School_Dandisahi">Brahmani Higher Secondary School, Dandisahi</option>
<option value="U_K_Mahavir_Higher_Secondary_School_Madanpur">U.K. Mahavir Higher Secondary School, Madanpur</option>
<option value="Ushadevi_Womens_Higher_Secondary_School_Andara">Ushadevi Women's Higher Secondary School, Andara</option>
<option value="Pattamundai_Higher_Secondary_School_Pattamundai">Pattamundai Higher Secondary School, Pattamundai</option>
<option value="Pattamundai_Womens_Higher_Secondary_School_Pattamundai">Pattamundai Women's Higher Secondary School, Pattamundai</option>
<option value="Barha_Regional_Science_Higher_Secondary_School_Hatasahi_Katchery">Barha Regional Science Higher Secondary School, Hatasahi Katchery</option>
<option value="Kapileswar_Higher_Secondary_School_Katna">Kapileswar Higher Secondary School, Katna</option>
<option value="Sailendra_Narayan_Higher_Secondary_School_Rajkanika">Sailendra Narayan Higher Secondary School, Rajkanika</option>
<option value="Lakhi_Ram_Agrawal_Higher_Secondary_School_Behera">Lakhi Ram Agrawal Higher Secondary School, Behera</option>
<option value="Panchayat_Higher_Secondary_School_Dharamgarh">Panchayat Higher Secondary School, Dharamgarh</option>
<option value="Anchalika_Bastarani_Higher_Secondary_School_Sanchergaon">Anchalika Bastarani Higher Secondary School, Sanchergaon</option>
<option value="Sarbamangala_Higher_Secondary_School_Golamunda">Sarbamangala Higher Secondary School, Golamunda</option>
<option value="Semlian_Higher_Secondary_School_Chichia">Semlian Higher Secondary School, Chichia</option>
<option value="Indrabati_Higher_Secondary_School_Jaipatna">Indrabati Higher Secondary School, Jaipatna</option>
<option value="Patitapaban_Higher_Secondary_School_Arebeda">Patitapaban Higher Secondary School, Arebeda</option>
<option value="BALAJEE_GOVT_HIGHER_SECONDARY_SCHOOL_MAHICHALA">BALAJEE GOVT HIGHER SECONDARY SCHOOL, MAHICHALA</option>
<option value="Chichaiguda_Higher_Secondary_School_Chichaiguda">Chichaiguda Higher Secondary School, Chichaiguda</option>
<option value="Swami_Chidananda_Higher_Secondary_School_Karchala">Swami Chidananda Higher Secondary School, Karchala</option>
<option value="Chamelidevi_Womens_Higher_Secondary_School_Junagarh_NAC">Chamelidevi Women's Higher Secondary School, Junagarh (NAC)</option>
<option value="Priyadarshini_Indira_Higher_Secondary_School_Junagarh">Priyadarshini Indira Higher Secondary School, Junagarh</option>
<option value="Amohamani_Higher_Secondary_School_Kalampur">Amohamani Higher Secondary School, Kalampur</option>
<option value="Mahabharat_Higher_Secondary_School_Bijamara">Mahabharat Higher Secondary School, Bijamara</option>
<option value="Hara_Gouri_Higher_Secondary_School_Kusurla">Hara Gouri Higher Secondary School, Kusurla</option>
<option value="Jagannath_Kausalya_Higher_Secondary_School_Risida">Jagannath Kausalya Higher Secondary School, Risida</option>
<option value="Kashrupada_Higher_Secondary_School_Kashrupada">Kashrupada Higher Secondary School, Kashrupada</option>
<option value="Panchayat_Higher_Secondary_School_Belkhandi">Panchayat Higher Secondary School, Belkhandi</option>
<option value="Utkela_Higher_Secondary_School_Utkela">Utkela Higher Secondary School, Utkela</option>
<option value="Kesinga_Higher_Secondary_School_Kesinga">Kesinga Higher Secondary School, Kesinga</option>
<option value="Ladugaon_Higher_Secondary_School_Ladugaon">Ladugaon Higher Secondary School, Ladugaon</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Koksara">Panchayat Samiti Higher Secondary School, Koksara</option>
<option value="Lanjigarh_Road_Higher_Secondary_School_Lanjigarh_Road">Lanjigarh Road Higher Secondary School, Lanjigarh Road</option>
<option value="Maa_Heera_Neela_Higher_Secondary_School_Biswanathpur">Maa Heera Neela Higher Secondary School, Biswanathpur</option>
<option value="Madanpur_Rampur_Higher_Secondary_School_Madanpur_Rampur">Madanpur Rampur Higher Secondary School, Madanpur Rampur</option>
<option value="Bijayananda_Panchayat_Higher_Secondary_School_Tulapada">Bijayananda Panchayat Higher Secondary School, Tulapada</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_ULIKUPA">GOVT HIGHER SECONDARY SCHOOL ULIKUPA</option>
<option value="Milita_Panchayat_Higher_Secondary_School_Muskuti">Milita Panchayat Higher Secondary School, Muskuti</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Narla">Panchayat Samiti Higher Secondary School, Narla</option>
<option value="RADHAKRISHNA_GOVT_HIGHER_SECONDARY_SCHOOL_SANTPUR">RADHAKRISHNA GOVT HIGHER SECONDARY SCHOOL, SANTPUR</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_MAHULPATNA">GOVT HIGHER SECONDARY SCHOOL , MAHULPATNA</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_KANIGUMA">GOVT HIGHER SECONDARY SCHOOL, KANIGUMA</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_KIAPADAR">GOVT HIGHER SECONDARY SCHOOL, KIAPADAR</option>
<option value="Maa_Manikeswari_Panchayat_Samiti_Higher_Secondary_School_Thuamul_Rampur">Maa Manikeswari Panchayat Samiti Higher Secondary School, Thuamul Rampur</option>
<option value="Adibasi_Higher_Secondary_School_Balliguda">Adibasi Higher Secondary School, Balliguda</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_BARAKHAMA">GOVT HIGHER SECONDARY SCHOOL, BARAKHAMA</option>
<option value="Anchalika_Higher_Secondary_School_Sankarakhol">Anchalika Higher Secondary School, Sankarakhol</option>
<option value="Gurukul_Sanskrit_Higher_Secondary_School">Gurukul Sanskrit Higher Secondary School</option>
<option value="Kuidana_Indira_Gandhi_Memorial_Higher_Secondary_School_Lilnepade">Kuidana Indira Gandhi Memorial Higher Secondary School, Lilnepade</option>
<option value="Dr_Ambedkar_National_Higher_Secondary_School_Daringbadi">Dr. Ambedkar National Higher Secondary School, Daringbadi</option>
<option value="Rusimal_Higher_Secondary_School_Bamunigam">Rusimal Higher Secondary School, Bamunigam</option>
<option value="Govt_Higher_Secondary_School_Lingagada_GUdayagiri">Govt Higher Secondary School, Lingagada, GUdayagiri</option>
<option value="Indira_Priyadarshni_Womens_Higher_Secondary_School_G_Udayagiri">Indira Priyadarshni Women's Higher Secondary School, G. Udayagiri</option>
<option value="Kalinga_Higher_Secondary_School_G_Udayagiri">Kalinga Higher Secondary School, G. Udayagiri</option>
<option value="Kandhamal_Higher_Secondary_School_Sarangagada">Kandhamal Higher Secondary School, Sarangagada</option>
<option value="Ambedkar_Higher_Secondary_School_Khajuripada">Ambedkar Higher Secondary School, Khajuripada</option>
<option value="Bapuji_Higher_Secondary_School_Kotagarh">Bapuji Higher Secondary School, Kotagarh</option>
<option value="BANABASI_GOVT_HIGHER_SECONDARY_SCHOOL_NUAPADAR">BANABASI GOVT HIGHER SECONDARY SCHOOL, NUAPADAR</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_BALANDAPADA">GOVT HIGHER SECONDARY SCHOOL, BALANDAPADA</option>
<option value="Panchyat_Higher_Secondary_School_Phiringa">Panchyat Higher Secondary School, Phiringa</option>
<option value="Anchalika_Mahila_Higher_Secondary_School_Bandhamunda">Anchalika Mahila Higher Secondary School, Bandhamunda</option>
<option value="Ashok_Kumar_Rout_Sanskrit_Higher_Secondary_School">Ashok Kumar Rout Sanskrit Higher Secondary School</option>
<option value="Baba_Hare_Krushna_Das_Higher_Secondary_School_Markandpur">Baba Hare Krushna Das Higher Secondary School, Markandpur</option>
<option value="Nathasahi_Anchalika_Higher_Secondary_School_Nathasahi">Nathasahi Anchalika Higher Secondary School, Nathasahi</option>
<option value="Sujanpur_Anchalika_Panchayat_Higher_Secondary_School_Sujanpur">Sujanpur Anchalika Panchayat Higher Secondary School, Sujanpur</option>
<option value="Biraja_Womens_Higher_Secondary_School_Jajpur">Biraja Women's Higher Secondary School, Jajpur</option>
<option value="Narasingh_Choudhury_Higher_Secondary_School_Jajpur">Narasingh Choudhury Higher Secondary School, Jajpur</option>
<option value="Hingula_Higher_Secondary_School_Sankhachila">Hingula Higher Secondary School, Sankhachila</option>
<option value="Kanhu_Caran_Higher_Secondary_School_Korei">Kanhu Charan Higher Secondary School, Korei</option>
<option value="Maa_Tarini_Higher_Secondary_School_Panikoili">Maa Tarini Higher Secondary School, Panikoili</option>
<option value="Prana_Krushna_Higher_Secondary_School_Baitarini">Prana Krushna Higher Secondary School, Baitarini</option>
<option value="Saptaratna_Sanskrit_Higher_Secondary_School">Saptaratna Sanskrit Higher Secondary School</option>
<option value="Brahmabarada_Higher_Secondary_School_Baradavihar">Brahmabarada Higher Secondary School, Baradavihar</option>
<option value="Madhuban_Higher_Secondary_School_Madhubanhat">Madhuban Higher Secondary School, Madhubanhat</option>
<option value="Madhupur_Higher_Secondary_School_Kalan">Madhupur Higher Secondary School, Kalan</option>
<option value="Upendranath_Sarada_Higher_Secondary_School_Mugapal">Upendranath Sarada Higher Secondary School, Mugapal</option>
<option value="Bharati_Vihar_Higher_Secondary_School_Haripur">Bharati Vihar Higher Secondary School, Haripur</option>
<option value="Kapileswar_Higher_Secondary_School_Duburi">Kapileswar Higher Secondary School, Duburi</option>
<option value="MAHAGIRI_GOVT_HIGHER_SECONDARY_SCHOOL_KUHIKA">MAHAGIRI GOVT HIGHER SECONDARY SCHOOL, KUHIKA</option>
<option value="Sukinda_Higher_Secondary_School_Sukinda">Sukinda Higher Secondary School, Sukinda</option>
<option value="Indira_Gandhi_Mahila_Higher_Secondary_School_Jajpur_Road">Indira Gandhi Mahila Higher Secondary School, Jajpur Road</option>
<option value="Vyasa_Nagar_Higher_Secondary_School_Jajpur_Road">Vyasa Nagar Higher Secondary School, Jajpur Road</option>
<option value="Belpahar_Higher_Secondary_School_Belpahar">Belpahar Higher Secondary School, Belpahar</option>
<option value="Brajarajnagar_Higher_Secondary_School_Brajarajnagar">Brajarajnagar Higher Secondary School, Brajarajnagar</option>
<option value="Indira_Gandhi_Womens_Higher_Secondary_School_Brajarajnagar">Indira Gandhi Women's Higher Secondary School, Brajarajnagar</option>
<option value="Pradosh_Kumar_Smruti_Smaraki_Higher_Secondary_School_H_Katapali">Pradosh Kumar Smruti Smaraki Higher Secondary School, H. Katapali</option>
<option value="Salegram_Sakunia_Higher_Secondary_School_Talpatia">Salegram Sakunia Higher Secondary School, Talpatia</option>
<option value="Jharsuguda_Womens_Higher_Secondary_School_Jharsuguda">Jharsuguda Women's Higher Secondary School, Jharsuguda</option>
<option value="Laxmi_Narayan_Higher_Secondary_School_Jharsuguda">Laxmi Narayan Higher Secondary School, Jharsuguda</option>
<option value="Arda_Higher_Secondary_School_Arda">Arda Higher Secondary School, Arda</option>
<option value="Sovan_Memorial_Panchayat_Higher_Secondary_School_Kirmira">Sovan Memorial Panchayat Higher Secondary School, Kirmira</option>
<option value="Basumati_Science_Higher_Secondary_School_Samasingha">Basumati Science Higher Secondary School, Samasingha</option>
<option value="Dwarika_Prasad_Agrawalla_Higher_Secondary_School_Bagmara">Dwarika Prasad Agrawalla Higher Secondary School, Bagmara</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Kolabira">Panchayat Samiti Higher Secondary School, Kolabira</option>
<option value="Bhatlaida_Higher_Secondary_School_Bhatlaida">Bhatlaida Higher Secondary School, Bhatlaida</option>
<option value="Kabi_Buddharay_Gountia_Higher_Secondary_School_Salhetikra">Kabi Buddharay Gountia Higher Secondary School, Salhetikra</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Laikera">Panchayat Samiti Higher Secondary School, Laikera</option>
<option value="Talmunda_Anchalika_Mahila_Higher_Secondary_School_Talmunda">Talmunda Anchalika Mahila Higher Secondary School, Talmunda</option>
<option value="GOVT_ANCHALIKA_HIGHER_SECONDARY_SCHOOL_MURALIPALI">GOVT ANCHALIKA HIGHER SECONDARY SCHOOL, MURALIPALI</option>
<option value="Mahima_Higher_Secondary_School_Mahimapuram">Mahima Higher Secondary School, Mahimapuram</option>
<option value="Panchayat_Anchalik_Higher_Secondary_School_Kumarbandh">Panchayat Anchalik Higher Secondary School, Kumarbandh</option>
<option value="Chandrika_Jain_Higher_Secondary_School_Borda">Chandrika Jain Higher Secondary School, Borda</option>
<option value="DADHIBAMAN_GOVT_HIGHER_SECONDARY_SCHOOL_DADPUR">DADHIBAMAN GOVT HIGHER SECONDARY SCHOOL, DADPUR</option>
<option value="GOVT_HIGHER_SECONDARY_SCHOOL_SEINPUR">GOVT HIGHER SECONDARY SCHOOL, SEINPUR</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Karlapada">Panchayat Samiti Higher Secondary School, Karlapada</option>
<option value="Government_Higher_Secondary_School_Bhawanipatna">Government Higher Secondary School, Bhawanipatna</option>
<option value="Government_Womens_Higher_Secondary_School_Bhawanipatna">Government Women's Higher Secondary School, Bhawanipatna</option>
<option value="J_P_Sandhya_Higher_Secondary_School_Bhawanipatna">J.P. Sandhya Higher Secondary School, Bhawanipatna</option>
<option value="Boarder_Higher_Secondary_School_Kankeri">Boarder Higher Secondary School, Kankeri</option>
<option value="Dharamgarh_Womens_Higher_Secondary_School_Dharamgarh">Dharamgarh Women's Higher Secondary School, Dharamgarh</option>
<option value="Sri_Jagannath_Higher_Secondary_School_Naugaonhat">Sri Jagannath Higher Secondary School, Naugaonhat</option>
<option value="Sri_Sri_Moula_Bhanja_Higher_Secondary_School_Gangada">Sri Sri Moula Bhanja Higher Secondary School, Gangada</option>
<option value="Paradeep_Higher_Secondary_School_Paradeep">Paradeep Higher Secondary School, Paradeep</option>
<option value="Bhagabati_Womens_Higher_Secondary_School_Manijanga">Bhagabati Women's Higher Secondary School, Manijanga</option>
<option value="Brundaban_Chandra_Higher_Secondary_School_Redhua">Brundaban Chandra Higher Secondary School, Redhua</option>
<option value="Chitrotpala_Higher_Secondary_School_of_Education_And_Technology_Utarkul">Chitrotpala Higher Secondary School of Education & Technology, Utarkul</option>
<option value="Naba_Choudhury_Institute_Of_Education_And_Vocational_Studies_Higher_Secondary_School_Tarikunda">Naba Choudhury Institute Of Education & Vocational Studies Higher Secondary School, Tarikunda</option>
<option value="Swami_Arupananda_Higher_Secondary_School_of_Education_And_Technology_Kurtanga">Swami Arupananda Higher Secondary School of Education & Technology, Kurtanga</option>
<option value="Adikabi_Sarala_Das_Higher_Secondary_School_Tirtol">Adikabi Sarala Das Higher Secondary School, Tirtol</option>
<option value="Baya_Abadhuta_Higher_Secondary_School_Kanimul">Baya Abadhuta Higher Secondary School, Kanimul</option>
<option value="Laxmi_Nrusingha_Sanskrit_Higher_Secondary_School">Laxmi Nrusingha Sanskrit Higher Secondary School</option>
<option value="Shree_Maa_Mahila_Higher_Secondary_School_Kollar">Shree Maa Mahila Higher Secondary School, Kollar</option>
<option value="Utkal_Bharati_Higher_Secondary_School_Mahilo">Utkal Bharati Higher Secondary School, Mahilo</option>
<option value="Baba_Bhairabananda_Higher_Secondary_School_Chandikhol">Baba Bhairabananda Higher Secondary School, Chandikhol</option>
<option value="Barchana_Womens_Higher_Secondary_School_Barchana">Barchana Women's Higher Secondary School, Barchana</option>
<option value="Bishnu_Samantaray_Higher_Secondary_School_Nuahat">Bishnu Samantaray Higher Secondary School, Nuahat</option>
<option value="Buddha_Dev_Higher_Secondary_School_Udayagiri">Buddha dev Higher Secondary School, Udayagiri</option>
<option value="Mahapurusa_Hadi_Das_Higher_Secondary_School_Chhatisa">Mahapurusa Hadi Das Higher Secondary School, Chhatia</option>
<option value="Mahapurush_Banamali_Higher_Secondary_School_Sailipara">Mahapurush Banamali Higher Secondary School, Sailipara</option>
<option value="Pallii_Shree_Womens_Higher_Secondary_School_Balichandrapur">Pallii Shree Womens Higher Secondary School, Balichandrapur</option>
<option value="Sahaspur_Higher_Secondary_School_Balichandrapur">Sahaspur Higher Secondary School, Balichandrapur</option>
<option value="Abhimanyu_Samant_Singhar_Higher_Secondary_School_Balia">Abhimanyu Samant Singhar Higher Secondary School, Balia</option>
<option value="Gopabandhu_Choudhury_Higher_Secondary_School_Ramchandrapur">Gopabandhu Choudhury Higher Secondary School, Ramchandrapur</option>
<option value="Kadambini_Pal_Womens_Higher_Secondary_School_Rajatota">Kadambini Pal Women's Higher Secondary School, Rajatota</option>
<option value="Kasinath_Higher_Secondary_School_Kaipada">Kasinath Higher Secondary School, Kaipada</option>
<option value="Lachhaman_Balajew_Higher_Secondary_School_Angalo">Lachhaman Balajew Higher Secondary School, Angalo</option>
<option value="Santhan_Higher_Secondary_School_Bainsiria">Santhan Higher Secondary School, Bainsiria</option>
<option value="Anchalika_Baladev_Jew_Womens_Higher_Secondary_School_Alakund">Anchalika Baladev Jew Women's Higher Secondary School, Alakund</option>
<option value="Baruneswar_Higher_Secondary_School_Arei">Baruneswar Higher Secondary School, Arei</option>
<option value="Braja_Sundar_Higher_Secondary_School_Sayedpur">Braja Sundar Higher Secondary School, Sayedpur</option>
<option value="Janaki_Madhusudan_Womens_Higher_Secondary_School_Mandhatapatna">Janaki Madhusudan Women's Higher Secondary School, Mandhatapatna</option>
<option value="Junabhadra_Higher_Secondary_School_Bitana">Junabhadra Higher Secondary School, Bitana</option>
<option value="Kharasrota_Higher_Secondary_School_Singhipur">Kharasrota Higher Secondary School, Singhipur</option>
<option value="Jhadeswar_Higher_Secondary_School_Tolkani">Jhadeswar Higher Secondary School, Tolkani</option>
<option value="Manatira_Higher_Secondary_School_Manatira">Manatira Higher Secondary School, Manatira</option>
<option value="Biripat_Higher_Secondary_School_Biripat">Biripat Higher Secondary School, Biripat</option>
<option value="Chitalo_Higher_Secondary_School_Chitalo">Chitalo Higher Secondary School, Chitalo</option>
<option value="Dasarathpur_Higher_Secondary_School_Dasarathpur">Dasarathpur Higher Secondary School, Dasarathpur</option>
<option value="Gurukul_Karunakar_Beda_Sanskrit_Higher_Secondary_School">Gurukul Karunakar Beda Sanskrit Higher Secondary School</option>
<option value="Jayachandi_Higher_Secondary_School_Dubakana">Jayachandi Higher Secondary School, Dubakana</option>
<option value="Mangalpur_Womens_Higher_Secondary_School_Mangalpur">Mangalpur Women's Higher Secondary School, Mangalpur</option>
<option value="Rambag_Womens_Higher_Secondary_School_Rambag">Rambag Women's Higher Secondary School, Rambag</option>
<option value="Regional_Higher_Secondary_School_Rambag">Regional Higher Secondary School, Rambag</option>
<option value="Sadhu_Goureswar_Higher_Secondary_School_Kanikapada">Sadhu Goureswar Higher Secondary School, Kanikapada</option>
<option value="Bajragiri_Higher_Secondary_School_Kotpur">Bajragiri Higher Secondary School, Kotpur</option>
<option value="Dharmasala_Higher_Secondary_School_Dharmasala">Dharmasala Higher Secondary School, Dharmasala</option>
<option value="Dharmasala_Mahila_Higher_Secondary_School_Dharmasala">Dharmasala Mahila Higher Secondary School, Dharmasala</option>
<option value="Jagannath_Jew_Higher_Secondary_School_Chadheidhara">Jagannath Jew Higher Secondary School, Chadheidhara</option>
<option value="Jenapur_Higher_Secondary_School_Jenapur">Jenapur Higher Secondary School, Jenapur</option>
<option value="Mukundapatra_Higher_Secondary_School_Balarampur">Mukundapatra Higher Secondary School, Balarampur</option>


    </select>
    </div>
{console.log(user.name)}

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
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
    </>

  );
};

export default Navbar;
