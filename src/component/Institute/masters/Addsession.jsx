import React, { useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetSession } from "../../../redux/actions/commanAction";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import LoadingSpinner from "@/component/loader/LoadingSpinner";

function Addsession({ setOpen }) {
  const dispatch = useDispatch();
  const [session, setsession] = useState("");

  const [loading, setloading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);

    serverInstance("comman/session", "post", {
      session: session,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetSession());
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
        <h1>Add New Session</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Session</label>
              <input
                type="text"
                placeholder="Enter The Session"
                value={session}
                name="session"
                onChange={(e) => setsession(e.target.value)}
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
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Addsession;
