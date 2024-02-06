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
  getcurrentsession,
} from "../../../redux/actions/commanAction";
import styles from "../../school/employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Addfee from "../../../component/Institute/accounts/Addfee";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { useReactToPrint } from "react-to-print";
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

function Balancefee() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [stream, setstream] = useState("");
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
  const [loading, setloading] = useState(false);
  const { student } = useSelector((state) => state.getstudent);
  const { batch } = useSelector((state) => state.getbatch);
  const { courseduarion } = useSelector((state) => state.getCourseDur);
  const { course } = useSelector((state) => state.getcourse);
  const { category } = useSelector((state) => state.getcategory);
  const { sections } = useSelector((state) => state.GetSection);
  const { Sessions } = useSelector((state) => state.GetSession);
  const { CURRENTSESSION } = useSelector((state) => state.GetCurrentSession);
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
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
  }, [
    batch,
    user,
    courseduarion,
    course,
    category,
    Sessions,
    sections,
    CURRENTSESSION,
  ]);

  const getsearchfee = () => {
    setloading(true);
    serverInstance("student/Searchfee", "post", {
      scoursename,
      sbatch,
      stream,
      rollnumber,
      status,
      categoryname,
      sessionname,
      sectionname,
      seno,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setisData(res?.data);
        setloading(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
    });
  };
  useEffect(() => {
    // getsearchfee();
  }, []);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(getfee());
    dispatch(getCourseDuration());
    dispatch(GetSection());
    dispatch(GetSession());
    dispatch(getcurrentsession());
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("student/SearchfeeByMonth", "post", {
      scoursename,
      sbatch,
      stream,
      rollnumber,
      status,
      categoryname,
      sessionname,
      sectionname,
      seno,
      monthname: monthnamelist[month],
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setisData(res?.data);
        setloading(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
    });
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
    setsessionname(CURRENTSESSION);
    setcategoryname("");
    setsectionname("");
    getsearchfee();
  };

  const compareMonths = (a, b) => {
    const monthsOrder = [
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
    ];

    return monthsOrder.indexOf(a.MonthName) - monthsOrder.indexOf(b.MonthName);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
                </select> */}

                {/* <input
                  className={styles.opensearchinput10}
                  type="text"
                  placeholder="Roll No"
                  value={rollnumber}
                  name="rollnumber"
                  onChange={(e) => setrollnumber(e.target.value)}
                /> */}

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

                <input
                  className={styles.opensearchinput10}
                  type="text"
                  placeholder="SRNO"
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
                className={styles.imgdivformatimg}
                src="/images/ExportPdf.png"
                alt="img"
              />
              <img src="/images/ExportExcel.png" alt="img" /> */}
            </div>
          </div>

          <div className={styles.add_divmarginn} ref={componentRef}>
            <div className={styles.tablecontainer}>
              <div className={styles.academyfee}>
                <table className={styles.tabletable}>
                  <tbody>
                    <tr className={styles.tabletr}>
                      <th className={styles.tableth}>Session</th>
                      <th className={styles.tableth}>SRNO</th>
                      <th className={styles.tableth}>Roll_No</th>
                      <th className={styles.tableth}>Student_Name</th>
                      <th className={styles.tableth}>Gender</th>
                      <th className={styles.tableth}>
                        Academin_Fee ({monthnamelist[month]})
                      </th>
                      <th className={styles.tableth}>
                        Hostel_Fee ({monthnamelist[month]})
                      </th>
                      <th className={styles.tableth}>
                        Transport_fee ({monthnamelist[month]})
                      </th>
                    </tr>
                    {isdata?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td  className={styles.tabletd}>
                            {item?.student?.Session}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.student?.SrNumber}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.student?.rollnumber}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.student?.name}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.student?.Gender}
                          </td>

                          <td className={styles.tabletd}>
                            {item?.schollfee[0]?.paidStatus ? "Paid" : "Dues"}
                            {item?.schollfee[0]?.PerMonthFee}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.hostelfee[0]?.paidStatus ? "Paid" : "Dues"}
                            {item?.hostelfee[0]?.PerMonthFee}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.transportfee[0]?.paidStatus ? "Paid" : "Dues"}
                            {item?.transportfee[0]?.PerMonthFee}
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
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Balancefee;
