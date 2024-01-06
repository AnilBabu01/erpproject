import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getcourse,
  getbatch,
  getstudent,
  deletestudent,
  getfee,
  getCourseDuration,
  getPrintReceipt,
} from "../../../redux/actions/commanAction";
import { getCoachingMonthlyFee } from "../../../redux/actions/reportAction";
import styles from "../../coaching/employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Addfee from "../../../component/Coaching/accounts/Addfee";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import { useRouter } from "next/router";

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
    name: "Mark",
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

  3: "Mark",

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

function Feecollection() {
  const navigation = useRouter();
  const dispatch = useDispatch();
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
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
  const { user } = useSelector((state) => state.auth);
  const { loading, monthlyFee } = useSelector(
    (state) => state.getChoachingMonthlyFee
  );
  const { batch } = useSelector((state) => state.getbatch);
  const { courseduarion } = useSelector((state) => state.getCourseDur);
  console.log("monthlyFee", monthlyFee);
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

  const convetobjectsinglekey = (obj, admindate) => {
    let start = new Date(admindate).getMonth();

    let localityParameterSets = Object.entries(obj).map(([key, val]) => ({
      startmonth: start,
      value: val,
    }));
    // let localityParameterSets = Object.entries(obj).map(([key, val]) => ({
    //   name: key,
    //   value: val,
    // }));
    return localityParameterSets?.slice(4, months + 4);
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

  const ClickOpendelete = (id) => {
    setOpenalert(true);
    setdeleteid(id);
  };

  const handleClosedelete = () => {
    setOpenalert(false);
  };

  const handledelete = () => {
    dispatch(deletestudent(deleteid, setOpenalert));
  };

  useEffect(() => {
    if (monthlyFee) {
      setisData(monthlyFee);
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
  }, [monthlyFee, batch, user, courseduarion]);

  useEffect(() => {
    dispatch(getCoachingMonthlyFee());
  }, [open, openupdate, openalert]);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(getfee());
    dispatch(getCourseDuration());
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    dispatch(
      getCoachingMonthlyFee(
        fromdate,
        scoursename,
        sstudent,
        rollnumber,
        month,
        sbatch
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
    dispatch(getCoachingMonthlyFee());
  };

  const downloadReceipt = (data) => {
    navigation.push({
      pathname: "/coaching/student/receipt",
      query: {
        receiptdata: JSON.stringify(data),
      },
    });
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
                  maxWidth: "60rem",
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
                {/* <label>Date</label>
                <input
                  className={styles.opensearchinput}
                  type="date"
                  value={fromdate}
                  name="fromdate"
                  onChange={(e) => setfromdate(e.target.value)}
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
                  value={sbatch}
                  name="sbatch"
                  onChange={(e) => {
                    setsbatch(e.target.value);
                  }}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    Please Select Batch
                  </option>
                  {batchs?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={`${item?.StartingTime} TO ${item?.EndingTime}`}
                      >
                        {item?.StartingTime} TO {item?.EndingTime}
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
                <button>Search</button>
              </form>
              <button onClick={() => reset()}>Reset</button>
            </div>
            <div className={styles.imgdivformat}>
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
                    <th className={styles.tableth}>Roll No</th>
                    <th className={styles.tableth}>Student_Name</th>
                    <th className={styles.tableth}>Course</th>
                    <th className={styles.tableth}>Paid_Date</th>
                    <th className={styles.tableth}>Receipt_Types</th>
                    <th className={styles.tableth}>Paid Amount</th>
                    {/* 
                    <th className={styles.tableth}>Action</th> */}
                  </tr>

                  {isdata?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{item?.RollNo}</td>
                        <td className={styles.tabletd}>{item?.studentName}</td>
                        <td className={styles.tabletd}>{item?.Course}</td>
                        <td className={styles.tabletd}>
                          {moment(item?.PaidDate).format("MM/DD/YYYY")}
                        </td>
                        <td className={styles.tabletd}>{item?.Feetype}</td>
                        <td className={styles.tabletd}>{item?.PaidAmount}</td>
                        {/* 
                        <td className={styles.tabkeddd}>
                          <button
                            disabled={
                              userdata?.data &&
                              userdata?.data?.User?.userType === "institute"
                                ? false
                                : userdata?.data &&
                                  userdata?.data[0]?.fronroficeEdit === true
                                ? false
                                : true
                            }
                          >
                            <img
                              className={
                                userdata?.data &&
                                userdata?.data?.User?.userType === "institute"
                                  ? styles.tabkedddimgactive
                                  : userdata?.data &&
                                    userdata?.data[0]?.fronroficeEdit === true
                                  ? styles.tabkedddimgactive
                                  : styles.tabkedddimgdisable
                              }
                              onClick={() => downloadReceipt(item)}
                              src="/images/Print.png"
                              alt="imgss"
                            />
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                  {isdata?.length === 0 && (
                    <>
                      <tr>
                        <td colSpan={7}>Not Record Found</td>
                      </tr>
                    </>
                  )}
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

export default Feecollection;
