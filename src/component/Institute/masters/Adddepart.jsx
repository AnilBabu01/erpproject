import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepartment,
  AddDepartment,
} from "../../../redux/actions/commanAction";
import CircularProgress from "@mui/material/CircularProgress";
function Adddepart({ setOpen }) {
  const dispatch = useDispatch();
  const [designationname, setdesignationname] = useState("");
  const { loading, designation } = useSelector((state) => state.adddepart);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      DepartmentName: designationname,
    };
    dispatch(AddDepartment(data, setOpen));
  };
  useEffect(() => {
    if (designation?.status) {
      dispatch(getDepartment());
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Department</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Department</label>
              <input
                type="text"
                placeholder="Enter the Department"
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

export default Adddepart;
