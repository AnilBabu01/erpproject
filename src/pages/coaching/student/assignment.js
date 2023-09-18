import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getcourse,
  getbatch,
 
} from "../../../redux/actions/commanAction";
import styles from "../employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import AddTest from "@/component/Coaching/student/AddTest";

function Assignment() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  const handleCloseregister = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
  }, []);

  return (
    <>
      {open && (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleCloseregister}
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
            <AddTest setOpen={setOpen} />
          </Dialog>
        </div>
      )}
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <form className={styles.searchoptiondiv}>
                <input
                  className={styles.opensearchinput}
                  type="text"
                  placeholder="Text Time"
                />
                <button>Search</button>
              </form>
              <button>Reset</button>
            </div>
            <div className={styles.imgdivformat}>
              <img
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />
              <img
                className={styles.imgdivformatimg}
                src="/images/ExportPdf.png"
                alt="img"
              />
              <img src="/images/ExportExcel.png" alt="img" />
            </div>
          </div>

          <div className={styles.addtopmenubar}>
            <button onClick={() => handleClickOpen()}>Add Test</button>
          </div>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>S.NO</th>
                    <th className={styles.tableth}>Test Start Time</th>
                    <th className={styles.tableth}>Test End Time</th>

                    <th className={styles.tableth}>Action</th>
                  </tr>
                  <tr className={styles.tabletr}>
                    <td className={styles.tabletd}>1</td>
                    <td className={styles.tabletd}>Akash Gangwar</td>
                    <td className={styles.tabletd}>ak12@gmail.com</td>

                    <td className={styles.tabkeddd}>
                      <img src="/images/Delete.png" alt="imgss" />
                      <img src="/images/Edit.png" alt="imgss" />
                      <img src="/images/eye.png" alt="imgss" />
                    </td>
                  </tr>
                  <tr className={styles.tabletr}>
                    <td className={styles.tabletd}>1</td>
                    <td className={styles.tabletd}>Akash Gangwar</td>
                    <td className={styles.tabletd}>ak12@gmail.com</td>

                    <td className={styles.tabkeddd}>
                      <img src="/images/Delete.png" alt="imgss" />
                      <img src="/images/Edit.png" alt="imgss" />
                      <img src="/images/eye.png" alt="imgss" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Assignment;
