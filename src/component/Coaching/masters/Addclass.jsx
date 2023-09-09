import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
function Addclass({ setOpen }) {
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add New Class</h1>
        <form>
          <div className={styles.inputdiv}>
            <label>Class</label>
            <input type="text" placeholder="Enter the Class" />
          </div>
          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Save Class</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addclass;
