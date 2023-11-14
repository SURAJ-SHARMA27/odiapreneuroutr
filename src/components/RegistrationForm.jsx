// RegistrationForm.jsx
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import '../components/stylecss/Registration.css';
// import "./RegistrationForm.css"; // Import the CSS file for additional styles

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [userData,setUserData]=useState({});
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
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
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

  return (
    <div className="registration-wrapper">
      <div className="registration-form-inner custom-form">
        <h2 style={{ color: "white", textAlign: "center",fontSize:"30px" }}>Registration Form</h2>
        <form method="GET" id="registration-form" className="signup" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="field">
              <input type="text" name="institutionName" value={userData.name} id="institutionName" placeholder="Institution Name" required />
            </div>
            <div className="field">
              <input type="email" name="institutionEmail" value={userData.email} id="institutionEmail" placeholder="Email Address" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="teamName" id="teamName" placeholder="Team Name" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="leaderName" id="leaderName" placeholder="Name of Leader" required />
            </div>
            <div className="field">
              <input type="email" name="leaderEmail" id="leaderEmail" placeholder="Email id of Leader" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label style={{color:"white"}} htmlFor="topic">Topic:</label>
              <select name="topic" id="topic" required>
                <option value="topic1">select</option>
                <option value="topic2">Topic 2</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="field">
              <label style={{color:"white"}} htmlFor="district">District:</label>
              <select name="district" id="district" required>
                <option value="district1">select</option>
                <option value="district2">District 2</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="block" id="block" placeholder="Block" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="schoolName" id="schoolName" placeholder="School Name" required />
            </div>
            <div className="field">
              <input type="text" name="schoolCode" id="schoolCode" placeholder="School Code" required />
            </div>
          </div>
          <h3 style={{ color: "white",marginBottom:"10px" }}>Name of coordinator Teacher:</h3>
          <div className="row">
            
            <div className="field">
              <input type="text" name="coordinatorName" id="coordinatorName" placeholder="Coordinator Name" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input type="text" name="member1" id="member1" placeholder="Name of member 1" />
            </div>
            <div className="field">
              <input type="text" name="member2" id="member2" placeholder="Name of member 2" />
            </div>
          </div>

          <div className="row">
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" name="signup" id="signup" value="Register Now" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
