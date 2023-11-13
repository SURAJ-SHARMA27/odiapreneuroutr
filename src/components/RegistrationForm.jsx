import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

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
    <div className="wrapper">
      <div className="form-inner">
        <h2 style={{ color: "white" }}>Registration Form</h2>
        <form method="GET" id="registration-form" className="signup" onSubmit={handleFormSubmit}>
          <div className="field">
            <input type="text" name="institutionName" id="institutionName" placeholder="Institution Name" required />
          </div>

          <div className="field">
            <input type="email" name="institutionEmail" id="institutionEmail" placeholder="Email Address" required />
          </div>

          <div className="field">
            <input type="text" name="teamName" id="teamName" placeholder="Team Name" required />
          </div>

          <div className="field">
            <input type="text" name="leaderName" id="leaderName" placeholder="Name of Leader" required />
          </div>

          <div className="field">
            <input type="email" name="leaderEmail" id="leaderEmail" placeholder="Email id of Leader" required />
          </div>

          {/* Dropdown for Topic */}
          <div className="field">
            <label htmlFor="topic">Topic:</label>
            {/* Replace the select options with your actual options */}
            <select name="topic" id="topic" required>
              <option value="topic1">Topic 1</option>
              <option value="topic2">Topic 2</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Dropdown for District */}
          <div className="field">
            <label htmlFor="district">District:</label>
            {/* Replace the select options with your actual options */}
            <select name="district" id="district" required>
              <option value="district1">District 1</option>
              <option value="district2">District 2</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="field">
            <input type="text" name="block" id="block" placeholder="Block" required />
          </div>

          <div className="field">
            <input type="text" name="schoolName" id="schoolName" placeholder="School Name" required />
          </div>

          <div className="field">
            <input type="text" name="schoolCode" id="schoolCode" placeholder="School Code" required />
          </div>

          <div className="field">
            <input type="text" name="coordinatorName" id="coordinatorName" placeholder="Name of coordinator Teacher" required />
          </div>

          <div className="field">
            <input type="text" name="member1" id="member1" placeholder="Name of member 1" />
          </div>

          <div className="field">
            <input type="text" name="member2" id="member2" placeholder="Name of member 2" />
          </div>

          <div className="field btn">
            <div className="btn-layer"></div>
            <input type="submit" name="signup" id="signup" value="SignUp" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
