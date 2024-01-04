import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetClassSubject } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
function UpdateClassSubject({ setOpen,updatedata }) {
  const dispatch = useDispatch();
  const [section, setsection] = useState("");
  const [loading, setloading] = useState(false);
  const [courses, setcourses] = useState("");
  const [isdata, setisData] = useState("");
  const { course } = useSelector((state) => state.getcourse);
  const submit = (e) => {
    e.preventDefault();
    setloading(true);

    serverInstance("comman/classsubject", "put", {
      id:updatedata?.id,
      Subject: section,
      courses: courses,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetClassSubject());
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

  useEffect(() => {
    if (updatedata) {
      setsection(updatedata?.Subject);
      setcourses(updatedata?.Class);
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update subject</h1>
        <form onSubmit={submit}>
          <div className={styles.inputdivsingle}>
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
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateClassSubject;
