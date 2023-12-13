import React from "react";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnercontainer1}>
      <div className={styles.loadingspinner1}>
        <img src="/images/loadergif1.gif" />
      </div>
    </div>
  );
}
