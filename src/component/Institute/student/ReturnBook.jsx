import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";

function ReturnBook({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  // const [classlist, setclasslist] = useState([]);
  // const [batchs, setbatchs] = useState([]);
  const [rollnumber, setrollnumber] = useState("");
  const [courseorclass, setcourseorclass] = useState("");
  const [studentname, setstudentname] = useState("");
  const [studentbooklist, setstudentbooklist] = useState([
    {
      id: "",
      ClientCode: "",
      courseorclass: "",
      BookId: "",
      BookTitle: "",
      auther: "",
      quantity: "",
      addDate: "",
      issueStatus: 0,
    },
  ]);
  const { course } = useSelector((state) => state.getcourse);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);
  const { loading, test } = useSelector((state) => state.addTest);

  console.log("data is ",studentbooklist);

  function handlestudentbooklistUpdate(originalDonationItem, key, value) {
    setstudentbooklist(
      studentbooklist.map((studentbooklist) =>
        studentbooklist === originalDonationItem
          ? {
              ...studentbooklist,
              [key]: value,
            }
          : studentbooklist
      )
    );
  }

  const submit = () => {
    serverInstance("library/bookissue", "put", {
      studentid: updatedata?.id,
      rollnumber: rollnumber,
      courseorclass: courseorclass,
      bookDeatils: studentbooklist,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);
        // dispatch(GetBooks());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
      }
    });
  };
  // useEffect(() => {
  //   if (course) {
  //     setclasslist(course);
  //   }
  //   if (batch) {
  //     setbatchs(batch);
  //   }
  // }, [course, batch]);

  const getstudentbook = (courseorclass) => {
    serverInstance(
      `library/bookissue?courseorclass=${courseorclass}&rollnumber=${updatedata?.rollnumber}&studentid=${updatedata?.id}`,
      "get"
    ).then((res) => {
      if (res?.status) {
        setstudentbooklist(res?.data);
      }
    });
  };
  useEffect(() => {
    if (updatedata) {
      setcourseorclass(updatedata?.courseorclass);
      setstudentname(updatedata?.name);
      setrollnumber(updatedata?.rollnumber);
      getstudentbook(updatedata?.courseorclass);
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Return Book</h1>
        <form>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Student Name</label>
              <input
                required
                type="text"
                placeholder="Enter Name"
                value={studentname}
                name="studentname"
                onChange={(e) => setstudentname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Class</label>
              <input
                required
                type="text"
                placeholder="Enter Class"
                value={courseorclass}
                name="courseorclass"
                onChange={(e) => setcourseorclass(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Roll Number</label>
              <input
                required
                type="text"
                placeholder="Enter Roll Number"
                value={rollnumber}
                name="rollnumber"
                onChange={(e) => setrollnumber(e.target.value)}
              />
            </div>
          </div>
          <div>
            <table className={styles.tabletable}>
              <tbody>
                <tr className={styles.tabletr}>
                  <th className={styles.tableth}>Book Id</th>
                  <th className={styles.tableth}>Titile</th>
                  <th className={styles.tableth}>Issue</th>
                </tr>
                {studentbooklist?.map((item, index) => {
                  return (
                    <tr className={styles.tabletr}>
                      <td className={styles.tableth}>{item?.BookId}</td>
                      <td className={styles.tableth}>{item?.BookTitle}</td>
                      <td className={styles.tableth}>
                        <input
                          type="checkbox"
                          name="vehicle1"
                          checked={item?.issueStatus === true}
                          value={item?.issueStatus}
                          onClick={() =>
                            handlestudentbooklistUpdate(
                              item,
                              "issueStatus",
                              !item?.issueStatus
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </form>
        <div className={styles.mainbtnndivcancel}>
          <button onClick={() => setOpen(false)} className={styles.cancelbtn}>
            Back
          </button>
          <button className={styles.cancelbtn} onClick={() => submit()}>
            {loading ? (
              <CircularProgress size={25} style={{ color: "red" }} />
            ) : (
              "Return"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default ReturnBook;
