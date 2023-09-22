import React, { useState } from "react";
import styles from "./Coaching.module.css";
import TodayTest from "./TodayTest";
import ResultTest from "./ResultTest";
function CoachingTest() {
  const [today, settoday] = useState(true);
  const [monthly, setmonthly] = useState(false);
  const [subject, setsubject] = useState(false);
  const [semester, setsemester] = useState(false);
  const [datewise, setdatewise] = useState(false);
  return (
    <>
      <div className="bottom-chart-left-div">
        <div className="bottom-chart-left-div-inearattdendance">
        
          <div>
            <div>
              <button
                onClick={() => {
                  settoday(true);
                  setmonthly(false);
                  setdatewise(false);
                }}
                className={today ? styles.btnactive : styles.hideactive}
              >
                Today Test
              </button>
              <button
                onClick={() => {
                  settoday(false);
                  setmonthly(true);
                  setdatewise(false);
                }}
                className={monthly ? styles.btnactive : styles.hideactive}
              >
                Result
              </button>
              {/* <button
                onClick={() => {
                  settoday(false);
                  setmonthly(false);
                  setdatewise(true);
                }}
                className={datewise ? styles.btnactive : styles.hideactive}
              >
                Date Wise Attendance
              </button> */}
            </div>

            {/* <div className={styles.mainpercentagediv}>
              <div className={styles.per72}>
                <p>Percentage Above 70%</p>
              </div>
              <div className={styles.per50}>
                <p>Beetween 50% To 69% </p>
              </div>
              <div className={styles.per49}>
                <p>Percentage Below or Equal 49%</p>
              </div>
            </div> */}
            {today && (
              <>
                <TodayTest />
              </>
            )}
            {monthly && (
              <>
                <ResultTest />
              </>
            )}
            {/* {datewise && (
              <>
                <DateWise />
              </>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CoachingTest;
