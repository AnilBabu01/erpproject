import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from "@/styles/loginguest.module.css";
import { toast } from "react-toastify";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
import { useSelector, useDispatch } from "react-redux";
import { getstudent } from "../../../redux/actions/commanAction";
import CircularProgress from "@mui/material/CircularProgress";
function CCertificate({ setOpen, TcData }) {
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const [data, setData] = React.useState({});
  const [loading, setloading] = useState(false);
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
    serverInstance("student/IssueCC", "post", {
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
            <div className={styles.coachingtextaddress}>
              <p>
                This is to certify that Mr/Ms
                <span className={styles.dynamictext}>{data?.name}</span>
                Son/Daughter of Shree
                <span className={styles.dynamictext}>{data?.fathersName}</span>a
                student of this Campus has successfully completed the
                Proficiency Certificate/Bachelor Level of ................ With
                .............Division in the year.....................and has
                secured................percent of marks. I know nothing against
                his/her moral character. His.Her date of birth according to the
                campus record is
                <span className={styles.dynamictext}>
                  {moment(data?.DateOfBirth).format("DD/MM/YYYY")}
                </span>
                (B.S)...............(A.D)
              </p>
            </div>
            <div className={styles.coachingtextaddress}>
              <p>I wish his/her success in every walk of life</p>
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

export default CCertificate;
