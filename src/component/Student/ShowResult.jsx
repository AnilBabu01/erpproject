import React, { useState, useEffect } from "react";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Adddresult } from "../../redux/actions/commanAction";
import { useRouter } from "next/router";
import { backendUrl } from "../../config/config";
const formData = new FormData();

function ShowResult({ setOpen, data }) {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
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
  console.log("correct answer show result from com", data);

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
    };

    console.log("save data from show result", savedata);
    dispatch(Adddresult(savedata, setOpen));
  };
  useEffect(() => {
    if (course) {
      setisData(course);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (data) {
      setquestionItems(data?.answerquestions);
    }
  }, [course, batch, data]);
  return (
    <>
      <div className={styles.mainshowresuludetails}>
        {data?.testFileUrl && (
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
        <p>Your Result</p>
        <div className={styles.tablecontainer10}>
          <table className={styles.tabletable}>
            <tbody>
              <tr className={styles.tabletr}>
                <th className={styles.tableth}>Test Title</th>
                <th className={styles.tableth}>Start Time</th>
                <th className={styles.tableth}>End Time</th>
                <th className={styles.tableth}>Total Questions</th>
                <th className={styles.tableth}>Correct Answer</th>
                <th className={styles.tableth}>Wrong Answer</th>
                <th className={styles.tableth}>Obtain Marks</th>
                <th className={styles.tableth}>Status</th>
                {/* <th className={styles.tableth}>Action</th> */}
              </tr>

              <tr className={styles.tabletr}>
                <td className={styles.tabletd}>{data?.testname}</td>
                <td className={styles.tabletd}>{data?.teststarTime}</td>
                <td className={styles.tabletd}>{data?.testendTime}</td>
                <td className={styles.tabletd}>
                  {data?.answerquestions?.length}
                </td>
                <td className={styles.tabletd}>{data?.Totalmarks}</td>
                <td className={styles.tabletd}>{data?.TotalWrongAnswer}</td>
                <td className={styles.tabletd}>{data?.obtainmarks}</td>
                <td className={styles.tabletd}>
                  {Number(data?.obtainmarks) == Number(data?.passmark)
                    ? "Pass"
                    : "Fail"}
                </td>
                {/* <td className={styles.tabletd}>8</td> */}
                {/* <td className={styles.tabletd}>
                    <button
                      className={styles.btnactive}
                      onClick={() => ClickOpenupdate(item)}
                    >
                      Start Test
                    </button>
                  </td> */}
              </tr>
            </tbody>
          </table>
        </div>
        <div>&nbsp;</div>
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
                    <p>Your Selected Answer</p>
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
                    <div className={styles.radiodiv}>
                      {item?.answeroption === item?.correctoption ? (
                        <>
                          <img
                            className={styles.answericon}
                            src="/images/check1.png"
                            alt="Logo"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            className={styles.answericon}
                            src="/images/cancel.png"
                            alt="Logo"
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.deletediv10}>
                    <p>
                      Correct Answer &nbsp; <span>{item?.correctoption}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        <div className={styles.startbtndiv}>
          <button className={styles.cancelbtn} onClick={() => setOpen(false)}>
            Back
          </button>
        </div>
      </div>
    </>
  );
}

export default ShowResult;
