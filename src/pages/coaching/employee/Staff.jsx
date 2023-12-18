import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getEmployee,
  deleteEmployee,
  getDepartment,
  getDesignation,
} from "../../../redux/actions/commanAction";
import styles from "../employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import AddEmp from "../../../component/Institute/employee/AddEmp";
import UpdateEmp from "../../../component/Institute/employee/UpdateEmp";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left", value: "Left" },
];
function Staff() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const [scoursename, setscoursename] = useState("");
  const [sfathers, setsfathers] = useState("");
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
  const [empId, setempId] = useState("");
  const [empdesination, setempdesination] = useState("");
  const [empdeparment, setempdeparment] = useState("");
  const [departList, setdepartList] = useState([]);
  const [designList, setdesignList] = useState([]);
  const [isdata, setisData] = useState([]);
  const { loading, employees } = useSelector((state) => state.getemp);
  const { department } = useSelector((state) => state.getpart);
  const { designation } = useSelector((state) => state.getdesignation);
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
    if (employees) {
      setisData(employees);
    }
    if (department) {
      setdepartList(department);
    }
    if (designation) {
      setdesignList(designation);
    }
  }, [employees, department, designation]);
  useEffect(() => {
    dispatch(getEmployee());
  }, [open, openupdate, openalert]);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getDepartment());
    dispatch(getDesignation());
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    dispatch(
      getEmployee(
        fromdate,
        todate,
        sstudent,
        status,
        empId,
        empdeparment,
        empdesination
      )
    );
  };

  const reset = () => {
    setsstudent("");
    setempId("");
    setstatus("");
    setempdeparment("");
    setempdesination("");
    dispatch(getEmployee());
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
            <AddEmp setOpen={setOpen} />
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
                  value={empId}
                  name="empId"
                  onChange={(e) => setempId(e.target.value)}
                />
                <input
                  className={styles.opensearchinput10}
                  type="text"
                  placeholder="Name"
                  value={sstudent}
                  name="sstudent"
                  onChange={(e) => setsstudent(e.target.value)}
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
                  value={empdeparment}
                  name="empdeparment"
                  onChange={(e) => setempdeparment(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    ALL Department
                  </option>

                  {departList?.length > 0 &&
                    departList?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.DepartmentName}
                        >
                          {item?.DepartmentName}
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
                  value={empdesination}
                  name="empdesination"
                  onChange={(e) => setempdesination(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    ALL Designation
                  </option>

                  {designList?.length > 0 &&
                    designList?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.employeetype}
                        >
                          {item?.employeetype}
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
                onClick={() => handlePrint()}
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />
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

          <div className={styles.addtopmenubar}>
            <button onClick={() => handleClickOpen()}>Add Employee</button>
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

export default Staff;
