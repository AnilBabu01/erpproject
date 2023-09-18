import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCourseDuration } from "../../../redux/actions/commanAction";
function UpdateDuartion({ updatedata, setOpen }) {
  const dispatch = useDispatch();
  const [designationname, setdesignationname] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const data = {
      id: updatedata?.id,
      noOfMonth: designationname,
    };
    dispatch(UpdateCourseDuration(data, setOpen));
  };

  useEffect(() => {
    if (updatedata) {
      setdesignationname(updatedata?.noOfMonth);
    }
  }, []);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Course Duration</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Course Duration</label>
              <input
                type="text"
                min='12'
                max='36'
                placeholder="Enter the Course Duration"
                value={designationname}
                name="designationname"
                onChange={(e) => setdesignationname(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateDuartion;
