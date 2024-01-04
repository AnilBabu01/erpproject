import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetCategory } from "../../../redux/actions/hostelActions";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function AddCategory({ setOpen }) {
  const dispatch = useDispatch();
  const [roomCategory, setroomCategory] = useState("");
  const [loading, setloading] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("hostel/category", "post", {
      roomCategory: roomCategory,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetCategory());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
    });
  };

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Category</h1>
        <form onSubmit={submit}>
        
            <div className={styles.inputdiv20}>
              <label>Category</label>
              <input
                type="text"
                placeholder="Enter the Category"
                value={roomCategory}
                name="roomCategory"
                onChange={(e) => setroomCategory(e.target.value)}
              />
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

export default AddCategory;
