import React,{useState} from "react";
import styles from "./Coaching.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Teststart from './Teststart'
function TodayTest() {
  const [openupdate, setOpenupdate] = useState(false);

  const ClickOpenupdate = () => {
    setOpenupdate(true);
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
           <Teststart handleCloseupadte={handleCloseupadte}/>
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
              <th className={styles.tableth}>Passinf Marks</th>
              <th className={styles.tableth}>Action</th>
            </tr>

            <tr className={styles.tabletr}>
              <td className={styles.tabletd}>Demo</td>
              <td className={styles.tabletd}>01:10 PM</td>
              <td className={styles.tabletd}>01:30 PM</td>
              <td className={styles.tabletd}>20</td>
              <td className={styles.tabletd}>8</td>
              <td className={styles.tabletd}>
                <button
                  className={styles.btnactive}
                  onClick={() => ClickOpenupdate()}
                >
                  Start Test
                </button>
              </td>
            </tr>
            {/* {isdata?.map((item, index) => {
                      return (
                       
                      );
                    })} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TodayTest;
