import { useState } from 'react';
import styles from "../style";
import Button from "./Button";

const CTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div  style={{ color: "white" }}>
      <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
        <div className="flex-1 flex flex-col">
          <h2 className={styles.heading2}>Contact Us</h2>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Event Coordinators <br />
            Prof Ranjan Kumar Pradhan : rkpradhan@outr.ac.in<br />
            Prof Sudhansu S Sahoo : sudhansu@outr.ac.in<br />
            Mail us at: piciic@outr.ac.in
          </p>
        </div>

        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
          <button
            type="button"
            className={`py-4 px-6 font-poppins font-medium text-[18px] text-white bg-blue-gradient rounded-[10px] outline-none ${styles}`}
            onClick={isModalOpen ? closeModal : openModal}
          >
            Helpdesk
          </button>

          {isModalOpen && (
            <div className={`modal wrapper ${isModalOpen ? "blur-background" : ""}`}>
              {/* Your modal content here */}
              <p>If you have any queries or doubts, refer to our YouTube tutorial video for detailed instructions.</p>
              <p>For any further technical-related queries, feel free to email our technical team.</p>
              <p style={{color:"black",fontSize:"1em",fontWeight:"bold"}}>surajrace@gmail.com</p>
              <p  style={{color:"black",fontSize:"1em",fontWeight:"bold"}}>purnendumishra129th@gmail.com</p>
              <p></p>

              <button
  type="button"
  onClick={closeModal}
  className={styles.closeButton}
  style={{
    textAlign: "center",
    // Add any other styles you want inline
    // For example:
    padding: "5px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "5px",
    // Add more styles as needed
  }}
>
  Close
</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CTA;
