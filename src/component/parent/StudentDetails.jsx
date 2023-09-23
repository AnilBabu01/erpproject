import React from "react";
import styles from "../../styles/register.module.css";
import CloseIcon from "@mui/icons-material/Close";
function StudentDetails({ handleCloseupadte }) {
  return (
    <>
      <div className={styles.childdetails}>
        <div className={styles.cloceiconright}>
          <CloseIcon onClick={() => handleCloseupadte()} />
        </div>
        <h1 className={styles.feedeltext}>Student Details</h1>
        <div className={styles.mainfeedetails}>
          <div>
            <div className={styles.inputdivpay}>
              <p>Student Name</p>
              <p>Anill</p>
            </div>
            <div className={styles.inputdivpay}>
              <p>Course</p>
              <p >Dca</p>
            </div>
            <div className={styles.inputdivpay}>
              <p>Batch</p>
              <p>07:00 AM To 08:00 AM</p>
            </div>
          </div>
          <div>
            <div className={styles.inputdivpay}>
              <p>Total Fee</p>
              <p>4000</p>
            </div>
            <div className={styles.inputdivpay}>
              <p>Fee per month</p>
              <p>400</p>
            </div>
            <div className={styles.inputdivpay}>
              <p>Registration Fee</p>
              <p>200</p>
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
              <p>10</p>
            </div>
            <div className={styles.inputdivpay}>
              <p>Roll No</p>
              <p>20</p>
            </div>
            <div className={styles.inputdivpay}>
              <p>Contact No</p>
              <p>1</p>
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
    </>
  );
}

export default StudentDetails;
