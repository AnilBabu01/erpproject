import React,{useState} from "react";
import styles from "../Student/Coaching.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import StudentDetails from "./StudentDetails";
function StudentList() {
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
                  maxWidth: "60rem",
                },
              },
            }}
          >
            <StudentDetails handleCloseupadte={handleCloseupadte} />
          </Dialog>
        </div>
      )}
      <div className={styles.tablecontainer}>
        <table className={styles.tabletable}>
          <tbody>
            <tr className={styles.tabletr}>
              <th className={styles.tableth}>Name</th>
              <th className={styles.tableth}>Course</th>
              <th className={styles.tableth}>Batch Time</th>
              <th className={styles.tableth}>Details</th>
            </tr>
            <tr className={styles.tabletr}>
              <td className={styles.tabletd}>1</td>
              <td className={styles.tabletd}>data</td>
              <td className={styles.tabletd}>data</td>
              <td className={styles.tabletd}>
                <button onClick={() => ClickOpenupdate()}>View Details</button>
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

export default StudentList;
