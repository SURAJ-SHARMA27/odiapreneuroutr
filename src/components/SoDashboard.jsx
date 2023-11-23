import React, { useEffect, useState } from "react";
import { TeamCard } from "./TeamCard";
import '../components/stylecss/Dashboard.css';

const SoDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [userdistrict, setUserdistrict] = useState("");

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
    performSearch();
  };

  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
    performSearch();
  };

  const handleInputChange3 = (event) => {
    setInputValue3(event.target.value);
    performSearch();
  };

  const performSearch = () => {
    // Filter the data based on all three input values
      const results = userData.filter(item =>
        item.schoolName.toLowerCase().includes(inputValue1.toLowerCase()) &&
        item.teamName.toLowerCase().includes(inputValue2.toLowerCase()) &&
        item.block.toLowerCase().includes(inputValue3.toLowerCase())
      );
      // console.log(results.length);
      setSearchResults(results);
   
   
  };
  useEffect(() => {
    // console.log("Current URL:", window.location.href);
    performSearch();
  }, [inputValue1,inputValue2,inputValue3]);

  const [loading, setLoading] = useState(true);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/search_so", {
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
<div>
        <input 
          type="text" 
          value={inputValue1} 
          onChange={handleInputChange1} 
          placeholder="Search by School Name"
        />
      </div>

      <div>
        <input 
          type="text" 
          value={inputValue2} 
          onChange={handleInputChange2} 
          placeholder="Search by Team Name"
        />
      </div>

      <div>
        <input 
          type="text" 
          value={inputValue3} 
          onChange={handleInputChange3} 
          placeholder="Search by Block Name"
        />
      </div>


      <h2 style={{ color: "white", fontSize: "30px", textAlign: "center", marginBottom: "20px", marginTop: "40px" }} className="">
        Total Registered Teams in Odisha  : {userData.length}
      </h2>

      <h2 style={{ color: "white", fontSize: "30px", textAlign: "center", marginBottom: "20px", marginTop: "40px" }} className="">
        Registered Teams:
      </h2>
      <table className="table">
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
  {searchResults.length > 0 ? (
    searchResults.map((row, index) => (
      <tr key={index} style={{ color: 'white' }}>
        <th scope="row">{index + 1}</th>
        <td>{row.schoolName}</td>
        <td>{row.teamName}</td>
        <td>{row.leaderName}</td>
        <td>{row.leaderEmail}</td>
        <td>{row.block}</td>
        <td>{row.district}</td>
      </tr>
    ))
  ) : (
    userData.map((row, index) => (
      <tr key={index} style={{ color: 'white' }}>
        <th scope="row">{index + 1}</th>
        <td>{row.schoolName}</td>
        <td>{row.teamName}</td>
        <td>{row.leaderName}</td>
        <td>{row.leaderEmail}</td>
        <td>{row.block}</td>
        <td>{row.district}</td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
  );
};

export default SoDashboard;
