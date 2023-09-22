import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import moment from "moment";
import { Addpayfee } from "../../redux/actions/coachingAction";
import { useDispatch, useSelector } from "react-redux";
function StudentFee({ data, monthname, paidmonth, setOpen }) {
  //   const dispatch = useDispatch();
  //   const [montharray, setmontharray] = useState([]);
  //   const [checked, setChecked] = useState([]);
  //   const { paycoaching } = useSelector((state) => state.addpayfeecoaching);

  //   console.log("add fee", paycoaching);

  //   const submit = () => {
  //     const datas = {
  //       id: data?.id,
  //       paymonths: montharray,
  //     };
  //     dispatch(Addpayfee(datas, setOpen));
  //   };

  return (
    <>
      <div className={styles.divcenter}>
        <div className={styles.maincontentdivshado}>
          <div className={styles.divmainlogin}>
            <h1>Fee Pay</h1>
            <div className={styles.mainfeedetails}>
              <div>
                <div className={styles.inputdivpay}>
                  <p>Student Name</p>
                  <p className={styles.hightlighttext}>Student Name</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Course</p>
                  <p className={styles.hightlighttext}>Student Name</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Batch</p>
                  <p className={styles.hightlighttext}>Student Name</p>
                </div>
              </div>
              <div>
                <div className={styles.inputdivpay}>
                  <p>Total Fee</p>
                  <p className={styles.hightlighttext}>Student Name</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Fee per month</p>
                  <p className={styles.hightlighttext}>Student Name</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Registration Fee</p>
                  <p className={styles.hightlighttext}>Student Name</p>
                </div>
              </div>
              <div>
                <div className={styles.inputdivpay}>
                  <p>Dues</p>
                  {/* <p className={styles.hightlighttext}>
                  {Number(data?.studentTotalFee) -
                    Number(data?.paidfee) -
                    Number(data?.permonthfee) * Number(montharray.length)}
                </p> */}
                  <p>10</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Paid</p>
                  {/* <p className={styles.hightlighttext}>
                  {Number(data?.paidfee) +
                    Number(data?.permonthfee) * Number(montharray.length)}
                </p> */}
                  <p>10</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Admission date</p>
                  {/* <p className={styles.hightlighttext}>
                  {" "}
                  {moment(data?.admissionDate).format("MM/DD/YYYY")}
                </p> */}
                  <p>10</p>
                </div>
              </div>
              <div>
                <div className={styles.inputdivpay}>
                  <p>Course Duraion</p>
                  <p className={styles.hightlighttext}>10</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Roll No</p>
                  <p className={styles.hightlighttext}>20</p>
                </div>
                <div className={styles.inputdivpay}>
                  <p>Contact No</p>
                  <p className={styles.hightlighttext}>1</p>
                </div>
              </div>
            </div>
            <div className={styles.addpaymaingintable}>
              <div className={styles.tablecontainer}>
                <table className={styles.tabletable}>
                  <tbody>
                    <tr className={styles.tabletr}>
                      {/* {monthname &&
                      monthname
                        ?.slice(
                          paidmonth[0]?.startmonth,
                          paidmonth[0]?.startmonth + data?.courseduration
                        )
                        ?.map((item, index) => {
                          return (
                            <th key={index} className={styles.tableth}>
                              {item?.month} {item?.year}
                            </th>
                          );
                        })} */}

                      <th className={styles.tableth}>Jan 2023</th>
                    </tr>
                    <tr className={styles.tabletr}>
                      {/* {paidmonth &&
                      paidmonth
                        ?.slice(
                          paidmonth[0]?.startmonth,
                          paidmonth[0]?.startmonth + data?.courseduration
                        )
                        ?.map((item, index) => {
                          return (
                            <td key={index} className={styles.tableth}>
                              {item?.value}
                              {item?.value === "Paid" ? (
                                <>
                                  <input
                                    type="checkbox"
                                    value={index}
                                    checked={item?.value === "Paid"}
                                    disabled={item?.value === "Paid"}
                                  />
                                </>
                              ) : (
                                <>
                                  <input
                                    type="checkbox"
                                    value={paidmonth[0]?.startmonth + index}
                                    onChange={(e) => {
                                      let updatedList = [...montharray];
                                      if (e.target.checked) {
                                        updatedList = [
                                          ...montharray,
                                          e.target.value,
                                        ];
                                      } else {
                                        updatedList.splice(
                                          checked.indexOf(e.target.value),
                                          1
                                        );
                                      }
                                      setmontharray(updatedList);
                                      console.log("eddd", updatedList);
                                    }}
                                  />
                                </>
                              )}
                            </td>
                          );
                        })} */}

                      <input
                        type="checkbox"
                        //   value={index}
                        checked={true}
                        //   disabled={item?.value === "Paid"}
                      />
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

export default StudentFee;
