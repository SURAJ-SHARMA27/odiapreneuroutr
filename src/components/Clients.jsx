
import styles from "../style";

const Clients = () => (
  <section className={`${styles.flexCenter} my-4`}>
    <div className={`${styles.flexCenter} flex-wrap w-full`}>
     
        <div  className={`flex-1 ${styles.flexCenter} sm:min-w-[192px] min-w-[120px] m-5`}>
          <img src={"./airbnb.png"} alt="client_logo" className="sm:w-[192px] w-[100px] object-contain" />
        </div>
        <div  className={`flex-1 ${styles.flexCenter} sm:min-w-[192px] min-w-[120px] m-5`}>
          <img src={"./binance.png"} alt="client_logo" className="sm:w-[192px] w-[100px] object-contain" />
        </div>
        <div  className={`flex-1 ${styles.flexCenter} sm:min-w-[192px] min-w-[120px] m-5`}>
          <img src={"./dropbox.png"} alt="client_logo" className="sm:w-[192px] w-[100px] object-contain" />
        </div>
     
    </div>
  </section>
);

export default Clients;
