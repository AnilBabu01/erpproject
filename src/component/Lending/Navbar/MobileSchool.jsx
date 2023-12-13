import React, { useState } from "react";

function MobileSchool({ setisMobile, isMobile }) {
  const [showmenu2, setshowmenu2] = useState(false);
  return (
    <>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <Link
          className={
            router.pathname == "/mainadmin/dashbord"
              ? "link_directActive"
              : "link_direct10"
          }
          href="/mainadmin/dashboard"
        >
          Dashboard
        </Link>
      </MenuItem>

      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <div onClick={() => setshowmenu2(!showmenu2)} className="add_icons_div">
          <p> Front Office</p> {showmenu2 ? <RemoveIcon /> : <AddIcon />}
        </div>
      </MenuItem>

      <div className={showmenu2 ? "menu_show" : "menu_hide"}>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/frontoffice/enquiry"
          >
            Admission Enquiry
          </Link>
        </MenuItem>
      </div>

      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <div onClick={() => setstudent(!student)} className="add_icons_div">
          <p> Student</p>
          {student ? <RemoveIcon /> : <AddIcon />}
        </div>
      </MenuItem>
      <div className={student ? "menu_show" : "menu_hide"}>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/admission"
          >
            Admission
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/addstudent"
          >
            Add Student
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/studenthistory"
          >
            Student History
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/studentlogincreadential"
          >
            Student Login Creadential
          </Link>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/disabledstudent"
          >
            Disabled Students
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/parentlogincreadential"
          >
            Parent Login Creadential
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/sendmessage"
          >
            Send Message
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/sendemail"
          >
            Send Email
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/studentcertificate"
          >
            Student Certificate
          </Link>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/studentidcard"
          >
            Student Id Card
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/assignment"
          >
            Assign Test
          </Link>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/receivedassignment"
          >
            Received Test
          </Link>
        </MenuItem>
      </div>

      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <div
          onClick={() => setattendance(!attendance)}
          className="add_icons_div"
        >
          <p>Attendance</p>
          {attendance ? <RemoveIcon /> : <AddIcon />}
        </div>
      </MenuItem>
      <div className={attendance ? "menu_show" : "menu_hide"}>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/student/attendance"
          >
            Take Attendance
          </Link>
        </MenuItem>
      </div>

      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <div onClick={() => setaccounts(!accounts)} className="add_icons_div">
          <p>Accounts</p>
          {accounts ? <RemoveIcon /> : <AddIcon />}
        </div>
      </MenuItem>
      <div className={accounts ? "menu_show" : "menu_hide"}>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/accounts/collectfee"
          >
            Collect Fees
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/accounts/searchfee"
          >
            Search Fees Payment
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/accounts/balancefee"
          >
            Balance Fees Report
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/accounts/feediscount"
          >
            Fee Discount
          </Link>
        </MenuItem>
      </div>

      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <div
          onClick={() => sethumanresourse(!humanresourse)}
          className="add_icons_div"
        >
          <p>HR</p>
          {humanresourse ? <RemoveIcon /> : <AddIcon />}
        </div>
      </MenuItem>
      <div className={humanresourse ? "menu_show" : "menu_hide"}>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/employee/staff"
          >
            Add Staff
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/employee/attendance"
          >
            Staff Attendance
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/employee/payroll"
          >
            Payroll Report
          </Link>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/employee/department"
          >
            Department
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/employee/disabledstaff"
          >
            Disabled Staff
          </Link>
        </MenuItem>
      </div>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem>
        <div onClick={() => setmaster(!master)} className="add_icons_div">
          <p>Masters</p>
          {master ? <RemoveIcon /> : <AddIcon />}
        </div>
      </MenuItem>
      <div className={master ? "menu_show" : "menu_hide"}>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/masters/batchtime"
          >
            Add Batch Time
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/masters/course"
          >
            Course
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/masters/masterstudentcategory"
          >
            Student Category
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/masters/masterfee"
          >
            Fees Structure
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/masters/department"
          >
            Department
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/masters/masteremployee"
          >
            Designation
          </Link>
        </MenuItem>
      </div>
      <Divider sx={{ my: 0.5 }} />

      <MenuItem>
        <div onClick={() => setreports(!reports)} className="add_icons_div">
          <p>Reports</p>
          {reports ? <RemoveIcon /> : <AddIcon />}
        </div>
      </MenuItem>
      <div className={reports ? "menu_show" : "menu_hide"}>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/studentattendancereport"
          >
            Attendance Report
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/studentidcard"
          >
            Student ID Card
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/studentlogindetails"
          >
            Student Login Details
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/faultyidcard"
          >
            Faculty ID Card
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/studentperformance"
          >
            Student Performance Report
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/feecollection"
          >
            Fees Collection Report
          </Link>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/pendingfee"
          >
            Fees Pending Report
          </Link>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/feestudent"
          >
            Fees Pending Studentwise report
          </Link>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/leavereport"
          >
            Employee Leave Report
          </Link>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/employeelogdetails"
          >
            Employee Login Details
          </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/salaryslip"
          >
            Employee Salary Slip
          </Link>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/salaryreport"
          >
            Employee Salary Report
          </Link>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Link
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? "link_directActive" : "link_directs"
            }
            href="/coaching/report/employeeattendancereport"
          >
            Employee Attendance Report
          </Link>
        </MenuItem>
      </div>
      <Divider sx={{ my: 0.5 }} />
    </>
  );
}

export default MobileSchool;
