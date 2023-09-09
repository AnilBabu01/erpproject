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
import { loadUser } from "../../../redux/actions/authActions";
function CoachingProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isUpdated } = useSelector((state) => state.editprofile);

  console.log("update profile data is", isUpdated);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
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
  // useEffect(() => {
  //   if (updatestatus) {
  //     dispatch(loadUser());
  //   }
  // }, [open, open2, open3, open4]);

  return (
    <>
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

      <div className="middle-chart-main-div mainprofile">
        <div className="bottom-chart-left-div">
          <div className="bottom-chart-left-div-inear1">
            <h4>Institute Details</h4>
            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Owner Name</p>
                <p>{user?.data[0]?.name ? user?.data[0]?.name : "---------"}</p>
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Client Code</p>
                <p>
                  {user?.data[0]?.ClientCode
                    ? user?.data[0]?.ClientCode
                    : "---------"}
                </p>
              </div>
            </div>
            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Official Email</p>
                <p>
                  {user?.data[0]?.email ? user?.data[0]?.email : "---------"}
                </p>
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Institute Name</p>
                <p>
                  {user?.data[0]?.institutename
                    ? user?.data[0]?.institutename
                    : "---------"}
                </p>
              </div>
            </div>
            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Phone No1</p>
                <p>
                  {user?.data[0]?.phoneno1
                    ? user?.data[0]?.phoneno1
                    : "---------"}
                </p>
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Phone No2</p>
                <p>
                  {user?.data[0]?.phoneno2
                    ? user?.data[0]?.phoneno2
                    : "---------"}
                </p>
              </div>
            </div>
            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">State</p>
                <p>
                  {user?.data[0]?.state ? user?.data[0]?.state : "---------"}
                </p>
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">City</p>
                <p>{user?.data[0]?.city ? user?.data[0]?.city : "---------"}</p>
              </div>
            </div>

            <div className="mainkeydetailsdiv">
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Address</p>
                <p>
                  {user?.data[0]?.address
                    ? user?.data[0]?.address
                    : "---------"}
                </p>
              </div>
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Pin Code</p>
                <p>
                  {user?.data[0]?.pincode
                    ? user?.data[0]?.pincode
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
                {user?.data[0]?.profileurl ? (
                  <>
                    <img
                      alt="img"
                      className="keydetailsdivproimg"
                      src={`${backendUrl}public/upload/${user?.data[0]?.profileurl}`}
                  
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
                {user?.data[0]?.logourl ? (
                  <>
                    <img
                      alt="img"
                      className="keydetailsdivlogoimg"
                      src={`${backendUrl}public/upload/${user?.data[0]?.logourl}`}
                    
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
                {user?.data[0]?.certificatelogo ? (
                  <>
                    <img
                      alt="img"
                      className="keydetailsdivcertificatelogoimg"
                      src={`${backendUrl}public/upload/${user?.data[0]?.certificatelogo}`}
                    
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
              <div className={styles.inputdiv}>
                <label>Student Default Password</label>
                <input
                  id="donation-date"
                  required
                  type="text"
                  placeholder="Student@123"
                  value={user?.data[0]?.Studentpassword}
                  disabled={true}
                  // name="enquirydate"
                  // onChange={(e) => setenquirydate(e.target.value)}
                />
              </div>
              <div className={styles.inputdiv}>
                <label>Parent Default Password</label>
                <input
                  required
                  type="text"
                  placeholder="Parent@123"
                  value={user?.data[0]?.Parentpassword}
                  disabled={true}
                  // name="studentname"
                  // onChange={(e) => setstudentname(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.divmaininput}>
              <div className={styles.inputdiv}>
                <label>Employee Default Password</label>
                <input
                  id="donation-date"
                  required
                  type="text"
                  // placeholder="Student@123"
                  value={user?.data[0]?.Employeepassword}
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
              <div className={styles.inputdiv}>
                <label>Email</label>
                <input
                  id="donation-date"
                  required
                  type="text"
                  placeholder="Admin@gmail.com"
                  value={user?.data[0]?.Sendemail}
                  disabled={true}
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
                  value={user?.data[0]?.SendemailPassword}
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
      </div>
    </>
  );
}

export default CoachingProfile;
