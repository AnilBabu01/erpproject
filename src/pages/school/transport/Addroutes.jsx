import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRoute } from "../../../redux/actions/transportActions";
import styles from "../employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import AddStudentCategory from "@/component/Institute/transport/AddRoutes";
import UpdateCategory from "@/component/Institute/transport/UpdateRoutes";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import { loadUser } from "../../../redux/actions/authActions";
function Addroutes() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [stopName, setstopName] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [isdata, setisData] = useState([]);
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { route, loadinng } = useSelector((state) => state.GetRoute);

  console.log("routes list", route);
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
    serverInstance("transport/vehicleroute", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
        dispatch(GetRoute());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
      }
    });
  };
  const filter = () => {
    dispatch(GetRoute(stopName));
  };

  const reset = () => {
    setstopName("");
    dispatch(GetRoute());
  };
  useEffect(() => {
    if (route) {
      setisData(route);
    }
    if (user) {
      setuserdata(user);
    }
  }, [route, user]);

  useEffect(() => {
    dispatch(GetRoute());
    dispatch(loadUser());
  }, []);

  return (
    <>
      {open && (
        <div>
          <Dialog
            open={open}
            // TransitionComponent={Transition}
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
            <AddStudentCategory setOpen={setOpen} />
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
            <UpdateCategory setOpen={setOpenupdate} updatedata={updatedata} />
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
              <div className={styles.searchoptiondiv}>
                <input
                  className={styles.opensearchinput}
                  type="text"
                  placeholder="Stops Name"
                  value={stopName}
                  name="stopName"
                  onChange={(e) => setstopName(e.target.value)}
                />

                <button onClick={() => filter()}>Search</button>
              </div>
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
              onClick={() => handleClickOpen()}
            >
              Add Route
            </button>
          </div>

          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>S.NO</th>
                    <th className={styles.tableth}>From</th>
                    <th className={styles.tableth}>To</th>
                    <th className={styles.tableth}>Bus Fee Per Month</th>
                    <th className={styles.tableth}>Stop Name</th>
                    <th className={styles.tableth}>Action</th>
                  </tr>
                  {isdata?.length > 0 &&
                    isdata?.map((item, index) => {
                      return (
                        <tr key={index} className={styles.tabletr}>
                          <td className={styles.tabletd}>{index + 1}</td>
                          <td className={styles.tabletd}>
                            {item?.routeName?.FromRoute}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.routeName?.ToRoute}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.routeName?.BusRentPermonth}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.StopName?.map((items, index) => {
                              return (
                                <span key={index}>{items?.StopName} , </span>
                              );
                            })}
                          </td>
                          <td className={styles.tabkeddd}>
                            <button
                              disabled={
                                userdata?.data &&
                                userdata?.data?.User?.userType === "school"
                                  ? false
                                  : userdata?.data &&
                                    userdata?.data?.User?.masterDelete === true
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
                                      userdata?.data?.User?.masterDelete ===
                                        true
                                    ? styles.tabkedddimgactive
                                    : styles.tabkedddimgdisable
                                }
                                onClick={() =>
                                  ClickOpendelete(item?.routeName?.id)
                                }
                                src="/images/Delete.png"
                                alt="imgss"
                              />
                            </button>
                            <button
                              disabled={
                                userdata?.data &&
                                userdata?.data?.User?.userType === "school"
                                  ? false
                                  : userdata?.data &&
                                    userdata?.data?.User?.masterEdit === true
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
                                      userdata?.data?.User?.masterEdit === true
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

      {loadinng && <LoadingSpinner />}
    </>
  );
}

export default Addroutes;
