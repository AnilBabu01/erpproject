import React, { useEffect, useState } from "react";
import styles from "../../Student/Coaching.module.css";
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

function AttendanceStudentlist() {
  const [isData, setisData] = useState("");
  const [loader, setloader] = useState(false);
  const getmonthAttendance = () => {
    setloader(true);
    serverInstance("comman/GetParentStudentList", "get").then((res) => {
      if (res?.status === true) {
        setloader(false);

        setisData(res?.data);
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
      <div className="bottom-chart-left-div10">
        <div className="bottom-chart-left-div-inearattdendance">
          <div className={styles.tablecontainer}>
            <table className={styles.tabletable}>
              <tbody>
                <tr className={styles.tabletr}>
                  <th className={styles.tableth}>Sr.No</th>
                  <th className={styles.tableth}>Session</th>
                  <th className={styles.tableth}>Section</th>
                  <th className={styles.tableth}>SNO</th>
                  <th className={styles.tableth}>Student_Name</th>
                  <th className={styles.tableth}>Student_Class</th>
                  <th className={styles.tableth}>Class_Teacher_Name</th>
                  <th className={styles.tableth}>Class_Teacher_Mobile</th>
                  <th className={styles.tableth}>Action</th>
                </tr>
                {isData?.length > 0 &&
                  isData?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>{item?.Session}</td>
                        <td className={styles.tabletd}>{item?.Section}</td>
                        <td className={styles.tabletd}>{item?.SrNumber}</td>
                        <td className={styles.tabletd}>{item?.name}</td>
                        <td className={styles.tabletd}>
                          {item?.courseorclass}
                        </td>
                        <td className={styles.tabletd}>Anil</td>
                        <td className={styles.tabletd}>7505786956</td>
                        <td className={styles.tabkeddd}>
                          <button>
                            <img
                              className={styles.tabkedddimgactive10}
                              // onClick={() => ClickOpendelete(item?.id)}
                              src="/images/Eye.png"
                              alt="imgss"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {loader && <LoadingSpinner />}
    </>
  );
}

export default AttendanceStudentlist;
