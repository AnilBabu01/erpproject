import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getcourse,
  getbatch,
  getstudent,
  getfee,
  getcategory,
  GetSession,
  GetSection,
  getcurrentsession,
} from "../../../redux/actions/commanAction";
import {
  GetHostel,
  GetFacility,
  GetCategory,
} from "../../../redux/actions/hostelActions";
import { GetRoute } from "../../../redux/actions/transportActions";
import styles from "../../school/employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import AddAdmission from "../../../component/Institute/student/AddStudent";
import UpdateAdmission from "../../../component/Institute/student/UpdateStudent";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import exportFromJSON from "export-from-json";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import CCertificate from "./CCertificate";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];
function CharacterCertificate() {
  const dispatch = useDispatch();
  const [seno, setseno] = useState("");
  const [issuedlist, setissuedlist] = useState(false);
  const [sessionname, setsessionname] = useState();
  const [deleting, setdeleting] = useState(false);
  const [stream, setstream] = useState("");
  const [scoursename, setscoursename] = useState("");
  const [sfathers, setsfathers] = useState("");
  const [sstudent, setsstudent] = useState("");
  const [sbatch, setsbatch] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [batchs, setbatchs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [openalert, setOpenalert] = useState(false);
  const [openTC, setopenTC] = useState(false);
  const [TcData, setTcData] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [isdata, setisData] = useState([]);
  const [courselist, setcourselist] = useState([]);
  const [status, setstatus] = useState("");
  const [rollnumber, setrollnumber] = useState("");
  const [categoryname, setcategoryname] = useState("");
  const [categorylist, setcategorylist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [sectionname, setsectionname] = useState("NONE");
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { loading, student } = useSelector((state) => state.getstudent);
  const { batch } = useSelector((state) => state.getbatch);
  const { course } = useSelector((state) => state.getcourse);
  const { category } = useSelector((state) => state.getcategory);
  const { sections } = useSelector((state) => state.GetSection);
  const { Sessions } = useSelector((state) => state.GetSession);
  const { CURRENTSESSION } = useSelector((state) => state.GetCurrentSession);

  const handleClickOpenTC = (data) => {
    setopenTC(true);
    setTcData(data);
  };

  const handleCloseTC = () => {
    setopenTC(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
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

  const handledelete = () => {
    setdeleting(true);
    serverInstance(`student/addstudent?id=${deleteid}`, "delete").then(
      (res) => {
        if (res?.status === true) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          dispatch(getstudent());
          handleClosedelete();
          setdeleting(false);
        }
        if (res?.status === false) {
          toast.error(res?.msg, {
            autoClose: 1000,
          });
          handleClosedelete();
          setdeleting(false);
        }
      }
    );
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  useEffect(() => {
    if (student) {
      setisData(student);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (user) {
      setuserdata(user);
    }
    if (course) {
      setcourselist(course);
    }
    if (category) {
      setcategorylist(category);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
    if (sections) {
      setsectionList(sections);
    }
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
  }, [
    student,
    batch,
    user,
    course,
    category,
    Sessions,
    sections,
    CURRENTSESSION,
  ]);
  useEffect(() => {
    dispatch(
      getstudent(
        fromdate,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        sessionname,
        "",
        "",
        "",
        ""
      )
    );
  }, []);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(getfee());
    dispatch(getcategory());
    dispatch(GetCategory());
    dispatch(GetHostel());
    dispatch(GetFacility());
    dispatch(GetRoute());
    dispatch(GetSection());
    dispatch(GetSession());
    dispatch(getcurrentsession());
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    dispatch(
      getstudent(
        fromdate,
        todate,
        scoursename,
        sbatch,
        sstudent,
        sfathers,
        rollnumber,
        status,
        categoryname,
        "",
        sessionname,
        sectionname,
        "",
        stream
      )
    );
  };

  const reset = () => {
    setstream("");
    setsstudent("");
    setsfathers("");
    setfromdate("");
    settodate("");
    setscoursename("");
    setsbatch("");
    setcategoryname("");
    setsessionname(CURRENTSESSION);
    setsectionname("");
    dispatch(getstudent());
  };

  const ExportToExcel = (isData) => {
    const fileName = "StudentList";
    const exportType = "xls";
    var data = [];

    isData.map((item, index) => {
      data.push({
        Addmission_Date: moment(item?.admissionDate).format("MM/DD/YYYY"),
        Session: item?.Session,
        Section: item?.Section,
        "Roll Number": item?.rollnumber,
        SRNO: item?.SrNumber,
        Student_Name: item?.name,
        Student_Email: item?.email,
        "Student_Mobile NO": item?.phoneno1,
        "Father's_Name": item?.fathersName,
        "Father's_Mobile NO": item?.fathersPhoneNo,
        Class: item?.courseorclass,
        Category: item?.StudentCategory,
        Status: item?.Status,
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };

  const filterIssueCC = () => {
    let filterdata = isdata?.filter((item) => item?.CCStatus != 0);
    return filterdata;
  };
  return (
    <>
      {openTC && (
        <div>
          <Dialog
            open={openTC}
            TransitionComponent={Transition}
            onClose={handleCloseTC}
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
            <CCertificate setOpen={setopenTC} TcData={TcData} />
          </Dialog>
        </div>
      )}
      {open && (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            // onClose={handleCloseregister}
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
            <AddAdmission setOpen={setOpen} />
          </Dialog>
        </div>
      )}
      {openupdate && (
        <div>
          <Dialog
            open={openupdate}
            TransitionComponent={Transition}
            // onClose={handleCloseupadte}
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
            <UpdateAdmission setOpen={setOpenupdate} updatedata={updatedata} />
          </Dialog>
        </div>
      )}

      {openalert && (
        <>
          <Dialog
            open={openalert}
            // onClose={handleClosedelete}
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
                {deleting ? (
                  <CircularProgress size={25} style={{ color: "red" }} />
                ) : (
                  "Agree"
                )}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              {issuedlist ? (
                <>
                  <form
                    onSubmit={filterdata}
                    className={styles.searchoptiondiv}
                  >
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
                      placeholder="SRNO"
                      value={seno}
                      name="seno}"
                      onChange={(e) => setseno(e.target.value)}
                    />
                    <input
                      className={styles.opensearchinput10}
                      type="text"
                      placeholder="Roll No"
                      value={rollnumber}
                      name="rollnumber"
                      onChange={(e) => setrollnumber(e.target.value)}
                    />

                    <button>Search</button>
                  </form>
                </>
              ) : (
                <>
                  <form
                    onSubmit={filterdata}
                    className={styles.searchoptiondiv}
                  >
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
                      placeholder="SRNO"
                      value={seno}
                      name="seno}"
                      onChange={(e) => setseno(e.target.value)}
                    />
                    <input
                      className={styles.opensearchinput10}
                      type="text"
                      placeholder="Roll No"
                      value={rollnumber}
                      name="rollnumber"
                      onChange={(e) => setrollnumber(e.target.value)}
                    />

                    <button>Search</button>
                  </form>
                </>
              )}

              <button onClick={() => reset()}>Reset</button>
              <button
                className={
                  issuedlist
                    ? styles.searchbtnactive
                    : styles.searchoptiondivbutton
                }
                onClick={() => {
                  setissuedlist(!issuedlist);
                }}
              >
                Issued Character rCertificate List
              </button>
            </div>
            <div className={styles.imgdivformat}></div>
          </div>

          <div className={styles.add_divmarginn}>
            {issuedlist ? (
              <>
                <div className={styles.tablecontainer}>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth}>Sr.No</th>
                        <th className={styles.tableth}>Session</th>
                        <th className={styles.tableth}>SRNO</th>
                        <th className={styles.tableth}>Roll_No</th>
                        <th className={styles.tableth}>Section</th>
                        <th className={styles.tableth}>Stream</th>
                        <th className={styles.tableth}>Student_Name</th>
                        <th className={styles.tableth}>Gender</th>
                        <th className={styles.tableth}>Student_Email</th>
                        <th className={styles.tableth}>Student_Phone</th>
                        <th className={styles.tableth}>Issued_Date</th>
                        <th className={styles.tableth}>Class</th>
                        <th className={styles.tableth}>Category</th>
                        <th className={styles.tableth}>Student_Status</th>
                      </tr>
                      {filterIssueCC()?.map((item, index) => {
                        return (
                          <tr key={index} className={styles.tabletr}>
                            <td className={styles.tabletd}>{index + 1}</td>
                            <td className={styles.tabletd}>{item?.Session}</td>
                            <td className={styles.tabletd}>{item?.SrNumber}</td>
                            <td className={styles.tabletd}>
                              {item?.rollnumber}
                            </td>
                            <td className={styles.tabletd}>{item?.Section}</td>
                            <td className={styles.tabletd}>{item?.Stream}</td>
                            <td className={styles.tabletd}>{item?.name}</td>
                            <td className={styles.tabletd}>{item?.Gender}</td>
                            <td className={styles.tabletd}>{item?.email}</td>
                            <td className={styles.tabletd}>{item?.phoneno1}</td>
                            <td className={styles.tabletd}>
                              {moment(item?.admissionDate).format("DD/MM/YYYY")}
                            </td>
                            <td className={styles.tabletd}>
                              {item?.courseorclass}
                            </td>
                            <td className={styles.tabletd}>
                              {item?.StudentCategory}
                            </td>
                            <td className={styles.tabletd}>{item?.Status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className={styles.tablecontainer}>
                  <table className={styles.tabletable}>
                    <tbody>
                      <tr className={styles.tabletr}>
                        <th className={styles.tableth}>Sr.No</th>
                        <th className={styles.tableth}>Session</th>
                        <th className={styles.tableth}>SRNO</th>
                        <th className={styles.tableth}>Roll_No</th>
                        <th className={styles.tableth}>Section</th>
                        <th className={styles.tableth}>Stream</th>
                        <th className={styles.tableth}>Student_Name</th>
                        <th className={styles.tableth}>Gender</th>
                        <th className={styles.tableth}>Student_Email</th>
                        <th className={styles.tableth}>Student_Phone</th>
                        <th className={styles.tableth}>Adminssion_Date</th>
                        <th className={styles.tableth}>Class</th>
                        <th className={styles.tableth}>Category</th>
                        <th className={styles.tableth}>Student_Status</th>
                        <th className={styles.tableth}>Action</th>
                      </tr>
                      {isdata?.map((item, index) => {
                        return (
                          <tr key={index} className={styles.tabletr}>
                            <td className={styles.tabletd}>{index + 1}</td>
                            <td className={styles.tabletd}>{item?.Session}</td>
                            <td className={styles.tabletd}>{item?.SrNumber}</td>
                            <td className={styles.tabletd}>
                              {item?.rollnumber}
                            </td>
                            <td className={styles.tabletd}>{item?.Section}</td>
                            <td className={styles.tabletd}>{item?.Stream}</td>
                            <td className={styles.tabletd}>{item?.name}</td>
                            <td className={styles.tabletd}>{item?.Gender}</td>
                            <td className={styles.tabletd}>{item?.email}</td>
                            <td className={styles.tabletd}>{item?.phoneno1}</td>
                            <td className={styles.tabletd}>
                              {moment(item?.admissionDate).format("DD/MM/YYYY")}
                            </td>
                            <td className={styles.tabletd}>
                              {item?.courseorclass}
                            </td>
                            <td className={styles.tabletd}>
                              {item?.StudentCategory}
                            </td>
                            <td className={styles.tabletd}>{item?.Status}</td>
                            <td className={styles.tabkeddd}>
                              <button
                                className={styles.actionbtn}
                                onClick={() => handleClickOpenTC(item)}
                              >
                                Issue CC
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default CharacterCertificate;
