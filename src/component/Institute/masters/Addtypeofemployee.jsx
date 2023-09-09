import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
function Addtypeofemployee({ setOpen }) {
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Employee Type</h1>
        <form>
          <div className={styles.inputdiv}>
            <label>Employee Type</label>
            <input type="text" placeholder="Enter the Employee Type" />
          </div>
          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addtypeofemployee;
