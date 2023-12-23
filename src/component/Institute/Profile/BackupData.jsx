import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import {
  ExportFrontOffice,
  ExportStudent,
  ExportBooks,
  ExportIssuedBooks,
  ExportAllReceiptdata,
  ExportPaidFee,
  ExportPendingFee,
  ExportBuslist,
  ExportExpenses,
  ExportHostel,
  ExportRoomList,
  ExportRoomCheckined,
} from "./BackupFuntions";
import * as XLSX from "xlsx";
function BackupData({
  setOpen,
  frontoffice,
  Library,
  student,
  studentattendance,
  employee,
  employeeattendance,
  hostel,
  transport,
  expenses,
  accounts,
}) {
  const [loading, setloading] = useState(false);

  // const handlebackup = () => {
  //   setloading(true);
  //   serverInstance("backup/GetAllbackdataData", "post", {
  //     frontoffice: frontoffice,
  //     Library: Library,
  //     student: student,
  //     studentattendance: studentattendance,
  //     employee: employee,
  //     employeeattendance: employeeattendance,
  //     hostel: hostel,
  //     transport: transport,
  //     expenses: expenses,
  //     accounts: accounts,
  //   }).then((res) => {
  //     if (res?.status === true) {
  //       toast.success(res?.msg, {
  //         autoClose: 1000,
  //       });

  //       if (res?.data?.enquirys?.length > 0) {
  //         ExportFrontOffice(res?.data?.enquirys);
  //       }
  //       if (res?.data?.studentlist?.length > 0) {
  //         ExportStudent(res?.data?.studentlist);
  //       }
  //       if (res?.data?.bookslist?.length > 0) {
  //         ExportBooks(res?.data?.bookslist);
  //       }

  //       if (res?.data?.issuedbooklist?.length > 0) {
  //         ExportIssuedBooks(res?.data?.issuedbooklist);
  //       }

  //       if (res?.data?.allreceiptdata?.length > 0) {
  //         ExportAllReceiptdata(res?.data?.allreceiptdata);
  //       }

  //       if (res?.data?.paidfee?.length > 0) {
  //         ExportPaidFee(res?.data?.paidfee);
  //       }

  //       if (res?.data?.pedningfee?.length > 0) {
  //         ExportPendingFee(res?.data?.pedningfee);
  //       }

  //       if (res?.data?.buslist?.length > 0) {
  //         ExportBuslist(res?.data?.buslist);
  //       }
  //       if (res?.data?.expenseslist?.length > 0) {
  //         ExportExpenses(res?.data?.expenseslist);
  //       }

  //       if (res?.data?.hostelist?.length > 0) {
  //         ExportHostel(res?.data?.hostelist);
  //       }

  //       if (res?.data?.roomlist?.length > 0) {
  //         ExportRoomList(res?.data?.roomlist);
  //       }
  //       if (res?.data?.checkinlist?.length > 0) {
  //         ExportRoomCheckined(res?.data?.checkinlist);
  //       }
  //       setloading(false);
  //     }
  //     if (res?.status === false) {
  //       toast.error(res?.msg, {
  //         autoClose: 1000,
  //       });
  //       setloading(false);
  //     }
  //   });
  // };

  const handlebackup = () => {
    // Create a workbook

    let newdate = new Date();
    let fullyear = newdate.getFullYear();
    let date = newdate.getDate();
    let month = newdate.getMonth();
    let fulldate = `${date}/${month}/${fullyear}`;
    setloading(true);
    serverInstance("backup/GetAllbackdataData", "post", {
      frontoffice: frontoffice,
      Library: Library,
      student: student,
      studentattendance: studentattendance,
      employee: employee,
      employeeattendance: employeeattendance,
      hostel: hostel,
      transport: transport,
      expenses: expenses,
      accounts: accounts,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        const workbook = XLSX.utils.book_new();
        if (res?.data?.enquirys?.length > 0) {
          const ws = XLSX.utils.json_to_sheet(res?.data?.enquirys);
          XLSX.utils.book_append_sheet(workbook, ws, `Enquiry`);
        }

        if (res?.data?.studentlist?.length > 0) {
          const ws = XLSX.utils.json_to_sheet(res?.data?.studentlist);
          XLSX.utils.book_append_sheet(workbook, ws, `StudentList`);
        }

        if (res?.data?.studentAttendance?.length > 0) {
          const ws = XLSX.utils.json_to_sheet(res?.data?.studentAttendance);
          XLSX.utils.book_append_sheet(workbook, ws, `StudentAttendanceList`);
        }

        if (res?.data?.employeelist?.length > 0) {
          const ws = XLSX.utils.json_to_sheet(res?.data?.employeelist);
          XLSX.utils.book_append_sheet(workbook, ws, `employeelist`);
        }

        if (res?.data?.employeeAttendance?.length > 0) {
          const ws = XLSX.utils.json_to_sheet(res?.data?.employeeAttendance);
          XLSX.utils.book_append_sheet(workbook, ws, `employeeAttendance`);
        }

        if (res?.data?.bookslist?.length > 0) {
          const ws = XLSX.utils.json_to_sheet(res?.data?.bookslist);
          XLSX.utils.book_append_sheet(workbook, ws, `BookLIst`);
        }

        if (res?.data?.issuedbooklist?.length > 0) {
          const ws = XLSX.utils.json_to_sheet(res?.data?.issuedbooklist);
          XLSX.utils.book_append_sheet(workbook, ws, `Book Issued List`);
        }

        if (res?.data?.allreceiptdata?.length > 0) {
          const sheet2 = XLSX.utils.json_to_sheet(res?.data?.allreceiptdata);
          XLSX.utils.book_append_sheet(workbook, sheet2, "All Receipt Data");
        }

        if (res?.data?.paidfee?.length > 0) {
          const sheet2 = XLSX.utils.json_to_sheet(res?.data?.paidfee);
          XLSX.utils.book_append_sheet(workbook, sheet2, "Paid Fee List");
        }

        if (res?.data?.pedningfee?.length > 0) {
          const sheet2 = XLSX.utils.json_to_sheet(res?.data?.pedningfee);
          XLSX.utils.book_append_sheet(workbook, sheet2, "Pending Fee List");
        }

        if (res?.data?.buslist?.length > 0) {
          const sheet2 = XLSX.utils.json_to_sheet(res?.data?.buslist);
          XLSX.utils.book_append_sheet(workbook, sheet2, "Bus List");
        }
        if (res?.data?.expenseslist?.length > 0) {
          const sheet2 = XLSX.utils.json_to_sheet(res?.data?.expenseslist);
          XLSX.utils.book_append_sheet(workbook, sheet2, "Expenses");
        }

        if (res?.data?.hostelist?.length > 0) {
          const sheet2 = XLSX.utils.json_to_sheet(res?.data?.hostelist);
          XLSX.utils.book_append_sheet(workbook, sheet2, "Hostels");
        }

        if (res?.data?.roomlist?.length > 0) {
          const sheet2 = XLSX.utils.json_to_sheet(res?.data?.roomlist);
          XLSX.utils.book_append_sheet(workbook, sheet2, "Rooms In Hostel");
        }
        if (res?.data?.checkinlist?.length > 0) {
          const sheet2 = XLSX.utils.json_to_sheet(res?.data?.checkinlist);
          XLSX.utils.book_append_sheet(workbook, sheet2, "Checkin List");
        }
        setloading(false);

        XLSX.writeFile(workbook, `${fulldate}.xlsx`);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setloading(false);
      }
    });
  };

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>

        <div>
          <div className="mainbackdiv">
            <div className="backmaininear">
              <div className="optionsdiv10">
                <p>Front Office</p>
                <input
                  type="checkbox"
                  value={frontoffice}
                  checked={frontoffice}
                  disabled={true}
                />
              </div>
              <div className="optionsdiv10">
                <p>Library</p>
                <input
                  type="checkbox"
                  value={Library}
                  checked={Library}
                  disabled={true}
                />
              </div>
              <div className="optionsdiv10">
                <p>Student</p>
                <input
                  type="checkbox"
                  value={student}
                  checked={student}
                  disabled={true}
                />
              </div>
              <div className="optionsdiv10">
                <p>Accounts</p>
                <input
                  type="checkbox"
                  value={accounts}
                  checked={accounts}
                  disabled={true}
                />
              </div>
            </div>

            <div className="backmaininear">
              <div className="optionsdiv10">
                <p>Employee</p>
                <input
                  type="checkbox"
                  value={employee}
                  checked={employee}
                  disabled={true}
                />
              </div>

              <div className="optionsdiv10">
                <p>Hostel</p>
                <input
                  type="checkbox"
                  value={hostel}
                  checked={hostel}
                  disabled={true}
                />
              </div>
              <div className="optionsdiv10">
                <p>Transport</p>
                <input
                  type="checkbox"
                  value={transport}
                  checked={transport}
                  disabled={true}
                />
              </div>
              <div className="optionsdiv10">
                <p>Expenses</p>
                <input
                  type="checkbox"
                  value={expenses}
                  checked={expenses}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          <div className={styles.logbtnstylediv}>
            <button
              //   disabled={loading ? true : false}
              onClick={() => handlebackup()}
              className={styles.logbtnstyle}
            >
              {loading ? (
                <CircularProgress size={25} style={{ color: "red" }} />
              ) : (
                "Take Backup"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BackupData;
