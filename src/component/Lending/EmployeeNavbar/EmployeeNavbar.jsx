import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const EmployeeNavbar = () => {
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
      {user?.data?.User?.organizationtype === "institute" && (
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
          {user?.data?.User?.fronrofice === true ? (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/institunnnte/dashboard"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/institute/dashboard"
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
            </>
          ) : (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <p className="disable">
                      Front Office <KeyboardArrowDownIcon />
                    </p>
                  </div>
                  <div className={navbar ? "dropdownscroll" : "dropdown"}>
                    <div className="dropdown-inner">
                      <div className="main_report_dropdown">
                        <div className="main_report_dropdown_rightmargin">
                          <h1>General</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Admission Enquiry</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          )}
          {user?.data?.User?.student === true ? (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/institunnnte/dashboard"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/institute/dashboard"
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
                            {/* <Link href="/coaching/student/registration">
                          Registration
                        </Link> */}
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

                        {/* <div className="main_report_dropdown_rightmargin">
                      <h1>Attendance</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/attendance">
                          Student Attendance
                        </Link>
                      </div>
                    </div> */}

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
                          <div className="main_innear_menu_dropdown">
                            <Link href="/coaching/student/sendmessage">
                              Send Message
                            </Link>
                          </div>
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
            </>
          ) : (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <p className="disable">
                      Students <KeyboardArrowDownIcon />
                    </p>
                  </div>
                  <div className={navbar ? "dropdownscroll" : "dropdown"}>
                    <div className="dropdown-inner">
                      <div className="main_report_dropdown">
                        <div className="main_report_dropdown_rightmargin">
                          <h1>General</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Admission</p>
                            <p className="disable">Add Student</p>
                            <p className="disable">Student History</p>
                            <p className="disable">Student Login Creadential</p>
                            <p className="disable">Disabled Students</p>
                          </div>
                        </div>

                        {/* <div className="main_report_dropdown_rightmargin">
                      <h1>Attendance</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/coaching/student/attendance">
                          Student Attendance
                        </Link>
                      </div>
                    </div> */}

                        <div className="main_report_dropdown_rightmargin">
                          <h1>Parent</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Parent Login Creadential</p>
                          </div>
                        </div>

                        <div className="main_report_dropdown_rightmargin">
                          <h1>Communication</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Send Message</p>
                          </div>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Send Email</p>
                          </div>
                        </div>

                        <div className="main_report_dropdown_rightmargin">
                          <h1>Certificate</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Student Certificate</p>
                          </div>

                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Student Id Card</p>
                          </div>
                        </div>

                        <div className="main_report_dropdown_rightmargin">
                          <h1>Test</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Assign Test</p>
                          </div>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Received Test</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          )}
          {user?.data?.User?.attendance === true ? (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/institunnnte/dashboard"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/institute/dashboard"
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
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <p className="disable">
                      Attendance <KeyboardArrowDownIcon />
                    </p>
                  </div>
                  <div className={navbar ? "dropdownscroll" : "dropdown"}>
                    <div className="dropdown-inner">
                      <div className="main_report_dropdown">
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Attendance</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Student Attendance</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          )}
          {user?.data?.User?.accounts === true ? (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/institunnnte/dashboard"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/institute/dashboard"
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
                            <Link href="/coaching/accounts/searchfee">
                              Search Fees Payment
                            </Link>
                            <Link href="/coaching/accounts/balancefee">
                              Balance Fees Report
                            </Link>
                            <Link href="/coaching/accounts/feediscount">
                              Fee Discount
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <p className="disable">
                      Accounts <KeyboardArrowDownIcon />
                    </p>
                  </div>
                  <div className={navbar ? "dropdownscroll" : "dropdown"}>
                    <div className="dropdown-inner">
                      <div className="main_report_dropdown">
                        <div className="main_report_dropdown_rightmargin">
                          <h1>General</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Collect Fees</p>
                            <p className="disable">Search Fees Payment</p>
                            <p className="disable">Balance Fees Report</p>
                            <p className="disable">Fee Discount</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          )}
          {user?.data?.User?.HumanResource === true ? (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/institunnnte/dashboard"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/institute/dashboard"
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
                            <Link href="/coaching/employee/staff">
                              Add Staff
                            </Link>
                            <Link href="/coaching/employee/attendance">
                              Staff Attendance
                            </Link>

                            <Link href="/coaching/employee/payroll">
                              Payroll
                            </Link>
                            <Link href="/coaching/employee/payrollreport">
                              Payroll Report
                            </Link>
                            <Link href="/coaching/employee/department">
                              Department
                            </Link>
                            <Link href="/coaching/employee/disabledstaff">
                              Disabled Staff
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <p className="disable">
                      Human Resource <KeyboardArrowDownIcon />
                    </p>
                  </div>
                  <div className={navbar ? "dropdownscroll" : "dropdown"}>
                    <div className="dropdown-inner">
                      <div className="main_report_dropdown">
                        <div className="main_report_dropdown_rightmargin">
                          <h1>General</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Add Staff</p>
                            <p className="disable">Staff Attendance</p>

                            <p className="disable">Payroll</p>
                            <p className="disable">Payroll Report</p>
                            <p className="disable">Department</p>
                            <p className="disable">Disabled Staff</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          )}
          {user?.data?.User?.master === true ? (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/institunnnte/dashboard"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/institute/dashboard"
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
                            <Link href="/coaching/masters/masterstudentcategory">
                              Student Category
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
                            {/* <Link href="/coaching/masters/branch">Add Branch</Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <p className="disable">
                      Masters <KeyboardArrowDownIcon />
                    </p>
                  </div>
                  <div className={navbar ? "dropdownscroll" : "dropdown"}>
                    <div className="dropdown-inner">
                      <div className="main_report_dropdown">
                        <div className="main_report_dropdown_rightmargin">
                          <h1>General</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Add Batch Time</p>
                            <p className="disable">Course</p>
                            <p className="disable">Student Category</p>
                            <p className="disable">Fees Structure</p>
                            <p className="disable">Department</p>
                            <p className="disable">Designation</p>
                            {/* <Link href="/coaching/masters/branch">Add Branch</Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          )}
          {user?.data?.User?.report === true ? (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/institunnnte/dashboard"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/institute/dashboard"
                    >
                      Reports <KeyboardArrowDownIcon />
                    </Link>
                  </div>
                  <div className={navbar ? "dropdownscroll" : "dropdown"}>
                    <div className="dropdown-inner">
                      <div className="main_report_dropdown">
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Attendance</h1>
                          <div className="main_innear_menu_dropdown">
                            <Link href="/coaching/report/studentattendancereport">
                              Attendance Report
                            </Link>
                            <Link href="/coaching/report/studentidcard">
                              Student ID Card
                            </Link>
                            <Link href="/coaching/report/studentlogindetails">
                              Student Login Details
                            </Link>
                          </div>
                        </div>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Faculty</h1>
                          <div className="main_innear_menu_dropdown">
                            <Link href="/coaching/report/faultyidcard">
                              Faculty ID Card
                            </Link>
                            {/* <Link href="/">Batch Taken Report</Link>
                        <Link href="/">Batch Plan Report</Link> */}
                          </div>
                        </div>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Exam Section</h1>
                          <div className="main_innear_menu_dropdown">
                            <Link href="/coaching/report/studentperformance">
                              Student Performance Report
                            </Link>
                            {/* <Link href="/">Student Subjectwise Report</Link>
                        <Link href="/">Print Student Result </Link>
                        <Link href="/">Test Taken Report</Link> */}
                          </div>
                        </div>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Accounts</h1>
                          <div className="main_innear_menu_dropdown">
                            <Link href="/coaching/report/feecollection">
                              Fees Collection Report
                            </Link>
                            <Link href="/coaching/report/pendingfee">
                              Fees Pending Report
                            </Link>
                            <Link href="/coaching/report/feestudent">
                              Fees Pending Studentwise report
                            </Link>
                          </div>
                        </div>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Human Reaourse</h1>
                          <div className="main_innear_menu_dropdown">
                            <Link href="/coaching/report/leavereport">
                              Employee Leave Report
                            </Link>
                            <Link href="/coaching/report/employeelogdetails">
                              Employee Login Details
                            </Link>
                            <Link href="/coaching/report/salaryslip">
                              Employee Salary Slip
                            </Link>
                            <Link href="/coaching/report/salaryreport">
                              Employee Salary Report
                            </Link>
                            <Link href="/coaching/report/employeeattendancereport">
                              Employee Attendance Report
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <p className="disable">
                      Reports <KeyboardArrowDownIcon />
                    </p>
                  </div>
                  <div className={navbar ? "dropdownscroll" : "dropdown"}>
                    <div className="dropdown-inner">
                      <div className="main_report_dropdown">
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Attendance</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Attendance Report</p>
                            <p className="disable">Student ID Card</p>
                            <p className="disable">Student Login Details</p>
                          </div>
                        </div>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Faculty</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Faculty ID Card</p>
                            {/* <Link href="/">Batch Taken Report</Link>
                        <Link href="/">Batch Plan Report</Link> */}
                          </div>
                        </div>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Exam Section</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">
                              Student Performance Report
                            </p>
                            {/* <Link href="/">Student Subjectwise Report</Link>
                        <Link href="/">Print Student Result </Link>
                        <Link href="/">Test Taken Report</Link> */}
                          </div>
                        </div>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Accounts</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Fees Collection Report</p>
                            <p className="disable">Fees Pending Report</p>
                            <p className="disable">
                              Fees Pending Studentwise report
                            </p>
                          </div>
                        </div>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Human Reaourse</h1>
                          <div className="main_innear_menu_dropdown">
                            <p className="disable">Employee Leave Report</p>
                            <p className="disable">Employee Login Details</p>
                            <p className="disable">Employee Salary Slip</p>
                            <p className="disable">Employee Salary Report</p>
                            <p className="disable">
                              Employee Attendance Report
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          )}

          {user?.data?.User?.newclient === true && (
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
          )}
        </>
      )}

      {user?.data?.User?.organizationtype === "college" && (
        <>
          <div>
            <Link
              className={
                router.pathname == "/college/dashboard"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/college/dashboard"
            >
              Dashboard
            </Link>
          </div>
          <ul class="nav_menu">
            <li class="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/institute/dashboard"
                >
                  Front Office <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/frontoffice/studentenquiry">
                          Admission Enquiry
                        </Link>
                        <Link href="/institute/masterstudentcategory">
                          Visitor Book
                        </Link>

                        <Link href="/institute/masteremployee">
                          Postal Dispatch
                        </Link>
                        <Link href="/institute/masteremployee">
                          Postal Receive
                        </Link>
                        <Link href="/institute/masteremployee">Complain</Link>
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/institute/dashboard"
                >
                  Students <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/student/registration">
                          Student Registration
                        </Link>
                        <Link href="/institute/student/admission">
                          Student Admission
                        </Link>
                        <Link href="/institute/student/addstudent">
                          Add Student
                        </Link>
                        <Link href="/institute/student/studenthistory">
                          Student History
                        </Link>
                        <Link href="/institute/student/studentlogincreadential">
                          Student Login Creadential
                        </Link>
                        <Link href="/institute/student/disabledstudent">
                          Disabled Students
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Attendance</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/student/attendance">
                          Student Attendance
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Parent</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/student/parentlogincreadential">
                          Parent Login Creadential
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Communication</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/student/sendmessage">
                          Send Message
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/student/sendemail">
                          Send Email
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Certificate</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/student/studentcertificate">
                          Student Certificate
                        </Link>
                      </div>

                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/student/studentidcard">
                          Student Id Card
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Assignment</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/student/assignment">
                          Assign Assignment
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/student/receivedassignment">
                          Received Assignment
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/institute/dashboard"
                >
                  Accounts
                  <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/accounts/collectfee">
                          Collect Fees
                        </Link>
                        <Link href="/institute/accounts/searchfee">
                          Search Fees Payment
                        </Link>
                        <Link href="/institute/accounts/balancefee">
                          Balance Fees Report
                        </Link>
                        <Link href="/institute/accounts/feediscount">
                          Fee Discount
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/institute/dashboard"
                >
                  Transport <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/transport/routes">Routes</Link>
                        <Link href="/institute/transport/vehicles">
                          Vehicles
                        </Link>
                        <Link href="/institute/transport/assingvehicles">
                          Assing Vehicle
                        </Link>
                        <Link href="/institute/transport/studenttransport">
                          Student Transport Report
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/institute/dashboard"
                >
                  Library <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/library/addbook">Add Book</Link>
                        <Link href="/institute/library/issuereturn">
                          Issue Return
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/institute/dashboard"
                >
                  Hostel <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/hostel/hostelrooms">
                          Hostel Rooms
                        </Link>
                        <Link href="/institute/hostel/roomtype">Room Type</Link>
                        <Link href="/institute/hostel/hostel">Hostel</Link>
                        <Link href="/institute/hostel/studenthostelreport">
                          Student Hostel Report
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/institute/dashboard"
                >
                  Human Resource <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/employee/staff">Add Staff</Link>
                        <Link href="/institute/employee/attendance">
                          Staff Attendance
                        </Link>

                        <Link href="/institute/employee/payroll">Payroll</Link>
                        <Link href="/institute/employee/payrollreport">
                          Payroll Report
                        </Link>
                        <Link href="/institute/employee/department">
                          Department
                        </Link>
                        <Link href="/institute/employee/disabledstaff">
                          Disabled Staff
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/institute/dashboard"
                >
                  Masters <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/institute/masters/masterclass">
                          Course
                        </Link>
                        <Link href="/institute/masters/masterfee">
                          Add Fees Structure
                        </Link>
                        <Link href="/institute/masters/masterstudentcategory">
                          Student Category
                        </Link>
                        <Link href="/institute/masters/masteremployee">
                          Type of Employee
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/institute/dashboard"
                >
                  Reports <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Attendance</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Student Report</Link>
                        <Link href="/">Student Monthly</Link>
                        <Link href="/">Student Weekly</Link>
                        <Link href="/">Student ID Card</Link>
                        <Link href="/">Student Login Details</Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Analytics</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Mobile App Report</Link>
                        <Link href="/">Send SMS Report</Link>
                        <Link href="/">Send Email Report</Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Teaching</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Teacher ID Card</Link>
                        <Link href="/">Lecture Taken Report</Link>
                        <Link href="/">Lecture Plan Report</Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Library</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Library Report</Link>
                        <Link href="/">Library Card</Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Exam Section</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Student Performance Report</Link>
                        <Link href="/">Student Subjectwise Report</Link>
                        <Link href="/">Print Student Result </Link>
                        <Link href="/">Text Taken Report</Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Accounts</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Fees Collection Report</Link>
                        <Link href="/">Fees Pending Report</Link>
                        <Link href="/">Fees Collection Itemwise Report</Link>
                        <Link href="/">Fees Pending Report Notification</Link>
                        <Link href="/">Fees Pending Report Notification</Link>
                        <Link href="/">Fees Pending Studentwise report</Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Human Reaourse</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Employee Leave Report</Link>
                        <Link href="/">Employee Login Details</Link>
                        <Link href="/">Employee Salary Slip</Link>
                        <Link href="/">Employee Salary Report</Link>
                        <Link href="/">Employee Attendance Report</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {user?.data?.User?.newclient === true && (
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
          )}
        </>
      )}

      {user?.data?.User?.organizationtype === "school" && (
        <>
          <div>
            <Link
              className={
                router.pathname == "/school/dashboard"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/school/dashboard"
            >
              Dashboard
            </Link>
          </div>
          <ul class="nav_menu">
            <li class="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/dashboard"
                >
                  Front Office <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/frontoffice/studentenquiry">
                          Admission Enquiry
                        </Link>
                        <Link href="/school/masterstudentcategory">
                          Visitor Book
                        </Link>

                        <Link href="/school/masteremployee">
                          Postal Dispatch
                        </Link>
                        <Link href="/school/masteremployee">
                          Postal Receive
                        </Link>
                        <Link href="/school/masteremployee">Complain</Link>
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/dashboard"
                >
                  Students <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/registration">
                          Student Registration
                        </Link>
                        <Link href="/school/student/admission">
                          Student Admission
                        </Link>
                        <Link href="/school/student/addstudent">
                          Add Student
                        </Link>
                        <Link href="/school/student/studenthistory">
                          Student History
                        </Link>
                        <Link href="/school/student/studentlogincreadential">
                          Student Login Creadential
                        </Link>
                        <Link href="/school/student/disabledstudent">
                          Disabled Students
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Attendance</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/attendance">
                          Student Attendance
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Parent</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/parentlogincreadential">
                          Parent Login Creadential
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Communication</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/sendmessage">
                          Send Message
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/sendemail">Send Email</Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Certificate</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/studentcertificate">
                          Student Certificate
                        </Link>
                      </div>

                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/studentidcard">
                          Student Id Card
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Assignment</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/assignment">
                          Assign Assignment
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/receivedassignment">
                          Received Assignment
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/dashboard"
                >
                  Accounts
                  <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/accounts/collectfee">
                          Collect Fees
                        </Link>
                        <Link href="/school/accounts/searchfee">
                          Search Fees Payment
                        </Link>
                        <Link href="/school/accounts/balancefee">
                          Balance Fees Report
                        </Link>
                        <Link href="/school/accounts/feediscount">
                          Fee Discount
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/dashboard"
                >
                  Transport <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/transport/routes">Routes</Link>
                        <Link href="/school/transport/vehicles">Vehicles</Link>
                        <Link href="/school/transport/assingvehicles">
                          Assing Vehicle
                        </Link>
                        <Link href="/school/transport/studenttransport">
                          Student Transport Report
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/dashboard"
                >
                  Library <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/library/addbook">Add Book</Link>
                        <Link href="/school/library/issuereturn">
                          Issue Return
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/dashboard"
                >
                  Hostel <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/hostel/hostelrooms">
                          Hostel Rooms
                        </Link>
                        <Link href="/school/hostel/roomtype">Room Type</Link>
                        <Link href="/school/hostel/hostel">Hostel</Link>
                        <Link href="/school/hostel/studenthostelreport">
                          Student Hostel Report
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/dashboard"
                >
                  Human Resource <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/employee/staff">Add Staff</Link>
                        <Link href="/school/employee/attendance">
                          Staff Attendance
                        </Link>

                        <Link href="/school/employee/payroll">Payroll</Link>
                        <Link href="/school/employee/payrollreport">
                          Payroll Report
                        </Link>
                        <Link href="/school/employee/department">
                          Department
                        </Link>
                        <Link href="/school/employee/disabledstaff">
                          Disabled Staff
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/dashboard"
                >
                  Masters <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/masters/masterclass">Class</Link>
                        <Link href="/school/masters/masterfee">
                          Add Fees Structure
                        </Link>
                        <Link href="/school/masters/masterstudentcategory">
                          Student Category
                        </Link>
                        <Link href="/school/masters/masteremployee">
                          Type of Employee
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/dashboard"
                >
                  Reports <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Attendance</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Student Report</Link>
                        <Link href="/">Student Monthly</Link>
                        <Link href="/">Student Weekly</Link>
                        <Link href="/">Student ID Card</Link>
                        <Link href="/">Student Login Details</Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Analytics</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Mobile App Report</Link>
                        <Link href="/">Send SMS Report</Link>
                        <Link href="/">Send Email Report</Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Teaching</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Teacher ID Card</Link>
                        <Link href="/">Lecture Taken Report</Link>
                        <Link href="/">Lecture Plan Report</Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Library</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Library Report</Link>
                        <Link href="/">Library Card</Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Exam Section</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Student Performance Report</Link>
                        <Link href="/">Student Subjectwise Report</Link>
                        <Link href="/">Print Student Result </Link>
                        <Link href="/">Text Taken Report</Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Accounts</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Fees Collection Report</Link>
                        <Link href="/">Fees Pending Report</Link>
                        <Link href="/">Fees Collection Itemwise Report</Link>
                        <Link href="/">Fees Pending Report Notification</Link>
                        <Link href="/">Fees Pending Report Notification</Link>
                        <Link href="/">Fees Pending Studentwise report</Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Human Reaourse</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/">Employee Leave Report</Link>
                        <Link href="/">Employee Login Details</Link>
                        <Link href="/">Employee Salary Slip</Link>
                        <Link href="/">Employee Salary Report</Link>
                        <Link href="/">Employee Attendance Report</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {user?.data?.User?.newclient === true && (
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
          )}
        </>
      )}
    </>
  );
};

export default EmployeeNavbar;
