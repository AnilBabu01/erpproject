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
import CircularProgress from "@mui/material/CircularProgress";

const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];
const monthlist = [
  {
    id: 1,
    name: "January",
  },
  {
    id: 2,
    name: "February",
  },
  {
    id: 3,
    name: "Mark",
  },
  {
    id: 4,
    name: "April",
  },
  ,
  {
    id: 5,
    name: "May",
  },
  {
    id: 6,
    name: "Jun",
  },
  {
    id: 7,
    name: "July",
  },
  {
    id: 8,
    name: "August",
  },
  {
    id: 8,
    name: "September",
  },
  {
    id: 10,
    name: "October",
  },
  {
    id: 11,
    name: "November",
  },
  {
    id: 12,
    name: "December",
  },
];

const monthnamelist = {
  1: "January",

  2: "February",

  3: "Mark",

  4: "April",

  5: "May",

  6: "Jun",

  7: "July",

  8: "August",

  9: "September",

  10: "October",

  11: "November",

  12: "December",
};

function Attendance() {
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
  const [onlyMonthName, setonlyMonthName] = useState("");
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [status, setstatus] = useState("");
  const { course } = useSelector((state) => state.getcourse);
  const [courselist, setcourselist] = useState([]);
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
  const [minDateTime, setMinDateTime] = useState(
    new Date()?.toISOString().slice(0, 16)
  );

  console.log("date is date ", minDateTime);
  const {
    Markloading,
    markattendance,
    loading: markloading,
  } = useSelector((state) => state.markatten);
  const { doneloading, doneattendance } = useSelector(
    (state) => state.doneatten
  );
  const { monthlyloading, monthlyattendance } = useSelector(
    (state) => state.monthlyatten
  );
  const { batch } = useSelector((state) => state.getbatch);

  console.log("month name", monthnamelist[month?.toString()]);

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
    if (course) {
      setcourselist(course);
    }
  }, [
    markattendance,
    batch,
    isdata,
    doneattendance,
    monthlyattendance,
    user,
    course,
  ]);

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

  const endno = (date) => {
    let end = new Date(date).getDate();
    return end - 1;
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
                    min={minDateTime}
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
                    onClick={() => {
                      if (date && sbatch) {
                        dispatch(MarkStudentAttendance(date, sbatch));
                      }
                    }}
                    disabled={markloading ? true : false}
                  >
                    {markloading ? (
                      <CircularProgress size={17} style={{ color: "red" }} />
                    ) : (
                      "Mark Attendance"
                    )}
                  </button>
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
                    value={status}
                    name="status"
                    onChange={(e) => setstatus(e.target.value)}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      ALL Status
                    </option>

                    {studentStatus?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.value}
                        >
                          {item?.value}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    className={styles.saveattendacebutton}
                    onClick={() => {
                      if (month && sbatch) {
                        dispatch(
                          MonthlyStudentAttendance(
                            sbatch,
                            month,
                            "",
                            "",
                            status
                          )
                        );
                      }
                    }}
                  >
                    Show result
                  </button>
                  {/* <button
                    className={styles.resetattendacebutton}
                    onClick={() => {
                      setsbatch('')
                      dispatch(MonthlyStudentAttendance());
                    }}
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
              {Analysisatten && (
                <>
                  <div className={styles.saveattendacebutton}>Present</div>
                  <div className={styles.resetattendacebutton}>Absent</div>
                  <div className={styles.holidaybutton}>Holiday</div>
                </>
              )}
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

          {takeatten && (
            <>
              <div className={styles.add_divmarginn}>
                <div className={styles.tablecontainer}>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth}>S.NO</th>
                        <th className={styles.tableth}>Roll&lsquo;No</th>
                        <th className={styles.tableth}>Student&lsquo;Name</th>
                        <th className={styles.tableth}>Father&apos;s Name</th>
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
                </div>
              </div>
            </>
          )}
          {Analysisatten && (
            <>
              <div className={styles.add_divmarginn10}>
                <div className={styles.tablecontainer}>
                  {Analysisatten && (
                    <>
                      <table className={styles.tabletable}>
                        <tbody>
                          <tr className={styles.tabletr}>
                            <th className={styles.tableth10}>Roll_Number</th>
                            <th className={styles.tableth10}>Name</th>
                            <th className={styles.tableth10}>
                              Father&apos;s&lsquo;Name
                            </th>
                            <th className={styles.tableth10}>
                              Class&lsquo;Batch
                            </th>
                            <th className={styles.tableth10}>Month</th>
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
                                    {monthnamelist[month?.toString()]}
                                  </td>

                                  {item?.attendance != null &&
                                    item?.attendance
                                      ?.slice(
                                        0,
                                        Number(
                                          new Date()
                                            ?.toISOString()
                                            .substring(8, 10)
                                        )
                                      )
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tabletd}
                                          >
                                            <button
                                              className={
                                                item?.attendaceStatus ===
                                                "Present"
                                                  ? styles.presentbtn
                                                  : item?.attendaceStatusIntext ===
                                                    "Absent"
                                                  ? styles.absentbtn
                                                  : styles.holdaybtn
                                              }
                                            >
                                              {item?.attendaceStatusIntext ===
                                                "Present" && <>P</>}
                                              {item?.attendaceStatusIntext ===
                                                "Absent" && <>A</>}
                                              {item?.attendaceStatusIntext ===
                                                "Holiday" && <>H</>}
                                              {item?.attendaceStatusIntext ===
                                                "Unknown" && <>L</>}
                                              {item?.attendaceStatusIntext ===
                                                "Left In Middle" && <>L</>}
                                              {item?.attendaceStatusIntext ===
                                                "On Leave" && <>L</>}
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
            </>
          )}
        </div>
      </div>
      {monthlyloading || doneloading || (Markloading && <LoadingSpinner />)}
    </>
  );
}

export default Attendance;
