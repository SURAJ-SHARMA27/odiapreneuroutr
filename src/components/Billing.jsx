import styles, { layout } from "../style";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={"/bill.png"} alt="billing" className="w-[120%] h-[120%] " />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={`${styles.heading2} ml-[10px]`}>
        Organizers
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5 ml-[10px]`}>
       Odisha University of Technology And Research is known to be a leading University that fosters knowledge provides transformative education along with the scope for extraordinary research and an enabling environment to create technocrats and innovators equipped to address the challenges of society and industry.<br/>
       The Odisha School Education Programme Authority is responsible for implementing the Samagra Shiksha Abhiyan (SSA), an integral centrally sponsored scheme for school education i.e. pre-primary to higher secondary (+2) level of education. Alongwith universalization of elementary education, some of its key interventions include educational planning, inclusive education, enabling infrastructure for schools, maintaining data and information (MIS), community mobilization, gender and girls education, KGBVs, the school student helpline etc. 
      </p>

     
    </div>
  </section>
);

export default Billing;