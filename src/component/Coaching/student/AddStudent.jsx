import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Addstudent, getstudent } from "../../../redux/actions/commanAction";
import { useRouter } from "next/router";
import { ADD_STUDENT_RESET } from "../../../redux/constants/commanConstants";
const formData = new FormData();
function AddStudent({ setOpen }) {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [amount, setamount] = useState("");
  const [monthlyfee, setmonthlyfee] = useState("");
  const [noofMonth, setnoofMonth] = useState("");
  const [onlyshowmonthfee, setonlyshowmonthfee] = useState("");
  const [onlyshowrefee, setonlyshowrefee] = useState("");
  const [getfee, setgetfee] = useState("default");
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
  const [marksheet, setmarksheet] = useState("");
  const [pano, setpano] = useState("");
  const [adharcardno, setadharcardno] = useState("");
  const [fathersname, setfathersname] = useState("");
  const [fathersphone, setfathersphone] = useState("");
  const [studentrollno, setstudentrollno] = useState("");
  const [preview1, setpreview1] = useState("");
  const [preview2, setpreview2] = useState("");
  const [preview3, setpreview3] = useState("");
  const [shownext, setshownext] = useState(true);
  const [showdownload, setshowdownload] = useState(false);
  const { fee } = useSelector((state) => state.getfee);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);

  const { studentaddstatus, student } = useSelector(
    (state) => state.addstudent
  );

  const submit = () => {
    formData.set("name", studentname);
    formData.set("email", studentemail);
    formData.set("phoneno1", studentphone);
    formData.set("city", city);
    formData.set("state", state);
    formData.set("pincode", Pincode);
    formData.set("profileurl", photo);
    formData.set("adharcard", adharcard);
    formData.set("fathersPhoneNo", fathersphone);
    formData.set("fathersName", fathersname);
    formData.set("courseorclass", courses);
    formData.set("rollnumber", studentrollno);
    formData.set("StudentStatus", "admission");
    formData.set("batch", batchname);
    formData.set("admissionDate", adminssiondate);
    formData.set("regisgrationfee", amount);
    formData.set("courseduration", noofMonth);
    formData.set("markSheet", marksheet);
    formData.set("adharno", adharcardno);
    formData.set("pancardnno", pano);
    formData.set(
      "permonthfee",
      getfee === "default" ? Number(onlyshowmonthfee) : Number(monthlyfee)
    );
    formData.set(
      "studentTotalFee",
      getfee === "default"
        ? Number(onlyshowmonthfee) * Number(noofMonth)
        : Number(monthlyfee) * Number(noofMonth)
    );
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

    dispatch(Addstudent(formData));
  };

  useEffect(() => {
    if (fee) {
      setisData(fee);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (studentaddstatus) {
      setshowdownload(true);
    }
    dispatch({
      type: ADD_STUDENT_RESET,
    });
  }, [fee, batch, studentaddstatus]);

  const gotoreceipt = () => {
    navigation.push({
      pathname: "/coaching/accounts/collectfee",
      query: {
        receiptdata: JSON.stringify(student?.data[0]?.user),
      },
    });
  };
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Student</h1>
        <form>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Student Name</label>
              <input
                required
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
                required
                type="text"
                placeholder="Enter the Phone No"
                value={studentphone}
                name="studentphone"
                onChange={(e) => setstudentphone(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Student Email</label>
              <input
                required
                type="email"
                placeholder="Enter the Student Email"
                value={studentemail}
                name="studentemail"
                onChange={(e) => setstudentemail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Admission Date</label>
              <input
                required
                type="date"
                value={adminssiondate}
                name="adminssiondate"
                onChange={(e) => setadminssiondate(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Fathers Phone No</label>
              <input
                required
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
                required
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
                required
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
                required
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
                required
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
              <label>Password Size Photo (250KB)</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const maxFileSize = 20 * 1024; // 5 MB in bytes
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
                  const maxFileSize = 20 * 1024 * 1024; // 5 MB in bytes

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
            <div className={styles.inputdiv}>
              <label>10th or 12th MarkSheet</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const maxFileSize = 20 * 1024 * 1024; // 5 MB in bytes

                  if (file && file.size > maxFileSize) {
                    alert("File size exceeds the limit of 5 MB.");
                    e.target.value = ""; // Clear the file input
                    setmarksheet(e.target.files[0]);

                    return;
                  } else {
                    setmarksheet(file);
                    setpreview3(URL.createObjectURL(file));

                    console.log("marksheet", file);
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Pan No</label>
              <input
                required
                type="text"
                placeholder="Enter the Pan No"
                value={pano}
                name="pano"
                onChange={(e) => setpano(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Adhar Card No</label>
              <input
                required
                type="text"
                placeholder="Enter the Adhar Card No"
                value={adharcardno}
                name="adharcardno"
                onChange={(e) => setadharcardno(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Sr Number</label>
              <input
                required
                type="text"
                placeholder="Enter the Roll Number"
                value={studentrollno}
                name="studentrollno"
                onChange={(e) => setstudentrollno(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Batch</label>
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
                      key={index}
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
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.coursename}
                      onClick={() => {
                        setamount(item?.Registractionfee);
                        setmonthlyfee(item?.feepermonth);
                        setnoofMonth(item?.courseduration);
                        setonlyshowmonthfee(item?.feepermonth);
                        setonlyshowrefee(item?.Registractionfee);
                      }}
                    >
                      {item?.coursename}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Course Duration</label>
              <input
                required
                disabled={true}
                type="text"
                placeholder="Duration"
                value={noofMonth}
              />
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

          {preview3 && (
            <>
              <div className={styles.inputdivimg10}>
                <label>Marsheet</label>
                <img
                  className="keydetailsdivlogoimg10"
                  src={preview3}
                  alt="imgdd"
                />
              </div>
            </>
          )}
        </form>

        {showdownload ? (
          <>
            <div className={styles.mainbtnndivcancel}>
              <button
                onClick={() => setOpen(false)}
                className={styles.cancelbtn}
              >
                Okay!
              </button>

              <button
                className={styles.cancelbtn}
                onClick={() => gotoreceipt()}
              >
                Pay to Fee
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.mainbtnndivcancel}>
              <button
                onClick={() => setshownext(true)}
                className={styles.cancelbtn}
              >
                Back
              </button>

              <button className={styles.cancelbtn} onClick={() => submit()}>
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AddStudent;
