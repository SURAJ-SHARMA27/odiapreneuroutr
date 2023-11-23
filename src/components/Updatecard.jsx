import '../components/stylecss/teamcard.css';
import React, { useEffect, useState } from "react";

export const UpdateCard = ({ team }) => {
    const {
      name,
      email,
      approvalStatus,
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
    } = team;
    const [isChecked, setIsChecked] = useState(false);


  const handleCheckboxClick = async (event) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    console.log("Checkbox clicked. New value:", newValue);

    try {
        // Make a POST request to the /publishstatus API
        const response = await fetch('/api/publishstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teamName: team.teamName,
                approvalStatus: newValue,
            }),
        });

        if (!response.ok) {
            // Handle the error, for example:
            throw new Error(`Error updating approval status: ${response.status} - ${response.statusText}`);
        }

        console.log("Approval status updated successfully");
    } catch (error) {
        console.error(error.message);
    }
};
    return (
      <div style={{backgroundColor:"black"}} className="team-card">
        <h3  style={{fontSize:"25px",textTransform:"uppercase"}} className='glow_static'>{teamName}</h3>
        <ul style={{fontSize:"18px"}}>
          
          <li>Team Leader Name: {leaderName}</li>
          <li>Team Leader Email: {leaderEmail}</li>
          <li>Approval Status: {approvalStatus ? 'true' : 'false'}</li>

          <li>Topic: {topic}</li>
          <li>District: {district}</li>
          <li>Block: {block}</li>
          <li><a href={drive} target="_blank" rel="noopener noreferrer">
      {drive}
    </a></li>
          <li>School Name: {schoolName}</li>
          <li>School Code: {schoolCode}</li>
          <li>Coordinator Name: {coordinatorName}</li>
          <li>Member 1 Name: {member1}</li>
          <li>Member 2 Name: {member2}</li>
          <li>Update Approval Status:&nbsp;&nbsp;&nbsp;&nbsp;<label className="switch">
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxClick} />
        <span className="slider round"></span>
      </label> </li>
        </ul>
       
      </div>
    );
  };
  