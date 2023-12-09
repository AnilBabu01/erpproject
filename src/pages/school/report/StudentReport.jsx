import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getcourse,
  getbatch,
  getstudent,
  GetSection,
  GetSession,
  getfee,
  getCourseDuration,
} from "../../../redux/actions/commanAction";
import styles from "../../coaching/employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Addfee from "../../../component/Institute/accounts/Addfee";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];

function StudentReport() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const [seno, setseno] = useState("");
  const [categoryname, setcategoryname] = useState("");
  const [categorylist, setcategorylist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [sessionname, setsessionname] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [noOfMonth, setnoOfMonth] = useState("");
  const [scoursename, setscoursename] = useState("");
  const [rollnumber, setrollnumber] = useState("");
  const [sfathers, setsfathers] = useState("");
  const [sstudent, setsstudent] = useState("");
  const [sbatch, setsbatch] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [batchs, setbatchs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [isdata, setisData] = useState([]);
  const [userdata, setuserdata] = useState("");
  const [showfathers, setshowfathers] = useState(false);
  const [courselist, setcourselist] = useState([]);
  const [status, setstatus] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { loading, student } = useSelector((state) => state.getstudent);
  const { batch } = useSelector((state) => state.getbatch);
  const { courseduarion } = useSelector((state) => state.getCourseDur);
  const { course } = useSelector((state) => state.getcourse);
  const { category } = useSelector((state) => state.getcategory);
  const { sections } = useSelector((state) => state.GetSection);
  const { Sessions } = useSelector((state) => state.GetSession);
  console.log("student", status);
  var newmonthnames = [];
  var feestatusarray = [];
  let months;
  let curyears;
  var paidordoues = 0;
  if (courseduarion && courseduarion[0]?.noOfMonth) {
    months = courseduarion && courseduarion[0]?.noOfMonth;

    let montharray = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    curyears = new Date().getFullYear();
    let monthnames = [];
    if (months <= 12) {
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
    }
    if (months > 12 && months <= 24) {
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
    }
    if (months > 24 && months <= 36) {
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
    }

    for (let i = 0; i < months; i++) {
      if (i + 1 > 12 && i + 1 <= 24) {
        newmonthnames.push({
          month: monthnames[i],
          year: curyears + 1,
          feestatus: "Dues",
        });
      } else if (i + 1 > 24 && i + 1 <= 36) {
        newmonthnames.push({
          month: monthnames[i],
          year: curyears + 2,
          feestatus: "Dues",
        });
      } else {
        newmonthnames.push({
          month: monthnames[i],
          year: curyears,
          feestatus: "Dues",
        });
      }
    }
  }
  let m = 0;
  let newmonth = 0;
  const globalvalreset = (month) => {
    if (newmonth < 0) {
      m = 0;
      newmonth = 0;
    } else {
      newmonth = month - m++;
      if (newmonth + 1 >= 0) {
        return newmonth;
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  const handleCloseregister = () => {
    setOpen(false);
  };

  const [paidmonth, setpaidmonth] = useState("");
  const [monthname, setmonthname] = useState("");
  const ClickOpenupdate = (data, paid, months) => {
    setOpenupdate(true);
    setupdatedata(data);
    setpaidmonth(paid);
    setmonthname(months);
  };

  const handleCloseupadte = () => {
    setOpenupdate(false);
  };

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
    if (courseduarion) {
      setnoOfMonth(courseduarion);
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
  }, [
    student,
    batch,
    user,
    courseduarion,
    course,
    category,
    Sessions,
    sections,
  ]);

  useEffect(() => {
    dispatch(getstudent());
  }, []);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(getfee());
    dispatch(getCourseDuration());
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
        sectionname,
        seno
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
    setstatus("");
    setrollnumber("");
    setseno("");
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
    setcategoryname("");
    setsectionname("");
    dispatch(getstudent());
  };

  useEffect(() => {
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const ExportToExcel = (isData) => {
    const fileName = "StudentReport";
    const exportType = "xls";
    var data = [];

    isData.map((item, index) => {
      data.push({
        Addmission_Date: moment(item?.admissionDate).format("MM/DD/YYYY"),
        Session: item?.Session,
        Section: item?.Section,
        "Roll Number": item?.rollnumber,
        SNO: item?.SrNumber,
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
                  maxWidth: "80rem",
                },
              },
            }}
          >
            <Addfee
              setOpen={setOpenupdate}
              data={updatedata}
              monthname={monthname}
              paidmonth={paidmonth}
            />
          </Dialog>
        </div>
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
                  placeholder="Roll No"
                  value={rollnumber}
                  name="rollnumber"
                  onChange={(e) => setrollnumber(e.target.value)}
                />
                <input
                  className={styles.opensearchinput10}
                  type="text"
                  placeholder="SNO"
                  value={seno}
                  name="seno}"
                  onChange={(e) => setseno(e.target.value)}
                />
                <button>Search</button>
              </form>
              <button onClick={() => reset()}>Reset</button>
            </div>

            <div className={styles.imgdivformat}>
              <img
                onClick={() => handlePrint()}
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />
              {/* <img
                onClick={() => ExportToExcel(isdata)}
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

          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable} ref={componentRef}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Sr.No</th>
                    <th className={styles.tableth}>Session</th>
                    <th className={styles.tableth}>SNO</th>
                    <th className={styles.tableth}>Roll_No</th>
                    <th className={styles.tableth}>Section</th>
                    <th className={styles.tableth}>Student_Name</th>
                    <th className={styles.tableth}>Student_Email</th>
                    <th className={styles.tableth}>Student_Phone</th>
                    <th className={styles.tableth}>Adminssion_Date</th>
                    <th className={styles.tableth}>Class</th>
                    <th className={styles.tableth}>Category</th>
                    <th className={styles.tableth}>Status</th>
                  </tr>

                  {isdata?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>{item?.Session}</td>
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

export default StudentReport;
