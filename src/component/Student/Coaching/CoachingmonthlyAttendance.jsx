import React, { useEffect, useState } from "react";
import styles from "../Coaching.module.css";
import { serverInstance } from "../../../API/ServerInstance";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import PresentMeter from "../School/PresentMeter";
import AbsentMeter from "../School/AbsentMeter";
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
var monthNames = [
  "January",
  "February",
  "March",

  "April",
  "May",
  "June",

  "July",
  "August",
  "September",

  "October",
  "November",
  "December",
];
const monthnolist = [
  { value: 1 },
  { value: 2 },
  { value: 3 },

  { value: 4 },
  { value: 5 },
  { value: 6 },

  { value: 7 },
  { value: 8 },
  { value: 9 },

  { value: 10 },
  { value: 11 },
  { value: 12 },
];

function calculatePercentage(attendanceArray, monthNumber, status) {
  // Filter the array based on the specified month and status
  let newdate = new Date();
  const filteredData = attendanceArray
    ?.slice(0, Number(newdate.getDate()))
    ?.filter(
      (entry) =>
        entry?.MonthNo === monthNumber &&
        entry?.attendaceStatusIntext === status
    );

  // Calculate the percentage
  const totalEntries = attendanceArray
    ?.slice(0, Number(newdate.getDate()))
    ?.filter(
      (entry) =>
        entry?.MonthNo === monthNumber &&
        entry?.attendaceStatusIntext != "Holiday"
    ).length;

  const percentage = (filteredData?.length / totalEntries) * 100;

  return Math.round(percentage);
}

function CoachingmonthlyAttendance({ studentid }) {
  const [allmonth, setallmonth] = useState("");
  const [loader, setloader] = useState(false);
  const getmonthAttendance = () => {
    setloader(true);
    serverInstance("attendanceatudent/GetStudentAllMonthAttendance", "post", {
      studentid: studentid,
    }).then((res) => {
      if (res?.status === true) {
        setloader(false);
        setallmonth(res?.data);

        console.log("all Month Attendance", res);
      }
      if (res?.status === false) {
        setloader(false);
      }
    });
  };

  useEffect(() => {
    getmonthAttendance();
  }, []);
  return (
    <>
      {/* <div className={styles.mainpercentagediv}>
        <div className={styles.per72} onClick={() => getmonthAttendance()}>
          <p>Percentage Above 70%</p>
        </div>
        <div className={styles.per50}>
          <p>Beetween 50% To 69% </p>
        </div>
        <div className={styles.per49}>
          <p>Percentage Below or Equal 49%</p>
        </div>
      </div> */}
      <div className={styles.add_divmarginn}>
        <div className={styles.tablecontainer}>
          <table className={styles.tabletable}>
            <tbody>
              <tr className={styles.tabletr}>
                <th className={styles.tableth}>Month</th>
                <th className={styles.tableth}>Absent %</th>
                <th className={styles.tableth}>Present %</th>
              </tr>

              {monthnolist?.map((item, index) => {
                return (
                  <tr key={index} className={styles.tabletr}>
                    <td className={styles.tabletd}>
                      {monthNames[item?.value - 1]}
                    </td>
                    <td className={styles.tabletd}>
                      <AbsentMeter
                        percentage={
                          allmonth?.length > 0 &&
                          calculatePercentage(allmonth, item?.value, "Absent")
                        }
                      />
                    </td>
                    <td className={styles.tabletd}>
                      <PresentMeter
                        percentage={
                          allmonth?.length > 0 &&
                          calculatePercentage(allmonth, item?.value, "Present")
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {loader && <LoadingSpinner />}
    </>
  );
}

export default CoachingmonthlyAttendance;
