import React from "react";
import styles from "./PricingScreen.module.css";
function CardPricing({ planname, amount }) {
  return (
    <div className={styles.maincardpring}>
      <p className={styles.planname}>{planname}</p>
      <p>
        <span className={styles.amounttext}> ₹{amount} </span>
        <span className={styles.monthtext}>/month</span>
      </p>
      <p className={styles.yearlytext}>₹{amount * 3} paid quarterly</p>
      <p className={styles.yearlytext}>or ₹{amount * 12} if paid yearly</p>
      <div className={styles.mainbtndiv}>
        <button className={styles.buybtn}>Buy Now</button>
      </div>
      <div className={styles.mainDisciption}>
        <p>
          Enterprise resource planning (ERP) refers to a type of software that
          organizations use to manage day-to-day business activities such as
          accounting, procurement, project management, risk management and
          compliance, and supply chain operations.
        </p>
      </div>
    </div>
  );
}

export default CardPricing;
