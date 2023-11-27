import React, { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
const Stats = () => {
 

  // You can update these values using setFirstPrizeValue, setSecondPrizeValue, and setThirdPrizeValue
  const [counterOn,setCounterOn]=useState(false);
  return (
    <section style={{ marginTop: "150px" , marginBottom:"200px"}}>
      <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
      <h1 id="timeline_heading" className="glow" style={{ marginBottom: "70px" }}>
        Prizes Worth Rs 10 Lakh!
      </h1>
      
      <h1 id="timeline_heading" className='glow_static' style={{ marginBottom: "70px", marginTop:"70px", fontSize:"2em"}}>
        State level prize
      </h1>
      
      <div className="flex flex-wrap justify-center sm:justify-between m-3">
        <div className="w-full sm:w-1/3 mb-3 sm:mb-0 text-center">
          <h4 className="font-poppins font-semibold  xs:leading-[53.16px] sm:leading-[43.16px] text-white">
            <span style={{fontSize:"50px"}}>₹</span>{counterOn && <CountUp start={0} end={50000} duration={2} delay={0} style={{fontSize:"50px"}}/>}
            <p className="font-poppins font-normal xs:text-[20px] xs:leading-[20px] text-gradient uppercase ml-3 mt-4 ">
              First Prize
            </p>
          </h4>
        </div>

        <div className="w-full sm:w-1/3 mb-3 sm:mb-0 text-center">
          <h4 className="font-poppins font-semibold xs:text-[70.89px] sm:text-[65.89px] xs:leading-[53.16px] sm:leading-[43.16px] text-white" >
          <span style={{fontSize:"50px"}}>₹</span>{counterOn && <CountUp start={0} end={30000} duration={2} delay={0} style={{fontSize:"50px"}}/>}
          <p className="font-poppins font-normal xs:text-[20px] xs:leading-[20px] text-gradient uppercase ml-3 mt-4 ">
              Second Prize
            </p>
          </h4>
        </div>

        <div className="w-full sm:w-1/3 text-center">
          <h4 className="font-poppins font-semibold xs:text-[70.89px] sm:text-[65.89px] xs:leading-[53.16px] sm:leading-[43.16px] text-white" >
          <span style={{fontSize:"50px"}}>₹</span>{counterOn && <CountUp start={0} end={10000} duration={2} delay={0} style={{fontSize:"50px"}}/>}
          <p className="font-poppins font-normal xs:text-[20px] xs:leading-[20px] text-gradient uppercase ml-3 mt-4 ">
              Third Prize
            </p>
          </h4>
        </div>
      </div>
      <h1 id="timeline_heading" className="glow_static" style={{ marginBottom: "70px", fontSize:"2em" }}>
        District level prize
      </h1>
     
      
      <div className="flex flex-wrap justify-center sm:justify-between m-3">
        <div className="w-full sm:w-1/3 mb-3 sm:mb-0 text-center">
          <h4 className="font-poppins font-semibold xs:text-[70.89px] sm:text-[65.89px] xs:leading-[53.16px] sm:leading-[43.16px] text-white">
          <span style={{fontSize:"50px"}}>₹</span>{counterOn && <CountUp start={0} end={15000} duration={2} delay={0} style={{fontSize:"50px"}}/>}
          <p className="font-poppins font-normal xs:text-[20px] xs:leading-[20px] text-gradient uppercase ml-3 mt-4 ">
              First Prize
            </p>
          </h4>
        </div>

        <div className="w-full sm:w-1/3 mb-3 sm:mb-0 text-center">
          <h4 className="font-poppins font-semibold xs:text-[70.89px] sm:text-[65.89px] xs:leading-[53.16px] sm:leading-[43.16px] text-white">
          <span style={{fontSize:"50px"}}>₹</span>{counterOn && <CountUp start={0} end={10000} duration={2} delay={0} style={{fontSize:"50px"}}/>}
          <p className="font-poppins font-normal xs:text-[20px] xs:leading-[20px] text-gradient uppercase ml-3 mt-4 ">
              Second Prize
            </p>
          </h4>
        </div>

        <div className="w-full sm:w-1/3 text-center">
          <h4 className="font-poppins font-semibold xs:text-[70.89px] sm:text-[65.89px] xs:leading-[53.16px] sm:leading-[43.16px] text-white">
          <span style={{fontSize:"50px"}}>₹</span>{counterOn && <CountUp start={0} end={5000} duration={2} delay={0} style={{fontSize:"50px"}}/>}
          <p className="font-poppins font-normal xs:text-[20px] xs:leading-[20px] text-gradient uppercase ml-3 mt-4 ">
              Third Prize
            </p>
          </h4>
        </div>
      </div>
      </ScrollTrigger>
    </section>
  );
};

export default Stats;
