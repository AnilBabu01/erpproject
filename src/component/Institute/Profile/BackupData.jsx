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
  const handlebackup = () => {
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

        if (res?.data?.enquirys?.length > 0) {
          ExportFrontOffice(res?.data?.enquirys);
        }
        if (res?.data?.studentlist?.length > 0) {
          ExportStudent(res?.data?.studentlist);
        }
        if (res?.data?.bookslist?.length > 0) {
          ExportBooks(res?.data?.bookslist);
        }

        if (res?.data?.issuedbooklist?.length > 0) {
          ExportIssuedBooks(res?.data?.issuedbooklist);
        }

        if (res?.data?.allreceiptdata?.length > 0) {
          ExportAllReceiptdata(res?.data?.allreceiptdata);
        }

        if (res?.data?.paidfee?.length > 0) {
          ExportPaidFee(res?.data?.paidfee);
        }

        if (res?.data?.pedningfee?.length > 0) {
          ExportPendingFee(res?.data?.pedningfee);
        }

        if (res?.data?.buslist?.length > 0) {
          ExportBuslist(res?.data?.buslist);
        }
        if (res?.data?.expenseslist?.length > 0) {
          ExportExpenses(res?.data?.expenseslist);
        }

        if (res?.data?.hostelist?.length > 0) {
          ExportHostel(res?.data?.hostelist);
        }

        if (res?.data?.roomlist?.length > 0) {
          ExportRoomList(res?.data?.roomlist);
        }
        if (res?.data?.checkinlist?.length > 0) {
          ExportRoomCheckined(res?.data?.checkinlist);
        }
        setloading(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setloading(false);
      }
    });
  };

  console.log(
    "data is",
    frontoffice,
    Library,
    student,
    studentattendance,
    employee,
    employeeattendance,
    hostel,
    transport
  );

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
