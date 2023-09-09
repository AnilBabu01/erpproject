import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
function AddStudent({ setOpen }) {
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Student</h1>
        <form>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Employee Name</label>
              <input type="text" placeholder="Enter the name" />
            </div>
            <div className={styles.inputdiv}>
              <label>Institute/School Name</label>
              <input type="email" placeholder="Enter the Institute/School" />
            </div>
            <div className={styles.inputdiv}>
              <label>Employee Email</label>
              <input type="email" placeholder="Enter the Official Email" />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Phone No1</label>
              <input type="text" placeholder="Enter the phone No1" />
            </div>
            <div className={styles.inputdiv}>
              <label>Phone No2</label>
              <input type="text" placeholder="Enter the Phone No2" />
            </div>
            <div className={styles.inputdiv}>
              <label>Type of Employee</label>
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
                  Please select
                </MenuItem>
              </Select>
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Joining Date</label>
              <input type="date" />
            </div>
            <div className={styles.inputdiv}>
              <label>Resign Date</label>
              <input type="date" />
            </div>
            <div className={styles.inputdiv}>
              <label>Address</label>
              <input type="text" placeholder="Enter the Address" />
            </div>
          </div>
          {/* <div className={styles.divmaininput}>
            <div className={styles.inputdivaddred}>
              <label>Address</label>
              <input type="text" placeholder="Enter the address" />
            </div>
          </div> */}
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>City</label>
              <input type="text" placeholder="Enter the city" />
            </div>
            <div className={styles.inputdiv}>
              <label>State</label>
              <input type="text" placeholder="Enter the State" />
            </div>
            <div className={styles.inputdiv}>
              <label>Pin Code</label>
              <input type="text" placeholder="Enter the Pincode" />
            </div>
          </div>

          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Password</label>
              <input type="password" placeholder="Enter the password" />
            </div>
            <div className={styles.inputdiv}>
              <label>Re_Password</label>
              <input type="password" placeholder="Enter the re-password" />
            </div>
            <div className={styles.inputdiv}>
              <label>Profile Photo</label>
              <input type="file" placeholder="Enter the Pincode" />
            </div>
          </div>

          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Create Account</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddStudent;
