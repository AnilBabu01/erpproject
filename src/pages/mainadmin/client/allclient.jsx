import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { getEmployee } from "../../../redux/actions/commanAction";
import styles from "../../../pages/school/employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import UpdateEmp from "../../../component/Institute/employee/UpdateEmp";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";

function AllClient() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const [deleting, setdeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [empId, setempId] = useState("");
  const [isdata, setisData] = useState([]);
  const [loading, setloading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  const ClickOpenupdate = (data) => {
    setOpenupdate(true);
    setupdatedata(data);
  };

  const ClickOpendelete = (id) => {
    setOpenalert(true);
    setdeleteid(id);
  };

  const handleClosedelete = () => {
    setOpenalert(false);
  };

  const handledelete = () => {
    setdeleting(true);
    serverInstance(`admin/getClient`, "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        dispatch(getEmployee());
        handleClosedelete();
        setdeleting(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        handleClosedelete();
        setdeleting(false);
      }
    });
  };

  const GetActiveClient = () => {
    setloading(true);
    serverInstance(`admin/getClient`, "get").then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setloading(false);
        setisData(res?.data);
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
    GetActiveClient();
    dispatch(loadUser());
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    serverInstance(`admin/getClient`, "get").then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });

        setisData(res?.data);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
      }
    });
  };

  const reset = () => {
   
    GetActiveClient();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const ExportToExcel = (isData) => {
    const fileName = "EmployeeListReport";
    const exportType = "xls";
    var data = [];

    isData.map((item) => {
      data.push({
        Emp_Id: item?.empId,
        Emp_Name: item?.name,
        Emp_Email: item?.email,
        Emp_Phone: item?.phoneno1,
        Emp_Phone: item?.phoneno2,
        Designation: item?.employeeof,
        Department: item?.department,
        Joining_Date: moment(item?.joiningdate).format("MM/DD/YYYY"),
        Resign_Date: moment(item?.resigndate).format("MM/DD/YYYY"),
        Status: item?.state,
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };
  return (
    <>
      {openupdate && (
        <div>
          <Dialog
            open={openupdate}
            TransitionComponent={Transition}
            // onClose={handleCloseupadte}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "70rem",
                },
              },
            }}
          >
            <UpdateEmp setOpen={setOpenupdate} updatedata={updatedata} />
          </Dialog>
        </div>
      )}

      {openalert && (
        <>
          <Dialog
            open={openalert}
            // onClose={handleClosedelete}
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
                {deleting ? (
                  <CircularProgress size={25} style={{ color: "red" }} />
                ) : (
                  "Agree"
                )}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <form onSubmit={filterdata} className={styles.searchoptiondiv}>
                <input
                  className={styles.opensearchinput10}
                  type="text"
                  placeholder="Client Id"
                  value={empId}
                  name="empId"
                  onChange={(e) => setempId(e.target.value)}
                />

                <button>Search</button>
              </form>
              <button onClick={() => reset()}>Reset</button>
            </div>
            <div className={styles.imgdivformat}>
              {/* <img
                onClick={() => handlePrint()}
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              /> */}
              {/* <img
              onClick={()=>ExportToExcel()}
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

          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable} ref={componentRef}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Sr.NO</th>
                    <th className={styles.tableth}>Emp_Id</th>
                    <th className={styles.tableth}>Emp_Name</th>
                    <th className={styles.tableth}>Emp_Email</th>
                    <th className={styles.tableth}>Emp_Phone</th>
                    <th className={styles.tableth}>Emp_Phone</th>
                    <th className={styles.tableth}>Designation</th>
                    <th className={styles.tableth}>Department</th>
                    <th className={styles.tableth}>Joining_Date</th>
                    <th className={styles.tableth}>Resign_Date</th>
                    <th className={styles.tableth}>Status</th>
                    <th className={styles.tableth}>Action</th>
                  </tr>
                  {isdata?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>{item?.empId}</td>
                        <td className={styles.tabletd}>{item?.name}</td>
                        <td className={styles.tabletd}>{item?.email}</td>
                        <td className={styles.tabletd}>{item?.phoneno1}</td>
                        <td className={styles.tabletd}>{item?.phoneno2}</td>
                        <td className={styles.tabletd}>{item?.employeeof}</td>
                        <td className={styles.tabletd}>{item?.department} </td>
                        <td className={styles.tabletd}>
                          {moment(item?.joiningdate).format("MM/DD/YYYY")}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.resigndate
                            ? moment(item?.resigndate).format("MM/DD/YYYY")
                            : "----------"}
                        </td>
                        <td className={styles.tabletd}>{item?.status}</td>
                        <td className={styles.tabkeddd}>
                          <img
                            onClick={() => ClickOpendelete(item?.id)}
                            src="/images/Delete.png"
                            alt="imgss"
                          />
                          <img
                            onClick={() => ClickOpenupdate(item)}
                            src="/images/Edit.png"
                            alt="imgss"
                          />
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

export default AllClient;
