import React from "react";
import styles from "./Coaching.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
function ResultTest() {
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

            <tr className={styles.tabletr}>
              <td className={styles.tabletd}>Demo</td>
              <td className={styles.tabletd}>21/03/2023</td>
              <td className={styles.tabletd}>10</td>
              <td className={styles.tabletd}>8</td>
              <td className={styles.tabletd}>
                <button className={styles.btnactive}> Show Details </button>
              </td>
            </tr>
            {/* {isdata?.map((item, index) => {
                      return (
                       
                      );
                    })} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ResultTest;
