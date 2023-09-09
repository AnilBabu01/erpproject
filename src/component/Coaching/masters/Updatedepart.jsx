import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdateDepartment } from "../../../redux/actions/commanAction";
function Updatedepart({ updatedata, setOpen }) {
  const dispatch = useDispatch();
  const [designationname, setdesignationname] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const data = {
      id: updatedata?.id,
      DepartmentName: designationname,
    };
    dispatch(UpdateDepartment(data, setOpen));
  };

  useEffect(() => {
    if (updatedata) {
      setdesignationname(updatedata?.DepartmentName);
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
            <button className={styles.logbtnstyle}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Updatedepart;
