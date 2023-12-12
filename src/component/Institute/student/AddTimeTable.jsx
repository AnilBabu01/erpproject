import React, { useState, useEffect, useRef } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetsSubject, getEmployee } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
const daylist = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

const hours = [
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
];

const minutes = [
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "13", value: "13" },
  { label: "14", value: "14" },
  { label: "15", value: "15" },
  { label: "16", value: "16" },
  { label: "17", value: "17" },
  { label: "18", value: "18" },
  { label: "19", value: "19" },
  { label: "20", value: "20" },
  { label: "21", value: "21" },
  { label: "22", value: "22" },
  { label: "23", value: "23" },
  { label: "24", value: "24" },
  { label: "25", value: "25" },
  { label: "26", value: "26" },
  { label: "27", value: "27" },
  { label: "28", value: "28" },
  { label: "29", value: "29" },
  { label: "30", value: "30" },
  { label: "31", value: "31" },
  { label: "32", value: "32" },
  { label: "33", value: "33" },
  { label: "34", value: "34" },
  { label: "35", value: "35" },
  { label: "36", value: "36" },
  { label: "37", value: "37" },
  { label: "38", value: "38" },
  { label: "39", value: "39" },
  { label: "40", value: "40" },
  { label: "41", value: "41" },
  { label: "42", value: "42" },
  { label: "43", value: "43" },
  { label: "44", value: "44" },
  { label: "45", value: "45" },
  { label: "46", value: "46" },
  { label: "47", value: "47" },
  { label: "48", value: "48" },
  { label: "49", value: "49" },
  { label: "50", value: "50" },
  { label: "51", value: "51" },
  { label: "52", value: "52" },
  { label: "53", value: "53" },
  { label: "54", value: "54" },
  { label: "55", value: "55" },
  { label: "56", value: "56" },
  { label: "57", value: "57" },
  { label: "58", value: "58" },
  { label: "59", value: "59" },
  { label: "60", value: "60" },
  { label: "00", value: "00" },
];

const abpm = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

function AddTimeTable({ setOpen }) {
  const dispatch = useDispatch();
  const [emplist, setemplist] = useState("");
  const [isdata, setisData] = useState([]);
  const [loading, setloading] = useState(false);
  const [sh, setsh] = useState("01");
  const [sm, setsm] = useState("00");
  const [samorpm, setsamorpm] = useState("AM");
  const [eh, seteh] = useState("01");
  const [em, setem] = useState("00");
  const [eamorpm, seteamorpm] = useState("AM");
  const [dayname, setdayname] = useState("");
  const [classId, setclassId] = useState("");
  const [empID, setempID] = useState("");
  const [subject, setsubject] = useState("");
  const [subjectlist, setsubjectlist] = useState([]);
  const { employees } = useSelector((state) => state.getemp);
  const { course } = useSelector((state) => state.getcourse);
  const { user } = useSelector((state) => state.auth);
  const { Classsubject } = useSelector((state) => state.GetClassSubject);
  const submit = () => {
    setloading(true);
    const data = {
      dayname: dayname,
      classId: classId,
      empID: empID,
      starttime: `${sh}:${sm}:00 ${samorpm}`,
      endtime: `${eh}:${em}:00 ${eamorpm}`,
      subject: subject,
    };

    serverInstance("comman/subject", "post", data).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);
        setloading(false);
        dispatch(GetsSubject("", "", dayname));
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
    if (employees) {
      setemplist(employees);
    }
    if (Classsubject) {
      setsubjectlist(Classsubject);
    }
  }, [course, employees, Classsubject]);

  //   useEffect(() => {
  //     dispatch(getEmployee());
  //   }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Time Table</h1>

        <div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Day</label>
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
                value={dayname}
                name="dayname"
                onChange={(e) => setdayname(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Please Select Day
                </MenuItem>
                {daylist?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.value}
                    >
                      {item?.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Class</label>
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
                value={classId}
                name="classId"
                onChange={(e) => setclassId(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Please Select Class
                </MenuItem>
                {isdata?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.id}
                    >
                      {item?.coursename}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Teacher</label>

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
                value={empID}
                name="empID"
                onChange={(e) => setempID(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Please Select Teacher
                </MenuItem>
                {emplist?.length > 0 &&
                  emplist?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.id}
                      >
                        {item?.name} ({item?.empId})
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
          </div>

          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Starting Time</label>
              <div className={styles.flexaddDiv}>
                <Select
                  // required
                  className={styles.addwidthtime}
                  sx={{
                    width: "6.2rem",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={sh}
                  name="sh"
                  onChange={(e) => setsh(e.target.value)}
                  displayEmpty
                >
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    Hour
                  </MenuItem>
                  {hours?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.value}
                      >
                        {item?.label}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Select
                  // required
                  className={styles.addwidthtime}
                  sx={{
                    width: "6.2rem",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={sm}
                  name="sm"
                  onChange={(e) => setsm(e.target.value)}
                  displayEmpty
                >
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    Min
                  </MenuItem>
                  {minutes?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.value}
                      >
                        {item?.label}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Select
                  // required
                  className={styles.addwidthtime}
                  sx={{
                    width: "6.2rem",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={samorpm}
                  name="samorpm"
                  onChange={(e) => setsamorpm(e.target.value)}
                  displayEmpty
                >
                  {abpm?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.value}
                      >
                        {item?.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className={styles.inputdiv}>
              <label>Ending Time</label>
              <div className={styles.flexaddDiv}>
                <Select
                  // required
                  className={styles.addwidthtime}
                  sx={{
                    width: "6.2rem",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={eh}
                  name="eh"
                  onChange={(e) => seteh(e.target.value)}
                  displayEmpty
                >
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    Hour
                  </MenuItem>
                  {hours?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.value}
                      >
                        {item?.label}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Select
                  // required
                  className={styles.addwidthtime}
                  sx={{
                    width: "6.2rem",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={em}
                  name="em"
                  onChange={(e) => setem(e.target.value)}
                  displayEmpty
                >
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    Min
                  </MenuItem>
                  {minutes?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.value}
                      >
                        {item?.label}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Select
                  // required
                  className={styles.addwidthtime}
                  sx={{
                    width: "6.2rem",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={eamorpm}
                  name="eamorpm"
                  onChange={(e) => seteamorpm(e.target.value)}
                  displayEmpty
                >
                  {abpm?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.value}
                      >
                        {item?.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className={styles.inputdiv}>
              <label>Subject</label>
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
                value={subject}
                name="subject"
                onChange={(e) => setsubject(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Please Select Subject
                </MenuItem>
                {subjectlist?.length > 0 &&
                  subjectlist?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.Subject}
                      >
                        {item?.Subject}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
          </div>
        </div>
        <div className={styles.mainbtnndivcancel}>
          <button onClick={() => setOpen(false)} className={styles.cancelbtn}>
            Back
          </button>
          <button className={styles.cancelbtn} onClick={() => submit()}>
            {loading ? (
              <CircularProgress size={25} style={{ color: "red" }} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTimeTable;
