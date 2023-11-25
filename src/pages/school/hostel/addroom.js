import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCategory,
  GetHostel,
  GetFacility,
  GetRoom,
} from "../../../redux/actions/hostelActions";
import styles from "../employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import AddStudentCategory from "@/component/Institute/hostel/AddRoom";
import UpdateCategory from "@/component/Institute/hostel/UpdateRoom";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
function AddRoom() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [hostelname, sethostelname] = useState("");
  const [hostels, sethostels] = useState([]);
  const [updatedata, setupdatedata] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [isdata, setisData] = useState([]);
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { room,loading } = useSelector((state) => state.GetRoom);
  const { hostel } = useSelector((state) => state.GetHostel);
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
    serverInstance("hostel/addroom", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);

        dispatch(GetRoom());
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
    dispatch(GetRoom(hostelname));
  };

  const reset = () => {
    sethostelname("");
    dispatch(GetRoom());
  };
  useEffect(() => {
    if (room) {
      setisData(room);
    }
    if (user) {
      setuserdata(user);
    }
    if (hostel) {
      sethostels(hostel);
    }
  }, [room, user, hostel]);
  useEffect(() => {
    dispatch(GetCategory());
    dispatch(GetFacility());
    dispatch(GetHostel());
    dispatch(GetRoom());
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
                  value={hostelname}
                  name="hostelname"
                  onChange={(e) => sethostelname(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    All Hostel
                  </option>
                  {hostels?.length > 0 &&
                    hostels?.map((item, index) => {
                      return (
                        <option key={index} value={item?.HostelName}>
                          {item?.HostelName}
                        </option>
                      );
                    })}
                </select>

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
              Add Room
            </button>
          </div>

          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>S.NO</th>
                    <th className={styles.tableth}>Hostel_Name</th>
                    <th className={styles.tableth}>Category</th>
                    <th className={styles.tableth}>Facility</th>
                    <th className={styles.tableth}>FromRoom</th>
                    <th className={styles.tableth}>ToRoom</th>
                    <th className={styles.tableth}>Per Month</th>
                    <th className={styles.tableth}>Action</th>
                  </tr>
                  {isdata?.length > 0 &&
                    isdata?.map((item, index) => {
                      return (
                        <tr key={index} className={styles.tabletr}>
                          <td className={styles.tabletd}>{index + 1}</td>
                          <td className={styles.tabletd}>{item?.hostelname}</td>
                          <td className={styles.tabletd}>{item?.Category}</td>
                          <td className={styles.tabletd}>{item?.Facility}</td>
                          <td className={styles.tabletd}>{item?.FromRoom}</td>
                          <td className={styles.tabletd}>{item?.ToRoom}</td>
                          <td className={styles.tabletd}>
                            {item?.PermonthFee}
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
                                onClick={() => ClickOpendelete(item?.id)}
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
      {loading&&<LoadingSpinner/>}
    </>
  );
}

export default AddRoom;
