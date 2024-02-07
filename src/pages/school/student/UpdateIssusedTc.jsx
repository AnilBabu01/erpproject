import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from "@/styles/loginguest.module.css";
import { toast } from "react-toastify";
import { serverInstance } from "../../../API/ServerInstance";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function UpdateIssusedTc({ setOpen, updatedata }) {
  const dispatch = useDispatch();

  const componentRef = useRef(null);
  const [data, setData] = React.useState();
  const [loading, setloading] = useState(false);
  const [NameofStudent, setNameofStudent] = useState("");
  const [FathersName, setFathersName] = useState("");
  const [MothersName, setMothersName] = useState("");
  const [Address, setAddress] = useState("");
  const [AadharNumber, setAadharNumber] = useState("");
  const [Nationality, setNationality] = useState("");
  const [DateofFirst, setDateofFirst] = useState("");
  const [DateofBirth, setDateofBirth] = useState("");
  const [ClassinWhich, setClassinWhich] = useState("");
  const [WhetherfailedinClass, setWhetherfailedinClass] = useState("");
  const [Subjectsstudied, setSubjectsstudied] = useState("");
  const [Whetherqualified, setWhetherqualified] = useState("");
  const [paidallthedues, setpaidallthedues] = useState("Yes");
  const [workingdays, setworkingdays] = useState("");
  const [workingdayspresent, setworkingdayspresent] = useState("");
  const [GeneralConduct, setGeneralConduct] = useState("");
  const [Dateofapplication, setDateofapplication] = useState("");
  const [DateofIssue, setDateofIssue] = useState("");
  const [Reasonforleaving, setReasonforleaving] = useState("");
  const [Anyothers, setAnyothers] = useState("");
  const [TcNo, setTcNo] = useState("");
  const [fileNo, setfileNo] = useState("");
  const [SrNo, setSrNo] = useState("");
  const [qualifiedforpromotion, setqualifiedforpromotion] = useState("");
  const [organizationdata, setorganizationdata] = useState("");

  const { user } = useSelector((state) => state.auth);

  console.log("updatedata data is", data);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (updatedata) {
      setData(updatedata);
    }
    if (user) {
      setorganizationdata(user?.data?.CredentailsData);
    }
  }, [user]);

  const issueCC = () => {
    setloading(true);
    const TCData = {
      id:data?.id,  
      NameofStudent: NameofStudent,
      FathersName: FathersName,
      MothersName: MothersName,
      Address: Address,
      AadharNumber: AadharNumber,
      Nationality: Nationality,
      DateofFirst: DateofFirst,
      DateofBirth: DateofBirth,
      ClassinWhich: ClassinWhich,
      WhetherfailedinClass: WhetherfailedinClass,
      Subjectsstudied: Subjectsstudied,
      Whetherqualified: Whetherqualified,
      paidallthedues: paidallthedues,
      workingdays: workingdays,
      workingdayspresent: workingdayspresent,
      GeneralConduct: GeneralConduct,
      Dateofapplication: Dateofapplication,
      DateofIssue: DateofIssue,
      Reasonforleaving: Reasonforleaving,
      Anyothers: Anyothers,
      TcNo: TcNo,
      fileNo: fileNo,
      SrNo: SrNo,
      qualifiedforpromotion: qualifiedforpromotion,
    };
    serverInstance("student/CreateTC", "put", TCData).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setloading(false);
      }
    });
  };

  useEffect(() => {
    setSrNo(data?.SrNo);
    setNameofStudent(data?.NameofStudent);
    setMothersName(data?.FathersName);
    setFathersName(data?.MothersName);
    setAddress(data?.Address);
    setAadharNumber(data?.AadharNumber);
    setNationality(data?.Nationality);
    setDateofBirth(data?.DateOfBirth);
    setClassinWhich(data?.ClassinWhich);
    setDateofFirst(data?.DateofFirst);
    setDateofBirth(data?.DateofBirth);
    setClassinWhich(data?.ClassinWhich);
    setWhetherfailedinClass(data?.WhetherfailedinClass);
    setSubjectsstudied(data?.Subjectsstudied);
    setWhetherqualified(data?.Whetherqualified);
    setpaidallthedues(data?.paidallthedues);
    setworkingdays(data?.workingdays);
    setworkingdayspresent(data?.workingdayspresent);
    setGeneralConduct(data?.GeneralConduct);
    setDateofapplication(data?.Dateofapplication);
    setDateofIssue(data?.DateofIssue);
    setReasonforleaving(data?.Reasonforleaving);
    setAnyothers(data?.Anyothers);
    setTcNo(data?.TcNo);
    setfileNo(data?.fileNo);
    setqualifiedforpromotion(data?.qualifiedforpromotion);
  }, [data]);

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
              "Update TC"
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
              <div className={styles.imgdivreggg}>
                <h2>{organizationdata?.institutename}</h2>
                <p>{organizationdata?.address}</p>
                <p>
                  {organizationdata?.city} {organizationdata?.state}
                </p>
                <p>{organizationdata?.pincode}</p>
              </div>
            </div>
            <div className={styles.transtextmain}>
              <div className={styles.transtextInnear}>
                <p>TRANSFER CERTIFICATE</p>
              </div>
            </div>
            <div className={styles.TCNoDiv}>
              <div className={styles.maintopTextdiv}>
                <label>File No</label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: "5rem",
                    marginLeft: "1%",
                  }}
                  value={fileNo}
                  name="fileNo"
                  onChange={(e) => {
                    setfileNo(e.target.value);
                  }}
                  type="text"
                />
              </div>
              <div className={styles.maintopTextdiv}>
                <label>T.C No</label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: "5rem",
                    marginLeft: "1%",
                  }}
                  value={TcNo}
                  name="TcNo"
                  onChange={(e) => {
                    setTcNo(e.target.value);
                  }}
                  type="text"
                />
              </div>

              <p> Sr Number (Admission No) {SrNo} </p>
            </div>
            <div className={styles.coachingtextaddress}>
              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>1. Name of Student</label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      NameofStudent?.length
                        ? NameofStudent?.length * 10
                        : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={NameofStudent}
                  name="NameofStudent"
                  onChange={(e) => setNameofStudent(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  2. Name of Father&apos;s Name
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      FathersName?.length ? FathersName?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={FathersName}
                  name="FathersName"
                  onChange={(e) => setFathersName(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  3.Name of Mother&apos;s Name
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      MothersName?.length ? MothersName?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={MothersName}
                  name="MothersName"
                  onChange={(e) => setMothersName(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>4.Residential Address</label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      Address?.length ? Address?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={Address}
                  name="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>5.Aadhar Number</label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      AadharNumber?.length ? AadharNumber?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={AadharNumber}
                  name="AadharNumber"
                  onChange={(e) => setAadharNumber(e.target.value)}
                />
              </div>
              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  6. Nationality. ....Religion & Community
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      Nationality?.length ? Nationality?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={Nationality}
                  name="Nationality"
                  onChange={(e) => setNationality(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  7. Date of First admission in the school with class
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      DateofFirst?.length ? DateofFirst?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={DateofFirst}
                  name="DateofFirst"
                  onChange={(e) => setDateofFirst(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  8. Date of Birth-accoding to Admission Register (in figures).
                  (In words)
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      DateofBirth?.length ? DateofBirth?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={DateofBirth}
                  name="DateofBirth"
                  onChange={(e) => setDateofBirth(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  10. Class in Which the Student last studied (in figures).
                  ...In words
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      ClassinWhich?.length ? ClassinWhich?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={ClassinWhich}
                  name="ClassinWhich"
                  onChange={(e) => setClassinWhich(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  10. Whether failed, if so once/twice in the same class
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      WhetherfailedinClass?.length
                        ? WhetherfailedinClass?.length * 10
                        : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={WhetherfailedinClass}
                  name="WhetherfailedinClass"
                  onChange={(e) => setWhetherfailedinClass(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>11. Subjects studied</label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      Subjectsstudied?.length
                        ? Subjectsstudied?.length * 10
                        : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={Subjectsstudied}
                  name="Subjectsstudied"
                  onChange={(e) => setSubjectsstudied(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  12. Whether qualified for promotion to the higher class
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      qualifiedforpromotion?.length
                        ? qualifiedforpromotion?.length * 10
                        : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={qualifiedforpromotion}
                  name="qualifiedforpromotion"
                  onChange={(e) => setqualifiedforpromotion(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  If so to which class (in figures).. ..(In words)
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      Whetherqualified?.length
                        ? Whetherqualified?.length * 10
                        : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={Whetherqualified}
                  name="Whetherqualified"
                  onChange={(e) => setWhetherqualified(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  13.Whether the Student has paid all the dues to the school
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      paidallthedues?.length
                        ? paidallthedues?.length * 10
                        : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={paidallthedues}
                  name="paidallthedues"
                  onChange={(e) => setpaidallthedues(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  14. Total Number of working days
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      workingdays?.length ? workingdays?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={workingdays}
                  name="workingdays"
                  onChange={(e) => setworkingdays(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  15.Total Number of working days present
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      workingdayspresent?.length
                        ? workingdayspresent?.length * 10
                        : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={workingdayspresent}
                  name="workingdayspresent"
                  onChange={(e) => setworkingdayspresent(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>16. General Conduct</label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      GeneralConduct?.length
                        ? GeneralConduct?.length * 10
                        : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={GeneralConduct}
                  name="GeneralConduct"
                  onChange={(e) => setGeneralConduct(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  17.Date of application for certificate
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      Dateofapplication?.length
                        ? Dateofapplication?.length * 10
                        : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={Dateofapplication}
                  name="Dateofapplication"
                  onChange={(e) => setDateofapplication(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  18. Date of Issue of Certificate
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      DateofIssue?.length ? DateofIssue?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={DateofIssue}
                  name="DateofIssue"
                  onChange={(e) => setDateofIssue(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>
                  110.Reason for leaving the school
                </label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      Reasonforleaving?.length
                        ? Reasonforleaving?.length * 10
                        : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={Reasonforleaving}
                  name="Reasonforleaving"
                  onChange={(e) => setReasonforleaving(e.target.value)}
                />
              </div>

              <div className={styles.innearTcOption}>
                <label className={styles.lebel1}>20. Any others</label>
                <input
                  style={{
                    borderBottom: "1px dotted black",
                    width: `${
                      Anyothers?.length ? Anyothers?.length * 10 : 10 * 10
                    }px`,
                    marginLeft: "1%",
                  }}
                  type="text"
                  value={Anyothers}
                  name="Anyothers"
                  onChange={(e) => setAnyothers(e.target.value)}
                />
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
    </div>
  );
}

export default UpdateIssusedTc;
