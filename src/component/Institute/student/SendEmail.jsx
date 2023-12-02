import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import {getstudent } from "../../../redux/actions/commanAction";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
const formData = new FormData();

function SendEmail({ setOpen }) {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [sessionList, setsessionList] = useState([]);
  const [courseList, setcourseList] = useState([]);
  const [coursename, setcoursename] = useState("Please Select");
  const [sessionname, setsessionname] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [sectionlist, setsectionlist] = useState([]);
  const [loading, setloading] = useState(false);
  const { course } = useSelector((state) => state.getcourse);
  const { sections } = useSelector((state) => state.GetSection);
  const { Sessions } = useSelector((state) => state.GetSession);

  const submit = () => {};

  useEffect(() => {
    if (sections) {
      setsectionlist(sections);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
    if (course) {
      setcourseList(course);
    }
  }, [sections, Sessions, course]);

  useEffect(() => {
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Sent Email To Student</h1>
        <div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Session</label>
              <Select
                required
                className={styles.addwidth}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={sessionname}
                name="sessionname"
                onChange={(e) => setsessionname(e.target.value)}
                // displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"Please Select"}
                >
                  Please Select
                </MenuItem>
                {sessionList?.length > 0 &&
                  sessionList?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.Session}
                      >
                        {item?.Session}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Class</label>
              <Select
                required
                className={styles.addwidth}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={coursename}
                name="coursename"
                onChange={(e) => setcoursename(e.target.value)}
                // displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"Please Select"}
                >
                  Please Select
                </MenuItem>
                {courseList?.length > 0 &&
                  courseList?.map((item, index) => {
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
            <div className={styles.inputdiv}>
              <label>Section</label>
              <Select
                required
                className={styles.addwidth}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={sectionname}
                name="sectionname"
                onChange={(e) => setsectionname(e.target.value)}
                // displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"NONE"}
                >
                  NONE
                </MenuItem>
                {sectionlist?.length > 0 &&
                  sectionlist?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.section}
                      >
                        {item?.section}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
          </div>
          <div className={styles.textareadiv}>
            <textarea />
          </div>
        </div>

        <div className={styles.mainbtnndivcancel}>
          <button
            onClick={() => setshownext(true)}
            className={styles.cancelbtn}
          >
            Back
          </button>

          <button
            disabled={loading ? true : false}
            className={styles.cancelbtn}
            onClick={() => submit()}
          >
            {loading ? (
              <CircularProgress size={25} style={{ color: "red" }} />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default SendEmail;
