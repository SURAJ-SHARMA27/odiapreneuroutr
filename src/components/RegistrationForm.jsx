// RegistrationForm.jsx
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import '../components/stylecss/Registration.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "./RegistrationForm.css"; // Import the CSS file for additional styles

const RegistrationForm = () => {
  const notify = () => toast.success("Team registered Successfully");
  const dontallow = () => toast.error("First Login to authenticate");

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
  schoolName: "",
  schoolCode: "",
  coordinatorName: "",
  member1: "",
  member2: ""
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
      dontallow();
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
      schoolName,
      schoolCode,
      coordinatorName,
      member1,
      member2
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
              <label style={{color:"white"}} htmlFor="topic">Topic:</label>
              <select value={userData.topic} onChange={handleInputs} name="topic" id="topic" required>
                <option value="topic1">select</option>
                <option value="topic2">Topic 2</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="field">
              <label style={{color:"white"}} htmlFor="district">District:</label>
              <select value={userData.district}  onChange={handleInputs} name="district" id="district" required>
                <option value="district1">select</option>
                <option value="district2">District 2</option>
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
