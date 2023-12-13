import React, { useEffect, useState } from "react";
import styles from "./Coaching.module.css";
import { serverInstance } from "../../API/ServerInstance";
import { toast } from "react-toastify";
import moment from "moment";
function TodayAt() {
  const getmonthAttendance = () => [
    serverInstance("attendanceatudent/GetStudentTodayAttendance", "get").then(
      (res) => {
        if (res?.status === true) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          console.log("monthly Attendance", res);
        }
        if (res?.status === false) {
          toast.error(res?.msg, {
            autoClose: 1000,
          });
        }
      }
    ),
  ];

  useEffect(() => {
    getmonthAttendance();
  }, []);
  return (
    <>
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

export default TodayAt;
