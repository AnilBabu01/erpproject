import React, { useState, useEffect } from "react";
import styles from "./Coaching.module.css";
import TodayTest from "./TodayTest";
import ResultTest from "./ResultTest";
import { useDispatch, useSelector } from "react-redux";
import { getStudenttest } from "../../redux/actions/commanAction";
import { serverInstance } from "../../API/ServerInstance";
function CoachingTest({studentid}) {

  const dispatch = useDispatch();
  const [today, settoday] = useState(true);
  const [monthly, setmonthly] = useState(false);
  const [testdemo, settestdemo] = useState("");
  const [datewise, setdatewise] = useState(false);

  const gettestlist = () => {
    serverInstance("test/getstudentalltest", "post",{
      studentid:studentid
    }).then((res) => {
      if (res?.status) {
        settestdemo(res?.data);
        console.log("res test", res?.data);
      }
    });
  };

  useEffect(() => {
    gettestlist();
  }, []);

  return (
    <>
      <div className="bottom-chart-left-div">
        <div className="bottom-chart-left-div-inearattdendance">
          <div>
            <button
              onClick={() => {
                settoday(true);
                setmonthly(false);
                setdatewise(false);
              }}
              className={today ? styles.btnactive : styles.hideactive}
            >
              Test List
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
          </div>

          {today && (
            <>
              <TodayTest testlist={testdemo}  />
            </>
          )}
          {monthly && (
            <>
              <ResultTest />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CoachingTest;
