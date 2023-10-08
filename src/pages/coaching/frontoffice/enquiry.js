import React, { useState, useEffect } from "react";
import { loadUser } from "../../../redux/actions/authActions";
import styles from "../../coaching/employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddEnquiry from "@/component/Coaching/Frontoffice/AddEnquiry";
import UpdateEnquiry from "@/component/Coaching/Frontoffice/UpdateEnquiry";
import {
  getenquiries,
  deleteenquiry,
  getFILTERenquiries,
} from "../../../redux/actions/coachingAction";
import { getcourse } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment  from 'moment';
function Enquiry() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [name, setname] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [isdata, setisData] = useState([]);
  const [page, setPage] = useState(1);
  let limit = 12;
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { loading, enquiry } = useSelector((state) => state.enquiry);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

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
    dispatch(deleteenquiry(deleteid, setOpenalert));
  };
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getenquiries());
    dispatch(getcourse());
  }, []);
  useEffect(() => {
    if (enquiry) {
      setisData(enquiry);
      // setisData(prevItems => [...prevItems,[...enquiry]]);
    }
    if (user) {
      setuserdata(user);
    }
  }, [enquiry, user]);
  useEffect(() => {
    dispatch(getenquiries());
  }, [open, openupdate, openalert]);

  const handlefilter = (e) => {
    e.preventDefault();
    dispatch(getFILTERenquiries(fromdate, todate, name));
  };
  const reset = () => {
    setname("");
    setfromdate("");
    settodate("");
    dispatch(getFILTERenquiries(fromdate, todate, name));
  };
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    dispatch(getenquiries(page, limit, setPage));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
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
                  maxWidth: "60rem",
                },
              },
            }}
          >
            <AddEnquiry setOpen={setOpen} />
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
            <UpdateEnquiry setOpen={setOpenupdate} updatedata={updatedata} />
          </Dialog>
        </div>
      )}

      {openalert && (
        <>
          <Dialog
            open={openalert}
            onClose={handleClosedelete}
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
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <form onSubmit={handlefilter} className={styles.searchoptiondiv}>
                <label>From</label>
                <input
                  className={styles.opensearchinput}
                  type="date"
                  value={fromdate}
                  name="fromdate"
                  onChange={(e) => setfromdate(e.target.value)}
                />
                <label>To</label>
                <input
                  className={styles.opensearchinput}
                  type="date"
                  value={todate}
                  name="todate"
                  onChange={(e) => settodate(e.target.value)}
                />
                <input
                  className={styles.opensearchinput}
                  type="text"
                  placeholder="Search By Name"
                  value={name}
                  name="name"
                  onChange={(e) => setname(e.target.value)}
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
              Add Enquiry
            </button>
          </div>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>S.NO</th>
                    <th className={styles.tableth}>Enquiry Date</th>
                    <th className={styles.tableth}>Student Name</th>
                    <th className={styles.tableth}>Student Number</th>
                    <th className={styles.tableth}>Student Email</th>
                    <th className={styles.tableth}>Address</th>
                    <th className={styles.tableth}>Course</th>
                    <th className={styles.tableth}>Comment</th>
                    <th className={styles.tableth}>Action</th>
                  </tr>

                  {isdata?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                      className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>{ moment(item?.EnquiryDate).format('MM/DD/YYYY')}</td>
                        <td className={styles.tabletd}>{item?.StudentName}</td>
                        <td className={styles.tabletd}>
                          {item?.StudentNumber}
                        </td>
                        <td className={styles.tabletd}>{item?.StudentEmail}</td>
                        <td className={styles.tabletd}>{item?.Address}</td>
                        <td className={styles.tabletd}>{item?.Course}</td>
                        <td className={styles.tabletd}>{item?.Comment}</td>
                        <td className={styles.tabkeddd}>
                          <button
                            disabled={
                              userdata?.data &&
                              userdata?.data?.User?.userType === "institute"
                                ? false
                                : userdata?.data &&
                                  userdata?.data?.User?.fronroficeDelete === true
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
                                    userdata?.data?.User?.fronroficeDelete === true
                                  ? styles.tabkedddimgactive
                                  : styles.tabkedddimgdisable
                              }
                              onClick={() => ClickOpendelete(item?.id)}
                              src="/images/Delete.png"
                              alt="imgss"
                            />
                          </button>
                          <button
                            disabled={
                              userdata?.data &&
                              userdata?.data?.User?.userType === "institute"
                                ? false
                                : userdata?.data &&
                                  userdata?.data?.User?.fronroficeEdit === true
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
                                    userdata?.data?.User?.fronroficeEdit === true
                                  ? styles.tabkedddimgactive
                                  : styles.tabkedddimgdisable
                              }
                              onClick={() => ClickOpenupdate(item)}
                              src="/images/Edit.png"
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

export default Enquiry;
