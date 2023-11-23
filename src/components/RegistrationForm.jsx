// RegistrationForm.jsx
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import '../components/stylecss/Registration.css';
import toast, { Toaster } from 'react-hot-toast';

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
  member2: ""
  });
  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
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
        schoolName: userData.schoolName,
        schoolCode: userData.schoolCode,
        coordinatorName: userData.coordinatorName,
        member1: userData.member1,
        member2: userData.member2
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
       
      }
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
      member2
    }=userData;
    const res=await fetch('/contact',{
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
        member2
      })
    })
  const data=await res.json();
  if(!data){
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
              {console.log("here is my name"+ userData)}
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
              <input value={userData.block} onChange={handleInputs} type="text" name="block" id="block" placeholder="Block" required />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <input value={userData.block} onChange={handleInputs} type="text" name="drive" id="drive" placeholder="Drive link for idea-template" required />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <input type="text" value={userData.schoolName} onChange={handleInputs} name="schoolName" id="schoolName" placeholder="School Name" required />
            </div>
            <div className="field">
              <input type="text" value={userData.schoolCode} onChange={handleInputs} name="schoolCode" id="schoolCode" placeholder="School Code" required />
            </div>
          </div>
          <h3 style={{ color: "white",marginBottom:"10px" }}>Name of coordinator Teacher:</h3>
          <div className="row">
            
            <div className="field">
              <input type="text" value={userData.coordinatorName} onChange={handleInputs} name="coordinatorName" id="coordinatorName" placeholder="Coordinator Name" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="member1" id="member1" value={userData.member1} onChange={handleInputs} placeholder="Name of member 1" />
            </div>
            <div className="field">
              <input type="text" name="member2" id="member2" value={userData.member2} onChange={handleInputs} placeholder="Name of member 2" />
            </div>
          </div>

          <div className="row">
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" onClick={contactForm} name="signup" id="signup" value="Register Now" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
