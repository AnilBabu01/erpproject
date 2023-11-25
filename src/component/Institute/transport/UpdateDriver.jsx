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
function UpdateDriver({ setOpen }) {
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
        <h1>Update Driver To Bus</h1>
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
              <label>Employee</label>
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
              <label>Comment</label>
              <input
                required
                type="email"
                placeholder="Enter Comment"
                value={studentemail}
                name="studentemail"
                onChange={(e) => setstudentemail(e.target.value)}
              />
            </div>
          </div>
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
              "Update"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateDriver;
