import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import {
  getReceiptPrefix,
  AddReceiptPrefix,
} from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
function AddEmpIdPrefix({ setOpen }) {
  const dispatch = useDispatch();
  const [coursename, setcoursename] = useState("");
  const { ReceiptFormat, loading } = useSelector(
    (state) => state.addReceiptFormat
  );
  const submit = (e) => {
    e.preventDefault();
    const data = {
      receiptPrefix: coursename,
    };
    dispatch(AddReceiptPrefix(data, setOpen));
  };
  useEffect(() => {
    if (ReceiptFormat?.status) {
      dispatch(getReceiptPrefix());
    }
  }, [ReceiptFormat]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Employee Id Prefix</h1>
        <form onSubmit={submit}>
          <div className={styles.inputdivsingle}>
            <div className={styles.inputdivsingle}>
              <label>Prefix</label>
              <input
                type="text"
                placeholder="Enter the Receipt Prefix"
                value={coursename}
                name="coursename"
                onChange={(e) => setcoursename(e.target.value)}
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
                "Save "
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddEmpIdPrefix;
