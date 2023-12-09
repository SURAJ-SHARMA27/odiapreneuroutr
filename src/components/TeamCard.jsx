// Updated TeamCard component

import React from 'react';
import '../components/stylecss/teamcard.css';

export const TeamCard = ({ team,onDelete}) => {
  const handleDelete = () => {
    onDelete(team._id); // Assuming the team ID is stored in the _id field
  };
  const {
    teamName,
    leaderName,
    leaderEmail,
    number,
    topic,
    district,
    block,
    drive,
    schoolName,
    schoolCode,
    coordinatorName,
    member1,
    member2,
    member3,
    member4
  } = team;

  return (
    <div className="custom-team-card">
      <h3 style={{fontSize:"21px"}} className='custom-team-title glow_static'>{teamName}</h3>
      <ul className='custom-team-list'>
        <li>Team Leader Name: {leaderName}</li>
        <li>Team Leader Email: {leaderEmail}</li>
        <li>Team Leader Number: {number}</li>
        <li>Topic: {topic}</li>
        <li>District: {district}</li>
        <li>Block: {block}</li>
        <li>Drive: <a href={drive} target="_blank" rel="noopener noreferrer">{drive}</a></li>
        <li>School Name: {schoolName}</li>
        <li>School Code: {schoolCode}</li>
        {coordinatorName && <li>Coordinator Name: {coordinatorName}</li>}
        {member1 && <li>Member 1 Name: {member1}</li>}
        {member2 && <li>Member 2 Name: {member2}</li>}
        {member3 && <li>Member 3 Name: {member3}</li>}
        {member4 && <li>Member 4 Name: {member4}</li>}
       <li> <button style={{color:"red"}} onClick={handleDelete}>Delete Team</button></li>
      
      </ul>
    </div>
  );
};
