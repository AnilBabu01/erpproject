import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import styles from "../../../styles/register.module.css";
import { serverInstance } from "../../../API/ServerInstance";
import LoadingSpinner from "@/component/loader/LoadingSpinner";

function CollegeTimetable() {
  const dispatch = useDispatch();
  const [active, setactive] = useState(true);
  const [loading, setloading] = useState(false);
  const [todayTimeTable, settodayTimeTable] = useState([]);
  const GetTimeTable = () => {
    setloading(true);
    serverInstance("comman/GetStudentTimeTable", "get").then((res) => {
      if (res?.status === true) {
        settodayTimeTable(res?.data);
        setloading(false);
      }
      if (res?.status === false) {
        setloading(false);
      }
    });
  };

  function getDayName() {
    let date = new Date();
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

  const compareMonths = (a, b) => {
    const monthsOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return monthsOrder.indexOf(a?.subject?.dayname) - monthsOrder.indexOf(b?.subject?.dayname);
  };

  const filterdata = (data) => {
    let filterdata = data?.filter((item) => {
      return item?.subject?.dayname === getDayName();
    });

    return filterdata;
  };

  useEffect(() => {
    GetTimeTable();
    dispatch(loadUser());
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div className="middle-chart-main-div">
          <div className="bottom-chart-left-div">
            <div className="bottom-chart-left-div-inear10">
              <button
                onClick={() => {
                  GetTimeTable();
                  setactive(true);
                }}
                className={
                  active === true ? styles.dashActiveBtn : styles.dashDisableBtn
                }
              >
                Today Time Table
              </button>
              <button
                onClick={() => setactive(false)}
                className={
                  active === false
                    ? styles.dashActiveBtn
                    : styles.dashDisableBtn
                }
              >
                Weekly Time Table
              </button>

              {active === true ? (
                <>
                  <p>Today Time Table</p>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth}>Day</th>
                        <th className={styles.tableth}>Subject</th>
                        <th className={styles.tableth}>Class</th>
                        <th className={styles.tableth}>Section</th>
                        <th className={styles.tableth}>Start Time</th>
                        <th className={styles.tableth}>End Time</th>
                        <th className={styles.tableth}>Teacher Name</th>
                        <th className={styles.tableth}>Phone No</th>
                      </tr>
                      {todayTimeTable?.length > 0 &&
                        filterdata(todayTimeTable)?.map((item, index) => {
                          return (
                            <tr key={index} className={styles.tabletr}>
                              <td className={styles.tableth}>
                                {item?.subject?.dayname}
                              </td>
                              <td className={styles.tableth}>
                                {item?.subject?.subject}
                              </td>

                              <td className={styles.tableth}>
                                {item?.classname?.coursename}
                              </td>
                              <td className={styles.tableth}>
                                {item?.subject?.section}
                              </td>
                              <td className={styles.tableth}>
                                {item?.subject?.starttime}
                              </td>
                              <td className={styles.tableth}>
                                {item?.subject?.endtime}
                              </td>
                              <td className={styles.tableth}>
                                {item?.employee?.name}
                              </td>
                              <td className={styles.tableth}>
                                {item?.employee?.phoneno1}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <p>Full Time Table</p>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth}>Day</th>
                        <th className={styles.tableth}>Class</th>
                        <th className={styles.tableth}>Section</th>
                        <th className={styles.tableth}>Start Time</th>
                        <th className={styles.tableth}>End Time</th>
                        <th className={styles.tableth}>Teacher Name</th>
                        <th className={styles.tableth}>Phone No</th>
                      </tr>
                      {todayTimeTable?.length > 0 &&
                        todayTimeTable
                          ?.sort(compareMonths)
                          ?.map((item, index) => {
                            return (
                              <tr key={index} className={styles.tabletr}>
                                <td className={styles.tableth}>
                                  {item?.subject?.dayname}
                                  {console.log("day namnr is", getDayName())}
                                </td>
                                <td className={styles.tableth}>
                                  {item?.classname?.coursename}
                                </td>
                                <td className={styles.tableth}>
                                  {item?.subject?.section}
                                </td>
                                <td className={styles.tableth}>
                                  {item?.subject?.starttime}
                                </td>
                                <td className={styles.tableth}>
                                  {item?.subject?.endtime}
                                </td>
                                <td className={styles.tableth}>
                                  {item?.employee?.name}
                                </td>
                                <td className={styles.tableth}>
                                  {item?.employee?.phoneno1}
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default CollegeTimetable;
