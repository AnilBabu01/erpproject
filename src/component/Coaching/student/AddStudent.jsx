import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Addstudent } from "../../../redux/actions/commanAction";
const statusmode = [
  { id: 1, name: "IN Institute" },
  { id: 2, name: "Left Institute" },
  { id: 3, name: "On Leave" },
];
const formData = new FormData();
function AddStudent({ setOpen }) {
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [courses, setcourses] = useState("");
  const [batchname, setbatchname] = useState("");
  const [studentname, setstudentname] = useState("");
  const [studentemail, setstudentemail] = useState("");
  const [studentphone, setstudentphone] = useState("");
  const [adminssiondate, setadminssiondate] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [Pincode, setPincode] = useState("");
  const [photo, setphoto] = useState("");
  const [adharcard, setadharcard] = useState("");
  const [fathersname, setfathersname] = useState("");
  const [fathersphone, setfathersphone] = useState("");
  const [studentrollno, setstudentrollno] = useState("");
  const [studentstatus, setstudentstatus] = useState("IN Institute");
  const [preview1, setpreview1] = useState("");
  const [preview2, setpreview2] = useState("");
  const { course } = useSelector((state) => state.getcourse);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);
  const submit = (e) => {
    e.preventDefault();
    formData.set("name", studentname);
    formData.set("email", studentemail);
    formData.set("phoneno1", studentphone);
    formData.set("city", city);
    formData.set("state", state);
    formData.set("pincode", Pincode);
    formData.set(
      "Studentpassword",
      user?.data[0]?.Studentpassword
        ? user?.data[0]?.Studentpassword
        : "student"
    );
    formData.set(
      "Parentpassword",
      user?.data[0]?.Parentpassword ? user?.data[0]?.Parentpassword : "parent"
    );
    formData.set("profileurl", photo);
    formData.set("adharcard", adharcard);
    formData.set("fathersPhoneNo", fathersphone);
    formData.set("fathersName", fathersname);
    formData.set("courseorclass", courses);
    formData.set("rollnumber", studentrollno);
    formData.set("StudentStatus", "admission");
    formData.set("Status", studentstatus);
    formData.set("batch", batchname);
    formData.set("admissionDate", adminssiondate);
    dispatch(Addstudent(formData, setOpen));
  };

  useEffect(() => {
    if (course) {
      setisData(course);
    }
    if (batch) {
      setbatchs(batch);
    }
  }, [course, batch]);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Student</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Student Roll Number</label>
              <input
                type="text"
                placeholder="Enter the Roll Number"
                value={studentrollno}
                name="studentrollno"
                onChange={(e) => setstudentrollno(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Student Name</label>
              <input
                type="text"
                placeholder="Enter the name"
                value={studentname}
                name="studentname"
                onChange={(e) => setstudentname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Student Phone No</label>
              <input
                type="text"
                placeholder="Enter the Phone No"
                value={studentphone}
                name="studentphone"
                onChange={(e) => setstudentphone(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Student Email</label>
              <input
                type="email"
                placeholder="Enter the Student Email"
                value={studentemail}
                name="studentemail"
                onChange={(e) => setstudentemail(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Password Size Photo (250KB)</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const maxFileSize = 8 * 1024; // 5 MB in bytes
                  console.log("file size", file.size, maxFileSize);
                  if (file && file.size > maxFileSize) {
                    alert("File size exceeds the limit of 5 MB.");
                    e.target.value = ""; // Clear the file input

                    setphoto(e.target.files[0]);

                    return;
                  } else {
                    setphoto(file);
                    setpreview1(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Adhar Card</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const maxFileSize = 1 * 1024 * 1024; // 5 MB in bytes

                  if (file && file.size > maxFileSize) {
                    alert("File size exceeds the limit of 5 MB.");
                    e.target.value = ""; // Clear the file input
                    setadharcard(e.target.files[0]);

                    return;
                  } else {
                    setadharcard(file);
                    setpreview2(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Admission Date</label>
              <input
                type="date"
                value={adminssiondate}
                name="adminssiondate"
                onChange={(e) => setadminssiondate(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Fathers Phone No</label>
              <input
                type="text"
                placeholder="Enter the Phone No"
                value={fathersphone}
                name="fathersphone"
                onChange={(e) => setfathersphone(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Fathers Name</label>
              <input
                type="text"
                placeholder="Enter the Father's Name"
                value={fathersname}
                name="fathersname"
                onChange={(e) => setfathersname(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>State</label>
              <input
                type="text"
                placeholder="Enter the State"
                value={state}
                name="state"
                onChange={(e) => setstate(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>City</label>
              <input
                type="text"
                placeholder="Enter the city"
                value={city}
                name="city"
                onChange={(e) => setcity(e.target.value)}
              />
            </div>

            <div className={styles.inputdiv}>
              <label>Pin Code</label>
              <input
                type="text"
                placeholder="Enter the Pincode"
                value={Pincode}
                name="Pincode"
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Batch</label>
              <Select
                // required
                className={styles.addwidth}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={batchname}
                name="batchname"
                onChange={(e) => setbatchname(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Please Select
                </MenuItem>
                {batchs?.map((item, index) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={`${item?.StartingTime} TO ${item?.EndingTime}`}
                    >
                      {item?.StartingTime} TO {item?.EndingTime}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Course</label>
              <Select
                // required
                className={styles.addwidth}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={courses}
                name="courses"
                onChange={(e) => setcourses(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Please Select
                </MenuItem>
                {isdata?.map((item, index) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.coursename}
                    >
                      {item?.coursename}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            <div className={styles.inputdiv}>
              <label>Status</label>
              <Select
                // required
                className={styles.addwidth}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                disabled={true}
                value={studentstatus}
                name="studentstatus"
                onChange={(e) => setstudentstatus(e.target.value)}
                displayEmpty
              >
                {statusmode?.map((item, index) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.name}
                    >
                      {item?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
          {preview1 && (
            <>
              <div className={styles.inputdivimg}>
                <label>Passport Size Photo</label>
                <img
                  className="keydetailsdivproimg"
                  src={preview1}
                  alt="imgdd"
                />
              </div>
            </>
          )}

          {preview2 && (
            <>
              <div className={styles.inputdivimg10}>
                <label>Adhar Card</label>
                <img
                  className="keydetailsdivlogoimg10"
                  src={preview2}
                  alt="imgdd"
                />
              </div>
            </>
          )}

          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddStudent;
