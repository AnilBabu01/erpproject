import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styles from "@/styles/loginguest.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../API/ServerInstance";

function ForgetEmail({ setOpen, setOpenlogin }) {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [showprogrees, setshowprogrees] = useState(false);
  const [showprogrees1, setshowprogrees1] = useState(false);
  const [timestatus, settimestatus] = useState(false);
  const [time, settime] = useState(60);
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
    setshowprogrees(true);
    serverInstance("clientVerify/GetforgetOtpEmail", "put", {
      otp: emailOtp,
      newpassword: password,
      confirmpassword: confirmpassword,
      emailOrphone: email,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });

        setOpenlogin(true);
        setOpen(false);
        setshowprogrees(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setshowprogrees(false);
      }
    });
  };

  const getopt = () => {
    setshowprogrees1(true);

    serverInstance("clientVerify/GetforgetOtpEmail", "post", {
      mobileNo: email,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setemailreceiveotp(true);
        starttimer();
        setshowprogrees1(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setshowprogrees1(false);
        stoptimer();
      }
    });
  };

  const stoptimer = () => {
    settimestatus(false);
    setemailreceiveotp(false);

    settime(60);
  };

  const starttimer = () => {
    settimestatus(true);

    if (timestatus) {
      if (time > 0) {
        setTimeout(() => {
          settime(time - 1);
        }, 1000);
      } else {
        stoptimer();
      }
    }
  };

  useEffect(() => {
    starttimer();
  }, [time]);
  1;

  return (
    <>
      <div>
        {emailreceiveotp === true ? (
          <>
            <h1>
              Otp sent on {email}
              {emailreceiveotp && (
                <>
                  <p>{time}</p>
                </>
              )}
            </h1>
            <div className={styles.inputdiv}>
              <label>Otp</label>
              <input
                required
                type="text"
                placeholder="Enter the otp"
                value={emailOtp}
                name="emailOtp"
                onChange={(e) => setemailOtp(e.target.value)}
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
                type={showconfirmpassword ? "text" : "password"}
                placeholder="Enter the password"
                value={confirmpassword}
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
              <label></label>
              <input
                required
                type="email"
                placeholder="Enter the email"
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
                {showprogrees ? (
                  <CircularProgress size={25} />
                ) : (
                  "Forget Password"
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.logbtnstylediv}>
              <button className={styles.logbtnstyle} onClick={() => getopt()}>
                {showprogrees1 ? <CircularProgress size={25} /> : "Get code"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ForgetEmail;
