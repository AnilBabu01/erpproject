import React, { useEffect, useState } from "react";
import styles from "../../Student/Coaching.module.css";
import { serverInstance } from "../../../API/ServerInstance";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import { useRouter } from "next/router";
function getDayName(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = new Date(date).getDay();
  return days[dayIndex];
}

function FeeStudentList() {
  const navigate = useRouter();
  const [isData, setisData] = useState("");
  const [loader, setloader] = useState(false);
  const getmonthAttendance = () => {
    setloader(true);
    serverInstance("comman/GetParentStudentListCoacging", "get").then((res) => {
      if (res?.status === true) {
        setloader(false);

        setisData(res?.data);
      }
      if (res?.status === false) {
        setloader(false);
      }
    });
  };

  useEffect(() => {
    getmonthAttendance();
  }, []);
  return (
    <>
      <div className="bottom-chart-left-div10">
        <div className="bottom-chart-left-div-inearattdendance">
          <div className={styles.tablecontainer}>
            <table className={styles.tabletable}>
              <tbody>
                <tr className={styles.tabletr}>
                  <th className={styles.tableth}>Sr.No</th>

                  <th className={styles.tableth}>Roll_Number</th>
                  <th className={styles.tableth}>Student_Name</th>
                  <th className={styles.tableth}>Student_Class</th>

                  <th className={styles.tableth}>Action</th>
                </tr>
                {isData?.length > 0 &&
                  isData?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>

                        <td className={styles.tabletd}>{item?.SrNumber}</td>
                        <td className={styles.tabletd}>{item?.name}</td>
                        <td className={styles.tabletd}>
                          {item?.courseorclass}
                        </td>

                        <td className={styles.tabkeddd}>
                          <button>
                            <img
                              className={styles.tabkedddimgactive10}
                              onClick={() =>
                                navigate.push({
                                  pathname: "/student/fee",
                                  query: {
                                    StudentId: JSON.stringify(item?.id),
                                  },
                                })
                              }
                              src="/images/Eye.png"
                              alt="imgss"
                            />
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

      {loader && <LoadingSpinner />}
    </>
  );
}

export default FeeStudentList;
