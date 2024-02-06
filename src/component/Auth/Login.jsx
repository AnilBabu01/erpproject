import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { login, loadUser } from "../../redux/actions/authActions";
import {
  getcurrentsession,
  getcurrentYear,
} from "../../redux/actions/commanAction";

import Select1 from "react-select";
import { useRouter } from "next/router";
import styles from "@/styles/loginguest.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const logintype = [
  { label: "College", value: "College" },
  { label: "School", value: "School" },
  { label: "Coaching Institute", value: "Coaching Institute" },
  { label: "Employee", value: "Employee" },
  { label: "Student", value: "Student" },
  { label: "Parent", value: "Parent" },
  { label: "Others", value: "Others" },
];

const customStyles = {
  control: (defaultStyles) => ({
    ...defaultStyles,
    padding: "1",
    testAlign: "center",
    border: "1px solid #093959",
  }),
};

function Login({ setOpen, setOpen1, setwelcomeopen, setopenforget }) {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [loginas, setloginas] = useState("College");
  const [guestloginas, setguestloginas] = useState("college");
  const [loginfor, setloginfor] = useState("");
  const [showloginoption, setshowloginoption] = useState(true);
  const [userid, setuserid] = useState("");
  const [password, setpassword] = useState("");
  const [useriderror, setuseriderror] = useState("");
  const [passworderror, setpassworderror] = useState("");
  const [Fullname, setFullname] = useState("");
  const [showonldpassword, setshowonldpassword] = useState(false);
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  const { college } = useSelector((state) => state.college);
  const { coaching } = useSelector((state) => state.coaching);
  const { school } = useSelector((state) => state.school);
  const { client } = useSelector((state) => state.client);

  const submit = (e) => {
    e.preventDefault();
    if (showloginoption === true) {
      if (userid === "") {
        setuseriderror("User id required");
      }
      if (password === "") {
        setpassworderror("Password is required");
      }
      if (userid && password) {
        dispatch(login(userid, password, loginas, loginfor));
      }
    } else {
      if (userid && password) {
        dispatch(login(userid, password, guestloginas, Fullname));
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("erptoken", user?.data[0]?.token);
      localStorage.setItem("GuestType", user?.data[0]?.User?.userType);

      dispatch(loadUser());
      dispatch(getcurrentYear());
      dispatch(getcurrentsession());
      setOpen(false);
      setwelcomeopen(true);
      setInterval(() => {
        setwelcomeopen(false);
      }, 1000);

      if (user?.data[0]?.PlanStatuc === false) {
        navigate.push("/pricing");
      } else {
        if (user?.data[0]?.userType === "school") {
          navigate.push("/school/dashboard");
        }
        if (user?.data[0]?.userType === "college") {
          navigate.push("/college/dashboard");
        }
        if (user?.data[0]?.userType === "institute") {
          navigate.push("/coaching/dashboard");
        }

        if (user?.data[0]?.userType === "admin") {
          navigate.push("/mainadmin/dashboard");
        }

        if (user?.data[0]?.userType === "employee") {
          navigate.push("/employee/dashboard");
        }
        if (user?.data[0]?.userType === "student") {
          navigate.push("/student/dashboard");
        }
        if (user?.data[0]?.userType === "parent") {
          navigate.push("/parent/dashboard");
        }
      }
    }
  }, [user]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondivauth} onClick={() => setOpen(false)}>
          <CloseIcon style={{ color: "white" }} />
        </div>

        <h1>Login</h1>
        <div className={styles.selectbtn}>
          <Button
            className={showloginoption ? styles.btnActive : styles.btndeActive}
            variant={showloginoption ? "contained" : "outlined"}
            sx={{
              borderColor: "#C8C8C8",
              fontSize: 12,
              minWidth: 100,
              padding: 0.5,
              color: showloginoption ? "#fff" : "#093959",
            }}
            onClick={() => setshowloginoption(true)}
          >
            Login
          </Button>

          <Button
            className={showloginoption ? styles.btndeActive : styles.btnActive}
            variant={showloginoption ? "outlined" : "contained"}
            sx={{
              borderColor: "#C8C8C8",
              fontSize: 12,
              minWidth: 100,
              padding: 0.5,
              color: showloginoption ? "#093959" : "#fff",
            }}
            onClick={() => setshowloginoption(false)}
          >
            Guest
          </Button>
        </div>

        {showloginoption === false && (
          <>
            <form onSubmit={submit}>
              <div className={styles.inputdiv}>
                <label>Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Enter the Full Name"
                  value={Fullname}
                  name="Fullname"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className={styles.inputdiv}>
                <label>Email</label>
                <input
                  required
                  type="email"
                  placeholder="Enter the email"
                  value={userid}
                  name="userid"
                  onChange={(e) => setuserid(e.target.value)}
                />
              </div>
              <div className={styles.inputdiv}>
                <label>Phone Number</label>
                <input
                  required
                  type="text"
                  placeholder="Enter the phone"
                  value={password}
                  name="password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>

              <div className={styles.inputdiv}>
                <label>Login As</label>
                <Select
                  required
                  sx={{
                    width: "100%",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={guestloginas}
                  onChange={(e) => setguestloginas(e.target.value)}
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
              <div className={styles.logbtnstylediv}>
                <button className={styles.logbtnstyle}>Login As Guest</button>
              </div>
            </form>
          </>
        )}

        {showloginoption === true && (
          <>
            <form onSubmit={submit}>
              <div className={styles.inputdiv10}>
                <label>Login As</label>
                <Select1
                  required
                  styles={customStyles}
                  options={logintype}
                  onChange={(opt) => setloginas(opt.value)}
                />
              </div>
              {loginas === "College" && (
                <>
                  <div className={styles.inputdiv10}>
                    <label>Please Select College</label>
                    <Select1
                      required
                      styles={customStyles}
                      options={college?.map((item) => ({
                        label: `${item?.institutename} ${item?.ClientCode}`,
                        value: `${item?.institutename} ${item?.ClientCode}`,
                      }))}
                      onChange={(opt) => setloginfor(opt.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>User Id</label>
                    <input
                      type="text"
                      placeholder="Enter the email , number"
                      value={userid}
                      name="userid"
                      onChange={(e) => setuserid(e.target.value)}
                    />
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {useriderror}
                    </p>
                  </div>
                </>
              )}
              {loginas === "School" && (
                <>
                  <div className={styles.inputdiv10}>
                    <label>Please Select School</label>
                    <Select1
                      required
                      styles={customStyles}
                      options={school?.map((item) => ({
                        label: `${item?.institutename} ${item?.ClientCode}`,
                        value: `${item?.institutename} ${item?.ClientCode}`,
                      }))}
                      onChange={(opt) => setloginfor(opt.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>User Id</label>
                    <input
                      type="text"
                      placeholder="Enter the email , number"
                      value={userid}
                      name="userid"
                      onChange={(e) => setuserid(e.target.value)}
                    />
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {useriderror}
                    </p>
                  </div>
                </>
              )}
              {loginas === "Coaching Institute" && (
                <>
                  <div className={styles.inputdiv10}>
                    <label>Please Select Coaching Institute</label>
                    <Select1
                      required
                      styles={customStyles}
                      options={coaching?.map((item) => ({
                        label: `${item?.institutename} ${item?.ClientCode}`,
                        value: `${item?.institutename} ${item?.ClientCode}`,
                      }))}
                      onChange={(opt) => {
                        setloginfor(opt.value);
                      }}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>User Id</label>
                    <input
                      type="text"
                      placeholder="Enter the email , number"
                      value={userid}
                      name="userid"
                      onChange={(e) => setuserid(e.target.value)}
                    />
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {useriderror}
                    </p>
                  </div>
                </>
              )}

              {loginas === "Employee" && (
                <>
                  <div className={styles.inputdiv10}>
                    <label>Please Select Coaching Institute</label>
                    <Select1
                      required
                      styles={customStyles}
                      options={client?.map((item) => ({
                        label: `${item?.institutename} ${item?.ClientCode}`,
                        value: `${item?.institutename} ${item?.ClientCode}`,
                      }))}
                      onChange={(opt) => setloginfor(opt.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Employee Id</label>
                    <input
                      type="text"
                      placeholder="Enter the employee id"
                      value={userid}
                      name="userid"
                      onChange={(e) => setuserid(e.target.value)}
                    />
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {useriderror}
                    </p>
                  </div>
                </>
              )}

              {loginas === "Student" && (
                <>
                  <div className={styles.inputdiv10}>
                    <label>Please Select</label>
                    <Select1
                      required
                      styles={customStyles}
                      options={client?.map((item) => ({
                        label: `${item?.institutename} ${item?.ClientCode}`,
                        value: `${item?.institutename} ${item?.ClientCode}`,
                      }))}
                      onChange={(opt) => setloginfor(opt.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>SR Number</label>
                    <input
                      type="text"
                      placeholder="Enter The SNO"
                      value={userid}
                      name="userid"
                      onChange={(e) => setuserid(e.target.value)}
                    />
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {useriderror}
                    </p>
                  </div>
                </>
              )}

              {loginas === "Parent" && (
                <>
                  <div className={styles.inputdiv10}>
                    <label>Please Select Coaching Institute</label>
                    <Select1
                      required
                      styles={customStyles}
                      options={client?.map((item) => ({
                        label: `${item?.institutename} ${item?.ClientCode}`,
                        value: `${item?.institutename} ${item?.ClientCode}`,
                      }))}
                      onChange={(opt) => setloginfor(opt.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter the Phone Number"
                      value={userid}
                      name="userid"
                      onChange={(e) => setuserid(e.target.value)}
                    />
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {useriderror}
                    </p>
                  </div>
                </>
              )}

              {loginas === "Others" && (
                <>
                  <div className={styles.inputdiv}>
                    <label>User Id</label>
                    <input
                      type="text"
                      placeholder="Enter the user id"
                      value={userid}
                      name="userid"
                      onChange={(e) => setuserid(e.target.value)}
                    />
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {useriderror}
                    </p>
                  </div>
                </>
              )}

              <div className={styles.inputdiv}>
                <label>Password</label>
                <input
                  type={showonldpassword ? "text" : "password"}
                  placeholder="Enter the password"
                  value={password}
                  name="password"
                  onChange={(e) => setpassword(e.target.value)}
                />

                <li
                  className={styles.showpassbtn}
                  onClick={() => setshowonldpassword(!showonldpassword)}
                >
                  {showonldpassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </li>
              </div>
              <div className={styles.inputdiv}>
                <p style={{ color: "red", marginTop: "0px" }}>
                  {passworderror}
                </p>
              </div>

              <div className={styles.forgottextdiv}>
                <h2
                  onClick={() => {
                    setopenforget(true);
                    setOpen(false);
                    setOpen1(false);
                  }}
                >
                  Forget Password ?
                </h2>
              </div>

              <div className={styles.logbtnstylediv}>
                <button className={styles.logbtnstyle}>
                  {" "}
                  {loading ? (
                    <CircularProgress size={25} style={{ color: "red" }} />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
            <div className={styles.logbtnstyledivcreate}>
              <button
                onClick={() => {
                  setOpen(false);
                  setOpen1(true);
                }}
              >
                Create a account
              </button>
            </div>
          </>
        )}
      </div>
      {/* {loading && <LoadingSpinner />} */}
    </>
  );
}

export default Login;
