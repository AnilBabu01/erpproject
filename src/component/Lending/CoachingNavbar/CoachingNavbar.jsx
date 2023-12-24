import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CoachingNavbar = () => {
  const router = useRouter();
  const [navbar, setnavbar] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const changebackgrou = () => {
    if (window.scrollY >= 80) {
      setnavbar(true);
    } else {
      setnavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changebackgrou);
  }, []);

  return (
    <>
      {user?.data?.User?.userType === "institute" && (
        <>
          <div>
            <Link
              className={
                router.pathname == "/coaching/dashboard"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/coaching/dashboard"
            >
              Dashboard
            </Link>
          </div>
          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/coaching/frontoffice/enquiry"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/coaching/frontoffice/enquiry"
                >
                  Front Office <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div className="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/frontoffice/enquiry">
                          Admission Enquiry
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/coaching/student/admission"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/coaching/student/admission"
                >
                  Students <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div className="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                      
                        <Link href="/coaching/student/admission">
                          Admission
                        </Link>
                        <Link href="/coaching/student/addstudent">
                          Add Student
                        </Link>

                        <Link href="/coaching/student/studenthistory">
                          Student History
                        </Link>
                        <Link href="/coaching/student/studentlogincreadential">
                          Student Login Creadential
                        </Link>
                        <Link href="/coaching/student/disabledstudent">
                          Disabled Students
                        </Link>
                      </div>
                    </div>

                  

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Parent</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/parentlogincreadential">
                          Parent Login Creadential
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Communication</h1>
                      {/* <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/sendmessage">
                          Send Message
                        </Link>
                      </div> */}
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/sendemail">
                          Send Email
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Certificate</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/studentcertificate">
                          Student Certificate
                        </Link>
                      </div>

                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/studentidcard">
                          Student Id Card
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Test</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/assignment">
                          Assign Test
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/receivedassignment">
                          Received Test
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/coaching/student/attendance"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/coaching/student/attendance"
                >
                  Attendance
                  <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div className="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Attendance</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/attendance">
                          Student Attendance
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/holiday">
                          Add Holiday
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/particularattendance">
                          Particular Student Attendance
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/coaching/accounts/collectfee"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/coaching/accounts/collectfee"
                >
                  Accounts
                  <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div className="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/accounts/collectfee">
                          Collect Fees
                        </Link>
                        <Link href="/coaching/accounts/printreceipt">
                          Print Fee Receipt
                        </Link>
                        <Link href="/coaching/accounts/searchfee">
                          Search Fees Payment
                        </Link>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/coaching/employee/Staff"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/coaching/employee/Staff"
                >
                  Human Resource <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div className="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/employee/Staff">
                          Add Employee
                        </Link>
                        <Link href="/coaching/employee/Employeeidcard">
                          Employee Id Card
                        </Link>
                        <Link href="/coaching/employee/Disabledstaff">
                          Disabled Employee
                        </Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Attendance</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/employee/Attendance">
                          Employee Attendance
                        </Link>
                      </div>
                     
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/employee/Addemployeeholiday">
                          Add Holiday
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/employee/Particularemployeeattendance">
                          Particular Employee Attendance
                        </Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>PayRoll</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/employee/Payroll">
                          Add Payroll
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/employee/Payrollreport">
                          PayRoll Report
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/coaching/masters/batchtime"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/coaching/masters/batchtime"
                >
                  Masters <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div className="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/masters/batchtime">
                          Add Batch Time
                        </Link>
                        <Link href="/coaching/masters/course">Course</Link>
                        {/* <Link href="/coaching/masters/courseduration">
                          Course Duration In Month
                        </Link> */}
                        <Link href="/coaching/masters/masterstudentcategory">
                          Student Category
                        </Link>
                        <Link href="/coaching/masters/receiptprefix">
                          Receipt Prefix
                        </Link>

                        <Link href="/coaching/masters/masterfee">
                          Fees Structure
                        </Link>

                        <Link href="/coaching/masters/department">
                          Department
                        </Link>
                        <Link href="/coaching/masters/masteremployee">
                          Designation
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href=""
                >
                  Reports <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div className="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/report/StudentReport">
                          Student Report
                        </Link>
                        <Link href="/coaching/report/StudentAttendanceReport">
                          Student Attendance Report
                        </Link>
                        <Link href="/coaching/report/StudentTestReport">
                          Student Test Report
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Accounts</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/report/feecollection">
                          Student All Paid Fee Report
                        </Link>
                        <Link href="/coaching/report/pendingfee">
                          Student All Pending Fee Report
                        </Link>
                      
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Human Reaourse</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/report/EmployeeReport">
                          Employee Report
                        </Link>
                        {/* <Link href="/">Employee Login Credentials Report</Link> */}
                        <Link href="/coaching/report/EmployeeSalaryPaid">
                          Employee Salary Paid Report
                        </Link>
                        <Link href="/coaching/report/EmployeeSalarySlip">
                          Employee Salary Slip Report
                        </Link>
                        <Link href="/coaching/report/EmployeeAttendance">
                          Employee Attendance Report
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <ul class="nav_menu">
            <li class="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/coaching/Expenses/AddExpenses"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/coaching/Expenses/AddExpenses"
                >
                  Expenses <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>

                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/Expenses/AddExpenses">
                          Add Expenses
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/Expenses/ExpensesAnalysis">
                          Expenses Analysis
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {/* {user?.data?.User?.newclient === true && (
            <>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/pricing"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/pricing"
                >
                  Pricing
                </Link>
              </div>
            </>
          )} */}
        </>
      )}
    </>
  );
};

export default CoachingNavbar;
