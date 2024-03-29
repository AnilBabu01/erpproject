import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getEmployee } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import { backendApiUrl } from "../../../config/config";
import { toast } from "react-toastify";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const CasteList = [
  { label: "General", value: "General" },
  { label: "OBC", value: "OBC" },
  { label: "SC", value: "SC" },
  { label: "ST", value: "ST" },
  { label: "Others", value: "Others" },
];

const BloodGroupList = [
  { label: "(A+)", value: "(A+)" },
  { label: "(A-)", value: "(A-)" },
  { label: "(B+)", value: "(B+)" },
  { label: "(B-)", value: "(B-)" },
  { label: "(O+)", value: "(O+)" },
  { label: "(O-)", value: "(O-)" },
  { label: "(AB+)", value: "(AB+)" },
  { label: "(AB-)", value: "(AB-)" },
  {
    label: "Under Investigation OR N.A.",
    value: "Under Investigation OR N.A.",
  },
];

const religionList = [
  { label: "Hinduism", value: "Hinduism" },
  { label: "Muslim", value: "Muslim" },
  { label: "Sikhism", value: "Sikhism" },
  { label: "Buddhism", value: "Buddhism" },
  { label: "Jainism", value: "Jainism" },
  { label: "Christianity", value: "Christianity" },
  { label: "Others", value: "Others" },
];

const GenderListList = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Others", value: "Others" },
];

const OthersTypeEmployeelist = [
  { label: "Sweeper", value: "Sweeper" },
  { label: "Mali", value: "Mali" },
  { label: "Cook", value: "Cook" },
  { label: "Gateman", value: "Gatemane" },
];

const formData = new FormData();

