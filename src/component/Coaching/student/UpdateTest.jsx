import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Addtest } from "../../../redux/actions/commanAction";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
const testtype = [
  { id: 1, name: "Upload Pdf Test" },
  { id: 2, name: "Add MCQ" },
];
const formData = new FormData();
function UpdateTest({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [courses, setcourses] = useState("");
  const [batchname, setbatchname] = useState("");
  const [testtypename, settesttypename] = useState("Upload Pdf Test");
  const [next, setnext] = useState(false);
  const [typefileuploaded, settypefileuploaded] = useState("");
  const [testname, settestname] = useState("");
  const [preview2, setpreview2] = useState(null);
  const [previewpdf, setpreviewpdf] = useState(null);
  const [testfile, settestfile] = useState(null);
  const { course } = useSelector((state) => state.getcourse);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);
  var today = new Date();
  var date = today.toISOString().substring(0, 10);
  const [testdate, settestdate] = useState(date);

  const [startesttime, setstartesttime] = useState(
    today.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );
  const [endtesttime, setendtesttime] = useState(
    today.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );

  const [questionItems, setquestionItems] = useState([
    {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctoption: "",
    },
  ]);

  function addQuestionItem() {
    setquestionItems([
      ...questionItems,
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctoption: "",
      },
    ]);
  }

  function removeQuestionItem(item) {
    setquestionItems(
      questionItems.filter((questionItem) => questionItem !== item)
    );
  }

  function handleQuestionItemUpdate(originalDonationItem, key, value) {
    setquestionItems(
      questionItems.map((questionItem) =>
        questionItem === originalDonationItem
          ? {
              ...questionItem,
              [key]: value,
            }
          : questionItem
      )
    );
  }
  console.log("correct answer update ", questionItems, updatedata?.questions);

  const submit = () => {
    formData.set("batch", batchname);
    formData.set("course", courses);
    formData.set("date", testdate);
    formData.set("testtype", testtypename);
    formData.set("starttime", startesttime);
    formData.set("endtime", endtesttime);
    formData.set("testtitle", testname);
    formData.set("questions", JSON.stringify(questionItems));
    formData.set("testfile", testfile);
    dispatch(Addtest(formData, setOpen));
  };

  useEffect(() => {
    if (course) {
      setisData(course);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (updatedata) {
      setbatchname(updatedata?.batch);
      setcourses(updatedata?.course);
      settestdate(
        new Date(updatedata?.testdate)?.toISOString().substring(0, 10)
      );
      setquestionItems(updatedata?.questions);
      settesttypename(updatedata?.testtype);
      setendtesttime(updatedata?.testendTime);
      settestname(updatedata?.testname)
      setstartesttime(updatedata?.teststarTime);
      setcourses(updatedata?.course);
    }
  }, [course, batch]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>
          {next ? (
            <>{testtypename === "Upload Test" ? "" : "MCQ Questions"}</>
          ) : (
            "Update Test"
          )}
        </h1>
        <form>
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

                        const maxFileSize = 2000000 * 1024 * 1024; // 5 MB in bytes

                        if (file && file.size > maxFileSize) {
                          alert("File size exceeds the limit of 5 MB.");

                          e.target.value = ""; // Clear the file input
                          settestfile(e.target.files[0]);
                          setpreviewpdf(e.target.files[0]);

                          return;
                        } else {
                          settestfile(file);
                          setpreviewpdf(URL.createObjectURL(file));
                          setpreview2(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </div>
                  {typefileuploaded === "pdf" ? (
                    <>
                      <object
                        data={preview2}
                        width="100%"
                        height="500"
                      ></object>
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
                  {questionItems?.map((item, index) => {
                    return (
                      <div key={index} className={styles.topminaquestiondiv}>
                        <div className={styles.QDiv}>
                          <div className={styles.quinnear}>
                            <p>Question No : {index + 1}</p>
                          </div>
                          <input
                            type="textarea"
                            placeholder="Enter Question"
                            name="question"
                            value={item.question}
                            onChange={(e) =>
                              handleQuestionItemUpdate(
                                item,
                                "question",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className={styles.divmaininput}>
                          <div className={styles.inputdiv}>
                            <label>A</label>
                            <input
                              required
                              className={styles.mainqinput}
                              type="text"
                              placeholder="Enter Option 1"
                              name="option1"
                              value={item.option1}
                              onChange={(e) =>
                                handleQuestionItemUpdate(
                                  item,
                                  "option1",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className={styles.inputdiv}>
                            <label>B</label>
                            <input
                              required
                              className={styles.mainqinput}
                              type="text"
                              placeholder="Enter Option 2"
                              name="option2"
                              value={item.option2}
                              onChange={(e) =>
                                handleQuestionItemUpdate(
                                  item,
                                  "option2",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className={styles.divmaininput}>
                          <div className={styles.inputdiv}>
                            <label>C</label>
                            <input
                              required
                              className={styles.mainqinput}
                              type="text"
                              placeholder="Enter Option 3"
                              name="option3"
                              value={item.option3}
                              onChange={(e) =>
                                handleQuestionItemUpdate(
                                  item,
                                  "option3",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className={styles.inputdiv}>
                            <label>D</label>
                            <input
                              required
                              className={styles.mainqinput}
                              type="text"
                              placeholder="Enter Option 4"
                              name="option4"
                              value={item.option4}
                              onChange={(e) =>
                                handleQuestionItemUpdate(
                                  item,
                                  "option4",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <div className={styles.deletediv}>
                            <p>Select Correct Answer</p>
                            {index > 0 && (
                              <IconButton
                                sx={{
                                  padding: "4px",
                                }}
                                onClick={() => removeQuestionItem(item)}
                              >
                                <RemoveCircleOutlineIcon
                                  color="primary"
                                  fontSize="small"
                                />
                              </IconButton>
                            )}
                          </div>

                          <div className={styles.optiondiv}>
                            <div className={styles.radiodiv}>
                              <input
                                type="radio"
                                // name="same"
                                id="option1"
                                checked={item?.correctoption=== item?.option1}
                                value={item?.option1}
                                onChange={(e) =>
                                  handleQuestionItemUpdate(
                                    item,
                                    "correctoption",
                                    item?.option1
                                  )
                                }
                              />
                              <label htmlFor="option1">A</label>
                            </div>
                            <div className={styles.radiodiv}>
                              <input
                                type="radio"
                                // name="same"
                                id="option2"
                                checked={item?.correctoption=== item?.option2}
                                value={item?.option2}
                                onChange={(e) =>
                                  handleQuestionItemUpdate(
                                    item,
                                    "correctoption",
                                    item?.option2
                                  )
                                }
                              />
                              <label htmlFor="option2">B</label>
                            </div>
                            <div className={styles.radiodiv}>
                              <input
                                type="radio"
                                // name="same"
                                id="option3"
                                checked={item?.correctoption=== item?.option3}
                                onChange={(e) =>
                                  handleQuestionItemUpdate(
                                    item,
                                    "correctoption",
                                    item?.option3
                                  )
                                }
                              />
                              <label htmlFor="option3">C</label>
                            </div>
                            <div className={styles.radiodiv}>
                              <input
                                type="radio"
                                // name="same"
                                id="option4"
                                value={item?.option4}
                                checked={item?.correctoption === item?.option4}
                                onChange={(e) =>
                                  handleQuestionItemUpdate(
                                    item,
                                    "correctoption",
                                    item?.option4
                                  )
                                }
                              />
                              <label htmlFor="option4">D</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    className={styles.cancelbtn}
                    onClick={() => addQuestionItem()}
                  >
                    Add
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <div className={styles.inputdiv}>
                <label>Test Date</label>
                <input
                  required
                  type="date"
                  placeholder="Enter Text Name"
                  value={testdate}
                  name="testdate"
                  onChange={(e) => settestdate(e.target.value)}
                />
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
                <div className={styles.inputdiv}>
                  <label>Starting Time</label>
                  <input
                    className={styles.selectinnearinput}
                    type="time"
                    name="startesttime"
                    value={startesttime}
                    onChange={(e) => setstartesttime(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Ending Time</label>
                  <input
                    type="time"
                    name="endtesttime"
                    value={endtesttime}
                    onChange={(e) => setendtesttime(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Test Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter Text Name"
                    value={testname}
                    name="testname"
                    onChange={(e) => settestname(e.target.value)}
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

export default UpdateTest;
