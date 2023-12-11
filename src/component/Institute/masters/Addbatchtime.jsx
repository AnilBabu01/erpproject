import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { Addbatch, getbatch } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function Addbatchtime({ setOpen }) {
  const dispatch = useDispatch();
  const [starttime, setstarttime] = useState("01:00");
  const [endtime, setendtime] = useState("01:00");
  const [startmedian, setstartmedian] = useState("AM");
  const [endmedian, setendmedian] = useState("AM");
  const { batch, loading } = useSelector((state) => state.addbatch);
  const submit = (e) => {
    e.preventDefault();
    const data = {
      StartingTime: `${starttime} ${startmedian} `,
      EndingTime: `${endtime} ${endmedian}`,
    };
    dispatch(Addbatch(data, setOpen));
  };
  useEffect(() => {
    if (batch?.status) {
      dispatch(getbatch());
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Batch</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.selecttimemain}>
              <label>Starting Time</label>
              <div className={styles.selectinnear}>
                <select
                  value={starttime}
                  name="starttime"
                  onChange={(e) => setstarttime(e.target.value)}
                >
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                </select>
                <select
                  value={startmedian}
                  name="startmedian"
                  onChange={(e) => setstartmedian(e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div className={styles.selecttimemain}>
              <label>Ending Time</label>
              <div className={styles.selectinnear}>
                <select
                  value={endtime}
                  name="endtime"
                  onChange={(e) => setendtime(e.target.value)}
                >
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                </select>
                <select
                  value={endmedian}
                  name="endmedian"
                  onChange={(e) => setendmedian(e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
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

export default Addbatchtime;
