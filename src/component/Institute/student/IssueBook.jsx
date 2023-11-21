import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Addtest } from "../../../redux/actions/commanAction";
import CircularProgress from "@mui/material/CircularProgress";

const formData = new FormData();
function IssueBook({ setOpen }) {
  const dispatch = useDispatch();

  const [batchs, setbatchs] = useState([]);
  const [classlist, setclasslist] = useState([]);
  const [courses, setcourses] = useState("");

  const { course } = useSelector((state) => state.getcourse);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);
  const { loading, test } = useSelector((state) => state.addTest);
  ///2:39:35 PM

  const submit = () => {
    dispatch(Addtest(formData, setOpen));
  };
  useEffect(() => {
    if (course) {
      setclasslist(course);
    }
    if (batch) {
      setbatchs(batch);
    }
  }, [course, batch]);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Issue Book</h1>
        <form>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Student Name</label>
              <input
                required
                type="text"
                placeholder="Enter Name"
                // value={testname}
                // name="testname"
                // onChange={(e) => settestname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Class</label>
              <input
                required
                type="text"
                placeholder="Enter Class"
                // value={testname}
                // name="testname"
                // onChange={(e) => settestname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Roll Number</label>
              <input
                required
                type="text"
                placeholder="Enter Roll Number"
                // value={testname}
                // name="testname"
                // onChange={(e) => settestname(e.target.value)}
              />
            </div>
          </div>
          <div>
            <table className={styles.tabletable}>
              <tbody>
                <tr className={styles.tabletr}>
                  <th className={styles.tableth}>Book Id</th>
                  <th className={styles.tableth}>Titile</th>
                  <th className={styles.tableth}>Issue</th>
               
                </tr>

                <tr className={styles.tabletr}>
                  <td className={styles.tableth}>BK01</td>
                  <td className={styles.tableth}>Hindi Book</td>
                 
                  <td className={styles.tableth}>
                    <input type="checkbox" name="vehicle1" value="Bike" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
        <div className={styles.mainbtnndivcancel}>
          <button onClick={() => setnext(false)} className={styles.cancelbtn}>
            Back
          </button>
          <button className={styles.cancelbtn} onClick={() => submit()}>
            {loading ? (
              <CircularProgress size={25} style={{ color: "red" }} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default IssueBook;
