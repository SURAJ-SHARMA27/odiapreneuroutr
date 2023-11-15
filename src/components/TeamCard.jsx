import '../components/stylecss/teamcard.css';
export const TeamCard = ({ team }) => {
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
      member2,
    } = team;
  
    return (
      <div style={{backgroundColor:"black"}} className="team-card">
        <h3  style={{fontSize:"25px",textTransform:"uppercase"}} className='glow_static'>{teamName}</h3>
        <ul style={{fontSize:"18px"}}>
        
          <li>Team Leader Name: {leaderName}</li>
          <li>Team Leader Email: {leaderEmail}</li>
          <li>Topic: {topic}</li>
          <li>District: {district}</li>
          <li>Block: {block}</li>
          <li>School Name: {schoolName}</li>
          <li>School Code: {schoolCode}</li>
          <li>Coordinator Name: {coordinatorName}</li>
          <li>Member 1 Name: {member1}</li>
          <li>Member 2 Name: {member2}</li>
        </ul>
      </div>
    );
  };
  