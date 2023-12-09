import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getEmployee,
  deleteEmployee,
  getDepartment,
  getDesignation,
  GetSession,
} from "../../../redux/actions/commanAction";
import { GetPayRoll } from "../../../redux/actions/payrollActions";
import styles from "../employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import AddEmp from "../../../component/Institute/employee/AddPayroll";
import UpdateEmp from "../../../component/Institute/employee/UpdatePayRol";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRouter } from "next/router";
import exportFromJSON from "export-from-json";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left", value: "Left" },
];
function EmployeeSalarySlip() {
  const dispatch = useDispatch();
  const navigation = useRouter();
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [userdata, setuserdata] = useState("");
  const [empid, setempid] = useState("");
  const [empname, setempname] = useState("");
  const [sessionList, setsessionList] = useState([]);
  const [sessionname, setsessionname] = useState("");
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [isdata, setisData] = useState([]);
  const [isemployee, setisemployee] = useState([]);
  const { Sessions } = useSelector((state) => state.GetSession);
  const { employees } = useSelector((state) => state.getemp);
  const { user } = useSelector((state) => state.auth);
  const { loading, payroll } = useSelector((state) => state.GetPayRoll);

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
    dispatch(deleteEmployee(deleteid, setOpenalert));
  };

  useEffect(() => {
    if (payroll) {
      setisData(payroll);
    }
    if (employees) {
      setisemployee(employees);
    }
    if (user) {
      setuserdata(user);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
  }, [payroll, employees, user, Sessions]);

  useEffect(() => {
    dispatch(getEmployee());
  }, []);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(GetPayRoll());
    dispatch(getDepartment());
    dispatch(getDesignation());
    dispatch(GetSession());
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    dispatch(GetPayRoll(empid, empname, sessionname, fromdate, todate));
  };

  const reset = () => {
    setfromdate("");
    settodate("");
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
    setempid("");
    setempname("");
    dispatch(GetPayRoll());
  };

  const downloadReceipt = (data) => {
    navigation.push({
      pathname: "/school/employee/PrintSlip",
      query: {
        receiptdata: JSON.stringify(data),
      },
    });
  };
  useEffect(() => {
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
  }, []);

  const ExportToExcel = (isData) => {
    const fileName = "SalaryPaidReport";
    const exportType = "xls";
    var data = [];

    isData.map((item) => {
      data.push({
        Session: item?.monthdetials?.Session,
        Emp_Id: item?.monthdetials?.OrEmpId,
        Emp_Name: item?.monthdetials?.name,
        Emp_Email: item?.monthdetials?.email,
        Designation: item?.monthdetials?.employeeof,
        Department: item?.monthdetials?.department,
        MonthName: item?.monthdetials?.MonthName,
        "Paid Amount": item?.monthdetials?.SalaryPaid,
        "Paid Date": moment(item?.monthdetials?.PaidDate).format("DD/MM/YYYY"),
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
            TransitionComponent={Transition}
            onClose={handleCloseregister}
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
            <AddEmp setOpen={setOpen} updatedata={updatedata} />
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
                <input
                  className={styles.opensearchinput10}
                  type="text"
                  placeholder="Employee Id"
                  value={empid}
                  name="empid"
                  onChange={(e) => setempid(e.target.value)}
                />
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
                  value={empname}
                  name="empname"
                  onChange={(e) => setempname(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    ALL Employee
                  </option>

                  {isemployee?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.name}
                      >
                        {item?.name}
                      </option>
                    );
                  })}
                </select>
                <label>From Date</label>
                <input
                  className={styles.opensearchinput}
                  type="Date"
                  value={fromdate}
                  name="fromdate"
                  onChange={(e) => setfromdate(e.target.value)}
                />
                <label>To Date</label>
                <input
                  className={styles.opensearchinput}
                  type="Date"
                  value={todate}
                  name="todate"
                  onChange={(e) => settodate(e.target.value)}
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

          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Sr.No</th>
                    <th className={styles.tableth}>Session</th>
                    <th className={styles.tableth}>Month Name</th>
                    <th className={styles.tableth}>Emp_ID</th>
                    <th className={styles.tableth}>Emp_Name</th>
                    <th className={styles.tableth}>Designation</th>
                    <th className={styles.tableth}>Department</th>
                    <th className={styles.tableth}>Paid Amount</th>
                    <th className={styles.tableth}>Paid Date</th>
                    <th className={styles.tableth}>Action</th>
                  </tr>
                  {isdata?.length > 0 &&
                    isdata?.map((item, index) => {
                      return (
                        <tr key={index} className={styles.tabletr}>
                          <td className={styles.tabletd}>{index + 1}</td>
                          <td className={styles.tabletd}>
                            {item?.monthdetials?.Session}
                          </td>

                          <td className={styles.tabletd}>
                            {item?.monthdetials?.MonthName}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.monthdetials?.OrEmpId}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.monthdetials?.name}
                          </td>

                          <td className={styles.tabletd}>
                            {item?.monthdetials?.employeeof}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.monthdetials?.department}
                          </td>

                          <td className={styles.tableth}>
                            {item?.monthdetials?.PaidAmount}
                          </td>
                          <td className={styles.tableth}>
                            {moment(item?.monthdetials?.PaidDate).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td className={styles.tabkeddd}>
                            <button
                              disabled={
                                userdata?.data &&
                                userdata?.data?.User?.userType === "school"
                                  ? false
                                  : userdata?.data &&
                                    userdata?.data?.User?.fronroficeEdit ===
                                      true
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
                                      userdata?.data?.User?.fronroficeEdit ===
                                        true
                                    ? styles.tabkedddimgactive
                                    : styles.tabkedddimgdisable
                                }
                                onClick={() => downloadReceipt(item)}
                                src="/images/Print.png"
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

export default EmployeeSalarySlip;
