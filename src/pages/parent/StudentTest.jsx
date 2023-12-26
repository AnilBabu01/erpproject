import React, { useEffect, useState } from "react";
import styles from "../../component/Student/Coaching.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { serverInstance } from "../../API/ServerInstance";
import ShowResult from "../../component/parent/CoachingParent/ShowResult";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import { useRouter } from "next/router";
function StudentTest() {
  const router = useRouter();

  
  const [loading, setloading] = useState(false);
  const [resultlist, setresultlist] = useState([]);
  const [list, setlist] = useState([]);
  const [openupdate, setOpenupdate] = useState(false);
  const [date, setdate] = useState("");
  const [titile, settitile] = useState("");
  const [isdata, setisdata] = useState("");

  const getresult = () => {
    setloading(true);
    serverInstance("test/studentresult", "post", {
      date: date,
      title: titile,
      StudentId: router?.query?.StudentId,
    }).then((res) => {
      if (res?.status) {
        setresultlist(res?.data);
        setloading(false);
      }
      if (res?.status === false) {
        setloading(false);
      }
    });
  };

  const getrsultlst = () => {
    serverInstance("test/studentresult", "post", {
      StudentId: router?.query?.StudentId,
    }).then((res) => {
      if (res?.status) {
        setlist(res?.data);
        setresultlist(res?.data);
      }
    });
  };
  useEffect(() => {
    getresult();
    getrsultlst();
  }, []);
  const handleOpen = (data) => {
    setisdata(data);
    if (isdata) {
      console.log("result isdata", isdata);
      setOpenupdate(true);
    }
  };

  const handleCloseupadte = () => {
    setOpenupdate(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  const reset = () => {
    setdate("");
    settitile("");
    getrsultlst();
  };

  return (
    <>
      {openupdate && (
        <div>
          <Dialog
            open={openupdate}
            TransitionComponent={Transition}
            onClose={handleCloseupadte}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "60rem",
                },
              },
            }}
          >
            <ShowResult setOpen={setOpenupdate} data={isdata} />
          </Dialog>
        </div>
      )}
      <div className={styles.maintestdiv}>
        <div className="bottom-chart-left-div-inearattdendance">
          <div className={styles.maindivsearch}>
            <div className={styles.inputdiv}>
              <label>Test Date</label>
              <input
                type="date"
                className={styles.addwidth}
                value={date}
                name="date"
                onChange={(e) => setdate(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Test Title</label>
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
                value={titile}
                onChange={(e) => settitile(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  All Result
                </MenuItem>
                {list &&
                  list?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.testname}
                      >
                        {item?.testname}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <button className={styles.btnactive} onClick={() => getresult()}>
              Show Result
            </button>
            <button className={styles.btnactive} onClick={() => reset()}>
              Reset
            </button>
          </div>
          <div className={styles.addtablemargin}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Test_Title</th>
                    <th className={styles.tableth}>Test_Date</th>
                    <th className={styles.tableth}>Start_Time</th>
                    <th className={styles.tableth}>End_Time</th>
                    <th className={styles.tableth}>Total_Marks</th>
                    <th className={styles.tableth}>obtain</th>
                    <th className={styles.tableth}>Status</th>
                  </tr>
                  {resultlist?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{item?.testname}</td>
                        <td className={styles.tabletd}>
                          {moment(item?.testdate).format("DD/MM/YYYY")}
                        </td>
                        <td className={styles.tabletd}>{item?.teststarTime}</td>
                        <td className={styles.tabletd}>{item?.testendTime}</td>
                        <td className={styles.tabletd}>
                          {Number(item?.marksperquestion) *
                            Number(item?.passmark)}
                        </td>
                        <td className={styles.tabletd}>{item?.obtainmarks}</td>
                        <td className={styles.tabletd}>
                          <button
                            className={styles.btnactive10}
                            onClick={() => handleOpen(item)}
                          >
                            Show Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {loading && <LoadingSpinner />}
    </>
  );
}

export default StudentTest;
