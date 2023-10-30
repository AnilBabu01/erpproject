import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { UpdateEmployee } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";

const formData = new FormData();
function UpdateEmp({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [isdata1, setisdata1] = useState([]);
  const [showpermission, setshowpermission] = useState(false);
  const [designationname, setdesignationname] = useState("");
  const [depart, setdepart] = useState("");
  const [status, setstatus] = useState("Active");
  const [empname, setempname] = useState("");
  const [empemail, setempemail] = useState("");
  const [empphone1, setempphone1] = useState("");
  const [empphone2, setempphone2] = useState("");
  const [joiningdate, setjoiningdate] = useState("");
  const [frontoffice, setfrontoffice] = useState(false);
  const [frontofficeR, setfrontofficeR] = useState(false);
  const [frontofficeW, setfrontofficeW] = useState(false);
  const [frontofficeE, setfrontofficeE] = useState(false);
  const [frontofficeD, setfrontofficeD] = useState(false);
  const [student, setstudent] = useState(false);
  const [studentR, setstudentR] = useState(false);
  const [studentW, setstudentW] = useState(false);
  const [studentE, setstudentE] = useState(false);
  const [studentD, setstudentD] = useState(false);
  const [Attendance, setAttendance] = useState(false);
  const [AttendanceR, setAttendanceR] = useState(false);
  const [AttendanceW, setAttendanceW] = useState(false);
  const [AttendanceE, setAttendanceE] = useState(false);
  const [AttendanceD, setAttendanceD] = useState(false);
  const [Accounts, setAccounts] = useState(false);
  const [AccountsR, setAccountsR] = useState(false);
  const [AccountsW, setAccountsW] = useState(false);
  const [AccountsE, setAccountsE] = useState(false);
  const [AccountsD, setAccountsD] = useState(false);
  const [HumanResourse, setHumanResourse] = useState(false);
  const [HumanResourseR, setHumanResourseR] = useState(false);
  const [HumanResourseW, setHumanResourseW] = useState(false);
  const [HumanResourseE, setHumanResourseE] = useState(false);
  const [HumanResourseD, setHumanResourseD] = useState(false);
  const [Masters, setMasters] = useState(false);
  const [MastersR, setMastersR] = useState(false);
  const [MastersW, setMastersW] = useState(false);
  const [MastersE, setMastersE] = useState(false);
  const [MastersD, setMastersD] = useState(false);
  const [reports, setreports] = useState(false);
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [state, setstate] = useState("");
  const [profileimg, setprofileimg] = useState("");
  const [viewprofile, setviewprofile] = useState("");
  const [resumeimg, setresumeimg] = useState("");
  const [viewresumefile, setviewresumefile] = useState("");
  const [offerlater, setofferlater] = useState("");
  const [viewofferlater, setviewofferlater] = useState("");
  const [joninglater, setjoninglater] = useState("");
  const [viewjoninglater, setviewjoninglater] = useState("");
  const [accountholdername, setaccountholdername] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [bankName, setbankName] = useState("");
  const [branchname, setbranchname] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const [basicsalary, setbasicsalary] = useState("");
  const [allowance, setallowance] = useState("");
  const [deduction, setdeduction] = useState("");
  const [totalsalary, settotalsalary] = useState("");
  const { designation } = useSelector((state) => state.getdesignation);
  const { department } = useSelector((state) => state.getpart);
  const { user } = useSelector((state) => state.auth);
  const submit = (e) => {
    e.preventDefault();
    formData.set("id", updatedata?.id);
    formData.set("name", empname);
    formData.set("email", empemail);
    formData.set("phoneno1", empphone1);
    formData.set("phoneno2", empphone2);
    formData.set("city", city);
    formData.set("state", state);
    formData.set("pincode", pincode);
    formData.set("employeeof", designationname);
    formData.set("department", depart);
    formData.set("joiningdate", joiningdate);
    formData.set("address", address);

    formData.set("profileurl", profileimg);
    formData.set("basicsalary", basicsalary);
    formData.set("Allowance", allowance);
    formData.set("Deduction", deduction);
    formData.set(
      "TotalSalary",
      Number(basicsalary) + Number(allowance) - Number(deduction)
    );
    formData.set("AccountHolder", accountholdername);
    formData.set("AccountNumber", accountNumber);
    formData.set("BankName", bankName);
    formData.set("Branch", branchname);
    formData.set("IfscCode", ifscCode);
    formData.set("ResumeFile", resumeimg);
    formData.set("OfferLater", offerlater);
    formData.set("JoningLater", joninglater);

    formData.set("fronrofice", frontoffice);
    formData.set("fronroficeRead", frontoffice);
    formData.set("fronroficeWrite", frontofficeW);
    formData.set("fronroficeEdit", frontofficeE);
    formData.set("fronroficeDelete", frontofficeD);

    formData.set("student", student);
    formData.set("studentRead", student);
    formData.set("studentWrite", studentW);
    formData.set("studentEdit", studentE);
    formData.set("studentDelete", studentD);

    formData.set("attendance", Attendance);
    formData.set("attendanceRead", Attendance);
    formData.set("attendanceWrite", AttendanceW);
    formData.set("attendanceEdit", AttendanceE);
    formData.set("attendanceDelete", AttendanceD);

    formData.set("accounts", Accounts);
    formData.set("accountsRead", Accounts);
    formData.set("accountsWrite", AccountsW);
    formData.set("accountsEdit", AccountsE);
    formData.set("accountsDelete", AccountsD);

    formData.set("HumanResource", HumanResourse);
    formData.set("HumanResourceRead", HumanResourse);
    formData.set("HumanResourceWrite", HumanResourseW);
    formData.set("HumanResourceEdit", HumanResourseE);
    formData.set("HumanResourceDelete", HumanResourseD);

    formData.set("master", Masters);
    formData.set("masterRead", Masters);
    formData.set("masterWrite", MastersW);
    formData.set("masterEdit", MastersE);
    formData.set("masterDelete", MastersD);

    formData.set("report", reports);

    formData.set("status", status);
    dispatch(UpdateEmployee(formData, setOpen));
  };

  useEffect(() => {
    setisData(designation);
    setisdata1(department, department);
  }, [designation]);

  useEffect(() => {
    if (updatedata) {
      setaddress(updatedata?.address);
      setempname(updatedata?.name);
      setempemail(updatedata?.email);
      setdesignationname(updatedata?.employeeof);
      setdepart(updatedata?.department);
      setcity(updatedata?.city);
      setstate(updatedata?.state);
      setpincode(updatedata?.pincode);
      setempphone1(updatedata?.phoneno1);
      setempphone2(updatedata?.phoneno2);
      setjoiningdate(
        new Date(updatedata?.joiningdate).toISOString().substring(0, 10)
      );
      setstate(updatedata?.status);
      setfrontoffice(updatedata?.fronrofice);
      setstudent(updatedata?.student);
      setAttendance(updatedata?.attendance);
      setAccounts(updatedata?.accounts);
      setHumanResourse(updatedata?.HumanResource);
      setMasters(updatedata?.master);
      setreports(updatedata?.report);
      setfrontofficeR(updatedata?.fronroficeRead);
      setfrontofficeW(updatedata?.fronroficeWrite);
      setfrontofficeE(updatedata?.fronroficeEdit);
      setfrontofficeD(updatedata?.fronroficeDelete);
      setstudentR(updatedata?.studentRead);
      setstudentW(updatedata?.studentWrite);
      setstudentE(updatedata?.studentEdit);
      setstudentD(updatedata?.studentDelete);
      setAttendance(updatedata?.attendance);
      setAttendanceR(updatedata?.attendanceRead);
      setAttendanceW(updatedata?.attendanceWrite);
      setAttendanceE(updatedata?.attendanceEdit);
      setAttendanceD(updatedata?.attendanceDelete);
      setMastersR(updatedata?.masterRead);
      setMastersW(updatedata?.masterWrite);
      setMastersE(updatedata?.masterEdit);
      setMastersD(updatedata?.masterDelete);
      setHumanResourseR(updatedata?.HumanResourceRead);
      setHumanResourseW(updatedata?.HumanResourceWrite);
      setHumanResourseE(updatedata?.HumanResourceEdit);
      setHumanResourseD(updatedata?.HumanResourceDelete);
      setAccountsR(updatedata?.accountsRead);
      setAccountsW(updatedata?.accountsWrite);
      setAccountsE(updatedata?.accountsEdit);
      setAccountsD(updatedata?.accountsDelete);
      setbasicsalary(updatedata?.basicsalary);
      setallowance(updatedata?.Allowance);
      setdeduction(updatedata?.Deduction);
      settotalsalary(updatedata?.TotalSalary);
      setaccountholdername(updatedata?.AccountHolder);
      setaccountNumber(updatedata?.AccountNumber);
      setbankName(updatedata?.BankName);
      setbranchname(updatedata?.Branch);
      setifscCode(updatedata?.IfscCode);
    }
  }, []);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add New Employee</h1>
        <form onSubmit={submit}>
          {showpermission ? (
            <>
              <div className={styles.divmaininput}>
                <div className={styles.mainperdiv}>
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setfrontoffice(e.target.checked);
                      }}
                    />
                    <label className={styles.mainper}>F Office</label>
                  </div>
                  {frontoffice && (
                    <>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          disabled={true}
                          checked={frontoffice}
                          value={frontoffice}
                          onChange={(e) => {
                            setfrontofficeR(e.target.checked);
                          }}
                        />
                        <label>Read</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setfrontofficeW(e.target.checked);
                          }}
                        />
                        <label>Write</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setfrontofficeE(e.target.checked);
                          }}
                        />
                        <label>Edit</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setfrontofficeD(e.target.checked);
                          }}
                        />
                        <label>Delete</label>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.mainperdiv}>
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setstudent(e.target.checked);
                      }}
                    />
                    <label className={styles.mainper}>Student</label>
                  </div>
                  {student && (
                    <>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          value={student}
                          disabled={true}
                          checked={student}
                          onChange={(e) => {
                            setstudentR(e.target.checked);
                          }}
                        />
                        <label>Read</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setstudentW(e.target.checked);
                          }}
                        />
                        <label>Write</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setstudentE(e.target.checked);
                          }}
                        />
                        <label>Edit</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setstudentD(e.target.checked);
                          }}
                        />
                        <label>Delete</label>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.mainperdiv}>
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setAttendance(e.target.checked);
                      }}
                    />
                    <label className={styles.mainper}>Attendance</label>
                  </div>
                  {Attendance && (
                    <>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          value={Attendance}
                          disabled={true}
                          checked={Attendance}
                          onChange={(e) => {
                            setAttendanceR(e.target.checked);
                          }}
                        />
                        <label>Read</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setAttendanceW(e.target.checked);
                          }}
                        />
                        <label>Write</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setAttendanceE(e.target.checked);
                          }}
                        />
                        <label>Edit</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setAttendanceD(e.target.checked);
                          }}
                        />
                        <label>Delete</label>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.mainperdiv}>
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setAccounts(e.target.checked);
                      }}
                    />
                    <label className={styles.mainper}>Accounts</label>
                  </div>
                  {Accounts && (
                    <>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          value={Accounts}
                          disabled={true}
                          checked={Accounts}
                          onChange={(e) => {
                            setAccountsR(e.target.checked);
                          }}
                        />
                        <label>Read</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setAccountsW(e.target.checked);
                          }}
                        />
                        <label>Write</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setAccountsE(e.target.checked);
                          }}
                        />
                        <label>Edit</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setAccountsD(e.target.checked);
                          }}
                        />
                        <label>Delete</label>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.mainperdiv}>
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setHumanResourse(e.target.checked);
                      }}
                    />
                    <label className={styles.mainper}>HR</label>
                  </div>
                  {HumanResourse && (
                    <>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          value={HumanResourse}
                          disabled={true}
                          checked={HumanResourse}
                          onChange={(e) => {
                            setHumanResourseR(e.target.checked);
                          }}
                        />
                        <label>Read</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setHumanResourseW(e.target.checked);
                          }}
                        />
                        <label>Write</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setHumanResourseE(e.target.checked);
                          }}
                        />
                        <label>Edit</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setHumanResourseD(e.target.checked);
                          }}
                        />
                        <label>Delete</label>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.mainperdiv}>
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setMasters(e.target.checked);
                      }}
                    />
                    <label className={styles.mainper}>Masters</label>
                  </div>
                  {Masters && (
                    <>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          value={Masters}
                          disabled={true}
                          checked={Masters}
                          onChange={(e) => {
                            setMastersR(e.target.checked);
                          }}
                        />
                        <label>Read</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setMastersW(e.target.checked);
                          }}
                        />
                        <label>Write</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setMastersE(e.target.checked);
                          }}
                        />
                        <label>Edit</label>
                      </div>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setMastersD(e.target.checked);
                          }}
                        />
                        <label>Delete</label>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.mainperdiv}>
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setreports(e.target.checked);
                      }}
                    />
                    <label className={styles.mainper}>Reports</label>
                  </div>
                  {reports && (
                    <>
                      <div className={styles.marginper}>
                        <input
                          type="checkbox"
                          checked={reports}
                          disabled={true}
                        />
                        <label>Read</label>
                        <label>&nbsp;</label>
                      </div>
                      <div className={styles.marginper}>
                        <label>&nbsp;</label>
                        <label>&nbsp;</label>
                      </div>
                      <div className={styles.marginper}>
                        <label>&nbsp;</label>
                        <label>&nbsp;</label>
                      </div>
                      <div className={styles.marginper}>
                        <label>&nbsp;</label>
                        <label>&nbsp;</label>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.logbtnstylediv}>
                <button className={styles.logbtnstyle}>Save</button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.mainemployeeInfodiv}>
                <div className={styles.mainemployeeInfodivinnear}>
                  <div className={styles.headingdivicon}>
                    <p>Personal Details</p>
                  </div>

                  <div className={styles.inputdiv}>
                    <label>Employee Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the name"
                      value={empname}
                      name="empname"
                      onChange={(e) => setempname(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputdiv}>
                    <label>Employee Email</label>
                    <input
                      required
                      type="email"
                      placeholder="Enter the Official Email"
                      value={empemail}
                      name="empemail"
                      onChange={(e) => setempemail(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputdiv}>
                    <label>Phone No1</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the phone No1"
                      value={empphone1}
                      name="empphone1"
                      onChange={(e) => setempphone1(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Phone No2</label>
                    <input
                      type="text"
                      placeholder="Enter the Phone No2"
                      value={empphone2}
                      name="empphone2"
                      onChange={(e) => setempphone2(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>City</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the city"
                      value={city}
                      name="city"
                      onChange={(e) => setcity(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>State</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the State"
                      value={state}
                      name="state"
                      onChange={(e) => setstate(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Pin Code</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Pincode"
                      value={pincode}
                      name="pincode"
                      onChange={(e) => setpincode(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Address</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Address"
                      value={address}
                      name="address"
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Status</label>
                    <Select
                      required
                      className={styles.addwidth}
                      sx={{
                        width: "18.8rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={"Active"}
                      >
                        Active
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={"On Leave"}
                      >
                        On Leave
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={"Left"}
                      >
                        Left
                      </MenuItem>
                    </Select>
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Photo</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        setprofileimg(e.target.files[0]);
                        setviewprofile(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </div>
                  <div className={styles.profilediv}>
                    {viewprofile ? (
                      <>
                        <img
                          alt="img"
                          className="keydetailsdivproimg"
                          src={viewprofile}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="keydetailsdivproimg"
                          src="/images/profileimg.jpg"
                          alt="Logo"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.mainemployeeInfodivinnear}>
                  <div className={styles.headingdivicon}>
                    <p>Organization Details</p>
                  </div>

                  <div className={styles.inputdiv}>
                    <label>Joining Date</label>
                    <input
                      required
                      type="date"
                      value={joiningdate}
                      name="joiningdate"
                      onChange={(e) => setjoiningdate(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputdiv}>
                    <label>Designation</label>
                    <Select
                      required
                      className={styles.addwidth}
                      sx={{
                        width: "18.8rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={designationname}
                      onChange={(e) => setdesignationname(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={""}
                      >
                        Please select
                      </MenuItem>
                      {isdata &&
                        isdata?.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              sx={{
                                fontSize: 14,
                              }}
                              value={item?.employeetype}
                            >
                              {item?.employeetype}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Deparment</label>
                    <Select
                      required
                      className={styles.addwidth}
                      sx={{
                        width: "18.8rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={depart}
                      onChange={(e) => setdepart(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={""}
                      >
                        Please select
                      </MenuItem>
                      {isdata1 &&
                        isdata1?.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              sx={{
                                fontSize: 14,
                              }}
                              value={item?.DepartmentName}
                            >
                              {item?.DepartmentName}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                  <div className={styles.headingdivicon}>
                    <p>Account Login</p>
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Email</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Email"
                      value={address}
                      name="address"
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>

                  <div className={styles.headingdivicon}>
                    <p>Documents</p>
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Resume File</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        setresumeimg(e.target.files[0]);
                        setviewresumefile(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Offer Later</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        setofferlater(e.target.files[0]);
                        setviewofferlater(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Joning Later</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        setjoninglater(e.target.files[0]);
                        setviewjoninglater(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                  </div>
                </div>

                <div className={styles.mainemployeeInfodivinnear}>
                  <div className={styles.headingdivicon}>
                    <p>Fianancial Details</p>
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Basic Salary</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Basic Salary"
                      value={basicsalary}
                      name="basicsalary"
                      onChange={(e) => setbasicsalary(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Allowance</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Allowance"
                      value={allowance}
                      name="allowance"
                      onChange={(e) => setallowance(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Deduction</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Deduction"
                      value={deduction}
                      name="deduction"
                      onChange={(e) => setdeduction(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Total Salary</label>
                    <input
                      required
                      disabled={true}
                      type="text"
                      placeholder="Enter the total salary"
                      value={
                        Number(basicsalary) +
                        Number(allowance) -
                        Number(deduction)
                      }
                      name="totalsalary"
                      onChange={(e) => settotalsalary(e.target.value)}
                    />
                  </div>
                  <div className={styles.headingdivicon}>
                    <p>Bank Details</p>
                  </div>

                  <div className={styles.inputdiv}>
                    <label>Account Holder Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Account Holder Name"
                      value={accountholdername}
                      name="accountholdername"
                      onChange={(e) => setaccountholdername(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Account Number</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Account Number"
                      value={accountNumber}
                      name="accountNumber"
                      onChange={(e) => setaccountNumber(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Bank Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Bank Name"
                      value={bankName}
                      name="bankName"
                      onChange={(e) => setbankName(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Branch </label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Branch"
                      value={branchname}
                      name="branchname"
                      onChange={(e) => setbranchname(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>IFSC CODE</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the IFSC CODE"
                      value={ifscCode}
                      name="ifscCode"
                      onChange={(e) => setifscCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
        {viewresumefile && (
          <>
            <p>Resume Preview</p>
            <img
              alt="img"
              className="dharamshala_imgggg"
              src={viewresumefile}
            />
          </>
        )}
        {viewofferlater && (
          <>
            <p>Offer Later Preview</p>
            <img
              alt="img"
              className="dharamshala_imgggg"
              src={viewofferlater}
            />
          </>
        )}
        {viewjoninglater && (
          <>
            <p>Joining Later Preview</p>
            <img
              alt="img"
              className="dharamshala_imgggg"
              src={viewjoninglater}
            />
          </>
        )}
        {showpermission ? (
          <>
            <div className={styles.logbtnstylediv}>
              <button
                onClick={() => setshowpermission(false)}
                className={styles.logbtnstyle}
              >
                Back
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.logbtnstylediv}>
              <button
                // disabled={empname && empemail && empphone1 ? true : false}
                onClick={() => setshowpermission(true)}
                className={styles.logbtnstyle}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UpdateEmp;
