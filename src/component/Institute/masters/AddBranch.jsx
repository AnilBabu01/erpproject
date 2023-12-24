import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
function AddBranch({ setOpen }) {
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add New Branch</h1>
        <form>
          <div className={styles.inputdivsingle}>
            <label>Branch</label>
            <input type="text" placeholder="Enter the Branch Name" />
          </div>
          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBranch;
