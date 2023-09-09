import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
function Addfee({ setOpen }) {
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add fee to Class</h1>
        <form>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Addmission Fee</label>
              <input type="text" placeholder="Enter the adminssion" />
            </div>
            <div className={styles.inputdiv}>
              <label>Fee per month</label>
              <input type="text" placeholder="Enter the per month" />
            </div>
            <div className={styles.inputdiv}>
              <label>Class</label>
              <Select
                required
                className={styles.addwidth}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                // value={item.type}
                // onChange={(e) =>
                //   handleDonationItemUpdate(item, 'type', e.target.value)
                // }
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Please select Class
                </MenuItem>
              </Select>
            </div>
          </div>
          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Save Fee</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addfee;
