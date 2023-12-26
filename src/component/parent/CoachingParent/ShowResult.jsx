import React, { useState, useEffect } from "react";
import styles from "@/styles/register.module.css";

function ShowResult({ setOpen, data }) {
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

  useEffect(() => {
    if (data) {
      setquestionItems(data?.answerquestions);
    }
  }, [data]);
  return (
    <>
      <div className={styles.McsQuestionmaindiv}>
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
                        id="option1"
                        value="option1"
                        checked={item?.answeroption === item?.option1}
                      />
                      <label htmlFor="option1">A</label>
                    </div>
                    <div className={styles.radiodiv}>
                      <input
                        type="radio"
                        id="option2"
                        value="option2"
                        checked={item?.answeroption === item?.option2}
                      />
                      <label htmlFor="option2">B</label>
                    </div>
                    <div className={styles.radiodiv}>
                      <input
                        type="radio"
                        id="option3"
                        value="option3"
                        checked={item?.answeroption === item?.option3}
                        onChange={(e) => {
                          handleQuestionItemUpdate(
                            item,
                            "answeroption",
                            item?.option3
                          );
                        }}
                      />
                      <label htmlFor="option3">C</label>
                    </div>
                    <div className={styles.radiodiv}>
                      <input
                        type="radio"
                        id="option4"
                        value="option4"
                        checked={item?.answeroption === item?.option4}
                        onChange={(e) => {
                          handleQuestionItemUpdate(
                            item,
                            "answeroption",
                            item?.option4
                          );
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
            Ok!!
          </button>
        </div>
      </div>
    </>
  );
}

export default ShowResult;
