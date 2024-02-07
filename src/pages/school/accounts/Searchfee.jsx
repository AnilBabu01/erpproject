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

function Searchfee() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const [filtering, setfiltering] = useState(false);
  const [stream, setstream] = useState("");
  const [seno, setseno] = useState("");
  const [studentName, setstudentName] = useState('');
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
        // toast.success(res?.msg, {
        //   autoClose: 1000,
        // });
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
    getsearchfee();
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
      studentName
    }).then((res) => {
      if (res?.status === true) {
        // toast.success(res?.msg, {
        //   autoClose: 1000,
        // });
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
                  placeholder="Name"
                  value={studentName}
                  name="studentName"
                  onChange={(e) => setstudentName(e.target.value)}
                />
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
            {isdata?.map((item, index) => {
              return (
                <div key={index} className={styles.tablecontainer}>
                  <div className={styles.feeheader}>
                    <p>Session : {item?.student?.Session}</p>
                    <p>SRNO : {item?.student?.SrNumber}</p>
                    <p>Roll_No : {item?.student?.rollnumber}</p>
                    <p>Student_Name : {item?.student?.name}</p>
                    <p>Gender : {item?.student?.Gender}</p>
                  </div>
                  <div className={styles.academyfee}>
                    <p>Academin Fee</p>
                    <table className={styles.tabletable}>
                      <tbody>
                        <tr className={styles.tabletr}>
                          <th className={styles.tableth}>April</th>
                          <th className={styles.tableth}>May</th>
                          <th className={styles.tableth}>June</th>
                          <th className={styles.tableth}>July</th>
                          <th className={styles.tableth}>Aug</th>
                          <th className={styles.tableth}>Sep</th>
                          <th className={styles.tableth}>Oct</th>
                          <th className={styles.tableth}>Nov</th>
                          <th className={styles.tableth}>Dec</th>
                          <th className={styles.tableth}>Jan</th>
                          <th className={styles.tableth}>Feb</th>
                          <th className={styles.tableth}>March</th>
                          <th className={styles.tableth}>Total_Paid</th>
                          <th className={styles.tableth}>Total_Dues</th>
                        </tr>
                        <tr>
                          {item?.schollfee
                            ?.sort(compareMonths)
                            ?.map((data, index) => {
                              return (
                                <td key={index} className={styles.tabletd}>
                                  {data?.paidStatus ? "Paid" : "Dues"} (
                                  {data?.PerMonthFee})
                                </td>
                              );
                            })}

                          <td className={styles.tabletd}>
                            {item?.student?.paidfee}
                          </td>
                          <td className={styles.tabletd}>
                            {Number(item?.student?.studentTotalFee) -
                              Number(item?.student?.paidfee)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {item?.student?.hostal && (
                    <>
                      <div className={styles.academyfee}>
                        <p>Hostel Fee</p>
                        <table className={styles.tabletable}>
                          <tbody>
                            <tr className={styles.tabletr}>
                              <th className={styles.tableth}>April</th>
                              <th className={styles.tableth}>May</th>
                              <th className={styles.tableth}>June</th>
                              <th className={styles.tableth}>July</th>
                              <th className={styles.tableth}>Aug</th>
                              <th className={styles.tableth}>Sep</th>
                              <th className={styles.tableth}>Oct</th>
                              <th className={styles.tableth}>Nov</th>
                              <th className={styles.tableth}>Dec</th>
                              <th className={styles.tableth}>Jan</th>
                              <th className={styles.tableth}>Feb</th>
                              <th className={styles.tableth}>March</th>
                              <th className={styles.tableth}>Total_Paid</th>
                              <th className={styles.tableth}>Total_Dues</th>
                            </tr>
                            <tr>
                              {item?.hostelfee
                                ?.sort(compareMonths)
                                ?.map((data, index) => {
                                  return (
                                    <td key={index} className={styles.tabletd}>
                                      {data?.paidStatus ? "Paid" : "Dues"} (
                                      {data?.PerMonthFee})
                                    </td>
                                  );
                                })}
                              <td className={styles.tabletd}>
                                {item?.student?.HostelPaidFee}
                              </td>
                              <td className={styles.tabletd}>
                                {Number(item?.student?.TotalHostelFee) -
                                  Number(item?.student?.HostelPaidFee)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {item?.student?.Transport && (
                    <>
                      <div className={styles.academyfee}>
                        <p>Transport Fee</p>
                        <table className={styles.tabletable}>
                          <tbody>
                            <tr className={styles.tabletr}>
                              <th className={styles.tableth}>April</th>
                              <th className={styles.tableth}>May</th>
                              <th className={styles.tableth}>June</th>
                              <th className={styles.tableth}>July</th>
                              <th className={styles.tableth}>Aug</th>
                              <th className={styles.tableth}>Sep</th>
                              <th className={styles.tableth}>Oct</th>
                              <th className={styles.tableth}>Nov</th>
                              <th className={styles.tableth}>Dec</th>
                              <th className={styles.tableth}>Jan</th>
                              <th className={styles.tableth}>Feb</th>
                              <th className={styles.tableth}>March</th>
                              <th className={styles.tableth}>Total_Paid</th>
                              <th className={styles.tableth}>Total_Dues</th>
                            </tr>
                            <tr>
                              {item?.transportfee
                                ?.sort(compareMonths)
                                ?.map((data, index) => {
                                  return (
                                    <td key={index} className={styles.tabletd}>
                                      {data?.paidStatus ? "Paid" : "Dues"} (
                                      {data?.PerMonthFee})
                                    </td>
                                  );
                                })}
                              <td className={styles.tabletd}>
                                {item?.student?.TransportPaidFee}
                              </td>
                              <td className={styles.tabletd}>
                                {Number(
                                  item?.student?.TransportTotalHostelFee
                                ) - Number(item?.student?.TransportPaidFee)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  <div className={styles.academyfee}>
                    <p>Other Fee</p>
                    <table className={styles.tabletable}>
                      <tbody>
                        <tr className={styles.tabletr}>
                          <th className={styles.tableth}>April</th>
                          <th className={styles.tableth}>May</th>
                          <th className={styles.tableth}>June</th>
                          <th className={styles.tableth}>July</th>
                          <th className={styles.tableth}>Aug</th>
                          <th className={styles.tableth}>Sep</th>
                          <th className={styles.tableth}>Oct</th>
                          <th className={styles.tableth}>Nov</th>
                          <th className={styles.tableth}>Dec</th>
                          <th className={styles.tableth}>Jan</th>
                          <th className={styles.tableth}>Feb</th>
                          <th className={styles.tableth}>March</th>
                        </tr>
                        <tr>
                          {item?.otherfee
                            ?.sort(compareMonths)
                            ?.map((data, index) => {
                              return (
                                <td key={index} className={styles.tabletd}>
                                  {data?.paidStatus ? "Paid" : "Dues"} (
                                  {data?.PerMonthFee})
                                </td>
                              );
                            })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Searchfee;
