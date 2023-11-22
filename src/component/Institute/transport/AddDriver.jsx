import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Addstudent, getstudent } from "../../../redux/actions/commanAction";
import { useRouter } from "next/router";
import { ADD_STUDENT_RESET } from "../../../redux/constants/commanConstants";
import CircularProgress from "@mui/material/CircularProgress";

const formData = new FormData();
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];
function AddDriver({ setOpen }) {
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
  const [hostal, sethostal] = useState(false);
  const [transport, settransport] = useState(false);
  const [Library, setLibrary] = useState(false);
  const [studentemail, setstudentemail] = useState("");
  const [studentphone, setstudentphone] = useState("");
  const [adminssiondate, setadminssiondate] = useState("");
  const [whatsaapnumber, setwhatsaapnumber] = useState("");
  const [usepreview, setusepreview] = useState(false);
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
  const [birth, setbirth] = useState("");
  const [birthcerpreview, setbirthcerpreview] = useState("");
  const [others, setothers] = useState("");
  const [otherspreview, setotherspreview] = useState("");
  const [othersname, setothersname] = useState("");
  const [status, setstatus] = useState("Active");
  const [marksheetName, setmarksheetName] = useState("");
  const [shownext, setshownext] = useState(true);
  const [categoryname, setcategoryname] = useState("Please Select");
  const [categorylist, setcategorylist] = useState([]);
  const [showdownload, setshowdownload] = useState(false);
  const { fee } = useSelector((state) => state.getfee);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.getcategory);
  const { studentaddstatus, student, loading } = useSelector(
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
    formData.set("StudentStatus", adminssiondate);
    formData.set("batch", batchname);
    formData.set("admissionDate", adminssiondate);
    formData.set("regisgrationfee", amount);
    formData.set("courseduration", noofMonth);
    formData.set("markSheet", marksheet);
    formData.set("adharno", adharcardno);
    formData.set("pancardnno", pano);
    formData.set("whatsappNo", usepreview ? fathersphone : whatsaapnumber);
    formData.set("markSheetname", marksheetName);
    formData.set("othersdoc", others);
    formData.set("othersdocName", othersname);
    formData.set("BirthDocument", birth);
    formData.set("Transport", transport);
    formData.set("Library", Library);
    formData.set("hostal", hostal);
    formData.set("Status", status);
    formData.set("StudentCategory", categoryname);
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

    dispatch(Addstudent(formData, setOpen));
  };

  useEffect(() => {
    if (fee) {
      setisData(fee);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (studentaddstatus) {
      setOpen(false);
    }
    if (category) {
      setcategorylist(category);
    }
    dispatch({
      type: ADD_STUDENT_RESET,
    });
  }, [fee, batch, studentaddstatus, category]);

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
        <h1>Add Driver</h1>
        <form>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Bus No</label>
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
                value={categoryname}
                name="categoryname"
                onChange={(e) => setcategoryname(e.target.value)}
                // displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"Please Select"}
                >
                  Please Select
                </MenuItem>
                {categorylist?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.category}
                    >
                      {item?.category}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Category</label>
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
                value={categoryname}
                name="categoryname"
                onChange={(e) => setcategoryname(e.target.value)}
                // displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"Please Select"}
                >
                  Please Select
                </MenuItem>
                {categorylist?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.category}
                    >
                      {item?.category}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Driver Name</label>
              <input
                required
                type="email"
                placeholder="Enter Driver Name"
                value={studentemail}
                name="studentemail"
                onChange={(e) => setstudentemail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Fathers Name</label>
              <input
                required
                type="text"
                placeholder="Enter Father's Name"
                value={fathersname}
                name="fathersname"
                onChange={(e) => setfathersname(e.target.value)}
              />
            </div>

            <div className={styles.inputdiv}>
              <label>Phone No</label>
              <input
                required
                type="text"
                placeholder="Enter Phone No"
                value={fathersphone}
                name="fathersphone"
                onChange={(e) => setfathersphone(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>
                <input
                  className={styles.checkpreview}
                  value={true}
                  onChange={(e) => setusepreview(e.target.checked)}
                  type="checkbox"
                />
                WhatsApp Use Previous
              </label>
              <input
                required
                type="text"
                placeholder="Enter Whatsapp No"
                value={usepreview ? fathersphone : whatsaapnumber}
                name="whatsaapnumber"
                onChange={(e) =>
                  setwhatsaapnumber(usepreview ? fathersphone : e.target.value)
                }
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>State</label>
              <input
                required
                type="text"
                placeholder="Enter State"
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
                placeholder="Enter City"
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
                placeholder="Enter Pincode"
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
                  const maxFileSize = 20 * 1024 * 1024; // 5 MB in bytes
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
              <label>Previous Year MarkSheet</label>
              <span className={styles.documentnameDiv}>
                <input
                  className={styles.hlfsize}
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
                <input
                  className={styles.hlfsize}
                  required
                  type="text"
                  placeholder="Doc Name"
                  value={marksheetName}
                  name="marksheetName"
                  onChange={(e) => setmarksheetName(e.target.value)}
                />
              </span>
            </div>
          </div>

          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Pan Card</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const maxFileSize = 20 * 1024 * 1024; // 5 MB in bytes
                  console.log("file size", file.size, maxFileSize);
                  if (file && file.size > maxFileSize) {
                    alert("File size exceeds the limit of 5 MB.");
                    e.target.value = ""; // Clear the file input

                    setbirth(e.target.files[0]);

                    return;
                  } else {
                    setbirth(file);
                    setbirthcerpreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>

            <div className={styles.inputdiv}>
              <label>Driving Licence</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const maxFileSize = 20 * 1024 * 1024; // 5 MB in bytes
                  console.log("file size", file.size, maxFileSize);
                  if (file && file.size > maxFileSize) {
                    alert("File size exceeds the limit of 5 MB.");
                    e.target.value = ""; // Clear the file input

                    setbirth(e.target.files[0]);

                    return;
                  } else {
                    setbirth(file);
                    setbirthcerpreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Student Status</label>
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
                value={status}
                name="status"
                onChange={(e) => setstatus(e.target.value)}
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
                {studentStatus?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.value}
                    >
                      {item?.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Pan No</label>
              <input
                required
                type="text"
                placeholder="Enter Pan No"
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
                placeholder="Enter Adhar Card No"
                value={adharcardno}
                name="adharcardno"
                onChange={(e) => setadharcardno(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Comment</label>
              <input
                required
                type="text"
                placeholder="Enter Comment"
                value={studentrollno}
                name="studentrollno"
                onChange={(e) => setstudentrollno(e.target.value)}
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
          {birthcerpreview && (
            <>
              <div className={styles.inputdivimg10}>
                <label>Pan No</label>
                <img
                  className="keydetailsdivlogoimg10"
                  src={birthcerpreview}
                  alt="imgdd"
                />
              </div>
            </>
          )}
          {otherspreview && (
            <>
              <div className={styles.inputdivimg10}>
                <label>Others</label>
                <img
                  className="keydetailsdivlogoimg10"
                  src={otherspreview}
                  alt="imgdd"
                />
              </div>
            </>
          )}
        </form>

        <div className={styles.mainbtnndivcancel}>
          <button
            onClick={() => setshownext(true)}
            className={styles.cancelbtn}
          >
            Back
          </button>

          <button
            disabled={loading ? true : false}
            className={styles.cancelbtn}
            onClick={() => submit()}
          >
            {loading ? (
              <CircularProgress size={25} style={{ color: "red" }} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddDriver;
