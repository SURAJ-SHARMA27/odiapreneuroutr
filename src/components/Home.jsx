// home.js
import styles from "../style"; // Assuming the style.js file is one level up from the components folder
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from ".";
import Timeline from "./Timeline";
import Judges from "./Judges";
import GetStarted from "./GetStarted";
import RegistrationForm from "./RegistrationForm";
import Image from "./Image"
import Timer from "./Timer";


const Home = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
          <Timer/>
         <Timeline />
        
        <Stats />
        <Judges />
        <Business />
        <Billing />
        <CardDeal />
        <Testimonials />
        <Clients />
        <CTA />
        <Footer /> 
        {/* <Image/> */}
      </div>
    </div>
  </div>
);

export default Home;
