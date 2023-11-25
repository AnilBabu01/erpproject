import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetFacility } from "../../../redux/actions/hostelActions";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function UpdateFacility({ updatedata, setOpen }) {
  const dispatch = useDispatch();
  const [Categoryname, setCategoryname] = useState("");
  const [loading, setloading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("hostel/facility", "put", {
      id: updatedata?.id,
      roomFacility: Categoryname,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetFacility());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
    });
  };
  useEffect(() => {
    if (updatedata) {
      setCategoryname(updatedata?.roomFacility);
    }
  }, []);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Facility</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Facility</label>
              <input
                type="text"
                placeholder="Enter the Facility"
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
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateFacility;
