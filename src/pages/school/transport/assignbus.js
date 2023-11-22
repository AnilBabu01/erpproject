import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { getbatch, getstudent } from "../../../redux/actions/commanAction";
import { getcourse } from "../../../redux/actions/commanAction";
import styles from "../employee/employee.module.css";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import IssueBook from "@/component/Institute/transport/GiveBus";
import ReturnBook from "@/component/Institute/transport/UpdateGiveBus";

function Assignbus() {
  const dispatch = useDispatch();
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [takeatten, settakeatten] = useState(true);
  const [todatatten, settodatatten] = useState(false);
  const [Analysisatten, setAnalysisatten] = useState(false);
  const [open, setOpen] = useState(false);
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
  const handleClickOpen = (data) => {
    setOpen(true);
    setupdatedata(data);
  };

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
    dispatch(getstudent("", "", classname, "", "", "", rollnumber, "", "", 1));
  }, [openupdate]);

  const filter = () => {
    dispatch(getstudent("", "", classname, "", "", "", rollnumber, "", "", 1));
  };
  const reset = () => {
    setdate("");
    setsbatch("");
    setrollnumber("");
    dispatch(getstudent("", "", classname, "", "", "", "", "", "", 1));
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
            <IssueBook setOpen={setOpen} updatedata={updatedata} />
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
            <ReturnBook setOpen={setOpenupdate} updatedata={updatedata} />
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
                  <input
                    className={styles.opensearchinput}
                    type="Text"
                    value={date}
                    name="date"
                    placeholder="Enter Roll Number"
                    min={minDateTime}
                    onChange={(e) => {
                      setdate(e.target.value);
                      console.log(e.target.value);
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

                  setsbatch("");
                  setclassname("");
                }}
              >
                Assign Bus
              </button>

              <button
                onClick={() => {
                  settakeatten(false);
                  settodatatten(false);
                  setAnalysisatten(true);

                  setsbatch("");
                  setclassname("");
                }}
                className={
                  Analysisatten
                    ? styles.searchbtnactive
                    : styles.searchoptiondivbutton
                }
              >
                UnAssign Bus
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
                                  onClick={() => handleClickOpen(item)}
                                  src="/images/Bus.png"
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

              {Analysisatten && (
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
                                  src="/images/Bus.png"
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

export default Assignbus;
