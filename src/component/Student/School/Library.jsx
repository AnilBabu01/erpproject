import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import styles from "../../../styles/register.module.css";
import { serverInstance } from "../../../API/ServerInstance";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
function Library() {
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);
  const [todayTimeTable, settodayTimeTable] = useState([]);

  const GetTimeTable = () => {
    setloading(true);
    serverInstance("library/GetStudentBook", "get").then((res) => {
      if (res?.status === true) {
        settodayTimeTable(res?.data);
        setloading(false);
      }
      if (res?.status === false) {
        setloading(false);
      }
    });
  };

  useEffect(() => {
    GetTimeTable();
    dispatch(loadUser());
  }, []);

  return (
    <>
      <div className="service-container">
        <div className="service-item" data-wow-delay="0.1s">
          <p>Issued Or Return Book List</p>
          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Issue Date</th>
                    <th className={styles.tableth}>BookId</th>
                    <th className={styles.tableth}>BookTitle</th>
                    <th className={styles.tableth}>auther</th>
                    <th className={styles.tableth}>Status</th>
                  </tr>
                  {todayTimeTable?.length > 0 &&
                    todayTimeTable?.map((item, index) => {
                      return (
                        <tr key={index} className={styles.tabletr}>
                          <td className={styles.tableth}>
                            {moment(item?.IssueDate).format("DD/MM/YYYY")}
                          </td>
                          <td className={styles.tableth}>{item?.BookId}</td>

                          <td className={styles.tableth}>{item?.BookTitle}</td>
                          <td className={styles.tableth}>{item?.auther}</td>
                          <td className={styles.tableth}>
                            {item?.issueStatus === true ? "Isssue" : "Return"}
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

export default Library;
