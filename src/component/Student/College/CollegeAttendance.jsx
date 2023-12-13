import React, { useState, useEffect } from "react";
import styles from "../Coaching.module.css";
import DateWise from "./CollegeDatebyAttendance";
import Monthly from "./CollegemonthlyAttendance";
import TodayAt from "./CollegeTodayAttendance";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import moment from "moment";
function CollegeAttendance() {
  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState("");
  const [today, settoday] = useState(true);
  const [monthly, setmonthly] = useState(false);
  const [subject, setsubject] = useState(false);
  const [semester, setsemester] = useState(false);
  const [datewise, setdatewise] = useState(false);
  const { user } = useSelector((state) => state.auth);

  console.log("Data is ", userdata?.data?.User);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (user) {
      setuserdata(user);
    }
  }, [user]);

  return (
    <>
      <div className="bottom-chart-left-div">
        <div className="bottom-chart-left-div-inearattdendance">
          <div className={styles.detailsdiv}>
            <h2>Attdendance Details</h2>
            {userdata?.data?.User?.Section === "NONE" ? (
              ""
            ) : (
              <>
                <p>Section&nbsp;&nbsp;{userdata?.data?.User?.Section}</p>
              </>
            )}

            <p>Session&nbsp;&nbsp;{userdata?.data?.User?.Session}</p>
            <p>SNO&nbsp;&nbsp;{userdata?.data?.User?.SrNumber}</p>
            <p>Name &nbsp;&nbsp;{userdata?.data?.User?.name}</p>
            <p>Course &nbsp;&nbsp;{userdata?.data?.User?.courseorclass}</p>
            <p>
              Admission Date &nbsp;&nbsp;
              {moment(userdata?.data?.User?.admissionDate).format("DD/MM/YYYY")}
            </p>
            <p>Roll Number &nbsp;&nbsp;{userdata?.data?.User?.rollnumber}</p>
          </div>
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
                Today Attendance
              </button>
              <button
                onClick={() => {
                  settoday(false);
                  setmonthly(true);
                  setdatewise(false);
                }}
                className={monthly ? styles.btnactive : styles.hideactive}
              >
                Monthly Attendance
              </button>
              <button
                onClick={() => {
                  settoday(false);
                  setmonthly(false);
                  setdatewise(true);
                }}
                className={datewise ? styles.btnactive : styles.hideactive}
              >
                Date Wise Attendance
              </button>
            </div>

            <div className={styles.mainpercentagediv}>
              <div className={styles.per72}>
                <p>Percentage Above 70%</p>
              </div>
              <div className={styles.per50}>
                <p>Beetween 50% To 69% </p>
              </div>
              <div className={styles.per49}>
                <p>Percentage Below or Equal 49%</p>
              </div>
            </div>
            {today && (
              <>
                <TodayAt />
              </>
            )}
            {monthly && (
              <>
                <Monthly />
              </>
            )}
            {datewise && (
              <>
                <DateWise />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CollegeAttendance;
