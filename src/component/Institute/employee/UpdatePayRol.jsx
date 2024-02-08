import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetPayRoll } from "../../../redux/actions/payrollActions";
import { useDispatch } from "react-redux";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function UpdatePayRol({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  const [paiddate, setpaiddate] = useState("");
  const [paidamount, setpaidamount] = useState("");
  const [paymode, setpaymode] = useState("");

  const submit = (e) => {
    e.preventDefault();
    try {
      const data = { data: updatedata?.monthdetials,paidamount:paidamount };
      serverInstance("payroll/payempsalary", "put", data).then((res) => {
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          dispatch(GetPayRoll());
          setOpen(false);
        }

        if (res?.status === false) {
          toast.error(res?.msg, { autoClose: 1000 });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (updatedata) {
      setpaymode(updatedata?.monthdetials?.PayOption);
      setpaiddate(
        new Date(updatedata?.monthdetials?.PaidDate)
          ?.toISOString()
          .substring(0, 10)
      );
      setpaidamount(updatedata?.monthdetials?.PaidAmount);
    }
  }, [updatedata]);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Salary</h1>

        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Paid Date</label>
              <input
                type="date"
                disabled={true}
                value={paiddate}
                name="paiddate"
                onChange={(e) => setpaiddate(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Paid Salary</label>
              <input
                type="text"
                placeholder="Enter the Comment"
                value={paidamount}
                name="paidamount"
                onChange={(e) => setpaidamount(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Pay Mode</label>
              <input
                type="text"
                disabled={true}
                value={paymode}
                name="paymode"
                onChange={(e) => setpaymode(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdatePayRol;
