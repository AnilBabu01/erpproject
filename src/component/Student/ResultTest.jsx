import React, { useEffect, useState } from "react";
import styles from "./Coaching.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { serverInstance } from "../../API/ServerInstance";
function ResultTest() {
  const [resultlist, setresultlist] = useState([]);

  const getresult = () => {
    serverInstance("test/studentresult", "post").then((res) => {
      if (res?.status) {
        console.log("result", res?.data);
        setresultlist(res?.data);
      }
    });
  };

  useEffect(() => {
    getresult();
  }, []);

  return (
    <>
      <div className={styles.maindivsearch}>
        <div className={styles.inputdiv}>
          <label>Test Date</label>
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
            // value={depart}
            // onChange={(e) => setdepart(e.target.value)}
            displayEmpty
          >
            <MenuItem
              sx={{
                fontSize: 14,
              }}
              value={""}
            >
              Please select
            </MenuItem>
            {/* {isdata1 &&
                      isdata1?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.DepartmentName}
                          >
                            {item?.DepartmentName}
                          </MenuItem>
                        );
                      })} */}
          </Select>
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
            // value={depart}
            // onChange={(e) => setdepart(e.target.value)}
            displayEmpty
          >
            <MenuItem
              sx={{
                fontSize: 14,
              }}
              value={""}
            >
              Please select
            </MenuItem>
            {/* {isdata1 &&
                      isdata1?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.DepartmentName}
                          >
                            {item?.DepartmentName}
                          </MenuItem>
                        );
                      })} */}
          </Select>
        </div>
        <button className={styles.btnactive}>Show Result</button>
      </div>

      <div className={styles.tablecontainer}>
        <table className={styles.tabletable}>
          <tbody>
            <tr className={styles.tabletr}>
              <th className={styles.tableth}>Test Title</th>
              <th className={styles.tableth}>Test Date</th>
              <th className={styles.tableth}>Total Marks</th>
              <th className={styles.tableth}>obtain</th>
              <th className={styles.tableth}>Status</th>
            </tr>
            {resultlist?.map((item, index) => {
              return (
                <tr key={index} className={styles.tabletr}>
                  <td className={styles.tabletd}>Demo</td>
                  <td className={styles.tabletd}>{item?.testdate}</td>
                  <td className={styles.tabletd}>{item?.testdate}</td>
                  <td className={styles.tabletd}>8</td>
                  <td className={styles.tabletd}>
                    <button className={styles.btnactive}> Show Details </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ResultTest;
