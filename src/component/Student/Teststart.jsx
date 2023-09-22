import React from "react";
import styles from "./Coaching.module.css";
import { useRouter } from "next/router";
function Teststart({ handleCloseupadte }) {
  const navigate = useRouter();
  return (
    <>
      <div className={styles.bestof}>
        <p>Best Of Luck !! </p>
        <div className={styles.startbtndiv}>
          <button
            onClick={() => handleCloseupadte()}
            className={styles.btnactive}
          >
            Back
          </button>
          <button
            className={styles.btnactive}
            onClick={() => navigate.replace("/student/mcqquetions")}
          >
            Start Test
          </button>
        </div>
      </div>
    </>
  );
}

export default Teststart;
