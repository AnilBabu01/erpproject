import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDesignation,
  AddDesignation,
} from "../../../redux/actions/commanAction";
function Addtypeofemployee({ setOpen }) {
  const dispatch = useDispatch();
  const [designationname, setdesignationname] = useState("");
  const { loading, designation } = useSelector((state) => state.adddesignation);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      employeetype: designationname,
    };
    dispatch(AddDesignation(data, setOpen));
  };
  useEffect(() => {
    if (designation?.status) {
      dispatch(getDesignation());
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Designation</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Designation</label>
              <input
                type="text"
                placeholder="Enter the Designation"
                value={designationname}
                name="designationname"
                onChange={(e) => setdesignationname(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addtypeofemployee;
