import React, { useState, useEffect } from "react";
import styles from "./Coaching.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Teststart from "./Teststart";
import TestAlrt from "./TestAlrt";
import { serverInstance } from "../../API/ServerInstance";
import { useDispatch, useSelector } from "react-redux";
import { getStudenttest } from "../../redux/actions/commanAction";
function TodayTest({ testlist }) {
  const dispatch = useDispatch();
  const [openupdate, setOpenupdate] = useState(false);
  const [openAlert, setopenAlert] = useState(false);
  const [starttestdata, setstarttestdata] = useState("");
  const [alrtsms, setalrtsms] = useState("");

  const ClickOpenupdate = (data) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const twelveHourFormat = hours > 12 ? hours - 12 : hours;
    const formattedTime = `${twelveHourFormat}:${minutes}:${seconds} ${amOrPm}`;

    serverInstance("test/checktesttime", "post", {
      id: data?.id,
      currentTime: formattedTime,
    }).then((res) => {
      if (res?.status === true) {
        setOpenupdate(true);
        setalrtsms(res);
        setstarttestdata(data);
      }
      if (res?.status === false) {
        setopenAlert(true);
        setalrtsms(res);
      }
    });
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

      {openAlert && (
        <div>
          <Dialog
            open={openAlert}
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
            <TestAlrt setopenAlert={setopenAlert} starttestdata={alrtsms} />
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
            {testlist &&
              testlist?.map((item, index) => {
                return (
                  <tr key={index} className={styles.tabletr}>
                    <td className={styles.tabletd}>{item?.testTitle}</td>
                    <td className={styles.tabletd}>{item?.teststarTime}</td>
                    <td className={styles.tabletd}>{item?.testendTime}</td>
                    <td className={styles.tabletd}>
                      {item?.questions?.length}
                    </td>
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
