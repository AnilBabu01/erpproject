import React from "react";
import styles from "./Coaching.module.css";
function Monthly() {
  return (
    <>
      <div className={styles.tablecontainer}>
        <table className={styles.tabletable}>
          <tbody>
            <tr className={styles.tabletr}>
              <th className={styles.tableth}>S.NO</th>
              <th className={styles.tableth}>Session</th>

              <th className={styles.tableth}>Status</th>
            </tr>

            <tr className={styles.tabletr}>
              <td className={styles.tabletd}>1</td>

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

export default Monthly;
