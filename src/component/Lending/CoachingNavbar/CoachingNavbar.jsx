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
      {user?.data[0]?.userType === "institute" && (
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
                        <Link href="/coaching/employee/staff">Add Staff</Link>
                        <Link href="/coaching/employee/attendance">
                          Staff Attendance
                        </Link>

                        <Link href="/coaching/employee/payroll">Payroll</Link>
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
          {user?.data[0]?.newclient === true && (
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

export default CoachingNavbar;