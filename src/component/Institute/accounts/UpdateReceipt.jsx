import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import {
 getPrintReceipt
} from "../../../redux/actions/commanAction";
import { useDispatch} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function UpdateReceipt({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [PaidDate, setPaidDate] = useState("");
  const [PaidAmount, setPaidAmount] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setloading(true);

    serverInstance("student/getreceiptdata", "put", {
      id: updatedata?.id,
      paidDate: PaidDate,
      paidAmount: PaidAmount,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(getPrintReceipt());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
    });
  };

  useEffect(() => {
    if(updatedata)
    { 
      setPaidDate(updatedata?.PaidDate)
      setPaidAmount(updatedata?.PaidAmount)
    }
  }, [])
  

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Receipt</h1>
        <form onSubmit={submit}>
          <div className={styles.inputdivsingle}>
            <div className={styles.inputdivsingle}>
              <label>Date</label>
              <input
                type="date"
                value={PaidDate}
                name="PaidDate"
                onChange={(e) => setPaidDate(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputdivsingle}>
            <div className={styles.inputdivsingle}>
              <label>Paid Amount</label>
              <input
                type="text"
                placeholder="Enter the paid amount"
                value={PaidAmount}
                name="PaidAmount"
                onChange={(e) => setPaidAmount(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.logbtnstylediv}>
            <button
              disabled={loading ? true : false}
              className={styles.logbtnstyle}
            >
              {loading ? (
                <CircularProgress size={25} style={{ color: "red" }} />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateReceipt;
