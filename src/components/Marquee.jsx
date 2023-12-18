import React, { useRef } from 'react';
import '../components/stylecss/Marquee.css';

const Marquee = () => {
  const marqueeRef = useRef(null);

  const handleMouseOver = () => {
    if (marqueeRef.current) {
      marqueeRef.current.stop();
    }
  };

  const handleMouseOut = () => {
    if (marqueeRef.current) {
      marqueeRef.current.start();
    }
  };

  return (
    <>
      {/* <div className="cont"> */}
        {/* <div className="headertext">Notice</div> */}

        {/* <div>
          <marquee
            ref={marqueeRef}
            style={{ width: "100%", color: "" }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            direction="left"
            behavior="scroll"
            scrollamount="7"
          >
  The registration date has been extended to December 18, 2023.
    |&nbsp;&nbsp;&nbsp; Delete button added at registered teams page; use that if the drive link is not opening upon clicking it and re-register the team
    |&nbsp;&nbsp;&nbsp; Download the {" "} 
    <a
        href="/template.pptx"
        download="template.pptx"
        style={{ border: "0.1px solid white", textDecoration: "none", color: "yellow", marginLeft: "10px" }}
        target="_blank"
        rel="noopener noreferrer"
    >
        Template
    </a> 
    {"  "} from here or from the homepage and fill it with your material. Then upload it to Google Drive and share the link. Drive link should be public, not private; otherwise, it will not be considered.
   
</marquee>

        </div> */}
      {/* </div> */}
    </>
  );
};

export default Marquee;
