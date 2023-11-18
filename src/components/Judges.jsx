import React from 'react'
import './Judges.css';
const Judges = () => {
  return (
    <div>
<ul>
  <li className="card" style={{color:"#ececec",background:"#184a7d"}}>
    <div className="icon"><i className="fa-solid fa-house"></i></div>
    <div className="title">What is a hackathon?</div>
    <div className="content">A hackathon is an invention marathon where you can work with people around the globe to build a project related to technology! It isn't about hacking into a system, it's instead about hacking something together and learning a great deal in the process.</div>
  </li> 
  <li className="card" style={{color:"#ececec",backgroundColor:"#2f2f37"}}>
    <div className="icon"><i className="fa-solid fa-gear"></i></div>
    <div className="title">Can we work on old or ongoing project?</div>
    <div className="content">No, you have to start from scratch. You can use open source libraries and frameworks.</div>
  </li>
  <li className="card" style={{color:"#ececec", backgroundColor:"#842C2A"}}>
    <div className="icon"><i className="fa-solid fa-magnifying-glass"></i></div>
    <div className="title">How many members do we need in a team?</div>
    <div className="content"> Submissions must be made as a team with a minimum of 2 members and a maximum of 4 members. Solo submissions are not allowed. </div>
  </li>
  <li className="card" style={{color:"#ececec", backgroundColor:"#032437"}}>
    <div className="icon"><i className="fa-solid fa-circle-star"></i></div>
    <div className="title">When can I start working on my project?</div>
    <div className="content">As soon as the hackathon opens on November 8. To keep the playing field fair, we don’t allow teams to begin building prior to the start of the hackathon. If your project is an upgrade to an existing project, please check with us beforehand.</div>
  </li>
</ul>

    </div>
  )
}

export default Judges