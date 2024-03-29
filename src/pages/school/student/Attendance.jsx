import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { getbatch } from "../../../redux/actions/commanAction";
import {
  MarkStudentAttendance,
  DoneStudentAttendance,
  MonthlyStudentAttendance,
} from "../../../redux/actions/attendanceActions";
import {
  getcourse,
  GetSection,
  GetSession,
} from "../../../redux/actions/commanAction";
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
    name: "March",
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

  3: "March",

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
  const [monthly, setmonthly] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [sectionlist, setsectionlist] = useState([]);
  const [cureentdate, setcureentdate] = useState("");
  const [showmoredetails, setshowmoredetails] = useState(false);
  const [takeatten, settakeatten] = useState(true);
  const [todatatten, settodatatten] = useState(false);
  const [Analysisatten, setAnalysisatten] = useState(false);
  const [sbatch, setsbatch] = useState("");
  const [date, setdate] = useState("");
  const [batchs, setbatchs] = useState([]);
  const [isdata, setisData] = useState([]);
  const [onlyMonthName, setonlyMonthName] = useState("");
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [status, setstatus] = useState("");
  const [classname, setclassname] = useState("");
  const { course } = useSelector((state) => state.getcourse);
  const [courselist, setcourselist] = useState([]);
  const { sections } = useSelector((state) => state.GetSection);
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
    if (sections) {
      setsectionlist(sections);
    }
  }, [
    markattendance,
    batch,
    isdata,
    doneattendance,
    monthlyattendance,
    user,
    course,
    sections,
  ]);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(GetSection());
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

  useEffect(() => {
    var currentDate = new Date();

    var dateNumber = currentDate.getDate();
  }, []);

  const calculateAbsentorPresent = (attendanceArray, status) => {
    let filteredData;

    if (attendanceArray[0]?.monthNumber === Number(new Date().getMonth()) + 1) {
      let slice = attendanceArray?.slice(
        0,
        Number(new Date()?.toISOString().substring(8, 10))
      );

      filteredData = slice?.filter(
        (entry) => entry?.attendaceStatusIntext === status
      );
    } else {
      filteredData = attendanceArray?.filter(
        (entry) => entry?.attendaceStatusIntext === status
      );
    }

    return filteredData?.length;
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
                    value={classname}
                    name="classname"
                    onChange={(e) => {
                      setclassname(e.target.value);
                    }}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Class
                    </option>
                    {courselist?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.coursename}
                        >
                          {item?.coursename}
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
                    value={sectionname}
                    name="sectionname"
                    onChange={(e) => setsectionname(e.target.value)}
                    displayEmpty
                  >
                    <option value={"NONE"}>NONE</option>
                    {sectionlist?.length > 0 &&
                      sectionlist?.map((item, index) => {
                        return (
                          <option key={index} value={item?.section}>
                            {item?.section}
                          </option>
                        );
                      })}
                  </select>
                  <button
                    className={styles.saveattendacebutton}
                    onClick={() => {
                      if (date && classname && sectionname) {
                        dispatch(
                          MarkStudentAttendance(
                            date,
                            sbatch,
                            classname,
                            sectionname
                          )
                        );
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
                    value={classname}
                    name="classname"
                    onChange={(e) => {
                      setclassname(e.target.value);
                    }}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Class
                    </option>
                    {courselist?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.coursename}
                        >
                          {item?.coursename}
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
                    value={sectionname}
                    name="sectionname"
                    onChange={(e) => setsectionname(e.target.value)}
                    displayEmpty
                  >
                    <option value={"NONE"}>NONE</option>
                    {sectionlist?.length > 0 &&
                      sectionlist?.map((item, index) => {
                        return (
                          <option key={index} value={item?.section}>
                            {item?.section}
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
                      if (month && classname) {
                        dispatch(
                          MonthlyStudentAttendance(
                            sbatch,
                            month,
                            "",
                            "",
                            status,
                            classname,
                            sectionname
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
                  setclassname("");
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
                  setclassname("");
                }}
                className={
                  Analysisatten
                    ? styles.searchbtnactive
                    : styles.searchoptiondivbutton
                }
              >
                Analysie Attendance
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
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              {takeatten && (
                <>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth}>Sr.No</th>
                        <th className={styles.tableth}>
                          Roll
                          <br />
                          No
                        </th>
                        <th className={styles.tableth}>Student&lsquo;Name</th>
                        <th className={styles.tableth}>Father&apos;s Name</th>
                        <th className={styles.tableth}>Class</th>

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
            </div>
          </div>
          {Analysisatten && (
            <>
              <div className={styles.moredetails}>
                <input
                  id="showmore"
                  type="checkbox"
                  setshowmoredetails
                  checked={showmoredetails}
                  onChange={(e) => setshowmoredetails(!showmoredetails)}
                />
                <label htmlFor="showmore">Show more details</label>
              </div>
              <div className={styles.add_divmarginn10}>
                <div className={styles.tablecontainer}>
                  {Analysisatten && (
                    <>
                      <table className={styles.tabletable}>
                        <tbody>
                          <tr className={styles.tabletr}>
                            <th className={styles.tableth10}>
                              Roll
                              <br />
                              No
                            </th>
                            <th className={styles.tableth10}>Name</th>
                            {showmoredetails && (
                              <>
                                <th className={styles.tableth10}>
                                  Father&apos;s&lsquo;Name
                                </th>
                                <th className={styles.tableth10}>Class</th>
                                <th className={styles.tableth10}>Month</th>
                                <th className={styles.tableth10}>Absent</th>
                                <th className={styles.tableth10}>Present</th>
                              </>
                            )}

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
                                  {showmoredetails && (
                                    <>
                                      <td className={styles.tabletd}>
                                        {item?.student?.fathersName}
                                      </td>
                                      <td className={styles.tabletd}>
                                        {item?.student?.courseorclass}
                                      </td>
                                      <td className={styles.tabletd}>
                                        {monthnamelist[month?.toString()]}
                                      </td>
                                      <td className={styles.tabletd}>
                                        {calculateAbsentorPresent(
                                          item?.attendance,
                                          "Absent"
                                        )}
                                      </td>
                                      <td className={styles.tabletd}>
                                        {calculateAbsentorPresent(
                                          item?.attendance,
                                          "Present"
                                        )}
                                      </td>
                                    </>
                                  )}

                                  {item?.attendance != null &&
                                    (item?.attendance[0]?.monthNumber ===
                                    Number(new Date().getMonth()) + 1
                                      ? item?.attendance?.slice(
                                          0,
                                          Number(
                                            new Date()
                                              ?.toISOString()
                                              .substring(8, 10)
                                          )
                                        )
                                      : item?.attendance
                                    )?.map((item, index) => {
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
