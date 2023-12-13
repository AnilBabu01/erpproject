import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetNotic } from "../../../redux/actions/commanAction";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
function AddNotic({ setOpen }) {
  const dispatch = useDispatch();
  const [session, setsession] = useState("");

  const [loading, setloading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);

    serverInstance("comman/notes", "post", {
      Notestext: session,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetNotic());
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
        <h1>Add Notic</h1>
        <form onSubmit={submit}>
        <label>NOTIC</label>
          <textarea
            className={styles.textarextdiv}
            required
            type="text"
            placeholder="Enter The Notic"
            value={session}
            name="session"
            onChange={(e) => setsession(e.target.value)}
          />

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
      {loading && <LoadingSpinner />}
    </>
  );
}

export default AddNotic;
