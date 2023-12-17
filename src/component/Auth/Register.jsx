import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";
import LoadingSpinner from "../../component/loader/LoadingSpinner";
import {
  alCoaching,
  allschool,
  allCollege,
  allClient,
} from "../../redux/actions/commanAction";
import { serverInstance } from "../../API/ServerInstance";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const formData = new FormData();
function Register({ setOpen, setOpen1 }) {
  const dispatch = useDispatch();
  const [timestatus, settimestatus] = useState(false);
  const [time, settime] = useState(60);
  const [showtimer, setshowtimer] = useState(false);
  const [phoneOtpStatus, setphoneOtpStatus] = useState(false);
  const [phonenDone, setphonenDone] = useState(false);
  const [emailDone, setemailDone] = useState(false);
  const [getphoneotpstate, setgetphoneotpstate] = useState(false);
  const [showprogrees1, setshowprogrees1] = useState(false);
  const [showprogrees2, setshowprogrees2] = useState(false);
  const [showprogrees3, setshowprogrees3] = useState(false);
  const [showprogrees4, setshowprogrees4] = useState(false);
  const [getphonebtnstatus, setgetphonebtnstatus] = useState(false);
  const [PhoneOtpVerifystatus, setPhoneOtpVerifystatus] = useState(false);
  const [getemailotpstate, setgetemailotpstate] = useState(false);
  const [emailOtpGot, setemailOtpGot] = useState(false);
  const [phoneverify, setphoneverify] = useState(false);
  const [emailverify, setemailverify] = useState(false);
  const [getemailotpstatus, setgetemailotpstatus] = useState(false);
  const [verification, setverification] = useState(false);
  const [loginas, setloginas] = useState("college");
  const [owername, setowername] = useState("");
  const [email, setemail] = useState("");
  const [phoneno1, setphoneno1] = useState("");
  const [phoneno2, setphoneno2] = useState("");
  const [organizationName, setorganizationName] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [password, setpassword] = useState("");
  const [phoneotp, setphoneotp] = useState("");
  const [emailOtp, setemailOtp] = useState("");
  const { loading } = useSelector((state) => state.auth);

  const submit = () => {
    formData.set("name", owername);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("institutename", organizationName);
    formData.set("phoneno1", phoneno1);
    formData.set("address", address);
    formData.set("city", city);
    formData.set("state", state);
    formData.set("pincode", pincode);
    formData.set("userType", loginas);
    dispatch(register(formData, loginas, setOpen, setOpen1));
  };

  const stoptimer = () => {
    settimestatus(false);
    setgetphoneotpstate(false);
    setgetphonebtnstatus(false);

    settime(60);
  };

  const starttimer = () => {
    settimestatus(true);

    if (timestatus) {
      if (time > 0) {
        setTimeout(() => {
          settime(time - 1);
        }, 1000);
      } else {
        stoptimer();
      }
    }
  };

  useEffect(() => {
    starttimer();
  }, [time]);

  const [emailtime, setemailtime] = useState(60);
  const [emaiTimerStatus, setemaiTimerStatus] = useState(false);
  const [getotpstatusonemail, setgetotpstatusonemail] = useState(false);
  const stopemailtimer = () => {
    setemaiTimerStatus(false);
    setgetphoneotpstate(false);
    setgetphonebtnstatus(false);

    setemailtime(60);
  };

  const startemailtimer = () => {
    setemaiTimerStatus(true);

    if (emaiTimerStatus) {
      if (emailtime > 0) {
        setTimeout(() => {
          setemailtime(emailtime - 1);
        }, 1000);
      } else {
        stopemailtimer();
      }
    }
  };

  useEffect(() => {
    startemailtimer();
  }, [emailtime]);

  const sendotpOnPhone = () => {
    setshowprogrees1(true);
    serverInstance("clientVerify/phondverification", "post", {
      phone: phoneno1,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setgetphoneotpstate(true);
        setgetphonebtnstatus(true);
        setshowprogrees1(false);
        starttimer();
        // setphonenDone(false);
        // setemailDone(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setshowprogrees1(false);
        // setphonenDone(false);
        // setemailDone(false);
      }
      console.log("Send opt number is ", res);
    });
  };

  const PhoneOtpVerify = () => {
    setshowprogrees2(true);
    setphoneverify(true);
    serverInstance("clientVerify/phondverification", "put", {
      otp: phoneotp,
    }).then((res) => {
      if (res?.status) {
        stoptimer();
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setPhoneOtpVerifystatus(true);
        setshowprogrees2(false);
        setphoneverify(false);
        setphonenDone(true);
        setgetphoneotpstate(true);
      }

      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setshowprogrees2(false);
        setphoneverify(false);
        setPhoneOtpVerifystatus(true);
        setgetphoneotpstate(true);
        stoptimer();
      }
      console.log("Verify opt number is ", res);
    });
  };

  const sendotpOnEmail = () => {
    setshowprogrees3(true);
    serverInstance("clientVerify/emailverification", "post", {
      email: email,
      phone: phoneno1,
    }).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setPhoneOtpVerifystatus(false);
        setemailOtpGot(true);
        setshowprogrees3(false);
        setgetotpstatusonemail(true);
        setemailtime(60);
        startemailtimer();
        // setphonenDone(false);
        // setemailDone(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setshowprogrees3(false);
        setemailOtpGot(false);
        setPhoneOtpVerifystatus(true);
        setemailtime(60);
        stopemailtimer();
        // setphonenDone(false);
        // setemailDone(false);
      }
      console.log("Send opt number is ", res);
    });
  };

  const EmailOtpVerify = () => {
    setshowprogrees2(true);
    setemailverify(true);
    serverInstance("clientVerify/emailverification", "put", {
      otp: emailOtp,
      email: email,
      phone: phoneno1,
    }).then((res) => {
      if (res?.status) {
        stopemailtimer();
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setPhoneOtpVerifystatus(false);
        setshowprogrees2(false);
        setgetemailotpstate(false);
        setemailverify(false);
        setemailDone(true);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setshowprogrees2(false);
        setPhoneOtpVerifystatus(false);
        setgetemailotpstate(false);
        setemailverify(false);
        stopemailtimer();
      }
      console.log("Verify opt number is ", res);
    });
  };
  useEffect(() => {
    dispatch(alCoaching());
    dispatch(allCollege());
    dispatch(allschool());
    dispatch(allClient());
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondivauth} onClick={() => setOpen(false)}>
          <CloseIcon style={{ color: 'white' }}/>
        </div>
        <h1>New Institute/School Registration</h1>
        <div>
          {phonenDone === false || emailDone === false ? (
            <>
              <div className={styles.divmaininput}>
                <div className={styles.inputdivregister}>
                  <label>Phone No</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the phone No"
                    value={phoneno1}
                    name="phoneno1"
                    onChange={(e) => setphoneno1(e.target.value)}
                  />
                </div>
                <div className={styles.inputdivregister}>
                  <label>Email</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Email"
                    value={email}
                    name="email"
                    onChange={(e) => setemail(e.target.value)}
                    disabled={PhoneOtpVerifystatus ? false : true}
                  />
                </div>

                <div className={styles.inputdivregister}>
                  <p className={styles.disabledinphone}>&nbsp;</p>
                  <button
                    onClick={() => sendotpOnPhone()}
                    className={
                      getphonebtnstatus || PhoneOtpVerifystatus
                        ? styles.verifybtndisable
                        : styles.verifybtn
                    }
                    disabled={
                      getphonebtnstatus || PhoneOtpVerifystatus ? true : false
                    }
                  >
                    {getphonebtnstatus || getemailotpstate ? (
                      <>
                        <p>{time}</p>
                      </>
                    ) : (
                      <>
                        {showprogrees1 ? (
                          <CircularProgress size={25} />
                        ) : (
                          "Get code on phone"
                        )}
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className={styles.divmaininput}>
                <div className={styles.inputdivregister}>
                  <label>Phone Otp</label>

                  <input
                    required
                    type="text"
                    placeholder="Enter the otp"
                    value={phoneotp}
                    name="phoneotp"
                    onChange={(e) => setphoneotp(e.target.value)}
                    // disabled={getphoneotpstate ? false : true}
                  />
                  <button
                    onClick={() => PhoneOtpVerify()}
                    className={
                      phoneotp
                        ? styles.verifybtntop
                        : styles.verifybtntopdisable
                    }
                    disabled={phoneotp ? false : true}
                  >
                    {phoneverify ? <CircularProgress size={25} /> : "Verify Number"}
                  </button>
                </div>
                <div className={styles.inputdivregister}>
                  <label>Email Otp</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the otp"
                    value={emailOtp}
                    name="emailOtp"
                    onChange={(e) => setemailOtp(e.target.value)}
                    // disabled={emailOtpGot ? false : true}
                  />
                  <button
                    className={
                      emailOtp
                        ? styles.verifybtntop
                        : styles.verifybtntopdisable
                    }
                    disabled={emailOtp ? false : true}
                    onClick={() => EmailOtpVerify()}
                  >
                    {emailverify ? <CircularProgress size={25} /> : "Verify Email"}
                  </button>
                </div>

                <div className={styles.inputdivregister}>
                  <button
                    onClick={() => sendotpOnEmail()}
                    className={
                      PhoneOtpVerifystatus
                        ? styles.verifybtn
                        : styles.verifybtndisable
                    }
                    disabled={PhoneOtpVerifystatus ? false : true}
                  >
                    {getotpstatusonemail ? (
                      <>
                        <p>{emailtime}</p>
                      </>
                    ) : (
                      <>
                        {showprogrees3 ? (
                          <CircularProgress size={25} />
                        ) : (
                          "Get code on Email"
                        )}
                      </>
                    )}
                  </button>

                  <div className={styles.timmeerdiv}>
                    <p>&nbsp;</p>
                    {/* {getotpstatusonemail ? (
                      <>
                        <p>{emailtime}</p>
                      </>
                    ) : (
                      <>
                        <p>&nbsp;</p>
                      </>
                    )} */}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.divmaininput}>
                <div className={styles.inputdivregister}>
                  <label>Owner Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the name"
                    value={owername}
                    name="owername"
                    onChange={(e) => setowername(e.target.value)}
                  />
                </div>
                <div className={styles.inputdivregister}>
                  <label>Institute/School Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Institute/School"
                    value={organizationName}
                    name="organizationName"
                    onChange={(e) => setorganizationName(e.target.value)}
                  />
                </div>
                <div className={styles.inputdivregister}>
                  <label>Register As</label>
                  <Select
                    required
                    className={styles.addwidth}
                    sx={{
                      width: "18.8rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={loginas}
                    onChange={(e) => setloginas(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={"college"}
                    >
                      College
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={"school"}
                    >
                      School
                    </MenuItem>

                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={"institute"}
                    >
                      Coaching Institute
                    </MenuItem>
                  </Select>
                </div>
              </div>
              <div className={styles.divmaininput}>
                <div className={styles.inputdivaddred}>
                  <label>Address</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the address"
                    value={address}
                    name="address"
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.divmaininput}>
                <div className={styles.inputdivregister}>
                  <label>City</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the city"
                    value={city}
                    name="city"
                    onChange={(e) => setcity(e.target.value)}
                  />
                </div>
                <div className={styles.inputdivregister}>
                  <label>State</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the State"
                    value={state}
                    name="state"
                    onChange={(e) => setstate(e.target.value)}
                  />
                </div>
                <div className={styles.inputdivregister}>
                  <label>Pin Code</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Pincode"
                    value={pincode}
                    name="pincode"
                    onChange={(e) => setpincode(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.inputdivregister}>
                <label>Password</label>
                <input
                  required
                  type="password"
                  placeholder="Enter the password"
                  value={password}
                  name="password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className={styles.logbtnstylediv} onClick={() => submit()}>
                <button className={styles.logbtnstyle}>Create Account</button>
              </div>
            </>
          )}
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Register;
