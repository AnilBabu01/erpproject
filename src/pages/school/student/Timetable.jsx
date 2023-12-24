import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getcourse,
  getbatch,
  getfee,
  GetsSubject,
  getEmployee,
  GetSection,
  GetClassSubject,
} from "../../../redux/actions/commanAction";
import styles from "../../coaching/employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import AddTest from "../../../component/Institute/student/AddTimeTable";
import UpdateTest from "../../../component/Institute/student/UpdateTimeTable";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import exportFromJSON from "export-from-json";
const daylist = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];
function Timetable() {
  const dispatch = useDispatch();
  const [dayname, setdayname] = useState("");
  const [courselist, setcourselist] = useState("");
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [isdata, setisData] = useState([]);
  const [emplist, setemplist] = useState([]);
  const [userdata, setuserdata] = useState("");
  const [classId, setclassId] = useState("");
  const [empID, setempID] = useState("");
  const { employees } = useSelector((state) => state.getemp);
  const { user } = useSelector((state) => state.auth);
  const { loading, test } = useSelector((state) => state.gettest);
  const { batch } = useSelector((state) => state.getbatch);
  const { course } = useSelector((state) => state.getcourse);
  const { subject } = useSelector((state) => state.GetSubject);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  const handleCloseregister = () => {
    setOpen(false);
  };

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

  const handleClosedelete = () => {
    setOpenalert(false);
  };

  const handledelete = () => {
    serverInstance("comman/subject", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        handleClosedelete();
        dispatch(GetsSubject(classId));
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        handleClosedelete();
      }
    });
  };

  useEffect(() => {
    if (subject) {
      setisData(subject);
    }
    if (user) {
      setuserdata(user);
    }
    if (course) {
      setcourselist(course);
    }
    if (employees) {
      setemplist(employees);
    }
  }, [test, batch, user, course, employees, subject]);

  useEffect(() => {
    dispatch(GetsSubject(classId, empID));
  }, []);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(getfee());
    dispatch(GetsSubject());
    dispatch(getEmployee());
    dispatch(GetClassSubject());
    dispatch(GetSection());
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    dispatch(GetsSubject(classId, empID, dayname));
  };

  const reset = () => {
    setempID("");
    setclassId("");
    setdayname("");
    dispatch(GetsSubject());
  };

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

    return (
      monthsOrder.indexOf(a?.subject?.dayname) -
      monthsOrder.indexOf(b?.subject?.dayname)
    );
  };

  const ExportToExcel = (isData) => {
    const fileName = "TimeTable";
    const exportType = "xls";
    var data = [];

    isData.map((item) => {
      data.push({
        Day: item?.subject?.dayname,
        Class: item?.classname?.coursename,
        Subject: item?.subject?.subject,
        Employee: ` ${item?.empname?.name} ( ${item?.empname?.empId})`,
        Start_Time: item?.subject?.starttime,
        End_Time: item?.subject?.endtime,
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <>
      {open && (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleCloseregister}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "60rem",
                },
              },
            }}
          >
            <AddTest setOpen={setOpen} />
          </Dialog>
        </div>
      )}
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
                  maxWidth: "60rem",
                },
              },
            }}
          >
            <UpdateTest setOpen={setOpenupdate} updatedata={updatedata} />
          </Dialog>
        </div>
      )}

      {openalert && (
        <>
          <Dialog
            open={openalert}
            onClose={handleClosedelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Do you want to delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                After delete you cannot get again
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosedelete}>Disagree</Button>
              <Button onClick={handledelete} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <form onSubmit={filterdata} className={styles.searchoptiondiv}>
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
                  value={classId}
                  name="classId"
                  onChange={(e) => setclassId(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    All Class
                  </option>
                  {course?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.id}
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
                  value={empID}
                  name="empID"
                  onChange={(e) => setempID(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    All Teacher
                  </option>
                  {emplist?.length > 0 &&
                    emplist?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.id}
                        >
                          {item?.name} ({item?.empId})
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
                  value={dayname}
                  name="dayname"
                  onChange={(e) => setdayname(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    All Day
                  </option>
                  {daylist?.map((item, index) => {
                    return (
                      <option key={index} value={item?.value}>
                        {item?.value}
                      </option>
                    );
                  })}
                </select>
                <button>Search</button>
              </form>
              <button onClick={() => reset()}>Reset</button>
            </div>
            <div className={styles.imgdivformat}>
              {/* <img
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />
              <img
                className={styles.imgdivformatimg}
                src="/images/ExportPdf.png"
                alt="img"
              /> */}
              <img
                onClick={() => ExportToExcel(isdata)}
                src="/images/ExportExcel.png"
                alt="img"
              />
            </div>
          </div>

          <div className={styles.addtopmenubar}>
            <button
              className={
                userdata?.data && userdata?.data?.User?.userType === "school"
                  ? styles.addtopmenubarbuttonactive
                  : userdata?.data && userdata?.data?.User?.masterWrite === true
                  ? styles.addtopmenubarbuttonactive
                  : styles.addtopmenubarbuttondisable
              }
              disabled={
                userdata?.data && userdata?.data?.User?.userType === "school"
                  ? false
                  : userdata?.data && userdata?.data?.User?.masterWrite === true
                  ? false
                  : true
              }
              onClick={() => handleClickOpen()}
            >
              Add Time Table
            </button>
          </div>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Day</th>
                    <th className={styles.tableth}>Class</th>
                    <th className={styles.tableth}>Subject</th>
                    <th className={styles.tableth}>Employee</th>
                    <th className={styles.tableth}>Start_Time</th>
                    <th className={styles.tableth}>End_Time</th>

                    <th className={styles.tableth}>Action</th>
                  </tr>
                  {isdata?.length > 0 &&
                    isdata?.sort(compareMonths)?.map((item, index) => {
                      return (
                        <tr key={index} className={styles.tabletr}>
                          <td className={styles.tabletd}>
                            {item?.subject?.dayname}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.classname?.coursename}
                          </td>

                          <td className={styles.tabletd}>
                            {item?.subject?.subject}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.empname?.name} ( {item?.empname?.empId})
                          </td>
                          <td className={styles.tabletd}>
                            {item?.subject?.starttime}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.subject?.endtime}
                          </td>

                          <td className={styles.tabkeddd}>
                            <button
                              disabled={
                                userdata?.data &&
                                userdata?.data?.User?.userType === "school"
                                  ? false
                                  : userdata?.data &&
                                    userdata?.data?.User?.fronroficeDelete ===
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
                                      userdata?.data?.User?.fronroficeDelete ===
                                        true
                                    ? styles.tabkedddimgactive
                                    : styles.tabkedddimgdisable
                                }
                                onClick={() =>
                                  ClickOpendelete(item?.subject?.id)
                                }
                                src="/images/Delete.png"
                                alt="imgss"
                              />
                            </button>
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
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Timetable;
