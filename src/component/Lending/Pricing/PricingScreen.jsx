import React from "react";
import styles from "./PricingScreen.module.css";
import CardPricing from "./CardPricing";
function PricingScreen() {
  return (
    <div className={styles.mainprincingmain}>
      <p className={styles.mainprincingmainp}>Our Erp Plans</p>
      <div className={styles.mainacrddiv}>
        <CardPricing  planname={"Basic"} amount={500}/>
        <CardPricing  planname={"Advance"} amount={1000}/>
        <CardPricing  planname={"Pro"} amount={1500}/>
      </div>
    </div>
  );
}

export default PricingScreen;
