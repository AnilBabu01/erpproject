import React, { useState, useEffect } from "react";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Addtest } from "../../redux/actions/commanAction";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {useRouter}  from 'next/router'
const formData = new FormData();
function McsQuestions({ setOpen }) {
  const navigate = useRouter()
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [courses, setcourses] = useState("");
  const [batchname, setbatchname] = useState("");
  const [testtypename, settesttypename] = useState("Upload Pdf Test");
  const [next, setnext] = useState(false);
  const [typefileuploaded, settypefileuploaded] = useState("");
  const [testname, settestname] = useState("");
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
  console.log("correct answer ", questionItems);

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
      <div className={styles.McsQuestionss}>
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
                    handleQuestionItemUpdate(item, "question", e.target.value)
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
                      handleQuestionItemUpdate(item, "option1", e.target.value)
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
                      handleQuestionItemUpdate(item, "option2", e.target.value)
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
                      handleQuestionItemUpdate(item, "option3", e.target.value)
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
                      handleQuestionItemUpdate(item, "option4", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <div className={styles.deletediv}>
                  <p>Select Correct Answer</p>
                  {/* {index > 0 && (
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
                  )} */}
                </div>

                <div className={styles.optiondiv}>
                  <div className={styles.radiodiv}>
                    <input
                      type="radio"
                      name="same"
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
                      name="same"
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
                      name="same"
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
                      name="same"
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

        <div className={styles.startbtndiv}>
          <button
            className={styles.cancelbtn}
            onClick={() => navigate.replace('test')}
          >
            Back
          </button>
          <button
            className={styles.cancelbtn}
            onClick={() => addQuestionItem()}
          >
            Save
          </button>
          <button
            className={styles.cancelbtn}
            onClick={() => addQuestionItem()}
          >
            Submit Test
          </button>
        </div>
      </div>
    </>
  );
}

export default McsQuestions;
