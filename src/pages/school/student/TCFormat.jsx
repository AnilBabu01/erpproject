import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from "@/styles/loginguest.module.css";
import { toast } from "react-toastify";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
import { useSelector, useDispatch } from "react-redux";
import { getstudent } from "../../../redux/actions/commanAction";
import CircularProgress from "@mui/material/CircularProgress";

function TCFormat({ setOpen, TcData }) {
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const [data, setData] = React.useState({});
  const [loading, setloading] = useState(false);
  const [NameofPupil, setNameofPupil] = useState("");

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

  const issueCC = () => {
    setloading(true);
    serverInstance("student/IssueTC", "post", {
      student: data,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(getstudent());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
    });
  };

  return (
    <div>
      <div className={styles.addpaddinreceipt}>
        <div className={styles.optionDivTCCSCER}>
          <button
            className={styles.actionbtn}
            onClick={() => {
              setOpen(false);
              console.log("dd");
            }}
          >
            Back
          </button>
          <input className={styles.issueinput} type="text" />
          <button className={styles.actionbtn} onClick={() => issueCC()}>
            {loading ? (
              <CircularProgress size={25} style={{ color: "red" }} />
            ) : (
              "Issue"
            )}
          </button>
          <button className={styles.actionbtn} onClick={() => handlePrint()}>
            Print
          </button>
        </div>
        <div className={styles.TCMainTop} ref={componentRef}>
          <div className={styles.TCMain} id="receipt">
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
              {/* <div className={styles.imgdivre}>
                <img
                  className={styles.imgdivreimgprofile}
                  alt="img"
                  src={data?.profileurl}
                />
              </div> */}
            </div>
            <div className={styles.transtextmain}>
              <div className={styles.transtextInnear}>
                <p>TRANSFER CERTIFICATE</p>
              </div>
            </div>
            <div className={styles.TCNoDiv}>
              <p>File No</p>
              <p>T.C No</p>
              <p>Admission No {data?.SrNumber}</p>
            </div>
            <div className={styles.coachingtextaddress}>
              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>1.Name of Pupil</label>
                <input
                  style={{ borderBottom: "1px dotted", width: "7.8%" }}
                  type="text"
                  value={NameofPupil}
                  name="NameofPupil"
                  onChange={(e) => setNameofPupil(e.target.value)}
                />
              </div>

              <p>2.Name of Father&apos;s Name..............</p>
              <p>3.Name of Mother&apos;s Name...........</p>
              <p>4.Residential Address..........</p>
              <p>5.Aadhar Number...........</p>
              <p>6.Nationality. ....Religion & Community..........</p>
              <p>
                7.Date of First admission in the school with class..........
              </p>
              <p>
                8.8. Date of Birth-accoding to Admission Register (in figures).
                (In words)...........
              </p>
              <p>
                9.Class in Which the Pupil last studied (in figures). ...In
                words...........
              </p>
              <p>
                10.Whether failed, if so once/twice in the same class..........
              </p>
              <p>11.Subjects studied:..........</p>
              <p>
                12.12. Whether qualified for promotion to the higher
                class........ <br /> If so to which class (in figures).. ..(In
                words).............
              </p>
              <p>
                13.Whether the pupil has paid all the dues to the
                school...........
              </p>
              <p>14.Total Number of working days.............</p>
              <p>15.Total Number of working days present...........</p>
              <p>16.General Conduct...........</p>
              <p>17.Date of application for certificate..........</p>
              <p>18.Date of Issue of Certificate..........</p>
              <p>19.Reason for leaving the school............</p>
              <p>20.Any others..................</p>
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
    </div>
  );
}

export default TCFormat;
