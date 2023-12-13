import React, { useState, useEffect } from "react";
import styles from "@/styles/register.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Style from "../../styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl } from "../../config/config";

function EmployeeProfile() {
  const dispatch = useDispatch();
  const [active, setactive] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const { isUpdated } = useSelector((state) => state.editprofile);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
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

  return (
    <>
      {/* user?.data?.User */}
      <div className="middle-chart-main-div mainprofile">
        <div className="bottom-chart-left-div10">
          <div className="bottom-chart-left-div-inear10">
            <button
              onClick={() => {
                setactive(true);
              }}
              className={
                active === true ? styles.dashActiveBtn : styles.dashDisableBtn
              }
            >
              School Details
            </button>
            <button
              onClick={() => setactive(false)}
              className={
                active === false ? styles.dashActiveBtn : styles.dashDisableBtn
              }
            >
              Personal Details
            </button>
            {active === true && (
              <>
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
              </>
            )}

            {active === false && (
              <>
                <p>Details</p>
                <div className="keydetailsdiv">
                  <p className="keydetailsdivp">Profile</p>
                  {user?.data?.CredentailsData?.profileurl ? (
                    <>
                      <img
                        alt="img"
                        className="keydetailsdivproimg"
                        src={`${backendUrl}public/upload/${user?.data?.CredentailsData?.profileurl}`}
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeProfile;
