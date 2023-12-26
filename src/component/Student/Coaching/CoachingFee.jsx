import React, { useState, useEffect } from "react";
import styles from "@/styles/register.module.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { serverInstance } from "../../../API/ServerInstance";
import { getCourseDuration } from "../../../redux/actions/commanAction";
function CoachingFee({ studentid, setOpen }) {
  const dispatch = useDispatch();
  const [data, setdata] = useState("");
  const [monthname, setmonthname] = useState("");
  const [montharray, setmontharray] = useState([]);
  const [checked, setChecked] = useState([]);
  const { courseduarion } = useSelector((state) => state.getCourseDur);

  const convetobjectsinglekey = (obj, admindate) => {
    let start = new Date(admindate).getMonth();

    let localityParameterSets = Object.entries(obj).map(([key, val]) => ({
      startmonth: start,
      value: val,
    }));

    return localityParameterSets?.slice(4, months + 4);
  };

  const submit = () => {
    serverInstance("student/GetStudentCoachingfee", "post", {
      studentid: studentid,
    })
      .then((res) => {
        if (res?.status === true) {
          console.log("student coaching fee", res);
          setdata(res?.data[0]);
          console.log(
            "monthname",
            convetobjectsinglekey(
              res?.data[0]?.coachingfeestatus,
              res?.data[0]?.admissionDate
            )
          );
          setmonthname(
            convetobjectsinglekey(
              res?.data[0]?.coachingfeestatus,
              res?.data[0]?.admissionDate
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    submit();
    dispatch(getCourseDuration());
  }, []);

  var paidmonth = [];
  let months;
  let curyears;
  if (courseduarion && courseduarion[0]?.noOfMonth) {
    months = courseduarion && courseduarion[0]?.noOfMonth;

    let montharray = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    curyears = new Date().getFullYear();
    let monthnames = [];
    if (months <= 12) {
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
    }
    if (months > 12 && months <= 24) {
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
    }
    if (months > 24 && months <= 36) {
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
      montharray.forEach(function (entry) {
        monthnames.push(entry);
      });
    }

    for (let i = 0; i < months; i++) {
      if (i + 1 > 12 && i + 1 <= 24) {
        paidmonth.push({
          month: monthnames[i],
          year: curyears + 1,
          feestatus: "Dues",
        });
      } else if (i + 1 > 24 && i + 1 <= 36) {
        paidmonth.push({
          month: monthnames[i],
          year: curyears + 2,
          feestatus: "Dues",
        });
      } else {
        paidmonth.push({
          month: monthnames[i],
          year: curyears,
          feestatus: "Dues",
        });
      }
    }
  }

  console.log("paid month", paidmonth);

  return (
    <>
      <div className={styles.divcenter}>
        <div className={styles.maincontentdivshado}>
          <h1 className={styles.feedeltext}>Fee Details</h1>

          <div>
            <div className={styles.mainfeedetails}>
              <div>
                <div className={styles.inputdivpay}>
                  <p>Student Name</p>
                  <p className={styles.hightlighttext}>{data?.name}</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Course</p>
                  <p className={styles.hightlighttext}>{data?.courseorclass}</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Batch</p>
                  <p className={styles.hightlighttext}>{data?.batch}</p>
                </div>
              </div>
              <div>
                <div className={styles.inputdivpay}>
                  <p>Total Fee</p>
                  <p className={styles.hightlighttext}>
                    {data?.studentTotalFee}
                  </p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Fee per month</p>
                  <p className={styles.hightlighttext}>{data?.permonthfee}</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Registration Fee</p>
                  <p className={styles.hightlighttext}>
                    {data?.regisgrationfee}
                  </p>
                </div>
              </div>
              <div>
                <div className={styles.inputdivpay}>
                  <p>Dues</p>
                  <p className={styles.hightlighttext}>
                    {Number(data?.studentTotalFee) -
                      Number(data?.paidfee) -
                      Number(data?.permonthfee) * Number(montharray.length)}
                  </p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Paid</p>
                  <p className={styles.hightlighttext}>
                    {Number(data?.paidfee) +
                      Number(data?.permonthfee) * Number(montharray.length)}
                  </p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Admission date</p>
                  <p className={styles.hightlighttext}>
                    {moment(data?.admissionDate).format("MM/DD/YYYY")}
                  </p>
                </div>
              </div>
              <div>
                <div className={styles.inputdivpay}>
                  <p>Course Duraion</p>
                  <p className={styles.hightlighttext}>
                    {data?.courseduration}
                  </p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Roll No</p>
                  <p className={styles.hightlighttext}>{data?.rollnumber}</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Contact No</p>
                  <p className={styles.hightlighttext}>{data?.phoneno1}</p>
                </div>
              </div>
            </div>
            <div className={styles.addpaymaingintable}>
              <div className={styles.tablecontainer}>
                <table className={styles.tabletable}>
                  <tbody>
                    <tr className={styles.tabletr}>
                      {paidmonth &&
                        paidmonth
                          ?.slice(
                            new Date(data?.admissionDate).getMonth(),
                            +new Date(data?.admissionDate).getMonth() +
                              data?.courseduration
                          )
                          ?.map((item, index) => {
                            return (
                              <th key={index} className={styles.tableth}>
                                {item?.month} {item?.year}
                                {console.log(item)}
                              </th>
                            );
                          })}
                    </tr>
                    <tr className={styles.tabletr}>
                      {monthname &&
                        monthname
                          ?.slice(
                            new Date(data?.admissionDate).getMonth(),
                            new Date(data?.admissionDate).getMonth() +
                              data?.courseduration
                          )
                          ?.map((item, index) => {
                            return (
                              <td key={index} className={styles.tableth}>
                                {item?.value}
                                {console.log(item)}
                              </td>
                            );
                          })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoachingFee;
