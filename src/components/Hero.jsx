import styles from "../style";
import GetStarted from "./GetStarted";
import { useTypewriter,Cursor } from "react-simple-typewriter";
const Hero = () => {
  const [text]=useTypewriter({
    words:['Directorate of Higher Secondary Education, Odisha','School & Mass Education Department , Government of Odisha'],
    loop:{},
    typeSpeed:120,
    deleteSpeed:80,
  })
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}
     
    >
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 `}>
        <div style={{marginBottom:"50px"}} className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={"/discount.svg"} alt="discount" className="md:w-[32px] md:h-[32px] w-[20px] h-[20px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white md:text-[20px] text-[15px]">Code</span>{' '}<span className="md:text-[20px] text-[15px]">Collaborate</span> {' '}
            <span className="text-white md:text-[20px] text-[15px]">Conquer</span> 
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
  <div className="flex-1 font-poppins font-semibold ss:text-[30px] text-[50px] text-white ss:leading-[60px] leading-[60px]">
    <div className="ss:text-[33px] text-[30px]" style={{ color: "#727272", height: "60px" }}>
      Organized By
    </div>
    <div className="md:text-[35px] text-[28px]  leading-[40px] lg:leading-[50px] overflow-hidden " style={{ height: "200px"}}>
      {text} <Cursor cursorStyle='|' />
    </div>
    <div className="ss:text-[33px] text-[30px] text-lime-400" style={{ color: "#727272", height: "60px", marginTop:"25px" }}>
      In Association With
    </div>
  </div>

  <div className="ss:flex hidden md:mr-4 mr-0">
    <GetStarted />
  </div>
</div>
        
        
        <div className="glow">OUTR Bhubaneswar & OSEPA</div>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          
        </p>
      </div>
     

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={"./robot.png"} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
