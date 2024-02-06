import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GeOtherFees } from "../../../redux/actions/commanAction";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";


function AddOtherFee({ setOpen }) {
  
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [sessionList, setsessionList] = useState([]);
  const [courseList, setcourseList] = useState([]);
  const [coursename, setcoursename] = useState("Please Select");
  const [sessionname, setsessionname] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [amount, setamount] = useState("");
  const [duesDate, setduesDate] = useState("");
  const [comment, setcomment] = useState("");
  const [sectionlist, setsectionlist] = useState([]);
  const [loading, setloading] = useState(false);
  const { course } = useSelector((state) => state.getcourse);
  const { sections } = useSelector((state) => state.GetSection);
  const { Sessions } = useSelector((state) => state.GetSession);
  const { CURRENTSESSION } = useSelector((state) => state.GetCurrentSession);
  const submit = () => {
    setloading(true);
    serverInstance("student/otherfee", "post", {
      courseorclass: coursename,
      Session: sessionname,
      Section: sectionname,
      OtherFeeName: comment,
      FeeAmount: amount,
      DuesDate: duesDate,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GeOtherFees());
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
    if (sections) {
      setsectionlist(sections);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
    if (course) {
      setcourseList(course);
    }
    if(CURRENTSESSION)
    {
      setsessionname(CURRENTSESSION)
    }
  }, [sections, Sessions, course,CURRENTSESSION]);

 

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Other Fee</h1>
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

          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Dues Date</label>
              <input
                required
                type="Date"
                placeholder="Enter Comment"
                value={duesDate}
                name="duesDate"
                onChange={(e) => setduesDate(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Amount</label>
              <input
                required
                type="text"
                placeholder="Enter Amount"
                value={amount}
                name="amount"
                onChange={(e) => setamount(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Comment</label>
              <input
                required
                type="text"
                placeholder="Enter Comment"
                value={comment}
                name="comment"
                onChange={(e) => setcomment(e.target.value)}
              />
            </div>
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
              "Save"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddOtherFee;
