import React, { useState, useEffect, useRef, useCallback } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Addtest } from "../../../redux/actions/commanAction";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Webcam from "react-webcam";

const testtype = [
  { id: 1, name: "Upload Pdf Test" },
  { id: 2, name: "Add MCQ" },
];

const hours = [
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
];

const minutes = [
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "13", value: "13" },
  { label: "14", value: "14" },
  { label: "15", value: "15" },
  { label: "16", value: "16" },
  { label: "17", value: "17" },
  { label: "18", value: "18" },
  { label: "19", value: "19" },
  { label: "20", value: "20" },
  { label: "21", value: "21" },
  { label: "22", value: "22" },
  { label: "23", value: "23" },
  { label: "24", value: "24" },
  { label: "25", value: "25" },
  { label: "26", value: "26" },
  { label: "27", value: "27" },
  { label: "28", value: "28" },
  { label: "29", value: "29" },
  { label: "30", value: "30" },
  { label: "31", value: "31" },
  { label: "32", value: "32" },
  { label: "33", value: "33" },
  { label: "34", value: "34" },
  { label: "35", value: "35" },
  { label: "36", value: "36" },
  { label: "37", value: "37" },
  { label: "38", value: "38" },
  { label: "39", value: "39" },
  { label: "40", value: "40" },
  { label: "41", value: "41" },
  { label: "42", value: "42" },
  { label: "43", value: "43" },
  { label: "44", value: "44" },
  { label: "45", value: "45" },
  { label: "46", value: "46" },
  { label: "47", value: "47" },
  { label: "48", value: "48" },
  { label: "49", value: "49" },
  { label: "50", value: "50" },
  { label: "51", value: "51" },
  { label: "52", value: "52" },
  { label: "53", value: "53" },
  { label: "54", value: "54" },
  { label: "55", value: "55" },
  { label: "56", value: "56" },
  { label: "57", value: "57" },
  { label: "58", value: "58" },
  { label: "59", value: "59" },
  { label: "60", value: "60" },
  { label: "00", value: "00" },
];

