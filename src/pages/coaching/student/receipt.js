import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl } from "../../../config/config";
import { useReactToPrint } from "react-to-print";
import styles from "@/styles/loginguest.module.css";
function Receipt() {
  const router = useRouter();
  const componentRef = useRef();
  const { receiptdata } = router.query;
  const [data, setData] = React.useState({});
  const { user } = useSelector((state) => state.auth);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    handlePrint();
    if (receiptdata) setData(JSON.parse(receiptdata));
  }, []);

  return (
    <div className="mainContainer">
      <div className={styles.mainborderdiv} ref={componentRef}>
        <div className={styles.mainborderdivinnear}>
          <div className={styles.mainimgdivre}>
            <div className={styles.imgdivre}>
              <img
                alt="img"
                src={`${backendUrl}public/upload/${
                  user?.data && user?.data[0]?.logourl
                }`}
              />
            </div>
            <div className={styles.imgdivre}>
              <h2>{user?.data && user?.data[0]?.institutename}</h2>
              <p>{user?.data && user?.data[0]?.address}</p>
              <p>
                {user?.data && user?.data[0]?.city}{" "}
                {user?.data && user?.data[0]?.state}
              </p>
              <p>{user?.data && user?.data[0]?.pincode}</p>
            </div>
            <div className={styles.imgdivre}>&nbsp;</div>
          </div>
          <div className={styles.receiptNodiv}>
            <p>Fee Receipt</p> <p>Office Copy</p>
          </div>
          <div className={styles.mainfeedetails}>
            <div className={styles.mainfeedetailsinnear}>
              <div className={styles.textdivonly}>
                <p>Receipt No</p> <p>44444444444444</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Admission No</p> <p>add4444</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Student Name</p> <p>{data?.name}</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Course</p> <p>{data?.courseorclass}</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Father's Name</p> <p>{data?.fathersName}</p>
              </div>
              <div className={styles.textdivonly10}>
                <p>Fee Detail</p>
              </div>
            </div>
            <div className={styles.mainfeedetailsinnear}>
              <div className={styles.textdivonly}>
                <p>Receipt Date</p> <p>{data?.admissionDate}</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Roll No</p> <p>{data?.rollnumber}</p>
              </div>
            </div>
          </div>

          <div className={styles.receiptNodiv}>
            <p>Particulars</p> <p>Received(Rs.)</p>
          </div>
          <div className={styles.mainfeedetails}>
            <div className={styles.mainfeedetailsinnear}>
              <div className={styles.textdivonly}>
                <p>Registration Fee</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Admission No</p>
              </div>
            </div>
            <div className={styles.mainfeedetailsinnear}>
              <div className={styles.textdivonly}>
                <p>{data?.regisgrationfee}</p>
              </div>
              <div className={styles.textdivonly}>
                <p>{data?.studentTotalFee}</p>
              </div>
              <div className={styles.textdivonly}>
                <p>
                  Total Amount-{" "}
                  {Number(data?.regisgrationfee) +
                    Number(data?.studentTotalFee)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainborderdivinnear}>
          <div className={styles.mainimgdivre}>
            <div className={styles.imgdivre}>
              <img
                alt="img"
                src={`${backendUrl}public/upload/${
                  user?.data && user?.data[0]?.logourl
                }`}
              />
            </div>
            <div className={styles.imgdivre}>
              <h2>{user?.data && user?.data[0]?.institutename}</h2>
              <p>{user?.data && user?.data[0]?.address}</p>

              <p>
                {user?.data && user?.data[0]?.city}
                {user?.data && user?.data[0]?.state}
              </p>
              <p>{user?.data && user?.data[0]?.state}</p>
              <p>{user?.data && user?.data[0]?.pincode}</p>
            </div>
            <div className={styles.imgdivre}>&nbsp;</div>
          </div>
          <div className={styles.receiptNodiv}>
            <p>Fee Receipt</p> <p>Student Copy</p>
          </div>
          <div className={styles.mainfeedetails}>
            <div className={styles.mainfeedetailsinnear}>
              <div className={styles.textdivonly}>
                <p>Receipt No</p> <p>44444444444444</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Admission No</p> <p>add4444</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Student Name</p> <p>{data?.name}</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Course</p> <p>{data?.courseorclass}</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Father's Name</p> <p>{data?.fathersName}</p>
              </div>
              <div className={styles.textdivonly10}>
                <p>Fee Detail</p>
              </div>
            </div>
            <div className={styles.mainfeedetailsinnear}>
              <div className={styles.textdivonly}>
                <p>Receipt Date</p> <p>{data?.admissionDate}</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Roll No</p> <p>{data?.rollnumber}</p>
              </div>
            </div>
          </div>

          <div className={styles.receiptNodiv}>
            <p>Particulars</p> <p>Received(Rs.)</p>
          </div>
          <div className={styles.mainfeedetails}>
            <div className={styles.mainfeedetailsinnear}>
              <div className={styles.textdivonly}>
                <p>Registration Fee</p>
              </div>
              <div className={styles.textdivonly}>
                <p>Admission No</p>
              </div>
            </div>
            <div className={styles.mainfeedetailsinnear}>
              <div className={styles.textdivonly}>
                <p>{data?.regisgrationfee}</p>
              </div>
              <div className={styles.textdivonly}>
                <p>{data?.studentTotalFee}</p>
              </div>
              <div className={styles.textdivonly}>
                <p>
                  Total Amount-{" "}
                  {Number(data?.regisgrationfee) +
                    Number(data?.studentTotalFee)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => handlePrint()}>Print</button>
    </div>
  );
}

export default Receipt;
