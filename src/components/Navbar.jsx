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
      const res = await fetch("/api/register", {
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

              
              {/* <div className="pass-link">
                <a href="#">Reset password?</a>
              </div> */}
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
  <select style={{backgroundColor:"black"}} className="name_select"  value={user.name} onChange={handleInputs} name="name" id="name" required>
    <option value="">Institute</option>
    <option value="surajnew">surajnew</option>
    
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
<option value="JAWAHAR JYOTI GOVT HIGHER SECONDARY SCHOOL, SURAMANI, NUAGADA,">JAWAHAR JYOTI GOVT HIGHER SECONDARY SCHOOL, SURAMANI, NUAGADA,</option>
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
<option value="Sri Jagannath Higher Secondary School, Naugaonhat">Sri Jagannath Higher Secondary School, Naugaonhat</option>
<option value="Sri Sri Moula Bhanja Higher Secondary School, Gangada">Sri Sri Moula Bhanja Higher Secondary School, Gangada</option>
<option value="Paradeep Higher Secondary School, Paradeep">Paradeep Higher Secondary School, Paradeep</option>
<option value="Bhagabati Women's Higher Secondary School, Manijanga">Bhagabati Women's Higher Secondary School, Manijanga</option>
<option value="Brundaban Chandra Higher Secondary School, Redhua">Brundaban Chandra Higher Secondary School, Redhua</option>
<option value="Chitrotpala Higher Secondary School of Education & Technology, Utarkul">Chitrotpala Higher Secondary School of Education & Technology, Utarkul</option>
<option value="Naba Choudhury Institute Of Education & Vocational Studies Higher Secondary School, Tarikunda">Naba Choudhury Institute Of Education & Vocational Studies Higher Secondary School, Tarikunda</option>
<option value="Swami Arupananda Higher Secondary School of Education & Technology, Kurtanga">Swami Arupananda Higher Secondary School of Education & Technology, Kurtanga</option>
<option value="Adikabi Sarala Das Higher Secondary School, Tirtol">Adikabi Sarala Das Higher Secondary School, Tirtol</option>
<option value="Baya Abadhuta Higher Secondary School, Kanimul">Baya Abadhuta Higher Secondary School, Kanimul</option>
<option value="Laxmi Nrusingha Sanskrit Higher Secondary School">Laxmi Nrusingha Sanskrit Higher Secondary School</option>
<option value="Shree Maa Mahila Higher Secondary School, Kollar">Shree Maa Mahila Higher Secondary School, Kollar</option>
<option value="Utkal Bharati Higher Secondary School, Mahilo">Utkal Bharati Higher Secondary School, Mahilo</option>
<option value="Baba Bhairabananda Higher Secondary School, Chandikhol">Baba Bhairabananda Higher Secondary School, Chandikhol</option>
<option value="Barchana Women's Higher Secondary School, Barchana">Barchana Women's Higher Secondary School, Barchana</option>
<option value="Bishnu Samantaray Higher Secondary School, Nuahat">Bishnu Samantaray Higher Secondary School, Nuahat</option>
<option value="Buddha dev Higher Secondary School, Udayagiri">Buddha dev Higher Secondary School, Udayagiri</option>
<option value="Mahapurusa Hadi Das Higher Secondary School, Chhatia">Mahapurusa Hadi Das Higher Secondary School, Chhatia</option>
<option value="Mahapurush Banamali Higher Secondary School, Sailipara">Mahapurush Banamali Higher Secondary School, Sailipara</option>
<option value="Pallii Shree Womens Higher Secondary School, Balichandrapur">Pallii Shree Womens Higher Secondary School, Balichandrapur</option>
<option value="Sahaspur Higher Secondary School, Balichandrapur">Sahaspur Higher Secondary School, Balichandrapur</option>
<option value="Abhimanyu Samant Singhar Higher Secondary School, Balia">Abhimanyu Samant Singhar Higher Secondary School, Balia</option>
<option value="Gopabandhu Choudhury Higher Secondary School, Ramchandrapur">Gopabandhu Choudhury Higher Secondary School, Ramchandrapur</option>
<option value="Kadambini Pal Women's Higher Secondary School, Rajatota">Kadambini Pal Women's Higher Secondary School, Rajatota</option>
<option value="Kasinath Higher Secondary School, Kaipada">Kasinath Higher Secondary School, Kaipada</option>
<option value="Lachhaman Balajew Higher Secondary School, Angalo">Lachhaman Balajew Higher Secondary School, Angalo</option>
<option value="Santhan Higher Secondary School, Bainsiria">Santhan Higher Secondary School, Bainsiria</option>
<option value="Anchalika Baladev Jew Womens Higher Secondary School, Alakund">Anchalika Baladev Jew Womens Higher Secondary School, Alakund</option>
<option value="Baruneswar Higher Secondary School, Arei">Baruneswar Higher Secondary School, Arei</option>
<option value="Braja Sundar Higher Secondary School, Sayedpur">Braja Sundar Higher Secondary School, Sayedpur</option>
<option value="Janaki Madhusudan Women's Higher Secondary School, Mandhatapatna">Janaki Madhusudan Women's Higher Secondary School, Mandhatapatna</option>
<option value="Junabhadra Higher Secondary School, Bitana">Junabhadra Higher Secondary School, Bitana</option>
<option value="Kharasrota Higher Secondary School, Singhipur">Kharasrota Higher Secondary School, Singhipur</option>
<option value="Jhadeswar Higher Secondary School, Tolkani">Jhadeswar Higher Secondary School, Tolkani</option>
<option value="Manatira Higher Secondary School, Manatira">Manatira Higher Secondary School, Manatira</option>
<option value="Biripat Higher Secondary School, Biripat">Biripat Higher Secondary School, Biripat</option>
<option value="Chitalo Higher Secondary School, Chitalo">Chitalo Higher Secondary School, Chitalo</option>
<option value="Dasarathpur Higher Secondary School, Dasarathpur">Dasarathpur Higher Secondary School, Dasarathpur</option>
<option value="Gurukul Karunakar Beda Sanskrit Higher Secondary School">Gurukul Karunakar Beda Sanskrit Higher Secondary School</option>
<option value="Jayachandi Higher Secondary School, Dubakana">Jayachandi Higher Secondary School, Dubakana</option>
<option value="Mangalpur Women's Higher Secondary School, Mangalpur">Mangalpur Women's Higher Secondary School, Mangalpur</option>
<option value="Rambag Women's Higher Secondary School, Rambag">Rambag Women's Higher Secondary School, Rambag</option>
<option value="Regional Higher Secondary School, Rambag">Regional Higher Secondary School, Rambag</option>
<option value="Sadhu Goureswar Higher Secondary School, Kanikapada">Sadhu Goureswar Higher Secondary School, Kanikapada</option>
<option value="Bajragiri Higher Secondary School, Kotpur">Bajragiri Higher Secondary School, Kotpur</option>
<option value="Dharmasala Higher Secondary School, Dharmasala">Dharmasala Higher Secondary School, Dharmasala</option>
<option value="Dharmasala Mahila Higher Secondary School, Dharmasala">Dharmasala Mahila Higher Secondary School, Dharmasala</option>
<option value="Jagannath Jew Higher Secondary School, Chadheidhara">Jagannath Jew Higher Secondary School, Chadheidhara</option>
<option value="Jenapur Higher Secondary School, Jenapur">Jenapur Higher Secondary School, Jenapur</option>
<option value="Mukundapatra Higher Secondary School, Balarampur">Mukundapatra Higher Secondary School, Balarampur</option>
<option value="Anchalika Mahila Higher Secondary School, Bandhamunda">Anchalika Mahila Higher Secondary School, Bandhamunda</option>
<option value="Ashok Kumar Rout Sanskrit Higher Secondary School">Ashok Kumar Rout Sanskrit Higher Secondary School</option>
<option value="Baba Hare Krushna Das Higher Secondary School, Markandpur">Baba Hare Krushna Das Higher Secondary School, Markandpur</option>
<option value="Nathasahi Anchalika Higher Secondary School, Nathasahi">Nathasahi Anchalika Higher Secondary School, Nathasahi</option>
<option value="Sujanpur Anchalika Panchayat Higher Secondary School, Sujanpur">Sujanpur Anchalika Panchayat Higher Secondary School, Sujanpur</option>
<option value="Biraja Women's Higher Secondary School, Jajpur">Biraja Women's Higher Secondary School, Jajpur</option>
<option value="Narasingh Choudhury Higher Secondary School, Jajpur">Narasingh Choudhury Higher Secondary School, Jajpur</option>
<option value="Hingula Higher Secondary School, Sankhachila">Hingula Higher Secondary School, Sankhachila</option>
<option value="Kanhu Charan Higher Secondary School, Korei">Kanhu Charan Higher Secondary School, Korei</option>
<option value="Maa Tarini Higher Secondary School, Panikoili">Maa Tarini Higher Secondary School, Panikoili</option>
<option value="Prana Krushna Higher Secondary School, Baitarini">Prana Krushna Higher Secondary School, Baitarini</option>
<option value="Saptaratna Sanskrit Higher Secondary School">Saptaratna Sanskrit Higher Secondary School</option>
<option value="Brahmabarada Higher Secondary School, Baradavihar">Brahmabarada Higher Secondary School, Baradavihar</option>
<option value="Madhuban Higher Secondary School, Madhubanhat">Madhuban Higher Secondary School, Madhubanhat</option>
<option value="Madhupur Higher Secondary School, Kalan">Madhupur Higher Secondary School, Kalan</option>
<option value="Upendranath Sarada Higher Secondary School, Mugapal">Upendranath Sarada Higher Secondary School, Mugapal</option>
<option value="Bharati Vihar Higher Secondary School, Haripur">Bharati Vihar Higher Secondary School, Haripur</option>
<option value="Kapileswar Higher Secondary School, Duburi">Kapileswar Higher Secondary School, Duburi</option>
<option value="MAHAGIRI GOVT HIGHER SECONDARY SCHOOL, KUHIKA">MAHAGIRI GOVT HIGHER SECONDARY SCHOOL, KUHIKA</option>
<option value="Sukinda Higher Secondary School, Sukinda">Sukinda Higher Secondary School, Sukinda</option>
<option value="Indira Gandhi Mahila Higher Secondary School , Jajpur Road">Indira Gandhi Mahila Higher Secondary School , Jajpur Road</option>
<option value="Vyasa Nagar Higher Secondary School, Jajpur Road">Vyasa Nagar Higher Secondary School, Jajpur Road</option>
<option value="Belpahar Higher Secondary School, Belpahar">Belpahar Higher Secondary School, Belpahar</option>
<option value="Brajarajnagar Higher Secondary School, Brajarajnagar">Brajarajnagar Higher Secondary School, Brajarajnagar</option>
<option value="Indira Gandhi Women's Higher Secondary School, Brajarajnagar">Indira Gandhi Women's Higher Secondary School, Brajarajnagar</option>
<option value="Pradosh Kumar Smruti Smaraki Higher Secondary School, H. Katapali">Pradosh Kumar Smruti Smaraki Higher Secondary School, H. Katapali</option>
<option value="Salegram Sakunia Higher Secondary School, Talpatia">Salegram Sakunia Higher Secondary School, Talpatia</option>
<option value="Jharsuguda Women's Higher Secondary School, Jharsuguda">Jharsuguda Women's Higher Secondary School, Jharsuguda</option>
<option value="Laxmi Narayan Higher Secondary School, Jharsuguda">Laxmi Narayan Higher Secondary School, Jharsuguda</option>
<option value="Arda Higher Secondary School, Arda">Arda Higher Secondary School, Arda</option>
<option value="Sovan Memorial Panchayat Higher Secondary School, Kirmira">Sovan Memorial Panchayat Higher Secondary School, Kirmira</option>
<option value="Basumati Science Higher Secondary School, Samasingha">Basumati Science Higher Secondary School, Samasingha</option>
<option value="Dwarika Prasad Agrawalla Higher Secondary School, Bagmara">Dwarika Prasad Agrawalla Higher Secondary School, Bagmara</option>
<option value="Panchayat Samiti Higher Secondary School, Kolabira">Panchayat Samiti Higher Secondary School, Kolabira</option>
<option value="Bhatlaida Higher Secondary School, Bhatlaida">Bhatlaida Higher Secondary School, Bhatlaida</option>
<option value="Kabi Buddharay Gountia Higher Secondary School, Salhetikra">Kabi Buddharay Gountia Higher Secondary School, Salhetikra</option>
<option value="Panchayat Samiti Higher Secondary School, Laikera">Panchayat Samiti Higher Secondary School, Laikera</option>
<option value="Talmunda Anchalika Mahila Higher Secondary School, Talmunda">Talmunda Anchalika Mahila Higher Secondary School, Talmunda</option>
<option value="GOVT ANCHALIKA HIGHER SECONDARY SCHOOL, MURALIPALI">GOVT ANCHALIKA HIGHER SECONDARY SCHOOL, MURALIPALI</option>
<option value="Mahima Higher Secondary School, Mahimapuram">Mahima Higher Secondary School, Mahimapuram</option>
<option value="Panchayat Anchalik Higher Secondary School, Kumarbandh">Panchayat Anchalik Higher Secondary School, Kumarbandh</option>
<option value="Chandrika Jain Higher Secondary School, Borda">Chandrika Jain Higher Secondary School, Borda</option>
<option value="DADHIBAMAN GOVT HIGHER SECONDARY SCHOOL, DADPUR">DADHIBAMAN GOVT HIGHER SECONDARY SCHOOL, DADPUR</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, SEINPUR">GOVT HIGHER SECONDARY SCHOOL, SEINPUR</option>
<option value="Panchayat Samiti Higher Secondary School, Karlapada">Panchayat Samiti Higher Secondary School, Karlapada</option>
<option value="Government Higher Secondary School, Bhawanipatna">Government Higher Secondary School, Bhawanipatna</option>
<option value="Government Women's Higher Secondary School, Bhawanipatna">Government Women's Higher Secondary School, Bhawanipatna</option>
<option value="J.P. Sandhya Higher Secondary School, Bhawanipatna">J.P. Sandhya Higher Secondary School, Bhawanipatna</option>
<option value="Boarder Higher Secondary School, Kankeri">Boarder Higher Secondary School, Kankeri</option>
<option value="Dharamgarh Women's Higher Secondary School, Dharamgarh">Dharamgarh Women's Higher Secondary School, Dharamgarh</option>
<option value="Lakhi Ram Agrawal Higher Secondary School, Behera">Lakhi Ram Agrawal Higher Secondary School, Behera</option>
<option value="Panchayat Higher Secondary School, Dharamgarh">Panchayat Higher Secondary School, Dharamgarh</option>
<option value="Anchalika Bastarani Higher Secondary School, Sanchergaon">Anchalika Bastarani Higher Secondary School, Sanchergaon</option>
<option value="Sarbamangala Higher Secondary School, Golamunda">Sarbamangala Higher Secondary School, Golamunda</option>
<option value="Semlian Higher Secondary School, Chichia">Semlian Higher Secondary School, Chichia</option>
<option value="Indrabati Higher Secondary School, Jaipatna">Indrabati Higher Secondary School, Jaipatna</option>
<option value="Patitapaban Higher Secondary School, Arebeda">Patitapaban Higher Secondary School, Arebeda</option>
<option value="BALAJEE GOVT HIGHER SECONDARY SCHOOL, MAHICHALA">BALAJEE GOVT HIGHER SECONDARY SCHOOL, MAHICHALA</option>
<option value="Chichaiguda Higher Secondary School, Chichaiguda">Chichaiguda Higher Secondary School, Chichaiguda</option>
<option value="Swami Chidananda Higher Secondary School, Karchala">Swami Chidananda Higher Secondary School, Karchala</option>
<option value="Chamelidevi Women's Higher Secondary School, Junagarh (NAC)">Chamelidevi Women's Higher Secondary School, Junagarh (NAC)</option>
<option value="Priyadarshini Indira Higher Secondary School, Junagarh">Priyadarshini Indira Higher Secondary School, Junagarh</option>
<option value="Amohamani Higher Secondary School, Kalampur">Amohamani Higher Secondary School, Kalampur</option>
<option value="Mahabharat Higher Secondary School, Bijamara">Mahabharat Higher Secondary School, Bijamara</option>
<option value="Hara Gouri Higher Secondary School, Kusurla">Hara Gouri Higher Secondary School, Kusurla</option>
<option value="Jagannath Kausalya Higher Secondary School, Risida">Jagannath Kausalya Higher Secondary School, Risida</option>
<option value="Kashrupada Higher Secondary School, Kashrupada">Kashrupada Higher Secondary School, Kashrupada</option>
<option value="Panchayat Higher Secondary School, Belkhandi">Panchayat Higher Secondary School, Belkhandi</option>
<option value="Utkela Higher Secondary School, Utkela">Utkela Higher Secondary School, Utkela</option>
<option value="Kesinga Higher Secondary School, Kesinga">Kesinga Higher Secondary School, Kesinga</option>
<option value="Ladugaon Higher Secondary School, Ladugaon">Ladugaon Higher Secondary School, Ladugaon</option>
<option value="Panchayat Samiti Higher Secondary School, Koksara">Panchayat Samiti Higher Secondary School, Koksara</option>
<option value="Lanjigarh Road Higher Secondary School, Lanjigarh Road">Lanjigarh Road Higher Secondary School, Lanjigarh Road</option>
<option value="Maa Heera Neela Higher Secondary School, Biswanathpur">Maa Heera Neela Higher Secondary School, Biswanathpur</option>
<option value="Madanpur Rampur Higher Secondary School, Madanpur Rampur">Madanpur Rampur Higher Secondary School, Madanpur Rampur</option>
<option value="Bijayananda Panchayat Higher Secondary School, Tulapada">Bijayananda Panchayat Higher Secondary School, Tulapada</option>
<option value="GOVT HIGHER SECONDARY SCHOOL ULIKUPA">GOVT HIGHER SECONDARY SCHOOL ULIKUPA</option>
<option value="Milita Panchayat Higher Secondary School, Muskuti">Milita Panchayat Higher Secondary School, Muskuti</option>
<option value="Panchayat Samiti Higher Secondary School, Narla">Panchayat Samiti Higher Secondary School, Narla</option>
<option value="RADHAKRISHNA GOVT HIGHER SECONDARY SCHOOL, SANTPUR">RADHAKRISHNA GOVT HIGHER SECONDARY SCHOOL, SANTPUR</option>
<option value="GOVT HIGHER SECONDARY SCHOOL , MAHULPATNA">GOVT HIGHER SECONDARY SCHOOL , MAHULPATNA</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KANIGUMA">GOVT HIGHER SECONDARY SCHOOL, KANIGUMA</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KIAPADAR">GOVT HIGHER SECONDARY SCHOOL, KIAPADAR</option>
<option value="Maa Manikeswari Panchayat Samiti Higher Secondary School, Thuamul Rampur">Maa Manikeswari Panchayat Samiti Higher Secondary School, Thuamul Rampur</option>
<option value="Adibasi Higher Secondary School, Balliguda">Adibasi Higher Secondary School, Balliguda</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BARAKHAMA">GOVT HIGHER SECONDARY SCHOOL, BARAKHAMA</option>
<option value="Anchalika Higher Secondary School, Sankarakhol">Anchalika Higher Secondary School, Sankarakhol</option>
<option value="Gurukul Sanskrit Higher Secondary School">Gurukul Sanskrit Higher Secondary School</option>
<option value="Kuidana Indira Gandhi Memorial Higher Secondary School, Lilnepade">Kuidana Indira Gandhi Memorial Higher Secondary School, Lilnepade</option>
<option value="Dr. Ambedkar National Higher Secondary School, Daringbadi">Dr. Ambedkar National Higher Secondary School, Daringbadi</option>
<option value="Rusimal Higher Secondary School, Bamunigam">Rusimal Higher Secondary School, Bamunigam</option>
<option value="Govt Higher Secondary School, Lingagada, GUdayagiri">Govt Higher Secondary School, Lingagada, GUdayagiri</option>
<option value="Indira Priyadarshni Women's Higher Secondary School, G. Udayagiri">Indira Priyadarshni Women's Higher Secondary School, G. Udayagiri</option>
<option value="Kalinga Higher Secondary School, G. Udayagiri">Kalinga Higher Secondary School, G. Udayagiri</option>
<option value="Kandhamal Higher Secondary School, Sarangagada">Kandhamal Higher Secondary School, Sarangagada</option>
<option value="Ambedkar Higher Secondary School, Khajuripada">Ambedkar Higher Secondary School, Khajuripada</option>
<option value="Bapuji Higher Secondary School, Kotagarh">Bapuji Higher Secondary School, Kotagarh</option>
<option value="BANABASI GOVT HIGHER SECONDARY SCHOOL, NUAPADAR">BANABASI GOVT HIGHER SECONDARY SCHOOL, NUAPADAR</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BALANDAPADA">GOVT HIGHER SECONDARY SCHOOL, BALANDAPADA</option>
<option value="Panchyat Higher Secondary School, Phiringa">Panchyat Higher Secondary School, Phiringa</option>
<option value="Government Higher Secondary School, Phulbani">Government Higher Secondary School, Phulbani</option>
<option value="Sanjaya Memorial Government Women's Higher Secondary School, Phulbani">Sanjaya Memorial Government Women's Higher Secondary School, Phulbani</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BADABARABA">GOVT HIGHER SECONDARY SCHOOL, BADABARABA</option>
<option value="Jeevan Jyoti Higher Secondary School, Raikia">Jeevan Jyoti Higher Secondary School, Raikia</option>
<option value="AMCS Higher Secondary School, Tikaballi">AMCS Higher Secondary School, Tikaballi</option>
<option value="Netaji Subash Boss Higher Secondary School, Tumudibandha">Netaji Subash Boss Higher Secondary School, Tumudibandha</option>
<option value="Aul Higher Secondary School, Aul">Aul Higher Secondary School, Aul</option>
<option value="Debaray Samarsingh Higher Secondary School, Ganeswarpur">Debaray Samarsingh Higher Secondary School, Ganeswarpur</option>
<option value="Gandhi Memorial Higher Secondary School, Govindpur">Gandhi Memorial Higher Secondary School, Govindpur</option>
<option value="Laxmi Barah Higher Secondary School, Ayatpur">Laxmi Barah Higher Secondary School, Ayatpur</option>
<option value="Olaver Higher Secondary School, Olaver">Olaver Higher Secondary School, Olaver</option>
<option value="Sushree Devi Women's Higher Secondary School, Aul">Sushree Devi Women's Higher Secondary School, Aul</option>
<option value="Delta Higher Secondary School, Bhitarabampu">Delta Higher Secondary School, Bhitarabampu</option>
<option value="Derabish Higher Secondary School, Derabish">Derabish Higher Secondary School, Derabish</option>
<option value="Derabish Mahila Higher Secondary School, Derabish">Derabish Mahila Higher Secondary School, Derabish</option>
<option value="Hrudananda Nayak Smaraki Higher Secondary School, Chandol">Hrudananda Nayak Smaraki Higher Secondary School, Chandol</option>
<option value="Bijaya Higher Secondary School, Tyendukura">Bijaya Higher Secondary School, Tyendukura</option>
<option value="Chitrotpala Women's Higher Secondary School, Korua">Chitrotpala Women's Higher Secondary School, Korua</option>
<option value="Gopinathpur Sanskrit Higher Secondary School">Gopinathpur Sanskrit Higher Secondary School</option>
<option value="Korua Women's Higher Secondary School, Korua">Korua Women's Higher Secondary School, Korua</option>
<option value="Lokanath Higher Secondary School, Patkura">Lokanath Higher Secondary School, Patkura</option>
<option value="Manab Sambal Vikas Mahila Higher Secondary School, Kalabuda">Manab Sambal Vikas Mahila Higher Secondary School, Kalabuda</option>
<option value="Balia Women's Higher Secondary School, Balia">Balia Women's Higher Secondary School, Balia</option>
<option value="Birupa Higher Secondary School, Indipur">Birupa Higher Secondary School, Indipur</option>
<option value="Government Science Higher Secondary School, Ayeba">Government Science Higher Secondary School, Ayeba</option>
<option value="Swami Vivekananda Manab Sambal Vikas Higher Secondary School, Chaudakulat">Swami Vivekananda Manab Sambal Vikas Higher Secondary School, Chaudakulat</option>
<option value="Veer Hanumanjew Higher Secondary School, Nikirai">Veer Hanumanjew Higher Secondary School, Nikirai</option>
<option value="Kendrapada Evening Higher Secondary School, Kendrapara">Kendrapada Evening Higher Secondary School, Kendrapara</option>
<option value="Kendrapara Higher Secondary School, Kendrapara">Kendrapara Higher Secondary School, Kendrapara</option>
<option value="Tulasi Women's Higher Secondary School, Kendrapara">Tulasi Women's Higher Secondary School, Kendrapara</option>
<option value="Binapani Higher Secondary School, Gayaspur">Binapani Higher Secondary School, Gayaspur</option>
<option value="Maa Tarini Higher Secondary School, Jayachandrapur">Maa Tarini Higher Secondary School, Jayachandrapur</option>
<option value="RAMACHANDI BIJAYANANDA GOVT HIGHER SECONDARY SCHOOL, RAMNAGAR">RAMACHANDI BIJAYANANDA GOVT HIGHER SECONDARY SCHOOL, RAMNAGAR</option>
<option value="Sri Sri Bayababa Higher Secondary School, Mahakalpar">Sri Sri Bayababa Higher Secondary School, Mahakalpar</option>
<option value="Thakur Nigamananda Higher Secondary School, Nigamavihar">Thakur Nigamananda Higher Secondary School, Nigamavihar</option>
<option value="Biju Patnaik Higher Secondary School, Antei">Biju Patnaik Higher Secondary School, Antei</option>
<option value="Chitrotpola Higher Secondary School, Akhua Odanga">Chitrotpola Higher Secondary School, Akhua Odanga</option>
<option value="Gandhi Uccha Madhyamik Higher Secondary School, Ayatpur">Gandhi Uccha Madhyamik Higher Secondary School, Ayatpur</option>
<option value="Karilopatna Higher Secondary School, Karilopatna">Karilopatna Higher Secondary School, Karilopatna</option>
<option value="Marshaghai Higher Secondary School, Marshaghai">Marshaghai Higher Secondary School, Marshaghai</option>
<option value="Marshaghai Women's Higher Secondary School, Marshaghai">Marshaghai Women's Higher Secondary School, Marshaghai</option>
<option value="Barpara Higher Secondary School, Barpara">Barpara Higher Secondary School, Barpara</option>
<option value="Brahmani Higher Secondary School, Dandisahi">Brahmani Higher Secondary School, Dandisahi</option>
<option value="U.K. Mahavir Higher Secondary School, Madanpur">U.K. Mahavir Higher Secondary School, Madanpur</option>
<option value="Ushadevi Women's Higher Secondary School, Andara">Ushadevi Women's Higher Secondary School, Andara</option>
<option value="Pattamundai Higher Secondary School, Pattamundai">Pattamundai Higher Secondary School, Pattamundai</option>
<option value="Pattamundai Women's Higher Secondary School, Pattamundai">Pattamundai Women's Higher Secondary School, Pattamundai</option>
<option value="Barha Regional Science Higher Secondary School, Hatasahi Katchery">Barha Regional Science Higher Secondary School, Hatasahi Katchery</option>
<option value="Kapileswar Higher Secondary School, Katna">Kapileswar Higher Secondary School, Katna</option>
<option value="Sailendra Narayan Higher Secondary School, Rajkanika">Sailendra Narayan Higher Secondary School, Rajkanika</option>
<option value="NAGANARAYAN GOVT HIGHER SECONDARY SCHOOL, DANGAMAL">NAGANARAYAN GOVT HIGHER SECONDARY SCHOOL, DANGAMAL</option>
<option value="Nalinikanta Higher Secondary School, Chandibaunsamul">Nalinikanta Higher Secondary School, Chandibaunsamul</option>
<option value="Sri Sri Jagannath Higher Secondary School, Rajnagar">Sri Sri Jagannath Higher Secondary School, Rajnagar</option>
<option value="Swapneswar Higher Secondary School, Barahpur">Swapneswar Higher Secondary School, Barahpur</option>
<option value="Beleswar Higher Secondary School, Belbahali">Beleswar Higher Secondary School, Belbahali</option>
<option value="Kantipal Anchalika Higher Secondary School, Anandapur">Kantipal Anchalika Higher Secondary School, Anandapur</option>
<option value="LD GOVT HIGHER SECONDARY SCHOOL,KODAPADA">LD GOVT HIGHER SECONDARY SCHOOL,KODAPADA</option>
<option value="Salbani G.P. Higher Secondary School, Salabani">Salbani G.P. Higher Secondary School, Salabani</option>
<option value="Anandapur Higher Secondary School, Anandapur">Anandapur Higher Secondary School, Anandapur</option>
<option value="Kanak Manjari Women's Higher Secondary School, Salapada">Kanak Manjari Women's Higher Secondary School, Salapada</option>
<option value="BAITARANI GOVT HIGHER SECONDARY SCHOOL">BAITARANI GOVT HIGHER SECONDARY SCHOOL</option>
<option value="PANCHAYAT GOVT HIGHER SECONDARY SCHOOL,TARAMAKANT">PANCHAYAT GOVT HIGHER SECONDARY SCHOOL,TARAMAKANT</option>
<option value="Pateswar Higher Secondary School, Suakati">Pateswar Higher Secondary School, Suakati</option>
<option value="Barbil Higher Secondary School, Barbil">Barbil Higher Secondary School, Barbil</option>
<option value="Chandra Sekhar Higher Secondary School, Champua">Chandra Sekhar Higher Secondary School, Champua</option>
<option value="Mahila Higher Secondary School, Champua">Mahila Higher Secondary School, Champua</option>
<option value="Mohandas Karamchand Gandhi Higher Secondary School, Sarangi">Mohandas Karamchand Gandhi Higher Secondary School, Sarangi</option>
<option value="Rimuli Higher Secondary School, Rimuli">Rimuli Higher Secondary School, Rimuli</option>
<option value="Jagannath Higher Secondary School, Paramanandapur">Jagannath Higher Secondary School, Paramanandapur</option>
<option value="Kushaleswar Anchalik Higher Secondary School, Rekutia">Kushaleswar Anchalik Higher Secondary School, Rekutia</option>
<option value="Patita Paban Higher Secondary School, Sainkula">Patita Paban Higher Secondary School, Sainkula</option>
<option value="Laxmi Narayan Higher Secondary School, Pipilia">Laxmi Narayan Higher Secondary School, Pipilia</option>
<option value="Regional S.N. Higher Secondary School, Dhenkikote">Regional S.N. Higher Secondary School, Dhenkikote</option>
<option value="Tarini Thakurani Higher Secondary School, Ghatagaon">Tarini Thakurani Higher Secondary School, Ghatagaon</option>
<option value="Brajabandhu Higher Secondary School, Harichandanpur">Brajabandhu Higher Secondary School, Harichandanpur</option>
<option value="Mahapat Higher Secondary School, Janghira">Mahapat Higher Secondary School, Janghira</option>
<option value="Rangpat Higher Secondary School, Pandapara">Rangpat Higher Secondary School, Pandapara</option>
<option value="Biswa Tarini Women's Higher Secondary School, Chhenapadi">Biswa Tarini Women's Higher Secondary School, Chhenapadi</option>
<option value="Boula Higher Secondary School, Soso">Boula Higher Secondary School, Soso</option>
<option value="Hatadihi Anchalika Higher Secondary School, Hatadihi">Hatadihi Anchalika Higher Secondary School, Hatadihi</option>
<option value="Sadang Anchalika Higher Secondary School, Sadang">Sadang Anchalika Higher Secondary School, Sadang</option>
<option value="Jhumpura Panchayat Samiti Higher Secondary School, Jhumpura">Jhumpura Panchayat Samiti Higher Secondary School, Jhumpura</option>
<option value="Maa Gramyashree Higher Secondary School, Naradpur">Maa Gramyashree Higher Secondary School, Naradpur</option>
<option value="Utkalmani Gopabandhu Higher Secondary School, Ukhunda">Utkalmani Gopabandhu Higher Secondary School, Ukhunda</option>
<option value="SREE JAGANNATH GOVT HIGHER SECONDARY SCHOOL, JORALI">SREE JAGANNATH GOVT HIGHER SECONDARY SCHOOL, JORALI</option>
<option value="Joda Women's Higher Secondary School, Joda">Joda Women's Higher Secondary School, Joda</option>
<option value="Padmapur Anchalika Higher Secondary School, Padmapur">Padmapur Anchalika Higher Secondary School, Padmapur</option>
<option value="Raisuan Higher Secondary School, Raisuan">Raisuan Higher Secondary School, Raisuan</option>
<option value="Santosi Maa Regional Higher Secondary School, Jharbelda">Santosi Maa Regional Higher Secondary School, Jharbelda</option>
<option value="Dharanidhar Higher Secondary School, Keonjhar">Dharanidhar Higher Secondary School, Keonjhar</option>
<option value="Government Women's Higher Secondary School, Keonjhar">Government Women's Higher Secondary School, Keonjhar</option>
<option value="Keonjhar Higher Secondary School, Keonjhar">Keonjhar Higher Secondary School, Keonjhar</option>
<option value="PRAGATI GOVT HIGHER SECONDARY SCHOOL, MAIDANKEL">PRAGATI GOVT HIGHER SECONDARY SCHOOL, MAIDANKEL</option>
<option value="Bhimkund Higher Secondary School, Dumuria">Bhimkund Higher Secondary School, Dumuria</option>
<option value="Dadhi Baman Higher Secondary School, Turumunga">Dadhi Baman Higher Secondary School, Turumunga</option>
<option value="Swampatna Anchalika Higher Secondary School, Swampatna">Swampatna Anchalika Higher Secondary School, Swampatna</option>
<option value="Machhagarh Higher Secondary School, Machhagarh">Machhagarh Higher Secondary School, Machhagarh</option>
<option value="Panchayat Samiti Higher Secondary School, Saharpara">Panchayat Samiti Higher Secondary School, Saharpara</option>
<option value="Udayapur Anchalika Higher Secondary School, Udayapur">Udayapur Anchalika Higher Secondary School, Udayapur</option>
<option value="Charigarh Higher Secondary School, Telkoi">Charigarh Higher Secondary School, Telkoi</option>
<option value="Gopaljew Higher Secondary School, Benamunda">Gopaljew Higher Secondary School, Benamunda</option>
<option value="SHREE JAGANATH GOVT HIGHER SECONDARY SCHOOL,GOLABANDHA">SHREE JAGANATH GOVT HIGHER SECONDARY SCHOOL,GOLABANDHA</option>
<option value="Sirigida Anchalika Bigyan Higher Secondary School, Sirigida">Sirigida Anchalika Bigyan Higher Secondary School, Sirigida</option>
<option value="Jawaharlal Nehru Higher Secondary School, Balianta">Jawaharlal Nehru Higher Secondary School, Balianta</option>
<option value="Pratap Sasan Higher Secondary School, Balakati">Pratap Sasan Higher Secondary School, Balakati</option>
<option value="Sri Sri Baneswar Higher Secondary School, Bentapur">Sri Sri Baneswar Higher Secondary School, Bentapur</option>
<option value="Banamalipur Higher Secondary School, Banamalipur">Banamalipur Higher Secondary School, Banamalipur</option>
<option value="Odakhanda Higher Secondary School, Odakhanda">Odakhanda Higher Secondary School, Odakhanda</option>
<option value="Sishu Ananta Higher Secondary School, Balipatna">Sishu Ananta Higher Secondary School, Balipatna</option>
<option value="Balugaon Higher Secondary School, Balugaon">Balugaon Higher Secondary School, Balugaon</option>
<option value="BHETINATH DEV GOVT HIGHER SECONDARY SCHOOL, BHETESWAR">BHETINATH DEV GOVT HIGHER SECONDARY SCHOOL, BHETESWAR</option>
<option value="Nachuni Higher Secondary School, Nachuni">Nachuni Higher Secondary School, Nachuni</option>
<option value="Parsuram Higher Secondary School, Gambharimunda">Parsuram Higher Secondary School, Gambharimunda</option>
<option value="Rural Women's Higher Secondary School, Banapur">Rural Women's Higher Secondary School, Banapur</option>
<option value="Godavarish Higher Secondary School, Banapur">Godavarish Higher Secondary School, Banapur</option>
<option value="Begunia Higher Secondary School, Begunia">Begunia Higher Secondary School, Begunia</option>
<option value="Hattakeswar Mahila Higher Secondary School, Baghamari">Hattakeswar Mahila Higher Secondary School, Baghamari</option>
<option value="Rama Chandi Higher Secondary School, Gadamanitri">Rama Chandi Higher Secondary School, Gadamanitri</option>
<option value="Rama Mani Higher Secondary School, Kantabada">Rama Mani Higher Secondary School, Kantabada</option>
<option value="Chandaka Higher Secondary School, Chandaka">Chandaka Higher Secondary School, Chandaka</option>
<option value="Kunja Bihari Higher Secondary School, Baranga">Kunja Bihari Higher Secondary School, Baranga</option>
<option value="Acharya Harihar Higher Secondary School, Chandrasekharpur">Acharya Harihar Higher Secondary School, Chandrasekharpur</option>
<option value="Ambedkar Centenary Higher Secondary School of Education & Technology, Dumduma">Ambedkar Centenary Higher Secondary School of Education & Technology, Dumduma</option>
<option value="Biju Pattnaik Higher Secondary School of Science & Education, Bhubaneswar">Biju Pattnaik Higher Secondary School of Science & Education, Bhubaneswar</option>
<option value="Buxi Jagabandhu Bidyadhar Higher Secondary School, Bhubaneswar">Buxi Jagabandhu Bidyadhar Higher Secondary School, Bhubaneswar</option>
<option value="City Women's Higher Secondary School, Siripur">City Women's Higher Secondary School, Siripur</option>
<option value="Deb Ray Nayapalli Higher Secondary School, Bhubaneswar">Deb Ray Nayapalli Higher Secondary School, Bhubaneswar</option>
<option value="Ekamra Higher Secondary School, Bhubaneswar">Ekamra Higher Secondary School, Bhubaneswar</option>
<option value="Kamala Nehru Women's Higher Secondary School, Bhubaneswar">Kamala Nehru Women's Higher Secondary School, Bhubaneswar</option>
<option value="Maharishi Higher Secondary School of Natural Law, Bhubaneswar">Maharishi Higher Secondary School of Natural Law, Bhubaneswar</option>
<option value="Maharshi Women's Higher Secondary School, Sailashree Vihar">Maharshi Women's Higher Secondary School, Sailashree Vihar</option>
<option value="Raja Madhusudan Dev Higher Secondary School of Science & Education, Patia">Raja Madhusudan Dev Higher Secondary School of Science & Education, Patia</option>
<option value="Rajdhani Higher Secondary School, Bhubaneswar">Rajdhani Higher Secondary School, Bhubaneswar</option>
<option value="Rama Devi Women's Higher Secondary School, Bhubaneswar">Rama Devi Women's Higher Secondary School, Bhubaneswar</option>
<option value="Sri Jayadev Higher Secondary School of Education & Technology, Naharkanta">Sri Jayadev Higher Secondary School of Education & Technology, Naharkanta</option>
<option value="Sri Satya Sai Higher Secondary School for Women, Pokhriput">Sri Satya Sai Higher Secondary School for Women, Pokhriput</option>
<option value="Kali Charan Panchagarh Ananga Narendra Higher Secondary School, Bankoi">Kali Charan Panchagarh Ananga Narendra Higher Secondary School, Bankoi</option>
<option value="Maa Sarada Women's Higher Secondary School, Tikatal">Maa Sarada Women's Higher Secondary School, Tikatal</option>
<option value="Parama Nanda Higher Secondary School, Bolagarh">Parama Nanda Higher Secondary School, Bolagarh</option>
<option value="Raghunath Higher Secondary School, Deuli">Raghunath Higher Secondary School, Deuli</option>
<option value="Panchupalli Bhima Balabantaray Higher Secondary School, AnkulachatI">Panchupalli Bhima Balabantaray Higher Secondary School, AnkulachatI</option>
<option value="Bauri Bandhu Higher Secondary School, Chhatabar">Bauri Bandhu Higher Secondary School, Chhatabar</option>
<option value="Sanatan Harichandan Higher Secondary School, Madanpur">Sanatan Harichandan Higher Secondary School, Madanpur</option>
<option value="Sarat Paikray Higher Secondary School, Argul">Sarat Paikray Higher Secondary School, Argul</option>
<option value="Sri Somanath Balunkeswar Dev Mahila Higher Secondary School, Kantia">Sri Somanath Balunkeswar Dev Mahila Higher Secondary School, Kantia</option>
<option value="Jatani Higher Secondary School, Jatni">Jatani Higher Secondary School, Jatni</option>
<option value="Haladia Higher Secondary School, Haladia">Haladia Higher Secondary School, Haladia</option>
<option value="Kabi Prasanna Patasani Anchalika Higher Secondary School, Malipada">Kabi Prasanna Patasani Anchalika Higher Secondary School, Malipada</option>
<option value="Kerang Panchayat Higher Secondary School, Kerang">Kerang Panchayat Higher Secondary School, Kerang</option>
<option value="Sri Jagannath Higher Secondary School, Kaipadar">Sri Jagannath Higher Secondary School, Kaipadar</option>
<option value="Khurda Women's Higher Secondary School, Khurda">Khurda Women's Higher Secondary School, Khurda</option>
<option value="Prananath Higher Secondary School, Khurda">Prananath Higher Secondary School, Khurda</option>
<option value="Durga Charan Chilika Higher Secondary School, Tangi">Durga Charan Chilika Higher Secondary School, Tangi</option>
<option value="Janata Higher Secondary School, Kuhudi">Janata Higher Secondary School, Kuhudi</option>
<option value="Kshetrabasi Dayananda Anglovedic Higher Secondary School, Nirakarpur">Kshetrabasi Dayananda Anglovedic Higher Secondary School, Nirakarpur</option>
<option value="Raghunath Adarsha Higher Secondary School, Olasingha">Raghunath Adarsha Higher Secondary School, Olasingha</option>
<option value="Ramachandra Kalpana Higher Secondary School, Kamaguru">Ramachandra Kalpana Higher Secondary School, Kamaguru</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BANDHUGAM">GOVT HIGHER SECONDARY SCHOOL, BANDHUGAM</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KAKALPADA">GOVT HIGHER SECONDARY SCHOOL, KAKALPADA</option>
<option value="Saheed Laxman Nayak Higher Secondary School, Boipariguda">Saheed Laxman Nayak Higher Secondary School, Boipariguda</option>
<option value="Bhairaba Higher Secondary School, Borigumma">Bhairaba Higher Secondary School, Borigumma</option>
<option value="Narasingha Higher Secondary School, Tarabhatta">Narasingha Higher Secondary School, Tarabhatta</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, PODAGADA">GOVT HIGHER SECONDARY SCHOOL, PODAGADA</option>
<option value="Radha Krishna Adivasi Higher Secondary School, Dasmanthpur">Radha Krishna Adivasi Higher Secondary School, Dasmanthpur</option>
<option value="Government Women's Higher Secondary School, Jeypore">Government Women's Higher Secondary School, Jeypore</option>
<option value="Vikram Deb Higher Secondary School, Jeypore">Vikram Deb Higher Secondary School, Jeypore</option>
<option value="Dr. B.R.A. Higher Secondary School, Koraput">Dr. B.R.A. Higher Secondary School, Koraput</option>
<option value="Government Higher Secondary School, Landiguda, Koraput">Government Higher Secondary School, Landiguda, Koraput</option>
<option value="Government Women's Higher Secondary School, Koraput">Government Women's Higher Secondary School, Koraput</option>
<option value="Kotpad Higher Secondary School, Kotpad">Kotpad Higher Secondary School, Kotpad</option>
<option value="Biju Patnaik Higher Secondary School, Kundra">Biju Patnaik Higher Secondary School, Kundra</option>
<option value="Dr. B.R.A. Higher Secondary School, Lamtaput">Dr. B.R.A. Higher Secondary School, Lamtaput</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KAKIRIGUMMA">GOVT HIGHER SECONDARY SCHOOL, KAKIRIGUMMA</option>
<option value="Laxmipur Higher Secondary School, Laxmipur">Laxmipur Higher Secondary School, Laxmipur</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, PADWA">GOVT HIGHER SECONDARY SCHOOL, PADWA</option>
<option value="Sindha Devi Higher Secondary School, Nandapur">Sindha Devi Higher Secondary School, Nandapur</option>
<option value="Radha Krishna Higher Secondary School, Narayanpatana">Radha Krishna Higher Secondary School, Narayanpatana</option>
<option value="Gangeswari Higher Secondary School, Pottangi">Gangeswari Higher Secondary School, Pottangi</option>
<option value="Semiliguda Higher Secondary School, Seimiliguda">Semiliguda Higher Secondary School, Seimiliguda</option>
<option value="Sunabedha Women's Higher Secondary School, Sunabeda">Sunabedha Women's Higher Secondary School, Sunabeda</option>
<option value="Gopabandhu Anchalika Higher Secondary School, Kalimela">Gopabandhu Anchalika Higher Secondary School, Kalimela</option>
<option value="MPV 21 GOVT HIGHER SECONDARY SCHOOL , KALIMELA">MPV 21 GOVT HIGHER SECONDARY SCHOOL , KALIMELA</option>
<option value="Biju Patnaik Higher Secondary School of Education, Govindapali">Biju Patnaik Higher Secondary School of Education, Govindapali</option>
<option value="Balimela Higher Secondary School of Technology, Niladrinagar">Balimela Higher Secondary School of Technology, Niladrinagar</option>
<option value="CHITRAKONDA GOVT BOYS HIGHER SECONDARY SCHOOL">CHITRAKONDA GOVT BOYS HIGHER SECONDARY SCHOOL</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KORUKONDA">GOVT HIGHER SECONDARY SCHOOL, KORUKONDA</option>
<option value="Darwin Memorial Higher Secondary School, Kudulugumma">Darwin Memorial Higher Secondary School, Kudulugumma</option>
<option value="Govt Higher Secondary School, Darlabeda">Govt Higher Secondary School, Darlabeda</option>
<option value="BL GOVT HIGHER SECONDARY SCHOOL, SERPALLY">BL GOVT HIGHER SECONDARY SCHOOL, SERPALLY</option>
<option value="Malkangiri Higher Secondary School, Malkangiri">Malkangiri Higher Secondary School, Malkangiri</option>
<option value="Government Science Higher Secondary School, Malkanagiri">Government Science Higher Secondary School, Malkanagiri</option>
<option value="Women's Higher Secondary School, Malkangiri">Women's Higher Secondary School, Malkangiri</option>
<option value="BAPUJI GOVT HIGHER SECONDARY SCHOOL, ANLAPADAR">BAPUJI GOVT HIGHER SECONDARY SCHOOL, ANLAPADAR</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, SALIMI">GOVT HIGHER SECONDARY SCHOOL, SALIMI</option>
<option value="Utkalmani Gopabandhu Higher Secondary School, Mathili">Utkalmani Gopabandhu Higher Secondary School, Mathili</option>
<option value="Dr. Shyam Prasad Higher Secondary School, MV-79">Dr. Shyam Prasad Higher Secondary School, MV-79</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, URUBALLI">GOVT HIGHER SECONDARY SCHOOL, URUBALLI</option>
<option value="Regional Higher Secondary School, Podia">Regional Higher Secondary School, Podia</option>
<option value="Dhirajlal Higher Secondary School, Bahalda">Dhirajlal Higher Secondary School, Bahalda</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, JHARADIHI">GOVT HIGHER SECONDARY SCHOOL, JHARADIHI</option>
<option value="Binodini Mahila Higher Secondary School, Banakati">Binodini Mahila Higher Secondary School, Banakati</option>
<option value="Haraprava Higher Secondary School, Kalabadia">Haraprava Higher Secondary School, Kalabadia</option>
<option value="Laxmi Kanta Higher Secondary School, Bangriposi">Laxmi Kanta Higher Secondary School, Bangriposi</option>
<option value="Baba Kakharua Baidyanath Higher Secondary School, Manatri">Baba Kakharua Baidyanath Higher Secondary School, Manatri</option>
<option value="Barasahi Panchayat Samiti Higher Secondary School, Barasahi">Barasahi Panchayat Samiti Higher Secondary School, Barasahi</option>
<option value="Shree Jagannath Higher Secondary School, Balijoda">Shree Jagannath Higher Secondary School, Balijoda</option>
<option value="Baripada Higher Secondary School, Baripada">Baripada Higher Secondary School, Baripada</option>
<option value="Krushna Chandrapur Higher Secondary School, Krushnachandrapur">Krushna Chandrapur Higher Secondary School, Krushnachandrapur</option>
<option value="Sri Maa Mahila Higher Secondary School, Baripada">Sri Maa Mahila Higher Secondary School, Baripada</option>
<option value="Sri Rama Chandra Bhanj Higher Secondary School, Ragdha">Sri Rama Chandra Bhanj Higher Secondary School, Ragdha</option>
<option value="Maharaja Purna Chandra Higher Secondary School, Baripada">Maharaja Purna Chandra Higher Secondary School, Baripada</option>
<option value="Anla Higher Secondary School, Anla">Anla Higher Secondary School, Anla</option>
<option value="Betnoti Higher Secondary School, Betnoti">Betnoti Higher Secondary School, Betnoti</option>
<option value="Mahatma Gandhi Higher Secondary School, Baisingha">Mahatma Gandhi Higher Secondary School, Baisingha</option>
<option value="Kailash Chandra Dilip Kumar Higher Secondary School, Bijatola">Kailash Chandra Dilip Kumar Higher Secondary School, Bijatola</option>
<option value="Rajanikanta Higher Secondary School, Luhasila">Rajanikanta Higher Secondary School, Luhasila</option>
<option value="Gouri Shankar Higher Secondary School, Khadiasole">Gouri Shankar Higher Secondary School, Khadiasole</option>
<option value="Kalinga Higher Secondary School, Manada">Kalinga Higher Secondary School, Manada</option>
<option value="Anchalika Higher Secondary School, Puruna Baripada">Anchalika Higher Secondary School, Puruna Baripada</option>
<option value="Saraswata Higher Secondary School, Kuamara">Saraswata Higher Secondary School, Kuamara</option>
<option value="LSPS GOVT HIGHER SECONDARY SCHOOL, MORANDA">LSPS GOVT HIGHER SECONDARY SCHOOL, MORANDA</option>
<option value="Saheed Birsa Munda Higher Secondary School, Jamda">Saheed Birsa Munda Higher Secondary School, Jamda</option>
<option value="Jashipur Higher Secondary School, Jashipur">Jashipur Higher Secondary School, Jashipur</option>
<option value="Ridayanath Higher Secondary School, Barbil">Ridayanath Higher Secondary School, Barbil</option>
<option value="Kaptipada Higher Secondary School, Kaptipada">Kaptipada Higher Secondary School, Kaptipada</option>
<option value="Kaptipada Higher Secondary School, Nuasahi">Kaptipada Higher Secondary School, Nuasahi</option>
<option value="Meghasan Higher Secondary School, Nudadiha">Meghasan Higher Secondary School, Nudadiha</option>
<option value="Pandit Raghunath Murmu Higher Secondary School, Sarat">Pandit Raghunath Murmu Higher Secondary School, Sarat</option>
<option value="Deo Higher Secondary School, Tato">Deo Higher Secondary School, Tato</option>
<option value="Raghunath Higher Secondary School, Kadadiha">Raghunath Higher Secondary School, Kadadiha</option>
<option value="Karanjia Higher Secondary School, Karanjia">Karanjia Higher Secondary School, Karanjia</option>
<option value="Panchapir Womens Higher Secondary School, Karanjia">Panchapir Womens Higher Secondary School, Karanjia</option>
<option value="Bhanjabhumi Higher Secondary School, Dukura">Bhanjabhumi Higher Secondary School, Dukura</option>
<option value="Dhanghera Higher Secondary School, Dhanghera">Dhanghera Higher Secondary School, Dhanghera</option>
<option value="Khunta Higher Secondary School, Khunta">Khunta Higher Secondary School, Khunta</option>
<option value="Panchapalli Higher Secondary School, Sainkula">Panchapalli Higher Secondary School, Sainkula</option>
<option value="Baigan Badia Higher Secondary School, Baiganbadia">Baigan Badia Higher Secondary School, Baiganbadia</option>
<option value="Maa Duarsuni Higher Secondary School, Kuabuda">Maa Duarsuni Higher Secondary School, Kuabuda</option>
<option value="Badampahar Higher Secondary School, Badampahar">Badampahar Higher Secondary School, Badampahar</option>
<option value="Janaki Balava Higher Secondary School, Hatabhadra">Janaki Balava Higher Secondary School, Hatabhadra</option>
<option value="Baba Jateswar Higher Secondary School, Chhataraipur">Baba Jateswar Higher Secondary School, Chhataraipur</option>
<option value="Chitrada Higher Secondary School, Chitrada">Chitrada Higher Secondary School, Chitrada</option>
<option value="Gadia Anchalika Higher Secondary School, Gadia">Gadia Anchalika Higher Secondary School, Gadia</option>
<option value="Gorumahisani Iron Higher Secondary School, Gorumahisani">Gorumahisani Iron Higher Secondary School, Gorumahisani</option>
<option value="Mahila Higher Secondary School, Rairangpur">Mahila Higher Secondary School, Rairangpur</option>
<option value="Rairangpur Higher Secondary School, Rairangpur">Rairangpur Higher Secondary School, Rairangpur</option>
<option value="Angarpada Panchayat Higher Secondary School, Raruan">Angarpada Panchayat Higher Secondary School, Raruan</option>
<option value="Biju Patnaik Higher Secondary School, Ghagarbeda">Biju Patnaik Higher Secondary School, Ghagarbeda</option>
<option value="Chaitanya Prasad Higher Secondary School, Bhanjakia">Chaitanya Prasad Higher Secondary School, Bhanjakia</option>
<option value="Binod Bihari Anchalik Higher Secondary School, Rasgovindpur">Binod Bihari Anchalik Higher Secondary School, Rasgovindpur</option>
<option value="Radha Govinda Anchalik Higher Secondary School, Amarda">Radha Govinda Anchalik Higher Secondary School, Amarda</option>
<option value="Sahid Memorial Higher Secondary School, Manida">Sahid Memorial Higher Secondary School, Manida</option>
<option value="Upendra Nath Higher Secondary School, Nalagaja">Upendra Nath Higher Secondary School, Nalagaja</option>
<option value="Banabhumi Higher Secondary School, Rangamatia">Banabhumi Higher Secondary School, Rangamatia</option>
<option value="Chaitanya Prasad Higher Secondary School, Kendua">Chaitanya Prasad Higher Secondary School, Kendua</option>
<option value="Jhansirani Women's Higher Secondary School, Padasitha">Jhansirani Women's Higher Secondary School, Padasitha</option>
<option value="Saratpal Higher Secondary School, Palvihar">Saratpal Higher Secondary School, Palvihar</option>
<option value="Seemanta Higher Secondary School, Jharpokharia">Seemanta Higher Secondary School, Jharpokharia</option>
<option value="Biju Patnaik Higher Secondary School, Singda">Biju Patnaik Higher Secondary School, Singda</option>
<option value="Maa Kitchakeswari Higher Secondary School, Khiching">Maa Kitchakeswari Higher Secondary School, Khiching</option>
<option value="Sukruli Higher Secondary School, Sukruli">Sukruli Higher Secondary School, Sukruli</option>
<option value="Goura Mohan Sathua Higher Secondary School, Kosta">Goura Mohan Sathua Higher Secondary School, Kosta</option>
<option value="Panchayat Samiti Higher Secondary School, Dharampura">Panchayat Samiti Higher Secondary School, Dharampura</option>
<option value="Utkal Banani Higher Secondary School, Chaksuliapada">Utkal Banani Higher Secondary School, Chaksuliapada</option>
<option value="Fulamati Hembram Higher Secondary School, Padiabeda">Fulamati Hembram Higher Secondary School, Padiabeda</option>
<option value="Maa Basuli Higher Secondary School, Thakurmunda">Maa Basuli Higher Secondary School, Thakurmunda</option>
<option value="Government Science Higher Secondary School, Tiringi">Government Science Higher Secondary School, Tiringi</option>
<option value="Luipa Higher Secondary School, Radho">Luipa Higher Secondary School, Radho</option>
<option value="Rohi Das Soren Higher Secondary School, Kundabai">Rohi Das Soren Higher Secondary School, Kundabai</option>
<option value="Indira Gandhi Mahila Higher Secondary School, Udala">Indira Gandhi Mahila Higher Secondary School, Udala</option>
<option value="Udala Higher Secondary School, Udala">Udala Higher Secondary School, Udala</option>
<option value="Panabedha Higher Secondary School, Chandahandi">Panabedha Higher Secondary School, Chandahandi</option>
<option value="Bhairab Higher Secondary School, Dabugan">Bhairab Higher Secondary School, Dabugan</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BORIGAM">GOVT HIGHER SECONDARY SCHOOL, BORIGAM</option>
<option value="Jharigam Higher Secondary School, Jharigam">Jharigam Higher Secondary School, Jharigam</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BANKULI">GOVT HIGHER SECONDARY SCHOOL, BANKULI</option>
<option value="Raj Chaunria Higher Secondary School, Kodinga">Raj Chaunria Higher Secondary School, Kodinga</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BHATIGAM">GOVT HIGHER SECONDARY SCHOOL, BHATIGAM</option>
<option value="Nabarangpur Higher Secondary School, Nawarangpur">Nabarangpur Higher Secondary School, Nawarangpur</option>
<option value="Nawarangpur Women's Higher Secondary School, Nawarangpur">Nawarangpur Women's Higher Secondary School, Nawarangpur</option>
<option value="NANDAHANDI GOVT HIGHER SECONDARY SCHOOL">NANDAHANDI GOVT HIGHER SECONDARY SCHOOL</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, CHERCHETTA">GOVT HIGHER SECONDARY SCHOOL, CHERCHETTA</option>
<option value="Maidalpur Higher Secondary School, Maidalpur">Maidalpur Higher Secondary School, Maidalpur</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, GONA">GOVT HIGHER SECONDARY SCHOOL, GONA</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, TURUDIHI">GOVT HIGHER SECONDARY SCHOOL, TURUDIHI</option>
<option value="Panchayat Samiti Higher Secondary School, Raighar">Panchayat Samiti Higher Secondary School, Raighar</option>
<option value="Indrabati Project Higher Secondary School, Khatiguda">Indrabati Project Higher Secondary School, Khatiguda</option>
<option value="SADASIBA HIGHER SECONDARY SCHOOL, DAHANA">SADASIBA HIGHER SECONDARY SCHOOL, DAHANA</option>
<option value="Biju Pattnaik ST Women's Higher Secondary School, Umerkote">Biju Pattnaik ST Women's Higher Secondary School, Umerkote</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, JAMURUNDA">GOVT HIGHER SECONDARY SCHOOL, JAMURUNDA</option>
<option value="Pendrani Higher Secondary School, Umerkote">Pendrani Higher Secondary School, Umerkote</option>
<option value="Bhapur Anchalik Higher Secondary School, Bhapur">Bhapur Anchalik Higher Secondary School, Bhapur</option>
<option value="Prahallad Higher Secondary School, Padmavati">Prahallad Higher Secondary School, Padmavati</option>
<option value="Brundabana Subudhi Higher Secondary School, Daspalla">Brundabana Subudhi Higher Secondary School, Daspalla</option>
<option value="Krushna Priya Devi Women's Higher Secondary School, Daspalla">Krushna Priya Devi Women's Higher Secondary School, Daspalla</option>
<option value="Maninag Bahumukhi Higher Secondary School, Takara">Maninag Bahumukhi Higher Secondary School, Takara</option>
<option value="Banamali Barik Higher Secondary School, Adakata">Banamali Barik Higher Secondary School, Adakata</option>
<option value="Shree Shree Raghunath Jew Higher Secondary School, Gania">Shree Shree Raghunath Jew Higher Secondary School, Gania</option>
<option value="Nilamadhab Higher Secondary School, Kantilo">Nilamadhab Higher Secondary School, Kantilo</option>
<option value="Pathani Samanta Higher Secondary School, Khandapara">Pathani Samanta Higher Secondary School, Khandapara</option>
<option value="Women's Higher Secondary School, Khandapara">Women's Higher Secondary School, Khandapara</option>
<option value="Higher Secondary Higher Secondary School, Boulasahi">Higher Secondary Higher Secondary School, Boulasahi</option>
<option value="Itamati Higher Secondary School of Education & Technology, Itamati">Itamati Higher Secondary School of Education & Technology, Itamati</option>
<option value="Naba Choudhury Higher Secondary School, Kendudhipi">Naba Choudhury Higher Secondary School, Kendudhipi</option>
<option value="Nayagarh Higher Secondary School, Nayagarh">Nayagarh Higher Secondary School, Nayagarh</option>
<option value="Nayagarh Prajamandal Mahila Higher Secondary School, Nayagarh">Nayagarh Prajamandal Mahila Higher Secondary School, Nayagarh</option>
<option value="Dadhibamanjew Higher Secondary School , Bahadajhola">Dadhibamanjew Higher Secondary School , Bahadajhola</option>
<option value="Gatiswar Higher Secondary School, Malisahi">Gatiswar Higher Secondary School, Malisahi</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, MAHIPUR">GOVT HIGHER SECONDARY SCHOOL, MAHIPUR</option>
<option value="Nuagaon Higher Secondary School, Nuagaon">Nuagaon Higher Secondary School, Nuagaon</option>
<option value="Ananda Sahu Women's Higher Secondary School, Komanda">Ananda Sahu Women's Higher Secondary School, Komanda</option>
<option value="Raghunath Samabaya Higher Secondary School, Odagaon">Raghunath Samabaya Higher Secondary School, Odagaon</option>
<option value="Sarankul Higher Secondary School, Sarankul">Sarankul Higher Secondary School, Sarankul</option>
<option value="Shree Ladukesh Anchalik Higher Secondary School, Godipada">Shree Ladukesh Anchalik Higher Secondary School, Godipada</option>
<option value="Arjuna Rout Memorial Higher Secondary School, Mayurjhalia">Arjuna Rout Memorial Higher Secondary School, Mayurjhalia</option>
<option value="Garhbanikilo Higher Secondary School, Garhbanikilo">Garhbanikilo Higher Secondary School, Garhbanikilo</option>
<option value="Maa Maninag Durga Mahila Higher Secondary School, Ranpur">Maa Maninag Durga Mahila Higher Secondary School, Ranpur</option>
<option value="Mohan Mahila Higher Secondary School, Chandpur">Mohan Mahila Higher Secondary School, Chandpur</option>
<option value="Rajasunakhala Higher Secondary School, Rajasunakhala">Rajasunakhala Higher Secondary School, Rajasunakhala</option>
<option value="Ranapur Higher Secondary School, Ranpur">Ranapur Higher Secondary School, Ranpur</option>
<option value="BASTRAYANI GOVT HIGHER SECONDARY SCHOOL, DOMJHAR">BASTRAYANI GOVT HIGHER SECONDARY SCHOOL, DOMJHAR</option>
<option value="Biju Pattnaik Higher Secondary School, Boden">Biju Pattnaik Higher Secondary School, Boden</option>
<option value="Sri Jagannath Higher Secondary School, Karangamal">Sri Jagannath Higher Secondary School, Karangamal</option>
<option value="Bibekananda Meher Higher Secondary School, Bhulia Sikuan">Bibekananda Meher Higher Secondary School, Bhulia Sikuan</option>
<option value="JAI KISHAN GOVT HIGHER SECONDARY SCHOOL, BARGAON">JAI KISHAN GOVT HIGHER SECONDARY SCHOOL, BARGAON</option>
<option value="Pallipragati Higher Secondary School, Dohelpada">Pallipragati Higher Secondary School, Dohelpada</option>
<option value="Upendra Prabhakar Higher Secondary School, Tukla">Upendra Prabhakar Higher Secondary School, Tukla</option>
<option value="Khadial Mahila Higher Secondary School, Khariar">Khadial Mahila Higher Secondary School, Khariar</option>
<option value="Khariar Higher Secondary School, Khariar">Khariar Higher Secondary School, Khariar</option>
<option value="JAI KISAN GOVT HIGHER SECONDARY SCHOOL, LAKHNA">JAI KISAN GOVT HIGHER SECONDARY SCHOOL, LAKHNA</option>
<option value="Panchayat Higher Secondary School, Budhikomna">Panchayat Higher Secondary School, Budhikomna</option>
<option value="Panchayat Samiti Higher Secondary School, Komna">Panchayat Samiti Higher Secondary School, Komna</option>
<option value="Government Science Higher Secondary School, Nuapada">Government Science Higher Secondary School, Nuapada</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, BHALESWAR">GOVT HIGHER SECONDARY SCHOOL, BHALESWAR</option>
<option value="JANAMANGAL GOVT HIGHER SECONDARY SCHOOL, KULIABANDHA">JANAMANGAL GOVT HIGHER SECONDARY SCHOOL, KULIABANDHA</option>
<option value="National Higher Secondary School, Nuapada">National Higher Secondary School, Nuapada</option>
<option value="G.M. Higher Secondary School, Hatibandh">G.M. Higher Secondary School, Hatibandh</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, PORTIPADA">GOVT HIGHER SECONDARY SCHOOL, PORTIPADA</option>
<option value="Sinapali Higher Secondary School, Sinapali">Sinapali Higher Secondary School, Sinapali</option>
<option value="Astaranga Higher Secondary School, Astaranga">Astaranga Higher Secondary School, Astaranga</option>
<option value="Mahatma Gandhi Higher Secondary School of Education & Techchnology, Astaranga">Mahatma Gandhi Higher Secondary School of Education & Techchnology, Astaranga</option>
<option value="Ratanpur Science Higher Secondary School, Ratanpur">Ratanpur Science Higher Secondary School, Ratanpur</option>
<option value="Alarnath Dhandamulak Higher Secondary School, Brahmagiri">Alarnath Dhandamulak Higher Secondary School, Brahmagiri</option>
<option value="ATIBADI JAGANNATH DAS GOVT HIGHER SECONDARY SCHOOL, KAPILESWARPUR">ATIBADI JAGANNATH DAS GOVT HIGHER SECONDARY SCHOOL, KAPILESWARPUR</option>
<option value="Baxi Jagabandhu Bidyadhar Higher Secondary School, Gadaradang">Baxi Jagabandhu Bidyadhar Higher Secondary School, Gadaradang</option>
<option value="Brahmeswar Higher Secondary School, Dharmakriti">Brahmeswar Higher Secondary School, Dharmakriti</option>
<option value="Harachandi Mahila Higher Secondary School, Rebana">Harachandi Mahila Higher Secondary School, Rebana</option>
<option value="Manein Higher Secondary School, Kandagoda">Manein Higher Secondary School, Kandagoda</option>
<option value="Acharya Harihara Smruti Higher Secondary School, Indipur">Acharya Harihara Smruti Higher Secondary School, Indipur</option>
<option value="Delanga Higher Secondary School, Delanga">Delanga Higher Secondary School, Delanga</option>
<option value="Kalyanpur Science Higher Secondary School, Kalyanpur">Kalyanpur Science Higher Secondary School, Kalyanpur</option>
<option value="Panchayat Higher Secondary School, Matiapada, Godiput">Panchayat Higher Secondary School, Matiapada, Godiput</option>
<option value="Gop Higher Secondary School, Gop">Gop Higher Secondary School, Gop</option>
<option value="Konark Women's Higher Secondary School, Sarada">Konark Women's Higher Secondary School, Sarada</option>
<option value="Nayahat Higher Secondary School, Nayahat">Nayahat Higher Secondary School, Nayahat</option>
<option value="Radhaballav Higher Secondary School, Bairipur">Radhaballav Higher Secondary School, Bairipur</option>
<option value="Mangala Higher Secondary School, Kakatpur">Mangala Higher Secondary School, Kakatpur</option>
<option value="Netrananda Sahu Women's Higher Secondary School, Kakatpur">Netrananda Sahu Women's Higher Secondary School, Kakatpur</option>
<option value="Prachi Higher Secondary School, Bangurigaon">Prachi Higher Secondary School, Bangurigaon</option>
<option value="Chouda Mouza Bidyut Higher Secondary School, Garhsanput">Chouda Mouza Bidyut Higher Secondary School, Garhsanput</option>
<option value="Dayavihar Higher Secondary School, Kanas">Dayavihar Higher Secondary School, Kanas</option>
<option value="Kanas Higher Secondary School, Kanas">Kanas Higher Secondary School, Kanas</option>
<option value="Konark Bhagabati Higher Secondary School, Konark">Konark Bhagabati Higher Secondary School, Konark</option>
<option value="Hariswar Dev Vocational Science Higher Secondary School, Panaspada">Hariswar Dev Vocational Science Higher Secondary School, Panaspada</option>
<option value="Kandakhai Higher Secondary School of Science & Arts, Kandakhai">Kandakhai Higher Secondary School of Science & Arts, Kandakhai</option>
<option value="Maa Ramachandi Chilika Women's Higher Secondary School, Charichhak, Titipa">Maa Ramachandi Chilika Women's Higher Secondary School, Charichhak, Titipa</option>
<option value="Panchayat Higher Secondary School of Education & Technology, Satapada">Panchayat Higher Secondary School of Education & Technology, Satapada</option>
<option value="Rukmani Devi Chilika Higher Secondary School, Nuapada">Rukmani Devi Chilika Higher Secondary School, Nuapada</option>
<option value="Balanga Higher Secondary School, Balanga">Balanga Higher Secondary School, Balanga</option>
<option value="Banishree Higher Secondary School, Kuanarpur">Banishree Higher Secondary School, Kuanarpur</option>
<option value="Lankeswari Mahila Higher Secondary School, Beraboi, Balanga">Lankeswari Mahila Higher Secondary School, Beraboi, Balanga</option>
<option value="Nigamananda Mahila Higher Secondary School, Chari Chhak">Nigamananda Mahila Higher Secondary School, Chari Chhak</option>
<option value="Indira Gandhi Women's Higher Secondary School, Nimapara">Indira Gandhi Women's Higher Secondary School, Nimapara</option>
<option value="Nimapada Higher Secondary School, Nimapada">Nimapada Higher Secondary School, Nimapada</option>
<option value="Mahatma Gandhi Memorial Higher Secondary School of Education and Techchnology, Pubasasan">Mahatma Gandhi Memorial Higher Secondary School of Education and Techchnology, Pubasasan</option>
<option value="Pipili Higher Secondary School, Pipili">Pipili Higher Secondary School, Pipili</option>
<option value="Government Women's Higher Secondary School, Puri">Government Women's Higher Secondary School, Puri</option>
<option value="Nilachal Narayan Ayurveda Chatuspathi Higher Secondary School">Nilachal Narayan Ayurveda Chatuspathi Higher Secondary School</option>
<option value="Puri Women's Higher Secondary School, Narendrakona">Puri Women's Higher Secondary School, Narendrakona</option>
<option value="Samanta Chandra Sekhar Higher Secondary School, Puri">Samanta Chandra Sekhar Higher Secondary School, Puri</option>
<option value="Surajamala Saha Higher Secondary School, Saradhabali">Surajamala Saha Higher Secondary School, Saradhabali</option>
<option value="Gopinath Dev Higher Secondary School, Pratap Purusottampur">Gopinath Dev Higher Secondary School, Pratap Purusottampur</option>
<option value="Shastri Smruti Higher Secondary School, Baliput">Shastri Smruti Higher Secondary School, Baliput</option>
<option value="Sri Sri Beleswar Gopinath Higher Secondary School, Balighai">Sri Sri Beleswar Gopinath Higher Secondary School, Balighai</option>
<option value="Utkalmani Gopabandhu Smruti Higher Secondary School, Sakhigopal">Utkalmani Gopabandhu Smruti Higher Secondary School, Sakhigopal</option>
<option value="Maa Markama Higher Secondary School, Bisam Cuttack">Maa Markama Higher Secondary School, Bisam Cuttack</option>
<option value="PS GOVT HIGHER SECONDARY SCHOOL, DURGI">PS GOVT HIGHER SECONDARY SCHOOL, DURGI</option>
<option value="CHANDRAPUR GOVT HIGHER SECONDARY SCHOOL">CHANDRAPUR GOVT HIGHER SECONDARY SCHOOL</option>
<option value="Science Higher Secondary School, Gudari">Science Higher Secondary School, Gudari</option>
<option value="Dr. B.R.N. Higher Secondary School, Dombosora">Dr. B.R.N. Higher Secondary School, Dombosora</option>
<option value="Gunupur Higher Secondary School, Gunupur">Gunupur Higher Secondary School, Gunupur</option>
<option value="Thyarama Women's Higher Secondary School, Gunupur">Thyarama Women's Higher Secondary School, Gunupur</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, TIKIRI">GOVT HIGHER SECONDARY SCHOOL, TIKIRI</option>
<option value="Manikeswari Adivasi Higher Secondary School, Kashipur">Manikeswari Adivasi Higher Secondary School, Kashipur</option>
<option value="JAGADAMBA GOVT HIGHER SECONDARY SCHOOL, KOLNORA">JAGADAMBA GOVT HIGHER SECONDARY SCHOOL, KOLNORA</option>
<option value="Ambodala Samant Higher Secondary School, Ambadola">Ambodala Samant Higher Secondary School, Ambadola</option>
<option value="Muniguda Higher Secondary School, Gobardhana">Muniguda Higher Secondary School, Gobardhana</option>
<option value="R.G. Higher Secondary School, Padmapur">R.G. Higher Secondary School, Padmapur</option>
<option value="Droupadi Higher Secondary School, Gumuda">Droupadi Higher Secondary School, Gumuda</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, RAMANAGUDA">GOVT HIGHER SECONDARY SCHOOL, RAMANAGUDA</option>
<option value="Lakshmipati Singania Higher Secondary School, Jaykaypur">Lakshmipati Singania Higher Secondary School, Jaykaypur</option>
<option value="Ugratara Higher Secondary School, Komtalpeta">Ugratara Higher Secondary School, Komtalpeta</option>
<option value="Rayagada Higher Secondary School, Rayagada">Rayagada Higher Secondary School, Rayagada</option>
<option value="Rayagada Women's Higher Secondary School, Rayagada">Rayagada Women's Higher Secondary School, Rayagada</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, GARPOSH">GOVT HIGHER SECONDARY SCHOOL, GARPOSH</option>
<option value="Parsuram Gountia Higher Secondary School, Jarabaga">Parsuram Gountia Higher Secondary School, Jarabaga</option>
<option value="Prabhu Dayal Rural Higher Secondary School, Kesaibahal">Prabhu Dayal Rural Higher Secondary School, Kesaibahal</option>
<option value="Trust Fund Higher Secondary School, Bamra">Trust Fund Higher Secondary School, Bamra</option>
<option value="Burla N.A.C. Higher Secondary School, Burla">Burla N.A.C. Higher Secondary School, Burla</option>
<option value="D.P.A. Higher Secondary School, Sason">D.P.A. Higher Secondary School, Sason</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, CHIPILIMA">GOVT HIGHER SECONDARY SCHOOL, CHIPILIMA</option>
<option value="Jai Durga Higher Secondary School, Padiabahal">Jai Durga Higher Secondary School, Padiabahal</option>
<option value="Saraswat Higher Secondary School, Godbhaga">Saraswat Higher Secondary School, Godbhaga</option>
<option value="V.S.S. Institute of Science Higher Secondary School, Dhankauda">V.S.S. Institute of Science Higher Secondary School, Dhankauda</option>
<option value="Hirakud Higher Secondary School, Hirakud">Hirakud Higher Secondary School, Hirakud</option>
<option value="B.R.G. Higher Secondary School, Bhojpur">B.R.G. Higher Secondary School, Bhojpur</option>
<option value="Fashimal Anchalik Higher Secondary School, Fashimal">Fashimal Anchalik Higher Secondary School, Fashimal</option>
<option value="Jamankira Higher Secondary School, Jamankira">Jamankira Higher Secondary School, Jamankira</option>
<option value="Dr. J.K. Sahu Higher Secondary School, Parmanpur">Dr. J.K. Sahu Higher Secondary School, Parmanpur</option>
<option value="Parbati Giri Arts Higher Secondary School, Mahulpali">Parbati Giri Arts Higher Secondary School, Mahulpali</option>
<option value="V.S.S. Higher Secondary School, Jujomura">V.S.S. Higher Secondary School, Jujomura</option>
<option value="Gokul Parvati Rural Higher Secondary School, Kuntara">Gokul Parvati Rural Higher Secondary School, Kuntara</option>
<option value="Kutrachuan Higher Secondary School, Kutrachuan">Kutrachuan Higher Secondary School, Kutrachuan</option>
<option value="Rajiv Gandhi Memorial Tribal Higher Secondary School, Kalheipali">Rajiv Gandhi Memorial Tribal Higher Secondary School, Kalheipali</option>
<option value="Kuchinda Higher Secondary School, Kuchinda">Kuchinda Higher Secondary School, Kuchinda</option>
<option value="Kuchinda Women's Higher Secondary School, Kuchinda">Kuchinda Women's Higher Secondary School, Kuchinda</option>
<option value="D.P.A. Higher Secondary School, Mura">D.P.A. Higher Secondary School, Mura</option>
<option value="Maa Jhadeswari Higher Secondary School, Dhama">Maa Jhadeswari Higher Secondary School, Dhama</option>
<option value="Mandhata Baba Higher Secondary School, Maneswar">Mandhata Baba Higher Secondary School, Maneswar</option>
<option value="Batgaon Higher Secondary School, Batgaon">Batgaon Higher Secondary School, Batgaon</option>
<option value="Kisinda Higher Secondary School, Kisinda">Kisinda Higher Secondary School, Kisinda</option>
<option value="Naktideul Higher Secondary School, Naktideul">Naktideul Higher Secondary School, Naktideul</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KADALIGARH">GOVT HIGHER SECONDARY SCHOOL, KADALIGARH</option>
<option value="Jai Jagannath Higher Secondary School, R.Badmal">Jai Jagannath Higher Secondary School, R.Badmal</option>
<option value="Bhim Bhoi Higher Secondary School, Rairakhol">Bhim Bhoi Higher Secondary School, Rairakhol</option>
<option value="Rairakhol Women's Higher Secondary School, Rairakhol">Rairakhol Women's Higher Secondary School, Rairakhol</option>
<option value="Dutika Sahu Higher Secondary School, Laida">Dutika Sahu Higher Secondary School, Laida</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, LAPANGA">GOVT HIGHER SECONDARY SCHOOL, LAPANGA</option>
<option value="Netaji Subash Chandra Bose Higher Secondary School, Sambalpur">Netaji Subash Chandra Bose Higher Secondary School, Sambalpur</option>
<option value="Surajmal Higher Secondary School, Rampella">Surajmal Higher Secondary School, Rampella</option>
<option value="Gangadhar Meher Higher Secondary School, Sambalpur">Gangadhar Meher Higher Secondary School, Sambalpur</option>
<option value="Government Women's Higher Secondary School, Sambalpur">Government Women's Higher Secondary School, Sambalpur</option>
<option value="R.K.D.T. Higher Secondary School, Sambalpur">R.K.D.T. Higher Secondary School, Sambalpur</option>
<option value="Samaleswari Higher Secondary School, Sambalpur">Samaleswari Higher Secondary School, Sambalpur</option>
<option value="Binka Women’s Higher Secondary School, Phulmuthi">Binka Women’s Higher Secondary School, Phulmuthi</option>
<option value="Shree Jagannath Higher Secondary School, Bausuni">Shree Jagannath Higher Secondary School, Bausuni</option>
<option value="Siddhartha Higher Secondary School, Binka">Siddhartha Higher Secondary School, Binka</option>
<option value="Birmaharajpur Higher Secondary School, Birmaharajpur">Birmaharajpur Higher Secondary School, Birmaharajpur</option>
<option value="Parameswari Higher Secondary School, Bhutiapali">Parameswari Higher Secondary School, Bhutiapali</option>
<option value="Subalaya Higher Secondary School, Subalaya">Subalaya Higher Secondary School, Subalaya</option>
<option value="Babaji Sahu Higher Secondary School, Gajabandh">Babaji Sahu Higher Secondary School, Gajabandh</option>
<option value="Dunguripali Higher Secondary School, Dunguripali">Dunguripali Higher Secondary School, Dunguripali</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, SUKHA">GOVT HIGHER SECONDARY SCHOOL, SUKHA</option>
<option value="Panchayat Women's Higher Secondary School, S. Rampur">Panchayat Women's Higher Secondary School, S. Rampur</option>
<option value="Shreeram Higher Secondary School, S. Rampur">Shreeram Higher Secondary School, S. Rampur</option>
<option value="Gram Panchayat Higher Secondary School, Lachhipur">Gram Panchayat Higher Secondary School, Lachhipur</option>
<option value="Maa Maheswari Higher Secondary School, Khambeswaripali">Maa Maheswari Higher Secondary School, Khambeswaripali</option>
<option value="Biju Pattnaik Women's Higher Secondary School, Sonepur">Biju Pattnaik Women's Higher Secondary School, Sonepur</option>
<option value="Sonepur Higher Secondary School, Sonepur">Sonepur Higher Secondary School, Sonepur</option>
<option value="M.B.R. Higher Secondary School, Menda">M.B.R. Higher Secondary School, Menda</option>
<option value="Panchayat Higher Secondary School, Charbhata">Panchayat Higher Secondary School, Charbhata</option>
<option value="A.E.S. Higher Secondary School, Tarbha">A.E.S. Higher Secondary School, Tarbha</option>
<option value="Dharmasala Higher Secondary School, Dharmasala">Dharmasala Higher Secondary School, Dharmasala</option>
<option value="Panchayat Samiti Higher Secondary School, Ullunda">Panchayat Samiti Higher Secondary School, Ullunda</option>
<option value="Satyabadi Higher Secondary School, Kalapathar">Satyabadi Higher Secondary School, Kalapathar</option>
<option value="Kinjirkela Higher Secondary School, Kinjirkela">Kinjirkela Higher Secondary School, Kinjirkela</option>
<option value="Panchayat Samiti Higher Secondary School, Balisankara">Panchayat Samiti Higher Secondary School, Balisankara</option>
<option value="Panchayat Higher Secondary School, Bargaon-Kachhar">Panchayat Higher Secondary School, Bargaon-Kachhar</option>
<option value="Panchayat Samiti Higher Secondary School, Bargaon">Panchayat Samiti Higher Secondary School, Bargaon</option>
<option value="Shrama Sakti Higher Secondary School, Biramitrapur">Shrama Sakti Higher Secondary School, Biramitrapur</option>
<option value="Higher Secondary School of Arts, Science & Technology , Bondamunda">Higher Secondary School of Arts, Science & Technology , Bondamunda</option>
<option value="Neelashaila Higher Secondary School, Jagada">Neelashaila Higher Secondary School, Jagada</option>
<option value="Subodh Routray Higher Secondary School, Bisra">Subodh Routray Higher Secondary School, Bisra</option>
<option value="Balanipat Higher Secondary School, Jhirdapali">Balanipat Higher Secondary School, Jhirdapali</option>
<option value="Banshidhar Higher Secondary School, Kenaveta">Banshidhar Higher Secondary School, Kenaveta</option>
<option value="Bonaigarh Higher Secondary School, Bonaigarh">Bonaigarh Higher Secondary School, Bonaigarh</option>
<option value="Jadupati Higher Secondary School, Sihidia">Jadupati Higher Secondary School, Sihidia</option>
<option value="AGM GOVT HIGHER SECONDARY SCHOOL, SOLE">AGM GOVT HIGHER SECONDARY SCHOOL, SOLE</option>
<option value="Panchayat Samiti Higher Secondary School, Gurundia">Panchayat Samiti Higher Secondary School, Gurundia</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KANIKA">GOVT HIGHER SECONDARY SCHOOL, KANIKA</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, LUABAHAL">GOVT HIGHER SECONDARY SCHOOL, LUABAHAL</option>
<option value="Manikeswari Higher Secondary School, Garh-Tumulia">Manikeswari Higher Secondary School, Garh-Tumulia</option>
<option value="Panchayat Samiti Higher Secondary School, Hemgir">Panchayat Samiti Higher Secondary School, Hemgir</option>
<option value="Vesaja Patel Higher Secondary School, Duduka">Vesaja Patel Higher Secondary School, Duduka</option>
<option value="Koida Higher Secondary School, Koida">Koida Higher Secondary School, Koida</option>
<option value="Dalmia Higher Secondary School, Jharbeda">Dalmia Higher Secondary School, Jharbeda</option>
<option value="Government Science Higher Secondary School, Kutra">Government Science Higher Secondary School, Kutra</option>
<option value="Veer Birsamunda Simanta Higher Secondary School,Gairbahal">Veer Birsamunda Simanta Higher Secondary School,Gairbahal</option>
<option value="Baba Baneswar Higher Secondary School, Bilaipara">Baba Baneswar Higher Secondary School, Bilaipara</option>
<option value="Lahunipara Higher Secondary School, Lahunipara">Lahunipara Higher Secondary School, Lahunipara</option>
<option value="Gurukul Sanskrit Higher Secondary School">Gurukul Sanskrit Higher Secondary School</option>
<option value="Priyadarshini Mahila Higher Secondary School, Jalda">Priyadarshini Mahila Higher Secondary School, Jalda</option>
<option value="Vedvyas Higher Secondary School, Vedvyas">Vedvyas Higher Secondary School, Vedvyas</option>
<option value="BASUDEV GOVT HIGHER SECONDARY SCHOOL, DUMABAHAL">BASUDEV GOVT HIGHER SECONDARY SCHOOL, DUMABAHAL</option>
<option value="Damodar Naik Higher Secondary School, Darlipali">Damodar Naik Higher Secondary School, Darlipali</option>
<option value="Lephripara Higher Secondary School, Lephripara">Lephripara Higher Secondary School, Lephripara</option>
<option value="S.R.D.M.N. Panchayat Higher Secondary School, Sargipali">S.R.D.M.N. Panchayat Higher Secondary School, Sargipali</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, HATIBARI">GOVT HIGHER SECONDARY SCHOOL, HATIBARI</option>
<option value="GOVT HIGHER SECONDARY SCHOOL, KHUNTAGAON">GOVT HIGHER SECONDARY SCHOOL, KHUNTAGAON</option>
<option value="Panchayat Samiti Higher Secondary School, Nuagaon">Panchayat Samiti Higher Secondary School, Nuagaon</option>
<option value="Kansbahal Higher Secondary School, Laing">Kansbahal Higher Secondary School, Laing</option>
<option value="Sarbati Devi Women's Higher Secondary School, Rajgangpur">Sarbati Devi Women's Higher Secondary School, Rajgangpur</option>
<option value="Gandhi Higher Secondary School, Deogaon">Gandhi Higher Secondary School, Deogaon</option>
<option value="Government Higher Secondary School, Rourkela">Government Higher Secondary School, Rourkela</option>
<option value="Hrushikesh Ray Higher Secondary School, Chhend">Hrushikesh Ray Higher Secondary School, Chhend</option>
<option value="Ispat Higher Secondary School, Rourkela">Ispat Higher Secondary School, Rourkela</option>
<option value="Kalyani Ray Higher Secondary School, Hamirpur">Kalyani Ray Higher Secondary School, Hamirpur</option>
<option value="Municipal Higher Secondary School, Rourkela">Municipal Higher Secondary School, Rourkela</option>
<option value="Rourkela Higher Secondary School, Rourkela">Rourkela Higher Secondary School, Rourkela</option>
<option value="Sushilabati Government Women's Higher Secondary School, Rourkela">Sushilabati Government Women's Higher Secondary School, Rourkela</option>
<option value="Utkal Gourav Madhusudan Higher Secondary School, Rourkela">Utkal Gourav Madhusudan Higher Secondary School, Rourkela</option>
<option value="New Orissa Higher Secondary School, Gaibira">New Orissa Higher Secondary School, Gaibira</option>
<option value="Subdega Anchalika Sahayog Higher Secondary School, Subdega">Subdega Anchalika Sahayog Higher Secondary School, Subdega</option>
<option value="Illa Memorial Panchayat Samiti Higher Secondary School, Kinjirma">Illa Memorial Panchayat Samiti Higher Secondary School, Kinjirma</option>
<option value="Panchayat Samiti Science & Arts Higher Secondary School, Bhedabahal">Panchayat Samiti Science & Arts Higher Secondary School, Bhedabahal</option>
<option value="Vesaja Rambhabati Higher Secondary School, Kundukela">Vesaja Rambhabati Higher Secondary School, Kundukela</option>
<option value="Government Higher Secondary School, Sundargarh">Government Higher Secondary School, Sundargarh</option>
<option value="Government Women's Higher Secondary School, Sundargarh">Government Women's Higher Secondary School, Sundargarh</option>
<option value="Jasoda Bishnu N.M.P. Higher Secondary School, Jogimal">Jasoda Bishnu N.M.P. Higher Secondary School, Jogimal</option>
<option value="Maharshi Dayanand Higher Secondary School, Garh-Mahulpali">Maharshi Dayanand Higher Secondary School, Garh-Mahulpali</option>
<option value="Ujalpur Higher Secondary School, Ujalpur">Ujalpur Higher Secondary School, Ujalpur</option>



    
   
  </select>
</div>
<div className="field">
  <select style={{backgroundColor:"black"}} className="name_select" value={signupRole} onChange={(e)=>setSignupRole(e.target.value)}  name="signupRole" id="signupRole" required>
    <option value="">Role</option>
    <option value="Institute">Institute</option>
    <option value="District_Officer">District Officer</option>
    <option value="State_Officer">State Officer</option>
    <option value="Super_Admin">Super-Admin</option>
  
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
