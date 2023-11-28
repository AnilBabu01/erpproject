import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./employee.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import AddEmp from "@/component/Institute/employee/AddEmp";
function Payrollreport() {
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
            <AddEmp setOpen={setOpen} />
          </Dialog>
        </div>
      )}
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <form className={styles.searchoptiondiv}>
                <div className={styles.opensearch}>
                  <p>Joining Date</p>
                  <span>
                    <KeyboardArrowDownIcon />
                  </span>
                </div>
                <div className={styles.opensearch}>
                  <p>Resign Date</p>
                  <span>
                    <KeyboardArrowDownIcon />
                  </span>
                </div>
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
            <button onClick={() => handleClickOpen()}>Add Employee</button>
          </div>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <div className={styles.tablecontainer}>
                <table className={styles.tabletable}>
                  <tbody>
                    <tr className={styles.tabletr}>
                      <th className={styles.tableth}>S.NO</th>
                      <th className={styles.tableth}>Emp_Name</th>
                      <th className={styles.tableth}>Emp_Email</th>
                      <th className={styles.tableth}>Emp_Phone</th>
                      <th className={styles.tableth}>Emp_Joining_Date</th>
                      <th className={styles.tableth}>Emp_Resign_Date</th>
                      <th className={styles.tableth}>Address</th>
                      <th className={styles.tableth}>Action</th>
                    </tr>
                    <tr className={styles.tabletr}>
                      <td className={styles.tabletd}>1</td>
                      <td className={styles.tabletd}>Akash Gangwar</td>
                      <td className={styles.tabletd}>ak12@gmail.com</td>
                      <td className={styles.tabletd}>7505786956</td>
                      <td className={styles.tabletd}>28/07/2023</td>
                      <td className={styles.tabletd}>--------</td>
                      <td className={styles.tabletd}>Bisalpur Pilibhit</td>
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
                      <td className={styles.tabletd}>7505786956</td>
                      <td className={styles.tabletd}>28/07/2023</td>
                      <td className={styles.tabletd}>--------</td>
                      <td className={styles.tabletd}>Bisalpur Pilibhit</td>
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
                      <td className={styles.tabletd}>7505786956</td>
                      <td className={styles.tabletd}>28/07/2023</td>
                      <td className={styles.tabletd}>--------</td>
                      <td className={styles.tabletd}>Bisalpur Pilibhit</td>
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
      </div>
    </>
  );
}

export default Payrollreport;
