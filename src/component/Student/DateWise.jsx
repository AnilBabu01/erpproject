import React from "react";
import styles from "./Coaching.module.css";
function DateWise() {
  return (
    <>
      <div className={styles.maindivsearch}>
        <div className={styles.inputdiv}>
          <label>From Date</label>
          <input
            required
            type="date"
            placeholder="Enter the name"
            // value={studentname}
            // name="studentname"
            // onChange={(e) => setstudentname(e.target.value)}
          />
        </div>
        <div className={styles.inputdiv}>
          <label>To Date</label>
          <input
            required
            type="date"
            placeholder="Enter the Phone No"
            // value={studentphone}
            // name="studentphone"
            // onChange={(e) => setstudentphone(e.target.value)}
          />
        </div>
        <button className={styles.btnactive}>Show</button>
      </div>

      <div className={styles.tablecontainer}>
        <table className={styles.tabletable}>
          <tbody>
            <tr className={styles.tabletr}>
              <th className={styles.tableth}>S.NO</th>
              <th className={styles.tableth}>Session</th>
              <th className={styles.tableth}>Time Slot</th>
            
              <th className={styles.tableth}>Status</th>
            </tr>

            <tr className={styles.tabletr}>
              <td className={styles.tabletd}>1</td>
         
              <td className={styles.tabletd}>data</td>
              <td className={styles.tabletd}>data</td>
              <td className={styles.tabletd}>data</td>
            </tr>
            {/* {isdata?.map((item, index) => {
                      return (
                       
                      );
                    })} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DateWise;
