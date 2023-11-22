import { useState, useEffect, useRef } from "react";
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
const Navbar = () => {
  
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
  
    const loginUser=async(e)=>{
      e.preventDefault();
      setLoading(true);
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
          role:role,
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
=======
    <>
    <nav className={`w-full flex mt-3 justify-between items-center navbar ${modal ? "blur-background" : ""}`}
  
    
    >
      <img src={"/logo.png"} alt="hoobank" className="h-[55px] w-[200px] md:h-[100px] md:w-[360px]" />


      <ul className="list-none sm:flex hidden justify-end items-center flex-1" style={{color:"white"}}>
      <Link to="/registeredteams">
      <button className="mr-10"> Registered Teams </button>
      </Link> 
      <Link to="/search">
      <button className="mr-10"> District wise </button>
      </Link> 
      <Link to="/search_so">
      <button className="mr-10"> State wise </button>
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
          
          <Link to="/registeredteams">
      <li className="mr-4"> Registered Teams </li>
      </Link> 
      <Link to="/search">
      <li className="mr-4"> District wise </li>
      </Link> 
      <Link to="/search_so">
      <li className="mr-4"> State wise </li>
      </Link> 
      <li className="mr-4" onClick={handleLoginClick}> Login </li>

           <li className="mr-4"> About us </li>
        <li className="mr-4"> Timeline </li>
        <Link to="/logout">
      <li> Logout </li>
      </Link>
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


<option value="Evening_Higher_Secondary_School_Angul">Evening Higher Secondary School, Angul</option>
<option value="Kashi_Bishwanath_Higher_Secondary_School_Paikasahi">Kashi Bishwanath Higher Secondary School, Paikasahi</option>
<option value="Satyabadi_Meher_Higher_Secondary_School_Madhapur">Satyabadi Meher Higher Secondary School, Madhapur</option>
<option value="Solapada_Higher_Secondary_School_Thakurgarh">Solapada Higher Secondary School, Thakurgarh</option>
<option value="Anchalik_Higher_Secondary_School_Talmul">Anchalik Higher Secondary School, Talmul</option>
<option value="Kumanda_Jarasingha_Anchalik_Panchayat_Higher_Secondary_School_Kumanda">Kumanda Jarasingha Anchalik Panchayat Higher Secondary School, Kumanda</option>
<option value="Nalco_Nagar_Regional_Higher_Secondary_School_Kulad">Nalco Nagar Regional Higher Secondary School, Kulad</option>
<option value="Jagamohan_Higher_Secondary_School_Kuluma">Jagamohan Higher Secondary School, Kuluma</option>
<option value="Anchalika_Higher_Secondary_School_Angapada">Anchalika Higher Secondary School, Angapada</option>
<option value="Gadtal_Regional_Higher_Secondary_School_Gadtal">Gadtal Regional Higher Secondary School, Gadtal</option>
<option value="Bahanaga_Higher_Secondary_School_Bahanaga">Bahanaga Higher Secondary School, Bahanaga</option>
<option value="Khantapara_Mahila_Higher_Secondary_School_Khantapara">Khantapara Mahila Higher Secondary School, Khantapara</option>
<option value="Satyanidhi_Womens_Higher_Secondary_School_Bishnupur">Satyanidhi Women's Higher Secondary School, Bishnupur</option>
<option value="Balangi_Higher_Secondary_School_Sunahat">Balangi Higher Secondary School, Sunahat</option>
<option value="Golakmani_Mahila_Higher_Secondary_School_Uitikiri">Golakmani Mahila Higher Secondary School, Uitikiri</option>
<option value="Nilakantheswar_Higher_Secondary_School_Bangara">Nilakantheswar Higher Secondary School, Bangara</option>
<option value="Judhisthir_Higher_Secondary_School_Kundali">Judhisthir Higher Secondary School, Kundali</option>
<option value="Laxmipriya_Mahila_Higher_Secondary_School_Baliapal">Laxmipriya Mahila Higher Secondary School, Baliapal</option>
<option value="Baikunthanath_Institute_of_Higher_Technical_Studies_Higher_Secondary_School_Kachuadi">Baikunthanath Institute of Higher Technical Studies Higher Secondary School, Kachuadi</option>
<option value="Chandaneswar_Higher_Secondary_School_Barbatia">Chandaneswar Higher Secondary School, Barbatia</option>
<option value="Chandaneswar_Higher_Secondary_School_Sahabazpur">Chandaneswar Higher Secondary School, Sahabazpur</option>
<option value="Womens_Higher_Secondary_School_Bhogarai">Women's Higher Secondary School, Bhogarai</option>
<option value="Olamara_Simanta_Higher_Secondary_School_Olamara">Olamara Simanta Higher Secondary School, Olamara</option>
<option value="Sitala_Thakurani_Higher_Secondary_School_Khuluda">Sitala Thakurani Higher Secondary School, Khuluda</option>
<option value="Ustab_Charan_Gajiani_Chandi_Higher_Secondary_School_Bartana">Ustab Charan Gajiani Chandi Higher Secondary School, Bartana</option>
<option value="Agani_Narendra_Higher_Secondary_School_Antara">Agani Narendra Higher Secondary School, Antara</option>
<option value="Jambeswar_Higher_Secondary_School_Garsang">Jambeswar Higher Secondary School, Garsang</option>
<option value="Kamala_Arjuna_Higher_Secondary_School_Gandibed">Kamala Arjuna Higher Secondary School, Gandibed</option>
<option value="Panchayat_Samiti_Mahila_Higher_Secondary_School_Nahanga">Panchayat Samiti Mahila Higher Secondary School, Nahanga</option>
<option value="Nilagiri_Womens_Higher_Secondary_School_Nilagiri">Nilagiri Women's Higher Secondary School, Nilagiri</option>
<option value="Baba_Panchalingeswar_Higher_Secondary_School_Santaragadia">Baba Panchalingeswar Higher Secondary School, Santaragadia</option>
<option value="Laxmikanta_Memorial_Womens_Higher_Secondary_School_DakhiniNarasinghpur">Laxmikanta Memorial Women's Higher Secondary School, Dakhini-Narasinghpur</option>
<option value="Bhimeswar_Higher_Secondary_School_Bhimeswar">Bhimeswar Higher Secondary School, Bhimeswar</option>
<option value="Remuna_Higher_Secondary_School_Remuna">Remuna Higher Secondary School, Remuna</option>
<option value="Shri_Jagannath_Educational_Foundation_Higher_Secondary_School_Barunsingh">Shri Jagannath Educational Foundation Higher Secondary School, Barunsingh</option>
<option value="Gopaprana_Higher_Secondary_School_Khirakona">Gopaprana Higher Secondary School, Khirakona</option>
<option value="Kuntala_Kumari_Mahila_Higher_Secondary_School_Bari">Kuntala Kumari Mahila Higher Secondary School, Bari</option>
<option value="Kudei_Womens_Higher_Secondary_School_Kudei">Kudei Women's Higher Secondary School, Kudei</option>
<option value="Talanagar_Higher_Secondary_School_Talanagar">Talanagar Higher Secondary School, Talanagar</option>
<option value="Swami_Vivekananda_Higher_Secondary_School_Dungri">Swami Vivekananda Higher Secondary School, Dungri</option>
<option value="Anchalika_Higher_Secondary_School_Paharsrigida">Anchalika Higher Secondary School, Paharsrigida</option>
<option value="Kadobahal_Higher_Secondary_School_Kadobahal">Kadobahal Higher Secondary School, Kadobahal</option>
<option value="Baba_Balunkeswar_Higher_Secondary_School_Khuntapali">Baba Balunkeswar Higher Secondary School, Khuntapali</option>
<option value="Gandhi_Memorial_Higher_Secondary_School_Kalapani">Gandhi Memorial Higher Secondary School, Kalapani</option>
<option value="Milita_Gram_Panchayat_Higher_Secondary_School_Sarsara">Milita Gram Panchayat Higher Secondary School, Sarsara</option>
<option value="Nabajoyti_Higher_Secondary_School_Chakarkend">Nabajoyti Higher Secondary School, Chakarkend</option>
<option value="Tora_Higher_Secondary_School_Tora">Tora Higher Secondary School, Tora</option>
<option value="Jagabandhu_Das_Womens_Higher_Secondary_School_Kadalipali">Jagabandhu Das Women's Higher Secondary School, Kadalipali</option>
<option value="Prof_Ghanshyam_Das_Gramanchal_Higher_Secondary_School_Katapali">Prof. Ghanshyam Das Gramanchal Higher Secondary School, Katapali</option>
<option value="Satalma_Higher_Secondary_School_Satalma">Satalma Higher Secondary School, Satalma</option>
<option value="Kamgaon_Higher_Secondary_School_Kamgaon">Kamgaon Higher Secondary School, Kamgaon</option>
<option value="Panchayat_Higher_Secondary_School_Goudgaon">Panchayat Higher Secondary School, Goudgaon</option>
<option value="Resham_Anchalika_Higher_Secondary_School_Resham">Resham Anchalika Higher Secondary School, Resham</option>
<option value="Dora_Higher_Secondary_School_Putukigrinjel">Dora Higher Secondary School, Putukigrinjel</option>
<option value="Panchayat_Higher_Secondary_School_Talpadar">Panchayat Higher Secondary School, Talpadar</option>
<option value="Goutam_Buddha_Higher_Secondary_School_Ganiapali">Goutam Buddha Higher Secondary School, Ganiapali</option>
<option value="Talpali_Higher_Secondary_School_Talpali">Talpali Higher Secondary School, Talpali</option>
<option value="Dava_Higher_Secondary_School_Dava">Dava Higher Secondary School, Dava</option>
<option value="Lakhmara_Higher_Secondary_School_Lakhmara">Lakhmara Higher Secondary School, Lakhmara</option>
<option value="Vindhya_Vasini_Higher_Secondary_School_Paikmal">Vindhya Vasini Higher Secondary School, Paikmal</option>
<option value="Buddhadev_Meher_Higher_Secondary_School_Dahita">Buddhadev Meher Higher Secondary School, Dahita</option>
<option value="Jamla_Higher_Secondary_School_Jamla">Jamla Higher Secondary School, Jamla</option>
<option value="Kartik_Malati_Mahila_Higher_Secondary_School_Jagannathpur">Kartik Malati Mahila Higher Secondary School, Jagannathpur</option>
<option value="Kamala_Kishori_Rout_Mahila_Higher_Secondary_School_Kusannagar">Kamala Kishori Rout Mahila Higher Secondary School, Kusannagar</option>
<option value="Radhakanta_Behera_Higher_Secondary_School_Arnapala">Radhakanta Behera Higher Secondary School, Arnapala</option>
<option value="Rameswar_Higher_Secondary_School_Randia">Rameswar Higher Secondary School, Randia</option>
<option value="Bhandaripokhari_Higher_Secondary_School_Bhandaripokhari">Bhandaripokhari Higher Secondary School, Bhandaripokhari</option>
<option value="Nayanmani_Womens_Higher_Secondary_School_Saradapur">Nayanmani Women's Higher Secondary School, Saradapur</option>
<option value="Panchayat_Higher_Secondary_School_Barikipur">Panchayat Higher Secondary School, Barikipur</option>
<option value="Agarpara_Womens_Higher_Secondary_School_Agarpara">Agarpara Women's Higher Secondary School, Agarpara</option>
<option value="Utkal_Keshari_Dr_Hare_Krushna_Mahatab_Higher_Secondary_School_Kenduapara">Utkal Keshari Dr. Hare Krushna Mahatab Higher Secondary School, Kenduapara</option>
<option value="Dhamrai_Higher_Secondary_School_Narsinghpur">Dhamrai Higher Secondary School, Narsinghpur</option>
<option value="Ghanteswar_Higher_Secondary_School_Ghanteswar">Ghanteswar Higher Secondary School, Ghanteswar</option>
<option value="Lalit_Siba_Sankar_Higher_Secondary_School_Motto">Lalit Siba Sankar Higher Secondary School, Motto</option>
<option value="Asurali_Anchalika_Mahila_Higher_Secondary_School_Asurali">Asurali Anchalika Mahila Higher Secondary School, Asurali</option>
<option value="Maniklal_Womens_Higher_Secondary_School_Talapada">Maniklal Women's Higher Secondary School, Talapada</option>
<option value="Jalandhar_Higher_Secondary_School_Bharsuja">Jalandhar Higher Secondary School, Bharsuja</option>
<option value="Amar_Jyoti_Higher_Secondary_School_Kutumdola">Amar Jyoti Higher Secondary School, Kutumdola</option>
<option value="Budhadangar_Higher_Secondary_School_Kudasingha">Budhadangar Higher Secondary School, Kudasingha</option>
<option value="Panchayat_Higher_Secondary_School_Shibatala">Panchayat Higher Secondary School, Shibatala</option>
<option value="Pallishree_Higher_Secondary_School_Sindhekela">Pallishree Higher Secondary School, Sindhekela</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Bangomunda">Panchayat Samiti Higher Secondary School, Bangomunda</option>
<option value="Prasanna_Pal_Higher_Secondary_School_Bhalumunda">Prasanna Pal Higher Secondary School, Bhalumunda</option>
<option value="Binapani_Higher_Secondary_School_Dhumabhata">Binapani Higher Secondary School, Dhumabhata</option>
<option value="Panchayat_Higher_Secondary_School_Sulekela">Panchayat Higher Secondary School, Sulekela</option>
<option value="Shree_Jagannath_Dev_Higher_Secondary_School_Mandal">Shree Jagannath Dev Higher Secondary School, Mandal</option>
<option value="Dhruba_Ananda_Higher_Secondary_School_Kuturla">Dhruba Ananda Higher Secondary School, Kuturla</option>
<option value="Anchalik_Higher_Secondary_School_Rusuda">Anchalik Higher Secondary School, Rusuda</option>
<option value="Gram_Panchayat_Higher_Secondary_School_Tentulikhunti">Gram Panchayat Higher Secondary School, Tentulikhunti</option>
<option value="MLA_Womens_Higher_Secondary_School_Kantabanji">MLA Womens' Higher Secondary School, Kantabanji</option>
<option value="Harishankar_Higher_Secondary_School_Khaprakhol">Harishankar Higher Secondary School, Khaprakhol</option>
<option value="Jawaharlal_Nehru_Higher_Secondary_School_Dhandamunda">Jawaharlal Nehru Higher Secondary School, Dhandamunda</option>
<option value="Panchayat_Higher_Secondary_School_Lathor">Panchayat Higher Secondary School, Lathor</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Muribahal">Panchayat Samiti Higher Secondary School, Muribahal</option>
<option value="Rajendra_Meher_Higher_Secondary_School_Jogimunda">Rajendra Meher Higher Secondary School, Jogimunda</option>
<option value="Patneswari_Womens_Higher_Secondary_School_Patnagarh">Patneswari Women's Higher Secondary School, Patnagarh</option>
<option value="Jamgaon_Anchalika_Higher_Secondary_School_Jamgaon">Jamgaon Anchalika Higher Secondary School, Jamgaon</option>
<option value="Judhisthir_Higher_Secondary_School_Chhatamakhana">Judhisthir Higher Secondary School, Chhatamakhana</option>
<option value="Radheshyam_Anchalik_Higher_Secondary_School_Bilaisarda">Radheshyam Anchalik Higher Secondary School, Bilaisarda</option>
<option value="Padmalochan_Higher_Secondary_School_Tikrapara">Padmalochan Higher Secondary School, Tikrapara</option>
<option value="Panchayat_Higher_Secondary_School_Ghunsar">Panchayat Higher Secondary School, Ghunsar</option>
<option value="Utkalmani_Gopabandhu_Dash_Higher_Secondary_School_Belgaon">Utkalmani Gopabandhu Dash Higher Secondary School, Belgaon</option>
<option value="Rajiv_Gandhi_Panchayat_Samiti_Higher_Secondary_School_Turekela">Rajiv Gandhi Panchayat Samiti Higher Secondary School, Turekela</option>
<option value="Gandhardi_Higher_Secondary_School_Janhapank">Gandhardi Higher Secondary School, Janhapank</option>
<option value="Maa_Maheswari_Higher_Secondary_School_Bausuni">Maa Maheswari Higher Secondary School, Bausuni</option>
<option value="Boudh_Womens_Higher_Secondary_School_Boudh">Boudh Women's Higher Secondary School, Boudh</option>
<option value="Harbhanga_Anchalika_Panchayat_Higher_Secondary_School_Harbhanga">Harbhanga Anchalika Panchayat Higher Secondary School, Harbhanga</option>
<option value="TKSMRG_Higher_Secondary_School_Ghantapada">T.K.S.M.R.G. Higher Secondary School, Ghantapada</option>
<option value="Choudwar_Womens_Higher_Secondary_School_Choudwar">Choudwar Women's Higher Secondary School, Choudwar</option>
<option value="Radhanath_Rath_Vigyan_Higher_Secondary_School_Khuntuni">Radhanath Rath Vigyan Higher Secondary School, Khuntuni</option>
<option value="Baideswar_Higher_Secondary_School_Baideswar">Baideswar Higher Secondary School, Baideswar</option>
<option value="Maniabandha_Higher_Secondary_School_Maniabandha">Maniabandha Higher Secondary School, Maniabandha</option>
<option value="Sri_Sri_Swapneswar_Deba_Anchalika_Higher_Secondary_School_of_Arts_and_Technology_Sankhamari">Sri Sri Swapneswar Deba Anchalika Higher Secondary School of Arts & Technology, Sankhamari</option>
<option value="Prabha_Routray_Higher_Secondary_School_Godisahi">Prabha Routray Higher Secondary School, Godisahi</option>
<option value="Dr_Keshaba_Chandra_Sahu_Womens_Higher_Secondary_School_Cuttack">Dr. Keshaba Chandra Sahu Women's Higher Secondary School, Cuttack</option>
<option value="Mahanadi_Vihar_Womens_Higher_Secondary_School_Cuttack">Mahanadi Vihar Women's Higher Secondary School, Cuttack</option>
<option value="Maulan_Abdul_Kalam_Azad_Multipurpose_Higher_Secondary_School_Cuttack">Maulan Abdul Kalam Azad Multipurpose Higher Secondary School, Cuttack</option>
<option value="Raghunath_Jew_Higher_Secondary_School_Deulasahi">Raghunath Jew Higher Secondary School, Deulasahi</option>
<option value="Ananta_Balia_Higher_Secondary_School_Nuagarh">Ananta Balia Higher Secondary School, Nuagarh</option>
<option value="Laksheswar_Womens_Higher_Secondary_School_Phulnakhara">Laksheswar Women's Higher Secondary School, Phulnakhara</option>
<option value="Domapara_Anchalika_Higher_Secondary_School_Dampara">Domapara Anchalika Higher Secondary School, Dampara</option>
<option value="Rani_Suka_Dei_Mahila_Higher_Secondary_School_Banki">Rani Suka Dei Mahila Higher Secondary School, Banki</option>
<option value="Govindpur_Higher_Secondary_School_Govindpur">Govindpur Higher Secondary School, Govindpur</option>
<option value="Govindpur_Womens_Higher_Secondary_School_Govindpur">Govindpur Women's Higher Secondary School, Govindpur</option>
<option value="Durga_Charan_Nayak_Memorial_Higher_Secondary_School_Haladia">Durga Charan Nayak Memorial Higher Secondary School, Haladia</option>
<option value="Champanatha_Dev_Higher_Secondary_School_Champeswar">Champanatha Dev Higher Secondary School, Champeswar</option>
<option value="Prachi_Womens_Higher_Secondary_School_Niali">Prachi Women's Higher Secondary School, Niali</option>
<option value="Ballavi_Devi_Mahila_Higher_Secondary_School_Natakai">Ballavi Devi Mahila Higher Secondary School, Natakai</option>
<option value="Mahanadi_Higher_Secondary_School_Ratilo">Mahanadi Higher Secondary School, Ratilo</option>
<option value="Reba_Anchalika_Higher_Secondary_School_Reba">Reba Anchalika Higher Secondary School, Reba</option>
<option value="Biswa_Nahakani_Higher_Secondary_School_Biswanahakani">Biswa Nahakani Higher Secondary School, Biswanahakani</option>
<option value="Gokhel_Ideal_Higher_Secondary_School_Sankarpur">Gokhel Ideal Higher Secondary School, Sankarpur</option>
<option value="Kakhadi_Higher_Secondary_School_Kakhadi">Kakhadi Higher Secondary School, Kakhadi</option>
<option value="Chaitanya_Sahu_Higher_Secondary_School_of_Science_and_Arts_Nuapatna">Chaitanya Sahu Higher Secondary School of Science & Arts, Nuapatna</option>
<option value="Kalinga_Womens_Higher_Secondary_School_Tigiria">Kalinga Women's Higher Secondary School, Tigiria</option>
<option value="Deogarh_Womens_Higher_Secondary_School_Deogarh">Deogarh Women's Higher Secondary School, Deogarh</option>
<option value="Palsama_Higher_Secondary_School_Palsama">Palsama Higher Secondary School, Palsama</option>
<option value="Ekalabya_Panchayat_Samiti_Higher_Secondary_School_Kansar">Ekalabya Panchayat Samiti Higher Secondary School, Kansar</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Suguda">Panchayat Samiti Higher Secondary School, Suguda</option>
<option value="Subash_Naik_Higher_Secondary_School_Ludhar">Subash Naik Higher Secondary School, Ludhar</option>
<option value="Nuahat_Anchalika_Panchayat_Higher_Secondary_School_Nuahat">Nuahat Anchalika Panchayat Higher Secondary School, Nuahat</option>
<option value="Sri_Sri_Balunkeswar_Higher_Secondary_School_Baruan">Sri Sri Balunkeswar Higher Secondary School, Baruan</option>
<option value="Tapoban_Higher_Secondary_School_Kunida">Tapoban Higher Secondary School, Kunida</option>
<option value="Bhuban_Womens_Higher_Secondary_School_Bhuban">Bhuban Women's Higher Secondary School, Bhuban</option>
<option value="Dhenkanal_Evening_Higher_Secondary_School_Dhenkanal">Dhenkanal Evening Higher Secondary School, Dhenkanal</option>
<option value="Beltikiri_Anchalika_Higher_Secondary_School_Beltikiri">Beltikiri Anchalika Higher Secondary School, Beltikiri</option>
<option value="Debendra_Satapathy_Memorial_Higher_Secondary_School_Bhapur">Debendra Satapathy Memorial Higher Secondary School, Bhapur</option>
<option value="Panchayat_Higher_Secondary_School_of_Science_and_Technology_Gengutia">Panchayat Higher Secondary School of Science & Technology, Gengutia</option>
<option value="Utkalmani_Gopabandhu_Higher_Secondary_School_Gobindapur">Utkalmani Gopabandhu Higher Secondary School, Gobindapur</option>
<option value="Kapilash_Higher_Secondary_School_Gondia">Kapilash Higher Secondary School, Gondia</option>
<option value="Shree_Jagannath_Higher_Secondary_School_Pingua">Shree Jagannath Higher Secondary School, Pingua</option>
<option value="Sridhar_Swami_Higher_Secondary_School_of_Education_and_Technology_Sadangi">Sridhar Swami Higher Secondary School of Education & Technology, Sadangi</option>
<option value="Parikul_Higher_Secondary_School_Paikapurunakothi">Parikul Higher Secondary School, Paikapurunakothi</option>
<option value="Regional_Higher_Secondary_School_Hindol">Regional Higher Secondary School, Hindol</option>
<option value="Anchalika_Higher_Secondary_School_Guneibil">Anchalika Higher Secondary School, Guneibil</option>
<option value="Anchalika_Higher_Secondary_School_Kurumuna">Anchalika Higher Secondary School, Kurumuna</option>
<option value="Womens_Higher_Secondary_School_Kamakshyanagar">Women's Higher Secondary School, Kamakshyanagar</option>
<option value="Bapuji_Higher_Secondary_School_Garhpalasuni">Bapuji Higher Secondary School, Garhpalasuni</option>
<option value="Birasal_Anchalika_Higher_Secondary_School_Birasal">Birasal Anchalika Higher Secondary School, Birasal</option>
<option value="Kankadahad_Higher_Secondary_School_Kankadahad">Kankadahad Higher Secondary School, Kankadahad</option>
<option value="Khadagaprasad_Anchalika_Higher_Secondary_School_Khadagaprasad">Khadagaprasad Anchalika Higher Secondary School, Khadagaprasad</option>
<option value="Sachidananda_Higher_Secondary_School_Indipur">Sachidananda Higher Secondary School, Indipur</option>
<option value="Satyam_Sivam_Sundaram_Higher_Secondary_School_Gauda_Kateni">Satyam Sivam Sundaram Higher Secondary School, Gauda Kateni</option>
<option value="Astasambhu_Higher_Secondary_School_Kualo">Astasambhu Higher Secondary School, Kualo</option>
<option value="Barihapur_Higher_Secondary_School_Barihapur">Barihapur Higher Secondary School, Barihapur</option>
<option value="Regional_Higher_Secondary_School_Sanda">Regional Higher Secondary School, Sanda</option>
<option value="Binodini_Science_Higher_Secondary_School_Padmapur">Binodini Science Higher Secondary School, Padmapur</option>
<option value="Hill_Top_Higher_Secondary_School_Mohana">Hill Top Higher Secondary School, Mohana</option>
<option value="Baba_Saheb_Ambedkar_Higher_Secondary_School_Khajuriapada">Baba Saheb Ambedkar Higher Secondary School, Khajuriapada</option>
<option value="Mahendra_Tanaya_Higher_Secondary_School_R_Udayagiri">Mahendra Tanaya Higher Secondary School, R. Udayagiri</option>
<option value="Mahendragiri_Higher_Secondary_School_Ramagiri">Mahendragiri Higher Secondary School, Ramagiri</option>
<option value="Parsuram_Gurukul_Higher_Secondary_School_Sevakpur">Parsuram Gurukul Higher Secondary School, Sevakpur</option>
<option value="Bellaguntha_Womens_Higher_Secondary_School_Bellaguntha">Bellaguntha Women's Higher Secondary School, Bellaguntha</option>
<option value="Prafulla_Kumari_Womens_Higher_Secondary_School_Gobara">Prafulla Kumari Women's Higher Secondary School, Gobara</option>
<option value="Bellaguntha_Science_Higher_Secondary_School_Bellaguntha">Bellaguntha Science Higher Secondary School, Bellaguntha</option>
<option value="Deccan_Higher_Secondary_School_Berhampur">Deccan Higher Secondary School, Berhampur</option>
<option value="Suprava_Devi_Womens_Higher_Secondary_School_Berhampur">Suprava Devi Women's Higher Secondary School, Berhampur</option>
<option value="Anchalika_Science_Higher_Secondary_School_Ballipadar">Anchalika Science Higher Secondary School, Ballipadar</option>
<option value="Manitara_Science_Higher_Secondary_School_Manitara">Manitara Science Higher Secondary School, Manitara</option>
<option value="Sri_Baladev_Jew_Mahila_Higher_Secondary_School_Buguda">Sri Baladev Jew Mahila Higher Secondary School, Buguda</option>
<option value="Nursingha_Nath_Higher_Secondary_School_Mahanadpur">Nursingha Nath Higher Secondary School, Mahanadpur</option>
<option value="Chhatrapur_Womens_Higher_Secondary_School_Chhatrapur">Chhatrapur Women's Higher Secondary School, Chhatrapur</option>
<option value="Regional_Science_Higher_Secondary_School_Sorola">Regional Science Higher Secondary School, Sorola</option>
<option value="Ananta_Narayana_Higher_Secondary_School_Dharakote">Ananta Narayana Higher Secondary School, Dharakote</option>
<option value="Somanath_Science_Higher_Secondary_School_Mundamarai">Somanath Science Higher Secondary School, Mundamarai</option>
<option value="Biju_Patnaik_Womens_Higher_Secondary_School_Digapahandi">Biju Patnaik Women's Higher Secondary School, Digapahandi</option>
<option value="Chidananda_Saraswati_Higher_Secondary_School_Bamkoi">Chidananda Saraswati Higher Secondary School, Bamkoi</option>
<option value="Gopal_Krushna_Vigyan_Higher_Secondary_School_Subalya">Gopal Krushna Vigyan Higher Secondary School, Subalya</option>
<option value="Humma_Salt_Higher_Secondary_School_Humma">Humma Salt Higher Secondary School, Humma</option>
<option value="Khambeya_Dora_Science_Higher_Secondary_School_Pochilima">Khambeya Dora Science Higher Secondary School, Pochilima</option>
<option value="Sri_Beleswar_Higher_Secondary_School_Gondala">Sri Beleswar Higher Secondary School, Gondala</option>
<option value="Narayani_Science_Higher_Secondary_School_Athagadapatana">Narayani Science Higher Secondary School, Athagadapatana</option>
<option value="KP_Science_Higher_Secondary_School_Langaleswar">K.P. Science Higher Secondary School, Langaleswar</option>
<option value="Mahuri_Kalua_Higher_Secondary_School_Balipada">Mahuri Kalua Higher Secondary School, Balipada</option>
<option value="Doki_Sanyasi_Higher_Secondary_School_Khariaguda">Doki Sanyasi Higher Secondary School, Khariaguda</option>
<option value="Bartini_Science_Higher_Secondary_School_Bartini">Bartini Science Higher Secondary School, Bartini</option>
<option value="Regional_Womens_Higher_Secondary_School_Polosara">Regional Women's Higher Secondary School, Polosara</option>
<option value="Basudeba_Sethy_Science_Higher_Secondary_School_Bhatakumarada">Basudeba Sethy Science Higher Secondary School, Bhatakumarada</option>
<option value="Sidha_Bhairabi_Science_Higher_Secondary_School_Konisi">Sidha Bhairabi Science Higher Secondary School, Konisi</option>
<option value="Science_Higher_Secondary_School_Pudamari">Science Higher Secondary School, Pudamari</option>
<option value="Pitala_Higher_Secondary_School_Pitalo">Pitala Higher Secondary School, Pitalo</option>
<option value="PCM_Womens_Higher_Secondary_School_Surada">P.C.M. Women's Higher Secondary School, Surada</option>
<option value="Balikuda_Womens_Higher_Secondary_School_Balikuda">Balikuda Women's Higher Secondary School, Balikuda</option>
<option value="Basudev_Mahapatra_Smarahi_Higher_Secondary_School_Talagaon">Basudev Mahapatra Smarahi Higher Secondary School, Talagaon</option>
<option value="Harispur_Baldev_Higher_Secondary_School_Borikina">Harispur Baldev Higher Secondary School, Borikina</option>
<option value="Baisi_Mouza_Higher_Secondary_School_Purana">Baisi Mouza Higher Secondary School, Purana</option>
<option value="Dhyan_Chand_Higher_Secondary_School_Hazipur">Dhyan Chand Higher Secondary School, Hazipur</option>
<option value="Brundaban_Bihari_Higher_Secondary_School_Goda">Brundaban Bihari Higher Secondary School, Goda</option>
<option value="Grameswar_Higher_Secondary_School_Panchapali">Grameswar Higher Secondary School, Panchapali</option>
<option value="Biju_Patnaik_Higher_Secondary_School_Ashrampatna">Biju Patnaik Higher Secondary School, Ashrampatna</option>
<option value="Sidha_Baranga_Higher_Secondary_School_of_Education_and_Technology_Punanga">Sidha Baranga Higher Secondary School of Education & Technology, Punanga</option>
<option value="Narayan_Birabar_Samanta_Higher_Secondary_School_Jhimani">Narayan Birabar Samanta Higher Secondary School, Jhimani</option>
<option value="Panchayat_Mahila_Higher_Secondary_School_Balia">Panchayat Mahila Higher Secondary School, Balia</option>
<option value="Maa_Kutam_Chandi_Higher_Secondary_School_Devidol">Maa Kutam Chandi Higher Secondary School, Devidol</option>
<option value="Sri_Sri_Moula_Bhanja_Higher_Secondary_School_Gangada">Sri Sri Moula Bhanja Higher Secondary School, Gangada</option>
<option value="Bhagabati_Womens_Higher_Secondary_School_Manijanga">Bhagabati Women's Higher Secondary School, Manijanga</option>
<option value="Chitrotpala_Higher_Secondary_School_of_Education_and_Technology_Utarkul">Chitrotpala Higher Secondary School of Education & Technology, Utarkul</option>
<option value="Naba_Choudhury_Institute_Of_Education_and_Vocational_Studies_Higher_Secondary_School_Tarikunda">Naba Choudhury Institute Of Education & Vocational Studies Higher Secondary School, Tarikunda</option>
<option value="Swami_Arupananda_Higher_Secondary_School_of_Education_and_Technology_Kurtanga">Swami Arupananda Higher Secondary School of Education & Technology, Kurtanga</option>
<option value="Shree_Maa_Mahila_Higher_Secondary_School_Kollar">Shree Maa Mahila Higher Secondary School, Kollar</option>
<option value="Utkal_Bharati_Higher_Secondary_School_Mahilo">Utkal Bharati Higher Secondary School, Mahilo</option>
<option value="Barchana_Womens_Higher_Secondary_School_Barchana">Barchana Women's Higher Secondary School, Barchana</option>
<option value="Buddha_dev_Higher_Secondary_School_Udayagiri">Buddha dev Higher Secondary School, Udayagiri</option>
<option value="Mahapurush_Banamali_Higher_Secondary_School_Sailipara">Mahapurush Banamali Higher Secondary School, Sailipara</option>
<option value="Pallii_Shree_Womens_Higher_Secondary_School_Balichandrapur">Pallii Shree Womens Higher Secondary School, Balichandrapur</option>
<option value="Santhan_Higher_Secondary_School_Bainsiria">Santhan Higher Secondary School, Bainsiria</option>
<option value="Janaki_Madhusudan_Womens_Higher_Secondary_School_Mandhatapatna">Janaki Madhusudan Women's Higher Secondary School, Mandhatapatna</option>
<option value="Manatira_Higher_Secondary_School_Manatira">Manatira Higher Secondary School, Manatira</option>
<option value="Biripat_Higher_Secondary_School_Biripat">Biripat Higher Secondary School, Biripat</option>
<option value="Chitalo_Higher_Secondary_School_Chitalo">Chitalo Higher Secondary School, Chitalo</option>
<option value="Jayachandi_Higher_Secondary_School_Dubakana">Jayachandi Higher Secondary School, Dubakana</option>
<option value="Rambag_Womens_Higher_Secondary_School_Rambag">Rambag Women's Higher Secondary School, Rambag</option>
<option value="Dharmasala_Mahila_Higher_Secondary_School_Dharmasala">Dharmasala Mahila Higher Secondary School, Dharmasala</option>
<option value="Mukundapatra_Higher_Secondary_School_Balarampur">Mukundapatra Higher Secondary School, Balarampur</option>
<option value="Anchalika_Mahila_Higher_Secondary_School_Bandhamunda">Anchalika Mahila Higher Secondary School, Bandhamunda</option>
<option value="Baba_Hare_Krushna_Das_Higher_Secondary_School_Markandpur">Baba Hare Krushna Das Higher Secondary School, Markandpur</option>
<option value="Hingula_Higher_Secondary_School_Sankhachila">Hingula Higher Secondary School, Sankhachila</option>
<option value="Maa_Tarini_Higher_Secondary_School_Panikoili">Maa Tarini Higher Secondary School, Panikoili</option>
<option value="Kapileswar_Higher_Secondary_School_Duburi">Kapileswar Higher Secondary School, Duburi</option>
<option value="Indira_Gandhi_Womens_Higher_Secondary_School_Brajarajnagar">Indira Gandhi Women's Higher Secondary School, Brajarajnagar</option>
<option value="Pradosh_Kumar_Smruti_Smaraki_Higher_Secondary_School_H_Katapali">Pradosh Kumar Smruti Smaraki Higher Secondary School, H. Katapali</option>
<option value="Salegram_Sakunia_Higher_Secondary_School_Talpatia">Salegram Sakunia Higher Secondary School, Talpatia</option>
<option value="Arda_Higher_Secondary_School_Arda">Arda Higher Secondary School, Arda</option>
<option value="Basumati_Science_Higher_Secondary_School_Samasingha">Basumati Science Higher Secondary School, Samasingha</option>
<option value="Dwarika_Prasad_Agrawalla_Higher_Secondary_School_Bagmara">Dwarika Prasad Agrawalla Higher Secondary School, Bagmara</option>
<option value="Bhatlaida_Higher_Secondary_School_Bhatlaida">Bhatlaida Higher Secondary School, Bhatlaida</option>
<option value="Kabi_Buddharay_Gountia_Higher_Secondary_School_Salhetikra">Kabi Buddharay Gountia Higher Secondary School, Salhetikra</option>
<option value="Talmunda_Anchalika_Mahila_Higher_Secondary_School_Talmunda">Talmunda Anchalika Mahila Higher Secondary School, Talmunda</option>
<option value="Mahima_Higher_Secondary_School_Mahimapuram">Mahima Higher Secondary School, Mahimapuram</option>
<option value="Boarder_Higher_Secondary_School_Kankeri">Boarder Higher Secondary School, Kankeri</option>
<option value="Dharamgarh_Womens_Higher_Secondary_School_Dharamgarh">Dharamgarh Women's Higher Secondary School, Dharamgarh</option>
<option value="Lakhi_Ram_Agrawal_Higher_Secondary_School_Behera">Lakhi Ram Agrawal Higher Secondary School, Behera</option>
<option value="Anchalika_Bastarani_Higher_Secondary_School_Sanchergaon">Anchalika Bastarani Higher Secondary School, Sanchergaon</option>
<option value="Patitapaban_Higher_Secondary_School_Arebeda">Patitapaban Higher Secondary School, Arebeda</option>
<option value="Chichaiguda_Higher_Secondary_School_Chichaiguda">Chichaiguda Higher Secondary School, Chichaiguda</option>
<option value="Swami_Chidananda_Higher_Secondary_School_Karchala">Swami Chidananda Higher Secondary School, Karchala</option>
<option value="Chamelidevi_Womens_Higher_Secondary_School_Junagarh">Chamelidevi Women's Higher Secondary School, Junagarh (NAC)</option>
<option value="Mahabharat_Higher_Secondary_School_Bijamara">Mahabharat Higher Secondary School, Bijamara</option>
<option value="Hara_Gouri_Higher_Secondary_School_Kusurla">Hara Gouri Higher Secondary School, Kusurla</option>
<option value="Kashrupada_Higher_Secondary_School_Kashrupada">Kashrupada Higher Secondary School, Kashrupada</option>
<option value="Utkela_Higher_Secondary_School_Utkela">Utkela Higher Secondary School, Utkela</option>
<option value="Lanjigarh_Road_Higher_Secondary_School_Lanjigarh_Road">Lanjigarh Road Higher Secondary School, Lanjigarh Road</option>
<option value="Bijayananda_Panchayat_Higher_Secondary_School_Tulapada">Bijayananda Panchayat Higher Secondary School, Tulapada</option>
<option value="Maa_Manikeswari_Panchayat_Samiti_Higher_Secondary_School_Thuamul_Rampur">Maa Manikeswari Panchayat Samiti Higher Secondary School, Thuamul Rampur</option>
<option value="Ambedkar_Higher_Secondary_School_Khajuripada">Ambedkar Higher Secondary School, Khajuripada</option>
<option value="Anchalika_Higher_Secondary_School_Sankarakhol">Anchalika Higher Secondary School, Sankarakhol</option>
<option value="Dr_Ambedkar_National_Higher_Secondary_School_Daringbadi">Dr. Ambedkar National Higher Secondary School, Daringbadi</option>
<option value="Indira_Priyadarshni_Womens_Higher_Secondary_School_G_Udayagiri">Indira Priyadarshni Women's Higher Secondary School, G. Udayagiri</option>
<option value="Kandhamal_Higher_Secondary_School_Sarangagada">Kandhamal Higher Secondary School, Sarangagada</option>
<option value="Netaji_Subash_Boss_Higher_Secondary_School_Tumudibandha">Netaji Subash Boss Higher Secondary School, Tumudibandha</option>
<option value="Panchyat_Higher_Secondary_School_Phiringa">Panchyat Higher Secondary School, Phiringa</option>
<option value="Rusimal_Higher_Secondary_School_Bamunigam">Rusimal Higher Secondary School, Bamunigam</option>
<option value="SS_Asharamji_Bapu_Higher_Secondary_School_Kotogarh">S.S. Asharamji Bapu Higher Secondary School, Kotogarh</option>
<option value="Debaray_Samarsingh_Higher_Secondary_School_Ganeswarpur">Debaray Samarsingh Higher Secondary School, Ganeswarpur</option>
<option value="Gandhi_Memorial_Higher_Secondary_School_Govindpur">Gandhi Memorial Higher Secondary School, Govindpur</option>
<option value="Sushree_Devi_Womens_Higher_Secondary_School_Aul">Sushree Devi Women's Higher Secondary School, Aul</option>
<option value="Delta_Higher_Secondary_School_Bhitarabampu">Delta Higher Secondary School, Bhitarabampu</option>
<option value="Derabish_Mahila_Higher_Secondary_School_Derabish">Derabish Mahila Higher Secondary School, Derabish</option>
<option value="Bijaya_Higher_Secondary_School_Tyendukura">Bijaya Higher Secondary School, Tyendukura</option>
<option value="Balia_Womens_Higher_Secondary_School_Balia">Balia Women's Higher Secondary School, Balia</option>
<option value="Swami_Vivekananda_Manab_Sambal_Vikas_Higher_Secondary_School_Chaudakulat">Swami Vivekananda Manab Sambal Vikas Higher Secondary School, Chaudakulat</option>
<option value="Binapani_Higher_Secondary_School_Gayaspur">Binapani Higher Secondary School, Gayaspur</option>
<option value="Maa_Tarini_Higher_Secondary_School_Jayachandrapur">Maa Tarini Higher Secondary School, Jayachandrapur</option>
<option value="Chitrotpola_Higher_Secondary_School_Akhua_Odanga">Chitrotpola Higher Secondary School, Akhua Odanga</option>
<option value="Gandhi_Uccha_Madhyamik_Higher_Secondary_School_Ayatpur">Gandhi Uccha Madhyamik Higher Secondary School, Ayatpur</option>
<option value="Marshaghai_Womens_Higher_Secondary_School_Marshaghai">Marshaghai Women's Higher Secondary School, Marshaghai</option>
<option value="Nalinikanta_Higher_Secondary_School_Chandibaunsamul">Nalinikanta Higher Secondary School, Chandibaunsamul</option>
<option value="Swapneswar_Higher_Secondary_School_Barahpur">Swapneswar Higher Secondary School, Barahpur</option>
<option value="Beleswar_Higher_Secondary_School_Belbahali">Beleswar Higher Secondary School, Belbahali</option>
<option value="Bhimkund_Higher_Secondary_School_Dumuria">Bhimkund Higher Secondary School, Dumuria</option>
<option value="Gopaljew_Higher_Secondary_School_Benamunda">Gopaljew Higher Secondary School, Benamunda</option>
<option value="Kantipal_Anchalika_Higher_Secondary_School_Anandapur">Kantipal Anchalika Higher Secondary School, Anandapur</option>
<option value="Laxmi_Narayan_Higher_Secondary_School_Pipilia">Laxmi Narayan Higher Secondary School, Pipilia</option>
<option value="Maa_Gramyashree_Higher_Secondary_School_Naradpur">Maa Gramyashree Higher Secondary School, Naradpur</option>
<option value="Machhagarh_Higher_Secondary_School_Machhagarh">Machhagarh Higher Secondary School, Machhagarh</option>
<option value="Mahila_Higher_Secondary_School_Champua">Mahila Higher Secondary School, Champua</option>
<option value="Pateswar_Higher_Secondary_School_Suakati">Pateswar Higher Secondary School, Suakati</option>
<option value="Raisuan_Higher_Secondary_School_Raisuan">Raisuan Higher Secondary School, Raisuan</option>
<option value="Rangpat_Higher_Secondary_School_Pandapara">Rangpat Higher Secondary School, Pandapara</option>
<option value="Regional_SN_Higher_Secondary_School_Dhenkikote">Regional S.N. Higher Secondary School, Dhenkikote</option>
<option value="Sadang_Anchalika_Higher_Secondary_School_Sadang">Sadang Anchalika Higher Secondary School, Sadang</option>
<option value="Salbani_GP_Higher_Secondary_School_Salabani">Salbani G.P. Higher Secondary School, Salabani</option>
<option value="Santosi_Maa_Regional_Higher_Secondary_School_Jharbelda">Santosi Maa Regional Higher Secondary School, Jharbelda</option>
<option value="Sirigida_Anchalika_Bigyan_Higher_Secondary_School_Sirigida">Sirigida Anchalika Bigyan Higher Secondary School, Sirigida</option>
<option value="Utkalmani_Gopabandhu_Higher_Secondary_School_Ukhunda">Utkalmani Gopabandhu Higher Secondary School, Ukhunda</option>
<option value="Jawaharlal_Nehru_Higher_Secondary_School_Balianta">Jawaharlal Nehru Higher Secondary School, Balianta</option>
<option value="Sri_Sri_Baneswar_Higher_Secondary_School_Bentapur">Sri Sri Baneswar Higher Secondary School, Bentapur</option>
<option value="Banamalipur_Higher_Secondary_School_Banamalipur">Banamalipur Higher Secondary School, Banamalipur</option>
<option value="Odakhanda_Higher_Secondary_School_Odakhanda">Odakhanda Higher Secondary School, Odakhanda</option>
<option value="Parsuram_Higher_Secondary_School_Gambharimunda">Parsuram Higher Secondary School, Gambharimunda</option>
<option value="Rural_Womens_Higher_Secondary_School_Banapur">Rural Women's Higher Secondary School, Banapur</option>
<option value="Hattakeswar_Mahila_Higher_Secondary_School_Baghamari">Hattakeswar Mahila Higher Secondary School, Baghamari</option>
<option value="Chandaka_Higher_Secondary_School_Chandaka">Chandaka Higher Secondary School, Chandaka</option>
<option value="Ambedkar_Centenary_Higher_Secondary_School_of_Education_and_Technology_Dumduma">Ambedkar Centenary Higher Secondary School of Education & Technology, Dumduma</option>
<option value="City_Womens_Higher_Secondary_School_Siripur">City Women's Higher Secondary School, Siripur</option>
<option value="Maharshi_Womens_Higher_Secondary_School_Sailashree_Vihar">Maharshi Women's Higher Secondary School, Sailashree Vihar</option>
<option value="Raja_Madhusudan_Dev_Higher_Secondary_School_of_Science_and_Education_Patia">Raja Madhusudan Dev Higher Secondary School of Science & Education, Patia</option>
<option value="Kali_Charan_Panchagarh_Ananga_Narendra_Higher_Secondary_School_Bankoi">Kali Charan Panchagarh Ananga Narendra Higher Secondary School, Bankoi</option>
<option value="Maa_Sarada_Womens_Higher_Secondary_School_Tikatal">Maa Sarada Women's Higher Secondary School, Tikatal</option>
<option value="Raghunath_Higher_Secondary_School_Deuli">Raghunath Higher Secondary School, Deuli</option>
<option value="Panchupalli_Bhima_Balabantaray_Higher_Secondary_School_AnkulachatI">Panchupalli Bhima Balabantaray Higher Secondary School, AnkulachatI</option>
<option value="Bauri_Bandhu_Higher_Secondary_School_Chhatabar">Bauri Bandhu Higher Secondary School, Chhatabar</option>
<option value="Sanatan_Harichandan_Higher_Secondary_School_Madanpur">Sanatan Harichandan Higher Secondary School, Madanpur</option>
<option value="Sarat_Paikray_Higher_Secondary_School_Argul">Sarat Paikray Higher Secondary School, Argul</option>
<option value="Sri_Somanath_Balunkeswar_Dev_Mahila_Higher_Secondary_School_Kantia">Sri Somanath Balunkeswar Dev Mahila Higher Secondary School, Kantia</option>
<option value="Kabi_Prasanna_Patasani_Anchalika_Higher_Secondary_School_Malipada">Kabi Prasanna Patasani Anchalika Higher Secondary School, Malipada</option>
<option value="Kerang_Panchayat_Higher_Secondary_School_Kerang">Kerang Panchayat Higher Secondary School, Kerang</option>
<option value="Raghunath_Adarsha_Higher_Secondary_School_Olasingha">Raghunath Adarsha Higher Secondary School, Olasingha</option>
<option value="Ramachandra_Kalpana_Higher_Secondary_School_Kamaguru">Ramachandra Kalpana Higher Secondary School, Kamaguru</option>
<option value="Saheed_Laxman_Nayak_Higher_Secondary_School_Boipariguda">Saheed Laxman Nayak Higher Secondary School, Boipariguda</option>
<option value="Bhairaba_Higher_Secondary_School_Borigumma">Bhairaba Higher Secondary School, Borigumma</option>
<option value="Radha_Krishna_Adivasi_Higher_Secondary_School_Dasmanthpur">Radha Krishna Adivasi Higher Secondary School, Dasmanthpur</option>
<option value="Dr_BRA_Higher_Secondary_School_Koraput">Dr. B.R.A. Higher Secondary School, Koraput</option>
<option value="Biju_Patnaik_Higher_Secondary_School_Kundra">Biju Patnaik Higher Secondary School, Kundra</option>
<option value="Dr_BRA_Higher_Secondary_School_Lamtaput">Dr. B.R.A. Higher Secondary School, Lamtaput</option>
<option value="Sindha_Devi_Higher_Secondary_School_Nandapur">Sindha Devi Higher Secondary School, Nandapur</option>
<option value="Radha_Krishna_Higher_Secondary_School_Narayanpatana">Radha Krishna Higher Secondary School, Narayanpatana</option>
<option value="Gangeswari_Higher_Secondary_School_Pottangi">Gangeswari Higher Secondary School, Pottangi</option>
<option value="Sunabedha_Womens_Higher_Secondary_School_Sunabeda">Sunabedha Women's Higher Secondary School, Sunabeda</option>
<option value="Gopabandhu_Anchalika_Higher_Secondary_School_Kalimela">Gopabandhu Anchalika Higher Secondary School, Kalimela</option>
<option value="Biju_Patnaik_Higher_Secondary_School_of_Education_Govindapali">Biju Patnaik Higher Secondary School of Education, Govindapali</option>
<option value="Darwin_Memorial_Higher_Secondary_School_Kudulugumma">Darwin Memorial Higher Secondary School, Kudulugumma</option>
<option value="Womens_Higher_Secondary_School_Malkangiri">Women's Higher Secondary School, Malkangiri</option>
<option value="Utkalmani_Gopabandhu_Higher_Secondary_School_Mathili">Utkalmani Gopabandhu Higher Secondary School, Mathili</option>
<option value="Dr_Shyam_Prasad_Higher_Secondary_School_MV79">Dr. Shyam Prasad Higher Secondary School, MV-79</option>
<option value="Regional_Higher_Secondary_School_Podia">Regional Higher Secondary School, Podia</option>
<option value="Binodini_Mahila_Higher_Secondary_School_Banakati">Binodini Mahila Higher Secondary School, Banakati</option>
<option value="Haraprava_Higher_Secondary_School_Kalabadia">Haraprava Higher Secondary School, Kalabadia</option>
<option value="Baba_Kakharua_Baidyanath_Higher_Secondary_School_Manatri">Baba Kakharua Baidyanath Higher Secondary School, Manatri</option>
<option value="Shree_Jagannath_Higher_Secondary_School_Balijoda">Shree Jagannath Higher Secondary School, Balijoda</option>
<option value="Krushna_Chandrapur_Higher_Secondary_School_Krushnachandrapur">Krushna Chandrapur Higher Secondary School, Krushnachandrapur</option>
<option value="Sri_Rama_Chandra_Bhanj_Higher_Secondary_School_Ragdha">Sri Rama Chandra Bhanj Higher Secondary School, Ragdha</option>
<option value="Kailash_Chandra_Dilip_Kumar_Higher_Secondary_School_Bijatola">Kailash Chandra Dilip Kumar Higher Secondary School, Bijatola</option>
<option value="Rajanikanta_Higher_Secondary_School_Luhasila">Rajanikanta Higher Secondary School, Luhasila</option>
<option value="Gouri_Shankar_Higher_Secondary_School_Khadiasole">Gouri Shankar Higher Secondary School, Khadiasole</option>
<option value="Kalinga_Higher_Secondary_School_Manada">Kalinga Higher Secondary School, Manada</option>
<option value="Saheed_Birsa_Munda_Higher_Secondary_School_Jamda">Saheed Birsa Munda Higher Secondary School, Jamda</option>
<option value="Pandit_Raghunath_Murmu_Higher_Secondary_School_Sarat">Pandit Raghunath Murmu Higher Secondary School, Sarat</option>
<option value="Deo_Higher_Secondary_School_Tato">Deo Higher Secondary School, Tato</option>
<option value="Raghunath_Higher_Secondary_School_Kadadiha">Raghunath Higher Secondary School, Kadadiha</option>
<option value="Bhanjabhumi_Higher_Secondary_School_Dukura">Bhanjabhumi Higher Secondary School, Dukura</option>
<option value="Dhanghera_Higher_Secondary_School_Dhanghera">Dhanghera Higher Secondary School, Dhanghera</option>
<option value="Panchapalli_Higher_Secondary_School_Sainkula">Panchapalli Higher Secondary School, Sainkula</option>
<option value="Maa_Duarsuni_Higher_Secondary_School_Kuabuda">Maa Duarsuni Higher Secondary School, Kuabuda</option>
<option value="Janaki_Balava_Higher_Secondary_School_Hatabhadra">Janaki Balava Higher Secondary School, Hatabhadra</option>
<option value="Baba_Jateswar_Higher_Secondary_School_Chhataraipur">Baba Jateswar Higher Secondary School, Chhataraipur</option>
<option value="Gorumahisani_Iron_Higher_Secondary_School_Gorumahisani">Gorumahisani Iron Higher Secondary School, Gorumahisani</option>
<option value="Biju_Patnaik_Higher_Secondary_School_Ghagarbeda">Biju Patnaik Higher Secondary School, Ghagarbeda</option>
<option value="Chaitanya_Prasad_Higher_Secondary_School_Bhanjakia">Chaitanya Prasad Higher Secondary School, Bhanjakia</option>
<option value="Binod_Bihari_Anchalik_Higher_Secondary_School_Rasgovindpur">Binod Bihari Anchalik Higher Secondary School, Rasgovindpur</option>
<option value="Radha_Govinda_Anchalik_Higher_Secondary_School_Amarda">Radha Govinda Anchalik Higher Secondary School, Amarda</option>
<option value="Chaitanya_Prasad_Higher_Secondary_School_Kendua">Chaitanya Prasad Higher Secondary School, Kendua</option>
<option value="Jhansirani_Womens_Higher_Secondary_School_Padasitha">Jhansirani Women's Higher Secondary School, Padasitha</option>
<option value="Saratpal_Higher_Secondary_School_Palvihar">Saratpal Higher Secondary School, Palvihar</option>
<option value="Biju_Patnaik_Higher_Secondary_School_Singda">Biju Patnaik Higher Secondary School, Singda</option>
<option value="Rohi_Das_Soren_Higher_Secondary_School_Kundabai">Rohi Das Soren Higher Secondary School, Kundabai</option>
<option value="Panabedha_Higher_Secondary_School_Chandahandi">Panabedha Higher Secondary School, Chandahandi</option>
<option value="Jharigam_Higher_Secondary_School_Jharigam">Jharigam Higher Secondary School, Jharigam</option>
<option value="Raj_Chaunria_Higher_Secondary_School_Kodinga">Raj Chaunria Higher Secondary School, Kodinga</option>
<option value="Nawarangpur_Womens_Higher_Secondary_School_Nawarangpur">Nawarangpur Women's Higher Secondary School, Nawarangpur</option>
<option value="Maidalpur_Higher_Secondary_School_Maidalpur">Maidalpur Higher Secondary School, Maidalpur</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Raighar">Panchayat Samiti Higher Secondary School, Raighar</option>
<option value="Biju_Pattnaik_ST_Womens_Higher_Secondary_School_Umerkote">Biju Pattnaik ST Women's Higher Secondary School, Umerkote</option>
<option value="Bhapur_Anchalik_Higher_Secondary_School_Bhapur">Bhapur Anchalik Higher Secondary School, Bhapur</option>
<option value="Krushna_Priya_Devi_Womens_Higher_Secondary_School_Daspalla">Krushna Priya Devi Women's Higher Secondary School, Daspalla</option>
<option value="Maninag_Bahumukhi_Higher_Secondary_School_Takara">Maninag Bahumukhi Higher Secondary School, Takara</option>
<option value="Banamali_Barik_Higher_Secondary_School_Adakata">Banamali Barik Higher Secondary School, Adakata</option>
<option value="Womens_Higher_Secondary_School_Khandapara">Women's Higher Secondary School, Khandapara</option>
<option value="Higher_Secondary_Higher_Secondary_School_Boulasahi">Higher Secondary Higher Secondary School, Boulasahi</option>
<option value="Naba_Choudhury_Higher_Secondary_School_Kendudhipi">Naba Choudhury Higher Secondary School, Kendudhipi</option>
<option value="Dadhibamanjew_Higher_Secondary_School__Bahadajhola">Dadhibamanjew Higher Secondary School , Bahadajhola</option>
<option value="Gatiswar_Higher_Secondary_School_Malisahi">Gatiswar Higher Secondary School, Malisahi</option>
<option value="Nuagaon_Higher_Secondary_School_Nuagaon">Nuagaon Higher Secondary School, Nuagaon</option>
<option value="Ananda_Sahu_Womens_Higher_Secondary_School_Komanda">Ananda Sahu Women's Higher Secondary School, Komanda</option>
<option value="Shree_Ladukesh_Anchalik_Higher_Secondary_School_Godipada">Shree Ladukesh Anchalik Higher Secondary School, Godipada</option>
<option value="Arjuna_Rout_Memorial_Higher_Secondary_School_Mayurjhalia">Arjuna Rout Memorial Higher Secondary School, Mayurjhalia</option>
<option value="Garhbanikilo_Higher_Secondary_School_Garhbanikilo">Garhbanikilo Higher Secondary School, Garhbanikilo</option>
<option value="Maa_Maninag_Durga_Mahila_Higher_Secondary_School_Ranpur">Maa Maninag Durga Mahila Higher Secondary School, Ranpur</option>
<option value="Mohan_Mahila_Higher_Secondary_School_Chandpur">Mohan Mahila Higher Secondary School, Chandpur</option>
<option value="Sri_Jagannath_Higher_Secondary_School_Karangamal">Sri Jagannath Higher Secondary School, Karangamal</option>
<option value="Bibekananda_Meher_Higher_Secondary_School_Bhulia_Sikuan">Bibekananda Meher Higher Secondary School, Bhulia Sikuan</option>
<option value="Pallipragati_Higher_Secondary_School_Dohelpada">Pallipragati Higher Secondary School, Dohelpada</option>
<option value="Khadial_Mahila_Higher_Secondary_School_Khariar">Khadial Mahila Higher Secondary School, Khariar</option>
<option value="Panchayat_Higher_Secondary_School_Budhikomna">Panchayat Higher Secondary School, Budhikomna</option>
<option value="GM_Higher_Secondary_School_Hatibandh">G.M. Higher Secondary School, Hatibandh</option>
<option value="Acharya_Harihara_Smruti_Higher_Secondary_School_Indipur">Acharya Harihara Smruti Higher Secondary School, Indipur</option>
<option value="Banishree_Higher_Secondary_School_Kuanarpur">Banishree Higher Secondary School, Kuanarpur</option>
<option value="Baxi_Jagabandhu_Bidyadhar_Higher_Secondary_School_Gadaradang">Baxi Jagabandhu Bidyadhar Higher Secondary School, Gadaradang</option>
<option value="Brahmeswar_Higher_Secondary_School_Dharmakriti">Brahmeswar Higher Secondary School, Dharmakriti</option>
<option value="Chouda_Mouza_Bidyut_Higher_Secondary_School_Garhsanput">Chouda Mouza Bidyut Higher Secondary School, Garhsanput</option>
<option value="Dayavihar_Higher_Secondary_School_Kanas">Dayavihar Higher Secondary School, Kanas</option>
<option value="Gopinath_Dev_Higher_Secondary_School_Pratap_Purusottampur">Gopinath Dev Higher Secondary School, Pratap Purusottampur</option>
<option value="Harachandi_Mahila_Higher_Secondary_School_Rebana">Harachandi Mahila Higher Secondary School, Rebana</option>
<option value="Kalyanpur_Science_Higher_Secondary_School_Kalyanpur">Kalyanpur Science Higher Secondary School, Kalyanpur</option>
<option value="Kanas_Higher_Secondary_School_Kanas">Kanas Higher Secondary School, Kanas</option>
<option value="Konark_Womens_Higher_Secondary_School_Sarada">Konark Women's Higher Secondary School, Sarada</option>
<option value="Lankeswari_Mahila_Higher_Secondary_School_Beraboi_Balanga">Lankeswari Mahila Higher Secondary School, Beraboi, Balanga</option>
<option value="Maa_Ramachandi_Chilika_Womens_Higher_Secondary_School_Charichhak_Titipa">Maa Ramachandi Chilika Women's Higher Secondary School, Charichhak, Titipa</option>
<option value="Mahatma_Gandhi_Higher_Secondary_School_of_Education_and_Techchnology_Astaranga">Mahatma Gandhi Higher Secondary School of Education & Techchnology, Astaranga</option>
<option value="Mahatma_Gandhi_Memorial_Higher_Secondary_School_of_Education_and_Techchnology_Pubasasan">Mahatma Gandhi Memorial Higher Secondary School of Education and Techchnology, Pubasasan</option>
<option value="Manein_Higher_Secondary_School_Kandagoda">Manein Higher Secondary School, Kandagoda</option>
<option value="Nayahat_Higher_Secondary_School_Nayahat">Nayahat Higher Secondary School, Nayahat</option>
<option value="Panchayat_Higher_Secondary_School_Matiapada_Godiput">Panchayat Higher Secondary School, Matiapada, Godiput</option>
<option value="Prachi_Higher_Secondary_School_Bangurigaon">Prachi Higher Secondary School, Bangurigaon</option>
<option value="Puri_Womens_Higher_Secondary_School_Narendrakona">Puri Women's Higher Secondary School, Narendrakona</option>
<option value="Radhaballav_Higher_Secondary_School_Bairipur">Radhaballav Higher Secondary School, Bairipur</option>
<option value="Ratanpur_Science_Higher_Secondary_School_Ratanpur">Ratanpur Science Higher Secondary School, Ratanpur</option>
<option value="Shastri_Smruti_Higher_Secondary_School_Baliput">Shastri Smruti Higher Secondary School, Baliput</option>
<option value="Sri_Sri_Beleswar_Gopinath_Higher_Secondary_School_Balighai">Sri Sri Beleswar Gopinath Higher Secondary School, Balighai</option>
<option value="Dr_BRN_Higher_Secondary_School_Dombosora">Dr. B.R.N. Higher Secondary School, Dombosora</option>
<option value="Thyarama_Womens_Higher_Secondary_School_Gunupur">Thyarama Women's Higher Secondary School, Gunupur</option>
<option value="Manikeswari_Adivasi_Higher_Secondary_School_Kashipur">Manikeswari Adivasi Higher Secondary School, Kashipur</option>
<option value="Ambodala_Samant_Higher_Secondary_School_Ambadola">Ambodala Samant Higher Secondary School, Ambadola</option>
<option value="RG_Higher_Secondary_School_Padmapur">R.G. Higher Secondary School, Padmapur</option>
<option value="Ugratara_Higher_Secondary_School_Komtalpeta">Ugratara Higher Secondary School, Komtalpeta</option>
<option value="BRG_Higher_Secondary_School_Bhojpur">B.R.G. Higher Secondary School, Bhojpur</option>
<option value="Batgaon_Higher_Secondary_School_Batgaon">Batgaon Higher Secondary School, Batgaon</option>
<option value="DPA_Higher_Secondary_School_Mura">D.P.A. Higher Secondary School, Mura</option>
<option value="DPA_Higher_Secondary_School_Sason">D.P.A. Higher Secondary School, Sason</option>
<option value="Fashimal_Anchalik_Higher_Secondary_School_Fashimal">Fashimal Anchalik Higher Secondary School, Fashimal</option>
<option value="Jai_Durga_Higher_Secondary_School_Padiabahal">Jai Durga Higher Secondary School, Padiabahal</option>
<option value="Jai_Jagannath_Higher_Secondary_School_R_Badmal">Jai Jagannath Higher Secondary School, R.Badmal</option>
<option value="Kisinda_Higher_Secondary_School_Kisinda">Kisinda Higher Secondary School, Kisinda</option>
<option value="Kuchinda_Womens_Higher_Secondary_School_Kuchinda">Kuchinda Women's Higher Secondary School, Kuchinda</option>
<option value="Kutrachuan_Higher_Secondary_School_Kutrachuan">Kutrachuan Higher Secondary School, Kutrachuan</option>
<option value="Maa_Jhadeswari_Higher_Secondary_School_Dhama">Maa Jhadeswari Higher Secondary School, Dhama</option>
<option value="Mandhata_Baba_Higher_Secondary_School_Maneswar">Mandhata Baba Higher Secondary School, Maneswar</option>
<option value="Parbati_Giri_Arts_Higher_Secondary_School_Mahulpali">Parbati Giri Arts Higher Secondary School, Mahulpali</option>
<option value="Parsuram_Gountia_Higher_Secondary_School_Jarabaga">Parsuram Gountia Higher Secondary School, Jarabaga</option>
<option value="Prabhu_Dayal_Rural_Higher_Secondary_School_Kesaibahal">Prabhu Dayal Rural Higher Secondary School, Kesaibahal</option>
<option value="RKDT_Higher_Secondary_School_Sambalpur">R.K.D.T. Higher Secondary School, Sambalpur</option>
<option value="Rairakhol_Womens_Higher_Secondary_School_Rairakhol">Rairakhol Women's Higher Secondary School, Rairakhol</option>
<option value="Rajiv_Gandhi_Memorial_Tribal_Higher_Secondary_School_Kalheipali">Rajiv Gandhi Memorial Tribal Higher Secondary School, Kalheipali</option>
<option value="Samaleswari_Higher_Secondary_School_Sambalpur">Samaleswari Higher Secondary School, Sambalpur</option>
<option value="Saraswat_Higher_Secondary_School_Godbhaga">Saraswat Higher Secondary School, Godbhaga</option>
<option value="VSS_Higher_Secondary_School_Jujomura">V.S.S. Higher Secondary School, Jujomura</option>
<option value="VSS_Institute_of_Science_Higher_Secondary_School_Dhankauda">V.S.S. Institute of Science Higher Secondary School, Dhankauda</option>
<option value="Binka_Womens_Higher_Secondary_School_Phulmuthi">Binka Women’s Higher Secondary School, Phulmuthi</option>
<option value="Shree_Jagannath_Higher_Secondary_School_Bausuni">Shree Jagannath Higher Secondary School, Bausuni</option>
<option value="Parameswari_Higher_Secondary_School_Bhutiapali">Parameswari Higher Secondary School, Bhutiapali</option>
<option value="Babaji_Sahu_Higher_Secondary_School_Gajabandh">Babaji Sahu Higher Secondary School, Gajabandh</option>
<option value="Panchayat_Womens_Higher_Secondary_School_S_Rampur">Panchayat Women's Higher Secondary School, S. Rampur</option>
<option value="Gram_Panchayat_Higher_Secondary_School_Lachhipur">Gram Panchayat Higher Secondary School, Lachhipur</option>
<option value="Maa_Maheswari_Higher_Secondary_School_Khambeswaripali">Maa Maheswari Higher Secondary School, Khambeswaripali</option>
<option value="Biju_Pattnaik_Womens_Higher_Secondary_School_Sonepur">Biju Pattnaik Women's Higher Secondary School, Sonepur</option>
<option value="MBR_Higher_Secondary_School_Menda">M.B.R. Higher Secondary School, Menda</option>
<option value="Panchayat_Higher_Secondary_School_Charbhata">Panchayat Higher Secondary School, Charbhata</option>
<option value="Satyabadi_Higher_Secondary_School_Kalapathar">Satyabadi Higher Secondary School, Kalapathar</option>
<option value="Kinjirkela_Higher_Secondary_School_Kinjirkela">Kinjirkela Higher Secondary School, Kinjirkela</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Balisankara">Panchayat Samiti Higher Secondary School, Balisankara</option>
<option value="Panchayat_Higher_Secondary_School_BargaonKachhar">Panchayat Higher Secondary School, Bargaon-Kachhar</option>
<option value="Subodh_Ray_Higher_Secondary_School_Bisra">Subodh Ray Higher Secondary School, Bisra</option>
<option value="Balanipat_Higher_Secondary_School_Jhirdapali">Balanipat Higher Secondary School, Jhirdapali</option>
<option value="Banshidhar_Higher_Secondary_School_Kenaveta">Banshidhar Higher Secondary School, Kenaveta</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Gurundia">Panchayat Samiti Higher Secondary School, Gurundia</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Hemgir">Panchayat Samiti Higher Secondary School, Hemgir</option>
<option value="Koida_Higher_Secondary_School_Koida">Koida Higher Secondary School, Koida</option>
<option value="Baba_Baneswar_Higher_Secondary_School_Bilaipara">Baba Baneswar Higher Secondary School, Bilaipara</option>
<option value="Damodar_Naik_Higher_Secondary_School_Darlipali">Damodar Naik Higher Secondary School, Darlipali</option>
<option value="Lephripara_Higher_Secondary_School_Lephripara">Lephripara Higher Secondary School, Lephripara</option>
<option value="SRDMN_Panchayat_Higher_Secondary_School_Sargipali">S.R.D.M.N. Panchayat Higher Secondary School, Sargipali</option>
<option value="Panchayat_Samiti_Higher_Secondary_School_Nuagaon">Panchayat Samiti Higher Secondary School, Nuagaon</option>
<option value="Kansbahal_Higher_Secondary_School_Laing">Kansbahal Higher Secondary School, Laing</option>
<option value="Kalyani_Ray_Higher_Secondary_School_Hamirpur">Kalyani Ray Higher Secondary School, Hamirpur</option>
<option value="Utkal_Gourav_Madhusudan_Higher_Secondary_School_Rourkela">Utkal Gourav Madhusudan Higher Secondary School, Rourkela</option>
<option value="New_Orissa_Higher_Secondary_School_Gaibira">New Orissa Higher Secondary School, Gaibira</option>
<option value="Subdega_Anchalika_Sahayog_Higher_Secondary_School_Subdega">Subdega Anchalika Sahayog Higher Secondary School, Subdega</option>
<option value="Illa_Memorial_Panchayat_Samiti_Higher_Secondary_School_Kinjirma">Illa Memorial Panchayat Samiti Higher Secondary School, Kinjirma</option>
<option value="Panchayat_Samiti_Science_and_Arts_Higher_Secondary_School_Bhedabahal">Panchayat Samiti Science & Arts Higher Secondary School, Bhedabahal</option>
<option value="Vesaja_Rambhabati_Higher_Secondary_School_Kundukela">Vesaja Rambhabati Higher Secondary School, Kundukela</option>
<option value="Jasoda_Bishnu_NMP_Higher_Secondary_School_Jogimal">Jasoda Bishnu N.M.P. Higher Secondary School, Jogimal</option>
<option value="Maharshi_Dayanand_Higher_Secondary_School_GarhMahulpali">Maharshi Dayanand Higher Secondary School, Garh-Mahulpali</option>
<option value="Ujalpur_Higher_Secondary_School_Ujalpur">Ujalpur Higher Secondary School, Ujalpur</option>


   
  </select>
</div>
<div className="field">
  <select style={{backgroundColor:"black"}} className="name_select" value={signupRole} onChange={(e)=> setSignupRole(e.target.value)} name="signupRole" id="signupRole" required>
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
