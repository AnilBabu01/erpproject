import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getcourse, UpdateCourse } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
function Updatecourse({ updatedata, setOpen }) {
  const dispatch = useDispatch();
  const [coursename, setcoursename] = useState("");
  const [courseduration, setcourseduration] = useState("");
  const { course, loading } = useSelector((state) => state.editcourse);
  const submit = (e) => {
    e.preventDefault();
    const data = {
      id: updatedata?.id,
      coursename: coursename,
      courseduration: courseduration,
    };
    dispatch(UpdateCourse(data, setOpen));
  };
  useEffect(() => {
    if (updatedata) {
      setcoursename(updatedata?.coursename);
      setcourseduration(updatedata?.courseduration);
    }
  }, []);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Course</h1>
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

export default Updatecourse;
