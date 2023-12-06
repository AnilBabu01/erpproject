import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getcourse,
  getbatch,
  getstudent,
  getcategory,
  GetSession,
  GetSection,
} from "../../../redux/actions/commanAction";
import { GetRoute } from "../../../redux/actions/transportActions";
import styles from "../employee/employee.module.css";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import IssueBook from "@/component/Institute/transport/GiveBus";
import ReturnBook from "@/component/Institute/transport/UpdateGiveBus";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];
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
  const [scoursename, setscoursename] = useState("");
  const [studentlist, setstudentlist] = useState([]);
  const [categoryname, setcategoryname] = useState("");
  const [categorylist, setcategorylist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [sessionname, setsessionname] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [sno, setsno] = useState("");
  const [status, setstatus] = useState("Active");
  const { course } = useSelector((state) => state.getcourse);
  const { category } = useSelector((state) => state.getcategory);
  const { sections } = useSelector((state) => state.GetSection);
  const { Sessions } = useSelector((state) => state.GetSession);
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
    if (sections) {
      setsectionList(sections);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
    if (category) {
      setcategorylist(category);
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
    sections,
    Sessions,
    category,
  ]);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(GetSection());
    dispatch(GetSession());
    dispatch(getcategory());
    dispatch(GetRoute());
    dispatch(
      getstudent(
        "",
        "",
        scoursename,
        sbatch,
        "",
        "",
        rollnumber,
        status,
        categoryname,
        "",
        sessionname,
        sectionname,
        sno
      )
    );
  }, []);

  const filter = () => {
    dispatch(
      getstudent(
        "",
        "",
        scoursename,
        sbatch,
        "",
        "",
        rollnumber,
        status,
        categoryname,
        "",
        sessionname,
        sectionname,
        sno
      )
    );
  };
  const reset = () => {
    setscoursename("");
    setsbatch("");
    setcategoryname("");
    setsno("");
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
    setsectionname("");
    dispatch(getstudent());
  };
  useEffect(() => {
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
  }, []);
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
                value={sessionname}
                name="sessionname"
                onChange={(e) => setsessionname(e.target.value)}
                displayEmpty
              >
                <option
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Select Session
                </option>

                {sessionList?.length > 0 &&
                  sessionList?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.Session}
                      >
                        {item?.Session}
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
                value={scoursename}
                name="scoursename"
                onChange={(e) => setscoursename(e.target.value)}
                displayEmpty
              >
                <option
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  ALL Class
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
              {/* <select
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
                <option
                  sx={{
                    fontSize: 14,
                  }}
                  value={"NONE"}
                >
                  NONE
                </option>

                {sectionList?.length > 0 &&
                  sectionList?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.section}
                      >
                        {item?.section}
                      </option>
                    );
                  })}
              </select> */}
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
              {/* <select
                className={styles.opensearchinput}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={categoryname}
                name="categoryname"
                onChange={(e) => setcategoryname(e.target.value)}
                displayEmpty
              >
                <option
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Category
                </option>

                {categorylist?.map((item, index) => {
                  return (
                    <option
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.category}
                    >
                      {item?.category}
                    </option>
                  );
                })}
              </select> */}
              {/* 
              <input
                className={styles.opensearchinput10}
                type="text"
                placeholder="Roll No"
                value={rollnumber}
                name="rollnumber"
                onChange={(e) => setrollnumber(e.target.value)}
              /> */}
              <input
                className={styles.opensearchinput10}
                type="text"
                placeholder="SNO"
                value={sno}
                name="sno"
                onChange={(e) => setsno(e.target.value)}
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
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Sr.No</th>
                    <th className={styles.tableth}>SNO</th>
                    <th className={styles.tableth}>Roll No</th>
                    <th className={styles.tableth}>Student_Name</th>
                    {/* <th className={styles.tableth}>Student_Email</th> */}
                    <th className={styles.tableth}>Student_Phone</th>
                    {/* <th className={styles.tableth}>Adminssion_Date</th> */}
                    <th className={styles.tableth}>Class</th>
                    <th className={styles.tableth}>From Route</th>
                    <th className={styles.tableth}>To Route</th>
                    <th className={styles.tableth}>Bus Number</th>
                    <th className={styles.tableth}>Status</th>
                    <th className={styles.tableth}>Action</th>
                  </tr>
                  {studentlist?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>{item?.SrNumber}</td>
                        <td className={styles.tabletd}>{item?.rollnumber}</td>
                        <td className={styles.tabletd}>{item?.name}</td>
                        {/* <td className={styles.tabletd}>{item?.email}</td> */}
                        <td className={styles.tabletd}>{item?.phoneno1}</td>
                        {/* <td className={styles.tabletd}>
                              {moment(item?.admissionDate).format("DD/MM/YYYY")}
                            </td> */}
                        <td className={styles.tabletd}>
                          {item?.courseorclass}
                        </td>

                        <td className={styles.tabletd}>
                          {item?.FromRoute ? item?.FromRoute : "----"}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.ToRoute ? item?.ToRoute : "----"}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.BusNumber ? item?.BusNumber : "----"}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.Transport === true ? "Active" : "Disable"}
                        </td>
                        <td className={styles.tabkeddd}>
                          <button
                            disabled={
                              userdata?.data &&
                              userdata?.data?.User?.userType === "school"
                                ? false
                                : userdata?.data &&
                                  userdata?.data?.User?.fronroficeEdit === true
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
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Assignbus;
