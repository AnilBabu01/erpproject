import React, { useState, useEffect, useRef, useCallback } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Addtest } from "../../../redux/actions/commanAction";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Webcam from "react-webcam";
const testtype = [
  { id: 1, name: "Upload Pdf Test" },
  { id: 2, name: "Add MCQ" },
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
const formData = new FormData();
function UpdateBook({ setOpen }) {
  const dispatch = useDispatch();

  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);

  const [courses, setcourses] = useState("");

  const [sh, setsh] = useState("");
  const [sm, setsm] = useState("");
  const [samorpm, setsamorpm] = useState("AM");
  const [eh, seteh] = useState("");
  const [em, setem] = useState("");
  const [eamorpm, seteamorpm] = useState("AM");

  const { course } = useSelector((state) => state.getcourse);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);
  const { loading, test } = useSelector((state) => state.addTest);
  ///2:39:35 PM

  console.log("start time", `${sh}:${sm}:00 ${samorpm}`);
  console.log("end time", `${eh}:${em}:00 ${eamorpm}`);
  var today = new Date();
  var date = today.toISOString().substring(0, 10);
  const [testdate, settestdate] = useState(date);

  const [startesttime, setstartesttime] = useState(
    today.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );
  const [endtesttime, setendtesttime] = useState(
    today.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );

  const submit = () => {
    dispatch(Addtest(formData, setOpen));
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
        <h1>Add Book</h1>
        <form>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Class</label>
              <div></div>
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
                {isData?.map((item, index) => {
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
              <label>BOOKID</label>
              <input
                required
                type="text"
                placeholder="Enter Book Id"
                // value={testname}
                // name="testname"
                // onChange={(e) => settestname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Book Title</label>
              <input
                required
                type="text"
                placeholder="Enter Book Title"
                // value={testname}
                // name="testname"
                // onChange={(e) => settestname(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Auther</label>
              <input
                required
                type="text"
                placeholder="Enter Auther Name"
                // value={testname}
                // name="testname"
                // onChange={(e) => settestname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Publisher</label>
              <input
                required
                type="text"
                placeholder="Enter Publisher Name"
                // value={testname}
                // name="testname"
                // onChange={(e) => settestname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Publish Date</label>
              <input
                required
                type="date"
                placeholder="Enter Text Name"
                // value={testname}
                // name="testname"
                // onChange={(e) => settestname(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputdiv}>
            <label>Book Quanriry</label>
            <input
              required
              type="text"
              placeholder="Enter Book Quanriry"
              // value={testname}
              // name="testname"
              // onChange={(e) => settestname(e.target.value)}
            />
          </div>
        </form>
        <div className={styles.mainbtnndivcancel}>
          <button onClick={() => setnext(false)} className={styles.cancelbtn}>
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

export default UpdateBook;
