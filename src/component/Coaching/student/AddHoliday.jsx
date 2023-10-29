import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import {getHolidays} from '../../../redux/actions/attendanceActions'
import { useDispatch, useSelector } from "react-redux";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function AddHoliday({ setOpen }) {
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [comment, setcomment] = useState("");
  const [Holidaydate, setHolidaydate] = useState("");
  const [batchname, setbatchname] = useState("");
  const [forallbatch, setforallbatch] = useState("default");
  const { course } = useSelector((state) => state.getcourse);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);
  const submit = (e) => {
    e.preventDefault();
    try {
      const data = {
        holidaydate: Holidaydate,
        batchname: batchname,
        comment: comment,
        forbatch: forallbatch,
      };
      serverInstance("attendanceatudent/holidy", "post", data).then((res) => {
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          dispatch(getHolidays());
          // navigation.goBack();
          setOpen(false);
        }

        if (res?.status === false) {
          toast.error(res?.msg, { autoClose: 1000 });
          dispatch(getHolidays());
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (course) {
      setisData(course);
    }
    if (batch) {
      setbatchs(batch);
    }
  }, [course, batch]);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Holiday</h1>
        <div className={styles.divmaininputradiodiv}>
          <div className={styles.inputdivradio}>
            <input
              type="radio"
              name="same"
              value="default"
              checked={forallbatch === "default"}
              onChange={(e) => setforallbatch(e.target.value)}
            />
            <label>For All Batch</label>
          </div>
          <div className={styles.inputdivradio}>
            <input
              type="radio"
              name="same"
              value="manual"
              checked={forallbatch === "manual"}
              onChange={(e) => setforallbatch(e.target.value)}
            />
            <label>For A Particular Batch</label>
          </div>
        </div>

        <form onSubmit={submit}>
          {forallbatch === "default" ? (
            <>
              <div className={styles.inputdiv}>
                <label>Holiday Date</label>
                <input
                  type="date"
                  value={Holidaydate}
                  name="Holidaydate"
                  onChange={(e) => setHolidaydate(e.target.value)}
                />
              </div>

              <div className={styles.inputdiv}>
                <label>comment</label>
                <input
                  type="text"
                  placeholder="Enter the Comment"
                  value={comment}
                  name="comment"
                  onChange={(e) => setcomment(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Holiday Date</label>
                  <input
                    type="date"
                    value={Holidaydate}
                    name="Holidaydate"
                    onChange={(e) => setHolidaydate(e.target.value)}
                  />
                </div>

                <div className={styles.inputdiv}>
                  <label>Batch</label>
                  <Select
                    // required
                    className={styles.addwidth}
                    sx={{
                      width: "18.8rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={batchname}
                    name="batchname"
                    onChange={(e) => setbatchname(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Please Select
                    </MenuItem>
                    {batchs?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={`${item?.StartingTime} TO ${item?.EndingTime}`}
                        >
                          {item?.StartingTime} TO {item?.EndingTime}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
                <div className={styles.inputdiv}>
                  <label>comment</label>
                  <input
                    type="text"
                    placeholder="Enter the Comment"
                    value={comment}
                    name="comment"
                    onChange={(e) => setcomment(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddHoliday;
