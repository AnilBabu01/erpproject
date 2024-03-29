import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getcourse, Addcourse } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
function AddCourse({ setOpen }) {
  
  const dispatch = useDispatch();
  const [coursename, setcoursename] = useState("");
  const [courseduration, setcourseduration] = useState("");
  const { course, loading } = useSelector((state) => state.addcourse);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      coursename: coursename,
      courseduration: courseduration,
    };
    dispatch(Addcourse(data, setOpen));
  };
  useEffect(() => {
    if (course?.status) {
      dispatch(getcourse());
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add New Course</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Course</label>
              <input
                type="text"
                placeholder="Enter the Course Name"
                value={coursename}
                name="coursename"
                onChange={(e) => setcoursename(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Duration in month</label>
              <input
                type="number"
                placeholder="Enter the Course Duration"
                value={courseduration}
                name="courseduration"
                onChange={(e) => setcourseduration(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.logbtnstylediv}>
            <button
              disabled={loading ? true : false}
              className={styles.logbtnstyle}
            >
              {loading ? (
                <CircularProgress size={25} style={{ color: "red" }} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCourse;
