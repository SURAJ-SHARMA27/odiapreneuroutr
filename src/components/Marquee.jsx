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
      <div className="cont">
        <div className="headertext">Notice</div>

        <div>
          <marquee
            ref={marqueeRef}
            style={{ width: "100%", color: "" }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            direction="left"
            behavior="scroll"
            scrollamount="7"
          >
  Registrations are closed now
  
</marquee>

        </div>
      </div>
    </>
  );
};

export default Marquee;
