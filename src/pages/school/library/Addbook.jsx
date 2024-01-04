import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBooks } from "../../../redux/actions/liraryAction";
import styles from "../employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import AddBook from "@/component/Institute/student/AddBook";
import UpdateBook from "@/component/Institute/student/UpdateBook";
import moment from "moment";
import { getcourse } from "@/redux/actions/commanAction";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Addbook() {
  const dispatch = useDispatch();
  const [stream, setstream] = useState("");
  const [courseorclass, setcourseorclass] = useState("");
  const [BookId, setBookId] = useState("");
  const [auther, setauther] = useState("");
  const [open, setOpen] = useState(false);
  const [courses, setcourses] = useState("");
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [isdata, setisData] = useState([]);
  const [userdata, setuserdata] = useState("");
  const [courselist, setcourselist] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { loading, books } = useSelector((state) => state.GetBookslist);
  const { course } = useSelector((state) => state.getcourse);

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
    serverInstance("library/addbook", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        dispatch(GetBooks());
        handleClosedelete();
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        handleClosedelete();
      }
    });
  };
  const filter = (e) => {
    e.preventDefault();
    dispatch(GetBooks(courseorclass, BookId, auther,stream));
  };
  const reset = () => {
    setcourseorclass("");
    setauther("");
    setBookId("");
    setstream('');
    dispatch(GetBooks());
  };
  useEffect(() => {
    if (books) {
      setisData(books);
    }
    if (user) {
      setuserdata(user);
    }
    if (course) {
      setcourselist(course);
    }
  }, [books, user, course]);
  useEffect(() => {
    dispatch(GetBooks());
    dispatch(getcourse());
  }, []);
  const ExportToExcel = (isData) => {
    const fileName = "BookListReport";
    const exportType = "xls";
    var data = [];

    isData.map((item) => {
      data.push({
        Class_Name: item?.courseorclass,
        Book_Id: item?.BookId,
        Book_Title: item?.BookTitle,
        Auther_Name: item?.auther,
        Add_Date: moment(item?.admissionDate).format("MM/DD/YYYY"),
        Book_Quantity: item?.Realquantity,
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };
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
            <AddBook setOpen={setOpen} />
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
            <UpdateBook setOpen={setOpenupdate} updatedata={updatedata} />
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
              <form onSubmit={filter} className={styles.searchoptiondiv}>
                <select
                  className={styles.opensearchinput}
                  value={courseorclass}
                  name="courseorclass"
                  onChange={(e) => setcourseorclass(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    All Class
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
                  value={stream}
                  name="stream"
                  onChange={(e) => setstream(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    All Stream
                  </option>
                  <option value={"NONE"}>NONE</option>

                  <option value={"Arts"}>Arts</option>

                  <option value={"COMMERCE"}>COMMERCE</option>

                  <option value={"SCIENCE"}>SCIENCE</option>
                </select>
                <input
                  className={styles.opensearchinput}
                  type="text"
                  placeholder="Search by Book Id"
                  value={BookId}
                  name="BookId"
                  onChange={(e) => setBookId(e.target.value)}
                />
                <input
                  className={styles.opensearchinput}
                  type="text"
                  placeholder="Search by Auther"
                  value={auther}
                  name="auther"
                  onChange={(e) => setauther(e.target.value)}
                />

                <button>Search</button>
              </form>
              <button onClick={() => reset()}>Reset</button>
            </div>
            <div className={styles.imgdivformat}>
              {/* <img
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />
              <img
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
              Add Book
            </button>
          </div>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Sr.No</th>
                    <th className={styles.tableth}>Class</th>
                    <th className={styles.tableth}>Stream</th>
                    <th className={styles.tableth}>Book Id</th>
                    <th className={styles.tableth}>Book Title</th>
                    <th className={styles.tableth}>Auther Name</th>
                    <th className={styles.tableth}>Public Date</th>
                    <th className={styles.tableth}>Book Quantity</th>
                    <th className={styles.tableth}>Action</th>
                  </tr>

                  {isdata?.length > 0 &&
                    isdata?.map((item, index) => {
                      return (
                        <tr key={index} className={styles.tabletr}>
                          <td className={styles.tabletd}>{index + 1}</td>
                          <td className={styles.tableth}>
                            {item?.courseorclass}
                          </td>
                          <td className={styles.tableth}>{item?.stream}</td>
                          <td className={styles.tableth}>{item?.BookId}</td>
                          <td className={styles.tableth}>{item?.BookTitle}</td>
                          <td className={styles.tableth}>{item?.auther}</td>
                          <td className={styles.tableth}>
                            {moment(item?.addDate).format("DD/MM/YYYY")}
                          </td>
                          <th className={styles.tableth}>{item?.quantity}</th>
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
      {loading && (
        <>
          <LoadingSpinner />
        </>
      )}
    </>
  );
}

export default Addbook;
