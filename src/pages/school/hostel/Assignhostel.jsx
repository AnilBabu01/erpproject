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
import {
  GetHostel,
  GetCategory,
  GetFacility,
  GetCheckin,
} from "../../../redux/actions/hostelActions";
import styles from "../employee/employee.module.css";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Slide from "@mui/material/Slide";
import IssueBook from "@/component/Institute/hostel/GIveRoom";
import ReturnBook from "@/component/Institute/hostel/UpdateGiveRoom";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import CheckinReceipt from "../../../component/Institute/hostel/CheckinReceipt";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];

function Assignhostel() {
  const navigation = useRouter();
  const dispatch = useDispatch();
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [takeatten, settakeatten] = useState(true);
  const [deleteid, setdeleteid] = useState("");
  const [openalert, setOpenalert] = useState(false);
  const [todatatten, settodatatten] = useState(false);
  const [checkinstatus, setcheckinstatus] = useState("true");
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
  const [checkinlist, setcheckinlist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [courselist, setcourselist] = useState([]);
  const [sessionname, setsessionname] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [sno, setsno] = useState("");
  const [status, setstatus] = useState("Active");
  const [receiptdata, setreceiptdata] = useState("");
  const [openreceipt, setopenreceipt] = useState(false);
  const { course } = useSelector((state) => state.getcourse);
  const { category } = useSelector((state) => state.getcategory);
  const { sections } = useSelector((state) => state.GetSection);
  const { Sessions } = useSelector((state) => state.GetSession);
  const { loading, student } = useSelector((state) => state.getstudent);
  const { loading: loading1, checkin } = useSelector(
    (state) => state.GetCheckin
  );
  const [minDateTime, setMinDateTime] = useState(
    new Date()?.toISOString().slice(0, 16)
  );
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  const handleClickOpenReceipt = (data) => {
    setopenreceipt(true);
    setreceiptdata(data);
  };

  const handleClosereceipt = () => {
    setopenreceipt(false);
  };
  
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

  const handleClosedelete = () => {
    setOpenalert(false);
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
    if (student) {
      let filterdata = student.filter((item) => {
        return item?.hostal === true;
      });
      setstudentlist(filterdata);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
    if (sections) {
      setsectionList(sections);
    }
    if (category) {
      setcategorylist(category);
    }
    if (checkin) {
      setcheckinlist(checkin);
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
    Sessions,
    sections,
    category,
    checkin,
  ]);

  const getCheckinlist = () => {
    console.log("clienmdhmbfhdghcvx");
    dispatch(
      GetCheckin(sessionname, sectionname, sno, checkinstatus, scoursename)
    );
  };

  const resetcheckilist = () => {
    try {
      setsno("");
      setsectionname("");
      setscoursename("");
      let date = new Date();
      let fullyear = date.getFullYear();
      let lastyear = date.getFullYear() - 1;
      setsessionname(`${lastyear}-${fullyear}`);
      setcheckinstatus("");
      dispatch(GetCheckin());
    } catch (error) {}
  };

  const handledelete = () => {
    serverInstance("hostel/ReleaseRoom", "put", {
      id: deleteid,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
        getCheckinlist();
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
      }
    });
  };
  useEffect(() => {
    getCheckinlist();
    dispatch(GetCheckin());
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(GetSection());
    dispatch(GetSession());
    dispatch(getcategory());
    dispatch(GetFacility());
    dispatch(GetHostel());
    dispatch(GetCategory());
    dispatch(GetCheckin());
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
    setsfathers("");
    setfromdate("");
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
      {openalert && (
        <>
          <Dialog
            open={openalert}
            onClose={handleClosedelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {" Do You Want To Release Room"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                After Release Room you will have to new checkin
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosedelete}>Disagree</Button>
              <Button onClick={handledelete} autoFocus>
                Release
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {openreceipt && (
        <div>
          <Dialog
            open={openreceipt}
            TransitionComponent={Transition}
            onClose={handleClosereceipt}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "63rem",
                },
              },
            }}
          >
            <CheckinReceipt setOpen={setopenreceipt} receiptdata={receiptdata} />
          </Dialog>
        </div>
      )}

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
                  maxWidth: "63rem",
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
                    value={checkinstatus}
                    name="checkinstatus"
                    onChange={(e) => setcheckinstatus(e.target.value)}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={true}
                    >
                      Active
                    </option>
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={false}
                    >
                      Released
                    </option>
                  </select>

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
                      getCheckinlist();
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
                    onClick={() => resetcheckilist()}
                  >
                    Reset
                  </button>
                </>
              )}
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
                Checkin
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
                Room Shift
              </button>
              <button
                onClick={() => {
                  settakeatten(false);
                  settodatatten(true);
                  setAnalysisatten(false);
                  setsbatch("");
                  setclassname("");
                }}
                className={
                  todatatten
                    ? styles.searchbtnactive
                    : styles.searchoptiondivbutton
                }
              >
                Room Release
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
                                  src="/images/Checkin.png"
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
                                  src="/images/Checkout2.png"
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

              {todatatten && (
                <>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth}>S.NO</th>
                        <th className={styles.tableth}>SNO</th>
                        <th className={styles.tableth}>Session</th>
                        <th className={styles.tableth}>Section</th>
                        <th className={styles.tableth}>Student_Name</th>
                        <th className={styles.tableth}>Checkin_Date</th>
                        <th className={styles.tableth}>Class</th>
                        <th className={styles.tableth}>Room_No</th>
                        <th className={styles.tableth}>Hostel</th>
                        <th className={styles.tableth}>Category</th>
                        <th className={styles.tableth}>Facility</th>
                        {/* <th className={styles.tableth}>Status</th> */}
                        <th className={styles.tableth}>Action</th>
                      </tr>
                      {checkinlist?.length > 0 &&
                        checkinlist?.map((item, index) => {
                          return (
                            <tr key={index} className={styles.tabletr}>
                              <td className={styles.tabletd}>{index + 1}</td>
                              <td className={styles.tabletd}>{item?.SNO}</td>
                              <td className={styles.tabletd}>
                                {item?.Session}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.Section}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.StudentName}
                              </td>
                              <td className={styles.tabletd}>
                                {moment(item?.CheckinDate).format("DD/MM/YYYY")}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.StudentClass}
                              </td>
                              <td className={styles.tabletd}>{item?.RoomNo}</td>
                              <td className={styles.tabletd}>
                                {item?.hostelname}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.Category}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.Facility}
                              </td>

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
                                      userdata?.data?.User?.userType ===
                                        "school"
                                        ? styles.tabkedddimgactive
                                        : userdata?.data &&
                                          userdata?.data?.User
                                            ?.fronroficeEdit === true
                                        ? styles.tabkedddimgactive
                                        : styles.tabkedddimgdisable
                                    }
                                    onClick={() => handleClickOpenReceipt(item)}
                                    src="/images/Print.png"
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
                                      userdata?.data?.User?.userType ===
                                        "school"
                                        ? styles.tabkedddimgactive
                                        : userdata?.data &&
                                          userdata?.data?.User
                                            ?.fronroficeEdit === true
                                        ? styles.tabkedddimgactive
                                        : styles.tabkedddimgdisable
                                    }
                                    onClick={() => ClickOpendelete(item?.id)}
                                    src="/images/Checkout.png"
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

      {loading || (loading1 && <LoadingSpinner />)}
    </>
  );
}

export default Assignhostel;
