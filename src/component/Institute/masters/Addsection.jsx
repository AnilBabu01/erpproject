import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetSection } from "../../../redux/actions/commanAction";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";

function Addsection({ setOpen }) {
  const dispatch = useDispatch();
  const [section, setsection] = useState("");
  const [loading, setloading] = useState(false);

  
  const submit = (e) => {
    e.preventDefault();
    setloading(true);

    serverInstance("comman/section", "post", {
      section: section,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetSection());
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
        <h1>Add New Section</h1>
        <form onSubmit={submit}>
          <div className={styles.inputdivsingle}>
            <div className={styles.inputdivsingle}>
              <label>Section</label>
              <input
                type="text"
                placeholder="Enter The Section"
                value={section}
                name="section"
                onChange={(e) => setsection(e.target.value)}
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

export default Addsection;
