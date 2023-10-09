import React, { useState } from "react";
import styles from "./Coaching.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Teststart from "./Teststart";
function TodayTest({ testlist }) {
  const [openupdate, setOpenupdate] = useState(false);
  const [starttestdata, setstarttestdata] = useState("");
  const ClickOpenupdate = (data) => {
    setOpenupdate(true);
    setstarttestdata(data);
  };
  const handleCloseupadte = () => {
    setOpenupdate(false);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });
  return (
    <>
      {openupdate && (
        <div>
          <Dialog
            open={openupdate}
            TransitionComponent={Transition}
            onClose={handleCloseupadte}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "30rem",
                },
              },
            }}
          >
            <Teststart
              handleCloseupadte={handleCloseupadte}
              starttestdata={starttestdata}
            />
          </Dialog>
        </div>
      )}
      <div className={styles.tablecontainer}>
        <table className={styles.tabletable}>
          <tbody>
            <tr className={styles.tabletr}>
              <th className={styles.tableth}>Test Title</th>
              <th className={styles.tableth}>Start Time</th>
              <th className={styles.tableth}>End Time</th>
              <th className={styles.tableth}>Total Questions</th>
              {/* <th className={styles.tableth}>Passinf Marks</th> */}
              <th className={styles.tableth}>Action</th>
            </tr>
            {testlist&&testlist?.map((item, index) => {
              return (
                <tr key={index} className={styles.tabletr}>
                  <td className={styles.tabletd}>{item?.testTitle}</td>
                  <td className={styles.tabletd}>{item?.teststarTime}</td>
                  <td className={styles.tabletd}>{item?.testendTime}</td>
                  <td className={styles.tabletd}>{item?.questions?.length}</td>
                  {/* <td className={styles.tabletd}>8</td> */}
                  <td className={styles.tabletd}>
                    <button
                      className={styles.btnactive}
                      onClick={() => ClickOpenupdate(item)}
                    >
                      Start Test
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TodayTest;
