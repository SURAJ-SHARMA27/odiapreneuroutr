import React, { useEffect, useState } from "react";
import { TeamCard } from "./TeamCard";
import "../components/stylecss/Dashboard.css";

const SoDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [userdistrict, setUserdistrict] = useState("");

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");
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
  const handleInputChange4 = (event) => {
    setInputValue4(event.target.value);
    performSearch();
  };

  const performSearch = () => {
    // Check if all input values are empty
    if (
      (!inputValue1 && !inputValue2 && !inputValue3 && !inputValue4)
    ) {
      // If all inputs are empty, set search results to the original userData
      setSearchResults(userData);
    } else {
      // Filter the data based on all four input values
      const results = userData.filter(
        (item) =>
          item.district.toLowerCase().includes(inputValue1.toLowerCase()) &&
          item.block.toLowerCase().includes(inputValue2.toLowerCase()) &&
          item.schoolName.toLowerCase().includes(inputValue3.toLowerCase()) &&
          item.teamName.toLowerCase().includes(inputValue4.toLowerCase())
      );
      setSearchResults(results);
    }
  };
  useEffect(() => {
    // console.log("Current URL:", window.location.href);
    performSearch();
  }, [inputValue1, inputValue2, inputValue3, inputValue4]);
  //closed commit

  const handleRowClick=(driveValue)=> {
    if (isValidURL(driveValue)) {
      window.open(driveValue, '_blank');
    } else {
      window.alert('Invalid URL: No PPT uploaded');
    }
  }
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const [loading, setLoading] = useState(true);

  const callAboutPage = async () => {
    try {
      // const res = await fetch("/search_so", {
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
      setSearchResults(data.matchingMessages);
      setUserName(data.rootUser.name);
      setUserdistrict(data.district);
      // console.log(data.district);
      // console.log("drive:",data.matchingMessages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("Current URL:", window.location.href);
    callAboutPage();
    performSearch();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData.length) {
    return (
      <div>
        <h3
          style={{
            color: "white",
            fontSize: "40px",
            textAlign: "center",
            margin: "20px",
          }}
          className="glow"
        >
          State Officer Name: {userName}
        </h3>
        <h2
          style={{
            color: "white",
            fontSize: "30px",
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "40px",
          }}
          className=""
        >
          No registrations yet in this district.
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h3
        style={{
          color: "white",
          fontSize: "40px",
          textAlign: "center",
          margin: "20px",
        }}
        className="glow"
      >
        State Officer Name: {userName}
      </h3>
      <h2
        style={{
          color: "white",
          fontSize: "30px",
          textAlign: "center",
          marginBottom: "20px",
          marginTop: "40px",
        }}
        className=""
      >
        Total Registered Teams in Odisha : {userData.length}
      </h2>

      <div class="search-container">
        <div>
          <input
            type="text"
            value={inputValue1}
            onChange={handleInputChange1}
            placeholder="Search by District"
            className="search-input"
          />
        </div>
        <div>
          <input
            type="text"
            value={inputValue2}
            onChange={handleInputChange2}
            placeholder="Search by Block Name"
            className="search-input"
          />
        </div>
        <div>
          <input
            type="text"
            value={inputValue3}
            onChange={handleInputChange3}
            placeholder="Search by School Name"
            className="search-input"
          />
        </div>

        <div>
          <input
            type="text"
            value={inputValue4}
            onChange={handleInputChange4}
            placeholder="Search by Team Name"
            className="search-input"
          />
        </div>
      </div>
      <h2
        style={{
          color: "white",
          fontSize: "30px",
          textAlign: "center",
          marginBottom: "20px",
          marginTop: "40px",
        }}
        className=""
      >
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
      <th scope="col">Leader Number</th>
      <th scope="col">Block Name</th>
      <th scope="col">District</th>
    </tr>
  </thead>
  <tbody>
    {searchResults.length > 0 ? (
      searchResults.map((row, index) => (
        <tr
          key={index}
          style={{ color: "white" }}
          onClick={() => handleRowClick(row.drive)}
        >
          <th scope="row" data-label="No">
            {index + 1}
          </th>
          <td data-label="School Name" style={{wordWrap:'break-word'}}>{row.schoolName}</td>
          <td data-label="Team Name" style={{wordWrap:'break-word'}}>{row.teamName}</td>
          <td data-label="Leader Name" style={{wordWrap:'break-word'}}>{row.leaderName}</td>
          <td data-label="Leader Email" style={{wordWrap:'break-word'}}>{row.leaderEmail}</td>
          <td data-label="Leader Number" style={{wordWrap:'break-word'}}>{row.number}</td>
          <td data-label="Block Name" style={{wordWrap:'break-word'}}>{row.block}</td>
          <td data-label="District" style={{wordWrap:'break-word'}}>{row.district}</td>
        </tr>
      ))
    ) : (
      <tr style={{ color: "white" }}>
        <td colSpan="7">No results found</td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
};

export default SoDashboard;
