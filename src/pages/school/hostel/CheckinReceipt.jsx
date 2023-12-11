import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../config/config";
import { useReactToPrint } from "react-to-print";
import styles from "@/styles/loginguest.module.css";
// import Moment from "moment-js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { WhatsappShareButton } from "react-share";
function CheckinReceipt() {
  const router = useRouter();
  const componentRef = useRef(null);
  const { receiptdata } = router.query;
  const [data, setData] = React.useState({});
  const [blob, setBlob] = useState(null);
  const [organizationdata, setorganizationdata] = useState("");
  const { user } = useSelector((state) => state.auth);

  var today = new Date(data?.CheckinDate);
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

  console.log("receipt data is", data);

  return (
    <div className="mainContainer">
      <div className={styles.addpaddinreceipt}>
        <button className={styles.optionbtn} onClick={() => router.back()}>
          Back
        </button>
        <div className={styles.optionDiv}>
          <button className={styles.optionbtn} onClick={() => down()}>
            Download
          </button>
          <button className={styles.optionbtn} onClick={() => handlePrint()}>
            Print
          </button>
          {/* <button className={styles.optionbtn} onClick={() => handleCapture()}>
            Share
          </button> */}
        </div>

        <div className={styles.mainborderdiv} id="receipt" ref={componentRef}>
          <div className={styles.mainborderdivinnear}>
            <div className={styles.mainimgdivre}>
              <div className={styles.imgdivre}>
                <img
                  alt="img"
                  src={`${backendUrl}public/upload/${organizationdata?.logourl}`}
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
              <p>Session</p> <p>{data?.Session}</p>
            </div>
            <div className={styles.mainfeedetails}>
              <div className={styles.mainfeedetailsinnear}>
                <div className={styles.textdivonly}>
                  <p>SNO</p> <p>{data?.SNO}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Student Name</p> <p>{data?.StudentName}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Class</p> <p>{data?.StudentClass}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Mobile No</p> <p>{data?.MobileNO}</p>
                </div>
              </div>
              <div className={styles.mainfeedetailsinnear}>
                <div className={styles.textdivonly}>
                  <p>Checkin Date</p>
                  <p>
                    {currDate}/{currTime}
                  </p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Hostel Name</p> <p>{data?.hostelname}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Category</p> <p>{data?.Category}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Facility</p> <p>{data?.Facility}</p>
                </div>
                <div className={styles.textdivonly}>
                  <p>Room No</p> <p>{data?.RoomNo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckinReceipt;
