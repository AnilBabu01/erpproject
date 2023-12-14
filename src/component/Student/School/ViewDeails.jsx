import React, { useState } from "react";
import styles from "@/styles/register.module.css";
import moment from "moment";
function ViewDeails({ setOpen, receiptdata }) {
  return (
    <>
      <div className={styles.divmainlogin10}>
        <h1>Fee Receipt Details</h1>
        <div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Session</label>
              <input type="text" disabled={true} value={receiptdata?.Session} />
            </div>
            <div className={styles.inputdiv}>
              <label>Section</label>
              <input type="text" disabled={true} value={receiptdata?.Section} />
            </div>
            <div className={styles.inputdiv}>
              <label>Class</label>
              <input type="text" disabled={true} value={receiptdata?.Course} />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Receipt Type</label>
              <input type="text" disabled={true} value={receiptdata?.Feetype} />
            </div>
            <div className={styles.inputdiv}>
              <label>Paid Amount</label>
              <input
                type="text"
                disabled={true}
                value={receiptdata?.PaidAmount}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Paid Date</label>
              <input
                disabled={true}
                type="text"
                value={moment(receiptdata?.PaidDate).format("MM/DD/YYYY")}
              />
            </div>
          </div>
          <div className={styles.inputdiv}>
            <label>Pay Mode</label>
            <input type="text" disabled={true} value={receiptdata?.PayOption} />
          </div>
          <div className={styles.logbtnstylediv}>
            <button
              onClick={() => setOpen(false)}
              className={styles.logbtnstyle}
            >
              OK!!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDeails;
