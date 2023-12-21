import React, { useState } from "react";
import styles from "@/styles/register.module.css";
import { serverInstance } from "../API/ServerInstance";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function Changepassword() {
  const [showold, setshowold] = useState(false);
  const [shownew, setshownew] = useState(false);
  const [showconnew, setshowconnew] = useState(false);
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmnewpassword, setconfirmnewpassword] = useState("");
  const [loading, setloading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);

    serverInstance("comman/Changepassword", "post", {
      oldpassword: oldpassword,
      newpassword: newpassword,
      confirmnewpassword: confirmnewpassword,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
    });
  };

  return (
    <>
      <div className="mainContainer">
        <div className="mainchangepassword">
          <div className={styles.divmainlogin10}>
            <h1>Change password</h1>
            <form onSubmit={submit}>
              <div className={styles.divmaininput}>
                <div className={styles.inputdivchangepassword}>
                  <label>Old password</label>
                  <input
                    required
                    type={showold ? "text" : "password"}
                    placeholder="Enter Old password"
                    value={oldpassword}
                    name="oldpassword"
                    onChange={(e) => setoldpassword(e.target.value)}
                  />
                  <li
                    className={styles.showpassbtn}
                    onClick={() => setshowold(!showold)}
                  >
                    {showold ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </li>
                </div>
                <div className={styles.inputdivchangepassword}>
                  <label>New password</label>
                  <input
                    required
                    type={shownew ? "text" : "password"}
                    placeholder="Enter New password"
                    value={newpassword}
                    name="newpassword"
                    onChange={(e) => setnewpassword(e.target.value)}
                  />
                    <li
                    className={styles.showpassbtn}
                    onClick={() => setshownew(!shownew)}
                  >
                    {shownew ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </li>
                </div>
                <div className={styles.inputdivchangepassword}>
                  <label>Confirm New password</label>
                  <input
                    required
                    type={showconnew ? "text" : "password"}
                    placeholder="Enter Confirm New password"
                    value={confirmnewpassword}
                    name="confirmnewpassword"
                    onChange={(e) => setconfirmnewpassword(e.target.value)}
                  />
                      <li
                    className={styles.showpassbtn}
                    onClick={() => setshowconnew(!showconnew)}
                  >
                    {showconnew ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </li>
                </div>
              </div>
              <div className={styles.logbtnstylediv}>
                <button
                  disabled={loading ? true : false}
                  className={styles.logbtnstyle}
                >
                  {loading ? (
                    <CircularProgress size={25} style={{ color: "red" }} />
                  ) : (
                    "Change"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Changepassword;
