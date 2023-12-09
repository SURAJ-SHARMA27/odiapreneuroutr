import React, { useEffect, useState } from "react";
import { TeamCard } from "./TeamCard";
import { Link } from "react-router-dom";

const Registeredteams = () => {
  const [userData, setUserData] = useState("");

  const callAboutPage = async () => {
    try {
      // const res = await fetch("/registeredteams", {
      const res = await fetch("/api/registeredteams", {
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
      
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);
  const handleDelete = async (teamId) => {
    try {
      // const res = await fetch(`/registeredteams/${teamId}`, {
      const res = await fetch(`/api/registeredteams/${teamId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      // Refresh the page or update the state to reflect the changes
      callAboutPage();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h3 style={{ color: "white", fontSize: "40px", textAlign: "center", margin: "" }} className="glow">Institution Name: {userData.name}</h3>
      <h2 style={{ color: "white", fontSize: "30px", textAlign: "center", marginBottom: "20px", marginTop: "40px" }} className="">Registered Teams:</h2>
      {userData.messages && userData.messages.length > 0 ? ( 
        <div style={{ display: "flex", flexWrap: "wrap" }} >
          {userData.messages.map((message, index) => (
            <TeamCard key={index} team={message} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>No teams are registered yet.</p>
      )}
      <div style={{textAlign:"center",marginTop:"200px",marginBottom:"50px"}}>   
     
      <Link to="">
      <button
  style={{
    background: 'linear-gradient(200deg, black, black,black, #3ef4b1)',
    color: 'white',
    padding: '10px 20px',
    border: '2px solid #3ef4b1', // Initial border color
    borderRadius: '4px',
    textAlign:'center',
    cursor: 'pointer',
    transition: 'background 0.3s, border-color 0.3s', // Transition for background and border color
  }}
  onMouseOver={(e) => {
    e.target.style.background = 'linear-gradient(100deg,black, black, black,red)'; // Hover background gradient
    e.target.style.borderColor = 'red'; // Hover border color
  }}
  onMouseOut={(e) => {
    e.target.style.background = 'linear-gradient(100deg, black, black, black, black, black, #3ef4b1)'; // Reset background gradient
    e.target.style.borderColor = '#3ef4b1'; // Reset border color
  }}
  title="This button will be enabled after registration closes"
>
  Update Approval Status
</button>
</Link>
<Link to="/">
<button
  style={{
    background: 'linear-gradient(200deg, black, black,black, #3ef4b1)',
    color: 'white',
    padding: '10px 20px',
    border: '2px solid #3ef4b1', // Initial border color
    borderRadius: '4px',
    margin:"20px",
    textAlign:'center',
    cursor: 'pointer',
    transition: 'background 0.3s, border-color 0.3s', // Transition for background and border color
  }}
  onMouseOver={(e) => {
    e.target.style.background = 'linear-gradient(100deg,black, black, black,red)'; // Hover background gradient
    e.target.style.borderColor = 'red'; // Hover border color
  }}
  onMouseOut={(e) => {
    e.target.style.background = 'linear-gradient(100deg, black, black, black, black, black, #3ef4b1)'; // Reset background gradient
    e.target.style.borderColor = '#3ef4b1'; // Reset border color
  }}
>
  Home
</button>
</Link>
</div>
    </div>
  );
};

export default Registeredteams;
