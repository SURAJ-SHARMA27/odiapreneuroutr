import React, { useEffect, useState } from "react";
import { TeamCard } from "./TeamCard";
import '../components/stylecss/Dashboard.css';

const SoDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [userdistrict, setUserdistrict] = useState("");

  const [loading, setLoading] = useState(true);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/api/search_so", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setUserData(data.matchingMessages);
      setUserName(data.rootUser.name);
      setUserdistrict(data.district);
      console.log(data.district);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("Current URL:", window.location.href);
    callAboutPage();
    
  }, []); // Empty dependency array ensures it runs only once when the component mounts


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData.length) {
    return (
      <div>
        <h3 style={{ color: "white", fontSize: "40px", textAlign: "center", margin: "20px" }} className="glow">
          State Officer Name: {userName}
        </h3>
        <h2 style={{ color: "white", fontSize: "30px", textAlign: "center", marginBottom: "20px", marginTop: "40px" }} className="">
          No registrations yet in this district.
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ color: "white", fontSize: "40px", textAlign: "center", margin: "20px" }} className="glow">
        State Officer Name: {userName}
      </h3>
      <h2 style={{ color: "white", fontSize: "30px", textAlign: "center", marginBottom: "20px", marginTop: "40px" }} className="">
        Total Registered Teams in Odisha  : {userData.length}
      </h2>
      <h2 style={{ color: "white", fontSize: "30px", textAlign: "center", marginBottom: "20px", marginTop: "40px" }} className="">
        Registered Teams:
      </h2>
      <table className="table">
        {/* The rest of your table rendering logic */}
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">School Name</th>
            <th scope="col">Team Name</th>
            <th scope="col">Leader Name</th>
            <th scope="col">Leader Email</th>
            <th scope="col">Block Name</th>
            <th scope="col">District</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((row, index) => (
            <tr key={index} style={{ color: 'white' }}>
              <th scope="row">{index + 1}</th>
              <td>{row.schoolName}</td>
              <td>{row.teamName}</td>
              <td>{row.leaderName}</td>
              <td>{row.leaderEmail}</td>
              {/* <td>{row.themeName}</td> */}
              <td>{row.block}</td>
              <td>{row.district}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SoDashboard;
