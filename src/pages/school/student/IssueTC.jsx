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
  getTC,
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
import UpdateIssusedTc from "./UpdateIssusedTc";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import exportFromJSON from "export-from-json";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import TCFormat from "./TCFormat";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];
function IssueTC() {
  const dispatch = useDispatch();
  const [TCList, setTCList] = useState([]);
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
  const [studentname, setstudentname] = useState("");
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { loading, student } = useSelector((state) => state.getstudent);
  const { TcList, loading: tcloading } = useSelector(
    (state) => state.getTCList
  );
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
    if (TcList) {
      setTCList(TcList);
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
    TcList,
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
    dispatch(getTC());
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

  const filterdata = () => {
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
        seno,
        stream,
        ""
      )
    );
  };
  const reset = () => {
    setseno("");
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

  const filterdataTC = () => {
    dispatch(getTC(scoursename, sessionname, studentname, seno));
  };

  const resetTc = () => {
    setseno("");
    dispatch(getTC());
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

  const handledelete = () => {
    setdeleting(true);
    serverInstance(`student/CreateTC?id=${deleteid}`, "delete").then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });

        handleClosedelete();
        setdeleting(false);

        dispatch(getstudent());
        dispatch(getTC());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        handleClosedelete();

        setdeleting(false);
      }
    });
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
            <TCFormat setOpen={setopenTC} TcData={TcData} />
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
            <UpdateIssusedTc setOpen={setOpenupdate} updatedata={updatedata} />
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

                  <input
                    className={styles.opensearchinput10}
                    type="text"
                    placeholder="Sr Number"
                    value={seno}
                    name="seno}"
                    onChange={(e) => setseno(e.target.value)}
                  />

                  <input
                    className={styles.opensearchinput10}
                    type="text"
                    placeholder="Name"
                    value={studentname}
                    name="studentname"
                    onChange={(e) => setstudentname(e.target.value)}
                  />

                  <button onClick={() => filterdataTC()}>Search</button>
                </>
              ) : (
                <>
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
                      placeholder="Name"
                      value={sstudent}
                      name="sstudent"
                      onChange={(e) => setsstudent(e.target.value)}
                    />

                    <button onClick={() => filterdata()}>Search</button>
                  </div>
                </>
              )}

              <button onClick={() => (issuedlist ? resetTc() : reset())}>
                Reset
              </button>

              <button
                className={
                  issuedlist
                    ? styles.searchoptiondivbutton
                    : styles.AllTabActive
                }
                onClick={() => {
                  setissuedlist(false);
                }}
              >
                Issued Tc
              </button>
              <button
                className={
                  issuedlist
                    ? styles.AllTabActive
                    : styles.searchoptiondivbutton
                }
                onClick={() => {
                  setissuedlist(true);
                }}
              >
                Issued Tc List
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
                        <th className={styles.tableth}>NameofStudent</th>
                        <th className={styles.tableth}>FathersName</th>
                        <th className={styles.tableth}>MothersName</th>
                        <th className={styles.tableth}>TcNo</th>
                        <th className={styles.tableth}>fileNo</th>
                        <th className={styles.tableth}>SrNo</th>
                        <th className={styles.tableth}>AadharNumber</th>
                        <th className={styles.tableth}>Nationality</th>

                        <th className={styles.tableth}>
                          qualifiedforpromotion
                        </th>
                        <th className={styles.tableth}>Action</th>
                      </tr>
                      {TCList &&
                        TCList?.map((item, index) => {
                          return (
                            <tr key={index} className={styles.tabletr}>
                              <td className={styles.tabletd}>{index + 1}</td>
                              <td className={styles.tabletd}>
                                {item?.NameofStudent}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.FathersName}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.MothersName}
                              </td>
                              <td className={styles.tabletd}>{item?.TcNo}</td>

                              <td className={styles.tabletd}>{item?.fileNo}</td>
                              <td className={styles.tabletd}>{item?.SrNo}</td>
                              <td className={styles.tabletd}>
                                {item?.AadharNumber}
                              </td>

                              <td className={styles.tabletd}>
                                {item?.Nationality}
                              </td>
                              <td className={styles.tabletd}>
                                {item?.qualifiedforpromotion}
                              </td>

                              <td className={styles.tabkeddd}>
                                <td className={styles.tabkeddd}>
                                  <img
                                    onClick={() => ClickOpendelete(item?.id)}
                                    src="/images/Delete.png"
                                    alt="imgss"
                                  />
                                  <img
                                    style={{ marginLeft: "1rem" }}
                                    onClick={() => ClickOpenupdate(item)}
                                    src="/images/Edit.png"
                                    alt="imgss"
                                  />
                                </td>
                              </td>
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
                        {/* <th className={styles.tableth}>Student_Email</th> */}
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
                            {/* <td className={styles.tabletd}>{item?.email}</td> */}
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
                                className={
                                  item?.TCStatus
                                    ? styles.IssuedTcDone
                                    : styles.actionbtn
                                }
                                disabled={item?.TCStatus ? true : false}
                                onClick={() => handleClickOpenTC(item)}
                              >
                                {item?.TCStatus ? "Issued" : "Issue"}
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
      {tcloading && <LoadingSpinner />}

      {loading && <LoadingSpinner />}
    </>
  );
}

export default IssueTC;
