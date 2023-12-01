import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getEmployee,
  deleteEmployee,
  getDepartment,
  getDesignation,
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
import UpdateEmp from "../../../component/Institute/employee/UpdatePayroll";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import { useRouter } from "next/router";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left", value: "Left" },
];
function Payroll() {
  const dispatch = useDispatch();
  const navigation = useRouter();
  const [scoursename, setscoursename] = useState("");
  const [sfathers, setsfathers] = useState("");
  const [empnamee, setempnamee] = useState("");
  const [empid, setempid] = useState("");
  const [sstudent, setsstudent] = useState("");
  const [empname, setempname] = useState("");
  const [sbatch, setsbatch] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [status, setstatus] = useState("");
  const [batchs, setbatchs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [isdata, setisData] = useState([]);
  const [isemployee, setisemployee] = useState([]);
  const { employees } = useSelector((state) => state.getemp);
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
  }, [payroll, employees]);

  useEffect(() => {
    dispatch(getEmployee());
  }, [open, openupdate, openalert]);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(GetPayRoll());
    dispatch(getDepartment());
    dispatch(getDesignation());
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    dispatch(GetPayRoll(empid, empname));
  };

  const reset = () => {
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
            <button onClick={() => handleClickOpen()}>Add Payroll</button>
          </div>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Sr.No</th>
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
                              "MM/DD/YYYY"
                            )}
                          </td>
                          <td className={styles.tabkeddd}>
                            <img
                              onClick={() => downloadReceipt(item)}
                              src="/images/Print.png"
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

export default Payroll;
