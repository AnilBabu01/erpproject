import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { getbatch } from "../../../redux/actions/commanAction";
import {
  MarkStudentAttendance,
  DoneStudentAttendance,
  MonthlyStudentAttendance,
} from "../../../redux/actions/attendanceActions";
import styles from "../employee/employee.module.css";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";

const monthlist = [
  {
    id: 0,
    name: "January",
  },
  {
    id: 1,
    name: "February",
  },
  {
    id: 2,
    name: "Mark",
  },
  {
    id: 3,
    name: "April",
  },
  ,
  {
    id: 4,
    name: "May",
  },
  {
    id: 5,
    name: "Jun",
  },
  {
    id: 6,
    name: "July",
  },
  {
    id: 7,
    name: "August",
  },
  {
    id: 8,
    name: "September",
  },
  {
    id: 9,
    name: "October",
  },
  {
    id: 10,
    name: "November",
  },
  {
    id: 11,
    name: "December",
  },
];
function attendance() {
  const dispatch = useDispatch();
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [takeatten, settakeatten] = useState(true);
  const [todatatten, settodatatten] = useState(false);
  const [Analysisatten, setAnalysisatten] = useState(false);
  const [sbatch, setsbatch] = useState("");
  const [date, setdate] = useState("");
  const [batchs, setbatchs] = useState([]);
  const [isdata, setisData] = useState([]);
  const [monthly, setmonthly] = useState("");
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [attendancedetails, setattendancedetails] = useState([
    {
      id: "",
      userId: "",
      parentId: "",
      studentid: "",
      fathersName: "",
      MathersName: "",
      fathersPhoneNo: "",
      name: "",
      email: "",
      courseorclass: "",
      batch: "",
      rollnumber: "",
      institutename: "",
      attendaceStatus: "",
      attendancedate: "",
    },
  ]);

  const { Markloading, markattendance } = useSelector(
    (state) => state.markatten
  );
  const { doneloading, doneattendance } = useSelector(
    (state) => state.doneatten
  );
  const { monthlyloading, monthlyattendance } = useSelector(
    (state) => state.monthlyatten
  );
  const { batch } = useSelector((state) => state.getbatch);

  console.log("data is ", monthly && monthly[0]?.days);

  useEffect(() => {
    if (markattendance) {
      setisData(markattendance);
      setattendancedetails(markattendance);
    }
    if (doneattendance) {
      setattendancedetails(doneattendance);
      dispatch(MarkStudentAttendance(date, sbatch));
    }
    if (batch) {
      setbatchs(batch);
    }
    if (monthlyattendance) {
      setmonthly(monthlyattendance);
    }
    if (user) {
      setuserdata(user);
    }
  }, [markattendance, batch, isdata, doneattendance, monthlyattendance,user]);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
  }, []);

  function handleItemUpdate(originalItem, key, value) {
    setattendancedetails(
      attendancedetails.map((Item) =>
        Item.id === originalItem.id
          ? {
              ...Item,
              [key]: value,
            }
          : Item
      )
    );
  }

  const reset = () => {
    setdate("");
    setsbatch("");
    setattendancedetails("");
  };

  const saveAttendance = () => {
    dispatch(DoneStudentAttendance(attendancedetails));
  };
  return (
    <>
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              {takeatten && (
                <>
                  <label>Date</label>
                  <input
                    className={styles.opensearchinput}
                    type="date"
                    value={date}
                    name="date"
                    onChange={(e) => {
                      setdate(e.target.value);
                      console.log(e.target.value);
                    }}
                  />

                  <select
                    className={styles.opensearchinput}
                    sx={{
                      width: "18.8rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={sbatch}
                    name="sbatch"
                    onChange={(e) => {
                      setsbatch(e.target.value);
                      if (date) {
                        dispatch(MarkStudentAttendance(date, e.target.value));
                      }
                    }}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Please Select Batch
                    </option>
                    {batchs?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={`${item?.StartingTime} TO ${item?.EndingTime}`}
                        >
                          {item?.StartingTime} TO {item?.EndingTime}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    className={styles.saveattendacebutton}
                    onClick={() => saveAttendance()}
                  >
                    Save
                  </button>
                  <button
                    className={styles.resetattendacebutton}
                    onClick={() => reset()}
                  >
                    Reset
                  </button>
                </>
              )}
              {todatatten && (
                <>
                  <select
                    className={styles.opensearchinput}
                    sx={{
                      width: "18.8rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={sbatch}
                    name="sbatch"
                    onChange={(e) => {
                      setsbatch(e.target.value);
                      dispatch(
                        MarkStudentAttendance(
                          new Date().toISOString().substring(0, 10),
                          e.target.value
                        )
                      );
                    }}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Batch
                    </option>
                    {batchs?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={`${item?.StartingTime} TO ${item?.EndingTime}`}
                        >
                          {item?.StartingTime} TO {item?.EndingTime}
                        </option>
                      );
                    })}
                  </select>
                </>
              )}
              {Analysisatten && (
                <>
                  <select
                    className={styles.opensearchinput}
                    sx={{
                      width: "18.8rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={sbatch}
                    name="sbatch"
                    onChange={(e) => {
                      setsbatch(e.target.value);
                      if (month) {
                        dispatch(
                          MonthlyStudentAttendance(e.target.value, month)
                        );
                      }
                    }}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Please Select Batch
                    </option>
                    {batchs?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={`${item?.StartingTime} TO ${item?.EndingTime}`}
                        >
                          {item?.StartingTime} TO {item?.EndingTime}
                        </option>
                      );
                    })}
                  </select>

                  <select
                    className={styles.opensearchinput}
                    sx={{
                      width: "18.8rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={month}
                    name="month"
                    onChange={(e) => {
                      setmonth(e.target.value);
                    }}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Month
                    </option>
                    {monthlist?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.id}
                        >
                          {item?.name}
                        </option>
                      );
                    })}
                  </select>
                  {/* <button
                    className={styles.resetattendacebutton}
                    onClick={() => reset()}
                  >
                    Reset
                  </button> */}
                </>
              )}
              <button
                className={
                  takeatten
                    ? styles.searchbtnactive
                    : styles.searchoptiondivbutton
                }
                onClick={() => {
                  settakeatten(true);
                  settodatatten(false);
                  setAnalysisatten(false);
                  setattendancedetails("");
                  setsbatch("");
                }}
              >
                Take Attendance
              </button>
              <button
                onClick={() => {
                  settakeatten(false);
                  settodatatten(true);
                  setAnalysisatten(false);
                  setattendancedetails("");
                  setsbatch("");
                }}
                className={
                  todatatten
                    ? styles.searchbtnactive
                    : styles.searchoptiondivbutton
                }
              >
                Today Attendance
              </button>
              <button
                onClick={() => {
                  settakeatten(false);
                  settodatatten(false);
                  setAnalysisatten(true);
                  setattendancedetails("");
                  setsbatch("");
                }}
                className={
                  Analysisatten
                    ? styles.searchbtnactive
                    : styles.searchoptiondivbutton
                }
              >
                Analysis Attendance
              </button>
            </div>
            <div className={styles.imgdivformat}>
              <img
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />
              <img
                className={styles.imgdivformatimg}
                src="/images/ExportPdf.png"
                alt="img"
              />
              <img src="/images/ExportExcel.png" alt="img" />
            </div>
          </div>

          <div className={styles.add_divmarginn10}>
            <div className={styles.tablecontainer}>
              {takeatten && (
                <>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth}>S.NO</th>
                        <th className={styles.tableth}>Roll_No</th>
                        <th className={styles.tableth}>Student_Name</th>
                        <th className={styles.tableth}>Father's_Name</th>
                        <th className={styles.tableth}>Course</th>

                        <th className={styles.tableth}>Status</th>
                      </tr>
                      {attendancedetails &&
                        attendancedetails[0]?.rollnumber != "" &&
                        attendancedetails?.map((item, index) => {
                          return (
                            <tr className={styles.tabletr} key={index}>
                              <td className={styles.tabletd}>{index + 1}</td>

                              <td className={styles.tabletd}>
                                {item?.rollnumber}
                              </td>
                              <td className={styles.tabletd}>{item?.name}</td>

                              <td className={styles.tabletd}>
                                {item?.fathersName}
                              </td>

                              <td className={styles.tabletd}>
                                {item?.courseorclass}
                              </td>

                              <td className={styles.tabletdnew}>
                                <button
                                  className={
                                    item?.attendaceStatus === true
                                      ? styles.pbtnselected
                                      : styles.pbtn
                                  }
                                  onClick={() => {
                                    handleItemUpdate(
                                      item,
                                      "attendaceStatus",
                                      true
                                    );
                                  }}
                                >
                                  Present
                                </button>
                                <button
                                  className={
                                    item?.attendaceStatus === false
                                      ? styles.abtnselected
                                      : styles.abtn
                                  }
                                  onClick={() => {
                                    handleItemUpdate(
                                      item,
                                      "attendaceStatus",
                                      false
                                    );
                                  }}
                                >
                                  Absent
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </>
              )}
              {todatatten && (
                <>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth}>S.NO</th>

                        <th className={styles.tableth}>Roll_No</th>
                        <th className={styles.tableth}>Student_Name</th>
                        <th className={styles.tableth}>Father's_Name</th>
                        <th className={styles.tableth}>Course</th>

                        <th className={styles.tableth}>Status</th>
                      </tr>
                      {attendancedetails &&
                        attendancedetails[0]?.rollnumber != "" &&
                        attendancedetails?.map((item, index) => {
                          return (
                            <tr className={styles.tabletr} key={index}>
                              <td className={styles.tabletd}>{index + 1}</td>

                              <td className={styles.tabletd}>
                                {item?.rollnumber}
                              </td>
                              <td className={styles.tabletd}>{item?.name}</td>

                              <td className={styles.tabletd}>
                                {item?.fathersName}
                              </td>

                              <td className={styles.tabletd}>
                                {item?.courseorclass}
                              </td>

                              <td className={styles.tabletdnew}>
                                <button
                                  className={
                                    item?.attendaceStatus === true
                                      ? styles.pbtnselected
                                      : styles.abtnselected
                                  }
                                >
                                  {item?.attendaceStatus === true ? "P" : "A"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </>
              )}
              {Analysisatten && (
                <>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth10}>Roll_Number</th>
                        <th className={styles.tableth10}>Name</th>
                        <th className={styles.tableth10}>Father's_Name</th>
                        <th className={styles.tableth10}>Class_Batch</th>
                        <th className={styles.tableth10}>Days</th>
                        {monthly[0]?.days?.map((item, index) => {
                          return (
                            <th key={index} className={styles.tableth}>
                              {item}
                            </th>
                          );
                        })}
                      </tr>
                      {monthly &&
                        monthly?.map((item, index) => {
                          return (
                            <tr className={styles.tabletr} key={index}>
                              <td className={styles.tabletd}>
                                {item?.student?.rollnumber}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.student?.name}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.student?.fathersName}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.student?.batch}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.fathersName}
                              </td>

                              {item?.attendance != null &&
                                item?.attendance?.map((item, index) => {
                                  return (
                                    <td className={styles.tabletd}>
                                      <button
                                        className={
                                          item?.attendaceStatus === 1
                                            ? styles.presentbtn
                                            : styles.absentbtn
                                        }
                                      >
                                        {item?.attendaceStatus === 1
                                          ? "P"
                                          : "A"}
                                      </button>
                                    </td>
                                  );
                                })}
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
      {monthlyloading || doneloading || (Markloading && <LoadingSpinner />)}
    </>
  );
}

export default attendance;
