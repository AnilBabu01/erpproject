import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { login, loadUser } from "../../redux/actions/authActions";
import { useRouter } from "next/router";
import LoadingSpinner from "../../component/loader/LoadingSpinner";
import styles from "@/styles/loginguest.module.css";

function StudentLogin({ setOpen, setOpen1 }) {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const [showloginoption, setshowloginoption] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("erptoken", user?.data[0]?.token);
      dispatch(loadUser());
      setOpen(false);
      if (user?.data[0]?.user?.userType === "admin") {
        navigate.push("/mainadmin/dashboard");
      }
      if (user?.data[0]?.user?.userType === "Institute") {
        navigate.push("/institute/dashboard");
      }
      if (user?.data[0]?.user?.userType === "Teacher") {
        navigate.push("/teacher/dashboard");
      }
    }
  }, [user]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>

        <h1>Login</h1>
        <div className={styles.selectbtn}>
          <Button
            className={showloginoption ? styles.btnActive : styles.btndeActive}
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
            Student
          </Button>

          <Button
            className={showloginoption ? styles.btndeActive : styles.btnActive}
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
            Parent
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
                <button className={styles.logbtnstyle}>Login As Guest</button>
              </div>
            </form>
          </>
        )}

        {showloginoption === true && (
          <>
            <form onSubmit={submit}>
              <div className={styles.inputdiv}>
                <label>Admission Number</label>
                <input
                  type="number"
                  placeholder="Enter the Admission"
                  value={email}
                  name="email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className={styles.inputdiv}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter the password"
                  value={password}
                  name="password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>

              <div className={styles.inputdiv}>
                <label>Institute/School Code</label>
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
                    Please select Code
                  </MenuItem>
                </Select>
              </div>

              <div className={styles.logbtnstylediv}>
                <button className={styles.logbtnstyle}>Login</button>
              </div>
            </form>
          </>
        )}
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default StudentLogin;
