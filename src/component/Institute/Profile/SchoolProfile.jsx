import React, { useState, useEffect } from "react";
import styles from "@/styles/register.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import UpdateCreadentials from "./UpdateCreadentials";
import UpdateProImges from "./UpdateProImges";
import UpdateSentsms from "./UpdateSentsms";
import Updateprofile from "./Updateprofile";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl } from "../../../config/config";
import BackupData from "./BackupData";
import DisableOptions from "./DisableOptions";

function SchoolProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [studentattendance, setstudentattendance] = useState(false);
  const [employee, setemployee] = useState(false);
  const [employeeattendance, setemployeeattendance] = useState(false);
  const [hostel, sethostel] = useState(false);
  const [transport, settransport] = useState(false);
  const [accounts, setaccounts] = useState(false);
  const [expenses, setexpenses] = useState(false);
  const [frontoffice, setfrontoffice] = useState(false);
  const [Library, setLibrary] = useState(false);
  const [student, setstudent] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [openbackup, setopenbackup] = useState(false);
  const [updateoptions, setupdateoptions] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClickOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleClickOpenOption = () => {
    setupdateoptions(true);
  };

  const handleCloseOption = () => {
    setupdateoptions(false);
  };

  const handleClickOpenbackup = () => {
    setopenbackup(true);
  };

  const handleClosebackup = () => {
    setopenbackup(false);
  };
  return (
    <>
      {openbackup && (
        <div>
          <Dialog
            open={openbackup}
            TransitionComponent={Transition}
            onClose={handleClosebackup}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "50rem",
                },
              },
            }}
          >
            <BackupData
              frontoffice={frontoffice}
              Library={Library}
              student={student}
              studentattendance={studentattendance}
              employee={employee}
              employeeattendance={employeeattendance}
              hostel={hostel}
              transport={transport}
              accounts={accounts}
              expenses={expenses}
              setOpen={setopenbackup}
            />
          </Dialog>
        </div>
      )}

      {updateoptions && (
        <div>
          <Dialog
            open={updateoptions}
            TransitionComponent={Transition}
            onClose={handleCloseOption}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "21rem",
                },
              },
            }}
          >
            <DisableOptions setOpen={setupdateoptions} />
          </Dialog>
        </div>
      )}
      {open && (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "60rem",
                },
              },
            }}
          >
            <Updateprofile setOpen={setOpen} />
          </Dialog>
        </div>
      )}
      {open2 && (
        <div>
          <Dialog
            open={open2}
            TransitionComponent={Transition}
            onClose={handleClose2}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "60rem",
                },
              },
            }}
          >
            <UpdateProImges setOpen={setOpen2} />
          </Dialog>
        </div>
      )}
      {open3 && (
        <div>
          <Dialog
            open={open3}
            TransitionComponent={Transition}
            onClose={handleClose3}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "62%",
                },
              },
            }}
          >
            <UpdateCreadentials setOpen={setOpen3} />
          </Dialog>
        </div>
      )}
      {open4 && (
        <div>
          <Dialog
            open={open4}
            TransitionComponent={Transition}
            onClose={handleClose4}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "40rem",
                },
              },
            }}
          >
            <UpdateSentsms setOpen={setOpen4} />
          </Dialog>
        </div>
      )}
      {/* user?.data?.User */}
      <div className="middle-chart-main-div mainprofile">
        <div className="bottom-chart-left-div">
          <div className="bottom-chart-left-div-inear1">
            <h4>Institute Details</h4>
            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Owner Name</p>
                <p>
                  {user?.data?.CredentailsData?.name
                    ? user?.data?.CredentailsData?.name
                    : "---------"}
                </p>
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Client Code</p>
                <p>
                  {user?.data?.CredentailsData?.ClientCode
                    ? user?.data?.CredentailsData?.ClientCode
                    : "---------"}
                </p>
              </div>
            </div>
            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Official Email</p>
                <p>
                  {user?.data?.CredentailsData?.email
                    ? user?.data?.CredentailsData?.email
                    : "---------"}
                </p>
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Institute Name</p>
                <p>
                  {user?.data?.CredentailsData?.institutename
                    ? user?.data?.CredentailsData?.institutename
                    : "---------"}
                </p>
              </div>
            </div>
            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Phone No1</p>
                <p>
                  {user?.data?.CredentailsData?.phoneno1
                    ? user?.data?.CredentailsData?.phoneno1
                    : "---------"}
                </p>
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Phone No2</p>
                <p>
                  {user?.data?.CredentailsData?.phoneno2
                    ? user?.data?.CredentailsData?.phoneno2
                    : "---------"}
                </p>
              </div>
            </div>
            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">State</p>
                <p>
                  {user?.data?.CredentailsData?.state
                    ? user?.data?.CredentailsData?.state
                    : "---------"}
                </p>
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">City</p>
                <p>
                  {user?.data?.CredentailsData?.city
                    ? user?.data?.CredentailsData?.city
                    : "---------"}
                </p>
              </div>
            </div>

            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Address</p>
                <p>
                  {user?.data?.CredentailsData?.address
                    ? user?.data?.CredentailsData?.address
                    : "---------"}
                </p>
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Pin Code</p>
                <p>
                  {user?.data?.CredentailsData?.pincode
                    ? user?.data?.CredentailsData?.pincode
                    : "---------"}
                </p>
              </div>
            </div>
            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">&nbsp;</p>
                <p>&nbsp;</p>
              </div>
              <div className="keydetailsdiv">
                <img
                  alt="img"
                  onClick={() => handleClickOpen()}
                  className="keydetailsdiveditimg"
                  src="/images/Edit.png"
                />
              </div>
            </div>
          </div>
          <div className="bottom-chart-left-div-inear1">
            <h4>Profile Img / Logo</h4>
            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Profile</p>
                {user?.data?.CredentailsData?.profileurl ? (
                  <>
                    <img
                      alt="img"
                      className="keydetailsdivproimg"
                      src={user?.data?.CredentailsData?.profileurl}
                    />
                  </>
                ) : (
                  <>
                    <img
                      alt="img"
                      className="keydetailsdivproimg"
                      src="/images/profileimg.jpg"
                    />
                  </>
                )}
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Logo</p>
                {user?.data?.CredentailsData?.logourl ? (
                  <>
                    <img
                      alt="img"
                      className="keydetailsdivlogoimg"
                      src={user?.data?.CredentailsData?.logourl}
                    />
                  </>
                ) : (
                  <>
                    <img
                      alt="img"
                      className="keydetailsdivlogoimg"
                      src="/images/erp.jpeg"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Certificate Logo</p>
                {user?.data?.CredentailsData?.certificatelogo ? (
                  <>
                    <img
                      alt="img"
                      className="keydetailsdivcertificatelogoimg"
                      src={user?.data?.CredentailsData?.certificatelogo}
                    />
                  </>
                ) : (
                  <>
                    <img
                      alt="img"
                      className="keydetailsdivcertificatelogoimg"
                      src="/images/erp.jpeg"
                    />
                  </>
                )}
              </div>

              <div className="keydetailsdiv">
                <img
                  alt="img"
                  onClick={() => handleClickOpen2()}
                  className="keydetailsdiveditimg"
                  src="/images/Edit.png"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-chart-left-div">
          <div className="bottom-chart-left-div-inear1">
            <h4>Credentials Details</h4>
            <div className={styles.divmaininput}>
              <div className={styles.inputcreadentionals}>
                <label>Student Default Password</label>
                <input
                  id="donation-date"
                  required
                  type="text"
                  placeholder="Student@123"
                  value={user?.data?.CredentailsData?.Studentpassword}
                  disabled={true}
                  // name="enquirydate"
                  // onChange={(e) => setenquirydate(e.target.value)}
                />
              </div>
              <div className={styles.inputcreadentionals}>
                <label>Parent Default Password</label>
                <input
                  required
                  type="text"
                  placeholder="Parent@123"
                  value={user?.data?.CredentailsData?.Parentpassword}
                  disabled={true}
                  // name="studentname"
                  // onChange={(e) => setstudentname(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.divmaininput}>
              <div className={styles.inputcreadentionals}>
                <label>Employee Default Password</label>
                <input
                  id="donation-date"
                  required
                  type="text"
                  // placeholder="Student@123"
                  value={user?.data?.CredentailsData?.Employeepassword}
                  disabled={true}
                  // name="enquirydate"
                  // onChange={(e) => setenquirydate(e.target.value)}
                />
              </div>
            </div>
            <div className="keydetailsdiv">
              <img
                alt="img"
                onClick={() => handleClickOpen3()}
                className="keydetailsdiveditimg"
                src="/images/Edit.png"
              />
            </div>
          </div>
          <div className="bottom-chart-left-div-inear1">
            <h4>Communication Details</h4>
            <p>Email Credentials For Send mail</p>
            <div className={styles.divmaininput}>
              <div className={styles.inputcreadentionals}>
                <label>Email</label>
                <input
                  id="donation-date"
                  required
                  type="text"
                  placeholder="Admin@gmail.com"
                  value={user?.data?.CredentailsData?.Sendemail}
                  disabled={true}
                  // name="enquirydate"
                  // onChange={(e) => setenquirydate(e.target.value)}
                />
              </div>
              <div className={styles.inputcreadentionals}>
                <label>Password</label>
                <input
                  required
                  type="text"
                  placeholder="Admin@123"
                  value={user?.data?.CredentailsData?.SendemailPassword}
                  disabled={true}
                  // name="studentname"
                  // onChange={(e) => setstudentname(e.target.value)}
                />
              </div>
            </div>

            {/* <p>SMS Credentials For Send SMS</p>
            <div className={styles.divmaininput}>
              <div className={styles.inputdiv}>
                <label>Email</label>
                <input
                  id="donation-date"
                  required
                  type="text"
                  placeholder="Admin@gmail.com"
                  // value={enquirydate}
                  // name="enquirydate"
                  // onChange={(e) => setenquirydate(e.target.value)}
                />
              </div>
              <div className={styles.inputdiv}>
                <label>Password</label>
                <input
                  required
                  type="text"
                  placeholder="Admin@123"
                  // value={studentname}
                  // name="studentname"
                  // onChange={(e) => setstudentname(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.divmaininput}>
              <div className={styles.inputdiv}>
                <label>SMTP_HOST</label>
                <input
                  id="donation-date"
                  required
                  type="text"
                  placeholder="smtp.gmail.com"
                  disabled={true}
                  // value={enquirydate}
                  // name="enquirydate"
                  // onChange={(e) => setenquirydate(e.target.value)}
                />
              </div>
              <div className={styles.inputdiv}>
                <label>Port No</label>
                <input
                  required
                  type="text"
                  placeholder="12345"
                  disabled={true}
                  // value={studentname}
                  // name="studentname"
                  // onChange={(e) => setstudentname(e.target.value)}
                />
              </div>
            </div> */}
            <div className="keydetailsdiv">
              <img
                alt="img"
                onClick={() => handleClickOpen4()}
                className="keydetailsdiveditimg"
                src="/images/Edit.png"
              />
            </div>
          </div>
        </div>
        {/* hello  */}

        <div className="bottom-chart-left-div">
          <div className="bottom-chart-left-div-inear1">
            <h4>Show Or Hide These Options</h4>
            <div className="optionsdiv">
              <p>Front Office</p>
              <input
                type="checkbox"
                checked={user?.data?.CredentailsData?.FrontOffice === true}
                disabled={true}
              />
            </div>
            <div className="optionsdiv">
              <p>Library</p>
              <input
                type="checkbox"
                checked={user?.data?.CredentailsData?.Library === true}
                disabled={true}
              />
            </div>
            <div className="optionsdiv">
              <p>Hostel</p>
              <input
                type="checkbox"
                checked={user?.data?.CredentailsData?.hostel === true}
                disabled={true}
              />
            </div>
            <div className="optionsdiv">
              <p>Transport</p>
              <input
                type="checkbox"
                checked={user?.data?.CredentailsData?.Transport === true}
                disabled={true}
              />
            </div>
            <div className="keydetailsdiv">
              <img
                alt="img"
                onClick={() => handleClickOpenOption()}
                className="keydetailsdiveditimg"
                src="/images/Edit.png"
              />
            </div>
          </div>

          {/* Wh can add more settings */}
          <div className="bottom-chart-left-div-inear1">
            <h4>Backup For</h4>
            <div className="mainbackdiv">
              <div className="backmaininear">
                <div className="optionsdiv10">
                  <p>Front Office</p>
                  <input
                    type="checkbox"
                    value={frontoffice}
                    onChange={(e) => {
                      setfrontoffice(e.target.checked);
                    }}
                  />
                </div>
                <div className="optionsdiv10">
                  <p>Library</p>
                  <input
                    type="checkbox"
                    value={Library}
                    onChange={(e) => {
                      setLibrary(e.target.checked);
                    }}
                  />
                </div>
                <div className="optionsdiv10">
                  <p>Student</p>
                  <input
                    type="checkbox"
                    value={student}
                    onChange={(e) => {
                      setstudent(e.target.checked);
                    }}
                  />
                </div>

                <div className="optionsdiv10">
                  <p>Accounts</p>
                  <input
                    type="checkbox"
                    value={accounts}
                    onChange={(e) => {
                      setaccounts(e.target.checked);
                    }}
                  />
                </div>
              </div>

              <div className="backmaininear">
                <div className="optionsdiv10">
                  <p>Employee</p>
                  <input
                    type="checkbox"
                    value={employee}
                    onChange={(e) => {
                      setemployee(e.target.checked);
                    }}
                  />
                </div>

                <div className="optionsdiv10">
                  <p>Hostel</p>
                  <input
                    type="checkbox"
                    value={hostel}
                    onChange={(e) => {
                      sethostel(e.target.checked);
                    }}
                  />
                </div>
                <div className="optionsdiv10">
                  <p>Transport</p>
                  <input
                    type="checkbox"
                    value={transport}
                    onChange={(e) => {
                      settransport(e.target.checked);
                    }}
                  />
                </div>
                <div className="optionsdiv10">
                  <p>Expenses</p>
                  <input
                    type="checkbox"
                    value={expenses}
                    onChange={(e) => {
                      setexpenses(e.target.checked);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="keydetailsdiv">
              <button
                onClick={() => handleClickOpenbackup()}
                className="backbtn"
              >
                Take Backup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SchoolProfile;
