import { useState, useEffect, useRef } from "react";
import React from 'react';
import '../components/stylecss/Login.css';
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
  const schoolsArray = [
    "Sri Sri Jagannath Higher Secondary School, Badakera",
    "Evening Higher Secondary School, Angul",
    "Kashi Bishwanath Higher Secondary School, Paikasahi",
    "Satyabadi Meher Higher Secondary School, Madhapur",
    "Solapada Higher Secondary School, Thakurgarh",
    "Anchalik Higher Secondary School, Talmul",
    "Kumanda Jarasingha Anchalik Panchayat Higher Secondary School, Kumanda",
    "Nalco Nagar Regional Higher Secondary School, Kulad",
    "Jagamohan Higher Secondary School, Kuluma",
    "Anchalika Higher Secondary School, Angapada",
    "Gadtal Regional Higher Secondary School, Gadtal",
    "Bahanaga Higher Secondary School, Bahanaga",
    "Khantapara Mahila Higher Secondary School, Khantapara",
    "Satyanidhi Women's Higher Secondary School, Bishnupur",
    "Balangi Higher Secondary School, Sunahat",
    "Golakmani Mahila Higher Secondary School, Uitikiri",
    "Nilakantheswar Higher Secondary School, Bangara",
    "Judhisthir Higher Secondary School, Kundali",
    "Laxmipriya Mahila Higher Secondary School, Baliapal",
    "Baikunthanath Institute of Higher Technical Studies Higher Secondary School, Kachuadi",
    "Chandaneswar Higher Secondary School, Barbatia",
    "Chandaneswar Higher Secondary School, Sahabazpur",
    "Women's Higher Secondary School, Bhogarai",
    "Olamara Simanta Higher Secondary School, Olamara",
    "Sitala Thakurani Higher Secondary School, Khuluda",
    "Ustab Charan Gajiani Chandi Higher Secondary School, Bartana",
    "Agani Narendra Higher Secondary School, Antara",
    "Jambeswar Higher Secondary School, Garsang",
    "Kamala Arjuna Higher Secondary School, Gandibed",
    "Panchayat Samiti Mahila Higher Secondary School, Nahanga",
    "Nilagiri Women's Higher Secondary School, Nilagiri",
    "Baba Panchalingeswar Higher Secondary School, Santaragadia",
    "Laxmikanta Memorial Women's Higher Secondary School, Dakhini-Narasinghpur",
    "Bhimeswar Higher Secondary School, Bhimeswar",
    "Remuna Higher Secondary School, Remuna",
    "Shri Jagannath Educational Foundation Higher Secondary School, Barunsingh",
    "Gopaprana Higher Secondary School, Khirakona",
    "Kuntala Kumari Mahila Higher Secondary School, Bari",
    "Kudei Women's Higher Secondary School, Kudei",
    "Talanagar Higher Secondary School, Talanagar",
    "Swami Vivekananda Higher Secondary School, Dungri",
    "Anchalika Higher Secondary School, Paharsrigida",
    "Kadobahal Higher Secondary School, Kadobahal",
    "Baba Balunkeswar Higher Secondary School, Khuntapali",
    "Gandhi Memorial Higher Secondary School, Kalapani",
    "Milita Gram Panchayat Higher Secondary School, Sarsara",
    "Nabajoyti Higher Secondary School, Chakarkend",
    "Tora Higher Secondary School, Tora",
    "Jagabandhu Das Women's Higher Secondary School, Kadalipali",
    "Prof. Ghanshyam Das Gramanchal Higher Secondary School, Katapali",
    "Satalma Higher Secondary School, Satalma",
    "Kamgaon Higher Secondary School, Kamgaon",
    "Panchayat Higher Secondary School, Goudgaon",
    "Resham Anchalika Higher Secondary School, Resham",
    "Dora Higher Secondary School, Putukigrinjel",
    "Panchayat Higher Secondary School, Talpadar",
    "Goutam Buddha Higher Secondary School, Ganiapali",
    "Talpali Higher Secondary School, Talpali",
    "Dava Higher Secondary School, Dava",
    "Lakhmara Higher Secondary School, Lakhmara",
    "Vindhya Vasini Higher Secondary School, Paikmal",
    "Buddhadev Meher Higher Secondary School, Dahita",
    "Jamla Higher Secondary School, Jamla",
    "Kartik Malati Mahila Higher Secondary School, Jagannathpur",
    "Kamala Kishori Rout Mahila Higher Secondary School, Kusannagar",
    "Radhakanta Behera Higher Secondary School, Arnapala",
    "Rameswar Higher Secondary School, Randia",
    "Bhandaripokhari Higher Secondary School, Bhandaripokhari",
    "Nayanmani Women's Higher Secondary School, Saradapur",
    "Panchayat Higher Secondary School, Barikipur",
    "Agarpara Women's Higher Secondary School, Agarpara",
    "Utkal Keshari Dr. Hare Krushna Mahatab Higher Secondary School, Kenduapara",
    "Dhamrai Higher Secondary School, Narsinghpur",
    "Ghanteswar Higher Secondary School, Ghanteswar",
    "Lalit Siba Sankar Higher Secondary School, Motto",
    "Asurali Anchalika Mahila Higher Secondary School, Asurali",
    "Maniklal Women's Higher Secondary School, Talapada",
    "Jalandhar Higher Secondary School, Bharsuja",
    "Amar Jyoti Higher Secondary School, Kutumdola",
    "Budhadangar Higher Secondary School, Kudasingha",
    "Panchayat Higher Secondary School, Shibatala",
    "Pallishree Higher Secondary School, Sindhekela",
    "Panchayat Samiti Higher Secondary School, Bangomunda",
    "Prasanna Pal Higher Secondary School, Bhalumunda",
    "Binapani Higher Secondary School, Dhumabhata",
    "Panchayat Higher Secondary School, Sulekela",
    "Shree Jagannath Dev Higher Secondary School, Mandal",
    "Dhruba Ananda Higher Secondary School, Kuturla",
    "Anchalik Higher Secondary School, Rusuda",
    "Gram Panchayat Higher Secondary School, Tentulikhunti",
    "MLA Womens' Higher Secondary School, Kantabanji",
    "Harishankar Higher Secondary School, Khaprakhol",
    "Jawaharlal Nehru Higher Secondary School, Dhandamunda",
    "Panchayat Higher Secondary School, Lathor",
    "Panchayat Samiti Higher Secondary School, Muribahal",
    "Rajendra Meher Higher Secondary School, Jogimunda",
    "Patneswari Women's Higher Secondary School, Patnagarh",
    "Jamgaon Anchalika Higher Secondary School, Jamgaon",
    "Judhisthir Higher Secondary School, Chhatamakhana",
    "Radheshyam Anchalik Higher Secondary School, Bilaisarda",
  "Padmalochan Higher Secondary School, Tikrapara",
  "Panchayat Higher Secondary School, Ghunsar",
  "Utkalmani Gopabandhu Dash Higher Secondary School, Belgaon",
  "Rajiv Gandhi Panchayat Samiti Higher Secondary School, Turekela",
  "Gandhardi Higher Secondary School, Janhapank",
  "Maa Maheswari Higher Secondary School, Bausuni",
  "Boudh Women's Higher Secondary School, Boudh",
  "Harbhanga Anchalika Panchayat Higher Secondary School, Harbhanga",
  "T.K.S.M.R.G. Higher Secondary School, Ghantapada",
  "Choudwar Women's Higher Secondary School, Choudwar",
  "Radhanath Rath Vigyan Higher Secondary School, Khuntuni",
  "Baideswar Higher Secondary School, Baideswar",
  "Maniabandha Higher Secondary School, Maniabandha",
  "Sri Sri Swapneswar Deba Anchalika Higher Secondary School of Arts & Technology, Sankhamari",
  "Prabha Routray Higher Secondary School, Godisahi",
  "Dr. Keshaba Chandra Sahu Women's Higher Secondary School, Cuttack",
  "Mahanadi Vihar Women's Higher Secondary School, Cuttack",
  "Maulan Abdul Kalam Azad Multipurpose Higher Secondary School, Cuttack",
  "Raghunath Jew Higher Secondary School, Deulasahi",
  "Ananta Balia Higher Secondary School, Nuagarh",
  "Laksheswar Women's Higher Secondary School, Phulnakhara",
  "Domapara Anchalika Higher Secondary School, Dampara",
  "Rani Suka Dei Mahila Higher Secondary School, Banki",
  "Govindpur Higher Secondary School, Govindpur",
  "Govindpur Women's Higher Secondary School, Govindpur",
  "Durga Charan Nayak Memorial Higher Secondary School, Haladia",
  "Champanatha Dev Higher Secondary School, Champeswar",
  "Prachi Women's Higher Secondary School, Niali",
  "Ballavi Devi Mahila Higher Secondary School, Natakai",
  "Mahanadi Higher Secondary School, Ratilo",
  "Reba Anchalika Higher Secondary School, Reba",
  "Biswa Nahakani Higher Secondary School, Biswanahakani",
  "Gokhel Ideal Higher Secondary School, Sankarpur",
  "Kakhadi Higher Secondary School, Kakhadi",
  "Chaitanya Sahu Higher Secondary School of Science & Arts, Nuapatna",
  "Kalinga Women's Higher Secondary School, Tigiria",
  "Deogarh Women's Higher Secondary School, Deogarh",
  "Palsama Higher Secondary School, Palsama",
  "Ekalabya Panchayat Samiti Higher Secondary School, Kansar",
  "Panchayat Samiti Higher Secondary School, Suguda",
  "Subash Naik Higher Secondary School, Ludhar",
  "Nuahat Anchalika Panchayat Higher Secondary School, Nuahat",
  "Sri Sri Balunkeswar Higher Secondary School, Baruan",
  "Tapoban Higher Secondary School, Kunida",
  "Bhuban Women's Higher Secondary School, Bhuban",
  "Dhenkanal Evening Higher Secondary School, Dhenkanal",
  "Beltikiri Anchalika Higher Secondary School, Beltikiri",
  "Debendra Satapathy Memorial Higher Secondary School, Bhapur",
  "Panchayat Higher Secondary School of Science & Technology, Gengutia",
  "Utkalmani Gopabandhu Higher Secondary School, Gobindapur",
  "Kapilash Higher Secondary School, Gondia",
  "Shree Jagannath Higher Secondary School, Pingua",
  "Sridhar Swami Higher Secondary School of Education & Technology, Sadangi",
  "Parikul Higher Secondary School, Paikapurunakothi",
  "Regional Higher Secondary School, Hindol",
  "Anchalika Higher Secondary School, Guneibil",
  "Anchalika Higher Secondary School, Kurumuna",
  "Women's Higher Secondary School, Kamakshyanagar",
  "Bapuji Higher Secondary School, Garhpalasuni",
  "Birasal Anchalika Higher Secondary School, Birasal",
  "Kankadahad Higher Secondary School, Kankadahad",
  "Khadagaprasad Anchalika Higher Secondary School, Khadagaprasad",
  "Sachidananda Higher Secondary School, Indipur",
  "Satyam Sivam Sundaram Higher Secondary School, Gauda Kateni",
  "Astasambhu Higher Secondary School, Kualo",
  "Barihapur Higher Secondary School, Barihapur",
  "Regional Higher Secondary School, Sanda",
  "Binodini Science Higher Secondary School, Padmapur",
  "Hill Top Higher Secondary School, Mohana",
  "Baba Saheb Ambedkar Higher Secondary School, Khajuriapada",
  "Mahendra Tanaya Higher Secondary School, R. Udayagiri",
  "Mahendragiri Higher Secondary School, Ramagiri",
  "Parsuram Gurukul Higher Secondary School, Sevakpur",
  "Bellaguntha Women's Higher Secondary School, Bellaguntha",
  "Prafulla Kumari Women's Higher Secondary School, Gobara",
  "Bellaguntha Science Higher Secondary School, Bellaguntha",
  "Deccan Higher Secondary School, Berhampur",
  "Suprava Devi Women's Higher Secondary School, Berhampur",
  "Anchalika Science Higher Secondary School, Ballipadar",
  "Manitara Science Higher Secondary School, Manitara",
  "Sri Baladev Jew Mahila Higher Secondary School, Buguda",
  "Nursingha Nath Higher Secondary School, Mahanadpur",
  "Chhatrapur Women's Higher Secondary School, Chhatrapur",
  "Regional Science Higher Secondary School, Sorola",
  "Ananta Narayana Higher Secondary School, Dharakote",
  "Somanath Science Higher Secondary School, Mundamarai",
  "Biju Patnaik Women's Higher Secondary School, Digapahandi",
  "Chidananda Saraswati Higher Secondary School, Bamkoi",
  "Gopal Krushna Vigyan Higher Secondary School, Subalya",
  "Humma Salt Higher Secondary School, Humma",
  "Khambeya Dora Science Higher Secondary School, Pochilima",
  "Sri Beleswar Higher Secondary School, Gondala",
  "Narayani Science Higher Secondary School, Athagadapatana",
  "K.P. Science Higher Secondary School, Langaleswar",
  "Mahuri Kalua Higher Secondary School, Balipada",
  "Doki Sanyasi Higher Secondary School, Khariaguda",
  "Bartini Science Higher Secondary School, Bartini",
  "Regional Women's Higher Secondary School, Polosara",
  "Basudeba Sethy Science Higher Secondary School, Bhatakumarada",
  "Sidha Bhairabi Science Higher Secondary School, Konisi"
  ];
  
  const invalidRegistration = () => toast.warning("Invalid Registration");
  const RegistrationSuccessful = () => toast.success("Registration succesfful");
  const wrongCredentials=()=>toast.error("Wrong Credentials");
  const loginSuccessfull=()=>toast.success("Login Successfull");
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
      invalidRegistration();
      console.log("invalid registration");
    }
    else{
      RegistrationSuccessful();
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
      wrongCredentials();
      console.log("wrong credentials");
    }
    else{
      loginSuccessfull();
      setModal(false);
    }
  }
  
  return (
    <>
    <nav className={`w-full flex mt-3 justify-between items-center navbar ${modal ? "blur-background" : ""}`}>
      <img src={logo} alt="hoobank" className="w-[150px] h-[52px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1" style={{color:"white"}}>
      <Link to="/registeredteams">
      <button className="mr-10"> Registered Teams </button>
      </Link> 
        <button className="mr-10"> About us </button>
        <button className="mr-10"> Timeline </button>
        <button  className="mr-10" onClick={handleLoginClick}> Login </button>
        <Link to="/logout">
      <button> Logout </button>
      </Link>
        
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
          <li className="mr-4"> Registered Teams </li>
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
