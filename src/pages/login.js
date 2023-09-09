import React, { useState } from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "@/styles/loginguest.module.css";
import { useRouter } from "next/router";

function loginguet() {
  const router = useRouter();

  const [showloginoption, setshowloginoption] = useState(false);

  return (
    <>
      <div className="mainContainer">
        <div className={styles.positionrelative}>
          <div className={styles.innearAbsolute}>
            <img src="/images/authbgimg.jpeg" alt="Logo" />
          </div>
          <div className={styles.upAbsolute}>
            <div className={styles.divmainlogin}>
              <h1>Login</h1>
              <div className={styles.selectbtn}>
                <Button
                  className={
                    showloginoption ? styles.btndeActive : styles.btnActive
                  }
                  variant={showloginoption ? "outlined" : "contained"}
                  sx={{
                    borderColor: "#C8C8C8",
                    fontSize: 12,
                    minWidth: 100,
                    padding: 0.5,
                    color: showloginoption ? "#093959" : "#fff",
                  }}
                  onClick={() => setshowloginoption(false)}
                >
                  Guest
                </Button>

                <Button
                  className={
                    showloginoption ? styles.btnActive : styles.btndeActive
                  }
                  variant={showloginoption ? "contained" : "outlined"}
                  sx={{
                    borderColor: "#C8C8C8",
                    fontSize: 12,
                    minWidth: 100,
                    padding: 0.5,
                    color: showloginoption ? "#fff" : "#093959",
                  }}
                  onClick={() => setshowloginoption(true)}
                >
                  Login
                </Button>
              </div>

              {showloginoption === false && (
                <>
                  <form>
                    <div className={styles.inputdiv}>
                      <label>Email</label>
                      <input type="email" placeholder="Enter the email" />
                    </div>
                    <div className={styles.inputdiv}>
                      <label>Phone Number</label>
                      <input type="email" placeholder="Enter the phone" />
                    </div>
                    <div className={styles.inputdiv}>
                      <label>Type of institute</label>
                      <Select
                        required
                        sx={{
                          width: "100%",
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
                    <div className={styles.logbtnstylediv}>
                      <button className={styles.logbtnstyle}>
                        Login As Guest
                      </button>
                    </div>
                  </form>
                </>
              )}

              {showloginoption === true && (
                <>
                  <form>
                    <div className={styles.inputdiv}>
                      <label>Phone Number</label>
                      <input type="email" placeholder="Enter the email" />
                    </div>
                    <div className={styles.inputdiv}>
                      <label>Password</label>
                      <input type="email" placeholder="Enter the phone" />
                    </div>
                    <div className={styles.forgottext}>
                      <h2>Forget Password ?</h2>
                    </div>

                    <div className={styles.logbtnstylediv}>
                      <button className={styles.logbtnstyle}>Login</button>
                    </div>
                  </form>
                  <div className={styles.logbtnstyledivcreate}>
                    <button onClick={() => router.push("/register")}>
                      Create a account
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default loginguet;
