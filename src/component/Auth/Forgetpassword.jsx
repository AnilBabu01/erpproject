import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/loginguest.module.css";
import ForgetEmail from "./ForgetEmail";
import ForgetPhone from "./ForgetPhone";
function Forgetpassword({ setOpen }) {
  const [showloginoption, setshowloginoption] = useState(true);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondivauth} onClick={() => setOpen(false)}>
          <CloseIcon style={{ color: "white" }} />
        </div>

        <h1>Forget Password</h1>
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
            Phone
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
            Email
          </Button>
        </div>

        {showloginoption === true && (
          <>
            <ForgetPhone />
          </>
        )}

        {showloginoption === false && (
          <>
            <ForgetEmail />
          </>
        )}
      </div>
    </>
  );
}

export default Forgetpassword;
