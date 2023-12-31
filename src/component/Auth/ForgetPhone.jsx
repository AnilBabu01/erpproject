import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "@/styles/loginguest.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
function ForgetPhone() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showonldpassword, setshowonldpassword] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);
  const [emailreceiveotp, setemailreceiveotp] = useState(false);
  const [emailotpstatus, setemailotpstatus] = useState(false);
  const [emailOtp, setemailOtp] = useState("");

  const submit = () => {
    if (password !== confirmpassword) {
      toast.error("Must be password and confirm password same", {
        autoClose: 1000,
      });
      return 0;
    }
  };

  const getopt = () => {};

  useEffect(() => {}, []);

  return (
    <>
      <div>
        {emailreceiveotp === true ? (
          <>
            <h1>Otp sent on {email}</h1>
            <div className={styles.inputdiv}>
              <label>Otp</label>
              <input
                required
                type="text"
                placeholder="Enter the otp"
                value={password}
                name="password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Password</label>
              <input
                type={showonldpassword ? "text" : "password"}
                placeholder="Enter the password"
                value={password}
                name="password"
                onChange={(e) => setpassword(e.target.value)}
              />

              <li
                className={styles.showpassbtn}
                onClick={() => setshowonldpassword(!showonldpassword)}
              >
                {showonldpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </li>
            </div>
            <div className={styles.inputdiv}>
              <label>Confirm Password</label>
              <input
                type={showonldpassword ? "text" : "password"}
                placeholder="Enter the password"
                value={showconfirmpassword}
                name="confirmpassword"
                onChange={(e) => setconfirmpassword(e.target.value)}
              />

              <li
                className={styles.showpassbtn}
                onClick={() => setshowconfirmpassword(!showconfirmpassword)}
              >
                {showconfirmpassword ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </li>
            </div>
          </>
        ) : (
          <>
            <div className={styles.inputdiv}>
              <label>Mobile No</label>
              <input
                required
                type="text"
                placeholder="Enter the mobile no"
                value={email}
                name="email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
          </>
        )}
        {emailreceiveotp === true ? (
          <>
            <div className={styles.logbtnstylediv}>
              <button className={styles.logbtnstyle} onClick={() => submit()}>
                Forget password
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.logbtnstylediv}>
              <button className={styles.logbtnstyle} onClick={() => getopt()}>
                Get otp
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ForgetPhone;