const abpm = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];
const formData = new FormData();
function AddTest({ setOpen }) {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [marks, setmarks] = useState("");
  const [passmarks, setpassmarks] = useState("");
  const [courses, setcourses] = useState("");
  const [batchname, setbatchname] = useState("");
  const [testtypename, settesttypename] = useState("Upload Pdf Test");
  const [next, setnext] = useState(false);
  const [typefileuploaded, settypefileuploaded] = useState("");
  const [testname, settestname] = useState("");
  const [preview2, setpreview2] = useState(null);
  const [previewpdf, setpreviewpdf] = useState(null);
  const [testfile, settestfile] = useState(null);
  const [showloginoption, setshowloginoption] = useState(true);
  const [opencamera, setopencamera] = useState(false);
  const [sh, setsh] = useState("");
  const [sm, setsm] = useState("");
  const [samorpm, setsamorpm] = useState("AM");
  const [eh, seteh] = useState("");
  const [em, setem] = useState("");
  const [eamorpm, seteamorpm] = useState("AM");
  const [capturedImage, setCapturedImage] = useState(null);
  const { course } = useSelector((state) => state.getcourse);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);
  const { loading, test } = useSelector((state) => state.addTest);
  ///2:39:35 PM

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setopencamera(false);
      settestfile(imageSrc);
      setpreview2(imageSrc);
    }
  };

  console.log("start time", `${sh}:${sm}:00 ${samorpm}`);
  console.log("end time", `${eh}:${em}:00 ${eamorpm}`);
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


  const [questionItems1, setquestionItems1] = useState([
    {
      question: "",
      option1: "A",
      option2: "B",
      option3: "C",
      option4: "D",
      correctoption: "",
    },
  ]);

  
  function addQuestionItem1() {
    setquestionItems1([
      ...questionItems1,
      {
        question: "",
        option1: "A",
        option2: "B",
        option3: "C",
        option4: "D",
        correctoption: "",
      },
    ]);
  }

  function removeQuestionItem1(item) {
    setquestionItems1(
      questionItems1.filter((questionItem) => questionItem !== item)
    );
  }

  function handleQuestionItemUpdate1(originalDonationItem, key, value) {
    setquestionItems1(
      questionItems1.map((questionItem) =>
        questionItem === originalDonationItem
          ? {
              ...questionItem,
              [key]: value,
            }
          : questionItem
      )
    );
  }

  console.log("correct answer ", questionItems1);

  const submit = () => {
    formData.set("batch", batchname);
    formData.set("course", courses);
    formData.set("date", testdate);
    formData.set("testtype", testtypename);
    formData.set("starttime", `${sh}:${sm}:00 ${samorpm}`);
    formData.set("endtime", `${eh}:${em}:00 ${eamorpm}`);
    formData.set("testtitle", testname);
    formData.set(
      "questions",
      testtypename === "Upload Pdf Test"
        ? JSON.stringify(questionItems1)
        : JSON.stringify(questionItems)
    );
    formData.set("testfile", testfile);
    formData.set("marksperquestion", marks);
    formData.set("passmark", passmarks);
    dispatch(Addtest(formData, setOpen));
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
        <h1>
          {next ? (
            <>
              {testtypename === "Upload Pdf Test"
                ? "Upload Test As Photo Or Pdf"
                : "MCQ Questions"}
            </>
          ) : (
            "Add Test"
          )}
        </h1>
        <form>
          {next ? (
            <>
              {testtypename === "Upload Pdf Test" ? (
                <>
                  <div className={styles.divmaininput}>
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
                    <div className={styles.inputdiv}>
                      <p>&nbsp;</p>
                      <Button
                        className={
                          opencamera ? styles.btnActive : styles.btndeActive
                        }
                        variant={opencamera ? "contained" : "outlined"}
                        sx={{
                          borderColor: "#C8C8C8",
                          fontSize: 12,
                          minWidth: 80,
                          padding: 0.5,
                          color: opencamera ? "#fff" : "#093959",
                        }}
                        onClick={() => setopencamera(true)}
                      >
                        Open Camera
                      </Button>
                    </div>
                    <div className={styles.inputdiv}>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                    </div>
                  </div>

                  {opencamera && (
                    <>
                      <div>
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          width="100%"
                          height={280}
                        />
                        <div
                          className={styles.btnActivecapture}
                          onClick={capture}
                        >
                          Capture Photo
                        </div>
                      </div>
                    </>
                  )}

                  {typefileuploaded === "pdf" ? (
                    <>
                      <div className={styles.inputdivimg50}>
                        <label>Preview of test paper</label>
                        <object data={preview2} width="100%" height="500" />
                      </div>
                    </>
                  ) : (
                    <>
                      {preview2 && (
                        <>
                          <div className={styles.inputdivimg50}>
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
                  {preview2 && (
                    <>
                      <div>
                        <h1>OMR</h1>
                        {questionItems1?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={styles.topminaquestiondiv}
                            >
                              <div className={styles.QDiv}>
                                <div className={styles.quinnear}>
                                  <p>Question No : {index + 1}</p>
                                </div>
                                <input
                                  type="textarea"
                                  placeholder="Enter Question No"
                                  name="question"
                                  value={item.question}
                                  onChange={(e) =>
                                    handleQuestionItemUpdate1(
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
                                    placeholder="Enter A Answer"
                                    name="option1"
                                    value={item.option1}
                                    onChange={(e) =>
                                      handleQuestionItemUpdate1(
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
                                    placeholder="Enter B Answer"
                                    name="option2"
                                    value={item.option2}
                                    onChange={(e) =>
                                      handleQuestionItemUpdate1(
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
                                  <label>&nbsp;</label>
                                  <input
                                    required
                                    className={styles.mainqinput}
                                    type="text"
                                    placeholder="Enter C Answer"
                                    name="option3"
                                    value={item.option3}
                                    onChange={(e) =>
                                      handleQuestionItemUpdate1(
                                        item,
                                        "option3",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className={styles.inputdiv}>
                                  <label>&nbsp;</label>
                                  <input
                                    required
                                    className={styles.mainqinput}
                                    type="text"
                                    placeholder="Enter D Answer"
                                    name="option4"
                                    value={item.option4}
                                    onChange={(e) =>
                                      handleQuestionItemUpdate1(
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
                                      onClick={() => removeQuestionItem1(item)}
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
                                      name={item.question}
                                      id="option1"
                                      value="option1"
                                      onChange={(e) =>
                                        handleQuestionItemUpdate1(
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
                                      name={item.question}
                                      id="option2"
                                      value="option2"
                                      onChange={(e) =>
                                        handleQuestionItemUpdate1(
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
                                      name={item.question}
                                      id="option3"
                                      value="option3"
                                      onChange={(e) =>
                                        handleQuestionItemUpdate1(
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
                                      name={item.question}
                                      id="option4"
                                      value="option4"
                                      onChange={(e) =>
                                        handleQuestionItemUpdate1(
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

                        <div
                          className={styles.btnActivecapture}
                          onClick={() => addQuestionItem1()}
                        >
                          Add
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* <div className={styles.selectbtn}>
                    <Button
                      className={
                        showloginoption ? styles.btnActive : styles.btndeActive
                      }
                      variant={showloginoption ? "contained" : "outlined"}
                      sx={{
                        borderColor: "#C8C8C8",
                        fontSize: 12,
                        minWidth: 80,
                        padding: 0.5,
                        color: showloginoption ? "#fff" : "#093959",
                      }}
                      onClick={() => setshowloginoption(true)}
                    >
                      Add Test
                    </Button>

                    <Button
                      className={
                        showloginoption ? styles.btndeActive : styles.btnActive
                      }
                      variant={showloginoption ? "outlined" : "contained"}
                      sx={{
                        borderColor: "#C8C8C8",
                        fontSize: 12,
                        minWidth: 80,
                        padding: 0.5,
                        color: showloginoption ? "#093959" : "#fff",
                      }}
                      onClick={() => setshowloginoption(false)}
                    >
                      Upload Image
                    </Button>
                  </div> */}
                  {showloginoption === true && (
                    <>
                      {questionItems?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={styles.topminaquestiondiv}
                          >
                            <div className={styles.QDiv}>
                              <div className={styles.quinnear}>
                                <p>Question No : {index + 1}</p>
                              </div>
                              <input
                                type="textarea"
                                placeholder="Enter Question"
                                name="question"
                                value={item?.question}
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
                                  placeholder="Enter A Answer"
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
                                  placeholder="Enter B Answer"
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
                                  placeholder="Enter C Answer"
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
                                  placeholder="Enter D Answer"
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
                                    name={item.question}
                                    id="option1"
                                    value="option1"
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
                                    name={item.question}
                                    id="option2"
                                    value="option2"
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
                                    name={item.question}
                                    id="option3"
                                    value="option3"
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
                                    name={item.question}
                                    id="option4"
                                    value="option4"
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
              )}
            </>
          ) : (
            <>
              <div className={styles.divmaininput}>
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
                <div className={styles.inputdiv}>
                  <label>Mark Per Question</label>
                  <input
                    required
                    type="number"
                    placeholder="Enter Mark"
                    value={marks}
                    name="marks"
                    onChange={(e) => setmarks(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Pass If Obtain</label>
                  <input
                    required
                    type="number"
                    placeholder="Pass Mark"
                    value={passmarks}
                    name="passmarks"
                    onChange={(e) => setpassmarks(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Class</label>
                  <div></div>
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
                <div className={styles.inputdiv}>
                  <label>&nbsp;</label>
                  <label>&nbsp;</label>
                </div>
              </div>
              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Starting Time</label>
                  <div className={styles.flexaddDiv}>
                    <Select
                      // required
                      className={styles.addwidthtime}
                      sx={{
                        width: "6.2rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={sh}
                      name="sh"
                      onChange={(e) => setsh(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={""}
                      >
                        Hour
                      </MenuItem>
                      {hours?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.value}
                          >
                            {item?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Select
                      // required
                      className={styles.addwidthtime}
                      sx={{
                        width: "6.2rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={sm}
                      name="sm"
                      onChange={(e) => setsm(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={""}
                      >
                        Min
                      </MenuItem>
                      {minutes?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.value}
                          >
                            {item?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Select
                      // required
                      className={styles.addwidthtime}
                      sx={{
                        width: "6.2rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={samorpm}
                      name="samorpm"
                      onChange={(e) => setsamorpm(e.target.value)}
                      displayEmpty
                    >
                      {abpm?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.value}
                          >
                            {item?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                </div>
                <div className={styles.inputdiv}>
                  <label>Ending Time</label>
                  <div className={styles.flexaddDiv}>
                    <Select
                      // required
                      className={styles.addwidthtime}
                      sx={{
                        width: "6.2rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={eh}
                      name="eh"
                      onChange={(e) => seteh(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={""}
                      >
                        Hour
                      </MenuItem>
                      {hours?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.value}
                          >
                            {item?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Select
                      // required
                      className={styles.addwidthtime}
                      sx={{
                        width: "6.2rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={em}
                      name="em"
                      onChange={(e) => setem(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={""}
                      >
                        Min
                      </MenuItem>
                      {minutes?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.value}
                          >
                            {item?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Select
                      // required
                      className={styles.addwidthtime}
                      sx={{
                        width: "6.2rem",
                        fontSize: 14,
                        "& .MuiSelect-select": {
                          paddingTop: "0.6rem",
                          paddingBottom: "0.6em",
                        },
                      }}
                      value={eamorpm}
                      name="eamorpm"
                      onChange={(e) => seteamorpm(e.target.value)}
                      displayEmpty
                    >
                      {abpm?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.value}
                          >
                            {item?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
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
                {loading ? (
                  <CircularProgress size={25} style={{ color: "red" }} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
            -
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
