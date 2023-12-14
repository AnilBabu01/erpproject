import React, { useState, useEffect } from "react";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Adddresult } from "../../redux/actions/commanAction";
import { useRouter } from "next/router";
import { serverInstance } from "../../API/ServerInstance";
import { backendUrl } from "../../config/config";
const formData = new FormData();

function McsQuestions({ setOpen, data }) {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const { course } = useSelector((state) => state.getcourse);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);

  console.log("data of ,mcq    sss s  s  s s   s s   s s", data);

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
      answeroption: "",
      currectanswer: "",
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
        answeroption: "",
        currectanswer: "",
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

  const submit = () => {
    const savedata = {
      batch: data?.batch,
      course: data?.course,
      date: data?.testdate,
      testtype: data?.testtype,
      starttime: data?.teststarTime,
      endtime: data?.testendTime,
      testtitle: data?.testname,
      questions: questionItems,
      testfile: data?.testfile,
      marksperquestion: data?.marksperquestion,
      passmark: data?.passmark,
      testId: data?.id,
      testFileUrl: data?.testFileUrl,
    };

    serverInstance("test/addtestretult", "POST", savedata).then((res) => {
      if (res?.status === true) {
        console.log("data from mcq list ", res);
        navigate.push({
          pathname: "/student/ResultShow",
          query: {
            result: JSON.stringify(res?.data?.Result),
          },
        });
      }
    });
  };
  useEffect(() => {
    if (course) {
      setisData(course);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (data) {
      setquestionItems(data?.questions);
    }
  }, [course, batch, data]);
  return (
    <>
      <div className={styles.McsQuestionss}>
        {data?.testtype === "Add MCQ" ? (
          ""
        ) : (
          <>
            {data?.testFileUrl?.split(".")[1] === "pdf" ? (
              <>
                <div className={styles.inputdivimg60}>
                  <label>Test Paper</label>
                  <iframe
                    src={`${backendUrl}public/upload/${data?.testFileUrl}`}
                    title="PDF Viewer"
                    width="100%"
                    height="500"
                    frameBorder="0"
                  >
                    This browser does not support PDFs. Please download the PDF
                    to view it.
                  </iframe>
                </div>
              </>
            ) : (
              <>
                <div className={styles.inputdivimg60}>
                  <label>Test Paper</label>
                  <img
                    className="keydetailsdivlogoimg10"
                    src={`${backendUrl}public/upload/${data?.testFileUrl}`}
                    alt="imgdd"
                  />
                </div>
              </>
            )}
          </>
        )}

        {questionItems &&
          questionItems?.map((item, index) => {
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
                  </div>

                  <div className={styles.optiondiv}>
                    <div className={styles.radiodiv}>
                      <input
                        type="radio"
                        // name="same"
                        id="option1"
                        value="option1"
                        checked={item?.answeroption === item?.option1}
                        onChange={(e) => {
                          handleQuestionItemUpdate(
                            item,
                            "answeroption",
                            item?.option1
                          );
                          // if (item?.correctoption === item?.option1) {
                          //   handleQuestionItemUpdate(
                          //     item,
                          //     "currectanswer",
                          //     true
                          //   );
                          // } else {
                          //   handleQuestionItemUpdate(
                          //     item,
                          //     "currectanswer",
                          //     false
                          //   );
                          // }
                        }}
                      />
                      <label htmlFor="option1">A</label>
                    </div>
                    <div className={styles.radiodiv}>
                      <input
                        type="radio"
                        // name="same"
                        id="option2"
                        value="option2"
                        checked={item?.answeroption === item?.option2}
                        onChange={(e) => {
                          handleQuestionItemUpdate(
                            item,
                            "answeroption",
                            item?.option2
                          );
                          // if (item?.correctoption === item?.option2) {
                          //   handleQuestionItemUpdate(
                          //     item,
                          //     "currectanswer",
                          //     true
                          //   );
                          // } else {
                          //   handleQuestionItemUpdate(
                          //     item,
                          //     "currectanswer",
                          //     false
                          //   );
                          // }
                        }}
                      />
                      <label htmlFor="option2">B</label>
                    </div>
                    <div className={styles.radiodiv}>
                      <input
                        type="radio"
                        // name="same"
                        id="option3"
                        value="option3"
                        checked={item?.answeroption === item?.option3}
                        onChange={(e) => {
                          handleQuestionItemUpdate(
                            item,
                            "answeroption",
                            item?.option3
                          );
                          // if (item?.correctoption === item?.option3) {
                          //   handleQuestionItemUpdate(
                          //     item,
                          //     "currectanswer",
                          //     true
                          //   );
                          // } else {
                          //   handleQuestionItemUpdate(
                          //     item,
                          //     "currectanswer",
                          //     false
                          //   );
                          // }
                        }}
                      />
                      <label htmlFor="option3">C</label>
                    </div>
                    <div className={styles.radiodiv}>
                      <input
                        type="radio"
                        // name="same"
                        id="option4"
                        value="option4"
                        checked={item?.answeroption === item?.option4}
                        onChange={(e) => {
                          handleQuestionItemUpdate(
                            item,
                            "answeroption",
                            item?.option4
                          );
                          // if (item?.correctoption === item?.option4) {
                          //   handleQuestionItemUpdate(
                          //     item,
                          //     "currectanswer",
                          //     true
                          //   );
                          // } else {
                          //   handleQuestionItemUpdate(
                          //     item,
                          //     "currectanswer",
                          //     false
                          //   );
                          // }
                        }}
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
            onClick={() => navigate.replace("test")}
          >
            Back
          </button>
          {/* <button
            className={styles.cancelbtn}
            onClick={() => addQuestionItem()}
          >
            Save
          </button> */}
          <button className={styles.cancelbtn} onClick={() => submit()}>
            Submit Test
          </button>
        </div>
      </div>
    </>
  );
}

export default McsQuestions;
