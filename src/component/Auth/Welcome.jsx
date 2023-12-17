import React from "react";
import styles from "@/styles/loginguest.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import welcomeicon from "../../../public/images/welcome.png";
function Welcome({ setOpen }) {
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon style={{ color: "white" }} />
        </div>
        <div className={styles.welcomicondiv}>
          <Image src={welcomeicon} height={80} width={80} alt="" />
          <h1>Welcome to our services</h1>
          <h1>Abtechzone</h1>
        </div>
      </div>
    </>
  );
}

export default Welcome;
