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
function CoachingDatebyAttendance({studentid}) {
  const [monthlyAtttendance, setmonthlyAtttendance] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [loader, setloader] = useState(false);
  const getmonthAttendance = () => {
    setloader(true);
    serverInstance("attendanceatudent/GetStudentByDateAttendance", "post", {
      fromdate: fromdate,
      todate: todate,
      studentid:studentid
    }).then((res) => {
      if (res?.status === true) {
        setloader(false);

        setmonthlyAtttendance(res?.data);
      }
      if (res?.status === false) {
        setloader(false);
      }
    });
  };

  return (
    <>
      <div className={styles.maindivsearch}>
        <div className={styles.inputdiv}>
          <label>From Date</label>
          <input
            required
            type="date"
            value={fromdate}
            name="fromdate"
            onChange={(e) => setfromdate(e.target.value)}
          />
        </div>
        <div className={styles.inputdiv}>
          <label>To Date</label>
          <input
            required
            type="date"
            value={todate}
            name="todate"
            onChange={(e) => settodate(e.target.value)}
          />
        </div>
        <button
          onClick={() => getmonthAttendance()}
          className={styles.btnactive}
        >
          Show
        </button>
      </div>

      <div className={styles.tablecontainer}>
        <table className={styles.tabletable}>
          <tbody>
            <tr className={styles.tabletr}>
              <th className={styles.tableth}>Date</th>
              <th className={styles.tableth}>Day</th>
              <th className={styles.tableth}>Status</th>
            </tr>

            {monthlyAtttendance?.length > 0 &&
              monthlyAtttendance?.map((item, index) => {
                return (
                  <tr key={index} className={styles.tabletr}>
                    <td className={styles.tabletd}>
                      {moment(item?.attendancedate).format("DD/MM/YYYY")}
                    </td>
                    <td className={styles.tabletd}>
                      {getDayName(item?.attendancedate)}
                    </td>
                    <td className={styles.tabletd}>
                      {item?.attendaceStatusIntext}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {loader&&<LoadingSpinner/>}
    </>
  );
}

export default CoachingDatebyAttendance;
