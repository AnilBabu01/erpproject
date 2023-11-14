import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseDuration,
  AddCourseDuration,
} from "../../../redux/actions/commanAction";
import CircularProgress from "@mui/material/CircularProgress";
function AddDuration({ setOpen }) {
  const dispatch = useDispatch();
  const [designationname, setdesignationname] = useState("");
  const { loading, designation } = useSelector((state) => state.addCourseDur);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      noOfMonth: designationname,
    };
    dispatch(AddCourseDuration(data, setOpen));
  };
  useEffect(() => {
    if (designation?.status) {
      dispatch(getCourseDuration());
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Course Duration In Month</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Course Duration</label>
              <input
                type="number"
                min="12"
                max="36"
                placeholder="Enter the Course Duration"
                value={designationname}
                name="designationname"
                onChange={(e) => setdesignationname(e.target.value)}
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

export default AddDuration;
