import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={`${styles.heading2} ml-10`}>
        Themes for Hackathon<br className="sm:block hidden"/>
      </h2>
      {/* <p className={`${styles.paragraph} max-w-[470px] mt-5 ml-10`}>
      Agriculture, food tech, and Rural development<br/>
      Healthcare<br/>
      Renewable/Sustainable energy<br/>
      Accessibility, e-Commerce and Cybersecurity<br/>
      Self Help Groups<br/>
      Smart Education<br/>
      Disaster Management<br/>
      Toys and Games<br/>
      Waste Management<br/>
      Miscellaneous

      </p> */}

      <ul className={`${styles.paragraph} max-w-[470px] mt-2 ml-10 marker:text-white list-disc list-inside  `}>
        <li>Agriculture, food tech, and Rural development</li>
        <li>Healthcare</li>
        <li>Renewable/Sustainable energy</li>
        <li>Accessibility, e-Commerce and Cybersecurity</li>
        <li>Self Help Groups</li>
        <li>Disaster Management</li>
        <li>Toys and Games</li>
        <li>Waste Management</li>
        <li>Smart Education</li>
        <li>Miscellaneous</li>
      </ul>

        

      <a
  href="https://drive.google.com/file/d/11onIM1dPmYiAIMYrF-fObNiVR6EgxBM8/view?usp=sharing"
  className={`py-4 px-6 mt-10 font-poppins font-medium text-[18px] text-white bg-blue-gradient rounded-[10px] outline-none ${styles} ml-10`}
  style={{ border: "0.1px solid white", textDecoration: "none" }}
  target="_blank"
  rel="noopener noreferrer"
>
  Brochure
</a>
    </div>

    <div className={layout.sectionImg}>
      <img src={"/card.png"} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;