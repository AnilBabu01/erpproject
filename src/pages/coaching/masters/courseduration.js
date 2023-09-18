import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseDuration,
  deleteCourseDuration,
} from "../../../redux/actions/commanAction";
import styles from "../employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import Adddepart from "@/component/Coaching/masters/AddDuration";
import Updatedepart from "@/component/Coaching/masters/UpdateDuartion";
function courseduration() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [isdata, setisData] = useState([]);
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { courseduarion } = useSelector((state) => state.getCourseDur);

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
    dispatch(deleteCourseDuration(deleteid, setOpenalert));
  };

  useEffect(() => {
    if (courseduarion) {
      setisData(courseduarion);
    }
    if (user) {
      setuserdata(user);
    }
  }, [courseduarion, user]);
  useEffect(() => {
    dispatch(getCourseDuration());
  }, [open, openupdate, openalert]);
  return (
    <>
      {open && (
        <div>
          <Dialog
            open={open}
            // TransitionComponent={Transition}
            onClose={handleCloseregister}
            aria-describedby="alert-dialog-slide-description"
          >
            <Adddepart setOpen={setOpen} />
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
          >
            <Updatedepart setOpen={setOpenupdate} updatedata={updatedata} />
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
              <form className={styles.searchoptiondiv}>
                <input
                  className={styles.opensearchinput}
                  type="text"
                  placeholder="Search By Name"
                />

                <button>Search</button>
              </form>
              <button>Reset</button>
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
                userdata?.data && userdata?.data[0]?.userType === "institute"
                  ? styles.addtopmenubarbuttonactive
                  : userdata?.data && userdata?.data[0]?.masterWrite === true
                  ? styles.addtopmenubarbuttonactive
                  : styles.addtopmenubarbuttondisable
              }
              disabled={
                userdata?.data && userdata?.data[0]?.userType === "institute"
                  ? false
                  : userdata?.data && userdata?.data[0]?.masterWrite === true
                  ? false
                  : true
              }
              onClick={() => handleClickOpen()}
            >
              Add Course Duration
            </button>
          </div>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>S.NO</th>
                    <th className={styles.tableth}>Course Duration</th>
                    <th className={styles.tableth}>Action</th>
                  </tr>
                  {isdata?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>{item?.noOfMonth}</td>

                        <td className={styles.tabkeddd}>
                          <button
                            disabled={
                              userdata?.data &&
                              userdata?.data[0]?.userType === "institute"
                                ? false
                                : userdata?.data &&
                                  userdata?.data[0]?.masterDelete === true
                                ? false
                                : true
                            }
                          >
                            <img
                              className={
                                userdata?.data &&
                                userdata?.data[0]?.userType === "institute"
                                  ? styles.tabkedddimgactive
                                  : userdata?.data &&
                                    userdata?.data[0]?.masterDelete === true
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
                              userdata?.data[0]?.userType === "institute"
                                ? false
                                : userdata?.data &&
                                  userdata?.data[0]?.masterEdit === true
                                ? false
                                : true
                            }
                          >
                            <img
                              className={
                                userdata?.data &&
                                userdata?.data[0]?.userType === "institute"
                                  ? styles.tabkedddimgactive
                                  : userdata?.data &&
                                    userdata?.data[0]?.masterEdit === true
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
    </>
  );
}

export default courseduration;
