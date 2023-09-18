import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Addstudent } from "../../../redux/actions/commanAction";
import PdfViev from './PdfViev'

const testtype = [
  { id: 1, name: "Upload Pdf Test" },
  { id: 2, name: "Add MCQ" },
];
const formData = new FormData();
function AddTest({ setOpen }) {
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [courses, setcourses] = useState("");
  const [batchname, setbatchname] = useState("");
  const [testtypename, settesttypename] = useState("Upload Pdf Test");
  const [starttime, setstarttime] = useState("01:00");
  const [endtime, setendtime] = useState("01:00");
  const [startmedian, setstartmedian] = useState("AM");
  const [endmedian, setendmedian] = useState("AM");
  const [next, setnext] = useState(false);
  const [typefileuploaded, settypefileuploaded] = useState("");
  const [preview2, setpreview2] = useState(null);
  const [previewpdf, setpreviewpdf] = useState(null);
  const [testfile, settestfile] = useState(null);
  const { course } = useSelector((state) => state.getcourse);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const submit = (e) => {
    e.preventDefault();

    dispatch(Addstudent(formData, setOpen));
  };
  -useEffect(() => {
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
        <h1>Add Test</h1>
        <form onSubmit={submit}>
          {next ? (
            <>
              {testtypename === "Upload Pdf Test" ? (
                <>
                  <div className={styles.inputdiv}>
                    <label>Upload Test File</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        settypefileuploaded(file?.name?.split(".")[1]);
                        // if (file?.name?.split(".")[1] === "pdf") {
                        //   let reader = FileReader();
                        //   reader.readAsDataUrl(file);
                        //   reader.onload = (e) => {
                        //     setpreviewpdf(e.target.result);
                        //   };
                        // }
                        console.log("ddd", file.filePath);
                        const maxFileSize = 2000000 * 1024 * 1024; // 5 MB in bytes

                        if (file && file.size > maxFileSize) {
                          alert("File size exceeds the limit of 5 MB.");

                          e.target.value = ""; // Clear the file input
                          settestfile(e.target.files[0]);
                          setpreviewpdf(e.target.files[0]);

                          return;
                        } else {
                          settestfile(file);
                          setpreviewpdf(file);
                          setpreview2(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </div>
                  {typefileuploaded === "pdf" ? (
                    <>
                      <h2>You have uploaded</h2>
                    <PdfViev/>
                    </>
                  ) : (
                    <>
                      {preview2 && (
                        <>
                          <div className={styles.inputdivimg10}>
                            <label>Preview of test paper</label>
                            <img
                              className="keydetailsdivlogoimg10"
                              src={preview2}
                              alt="imgdd"
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <h1>manual test</h1>
                </>
              )}
            </>
          ) : (
            <>
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
                <div className={styles.inputdiv}>
                  <label>Test Type</label>
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
                    value={testtypename}
                    name="testtypename"
                    onChange={(e) => settesttypename(e.target.value)}
                    displayEmpty
                  >
                    {/* <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Please Select
                </MenuItem> */}
                    {testtype?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
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
              <div className={styles.divmaininput}>
                <div className={styles.selecttimemain}>
                  <label>Starting Time</label>
                  <div className={styles.selectinnear}>
                    <select
                      value={starttime}
                      name="starttime"
                      onChange={(e) => setstarttime(e.target.value)}
                    >
                      <option value="01:00">01:00</option>
                      <option value="02:00">02:00</option>
                      <option value="03:00">03:00</option>
                      <option value="04:00">04:00</option>
                      <option value="05:00">05:00</option>
                      <option value="06:00">06:00</option>
                      <option value="07:00">07:00</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                    </select>
                    <select
                      value={startmedian}
                      name="startmedian"
                      onChange={(e) => setstartmedian(e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                <div className={styles.selecttimemain}>
                  <label>Ending Time</label>
                  <div className={styles.selectinnear}>
                    <select
                      value={endtime}
                      name="endtime"
                      onChange={(e) => setendtime(e.target.value)}
                    >
                      <option value="01:00">01:00</option>
                      <option value="02:00">02:00</option>
                      <option value="03:00">03:00</option>
                      <option value="04:00">04:00</option>
                      <option value="05:00">05:00</option>
                      <option value="06:00">06:00</option>
                      <option value="07:00">07:00</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                    </select>
                    <select
                      value={endmedian}
                      name="endmedian"
                      onChange={(e) => setendmedian(e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                <div className={styles.inputdiv}>
                  <label>Test Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter Text Name"
                    // value={studentrollno}
                    // name="studentrollno"
                    // onChange={(e) => setstudentrollno(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </form>
        {next ? (
          <>
            <div className={styles.mainbtnndivcancel}>
              <button
                onClick={() => setnext(false)}
                className={styles.cancelbtn}
              >
                Back
              </button>
              <button className={styles.cancelbtn} onClick={() => submit()}>
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.mainbtnndivcancel}>
              <button
                onClick={() => setOpen(false)}
                className={styles.cancelbtn}
              >
                Back
              </button>
              <button
                className={styles.cancelbtn}
                onClick={() => setnext(true)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AddTest;
