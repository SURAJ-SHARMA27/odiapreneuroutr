import React, { useEffect, useState } from "react";
import { TeamCard } from "./TeamCard";

const Registeredteams = () => {
  const [userData, setUserData] = useState("");

  const callAboutPage = async () => {
    try {
      const res = await fetch("/registeredteams", {
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
      navigate("/");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <div>
      <h3 style={{ color: "white", fontSize: "40px", textAlign: "center", margin: "20px" }} className="glow">Institution Name: {userData.name}</h3>
      <h2 style={{ color: "white", fontSize: "30px", textAlign: "center", marginBottom: "20px", marginTop: "40px" }} className="">Registered Teams:</h2>
      {userData.messages && userData.messages.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {userData.messages.map((message, index) => (
            <TeamCard key={index} team={message} />
          ))}
        </div>
      ) : (
        <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>No teams are registered yet.</p>
      )}
    </div>
  );
};

export default Registeredteams;
