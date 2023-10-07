import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const CollegeNavbar = () => {
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
      {user?.data?.User?.userType === "college" && (
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

     
    </>
  );
};

export default CollegeNavbar;
