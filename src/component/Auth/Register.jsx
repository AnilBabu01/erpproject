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
const formData = new FormData();
function Register({ setOpen, setOpen1 }) {
  const dispatch = useDispatch();
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
  const { loading } = useSelector((state) => state.auth);
  const submit = (e) => {
    e.preventDefault();
    formData.set("name", owername);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("institutename", organizationName);
    formData.set("phoneno1", phoneno1);
    formData.set("phoneno2", phoneno2);
    formData.set("address", address);
    formData.set("city", city);
    formData.set("state", state);
    formData.set("pincode", pincode);
    formData.set("userType", loginas);
    dispatch(register(formData, loginas, setOpen, setOpen1));
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
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>New Institute/School Registration</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
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
            <div className={styles.inputdiv}>
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
            <div className={styles.inputdiv}>
              <label>Official Email</label>
              <input
                required
                type="email"
                placeholder="Enter the Official Email"
                value={email}
                name="email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Phone No1</label>
              <input
                required
                type="text"
                placeholder="Enter the phone No1"
                value={phoneno1}
                name="phoneno1"
                onChange={(e) => setphoneno1(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Phone No2</label>
              <input
                required
                type="text"
                placeholder="Enter the Phone No2"
                value={phoneno2}
                name="phoneno2"
                onChange={(e) => setphoneno2(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
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
            <div className={styles.inputdiv}>
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
            <div className={styles.inputdiv}>
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
            <div className={styles.inputdiv}>
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

          <div className={styles.inputdiv}>
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
          {/* <div className={styles.inputdiv}>
            <label>Re_Password</label>
            <input
              type="password"
              placeholder="Enter the re-password"
              value={repassword}
              name="repassword"
              onChange={(e) => setrepassword(e.target.value)}
            />
          </div> */}

          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Create Account</button>
          </div>
        </form>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Register;
