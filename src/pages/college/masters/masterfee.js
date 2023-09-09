import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import styles from "../employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Addfee from "@/component/Institute/accounts/Addfee";
function Masterfee() {
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
            <Addfee setOpen={setOpen} />
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
                  placeholder="Class name"
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
            <button onClick={() => handleClickOpen()}>Add Fee</button>
          </div>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>S.NO</th>
                    <th className={styles.tableth}>Class_Name</th>
                    <th className={styles.tableth}>Adminssion fee</th>
                    <th className={styles.tableth}>Fee per month</th>
                    <th className={styles.tableth}>Action</th>
                  </tr>
                  <tr className={styles.tabletr}>
                    <td className={styles.tabletd}>1</td>
                    <td className={styles.tabletd}>I Class</td>
                    <td className={styles.tabletd}>2500</td>
                    <td className={styles.tabletd}>250</td>
                    <td className={styles.tabkeddd}>
                      <img src="/images/Delete.png" alt="imgss" />
                      <img src="/images/Edit.png" alt="imgss" />
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

export default Masterfee;
