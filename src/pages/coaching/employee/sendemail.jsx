import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getcourse,
  getstudent,
  GetSession,
  GetSection,
} from "../../../redux/actions/commanAction";
import styles from "../../coaching/employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import SendEmail from "../../../component/Coaching/employee/Sendmail";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];

function Sendemail() {
  const dispatch = useDispatch();
  let date = new Date();
  let fullyear = date.getFullYear();
  let lastyear = date.getFullYear() - 1;
  const [sessionname, setsessionname] = useState(`${lastyear}-${fullyear}`);
  const [loading, setloading] = useState(false);
  const [scoursename, setscoursename] = useState("");
  const [sentdate, setsentdate] = useState("");
  const [open, setOpen] = useState(false);
  const [isdata, setisData] = useState([]);
  const [courselist, setcourselist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [sectionname, setsectionname] = useState("NONE");
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.getcourse);
  const { sections } = useSelector((state) => state.GetSection);
  const { Sessions } = useSelector((state) => state.GetSession);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  useEffect(() => {
    if (user) {
      setuserdata(user);
    }
    if (course) {
      setcourselist(course);
    }

    if (Sessions) {
      setsessionList(Sessions);
    }
    if (sections) {
      setsectionList(sections);
    }
  }, [, user, course, Sessions, sections]);

  const Sendmail = () => {
    setloading(true);
    serverInstance("comman/GetSentemailToEmployee", "post").then((res) => {
      if (res?.status === true) {
        // toast.success(res?.msg, {
        //   autoClose: 1000,
        // });
        setisData(res?.data);
        setloading(false);
      }
      if (res?.status === false) {
        // toast.error(res?.msg, {
        //   autoClose: 1000,
        // });

        setloading(false);
      }
    });
  };
  useEffect(() => {
    Sendmail();
  }, [open]);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getcourse());
    dispatch(GetSection());
    dispatch(GetSession());
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("comman/GetSentemailToEmployee", "post", {
      sentdate: sentdate,
    }).then((res) => {
      if (res?.status === true) {
        // toast.success(res?.msg, {
        //   autoClose: 1000,
        // });
        setisData(res?.data);
        setloading(false);
      }
      if (res?.status === false) {
        // toast.error(res?.msg, {
        //   autoClose: 1000,
        // });

        setloading(false);
      }
    });
  };

  const reset = () => {
    setscoursename("");
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
    setsectionname("");
    Sendmail();
  };

  return (
    <>
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
            <SendEmail setOpen={setOpen} />
          </Dialog>
        </div>
      )}

      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <form onSubmit={filterdata} className={styles.searchoptiondiv}>
                <input
                  className={styles.opensearchinput}
                  type="date"
                  value={sentdate}
                  onChange={(e) => setsentdate(e.target.value)}
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
            <button
              className={
                userdata?.data && userdata?.data?.User?.userType === "institute"
                  ? styles.addtopmenubarbuttonactive
                  : userdata?.data && userdata?.data?.User?.masterWrite === true
                  ? styles.addtopmenubarbuttonactive
                  : styles.addtopmenubarbuttondisable
              }
              disabled={
                userdata?.data && userdata?.data?.User?.userType === "institute"
                  ? false
                  : userdata?.data && userdata?.data?.User?.masterWrite === true
                  ? false
                  : true
              }
              onClick={() => handleClickOpen()}
            >
              Send Email
            </button>
          </div>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Sr.No</th>
                    <th className={styles.tableth}>Sent_Date</th>

                    {/* <th className={styles.tableth}>Class</th> */}
                    <th className={styles.tableth}>Subject</th>
                    <th className={styles.tableth}>Sent_Messaage</th>
                    {/* <th className={styles.tableth}>Action</th> */}
                  </tr>
                  {isdata?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>
                          {moment(item?.date).format("DD/MM/YYYY")}
                        </td>

                        {/* <td className={styles.tabletd}>
                          {item?.courseorclass}
                        </td> */}
                        <td className={styles.tabletd}>{item?.Subject}</td>
                        <td className={styles.tabletd}>{item?.Sms}</td>
                        {/* <td className={styles.tabkeddd}>
                          <button
                            className={
                              userdata?.data &&
                              userdata?.data?.User?.userType === "school"
                                ? styles.addtopmenubarbuttonactive
                                : userdata?.data &&
                                  userdata?.data?.User?.masterWrite === true
                                ? styles.addtopmenubarbuttonactive
                                : styles.addtopmenubarbuttondisable
                            }
                            disabled={
                              userdata?.data &&
                              userdata?.data?.User?.userType === "school"
                                ? false
                                : userdata?.data &&
                                  userdata?.data?.User?.masterWrite === true
                                ? false
                                : true
                            }
                            onClick={() => handleClickOpen()}
                          >
                            Resent Email
                          </button>
                        </td> */}
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

export default Sendemail;
