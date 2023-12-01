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
      {user?.data?.User?.userType === "school" && (
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
          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/frontoffice/enquiry"
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
                        <Link href="/school/frontoffice/enquiry">
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
                  href="/school/student/admission"
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
                        {/* <Link href="/school/student/registration">
                          Registration
                        </Link> */}
                        <Link href="/school/student/Admission">Admission</Link>
                        <Link href="/school/student/AddStudent">
                          Add Student
                        </Link>

                        <Link href="/school/student/Studenthistory">
                          Student History
                        </Link>
                        <Link href="/school/student/Studentlogincreadential">
                          Student Login Creadential
                        </Link>
                        <Link href="/school/student/Disabledstudent">
                          Disabled Students
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Parent</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Parentlogincreadential">
                          Parent Login Creadential
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Communication</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Sendmessage">
                          Send Message
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Sendemail">Send Email</Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Certificate</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Studentcertificate">
                          Student Certificate
                        </Link>
                      </div>

                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Studentidcard">
                          Student Id Card
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Test</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Assignment">
                          Assign Test
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Receivedassignment">
                          Received Test
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Attendance</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Attendance">
                          Student Attendance
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Holiday">Add Holiday</Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Particularattendance">
                          Particular Student Attendance
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {/* <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/student/attendance"
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
                        <Link href="/school/student/Attendance">
                          Student Attendance
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Holiday">Add Holiday</Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Particularattendance">
                          Particular Student Attendance
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul> */}
          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/accounts/collectfee"
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
                        <Link href="/school/accounts/Collectfee">
                          Collect Fees
                        </Link>
                        <Link href="/school/accounts/Printreceipt">
                          Print Fee Receipt
                        </Link>
                        <Link href="/school/accounts/Searchfee">
                          Search Fees Payment
                        </Link>
                        <Link href="/school/accounts/Balancefee">
                          Balance Fees Report
                        </Link>
                        <Link href="/school/accounts/Fediscount">
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
                  href="/school/transport/vehicletype"
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
                        <Link href="/school/transport/Vehicletype">
                          Add Vehicle Type
                        </Link>
                        <Link href="/school/transport/Vehicledetails">
                          Vehicle Details
                        </Link>
                        <Link href="/school/transport/Addroutes">
                          Add Routes
                        </Link>
                        <Link href="/school/transport/Addstudent">
                          Add Student To Transport
                        </Link>
                        <Link href="/school/transport/Assignbus">
                          Assign Bus To Student
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
                  href="/school/library/addstudent"
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
                        <Link href="/school/library/Addstudent">
                          Add Student In Library
                        </Link>
                        <Link href="/school/library/Addbook">Add Book</Link>
                        <Link href="/school/library/Issuereturn">
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
                  href="/school/hostel/Category"
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
                        <Link href="/school/hostel/Category">Add Category</Link>
                        <Link href="/school/hostel/Facility">Add Facility</Link>
                        <Link href="/school/hostel/Addhostel">Add Hostel</Link>
                        <Link href="/school/hostel/Addroom">Add Room</Link>
                        <Link href="/school/hostel/Assignhostel">
                          Give Room To Student
                        </Link>
                        <Link href="/school/hostel/Addstudent">
                          Add Student In Room
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
                  href="/school/employee/Staff"
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
                        <Link href="/school/employee/Staff">Add Employee</Link>
                        <Link href="/school/employee/Employeeidcard">
                          Employee Id Card
                        </Link>
                        <Link href="/school/employee/Disabledstaff">
                          Disabled Employee
                        </Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Attendance</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/employee/Attendance">
                          Employee Attendance
                        </Link>
                      </div>

                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/employee/Addemployeeholiday">
                          Add Holiday
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/employee/Particularemployeeattendance">
                          Particular Employee Attendance
                        </Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>PayRoll</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/employee/Payroll">Add Payroll</Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/employee/Payrollreport">
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
                    router.pathname == "/institunnnte/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/masters/class"
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
                        <Link href="/school/masters/class">Class</Link>
                        <Link href="/school/masters/masterstudentcategory">
                          Student Category
                        </Link>
                        <Link href="/school/masters/receiptprefix">
                          Receipt Prefix
                        </Link>

                        <Link href="/school/masters/masterfee">
                          Fees Structure
                        </Link>

                        <Link href="/school/masters/department">
                          Department
                        </Link>
                        <Link href="/school/masters/masteremployee">
                          Designation
                        </Link>
                        {/* <Link href="/school/masters/branch">Add Branch</Link> */}
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
                  Expenses <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/Expenses/AddExpensesType">
                          Add Expenses Type
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/Expenses/AddExpenses">
                          Add Expenses
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/Expenses/AddAssesType">
                          Add Asset Type
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/Expenses/AddAsset">Add Asset</Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/Expenses/ExpensesAnalysis">
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

export default SchoolNavbar;
