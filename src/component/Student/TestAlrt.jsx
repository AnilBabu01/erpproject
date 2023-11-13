import React from "react";
import styles from "./Coaching.module.css";
import { useRouter } from "next/router";
function TestAlrt({setopenAlert,starttestdata}) {
  const navigate = useRouter();
  console.log("hdxz",starttestdata)
  return (
    <>
      <div className={styles.bestof}>
        <p>{starttestdata?.msg}</p>
        <div className={styles.startbtndiv}>
          <button
            onClick={() =>setopenAlert(false)}
            className={styles.btnactive}
          >
            OK!
          </button>
        
        </div>
      </div>
    </>
  );
}

export default TestAlrt;
