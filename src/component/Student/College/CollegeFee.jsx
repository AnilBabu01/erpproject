import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import moment from "moment";
import { Addpayfee } from "../../../redux/actions/coachingAction";
import { useDispatch, useSelector } from "react-redux";
function CollegeFee({ data, monthname, paidmonth, setOpen }) {
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
          <h1 className={styles.feedeltext}>Fee Details</h1>
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
                <p className={styles.hightlighttext}>10</p>
              </div>
              <div className={styles.inputdivpay}>
                <p>Paid</p>
                {/* <p className={styles.hightlighttext}>
                  {Number(data?.paidfee) +
                    Number(data?.permonthfee) * Number(montharray.length)}
                </p> */}
                <p className={styles.hightlighttext}>10</p>
              </div>
              <div className={styles.inputdivpay}>
                <p>Admission date</p>
                {/* <p className={styles.hightlighttext}>
                  {" "}
                  {moment(data?.admissionDate).format("MM/DD/YYYY")}
                </p> */}
                <p className={styles.hightlighttext}>10</p>
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
                    <th className={styles.tableth}>Jan 2023</th>
                    <th className={styles.tableth}>Feb 2023</th>
                    <th className={styles.tableth}>Mar</th>
                  </tr>
                  <tr className={styles.tabletr}>
                    <td className={styles.tabletd}>
                      <input type="radio" checked={true} />
                      Paid
                    </td>
                    <td className={styles.tabletd}>
                      <input type="radio" />
                      Dues
                    </td>
                    <td className={styles.tabletd}>
                      <input type="radio" />
                      Dues
                    </td>
                  </tr>
                  {/* {isdata?.map((item, index) => {
                      return (
                       
                      );
                    })} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CollegeFee;
