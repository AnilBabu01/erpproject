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
} from "../../../redux/actions/commanAction";
import styles from "../../coaching/employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Addfee from "../../../component/Institute/accounts/Addfee";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];
function Collectfee() {
  const dispatch = useDispatch();
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
  }, [student, batch, user, courseduarion, course]);

  useEffect(() => {
    dispatch(getstudent());
  }, []);
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
      getstudent(
        fromdate,
        todate,
        scoursename,
        sbatch,
        sstudent,
        sfathers,
        rollnumber,
        status,
        "",
        ""
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
    dispatch(getstudent());
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

                <button>Search</button>
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
            <div className={styles.showfathers}>
              <input
                type="checkbox"
                checked={showfathers}
                value={showfathers}
                onChange={(e) => {
                  setshowfathers(e.target.checked);
                }}
              />
              <label>Show Father&apos s Name</label>
            </div>
          </div>
          <div className={styles.add_divmarginn10}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Roll No</th>
                    <th className={styles.tableth}>Student_Name</th>
                    {showfathers && (
                      <>
                        <th className={styles.tableth}>Father&apos s Name</th>
                      </>
                    )}
                    <th className={styles.tableth}>Adminssion_Date</th>
                    <th className={styles.tableth}>Addmission_Fee</th>
                    <th className={styles.tableth}>Status</th>
                    <th className={styles.tableth}>Total Fee</th>
                    <th className={styles.tableth}>Paid Fee</th>
                    {newmonthnames &&
                      newmonthnames?.map((item, index) => {
                        return (
                          <th key={index} className={styles.tableth}>
                            {item?.month} {item?.year}
                          </th>
                        );
                      })}

                    <th className={styles.tableth}>Action</th>
                  </tr>

                  {isdata?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{item?.rollnumber}</td>
                        <td className={styles.tabletd}>{item?.name}</td>
                        {showfathers && (
                          <>
                            <td className={styles.tabletd}>
                              {item?.fathersName}
                            </td>
                          </>
                        )}
                        <td className={styles.tabletd}>
                          {moment(item?.admissionDate).format("MM/DD/YYYY")}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.Registrationfeestatus == true
                            ? `Paid (${item?.regisgrationfee})`
                            : item?.regisgrationfee}
                        </td>
                        <td className={styles.tabletd}>{item?.Status}</td>
                        <td className={styles.tabletd}>
                          {item?.studentTotalFee}
                        </td>
                        <td className={styles.tabletd}>{item?.paidfee}</td>

                        <td className={styles.tabkeddd}>
                          <button
                            disabled={
                              userdata?.data &&
                              userdata?.data?.User?.userType === "school"
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
                                userdata?.data?.User?.userType === "school"
                                  ? styles.tabkedddimgactive
                                  : userdata?.data &&
                                    userdata?.data[0]?.fronroficeEdit === true
                                  ? styles.tabkedddimgactive
                                  : styles.tabkedddimgdisable
                              }
                              onClick={() => ClickOpenupdate(item)}
                              src="/images/payicons.png"
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

export default Collectfee;
