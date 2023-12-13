import React, { useEffect, useState } from "react";
import styles from "../Coaching.module.css";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
function getDayName(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = new Date(date).getDay();
  return days[dayIndex];
}

function SchoolTodayAttendance() {
  const [todaydata, settodaydata] = useState("");
  const [loader, setloader] = useState(false);
  const getmonthAttendance = () => {
    setloader(true);
    serverInstance("attendanceatudent/GetStudentTodayAttendance", "get").then(
      (res) => {
        if (res?.status === true) {
          setloader(false);

          settodaydata(res?.data);
        }
        if (res?.status === false) {
          setloader(false);
        }
      }
    );
  };

  useEffect(() => {
    getmonthAttendance();
  }, []);
  return (
    <>
      <div className={styles.tablecontainer}>
        <table className={styles.tabletable}>
          <tbody>
            <tr className={styles.tabletr}>
              <th className={styles.tableth}>Date</th>
              <th className={styles.tableth}>Day</th>
              <th className={styles.tableth}>Status</th>
            </tr>

            <tr className={styles.tabletr}>
              <td className={styles.tabletd}>
                {moment(todaydata?.attendancedate).format("DD/MM/YYYY")}
              </td>
              <td className={styles.tabletd}>
                {getDayName(todaydata?.attendancedate)}
              </td>
              <td className={styles.tabletd}>
                {todaydata?.attendaceStatusIntext}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {loader && <LoadingSpinner />}
    </>
  );
}

export default SchoolTodayAttendance;
