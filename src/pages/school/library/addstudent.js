import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { getbatch, getstudent } from "../../../redux/actions/commanAction";
import {
  MarkStudentAttendance,
  DoneStudentAttendance,
  MonthlyStudentAttendance,
} from "../../../redux/actions/attendanceActions";
import { getcourse } from "../../../redux/actions/commanAction";
import styles from "../employee/employee.module.css";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import UpdateAdmission from "../../../component/Institute/student/UpdateFacility";
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

function Addstudent() {
  const dispatch = useDispatch();
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [takeatten, settakeatten] = useState(true);
  const [todatatten, settodatatten] = useState(false);
  const [Analysisatten, setAnalysisatten] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [sbatch, setsbatch] = useState("");
  const [date, setdate] = useState("");
  const [batchs, setbatchs] = useState([]);
  const [isdata, setisData] = useState([]);
  const [monthly, setmonthly] = useState("");
  const [rollnumber, setrollnumber] = useState("");
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [classname, setclassname] = useState("");
  const [studentlist, setstudentlist] = useState([]);
  const { course } = useSelector((state) => state.getcourse);
  const { loading, student } = useSelector((state) => state.getstudent);
  const [courselist, setcourselist] = useState([]);

  const [minDateTime, setMinDateTime] = useState(
    new Date()?.toISOString().slice(0, 16)
  );
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  const ClickOpenupdate = (data) => {
    setOpenupdate(true);
    setupdatedata(data);
  };

  const handleCloseupadte = () => {
    setOpenupdate(false);
  };

  const ClickOpendelete = (id) => {
    setOpenalert(true);
    setdeleteid(id);
  };
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
    student;
    {
      setstudentlist(student);
    }
  }, [
    markattendance,
    batch,
    isdata,
    doneattendance,
    monthlyattendance,
    user,
    course,
    student,
  ]);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(getstudent("", "", classname, "", "", "", rollnumber, "", "", ""));
  }, [openupdate]);

  const filter = () => {
    dispatch(getstudent("", "", classname, "", "", "", rollnumber, "", "", ""));
  };
  const reset = () => {
    setdate("");
    setsbatch("");
    setrollnumber("");
    dispatch(getstudent("", "", "", "", "", "", "", "", "", ""));
  };

  return (
    <>
      {openupdate && (
        <div>
          <Dialog
            open={openupdate}
            TransitionComponent={Transition}
            onClose={handleCloseupadte}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "21rem",
                },
              },
            }}
          >
            <UpdateAdmission setOpen={setOpenupdate} updatedata={updatedata} />
          </Dialog>
        </div>
      )}
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              {takeatten && (
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

                  <input
                    className={styles.opensearchinput}
                    type="Text"
                    value={rollnumber}
                    name="rollnumber"
                    placeholder="Enter Roll Number"
                    onChange={(e) => {
                      setrollnumber(e.target.value);
                    }}
                  />

                  <button
                    className={styles.saveattendacebutton}
                    onClick={() => {
                      filter();
                    }}
                    disabled={markloading ? true : false}
                  >
                    {markloading ? (
                      <CircularProgress size={17} style={{ color: "red" }} />
                    ) : (
                      "Search"
                    )}
                  </button>

                  <button
                    className={styles.resetattendacebutton}
                    onClick={() => reset()}
                  >
                    Reset
                  </button>
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

          <div className={styles.add_divmarginn10}>
            <div className={styles.tablecontainer}>
              {takeatten && (
                <>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth}>S.NO</th>
                        <th className={styles.tableth}>Roll No</th>
                        <th className={styles.tableth}>Student_Name</th>
                        <th className={styles.tableth}>Student_Email</th>
                        <th className={styles.tableth}>Student_Phone</th>
                        <th className={styles.tableth}>Adminssion_Date</th>
                        <th className={styles.tableth}>Class</th>
                        <th className={styles.tableth}>Student Status</th>
                        <th className={styles.tableth}>Action</th>
                      </tr>
                      {studentlist?.map((item, index) => {
                        return (
                          <tr key={index} className={styles.tabletr}>
                            <td className={styles.tabletd}>{index + 1}</td>
                            <td className={styles.tabletd}>
                              {item?.rollnumber}
                            </td>
                            <td className={styles.tabletd}>{item?.name}</td>
                            <td className={styles.tabletd}>{item?.email}</td>
                            <td className={styles.tabletd}>{item?.phoneno1}</td>
                            <td className={styles.tabletd}>
                              {moment(item?.admissionDate).format("DD/MM/YYYY")}
                            </td>
                            <td className={styles.tabletd}>
                              {item?.courseorclass}
                            </td>

                            <td className={styles.tabletd}>{item?.Status}</td>
                            <td className={styles.tabkeddd}>
                              <button
                                disabled={
                                  userdata?.data &&
                                  userdata?.data?.User?.userType === "school"
                                    ? false
                                    : userdata?.data &&
                                      userdata?.data?.User?.fronroficeEdit ===
                                        true
                                    ? false
                                    : true
                                }
                              >
                                <img
                                  className={
                                    userdata?.data &&
                                    userdata?.data?.User?.userType === "school"
                                      ? styles.tabkedddimgactive
                                      : userdata?.data &&
                                        userdata?.data?.User?.fronroficeEdit ===
                                          true
                                      ? styles.tabkedddimgactive
                                      : styles.tabkedddimgdisable
                                  }
                                  onClick={() => ClickOpenupdate(item)}
                                  src="/images/Edit.png"
                                  alt="imgss"
                                />
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
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Addstudent;
