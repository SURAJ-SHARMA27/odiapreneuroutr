import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () =>  (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className="glow" style={{fontSize:"3em"}}>
     <span className="ml-10">Judging <span className="ml-10">Criteria</span></span> 
     
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5 ml-10`}>
      Ideathons are events where participants come up with innovative ideas in a specific field or industry. Some potential judging criteria might include:
      </p>

      <a
  href="https://docs.google.com/presentation/d/1CykuFPt6IVPyDyewRFjyoIDocKcbmEs0/edit#slide=id.p1"
  className={`py-4 px-6 mt-10 font-poppins font-medium text-[18px] text-white bg-blue-gradient rounded-[10px] outline-none ${styles} ml-10`}
  style={{ border: "0.1px solid white", textDecoration: "none" }}
  target="_blank"
  rel="noopener noreferrer"
>
  Template
</a>
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;