function UpdateEmp({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  const [othertypeEmp, setothertypeEmp] = useState("");
  const [categoryname, setcategoryname] = useState("Please Select");
  const [Religion, setReligion] = useState("");
  const [Nationality, setNationality] = useState("Indian");
  const [gender, setgender] = useState("Male");
  const [BloodGroup, setBloodGroup] = useState("");
  const [isdata, setisData] = useState([]);
  const [isdata1, setisdata1] = useState([]);
  const [loading, setloading] = useState(false);
  const [showpermission, setshowpermission] = useState(false);
  const [typeemployee, settypeemployee] = useState(true);
  const [designationname, setdesignationname] = useState("");
  const [depart, setdepart] = useState("");
  const [status, setstatus] = useState("Active");
  const [empname, setempname] = useState("");
  const [empemail, setempemail] = useState("");
  const [empphone1, setempphone1] = useState("");
  const [empphone2, setempphone2] = useState("");
  const [joiningdate, setjoiningdate] = useState("");
  const [resigndate, setresigndate] = useState("");
  const [leaveNo, setleaveNo] = useState("");
  const [aadharcard, setaadharcard] = useState("");
  const [Drivingimg, setDrivingimg] = useState("");
  const [tenthimg, settenthimg] = useState("");
  const [twethimg, settwethimg] = useState("");
  const [Graduationimg, setGraduationimg] = useState("");
  const [postgraduationimg, setpostgraduationimg] = useState("");
  const [certificateimg1, setcertificateimg1] = useState("");
  const [certificateimg2, setcertificateimg2] = useState("");
  const [certificateimg3, setcertificateimg3] = useState("");
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
  const [empId, setempId] = useState("");
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
  const [allowance1, setallowance1] = useState("");
  const [allowanceAmount1, setallowanceAmount1] = useState("");
  const [allowance2, setallowance2] = useState("");
  const [allowanceAmount2, setallowanceAmount2] = useState("");
  const [allowance3, setallowance3] = useState("");
  const [allowanceAmount3, setallowanceAmount3] = useState("");
  const [deduction1, setdeduction1] = useState("");
  const [deductionAmount1, setdeductionAmount1] = useState("");
  const [deduction2, setdeduction2] = useState("");
  const [deductionAmount2, setdeductionAmount2] = useState("");
  const [fathetrsname, setfathetrsname] = useState("");
  const [totalsalary, settotalsalary] = useState("");
  const [transport, settransport] = useState(false);
  const [transportRead, settransportRead] = useState(false);
  const [transportWrite, settransportWrite] = useState(false);
  const [transportEdit, settransportEdit] = useState(false);
  const [transportDelete, settransportDelete] = useState(false);
  const [library, setlibrary] = useState(false);
  const [libraryRead, setlibraryRead] = useState(false);
  const [libraryWrite, setlibraryWrite] = useState(false);
  const [libraryEdit, setlibraryEdit] = useState(false);
  const [libraryDelete, setlibraryDelete] = useState(false);
  const [hostel, sethostel] = useState(false);
  const [hostelRead, sethostelRead] = useState(false);
  const [hostelWrite, sethostelWrite] = useState(false);
  const [hostelEdit, sethostelEdit] = useState(false);
  const [hostelDelete, sethostelDelete] = useState(false);
  const { designation } = useSelector((state) => state.getdesignation);
  const { department } = useSelector((state) => state.getpart);
  const { user } = useSelector((state) => state.auth);

  const submit = async (e) => {
    e.preventDefault();

    setloading(true);
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
    formData.set("Religion", Religion);
    formData.set("Nationality", Nationality);
    formData.set("Gender", gender);
    formData.set("BloodGroup", BloodGroup);
    formData.set("Caste", categoryname);
    formData.set("profileurl", profileimg);
    formData.set("basicsalary", basicsalary);
    formData.set("Allowance1", allowance1);
    formData.set("AllowanceAmount1", allowanceAmount1);
    formData.set("Allowance2", allowance2);
    formData.set("AllowanceAmount2", allowanceAmount2);
    formData.set("Allowance3", allowance3);
    formData.set("AllowanceAmount3", allowanceAmount3);
    formData.set("Deduction1", deduction1);
    formData.set("DeductionAmount1", deductionAmount1);
    formData.set("Deduction2", deduction2);
    formData.set("DeductionAmount2", deductionAmount2);
    formData.set("AllowLeave", leaveNo);
    formData.set("FathersName", fathetrsname);
    formData.set("Aadharurl", aadharcard);
    formData.set("Drivingurl", Drivingimg);
    formData.set("tenurl", tenthimg);
    formData.set("twelturl", twethimg);
    formData.set("Graduationurl", Graduationimg);
    formData.set("PostGraduationurl", postgraduationimg);
    formData.set("Certificate1url", certificateimg1);
    formData.set("Certificate2url", certificateimg2);
    formData.set("Certificate3url", certificateimg3);
    formData.set(
      "TotalSalary",
      Number(basicsalary) +
        Number(allowanceAmount1) +
        Number(allowanceAmount2) +
        Number(allowanceAmount3) -
        Number(deductionAmount1) -
        Number(deductionAmount2)
    );
    formData.set("empId", empId);
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

    formData.set("transport", transport);
    formData.set("transportRead", transport);
    formData.set("transportWrite", transportWrite);
    formData.set("transportEdit", transportEdit);
    formData.set("transportDelete", transportDelete);

    formData.set("hostel", hostel);
    formData.set("hostelRead", hostel);
    formData.set("hostelWrite", hostelWrite);
    formData.set("hostelEdit", hostelEdit);
    formData.set("hostelDelete", hostelDelete);

    formData.set("library", library);
    formData.set("libraryRead", library);
    formData.set("libraryWrite", libraryWrite);
    formData.set("libraryEdit", libraryEdit);
    formData.set("libraryDelete", libraryDelete);

    formData.set("report", reports);
    formData.set("status", status);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    const { data } = await axios.put(
      `${backendApiUrl}comman/updateemployee`,
      formData,
      config
    );
    console.log("add emp", data);
    if (data?.status === true) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
      setOpen(false);

      setloading(false);
      dispatch(getEmployee());
    }
    if (data?.status === false) {
      toast.error(data?.msg, {
        autoClose: 1000,
      });

      setloading(false);
    }
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
      setresigndate(
        new Date(updatedata?.resigndate).toISOString().substring(0, 10)
      );
      setstatus(updatedata?.status);
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
      // setallowance(updatedata?.Allowance);
      // setdeduction(updatedata?.Deduction);
      settotalsalary(updatedata?.TotalSalary);
      setaccountholdername(updatedata?.AccountHolder);
      setaccountNumber(updatedata?.AccountNumber);
      setbankName(updatedata?.BankName);
      setbranchname(updatedata?.Branch);
      setifscCode(updatedata?.IfscCode);
      setempId(updatedata?.empId);
      setfathetrsname(updatedata?.FathersName);
      setleaveNo(updatedata?.AllowLeave);
      setallowance1(updatedata?.Allowance1);
      setallowanceAmount1(updatedata?.AllowanceAmount1);
      setallowance2(updatedata?.Allowance2);
      setallowanceAmount2(updatedata?.AllowanceAmount2);
      setallowance3(updatedata?.Allowance3);
      setallowanceAmount3(updatedata?.AllowanceAmount3);
      setdeduction1(updatedata?.Deduction1);
      setdeductionAmount1(updatedata?.DeductionAmount1);
      setdeduction2(updatedata?.Deduction2);
      setdeductionAmount2(updatedata?.DeductionAmount2);
      settransport(updatedata?.transport);
      settransportRead(updatedata?.transportRead);
      settransportEdit(updatedata?.transportEdit);
      settransportWrite(updatedata?.transportWrite);
      settransportDelete(updatedata?.transportDelete);
      sethostel(updatedata?.hostel);
      sethostelRead(updatedata?.hostelRead);
      sethostelWrite(updatedata?.hostelWrite);
      sethostelEdit(updatedata?.hostelEdit);
      sethostelDelete(updatedata?.hostelDelete);
      setlibrary(updatedata?.library);
      setlibraryRead(updatedata?.libraryRead);
      setlibraryWrite(updatedata?.libraryWrite);
      setlibraryDelete(updatedata?.libraryDelete);
      setlibraryEdit(updatedata?.libraryEdit);

      setNationality(updatedata?.Nationality);
      setReligion(updatedata?.Religion);
      setgender(updatedata?.Gender);
      setBloodGroup(updatedata?.BloodGroup);
      setcategoryname(updatedata?.Caste);
    }
  }, []);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>
          {showpermission ? "Allow Permission To Be Given " : "Update Employee"}
        </h1>
        <form onSubmit={submit}>
          {showpermission ? (
            <>
              {typeemployee === true ? (
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
                              checked={frontofficeW}
                              type="checkbox"
                              onChange={(e) => {
                                setfrontofficeW(e.target.checked);
                              }}
                            />
                            <label>Write</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={frontofficeE}
                              type="checkbox"
                              onChange={(e) => {
                                setfrontofficeE(e.target.checked);
                              }}
                            />
                            <label>Edit</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={frontofficeD}
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
                              checked={studentW}
                              type="checkbox"
                              onChange={(e) => {
                                setstudentW(e.target.checked);
                              }}
                            />
                            <label>Write</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={studentE}
                              type="checkbox"
                              onChange={(e) => {
                                setstudentE(e.target.checked);
                              }}
                            />
                            <label>Edit</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={studentD}
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
                              checked={AttendanceW}
                              type="checkbox"
                              onChange={(e) => {
                                setAttendanceW(e.target.checked);
                              }}
                            />
                            <label>Write</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={AttendanceE}
                              type="checkbox"
                              onChange={(e) => {
                                setAttendanceE(e.target.checked);
                              }}
                            />
                            <label>Edit</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={AttendanceD}
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
                              checked={AccountsW}
                              type="checkbox"
                              onChange={(e) => {
                                setAccountsW(e.target.checked);
                              }}
                            />
                            <label>Write</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={AccountsW}
                              type="checkbox"
                              onChange={(e) => {
                                setAccountsE(e.target.checked);
                              }}
                            />
                            <label>Edit</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={AccountsD}
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
                              checked={HumanResourseW}
                              onChange={(e) => {
                                setHumanResourseW(e.target.checked);
                              }}
                            />
                            <label>Write</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              type="checkbox"
                              checked={HumanResourseE}
                              onChange={(e) => {
                                setHumanResourseE(e.target.checked);
                              }}
                            />
                            <label>Edit</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={HumanResourseD}
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
                              checked={MastersW}
                              type="checkbox"
                              onChange={(e) => {
                                setMastersW(e.target.checked);
                              }}
                            />
                            <label>Write</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={MastersE}
                              type="checkbox"
                              onChange={(e) => {
                                setMastersE(e.target.checked);
                              }}
                            />
                            <label>Edit</label>
                          </div>
                          <div className={styles.marginper}>
                            <input
                              checked={MastersD}
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

                  <div className={styles.divmaininput}>
                    {user?.data?.CredentailsData?.hostel === true ? (
                      <>
                        <div className={styles.mainperdiv}>
                          <div>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                settransport(e.target.checked);
                              }}
                            />
                            <label className={styles.mainper}>Transport</label>
                          </div>
                          {transport && (
                            <>
                              <div className={styles.marginper}>
                                <input
                                  type="checkbox"
                                  value={transport}
                                  disabled={true}
                                  checked={transport}
                                  onChange={(e) => {
                                    transportRead(e.target.checked);
                                  }}
                                />
                                <label>Read</label>
                              </div>
                              <div className={styles.marginper}>
                                <input
                                  checked={transportWrite}
                                  type="checkbox"
                                  onChange={(e) => {
                                    settransportWrite(e.target.checked);
                                  }}
                                />
                                <label>Write</label>
                              </div>
                              <div className={styles.marginper}>
                                <input
                                  checked={transportEdit}
                                  type="checkbox"
                                  onChange={(e) => {
                                    settransportEdit(e.target.checked);
                                  }}
                                />
                                <label>Edit</label>
                              </div>
                              <div className={styles.marginper}>
                                <input
                                  checked={transportDelete}
                                  type="checkbox"
                                  onChange={(e) => {
                                    settransportDelete(e.target.checked);
                                  }}
                                />
                                <label>Delete</label>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    {user?.data?.CredentailsData?.hostel === true ? (
                      <>
                        <div className={styles.mainperdiv}>
                          <div>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                sethostel(e.target.checked);
                              }}
                            />
                            <label className={styles.mainper}>Hostel</label>
                          </div>
                          {hostel && (
                            <>
                              <div className={styles.marginper}>
                                <input
                                  type="checkbox"
                                  value={hostel}
                                  disabled={true}
                                  checked={hostel}
                                  onChange={(e) => {
                                    sethostelRead(e.target.checked);
                                  }}
                                />
                                <label>Read</label>
                              </div>
                              <div className={styles.marginper}>
                                <input
                                  checked={hostelWrite}
                                  type="checkbox"
                                  onChange={(e) => {
                                    sethostelWrite(e.target.checked);
                                  }}
                                />
                                <label>Write</label>
                              </div>
                              <div className={styles.marginper}>
                                <input
                                  checked={hostelEdit}
                                  type="checkbox"
                                  onChange={(e) => {
                                    sethostelEdit(e.target.checked);
                                  }}
                                />
                                <label>Edit</label>
                              </div>
                              <div className={styles.marginper}>
                                <input
                                  checked={hostelDelete}
                                  type="checkbox"
                                  onChange={(e) => {
                                    sethostelDelete(e.target.checked);
                                  }}
                                />
                                <label>Delete</label>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    {user?.data?.CredentailsData?.Library === true ? (
                      <>
                        <div className={styles.mainperdiv}>
                          <div>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                setlibrary(e.target.checked);
                              }}
                            />
                            <label className={styles.mainper}>Library</label>
                          </div>
                          {library && (
                            <>
                              <div className={styles.marginper}>
                                <input
                                  type="checkbox"
                                  value={library}
                                  disabled={true}
                                  checked={library}
                                  onChange={(e) => {
                                    setlibraryRead(e.target.checked);
                                  }}
                                />
                                <label>Read</label>
                              </div>
                              <div className={styles.marginper}>
                                <input
                                  checked={libraryWrite}
                                  type="checkbox"
                                  onChange={(e) => {
                                    setlibraryWrite(e.target.checked);
                                  }}
                                />
                                <label>Write</label>
                              </div>
                              <div className={styles.marginper}>
                                <input
                                  checked={libraryEdit}
                                  type="checkbox"
                                  onChange={(e) => {
                                    setlibraryEdit(e.target.checked);
                                  }}
                                />
                                <label>Edit</label>
                              </div>
                              <div className={styles.marginper}>
                                <input
                                  checked={libraryDelete}
                                  type="checkbox"
                                  onChange={(e) => {
                                    setlibraryDelete(e.target.checked);
                                  }}
                                />
                                <label>Delete</label>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.divmaininput}>
                    <div className={styles.inputdiv}>
                      <label>Type Of Employee</label>
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
                        value={othertypeEmp}
                        name="othertypeEmp"
                        onChange={(e) => setothertypeEmp(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={"Please Select"}
                        >
                          Please Select
                        </MenuItem>
                        {OthersTypeEmployeelist?.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              sx={{
                                fontSize: 14,
                              }}
                              value={item?.value}
                            >
                              {item?.value}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                </>
              )}
              <div className={styles.logbtnstylediv}>
                <button className={styles.logbtnstyle}>
                  {loading ? (
                    <CircularProgress size={25} style={{ color: "red" }} />
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.mainemployeeInfodiv}>
                <div className={styles.mainemployeeInfodivinnear}>
                  <div className={styles.headingdivicon}>
                    <p>Personal Details</p>
                  </div>
                  <div className={styles.inputdiv20}>
                    <label>Employee Id</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Employee Id"
                      value={empId}
                      name="empId"
                      onChange={(e) => setempId(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
                    <label>Allow Leave</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter the Leave"
                      value={leaveNo}
                      name="leaveNo"
                      onChange={(e) => setleaveNo(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
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

                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
                    <label>Father&lsquo;s Name</label>
                    <input
                      required
                      type="email"
                      placeholder="Enter The Father's Name"
                      value={fathetrsname}
                      name="fathetrsname"
                      onChange={(e) => setfathetrsname(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
                    <label>Gender</label>
                    <Select
                      required
                      className={styles.addwidth}
                      sx={{
                        width: "19.4rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={gender}
                      name="gender"
                      onChange={(e) => setgender(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={""}
                      >
                        Please Select
                      </MenuItem>

                      {GenderListList?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.value}
                          >
                            {item?.value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <div className={styles.inputdiv20}>
                    <label>Blood Group</label>
                    <Select
                      required
                      className={styles.addwidth}
                      sx={{
                        width: "19.4rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={BloodGroup}
                      name="BloodGroup"
                      onChange={(e) => setBloodGroup(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={""}
                      >
                        Please Select
                      </MenuItem>

                      {BloodGroupList?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.value}
                          >
                            {item?.value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>

                  <div className={styles.inputdiv20}>
                    <label>Religion</label>
                    <Select
                      required
                      className={styles.addwidth}
                      sx={{
                        width: "19.4rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={Religion}
                      name="Religion"
                      onChange={(e) => setReligion(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={""}
                      >
                        Please Select
                      </MenuItem>

                      {religionList?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.value}
                          >
                            {item?.value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <div className={styles.inputdiv20}>
                    <label>Category</label>
                    <Select
                      required
                      className={styles.addwidth}
                      sx={{
                        width: "19.4rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={categoryname}
                      name="categoryname"
                      onChange={(e) => setcategoryname(e.target.value)}
                      // displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={"Please Select"}
                      >
                        Please Select
                      </MenuItem>
                      {CasteList?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.value}
                          >
                            {item?.value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <div className={styles.inputdiv20}>
                    <label>Nationality</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter The Nationality"
                      value={Nationality}
                      name="Nationality"
                      onChange={(e) => setNationality(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
                    <label>Phone No2</label>
                    <input
                      type="text"
                      placeholder="Enter the Phone No2"
                      value={empphone2}
                      name="empphone2"
                      onChange={(e) => setempphone2(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
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

                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
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
                        {updatedata?.profileurl ? (
                          <>
                            <img
                              className="keydetailsdivproimg"
                              src={updatedata?.profileurl}
                              alt="Logo"
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
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.mainemployeeInfodivinnear}>
                  <div className={styles.headingdivicon}>
                    <p>Organization Details</p>
                  </div>

                  <div className={styles.inputdiv20}>
                    <label>Joining Date</label>
                    <input
                      required
                      type="date"
                      value={joiningdate}
                      name="joiningdate"
                      onChange={(e) => setjoiningdate(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputdiv20}>
                    <label>Designation</label>
                    <Select
                      required
                      className={styles.addwidth}
                      sx={{
                        width: "100%",
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
                  <div className={styles.inputdiv20}>
                    <label>Deparment</label>
                    <Select
                      required
                      className={styles.addwidth}
                      sx={{
                        width: "100%",
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
                  {/* <div className={styles.headingdivicon}>
                    <p>Account Login</p>
                  </div>
                  <div className={styles.inputdiv20}>
                    <label>Email</label>
                    <input
                      required
                      type="email"
                      placeholder="Enter the Email"
                      value={empemail}
                      name="empemail"
                      onChange={(e) => setempemail(e.target.value)}
                    />
                  </div> */}

                  <div className={styles.headingdivicon}>
                    <p>Documents</p>
                  </div>
                  <div className={styles.inputdiv20}>
                    <div className={styles.showimgdiv10}>
                      <label>Adhar Card</label>
                      <div className={styles.showimgdiv}>
                        <img
                          className={styles.opicon10}
                          src="/images/down.png"
                          alt="img"
                        />
                        {/* <img
                          className={styles.opicon}
                          src="/images/can.png"
                          alt="img"
                        /> */}
                      </div>
                    </div>

                    <input
                      type="file"
                      onChange={(e) => {
                        setaadharcard(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
                    <div className={styles.showimgdiv10}>
                      <label>Driving Licence</label>
                      <div className={styles.showimgdiv}>
                        <img
                          className={styles.opicon10}
                          src="/images/down.png"
                          alt="img"
                        />
                        {/* <img
                          className={styles.opicon}
                          src="/images/can.png"
                          alt="img"
                        /> */}
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        setDrivingimg(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
                    <div className={styles.showimgdiv10}>
                      <label>10Th Marksheet</label>
                      <div className={styles.showimgdiv}>
                        <img
                          className={styles.opicon10}
                          src="/images/down.png"
                          alt="img"
                        />
                        {/* <img
                          className={styles.opicon}
                          src="/images/can.png"
                          alt="img"
                        /> */}
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        settenthimg(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
                    <div className={styles.showimgdiv10}>
                      <label>12Th Marksheet</label>
                      <div className={styles.showimgdiv}>
                        <img
                          className={styles.opicon10}
                          src="/images/down.png"
                          alt="img"
                        />
                        {/* <img
                          className={styles.opicon}
                          src="/images/can.png"
                          alt="img"
                        /> */}
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        settwethimg(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
                    <div className={styles.showimgdiv10}>
                      <label>Graduation Final Year</label>
                      <div className={styles.showimgdiv}>
                        <img
                          className={styles.opicon10}
                          src="/images/down.png"
                          alt="img"
                        />
                        {/* <img
                          className={styles.opicon}
                          src="/images/can.png"
                          alt="img"
                        /> */}
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        setGraduationimg(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
                    <div className={styles.showimgdiv10}>
                      <label>Post Graduation Final Year</label>
                      <div className={styles.showimgdiv}>
                        <img
                          className={styles.opicon10}
                          src="/images/down.png"
                          alt="img"
                        />
                        {/* <img
                          className={styles.opicon}
                          src="/images/can.png"
                          alt="img"
                        /> */}
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        setpostgraduationimg(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
                    <label>Others Certificates</label>

                    <div className={styles.showimgdiv10}>
                      <label>Certificates No 1</label>
                      <div className={styles.showimgdiv}>
                        <img
                          className={styles.opicon10}
                          src="/images/down.png"
                          alt="img"
                        />
                        {/* <img
                          className={styles.opicon}
                          src="/images/can.png"
                          alt="img"
                        /> */}
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        setcertificateimg1(e.target.files[0]);
                      }}
                    />

                    <div className={styles.showimgdiv10}>
                      <label>Certificates No 2</label>
                      <div className={styles.showimgdiv}>
                        <img
                          className={styles.opicon10}
                          src="/images/down.png"
                          alt="img"
                        />
                        {/* <img
                          className={styles.opicon}
                          src="/images/can.png"
                          alt="img"
                        /> */}
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        setcertificateimg2(e.target.files[0]);
                      }}
                    />

                    {/* <div className={styles.showimgdiv10}>
                      <label>Certificates No 3</label>
                      <div className={styles.showimgdiv}>
                        <img
                          className={styles.opicon10}
                          src="/images/down.png"
                          alt="img"
                        />
                        <img
                          className={styles.opicon}
                          src="/images/can.png"
                          alt="img"
                        />
                      </div>
                    </div> */}

                    {/* <input
                      type="file"
                      onChange={(e) => {
                        setcertificateimg3(e.target.files[0]);
                      }}
                    /> */}
                  </div>
                </div>

                <div className={styles.mainemployeeInfodivinnear}>
                  <div className={styles.headingdivicon}>
                    <p>Fianancial Details</p>
                  </div>
                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
                    <label>Allowances</label>
                    <input
                      className={styles.addmargin}
                      required
                      type="text"
                      placeholder="Allowance Name 1"
                      value={allowance1}
                      name="allowance1"
                      onChange={(e) => setallowance1(e.target.value)}
                    />
                    <input
                      className={styles.addmargin}
                      required
                      type="number"
                      placeholder="Allowance Amount"
                      value={allowanceAmount1}
                      name="allowanceAmount1"
                      onChange={(e) => setallowanceAmount1(e.target.value)}
                    />
                    <input
                      className={styles.addmargin}
                      required
                      type="text"
                      placeholder="Allowance Name 2"
                      value={allowance2}
                      name="allowance2"
                      onChange={(e) => setallowance2(e.target.value)}
                    />
                    <input
                      className={styles.addmargin}
                      required
                      type="number"
                      placeholder="Allowance Amount"
                      value={allowanceAmount2}
                      name="allowanceAmount2"
                      onChange={(e) => setallowanceAmount2(e.target.value)}
                    />
                    <input
                      className={styles.addmargin}
                      required
                      type="text"
                      placeholder="Allowance Name 3"
                      value={allowance3}
                      name="allowance3"
                      onChange={(e) => setallowance3(e.target.value)}
                    />
                    <input
                      required
                      type="number"
                      placeholder="Allowance Amount"
                      value={allowanceAmount3}
                      name="allowanceAmount3"
                      onChange={(e) => setallowanceAmount3(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
                    <label>Deductions</label>
                    <input
                      className={styles.addmargin}
                      required
                      type="text"
                      placeholder="Deduction 1"
                      value={deduction1}
                      name="deduction1"
                      onChange={(e) => setdeduction1(e.target.value)}
                    />
                    <input
                      className={styles.addmargin}
                      required
                      type="number"
                      placeholder="Amount"
                      value={deductionAmount1}
                      name="deductionAmount1"
                      onChange={(e) => setdeductionAmount1(e.target.value)}
                    />
                    <input
                      className={styles.addmargin}
                      required
                      type="text"
                      placeholder="Deduction 2"
                      value={deduction2}
                      name="deduction2"
                      onChange={(e) => setdeduction2(e.target.value)}
                    />
                    <input
                      className={styles.addmargin}
                      required
                      type="number"
                      placeholder="Amount"
                      value={deductionAmount2}
                      name="deductionAmount2"
                      onChange={(e) => setdeductionAmount2(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv20}>
                    <label>Total Salary</label>
                    <input
                      required
                      disabled={true}
                      type="text"
                      placeholder="Enter the total salary"
                      value={
                        Number(basicsalary) +
                        Number(allowanceAmount1) +
                        Number(allowanceAmount2) +
                        Number(allowanceAmount3) -
                        Number(deductionAmount1) -
                        Number(deductionAmount2)
                      }
                      name="totalsalary"
                      onChange={(e) => settotalsalary(e.target.value)}
                    />
                  </div>
                  <div className={styles.headingdivicon}>
                    <p>Bank Details</p>
                  </div>

                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
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
                  <div className={styles.inputdiv20}>
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
