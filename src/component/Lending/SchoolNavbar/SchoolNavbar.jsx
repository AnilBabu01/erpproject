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

          {user?.data?.CredentailsData?.FrontOffice === true && (
            <>
              <ul className="nav_menu">
                <li className="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/school/frontoffice/enquiry"
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
            </>
          )}

          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/school/student/admission"
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
                        <Link href="/school/student/Changesession">
                          Change Session
                        </Link>
                        <Link href="/school/student/OtherFee">
                          Add Other Fee
                        </Link>
                        <Link href="/school/student/Timetable">
                          Add Time Table
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
                      {/* <div className="main_innear_menu_dropdown">
                        <Link href="/school/student/Sendmessage">
                          Send Message
                        </Link>
                      </div> */}
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

          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/school/accounts/collectfee"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {user?.data?.CredentailsData?.Transport === true && (
            <>
              <ul class="nav_menu">
                <li class="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/school/transport/vehicletype"
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
                              Add Bus
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
            </>
          )}
          {user?.data?.CredentailsData?.Library === true && (
            <>
              <ul class="nav_menu">
                <li class="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/school/library/addstudent"
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
            </>
          )}
          {user?.data?.CredentailsData?.hostel === true && (
            <>
              <ul class="nav_menu">
                <li class="nav_list nav_list_menu">
                  <div className="nffffav_linka">
                    <Link
                      className={
                        router.pathname == "/school/hostel/Category"
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
                            <Link href="/school/hostel/Category">
                              Add Category
                            </Link>
                            <Link href="/school/hostel/Facility">
                              Add Facility
                            </Link>
                            <Link href="/school/hostel/Addhostel">
                              Add Hostel
                            </Link>
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
            </>
          )}

          <ul className="nav_menu">
            <li className="nav_list nav_list_menu">
              <div className="nffffav_linka">
                <Link
                  className={
                    router.pathname == "/school/employee/Staff"
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
                        <Link href="/school/employee/sendemail">Send Mail</Link>
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
                    router.pathname == "/school/masters/AddSession"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/masters/AddSession"
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
                        <Link href="/school/masters/AddSession">Seesion</Link>
                        <Link href="/school/masters/AddSection">Section</Link>
                        <Link href="/school/masters/class">Class</Link>
                        <Link href="/school/masters/masterstudentcategory">
                          Caste
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
                        <Link href="/school/masters/AddClassSubject">
                          Add Subject
                        </Link>
                        <Link href="/school/masters/Addstream">
                          Add Stream
                        </Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Student Client Details</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/masters/FooterDetails">
                          Add Footer Details
                        </Link>
                        <Link href="/school/masters/Notes">Add Notic</Link>
                        <Link href="/school/masters/Slider">Add Slider</Link>
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
                    router.pathname == "/school/report/StudentAllPaidFee"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/report/StudentAllPaidFee"
                >
                  Reports <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/report/StudentAllPaidFee">
                          Student All Paid Fee Report
                        </Link>
                        <Link href="/school/report/StudentAllPendingFee">
                          Student All Pending Fee Report
                        </Link>
                      </div>
                    </div>
                    <div className="main_report_dropdown_rightmargin">
                      <h1>Student</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/report/StudentReport">
                          Student Report
                        </Link>
                        <Link href="/school/report/StudentAttendanceReport">
                          Student Attendance Report
                        </Link>
                        <Link href="/school/report/StudentTestReport">
                          Student Test Report
                        </Link>
                      </div>
                    </div>

                    <div className="main_report_dropdown_rightmargin">
                      <h1>Human_Resource</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/report/EmployeeReport">
                          Employee Report
                        </Link>
                        {/* <Link href="/">Employee Login Credentials Report</Link> */}
                        <Link href="/school/report/EmployeeSalaryPaid">
                          Employee Salary Paid Report
                        </Link>
                        <Link href="/school/report/EmployeeSalarySlip">
                          Employee Salary Slip Report
                        </Link>
                        <Link href="/school/report/EmployeeAttendance">
                          Employee Attendance Report
                        </Link>
                      </div>
                    </div>
                    {user?.data?.CredentailsData?.Library === true && (
                      <>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Library</h1>
                          <div className="main_innear_menu_dropdown">
                            <Link href="/school/report/BookReport">
                              Book Report
                            </Link>
                            <Link href="/">Issue Book Report</Link>
                            <Link href="/">Return Book Report</Link>
                            <Link href="/">Libray Id Card Report</Link>
                          </div>
                        </div>
                      </>
                    )}

                    {user?.data?.CredentailsData?.hostel === true && (
                      <>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Hostel</h1>
                          <div className="main_innear_menu_dropdown">
                            <Link href="/school/report/AvailableRoom">
                              Available Room Report
                            </Link>
                            <Link href="/school/report/OccupiedRoom">
                              Occupied Room Report
                            </Link>
                            <Link href="/school/report/StudentRoom">
                              Student In Room Report
                            </Link>
                            <Link href="/school/report/HostelPaidFee">
                              Hostel Paid Fee
                            </Link>
                            <Link href="/school/report/HostelPendingFee">
                              Hostel Pending Fee
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                    {user?.data?.CredentailsData?.Transport === true && (
                      <>
                        <div className="main_report_dropdown_rightmargin">
                          <h1>Transport</h1>
                          <div className="main_innear_menu_dropdown">
                            <Link href="/school/report/StudentInBus">
                              Bus Report
                            </Link>
                            <Link href="/school/report/TransPortPaidFee">
                              TransPort Paid Fee
                            </Link>
                            <Link href="/school/report/TransPortPendingFee">
                              TransPort Pending Fee
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
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
                    router.pathname == "/school/Expenses/AddExpenses"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/school/Expenses/AddExpenses"
                >
                  Finance <KeyboardArrowDownIcon />
                </Link>
              </div>
              <div className={navbar ? "dropdownscroll" : "dropdown"}>
                <div class="dropdown-inner">
                  <div className="main_report_dropdown">
                    <div className="main_report_dropdown_rightmargin">
                      <h1>General</h1>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/Expenses/AddExpenses">
                          Add Expenses
                        </Link>
                      </div>
                      <div className="main_innear_menu_dropdown">
                        <Link href="/school/Expenses/CashBankTransfer">
                          Cash/Bank Transfer
                        </Link>
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
