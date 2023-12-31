import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getcategory, Addcategory } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
function AddStudentCategory({ setOpen }) {
  const dispatch = useDispatch();
  const [Categoryname, setCategoryname] = useState("");

  const { loading, category } = useSelector((state) => state.addcategory);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      category: Categoryname,
    };
    dispatch(Addcategory(data, setOpen));
  };
  useEffect(() => {
    if (category?.status) {
      dispatch(getcategory());
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Caste</h1>
        <form onSubmit={submit}>
          <div className={styles.inputdivsingle}>
            <div className={styles.inputdivsingle}>
              <label>Caste</label>
              <input
                type="text"
                placeholder="Enter the Caste"
                value={Categoryname}
                name="Categoryname"
                onChange={(e) => setCategoryname(e.target.value)}
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

export default AddStudentCategory;
