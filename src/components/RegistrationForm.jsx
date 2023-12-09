// RegistrationForm.jsx
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import '../components/stylecss/Registration.css';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./RegistrationForm.css"; // Import the CSS file for additional styles

const RegistrationForm = () => {
   const notify = () => toast.success("Team registered Successfully", {style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
});
const dontallow = () => {
  toast.error("First Login to authenticate", {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });

 
};

  const navigate = useNavigate();
  const [userData,setUserData]=useState({
  name: "",
  email: "",
  teamName: "",
  leaderName: "",
  leaderEmail: "",
  topic: "topic1", // Assuming you want to set a default value for the select field
  district: "district1", // Assuming you want to set a default value for the select field
  block: "",
  drive:"",
  schoolName: "",
  schoolCode: "",
  coordinatorName: "",
  member1: "",
  member2: "",
  member3: "",
  member4: "",

  });
  const callAboutPage = async () => {
    try {
      const res = await fetch('/api/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData({...userData,
        name: data.name,
        email: data.email,
        teamName: userData.teamName,
        leaderName: userData.leaderName,
        leaderEmail: userData.leaderEmail,
        topic: userData.topic,
        district: userData.district,
        block: userData.block,
        drive:userData.drive,
        schoolName: data.name,
        schoolCode: userData.schoolCode,
        coordinatorName: userData.coordinatorName,
        member1: userData.member1,
        member2: userData.member2,
        member3:userData.member3,
        member4:userData.member4
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
       
      }
    console.log(userData);
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        dontallow();
      }, 1000);
       navigate('/');
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const handleInputs=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setUserData({...userData,[name]:value

    })
  }
  const contactForm= async (e)=>{
    e.preventDefault();
    const {
      name,
      email, 
      teamName,
      leaderName,
      leaderEmail,
      topic, 
      district,
      block,
      drive, 
      schoolName,
      schoolCode,
      coordinatorName,
      member1,
      member2,
      member3,
      member4
    }=userData;
    const res=await fetch('/api/contact',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email, 
        teamName,
        leaderName,
        leaderEmail,
        topic, 
        district,
        block,
        drive,
        schoolName,
        schoolCode,
        coordinatorName,
        member1,
        member2,
        member3,
        member4
      })
    })
  const data=await res.json();
  console.log(data);
  if (res.status === 400 && data.error === "Team name already exists. Please choose a different team name.") {
    // Display window.alert if the team already exists
    window.alert("Team name already exists. Please choose a different team name.");
}
  else if(!data){
    console.log("message not send");
  }
  else{
    notify();
    setUserData({...userData,teamName:""});
    navigate('/registeredteams');
  }
  }
  return (
    <div className="registration-wrapper">
      <div className="registration-form-inner custom-form">
        <h2 style={{ color: "white", textAlign: "center",fontSize:"30px" }}>Registration Form</h2>
        <form method="POST" id="registration-form" className="signup" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="field">
              <input type="text" name="institutionName" value={userData.name}  onChange={handleInputs} id="name" placeholder="Institution Name" required />
              {/* {console.log("here is my name"+ userData)} */}
            </div>
            <div className="field">
              <input type="email" name="institutionEmail" value={userData.email} onChange={handleInputs} id="email" placeholder="Email Address" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="teamName" value={userData.teamName}  onChange={handleInputs} id="teamName" placeholder="Team Name" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="leaderName" id="leaderName" value={userData.leaderName} onChange={handleInputs} placeholder="Name of Leader" required />
            </div>
            <div className="field">
              <input type="email" name="leaderEmail" id="leaderEmail"   value={userData.leaderEmail} onChange={handleInputs} placeholder="Email id of Leader" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label style={{color:"white"}} htmlFor="topic">Theme:</label>
              <select value={userData.topic} onChange={handleInputs} name="topic" id="topic" required>
                <option value="topic1">select</option>
                <option value="Agriculture_food_tech_and_Rural_development">Agriculture, food tech, and Rural development</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Renewable_Sustainable_energy">Renewable/Sustainable energy</option>
                <option value="Accessibility_e_Commerce_and_Cybersecurity">Accessibility, e-Commerce and Cybersecurity</option>
                <option value="Self_Help_Groups">Self Help Groups</option>
                <option value="Smart_Education">Smart Education</option>
                <option value="Disaster_Management">Disaster Management</option>
                <option value="Toys_and_Games">Toys and Games</option>
                <option value="Waste_Management">Waste Management</option>
                <option value="Miscellaneous">Miscellaneous</option>



                {/* Add more options as needed */}
              </select>
            </div>
            <div className="field">
              <label style={{color:"white"}} htmlFor="district">District:</label>
              <select value={userData.district}  onChange={handleInputs} name="district" id="district" required>
              <option value="select">Select</option>
    <option value="Angul">Angul</option>
    <option value="Balasore">Balasore</option>
    <option value="Bargarh">Bargarh</option>
    <option value="Bhadrak">Bhadrak</option>
    <option value="Bolangir">Bolangir</option>
    <option value="Boudh">Boudh</option>
    <option value="Cuttack">Cuttack</option>
    <option value="Deogarh">Deogarh</option>
    <option value="Dhenkanal">Dhenkanal</option>
    <option value="Gajapati">Gajapati</option>
    <option value="Ganjam">Ganjam</option>
    <option value="Jagatsinghpur">Jagatsinghpur</option>
    <option value="Jajpur">Jajpur</option>
    <option value="Jharsuguda">Jharsuguda</option>
    <option value="Kalahandi">Kalahandi</option>
    <option value="Kandhamal">Kandhamal</option>
    <option value="Kendrapada">Kendrapada</option>
    <option value="Keonjhar">Keonjhar</option>
    <option value="Khordha">Khordha</option>
    <option value="Koraput">Koraput</option>
    <option value="Malkangiri">Malkangiri</option>
    <option value="Mayurbhanj">Mayurbhanj</option>
    <option value="Nabarangapur">Nabarangapur</option>
    <option value="Nayagarh">Nayagarh</option>
    <option value="Nuapada">Nuapada</option>
    <option value="Puri">Puri</option>
    <option value="Rayagada">Rayagada</option>
    <option value="Sambalpur">Sambalpur</option>
    <option value="Sonepur">Sonepur</option>
    <option value="Sundargarh">Sundargarh</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
           
          <div className="row">
            <div className="field">
            <label style={{color:"white"}} htmlFor="block">Block:</label>
              <select value={userData.block}  onChange={handleInputs} name="block" id="block" required>
              <option value="select">Select</option>
              
<option value="Angul">Angul</option>
<option value="Angul">Angul</option>
<option value="Angul (MPL)">Angul (MPL)</option>
<option value="Angul (MPL)">Angul (MPL)</option>
<option value="Angul (MPL)">Angul (MPL)</option>
<option value="Athamallik">Athamallik</option>
<option value="Athamallik">Athamallik</option>
<option value="Athamallik">Athamallik</option>
<option value="Athamallik (NAC)">Athamallik (NAC)</option>
<option value="Banarpal">Banarpal</option>
<option value="Banarpal">Banarpal</option>
<option value="Banarpal">Banarpal</option>
<option value="Banarpal">Banarpal</option>
<option value="Chhendipada">Chhendipada</option>
<option value="Chhendipada">Chhendipada</option>
<option value="Chhendipada">Chhendipada</option>
<option value="Chhendipada">Chhendipada</option>
<option value="Kaniha">Kaniha</option>
<option value="Kaniha">Kaniha</option>
<option value="Kaniha">Kaniha</option>
<option value="Kishorenagar">Kishorenagar</option>
<option value="Kishorenagar">Kishorenagar</option>
<option value="Kishorenagar">Kishorenagar</option>
<option value="Pallahara">Pallahara</option>
<option value="Pallahara">Pallahara</option>
<option value="Pallahara">Pallahara</option>
<option value="Talcher">Talcher</option>
<option value="Talcher">Talcher</option>
<option value="Talcher">Talcher</option>
<option value="Talcher (MPL)">Talcher (MPL)</option>
<option value="Talcher (MPL)">Talcher (MPL)</option>
<option value="Bahanaga">Bahanaga</option>
<option value="Bahanaga">Bahanaga</option>
<option value="Bahanaga">Bahanaga</option>
<option value="Bahanaga">Bahanaga</option>
<option value="Bahanaga">Bahanaga</option>
<option value="Bahanaga">Bahanaga</option>
<option value="Balasore (MPL)">Balasore (MPL)</option>
<option value="Balasore (MPL)">Balasore (MPL)</option>
<option value="Balasore (MPL)">Balasore (MPL)</option>
<option value="Balasore (MPL)">Balasore (MPL)</option>
<option value="Balasore Sadar">Balasore Sadar</option>
<option value="Balasore Sadar">Balasore Sadar</option>
<option value="Balasore Sadar">Balasore Sadar</option>
<option value="Balasore Sadar">Balasore Sadar</option>
<option value="Balasore Sadar">Balasore Sadar</option>
<option value="Balasore Sadar">Balasore Sadar</option>
<option value="Baliapal">Baliapal</option>
<option value="Baliapal">Baliapal</option>
<option value="Baliapal">Baliapal</option>
<option value="Baliapal">Baliapal</option>
<option value="Basta">Basta</option>
<option value="Basta">Basta</option>
<option value="Basta">Basta</option>
<option value="Basta">Basta</option>
<option value="Basta">Basta</option>
<option value="Bhograi">Bhograi</option>
<option value="Bhograi">Bhograi</option>
<option value="Bhograi">Bhograi</option>
<option value="Bhograi">Bhograi</option>
<option value="Bhograi">Bhograi</option>
<option value="Bhograi">Bhograi</option>
<option value="Bhograi">Bhograi</option>
<option value="Bhograi">Bhograi</option>
<option value="Jaleswar">Jaleswar</option>
<option value="Jaleswar">Jaleswar</option>
<option value="Jaleswar">Jaleswar</option>
<option value="Jaleswar">Jaleswar</option>
<option value="Jaleswar">Jaleswar</option>
<option value="Jaleswar">Jaleswar</option>
<option value="Jaleswar (MPL)">Jaleswar (MPL)</option>
<option value="Jaleswar (MPL)">Jaleswar (MPL)</option>
<option value="Khaira">Khaira</option>
<option value="Khaira">Khaira</option>
<option value="Khaira">Khaira</option>
<option value="Khaira">Khaira</option>
<option value="Khaira">Khaira</option>
<option value="Khaira">Khaira</option>
<option value="Nilgiri">Nilgiri</option>
<option value="Nilgiri">Nilgiri</option>
<option value="Nilgiri">Nilgiri</option>
<option value="Nilgiri (NAC)">Nilgiri (NAC)</option>
<option value="Nilgiri (NAC)">Nilgiri (NAC)</option>
<option value="Oupada">Oupada</option>
<option value="Oupada">Oupada</option>
<option value="Oupada">Oupada</option>
<option value="Oupada">Oupada</option>
<option value="Oupada">Oupada</option>
<option value="Remuna">Remuna</option>
<option value="Remuna">Remuna</option>
<option value="Remuna">Remuna</option>
<option value="Simulia">Simulia</option>
<option value="Simulia">Simulia</option>
<option value="Simulia">Simulia</option>
<option value="Simulia">Simulia</option>
<option value="Soro">Soro</option>
<option value="Soro">Soro</option>
<option value="Soro">Soro</option>
<option value="Soro">Soro</option>
<option value="Soro (MPL)">Soro (MPL)</option>
<option value="Soro (MPL)">Soro (MPL)</option>
<option value="Ambabhona">Ambabhona</option>
<option value="Ambabhona">Ambabhona</option>
<option value="Attabira">Attabira</option>
<option value="Attabira">Attabira</option>
<option value="Attabira">Attabira</option>
<option value="Attabira">Attabira</option>
<option value="Bargarh">Bargarh</option>
<option value="Bargarh">Bargarh</option>
<option value="Bargarh">Bargarh</option>
<option value="Bargarh">Bargarh</option>
<option value="Bargarh">Bargarh</option>
<option value="Bargarh">Bargarh</option>
<option value="Bargarh (MPL)">Bargarh (MPL)</option>
<option value="Bargarh (MPL)">Bargarh (MPL)</option>
<option value="Bargarh (MPL)">Bargarh (MPL)</option>
<option value="Barpali">Barpali</option>
<option value="Barpali">Barpali</option>
<option value="Barpali">Barpali</option>
<option value="Barpali (NAC)">Barpali (NAC)</option>
<option value="Bhatali">Bhatali</option>
<option value="Bhatali">Bhatali</option>
<option value="Bhatali">Bhatali</option>
<option value="Bheden">Bheden</option>
<option value="Bheden">Bheden</option>
<option value="Bheden">Bheden</option>
<option value="Bheden">Bheden</option>
<option value="Bheden">Bheden</option>
<option value="Bijepur">Bijepur</option>
<option value="Bijepur">Bijepur</option>
<option value="Bijepur">Bijepur</option>
<option value="Gaisilet">Gaisilet</option>
<option value="Gaisilet">Gaisilet</option>
<option value="Gaisilet">Gaisilet</option>
<option value="Gaisilet">Gaisilet</option>
<option value="Jharbandh">Jharbandh</option>
<option value="Jharbandh">Jharbandh</option>
<option value="Jharbandh">Jharbandh</option>
<option value="Padampur (NAC)">Padampur (NAC)</option>
<option value="Paikmal">Paikmal</option>
<option value="Paikmal">Paikmal</option>
<option value="Paikmal">Paikmal</option>
<option value="Rajborasambar">Rajborasambar</option>
<option value="Rajborasambar">Rajborasambar</option>
<option value="Rajborasambar">Rajborasambar</option>
<option value="Rajborasambar">Rajborasambar</option>
<option value="Sohella">Sohella</option>
<option value="Sohella">Sohella</option>
<option value="Basudevpur">Basudevpur</option>
<option value="Basudevpur">Basudevpur</option>
<option value="Basudevpur">Basudevpur</option>
<option value="Basudevpur">Basudevpur</option>
<option value="Basudevpur">Basudevpur</option>
<option value="Basudevpur (MPL)">Basudevpur (MPL)</option>
<option value="Basudevpur (MPL)">Basudevpur (MPL)</option>
<option value="Bhadrak">Bhadrak</option>
<option value="Bhadrak">Bhadrak</option>
<option value="Bhadrak">Bhadrak</option>
<option value="Bhadrak">Bhadrak</option>
<option value="Bhadrak">Bhadrak</option>
<option value="Bhadrak">Bhadrak</option>
<option value="Bhadrak (MPL)">Bhadrak (MPL)</option>
<option value="Bhadrak (MPL)">Bhadrak (MPL)</option>
<option value="Bhandaripokhari">Bhandaripokhari</option>
<option value="Bhandaripokhari">Bhandaripokhari</option>
<option value="Bhandaripokhari">Bhandaripokhari</option>
<option value="Bhandaripokhari">Bhandaripokhari</option>
<option value="Bhandaripokhari">Bhandaripokhari</option>
<option value="Bonth">Bonth</option>
<option value="Bonth">Bonth</option>
<option value="Bonth">Bonth</option>
<option value="Bonth">Bonth</option>
<option value="Chandabali">Chandabali</option>
<option value="Chandabali">Chandabali</option>
<option value="Chandabali">Chandabali</option>
<option value="Chandabali">Chandabali</option>
<option value="Dhamnagar">Dhamnagar</option>
<option value="Dhamnagar">Dhamnagar</option>
<option value="Dhamnagar">Dhamnagar</option>
<option value="Dhamnagar">Dhamnagar</option>
<option value="Dhamnagar">Dhamnagar</option>
<option value="Dhamnagar">Dhamnagar</option>
<option value="Tihidi">Tihidi</option>
<option value="Tihidi">Tihidi</option>
<option value="Tihidi">Tihidi</option>
<option value="Agalpur">Agalpur</option>
<option value="Agalpur">Agalpur</option>
<option value="Agalpur">Agalpur</option>
<option value="Agalpur">Agalpur</option>
<option value="Agalpur">Agalpur</option>
<option value="Balangir">Balangir</option>
<option value="Balangir">Balangir</option>
<option value="Balangir">Balangir</option>
<option value="Balangir">Balangir</option>
<option value="Balangir">Balangir</option>
<option value="Balangir (MPL)">Balangir (MPL)</option>
<option value="Balangir (MPL)">Balangir (MPL)</option>
<option value="Balangir (MPL)">Balangir (MPL)</option>
<option value="Bangomunda">Bangomunda</option>
<option value="Bangomunda">Bangomunda</option>
<option value="Bangomunda">Bangomunda</option>
<option value="Belpada">Belpada</option>
<option value="Belpada">Belpada</option>
<option value="Belpada">Belpada</option>
<option value="Belpada">Belpada</option>
<option value="Belpada">Belpada</option>
<option value="Deogaon">Deogaon</option>
<option value="Deogaon">Deogaon</option>
<option value="Deogaon">Deogaon</option>
<option value="Deogaon">Deogaon</option>
<option value="Gudvela">Gudvela</option>
<option value="Gudvela">Gudvela</option>
<option value="Gudvela">Gudvela</option>
<option value="Kantabanji (NAC)">Kantabanji (NAC)</option>
<option value="Khaprakhol">Khaprakhol</option>
<option value="Khaprakhol">Khaprakhol</option>
<option value="Khaprakhol">Khaprakhol</option>
<option value="Khaprakhol">Khaprakhol</option>
<option value="Khaprakhol">Khaprakhol</option>
<option value="Loisingha">Loisingha</option>
<option value="Loisingha">Loisingha</option>
<option value="Loisingha">Loisingha</option>
<option value="Muribahal">Muribahal</option>
<option value="Muribahal">Muribahal</option>
<option value="Patnagarh">Patnagarh</option>
<option value="Patnagarh">Patnagarh</option>
<option value="Patnagarh">Patnagarh</option>
<option value="Patnagarh (NAC)">Patnagarh (NAC)</option>
<option value="Patnagarh (NAC)">Patnagarh (NAC)</option>
<option value="Puintala">Puintala</option>
<option value="Puintala">Puintala</option>
<option value="Puintala">Puintala</option>
<option value="Puintala">Puintala</option>
<option value="Saintala">Saintala</option>
<option value="Saintala">Saintala</option>
<option value="Saintala">Saintala</option>
<option value="Saintala">Saintala</option>
<option value="Titilagarh">Titilagarh</option>
<option value="Titilagarh">Titilagarh</option>
<option value="Titilagarh">Titilagarh</option>
<option value="Titilagarh (MPL)">Titilagarh (MPL)</option>
<option value="Turekela">Turekela</option>
<option value="Turekela">Turekela</option>
<option value="Boudh">Boudh</option>
<option value="Boudh">Boudh</option>
<option value="Boudh">Boudh</option>
<option value="Boudh (NAC)">Boudh (NAC)</option>
<option value="Boudh (NAC)">Boudh (NAC)</option>
<option value="Harbhanga">Harbhanga</option>
<option value="Harbhanga">Harbhanga</option>
<option value="Harbhanga">Harbhanga</option>
<option value="Kantamal">Kantamal</option>
<option value="Kantamal">Kantamal</option>
<option value="Kantamal">Kantamal</option>
<option value="Arc charbatia">Arc charbatia</option>
<option value="Arc charbatia">Arc charbatia</option>
<option value="Athagarh (NAC)">Athagarh (NAC)</option>
<option value="Athagarh (NAC)">Athagarh (NAC)</option>
<option value="Athgarh">Athgarh</option>
<option value="Athgarh">Athgarh</option>
<option value="Athgarh">Athgarh</option>
<option value="Banki">Banki</option>
<option value="Banki">Banki</option>
<option value="Banki">Banki</option>
<option value="Banki (NAC)">Banki (NAC)</option>
<option value="Baramba">Baramba</option>
<option value="Baramba">Baramba</option>
<option value="Baramba">Baramba</option>
<option value="Baranga">Baranga</option>
<option value="Baranga">Baranga</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack (MC)">Cuttack (MC)</option>
<option value="Cuttack Sadar">Cuttack Sadar</option>
<option value="Cuttack Sadar">Cuttack Sadar</option>
<option value="Cuttack Sadar">Cuttack Sadar</option>
<option value="Cuttack Sadar">Cuttack Sadar</option>
<option value="Cuttack Sadar">Cuttack Sadar</option>
<option value="Cuttack Sadar">Cuttack Sadar</option>
<option value="Cuttack Sadar">Cuttack Sadar</option>
<option value="Cuttack Sadar">Cuttack Sadar</option>
<option value="Dompara">Dompara</option>
<option value="Dompara">Dompara</option>
<option value="Kantapara">Kantapara</option>
<option value="Kantapara">Kantapara</option>
<option value="Kantapara">Kantapara</option>
<option value="Mahanga">Mahanga</option>
<option value="Mahanga">Mahanga</option>
<option value="Mahanga">Mahanga</option>
<option value="Mahanga">Mahanga</option>
<option value="Mahanga">Mahanga</option>
<option value="Narsinghpur">Narsinghpur</option>
<option value="Narsinghpur">Narsinghpur</option>
<option value="Narsinghpur">Narsinghpur</option>
<option value="Narsinghpur">Narsinghpur</option>
<option value="Niali">Niali</option>
<option value="Niali">Niali</option>
<option value="Niali">Niali</option>
<option value="Niali">Niali</option>
<option value="Niali">Niali</option>
<option value="Nischintakoili">Nischintakoili</option>
<option value="Nischintakoili">Nischintakoili</option>
<option value="Nischintakoili">Nischintakoili</option>
<option value="Nischintakoili">Nischintakoili</option>
<option value="Salipur">Salipur</option>
<option value="Salipur">Salipur</option>
<option value="Salipur">Salipur</option>
<option value="Salipur">Salipur</option>
<option value="Salipur">Salipur</option>
<option value="Tangi">Tangi</option>
<option value="Tangi">Tangi</option>
<option value="Tangi">Tangi</option>
<option value="Tangi">Tangi</option>
<option value="Tangi">Tangi</option>
<option value="Tigiria">Tigiria</option>
<option value="Tigiria">Tigiria</option>
<option value="Tigiria">Tigiria</option>
<option value="Barkote">Barkote</option>
<option value="Barkote">Barkote</option>
<option value="Barkote">Barkote</option>
<option value="Barkote">Barkote</option>
<option value="Barkote">Barkote</option>
<option value="Deogarh (MPL)">Deogarh (MPL)</option>
<option value="Deogarh (MPL)">Deogarh (MPL)</option>
<option value="Reamal">Reamal</option>
<option value="Reamal">Reamal</option>
<option value="Reamal">Reamal</option>
<option value="Reamal">Reamal</option>
<option value="Tileibani">Tileibani</option>
<option value="Tileibani">Tileibani</option>
<option value="Tileibani">Tileibani</option>
<option value="Tileibani">Tileibani</option>
<option value="Bhuban">Bhuban</option>
<option value="Bhuban">Bhuban</option>
<option value="Bhuban">Bhuban</option>
<option value="Bhuban">Bhuban</option>
<option value="Bhuban">Bhuban</option>
<option value="Bhuban (NAC)">Bhuban (NAC)</option>
<option value="Bhuban (NAC)">Bhuban (NAC)</option>
<option value="Dhenkanal (MPL)">Dhenkanal (MPL)</option>
<option value="Dhenkanal (MPL)">Dhenkanal (MPL)</option>
<option value="Dhenkanal (MPL)">Dhenkanal (MPL)</option>
<option value="Dhenkanal sadar">Dhenkanal sadar</option>
<option value="Dhenkanal sadar">Dhenkanal sadar</option>
<option value="Dhenkanal sadar">Dhenkanal sadar</option>
<option value="Dhenkanal sadar">Dhenkanal sadar</option>
<option value="Gondia">Gondia</option>
<option value="Gondia">Gondia</option>
<option value="Gondia">Gondia</option>
<option value="Gondia">Gondia</option>
<option value="Gondia">Gondia</option>
<option value="Hindol">Hindol</option>
<option value="Hindol">Hindol</option>
<option value="Hindol">Hindol</option>
<option value="Hindol">Hindol</option>
<option value="Hindol">Hindol</option>
<option value="Kamakhyanagar">Kamakhyanagar</option>
<option value="Kamakhyanagar">Kamakhyanagar</option>
<option value="Kamakhyanagar">Kamakhyanagar</option>
<option value="Kamakhyanagar (NAC)">Kamakhyanagar (NAC)</option>
<option value="Kamakhyanagar (NAC)">Kamakhyanagar (NAC)</option>
<option value="Kankadahad">Kankadahad</option>
<option value="Kankadahad">Kankadahad</option>
<option value="Kankadahad">Kankadahad</option>
<option value="Kankadahad">Kankadahad</option>
<option value="Odapada">Odapada</option>
<option value="Odapada">Odapada</option>
<option value="Odapada">Odapada</option>
<option value="Odapada">Odapada</option>
<option value="Odapada">Odapada</option>
<option value="Parjang">Parjang</option>
<option value="Parjang">Parjang</option>
<option value="Parjang">Parjang</option>
<option value="Parjang">Parjang</option>
<option value="Gosani">Gosani</option>
<option value="Gumma">Gumma</option>
<option value="Gumma">Gumma</option>
<option value="Kashi (NAC)">Kashi (NAC)</option>
<option value="Mohana">Mohana</option>
<option value="Mohana">Mohana</option>
<option value="Nuagada">Nuagada</option>
<option value="Nuagada">Nuagada</option>
<option value="Paralakhemundi (MPL)">Paralakhemundi (MPL)</option>
<option value="Paralakhemundi (MPL)">Paralakhemundi (MPL)</option>
<option value="R.Udayagiri">R.Udayagiri</option>
<option value="R.Udayagiri">R.Udayagiri</option>
<option value="Rayagada">Rayagada</option>
<option value="Rayagada">Rayagada</option>
<option value="Aska">Aska</option>
<option value="Aska">Aska</option>
<option value="Aska (NAC)">Aska (NAC)</option>
<option value="Beguniapada">Beguniapada</option>
<option value="Bellaguntha">Bellaguntha</option>
<option value="Bellaguntha">Bellaguntha</option>
<option value="Bellaguntha">Bellaguntha</option>
<option value="Bellaguntha (NAC)">Bellaguntha (NAC)</option>
<option value="Berhampur (MC)">Berhampur (MC)</option>
<option value="Berhampur (MC)">Berhampur (MC)</option>
<option value="Berhampur (MC)">Berhampur (MC)</option>
<option value="Berhampur (MC)">Berhampur (MC)</option>
<option value="Berhampur (MC)">Berhampur (MC)</option>
<option value="Berhampur (MC)">Berhampur (MC)</option>
<option value="Berhampur (MC)">Berhampur (MC)</option>
<option value="Bhanjanagar">Bhanjanagar</option>
<option value="Bhanjanagar">Bhanjanagar</option>
<option value="Bhanjanagar (NAC)">Bhanjanagar (NAC)</option>
<option value="Bhanjanagar (NAC)">Bhanjanagar (NAC)</option>
<option value="Buguda">Buguda</option>
<option value="Buguda">Buguda</option>
<option value="Buguda">Buguda</option>
<option value="Buguda (NAC)">Buguda (NAC)</option>
<option value="Buguda (NAC)">Buguda (NAC)</option>
<option value="Chatrapur">Chatrapur</option>
<option value="Chatrapur">Chatrapur</option>
<option value="Chatrapur (NAC)">Chatrapur (NAC)</option>
<option value="Chatrapur (NAC)">Chatrapur (NAC)</option>
<option value="Chikiti">Chikiti</option>
<option value="Chikiti">Chikiti</option>
<option value="Chikiti (NAC)">Chikiti (NAC)</option>
<option value="Dharakote">Dharakote</option>
<option value="Dharakote">Dharakote</option>
<option value="Digapahandi">Digapahandi</option>
<option value="Digapahandi">Digapahandi</option>
<option value="Digapahandi">Digapahandi</option>
<option value="Digapahandi">Digapahandi</option>
<option value="Digapahandi">Digapahandi</option>
<option value="Ganjam">Ganjam</option>
<option value="Ganjam">Ganjam</option>
<option value="Ganjam">Ganjam</option>
<option value="Ganjam (NAC)">Ganjam (NAC)</option>
<option value="Gopalapur (NAC)">Gopalapur (NAC)</option>
<option value="Hinjilicut">Hinjilicut</option>
<option value="Hinjilicut">Hinjilicut</option>
<option value="Hinjilicut">Hinjilicut</option>
<option value="Hinjilicut (MPL)">Hinjilicut (MPL)</option>
<option value="Jaganathprasad">Jaganathprasad</option>
<option value="Jaganathprasad">Jaganathprasad</option>
<option value="Jaganathprasad">Jaganathprasad</option>
<option value="Kabisuryanagar">Kabisuryanagar</option>
<option value="Kabisuryanagar">Kabisuryanagar</option>
<option value="Kabisuryanagar (NAC)">Kabisuryanagar (NAC)</option>
<option value="Khallikote">Khallikote</option>
<option value="Khallikote">Khallikote</option>
<option value="Khallikote">Khallikote</option>
<option value="Khallikote (NAC)">Khallikote (NAC)</option>
<option value="Kodala (NAC)">Kodala (NAC)</option>
<option value="Kukudakhandi">Kukudakhandi</option>
<option value="Kukudakhandi">Kukudakhandi</option>
<option value="Patrapur">Patrapur</option>
<option value="Patrapur">Patrapur</option>
<option value="Polasara">Polasara</option>
<option value="Polasara (NAC)">Polasara (NAC)</option>
<option value="Polasara (NAC)">Polasara (NAC)</option>
<option value="Purusotampur">Purusotampur</option>
<option value="Purusotampur (NAC)">Purusotampur (NAC)</option>
<option value="Rambha (NAC)">Rambha (NAC)</option>
<option value="Rangeilunda">Rangeilunda</option>
<option value="Rangeilunda">Rangeilunda</option>
<option value="Sanakhemundi">Sanakhemundi</option>
<option value="Sanakhemundi">Sanakhemundi</option>
<option value="Sanakhemundi">Sanakhemundi</option>
<option value="Sheragada">Sheragada</option>
<option value="Sheragada">Sheragada</option>
<option value="Surada">Surada</option>
<option value="Surada">Surada</option>
<option value="Surada">Surada</option>
<option value="Surada (NAC)">Surada (NAC)</option>
<option value="Balikuda">Balikuda</option>
<option value="Balikuda">Balikuda</option>
<option value="Balikuda">Balikuda</option>
<option value="Balikuda">Balikuda</option>
<option value="Biridi">Biridi</option>
<option value="Biridi">Biridi</option>
<option value="Biridi">Biridi</option>
<option value="Erasama">Erasama</option>
<option value="Erasama">Erasama</option>
<option value="Erasama">Erasama</option>
<option value="Erasama">Erasama</option>
<option value="Erasama">Erasama</option>
<option value="Jagatsinghpur">Jagatsinghpur</option>
<option value="Jagatsinghpur">Jagatsinghpur</option>
<option value="Jagatsinghpur">Jagatsinghpur</option>
<option value="Jagatsinghpur">Jagatsinghpur</option>
<option value="Jagatsinghpur (MPL)">Jagatsinghpur (MPL)</option>
<option value="Kujang">Kujang</option>
<option value="Kujang">Kujang</option>
<option value="Kujang">Kujang</option>
<option value="Kujang">Kujang</option>
<option value="Kujang">Kujang</option>
<option value="Naugaon">Naugaon</option>
<option value="Naugaon">Naugaon</option>
<option value="Naugaon">Naugaon</option>
<option value="Paradeep (MPL)">Paradeep (MPL)</option>
<option value="Raghunathpur">Raghunathpur</option>
<option value="Raghunathpur">Raghunathpur</option>
<option value="Raghunathpur">Raghunathpur</option>
<option value="Raghunathpur">Raghunathpur</option>
<option value="Raghunathpur">Raghunathpur</option>
<option value="Tirtol">Tirtol</option>
<option value="Tirtol">Tirtol</option>
<option value="Tirtol">Tirtol</option>
<option value="Tirtol">Tirtol</option>
<option value="Tirtol">Tirtol</option>
<option value="Barchana">Barchana</option>
<option value="Barchana">Barchana</option>
<option value="Barchana">Barchana</option>
<option value="Barchana">Barchana</option>
<option value="Barchana">Barchana</option>
<option value="Barchana">Barchana</option>
<option value="Barchana">Barchana</option>
<option value="Barchana">Barchana</option>
<option value="Bari">Bari</option>
<option value="Bari">Bari</option>
<option value="Bari">Bari</option>
<option value="Bari">Bari</option>
<option value="Bari">Bari</option>
<option value="Bari">Bari</option>
<option value="Binjharpur">Binjharpur</option>
<option value="Binjharpur">Binjharpur</option>
<option value="Binjharpur">Binjharpur</option>
<option value="Binjharpur">Binjharpur</option>
<option value="Binjharpur">Binjharpur</option>
<option value="Binjharpur">Binjharpur</option>
<option value="Danagadi">Danagadi</option>
<option value="Danagadi">Danagadi</option>
<option value="Dasarathpur">Dasarathpur</option>
<option value="Dasarathpur">Dasarathpur</option>
<option value="Dasarathpur">Dasarathpur</option>
<option value="Dasarathpur">Dasarathpur</option>
<option value="Dasarathpur">Dasarathpur</option>
<option value="Dasarathpur">Dasarathpur</option>
<option value="Dasarathpur">Dasarathpur</option>
<option value="Dasarathpur">Dasarathpur</option>
<option value="Dasarathpur">Dasarathpur</option>
<option value="Dharmasala">Dharmasala</option>
<option value="Dharmasala">Dharmasala</option>
<option value="Dharmasala">Dharmasala</option>
<option value="Dharmasala">Dharmasala</option>
<option value="Dharmasala">Dharmasala</option>
<option value="Dharmasala">Dharmasala</option>
<option value="Jajpur">Jajpur</option>
<option value="Jajpur">Jajpur</option>
<option value="Jajpur">Jajpur</option>
<option value="Jajpur">Jajpur</option>
<option value="Jajpur">Jajpur</option>
<option value="Jajpur (MPL)">Jajpur (MPL)</option>
<option value="Jajpur (MPL)">Jajpur (MPL)</option>
<option value="Korai">Korai</option>
<option value="Korai">Korai</option>
<option value="Korai">Korai</option>
<option value="Korai">Korai</option>
<option value="Korai">Korai</option>
<option value="Rasulpur">Rasulpur</option>
<option value="Rasulpur">Rasulpur</option>
<option value="Rasulpur">Rasulpur</option>
<option value="Rasulpur">Rasulpur</option>
<option value="Sukinda">Sukinda</option>
<option value="Sukinda">Sukinda</option>
<option value="Sukinda">Sukinda</option>
<option value="Sukinda">Sukinda</option>
<option value="Vyasanagar (MPL)">Vyasanagar (MPL)</option>
<option value="Vyasanagar (MPL)">Vyasanagar (MPL)</option>
<option value="Belpahar (MPL)">Belpahar (MPL)</option>
<option value="Brajrajnagar (MPL)">Brajrajnagar (MPL)</option>
<option value="Brajrajnagar (MPL)">Brajrajnagar (MPL)</option>
<option value="Jharsuguda">Jharsuguda</option>
<option value="Jharsuguda">Jharsuguda</option>
<option value="Jharsuguda (MPL)">Jharsuguda (MPL)</option>
<option value="Jharsuguda (MPL)">Jharsuguda (MPL)</option>
<option value="Kirmira">Kirmira</option>
<option value="Kirmira">Kirmira</option>
<option value="Kolabira">Kolabira</option>
<option value="Kolabira">Kolabira</option>
<option value="Kolabira">Kolabira</option>
<option value="Laikera">Laikera</option>
<option value="Laikera">Laikera</option>
<option value="Laikera">Laikera</option>
<option value="Laikera">Laikera</option>
<option value="Lakhanpur">Lakhanpur</option>
<option value="Lakhanpur">Lakhanpur</option>
<option value="Lakhanpur">Lakhanpur</option>
<option value="Bhawanipatna">Bhawanipatna</option>
<option value="Bhawanipatna">Bhawanipatna</option>
<option value="Bhawanipatna">Bhawanipatna</option>
<option value="Bhawanipatna">Bhawanipatna</option>
<option value="Bhawanipatna (MPL)">Bhawanipatna (MPL)</option>
<option value="Bhawanipatna (MPL)">Bhawanipatna (MPL)</option>
<option value="Bhawanipatna (MPL)">Bhawanipatna (MPL)</option>
<option value="Dharamgarh">Dharamgarh</option>
<option value="Dharamgarh">Dharamgarh</option>
<option value="Dharamgarh">Dharamgarh</option>
<option value="Dharamgarh">Dharamgarh</option>
<option value="Golamunda">Golamunda</option>
<option value="Golamunda">Golamunda</option>
<option value="Golamunda">Golamunda</option>
<option value="Jaipatna">Jaipatna</option>
<option value="Jaipatna">Jaipatna</option>
<option value="Junagarh">Junagarh</option>
<option value="Junagarh">Junagarh</option>
<option value="Junagarh">Junagarh</option>
<option value="Junagarh (NAC)">Junagarh (NAC)</option>
<option value="Junagarh (NAC)">Junagarh (NAC)</option>
<option value="Kalampur">Kalampur</option>
<option value="Kalampur">Kalampur</option>
<option value="Karlamunda">Karlamunda</option>
<option value="Karlamunda">Karlamunda</option>
<option value="Kesinga">Kesinga</option>
<option value="Kesinga">Kesinga</option>
<option value="Kesinga">Kesinga</option>
<option value="Kesinga (NAC)">Kesinga (NAC)</option>
<option value="Koksara">Koksara</option>
<option value="Koksara">Koksara</option>
<option value="Lanjigarh">Lanjigarh</option>
<option value="Lanjigarh">Lanjigarh</option>
<option value="M.Rampur">M.Rampur</option>
<option value="Narla">Narla</option>
<option value="Narla">Narla</option>
<option value="Narla">Narla</option>
<option value="Narla">Narla</option>
<option value="Narla">Narla</option>
<option value="Th rampur">Th rampur</option>
<option value="Th rampur">Th rampur</option>
<option value="Th rampur">Th rampur</option>
<option value="Th rampur">Th rampur</option>
<option value="Balliguda">Balliguda</option>
<option value="Balliguda">Balliguda</option>
<option value="Chakapad">Chakapad</option>
<option value="Chakapad">Chakapad</option>
<option value="Chakapad">Chakapad</option>
<option value="Daringibadi">Daringibadi</option>
<option value="Daringibadi">Daringibadi</option>
<option value="G.Udayagiri">G.Udayagiri</option>
<option value="G.Udayagiri (NAC)">G.Udayagiri (NAC)</option>
<option value="G.Udayagiri (NAC)">G.Udayagiri (NAC)</option>
<option value="K.Nuagam">K.Nuagam</option>
<option value="Khajuripada">Khajuripada</option>
<option value="Kotaghar">Kotaghar</option>
<option value="Phiringia">Phiringia</option>
<option value="Phiringia">Phiringia</option>
<option value="Phiringia">Phiringia</option>
<option value="Phulbani (MPL)">Phulbani (MPL)</option>
<option value="Phulbani (MPL)">Phulbani (MPL)</option>
<option value="Raikia">Raikia</option>
<option value="Raikia">Raikia</option>
<option value="Tikabali">Tikabali</option>
<option value="Tumudibandha">Tumudibandha</option>
<option value="Aul">Aul</option>
<option value="Aul">Aul</option>
<option value="Aul">Aul</option>
<option value="Aul">Aul</option>
<option value="Aul">Aul</option>
<option value="Aul">Aul</option>
<option value="Derabish">Derabish</option>
<option value="Derabish">Derabish</option>
<option value="Derabish">Derabish</option>
<option value="Derabish">Derabish</option>
<option value="Garadapur">Garadapur</option>
<option value="Garadapur">Garadapur</option>
<option value="Garadapur">Garadapur</option>
<option value="Garadapur">Garadapur</option>
<option value="Garadapur">Garadapur</option>
<option value="Garadapur">Garadapur</option>
<option value="Kendrapara">Kendrapara</option>
<option value="Kendrapara">Kendrapara</option>
<option value="Kendrapara">Kendrapara</option>
<option value="Kendrapara">Kendrapara</option>
<option value="Kendrapara">Kendrapara</option>
<option value="Kendrapara (MPL)">Kendrapara (MPL)</option>
<option value="Kendrapara (MPL)">Kendrapara (MPL)</option>
<option value="Kendrapara (MPL)">Kendrapara (MPL)</option>
<option value="Mahakalpara">Mahakalpara</option>
<option value="Mahakalpara">Mahakalpara</option>
<option value="Mahakalpara">Mahakalpara</option>
<option value="Mahakalpara">Mahakalpara</option>
<option value="Mahakalpara">Mahakalpara</option>
<option value="Marshaghai">Marshaghai</option>
<option value="Marshaghai">Marshaghai</option>
<option value="Marshaghai">Marshaghai</option>
<option value="Marshaghai">Marshaghai</option>
<option value="Marshaghai">Marshaghai</option>
<option value="Marshaghai">Marshaghai</option>
<option value="Pattamundai">Pattamundai</option>
<option value="Pattamundai">Pattamundai</option>
<option value="Pattamundai">Pattamundai</option>
<option value="Pattamundai">Pattamundai</option>
<option value="Pattamundai (MPL)">Pattamundai (MPL)</option>
<option value="Pattamundai (MPL)">Pattamundai (MPL)</option>
<option value="Rajkanika">Rajkanika</option>
<option value="Rajkanika">Rajkanika</option>
<option value="Rajkanika">Rajkanika</option>
<option value="Rajnagar">Rajnagar</option>
<option value="Rajnagar">Rajnagar</option>
<option value="Rajnagar">Rajnagar</option>
<option value="Rajnagar">Rajnagar</option>
<option value="Anandapur">Anandapur</option>
<option value="Anandapur">Anandapur</option>
<option value="Anandapur">Anandapur</option>
<option value="Anandapur">Anandapur</option>
<option value="Anandapur (MPL)">Anandapur (MPL)</option>
<option value="Anandapur (MPL)">Anandapur (MPL)</option>
<option value="Banspal">Banspal</option>
<option value="Banspal">Banspal</option>
<option value="Banspal">Banspal</option>
<option value="Barbil (MPL)">Barbil (MPL)</option>
<option value="Champua">Champua</option>
<option value="Champua">Champua</option>
<option value="Champua">Champua</option>
<option value="Champua">Champua</option>
<option value="Ghasipura">Ghasipura</option>
<option value="Ghasipura">Ghasipura</option>
<option value="Ghasipura">Ghasipura</option>
<option value="Ghatagaon">Ghatagaon</option>
<option value="Ghatagaon">Ghatagaon</option>
<option value="Ghatagaon">Ghatagaon</option>
<option value="Harichandanpur">Harichandanpur</option>
<option value="Harichandanpur">Harichandanpur</option>
<option value="Harichandanpur">Harichandanpur</option>
<option value="Hatadihi">Hatadihi</option>
<option value="Hatadihi">Hatadihi</option>
<option value="Hatadihi">Hatadihi</option>
<option value="Hatadihi">Hatadihi</option>
<option value="Jhumpura">Jhumpura</option>
<option value="Jhumpura">Jhumpura</option>
<option value="Jhumpura">Jhumpura</option>
<option value="Joda">Joda</option>
<option value="Joda (MPL)">Joda (MPL)</option>
<option value="Keonjhar">Keonjhar</option>
<option value="Keonjhar">Keonjhar</option>
<option value="Keonjhar">Keonjhar</option>
<option value="Keonjhar (MPL)">Keonjhar (MPL)</option>
<option value="Keonjhar (MPL)">Keonjhar (MPL)</option>
<option value="Keonjhar (MPL)">Keonjhar (MPL)</option>
<option value="Keonjhar (MPL)">Keonjhar (MPL)</option>
<option value="Patna">Patna</option>
<option value="Patna">Patna</option>
<option value="Patna">Patna</option>
<option value="Saharapada">Saharapada</option>
<option value="Saharapada">Saharapada</option>
<option value="Saharapada">Saharapada</option>
<option value="Telkoi">Telkoi</option>
<option value="Telkoi">Telkoi</option>
<option value="Telkoi">Telkoi</option>
<option value="Telkoi">Telkoi</option>
<option value="Balianta">Balianta</option>
<option value="Balianta">Balianta</option>
<option value="Balianta">Balianta</option>
<option value="Balipatna">Balipatna</option>
<option value="Balipatna">Balipatna</option>
<option value="Balipatna">Balipatna</option>
<option value="Balugaon (NAC)">Balugaon (NAC)</option>
<option value="Banapur">Banapur</option>
<option value="Banapur">Banapur</option>
<option value="Banapur">Banapur</option>
<option value="Banapur">Banapur</option>
<option value="Banapur (NAC)">Banapur (NAC)</option>
<option value="Begunia">Begunia</option>
<option value="Begunia">Begunia</option>
<option value="Begunia">Begunia</option>
<option value="Begunia">Begunia</option>
<option value="Bhubaneswar">Bhubaneswar</option>
<option value="Bhubaneswar">Bhubaneswar</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bhubaneswar (MC)">Bhubaneswar (MC)</option>
<option value="Bolgarh">Bolgarh</option>
<option value="Bolgarh">Bolgarh</option>
<option value="Bolgarh">Bolgarh</option>
<option value="Bolgarh">Bolgarh</option>
<option value="Chilika">Chilika</option>
<option value="Jatni">Jatni</option>
<option value="Jatni">Jatni</option>
<option value="Jatni">Jatni</option>
<option value="Jatni">Jatni</option>
<option value="Jatni (MPL)">Jatni (MPL)</option>
<option value="Khordha">Khordha</option>
<option value="Khordha">Khordha</option>
<option value="Khordha">Khordha</option>
<option value="Khordha">Khordha</option>
<option value="Khordha (MPL)">Khordha (MPL)</option>
<option value="Khordha (MPL)">Khordha (MPL)</option>
<option value="Tangi">Tangi</option>
<option value="Tangi">Tangi</option>
<option value="Tangi">Tangi</option>
<option value="Tangi">Tangi</option>
<option value="Tangi">Tangi</option>
<option value="Bandhugam">Bandhugam</option>
<option value="Boipariguda">Boipariguda</option>
<option value="Boipariguda">Boipariguda</option>
<option value="Borigumma">Borigumma</option>
<option value="Borigumma">Borigumma</option>
<option value="Dasmantpur">Dasmantpur</option>
<option value="Dasmantpur">Dasmantpur</option>
<option value="Jeypore (MPL)">Jeypore (MPL)</option>
<option value="Jeypore (MPL)">Jeypore (MPL)</option>
<option value="Koraput">Koraput</option>
<option value="Koraput (MPL)">Koraput (MPL)</option>
<option value="Koraput (MPL)">Koraput (MPL)</option>
<option value="Kotpad (NAC)">Kotpad (NAC)</option>
<option value="Kundra">Kundra</option>
<option value="Lamtaput">Lamtaput</option>
<option value="Laxmipur">Laxmipur</option>
<option value="Laxmipur">Laxmipur</option>
<option value="Nandapur">Nandapur</option>
<option value="Nandapur">Nandapur</option>
<option value="Narayanapatna">Narayanapatna</option>
<option value="Pottangi">Pottangi</option>
<option value="Semiliguda">Semiliguda</option>
<option value="Sunabeda (MPL)">Sunabeda (MPL)</option>
<option value="Kalimela">Kalimela</option>
<option value="Kalimela">Kalimela</option>
<option value="Khairput">Khairput</option>
<option value="Korukonda">Korukonda</option>
<option value="Korukonda">Korukonda</option>
<option value="Korukonda">Korukonda</option>
<option value="Kudumulugumma">Kudumulugumma</option>
<option value="Kudumulugumma">Kudumulugumma</option>
<option value="Malkangiri">Malkangiri</option>
<option value="Malkangiri">Malkangiri</option>
<option value="Malkangiri (MPL)">Malkangiri (MPL)</option>
<option value="Malkangiri (MPL)">Malkangiri (MPL)</option>
<option value="Mathili">Mathili</option>
<option value="Mathili">Mathili</option>
<option value="Mathili">Mathili</option>
<option value="Podia">Podia</option>
<option value="Podia">Podia</option>
<option value="Podia">Podia</option>
<option value="Bahalda">Bahalda</option>
<option value="Bahalda">Bahalda</option>
<option value="Bangriposi">Bangriposi</option>
<option value="Bangriposi">Bangriposi</option>
<option value="Bangriposi">Bangriposi</option>
<option value="Barasahi">Barasahi</option>
<option value="Barasahi">Barasahi</option>
<option value="Barasahi">Barasahi</option>
<option value="Baripada">Baripada</option>
<option value="Baripada">Baripada</option>
<option value="Baripada">Baripada</option>
<option value="Baripada">Baripada</option>
<option value="Baripada (MPL)">Baripada (MPL)</option>
<option value="Betnoti">Betnoti</option>
<option value="Betnoti">Betnoti</option>
<option value="Betnoti">Betnoti</option>
<option value="Bijatola">Bijatola</option>
<option value="Bijatola">Bijatola</option>
<option value="Bisoi">Bisoi</option>
<option value="Bisoi">Bisoi</option>
<option value="Gopa Bandhu Nagar">Gopa Bandhu Nagar</option>
<option value="Gopa Bandhu Nagar">Gopa Bandhu Nagar</option>
<option value="Jamda">Jamda</option>
<option value="Jamda">Jamda</option>
<option value="Jashipur">Jashipur</option>
<option value="Jashipur">Jashipur</option>
<option value="Kaptipada">Kaptipada</option>
<option value="Kaptipada">Kaptipada</option>
<option value="Kaptipada">Kaptipada</option>
<option value="Kaptipada">Kaptipada</option>
<option value="Karanjia">Karanjia</option>
<option value="Karanjia">Karanjia</option>
<option value="Karanjia (NAC)">Karanjia (NAC)</option>
<option value="Karanjia (NAC)">Karanjia (NAC)</option>
<option value="Khunta">Khunta</option>
<option value="Khunta">Khunta</option>
<option value="Khunta">Khunta</option>
<option value="Khunta">Khunta</option>
<option value="Kuliana">Kuliana</option>
<option value="Kuliana">Kuliana</option>
<option value="Kusumi">Kusumi</option>
<option value="Kusumi">Kusumi</option>
<option value="Morada">Morada</option>
<option value="Morada">Morada</option>
<option value="Morada">Morada</option>
<option value="Rairangpur">Rairangpur</option>
<option value="Rairangpur">Rairangpur</option>
<option value="Rairangpur (MPL)">Rairangpur (MPL)</option>
<option value="Raruan">Raruan</option>
<option value="Raruan">Raruan</option>
<option value="Raruan">Raruan</option>
<option value="Rasgovindpur">Rasgovindpur</option>
<option value="Rasgovindpur">Rasgovindpur</option>
<option value="Rasgovindpur">Rasgovindpur</option>
<option value="Rasgovindpur">Rasgovindpur</option>
<option value="Samakhunta">Samakhunta</option>
<option value="Samakhunta">Samakhunta</option>
<option value="Samakhunta">Samakhunta</option>
<option value="Saraskana">Saraskana</option>
<option value="Saraskana">Saraskana</option>
<option value="Sukuruli">Sukuruli</option>
<option value="Sukuruli">Sukuruli</option>
<option value="Sukuruli">Sukuruli</option>
<option value="Suliapada">Suliapada</option>
<option value="Suliapada">Suliapada</option>
<option value="Suliapada">Suliapada</option>
<option value="Thakurmunda">Thakurmunda</option>
<option value="Thakurmunda">Thakurmunda</option>
<option value="Tiring">Tiring</option>
<option value="Udala">Udala</option>
<option value="Udala">Udala</option>
<option value="Udala (NAC)">Udala (NAC)</option>
<option value="Udala (NAC)">Udala (NAC)</option>
<option value="Chandahandi">Chandahandi</option>
<option value="Dabugam">Dabugam</option>
<option value="Dabugam">Dabugam</option>
<option value="Jharigam">Jharigam</option>
<option value="Kosagumuda">Kosagumuda</option>
<option value="Kosagumuda">Kosagumuda</option>
<option value="Nabarangpur">Nabarangpur</option>
<option value="Nabarangpur">Nabarangpur</option>
<option value="Nabarangpur (MPL)">Nabarangpur (MPL)</option>
<option value="Nandahandi">Nandahandi</option>
<option value="Papadahandi">Papadahandi</option>
<option value="Papadahandi">Papadahandi</option>
<option value="Raighar">Raighar</option>
<option value="Raighar">Raighar</option>
<option value="Raighar">Raighar</option>
<option value="Tentulikhunti">Tentulikhunti</option>
<option value="Tentulikhunti">Tentulikhunti</option>
<option value="Umerkote">Umerkote</option>
<option value="Umerkote">Umerkote</option>
<option value="Umerkote">Umerkote</option>
<option value="Bhapur">Bhapur</option>
<option value="Bhapur">Bhapur</option>
<option value="Daspalla">Daspalla</option>
<option value="Daspalla">Daspalla</option>
<option value="Daspalla">Daspalla</option>
<option value="Gania">Gania</option>
<option value="Gania">Gania</option>
<option value="Khandapada">Khandapada</option>
<option value="Khandapara (NAC)">Khandapara (NAC)</option>
<option value="Khandapara (NAC)">Khandapara (NAC)</option>
<option value="Nayagarh">Nayagarh</option>
<option value="Nayagarh">Nayagarh</option>
<option value="Nayagarh">Nayagarh</option>
<option value="Nayagarh (NAC)">Nayagarh (NAC)</option>
<option value="Nayagarh (NAC)">Nayagarh (NAC)</option>
<option value="Nuagaon">Nuagaon</option>
<option value="Nuagaon">Nuagaon</option>
<option value="Nuagaon">Nuagaon</option>
<option value="Nuagaon">Nuagaon</option>
<option value="Odagaon">Odagaon</option>
<option value="Odagaon">Odagaon</option>
<option value="Odagaon">Odagaon</option>
<option value="Odagaon">Odagaon</option>
<option value="Ranpur">Ranpur</option>
<option value="Ranpur">Ranpur</option>
<option value="Ranpur">Ranpur</option>
<option value="Ranpur">Ranpur</option>
<option value="Ranpur">Ranpur</option>
<option value="Ranpur">Ranpur</option>
<option value="Boden">Boden</option>
<option value="Boden">Boden</option>
<option value="Boden">Boden</option>
<option value="Khariar">Khariar</option>
<option value="Khariar">Khariar</option>
<option value="Khariar">Khariar</option>
<option value="Khariar">Khariar</option>
<option value="Khariar (NAC)">Khariar (NAC)</option>
<option value="Khariar (NAC)">Khariar (NAC)</option>
<option value="Komna">Komna</option>
<option value="Komna">Komna</option>
<option value="Komna">Komna</option>
<option value="Nuapada">Nuapada</option>
<option value="Nuapada">Nuapada</option>
<option value="Nuapada">Nuapada</option>
<option value="Nuapada">Nuapada</option>
<option value="Sinapali">Sinapali</option>
<option value="Sinapali">Sinapali</option>
<option value="Sinapali">Sinapali</option>
<option value="Astarang">Astarang</option>
<option value="Astarang">Astarang</option>
<option value="Astarang">Astarang</option>
<option value="Brahmagiri">Brahmagiri</option>
<option value="Brahmagiri">Brahmagiri</option>
<option value="Brahmagiri">Brahmagiri</option>
<option value="Brahmagiri">Brahmagiri</option>
<option value="Brahmagiri">Brahmagiri</option>
<option value="Brahmagiri">Brahmagiri</option>
<option value="Delang">Delang</option>
<option value="Delang">Delang</option>
<option value="Delang">Delang</option>
<option value="Delang">Delang</option>
<option value="Gop">Gop</option>
<option value="Gop">Gop</option>
<option value="Gop">Gop</option>
<option value="Gop">Gop</option>
<option value="Kakatpur">Kakatpur</option>
<option value="Kakatpur">Kakatpur</option>
<option value="Kakatpur">Kakatpur</option>
<option value="Kanas">Kanas</option>
<option value="Kanas">Kanas</option>
<option value="Kanas">Kanas</option>
<option value="Konark (NAC)">Konark (NAC)</option>
<option value="Krushnaprasad">Krushnaprasad</option>
<option value="Krushnaprasad">Krushnaprasad</option>
<option value="Krushnaprasad">Krushnaprasad</option>
<option value="Krushnaprasad">Krushnaprasad</option>
<option value="Krushnaprasad">Krushnaprasad</option>
<option value="Nimapara">Nimapara</option>
<option value="Nimapara">Nimapara</option>
<option value="Nimapara">Nimapara</option>
<option value="Nimapara">Nimapara</option>
<option value="Nimapara (NAC)">Nimapara (NAC)</option>
<option value="Nimapara (NAC)">Nimapara (NAC)</option>
<option value="Pipli">Pipli</option>
<option value="Pipli (NAC)">Pipli (NAC)</option>
<option value="Puri (MPL)">Puri (MPL)</option>
<option value="Puri (MPL)">Puri (MPL)</option>
<option value="Puri (MPL)">Puri (MPL)</option>
<option value="Puri (MPL)">Puri (MPL)</option>
<option value="Puri (MPL)">Puri (MPL)</option>
<option value="Puri sadar">Puri sadar</option>
<option value="Puri sadar">Puri sadar</option>
<option value="Puri sadar">Puri sadar</option>
<option value="Satyabadi">Satyabadi</option>
<option value="Bissamcuttack">Bissamcuttack</option>
<option value="Bissamcuttack">Bissamcuttack</option>
<option value="Chandrapur">Chandrapur</option>
<option value="Gudari">Gudari</option>
<option value="Gunupur">Gunupur</option>
<option value="Gunupur">Gunupur</option>
<option value="Gunupur">Gunupur</option>
<option value="Kasipur">Kasipur</option>
<option value="Kasipur">Kasipur</option>
<option value="Kolnara">Kolnara</option>
<option value="Muniguda">Muniguda</option>
<option value="Muniguda">Muniguda</option>
<option value="Padampur">Padampur</option>
<option value="Ramanaguda">Ramanaguda</option>
<option value="Ramanaguda">Ramanaguda</option>
<option value="Rayagada">Rayagada</option>
<option value="Rayagada">Rayagada</option>
<option value="Rayagada (MPL)">Rayagada (MPL)</option>
<option value="Rayagada (MPL)">Rayagada (MPL)</option>
<option value="Bamra">Bamra</option>
<option value="Bamra">Bamra</option>
<option value="Bamra">Bamra</option>
<option value="Bamra">Bamra</option>
<option value="Burla (NAC)">Burla (NAC)</option>
<option value="Dhankauda">Dhankauda</option>
<option value="Dhankauda">Dhankauda</option>
<option value="Dhankauda">Dhankauda</option>
<option value="Dhankauda">Dhankauda</option>
<option value="Dhankauda">Dhankauda</option>
<option value="Hirakud (NAC)">Hirakud (NAC)</option>
<option value="Jamankira">Jamankira</option>
<option value="Jamankira">Jamankira</option>
<option value="Jamankira">Jamankira</option>
<option value="Jujumura">Jujumura</option>
<option value="Jujumura">Jujumura</option>
<option value="Jujumura">Jujumura</option>
<option value="Kuchinda">Kuchinda</option>
<option value="Kuchinda">Kuchinda</option>
<option value="Kuchinda">Kuchinda</option>
<option value="Kuchinda (NAC)">Kuchinda (NAC)</option>
<option value="Kuchinda (NAC)">Kuchinda (NAC)</option>
<option value="Maneswar">Maneswar</option>
<option value="Maneswar">Maneswar</option>
<option value="Maneswar">Maneswar</option>
<option value="Naktideul">Naktideul</option>
<option value="Naktideul">Naktideul</option>
<option value="Naktideul">Naktideul</option>
<option value="Rairakhol">Rairakhol</option>
<option value="Rairakhol">Rairakhol</option>
<option value="Rairakhol (NAC)">Rairakhol (NAC)</option>
<option value="Rairakhol (NAC)">Rairakhol (NAC)</option>
<option value="Rengali">Rengali</option>
<option value="Rengali">Rengali</option>
<option value="Rengali">Rengali</option>
<option value="Rengali">Rengali</option>
<option value="Sambalpur (MC)">Sambalpur (MC)</option>
<option value="Sambalpur (MC)">Sambalpur (MC)</option>
<option value="Sambalpur (MC)">Sambalpur (MC)</option>
<option value="Sambalpur (MC)">Sambalpur (MC)</option>
<option value="Binka">Binka</option>
<option value="Binka">Binka</option>
<option value="Binka (NAC)">Binka (NAC)</option>
<option value="Birmaharajpur">Birmaharajpur</option>
<option value="Birmaharajpur">Birmaharajpur</option>
<option value="Birmaharajpur">Birmaharajpur</option>
<option value="Dunguripali">Dunguripali</option>
<option value="Dunguripali">Dunguripali</option>
<option value="Dunguripali">Dunguripali</option>
<option value="Dunguripali">Dunguripali</option>
<option value="Dunguripali">Dunguripali</option>
<option value="Sonepur">Sonepur</option>
<option value="Sonepur">Sonepur</option>
<option value="Sonepur (MPL)">Sonepur (MPL)</option>
<option value="Sonepur (MPL)">Sonepur (MPL)</option>
<option value="Tarva">Tarva</option>
<option value="Tarva">Tarva</option>
<option value="Tarva (NAC)">Tarva (NAC)</option>
<option value="Ullunda">Ullunda</option>
<option value="Ullunda">Ullunda</option>
<option value="Ullunda">Ullunda</option>
<option value="Balisankara">Balisankara</option>
<option value="Balisankara">Balisankara</option>
<option value="Bargaon">Bargaon</option>
<option value="Bargaon">Bargaon</option>
<option value="Biramitrapur (MPL)">Biramitrapur (MPL)</option>
<option value="Bisra">Bisra</option>
<option value="Bisra">Bisra</option>
<option value="Bisra">Bisra</option>
<option value="Bonai">Bonai</option>
<option value="Bonai">Bonai</option>
<option value="Bonai">Bonai</option>
<option value="Bonai">Bonai</option>
<option value="Gurundia">Gurundia</option>
<option value="Gurundia">Gurundia</option>
<option value="Hemgiri">Hemgiri</option>
<option value="Hemgiri">Hemgiri</option>
<option value="Hemgiri">Hemgiri</option>
<option value="Hemgiri">Hemgiri</option>
<option value="Hemgiri">Hemgiri</option>
<option value="Koira">Koira</option>
<option value="Kutra">Kutra</option>
<option value="Kutra">Kutra</option>
<option value="Kutra">Kutra</option>
<option value="Lahunipara">Lahunipara</option>
<option value="Lahunipara">Lahunipara</option>
<option value="Lathikata">Lathikata</option>
<option value="Lathikata">Lathikata</option>
<option value="Lathikata">Lathikata</option>
<option value="Lephripara">Lephripara</option>
<option value="Lephripara">Lephripara</option>
<option value="Lephripara">Lephripara</option>
<option value="Lephripara">Lephripara</option>
<option value="Nuagaon">Nuagaon</option>
<option value="Nuagaon">Nuagaon</option>
<option value="Nuagaon">Nuagaon</option>
<option value="Rajgangpur">Rajgangpur</option>
<option value="Rajgangpur (MPL)">Rajgangpur (MPL)</option>
<option value="Rourkela (MC)">Rourkela (MC)</option>
<option value="Rourkela (MC)">Rourkela (MC)</option>
<option value="Rourkela (MC)">Rourkela (MC)</option>
<option value="Rourkela (MC)">Rourkela (MC)</option>
<option value="Rourkela (MC)">Rourkela (MC)</option>
<option value="Rourkela (MC)">Rourkela (MC)</option>
<option value="Rourkela (MC)">Rourkela (MC)</option>
<option value="Rourkela (MC)">Rourkela (MC)</option>
<option value="Rourkela (MC)">Rourkela (MC)</option>
<option value="Subdega">Subdega</option>
<option value="Subdega">Subdega</option>
<option value="Sundargarh">Sundargarh</option>
<option value="Sundargarh">Sundargarh</option>
<option value="Sundargarh">Sundargarh</option>
<option value="Sundargarh (MPL)">Sundargarh (MPL)</option>
<option value="Sundargarh (MPL)">Sundargarh (MPL)</option>
<option value="Tangarpali">Tangarpali</option>
<option value="Tangarpali">Tangarpali</option>
<option value="Tangarpalion>">Tangarpalion</option>


              </select>
            </div>
          </div>
          <p style={{marginBottom:"20px"}} className="text-amber-400">
         
         Please upload the PowerPoint presentation (PPT) in the provided {" "}
          <a
  href="https://docs.google.com/presentation/d/1CykuFPt6IVPyDyewRFjyoIDocKcbmEs0/edit?usp=sharing&ouid=116749576180320047820&rtpof=true&sd=true"
  
  style={{ color:"red" }}
  target="_blank"
  rel="noopener noreferrer"
>
  Template 
</a>
{" "}
format only. After uploading your project to Google Drive, click on the "Share" option and generate a shareable link. Copy the link and paste it below.
          </p>
        
          
          <div className="row">
            <div className="field">
              <input value={userData.drive} onChange={handleInputs} type="text" name="drive" id="drive" placeholder="Drive link for idea-template" required />
            </div>
          </div>
          <div className="row">
            <div className="field">   
              <input type="text" value={userData.name} onChange={handleInputs}  id="schoolName" placeholder="School Name" required />
            </div>
           

            </div>
            <div className="field">
  <label style={{ color: "white" }} htmlFor="schoolcode">
    School Code:
  </label>
  <input
    type="text"
    value={userData.schoolCode}
    onChange={handleInputs}
    name="schoolCode"
    id="schoolCode"
    placeholder="Enter School Code"
    required
  />
</div>

          <h3 style={{ color: "white",marginBottom:"10px" }}>Name of coordinator Teacher:</h3>
          <div className="row">
            
            <div className="field">
              <input type="text" value={userData.coordinatorName} onChange={handleInputs} name="coordinatorName" id="coordinatorName" placeholder="Coordinator Name (optional)" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="member1" id="member1" value={userData.member1} onChange={handleInputs} placeholder="Name of member 1 (optional)" />
            </div>
            <div className="field">
              <input type="text" name="member2" id="member2" value={userData.member2} onChange={handleInputs} placeholder="Name of member 2 (optional)" />
            </div>
          </div>
          {/* <div className="row">
            <div className="field">
              <input type="text" name="member3" id="member3" value={userData.member3} onChange={handleInputs} placeholder="Name of member 3 (optional)" />
            </div>
            <div className="field">
              <input type="text" name="member4" id="member4" value={userData.member4} onChange={handleInputs} placeholder="Name of member 4 (optional)" />
            </div>
          </div> */}
          <div className="row">
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" onClick={contactForm} name="signup" id="signup" value="Register Now" />
            </div>
          </div>
          {/* <Link to="/"> 
          <div className="row">
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" name="Home" id="Home" value="Go Back Home" />
            </div>
          </div>
          </Link> */}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
