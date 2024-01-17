import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import styles from "@/styles/loginguest.module.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import moment from "moment";
function TCFormat({ setOpen, TcData }) {
  const componentRef = useRef(null);
  const [data, setData] = React.useState({});
  const [organizationdata, setorganizationdata] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (TcData) {
      setData(TcData);
    }
    if (user) {
      setorganizationdata(user?.data?.CredentailsData);
    }
  }, [user]);

  return (
    <div>
      <div className={styles.addpaddinreceipt}>
        <div className={styles.optionDiv}>
          <button
            className={styles.optionbtn}
            onClick={() => {
              setOpen(false);
              console.log("dd");
            }}
          >
            Back
          </button>

          <button className={styles.optionbtn} onClick={() => handlePrint()}>
            Print
          </button>
        </div>

        <div className={styles.TCMain} id="receipt" ref={componentRef}>
          <div className={styles.mainimgdivre}>
            <div className={styles.imgdivre}>
              <img alt="img" src={organizationdata?.logourl} />
            </div>
            <div className={styles.imgdivre}>
              <h2>{organizationdata?.institutename}</h2>
              <p>{organizationdata?.address}</p>
              <p>
                {organizationdata?.city} {organizationdata?.state}
              </p>
              <p>{organizationdata?.pincode}</p>
            </div>
            <div className={styles.imgdivre}>
              <img
                className={styles.imgdivreimgprofile}
                alt="img"
                src={data?.profileurl}
              />
            </div>
          </div>
          <div className={styles.transtextmain}>
            <div className={styles.transtextInnear}>
              <p>TRANSFER CERTIFICATE</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>1. NAME OF CANDIDATE</p>
            </div>
            <div>
              <p className={styles.TCPoints}>{data?.name}</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>2. MOTHER’S NAME</p>
            </div>
            <div>
              <p className={styles.TCPoints}>{data?.MathersName}</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>3. FATHER’S NAME</p>
            </div>
            <div>
              <p className={styles.TCPoints}>{data?.fathersName}</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>4. NATIONALITY</p>
            </div>
            <div>
              <p className={styles.TCPoints}>Indian</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                5. WHETHER THE CANDIDATE BELONGS TO SC/ST/OBC CATEGOR
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>{data?.StudentCategory}</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                6. DATE OF BIRTH ACCORDING TO SCHOLAR REGISTER
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>
                {moment(data?.DateOfBirth).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                7. SCHOOL/BOARD ANNUAL EXAMINATION LAST TAKEN WITH RESULT
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>Aakash</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                8. CLASS IN WHICH CANDIDATE ADMITTED
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>{data?.courseorclass}</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>9. DATE OF ADMISSION</p>
            </div>
            <div>
              <p className={styles.TCPoints}>
                {moment(data?.admissionDate).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                10. CLASS IN WHICH CANDIDATE LAST STUDIED
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>{data?.courseorclass}</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>11. SUBJECT STUDIED</p>
            </div>
            <div>
              <p className={styles.TCPoints}>All</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                12. WHETHER FAILED, IF SO ONCE /TWICE
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>No</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                13. WHETHER QUALIFIED FOR PROMOTION TO THE NEXT HEIGHER CLASS
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>No</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                14. MONTH UPTO WHICH CANDIDATE HAS PAID SCHOOL DUES
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>No</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                15. WHETHER THE CANDIDATE WAS IN RECIEPT OF ANY FEE CONC IF SO
                THE NATURE OF SUCH CONCESSION
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>No</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                16. WHETHER THE CANDIDATE IS IN NCC CADET/BOYS SCOUT/GIRL GUIDE
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>No</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                17. GAMES PLAYED OR EXTRA CARRICULER ACTIVITIES IN WHICH
                CANDIDATE USUALLY TOOK PART
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>Good</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>18. GENERAL CONDUCT</p>
            </div>
            <div>
              <p className={styles.TCPoints}>Good</p>
            </div>
          </div>
          
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                20. NO. OF SCHOOL DAYS CANDIDATE ATTENDED
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>Aakash</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                21. REASONING FOR LEAVING THE SCHOOL
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>Aakash</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                22. DATE OF APPLICATION FOR CERTIFICATE
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>Aakash</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                23. DATE OF ISSUE OF CERTIFICATE
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>Aakash</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>24. REMARKS IF ANY</p>
            </div>
            <div>
              <p className={styles.TCPoints}>Aakash</p>
            </div>
          </div>
          <div className={styles.maincontenttc}>
            <div>
              <p className={styles.TCPoints}>
                25. REGISTRATION NO. OF THE CANDIDATE (IN CASE CLASS IX & X)
              </p>
            </div>
            <div>
              <p className={styles.TCPoints}>Aakash</p>
            </div>
          </div>
          <div className={styles.signaturemain}>
            <div className={styles.signaturemainInnear}>
              <p>PREPARED BY</p>
            </div>
            <div className={styles.signaturemainInnear}>
              <p>CHECKED BY</p>
            </div>
            <div className={styles.signaturemainInnear}>
              <p>PRINCIPAL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TCFormat;
