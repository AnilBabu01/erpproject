import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetStream } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
function AddStream({ setOpen }) {
  
  const dispatch = useDispatch();
  const [section, setsection] = useState("");
  const [stream, setstream] = useState("Arts");
  const [loading, setloading] = useState(false);
  const [courses, setcourses] = useState("");
  const [isdata, setisData] = useState("");
  const { course } = useSelector((state) => state.getcourse);
  const submit = (e) => {
    e.preventDefault();
    setloading(true);

    serverInstance("comman/stream", "post", {
      Stream: stream,
      Subject: section,
      courses: courses,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetStream());
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
    if (course) {
      setisData(course);
    }
  }, [course]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Stream</h1>
        <form onSubmit={submit}>
          <div className={styles.inputdivsingle}>
            <div className={styles.inputdivsingle}>
              <label>Stream</label>
              <Select
                required
                className={styles.addwidth}
                sx={{
                  width: "100%",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={stream}
                name="stream"
                onChange={(e) => setstream(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"Arts"}
                >
                  Arts
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"COMMERCE"}
                >
                  COMMERCE
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"SCIENCE"}
                >
                  SCIENCE
                </MenuItem>
              </Select>
            </div>
            <div className={styles.inputdivsingle}>
              <label>Class</label>
              <Select
                required
                className={styles.addwidth}
                sx={{
                  width: "100%",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={courses}
                name="courses"
                onChange={(e) => setcourses(e.target.value)}
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
                {isdata?.length > 0 &&
                  isdata?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.coursename}
                      >
                        {item?.coursename}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className={styles.inputdivsingle}>
              <label>Subject</label>
              <input
                type="text"
                placeholder="Enter The Class Subject"
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

export default AddStream;
