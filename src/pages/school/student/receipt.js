import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import styles from "@/styles/loginguest.module.css";
// import Moment from "moment-js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { WhatsappShareButton } from "react-share";
function Receipt({setOpen}) {
  const router = useRouter();
  const componentRef = useRef(null);
  const { receiptdata } = router.query;
  const [data, setData] = React.useState({});
  const [blob, setBlob] = useState(null);
  const [organizationdata, setorganizationdata] = useState("");
  const { user } = useSelector((state) => state.auth);

  var today = new Date(data?.PaidDate);
  var options = { year: "numeric", month: "short", day: "2-digit" };

  const currDate = today
    .toLocaleDateString("en-IN", options)
    .replace(/-/g, " ");
  const currTime = today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  [];
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  
  function down() {
    const input = document.getElementById("receipt");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);

      if (pdf.save("FeeReceipt.pdf")) {
        toast.success("Download Successfully", {
          autoClose: 1000,
        });
      }
    });
  }

  useEffect(() => {
    // handlePrint();

    if (receiptdata) {
      setData(JSON.parse(receiptdata));
    }
    if (user) {
      setorganizationdata(user?.data?.CredentailsData);
    }
  }, [user]);

  return (
    <div>
      <div className={styles.addpaddinreceipt}>
       
        <div className={styles.optionDiv}>
        <button className={styles.optionbtn} onClick={() => setOpen(false)}>
          Back
        </button>
          {/* <button className={styles.optionbtn} onClick={() => down()}>
            Download
          </button> */}
          <button className={styles.optionbtn} onClick={() => handlePrint()}>
            Print
          </button>
          {/* <button className={styles.optionbtn} onClick={() => handleCapture()}>
            Share
          </button> */}
        </div>

        <div className={styles.mainborderdiv} id="receipt" ref={componentRef}>
          <div className={styles.mainborderdivinnear10}>
            <div className={styles.mainimgdivre}>
              <div className={styles.imgdivre}>
                <img
                  alt="img"
                  src={organizationdata?.logourl}
                />
              </div>
              <div className={styles.imgdivre}>
                <h2>{organizationdata?.institutename}</h2>
                <p>{organizationdata?.address}</p>
                <p>
                  {organizationdata?.city} {organizationdata?.state}
                </p>
                <p>{organizationdata?.pincode}</p>
              </div>
              <div className={styles.imgdivre}>&nbsp;</div>
            </div>
            <div className={styles.receiptNodiv}>
              <p>Fee Receipt</p> <p>Office Copy</p>
            </div>
            <div className={styles.mainfeedetails}>
              <div className={styles.mainfeedetailsinnear}>
                <div className={styles.textdivonly}>
                  <p>Receipt No</p> <p>{data?.ReceiptNo}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Admission No</p> <p>{data?.RollNo}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Student Name</p> <p>{data?.studentName}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Course</p> <p>{data?.Course}</p>
                </div>
                {/* <div className={styles.textdivonly}>
                  <p>Fathers</p> <p>{data?.fathername}</p>
                </div> */}
                <div className={styles.textdivonly10}>
                  <p>Fee Detail</p>
                </div>
              </div>
              <div className={styles.mainfeedetailsinnear}>
                <div className={styles.textdivonly}>
                  <p>Receipt Date</p>
                  <p>
                    {currDate}/{currTime}
                  </p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Roll No</p> <p>{data?.RollNo}</p>
                </div>
              </div>
            </div>

            <div className={styles.receiptNodiv}>
              <p>Particulars</p> <p>Received(Rs.{data?.PaidAmount})</p>
            </div>
            <div className={styles.mainfeedetails}>
              <div className={styles.mainfeedetailsinnear}>
                <div className={styles.textdivonly}>
                  <p>Receipt Type</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Admission No</p>
                </div>
              </div>
              <div className={styles.mainfeedetailsinnear}>
                <div className={styles.textdivonly}>
                  <p>{data?.Feetype}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>{data?.RollNo}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>
                    Total Amount-
                    {data?.PaidAmount}
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
                  src={organizationdata?.logourl}
                />
              </div>
              <div className={styles.imgdivre}>
                <h2>{organizationdata?.institutename}</h2>
                <p>{organizationdata?.address}</p>
                <p>
                  {organizationdata?.city} {organizationdata?.state}
                </p>
                <p>{organizationdata?.pincode}</p>
              </div>
              <div className={styles.imgdivre}>&nbsp;</div>
            </div>
            <div className={styles.receiptNodiv}>
              <p>Fee Receipt</p> <p>Student Copy</p>
            </div>
            <div className={styles.mainfeedetails}>
              <div className={styles.mainfeedetailsinnear}>
                <div className={styles.textdivonly}>
                  <p>Receipt No</p> <p>{data?.ReceiptNo}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Admission No</p> <p>{data?.RollNo}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Student Name</p> <p>{data?.studentName}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Course</p> <p>{data?.Course}</p>
                </div>
                {/* <div className={styles.textdivonly}>
                  <p>Fathers &apos Name</p> <p>{data?.fathername}</p>
                </div> */}
                <div className={styles.textdivonly10}>
                  <p>Fee Detail</p>
                </div>
              </div>
              <div className={styles.mainfeedetailsinnear}>
                <div className={styles.textdivonly}>
                  <p>Receipt Date</p>
                  <p>
                    {/* {Moment(data?.PaidDate).format("DD-MM-YYYY")}/{currTime} */}
                    {currDate}/{currTime}
                  </p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Roll No</p> <p>{data?.rollnumber}</p>
                </div>
              </div>
            </div>

            <div className={styles.receiptNodiv}>
              <p>Particulars</p> <p>Received(Rs {data?.PaidAmount})</p>
            </div>
            <div className={styles.mainfeedetails}>
              <div className={styles.mainfeedetailsinnear}>
                <div className={styles.textdivonly}>
                  <p>Receipt Type</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Admission No</p>
                </div>
              </div>
              <div className={styles.mainfeedetailsinnear}>
                <div className={styles.textdivonly}>
                  <p>{data?.Feetype}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>{data?.RollNo}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>
                    Total Amount-
                    {data?.PaidAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
