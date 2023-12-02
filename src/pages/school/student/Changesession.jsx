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
} from "../../../redux/actions/commanAction";
import {
  GetHostel,
  GetFacility,
  GetCategory,
} from "../../../redux/actions/hostelActions";
import { GetRoute } from "../../../redux/actions/transportActions";
import styles from "../../coaching/employee/employee.module.css";
import Slide from "@mui/material/Slide";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];
function Changesession() {
  const dispatch = useDispatch();
  const [allselectStatus, setallselectStatus] = useState(false);
  const [transsection, settranssection] = useState("NONE");
  const [transClass, settransClass] = useState("");
  const [transSession, settransSession] = useState("");
  const [checked, setChecked] = useState([]);
  const [studentlist, setstudentlist] = useState([]);
  const [studentlist1, setstudentlist1] = useState("");
  const [scoursename, setscoursename] = useState("");
  const [sfathers, setsfathers] = useState("");
  const [sstudent, setsstudent] = useState("");
  const [sbatch, setsbatch] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [batchs, setbatchs] = useState([]);
  const [isdata, setisData] = useState([]);
  const [courselist, setcourselist] = useState([]);
  const [status, setstatus] = useState("");
  const [rollnumber, setrollnumber] = useState("");
  const [categoryname, setcategoryname] = useState("");
  const [categorylist, setcategorylist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [sessionname, setsessionname] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [userdata, setuserdata] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { loading, student } = useSelector((state) => state.getstudent);
  const { batch } = useSelector((state) => state.getbatch);
  const { course } = useSelector((state) => state.getcourse);
  const { category } = useSelector((state) => state.getcategory);
  const { sections } = useSelector((state) => state.GetSection);
  const { Sessions } = useSelector((state) => state.GetSession);

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
  }, [student, batch, user, course, category, Sessions, sections]);
  useEffect(() => {
    dispatch(getstudent());
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
        sectionname
      )
    );
  };

  const reset = () => {
    setsstudent("");
    setsfathers("");
    setfromdate("");
    settodate("");
    setscoursename("");
    setsbatch("");
    setcategoryname("");
    let date = new Date();
    let fullyear = date.getFullYear();
    setsessionname(fullyear);
    setsectionname("");
    dispatch(getstudent());
  };

  useEffect(() => {
    let date = new Date();
    let fullyear = date.getFullYear();
    setsessionname(fullyear);
  }, []);

  console.log("seesion is data is ", studentlist);

  const handlesession = () => {
    try {
      // if (studentlist?.length === 0 || studentlist1?.length === 0) {
      //   toast.error("Please Select Student!!", {
      //     autoClose: 1000,
      //   });
      //   return 0;
      // }
      serverInstance("student/changesession", "post", {
        studentlist: allselectStatus ? isdata : studentlist,
        session: transSession,
        section: transsection,
        classname: transClass,
      }).then((res) => {
        if (res?.status === true) {
          setisData(res?.data);

          console.log("changes session data is", res);

          toast.success(res?.msg, {
            autoClose: 1000,
          });
          dispatch(GetSection());
          // handleClosedelete();
        }
        if (res?.status === false) {
          toast.error(res?.msg, {
            autoClose: 1000,
          });
          // handleClosedelete();
        }
      });
    } catch (error) {
      toast.error("Something Went Wrong!!", {
        autoClose: 1000,
      });
    }
  };
  return (
    <>
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
                </select>
                <input
                  className={styles.opensearchinput10}
                  type="text"
                  placeholder="Student's name"
                  value={sstudent}
                  name="sstudent}"
                  onChange={(e) => setsstudent(e.target.value)}
                />

                <input
                  className={styles.opensearchinput10}
                  type="text"
                  placeholder="Roll No"
                  value={rollnumber}
                  name="rollnumber"
                  onChange={(e) => setrollnumber(e.target.value)}
                />

                <button>Get Student</button>
              </form>
              <button onClick={() => reset()}>Reset</button>
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

          <div className={styles.addtopmenubar}>
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
              value={transSession}
              name="transSession"
              onChange={(e) => settransSession(e.target.value)}
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
              value={transClass}
              name="transClass"
              onChange={(e) => settransClass(e.target.value)}
              displayEmpty
            >
              <option
                sx={{
                  fontSize: 14,
                }}
                value={""}
              >
                Transport To Class
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
              value={transsection}
              name="transsection"
              onChange={(e) => settranssection(e.target.value)}
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
              onClick={() => handlesession()}
            >
              Change Session
            </button>
          </div>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>S.NO</th>
                    <th className={styles.tableth}>SNO</th>
                    <th className={styles.tableth}>Roll No</th>
                    <th className={styles.tableth}>Section</th>
                    <th className={styles.tableth}>Student_Name</th>
                    <th className={styles.tableth}>Student_Email</th>
                    <th className={styles.tableth}>Student_Phone</th>
                    <th className={styles.tableth}>Adminssion_Date</th>
                    <th className={styles.tableth}>Class</th>
                    <th className={styles.tableth}>Category</th>
                    <th className={styles.tableth}>Student Status</th>
                    <th className={styles.tableth}>
                      All Select{" "}
                      <input
                        type="checkbox"
                        // checked={true}
                        // disabled={true}
                        value={isdata}
                        onChange={(e) => {
                          let updatedList = [...studentlist1];
                          if (e.target.checked) {
                            updatedList = [...studentlist1, isdata];
                            setallselectStatus(true);
                          } else {
                            updatedList.splice(checked.indexOf(isdata), 1);
                            setallselectStatus(false);
                          }
                          setstudentlist1(updatedList);
                        }}
                      />
                    </th>
                  </tr>
                  {isdata?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>{item?.SrNumber}</td>
                        <td className={styles.tabletd}>{item?.rollnumber}</td>
                        <td className={styles.tabletd}>{item?.Section}</td>
                        <td className={styles.tabletd}>{item?.name}</td>
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
                          {allselectStatus ? (
                            <>
                              <input
                                type="checkbox"
                                checked={true}
                                disabled={true}
                              />
                            </>
                          ) : (
                            <>
                              <input
                                type="checkbox"
                                value={item}
                                onChange={(e) => {
                                  let updatedList = [...studentlist];
                                  if (e.target.checked) {
                                    updatedList = [...studentlist, item];
                                  } else {
                                    updatedList.splice(
                                      checked.indexOf(item),
                                      1
                                    );
                                  }
                                  setstudentlist(updatedList);
                                }}
                              />
                            </>
                          )}
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

export default Changesession;
