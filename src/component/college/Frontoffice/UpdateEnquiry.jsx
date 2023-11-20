import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import {
  Updateenquiry,
  getenquiries,
} from "../../../redux/actions/coachingAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
function UpdateEnquiry({ updatedata, setOpen }) {
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [studentname, setstudentname] = useState("");
  const [enquirydate, setenquirydate] = useState("");
  const [studentemail, setstudentemail] = useState("");
  const [studentnumber, setstudentnumber] = useState("");
  const [address, setaddress] = useState("");
  const [courses, setcourses] = useState("");
  const [comment, setcomment] = useState("");
  const { course } = useSelector((state) => state.getcourse);
  const { enquiry, loading } = useSelector((state) => state.updatenequiry);
  const submit = (e) => {
    e.preventDefault();
    const data = {
      id: updatedata?.id,
      EnquiryDate: enquirydate,
      StudentName: studentname,
      StudentNumber: studentnumber,
      StudentEmail: studentemail,
      Address: address,
      Course: courses,
      Comment: comment,
    };
    dispatch(Updateenquiry(data, setOpen));
  };
  useEffect(() => {
    if (updatedata) {
      setaddress(updatedata?.Address);
      setstudentemail(updatedata?.StudentEmail);
      setstudentname(updatedata?.StudentName);
      setstudentnumber(updatedata?.StudentNumber);
      setcourses(updatedata?.Course);
      setcomment(updatedata?.Comment);
      setenquirydate(
        new Date(updatedata?.EnquiryDate).toISOString().substring(0, 10)
      );
    }
  }, []);
  useEffect(() => {
    if (course) {
      setisData(course);
    }
  }, [course]);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Enquiry</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Enquiry Date</label>
              <input
                required
                type="date"
                value={enquirydate}
                name="enquirydate"
                onChange={(e) => setenquirydate(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Student Name</label>
              <input
                required
                type="text"
                placeholder="Enter the Student Name"
                value={studentname}
                name="studentname"
                onChange={(e) => setstudentname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Student Number</label>
              <input
                required
                type="text"
                placeholder="Enter the Student Number"
                value={studentnumber}
                name="studentnumber"
                onChange={(e) => setstudentnumber(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
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
            <div className={styles.inputdiv}>
              <label>Address</label>
              <input
                required
                type="text"
                placeholder="Enter the Address"
                value={address}
                name="address"
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Type of Course</label>
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
                    >
                      {item?.coursename}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className={styles.inputdiv}>
            <label>Comment</label>
            <input
              required
              type="text"
              placeholder="Enter the Comment"
              value={comment}
              name="comment"
              onChange={(e) => setcomment(e.target.value)}
            />
          </div>
          <div className={styles.logbtnstylediv}>
            <button
              disabled={loading ? true : false}
              className={styles.logbtnstyle}
            >
              {loading ? (
                <CircularProgress size={25} style={{ color: "red" }} />
              ) : (
                "Update Enquiry"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateEnquiry;
