import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getHolidays } from "../../../redux/actions/attendanceActions";
import { useDispatch, useSelector } from "react-redux";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function UpdatePayRol({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [status, setstatus] = useState("Enable");
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
        comment: comment,
        status: status,
      };
      serverInstance("EmployeeAttendance/holidy", "put", data).then((res) => {
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
    if (updatedata) {
      setcomment(updatedata?.Comment);
      setHolidaydate(updatedata?.attendancedate);
    }
  }, [course, batch]);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update S</h1>

        <form onSubmit={submit}>
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
              <label>comment</label>
              <input
                type="text"
                placeholder="Enter the Comment"
                value={comment}
                name="comment"
                onChange={(e) => setcomment(e.target.value)}
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
          </div>

          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdatePayRol;
