// app.jsx
import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import Timeline from "./components/Timeline";
import Judges from "./components/Judges";
import GetStarted from "./components/GetStarted";
import RegistrationForm from "./components/RegistrationForm";
import { Route, Routes } from 'react-router-dom';

const App = () => (
  
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
         <Routes>
          <Route path="/aboutus" element={<RegistrationForm />} />
          {/* <Route path="/" element={<GetStarted />} /> */}
          </Routes> 

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <GetStarted/>
        <Timeline/>
        <Judges/>
        <Stats />
        <Business />
        <Billing />
        <CardDeal />
        <Testimonials />
        <Clients />
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
);

export default App;
