import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const SchoolNavbar = () => {
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
      {user?.data[0]?.userType === "school" && (    
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
                        <Link href="/school/student/sendemail">
                          Send Email
                        </Link>
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
                        <Link href="/school/transport/vehicles">
                          Vehicles
                        </Link>
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

export default SchoolNavbar;
