import React from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "@/styles/register.module.css";
function register() {
  return (
    <>
      <div className="mainContainer">
        <div className={styles.positionrelative}>
          <div className={styles.innearAbsolute}>
            <img src="/images/authbgimg.jpeg" alt="Logo" />
          </div>
          <div className={styles.upAbsolute}>
            <div className={styles.divmainlogin}>
              <h1>New Institute/School Registration</h1>
              <form>
                <div className={styles.divmaininput}>
                  <div className={styles.inputdiv}>
                    <label>Name</label>
                    <input type="text" placeholder="Enter the name" />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Institute/School Name</label>
                    <input
                      type="email"
                      placeholder="Enter the Institute/School"
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Official Email</label>
                    <input
                      type="email"
                      placeholder="Enter the Official Email"
                    />
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
                    <label>Type of organization</label>
                    <Select
                      required
                      sx={{
                        width: "15rem",
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
                  <div className={styles.inputdivaddred}>
                    <label>Address</label>
                    <input type="text" placeholder="Enter the address" />
                  </div>
                </div>
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
                    <label>Upload Institute/School Logo</label>
                    <input type="file" placeholder="Enter the Pincode" />
                  </div>
                </div>
                <div className={styles.logbtnstylediv}>
                  <button className={styles.logbtnstyle}>Create Account</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default register;
