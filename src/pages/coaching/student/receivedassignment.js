import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getcourse,
  getbatch,
  getfee,
  getTest,
} from "../../../redux/actions/commanAction";
import styles from "../../coaching/employee/employee.module.css";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import exportFromJSON from "export-from-json";
function Receivedassignment() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [courselist, setcourselist] = useState("");
  const [scoursename, setscoursename] = useState("");

  const [sbatch, setsbatch] = useState("");
  const [todate, settodate] = useState("");
  const [batchs, setbatchs] = useState([]);

  const [isdata, setisData] = useState([]);
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { batch } = useSelector((state) => state.getbatch);
  const { course } = useSelector((state) => state.getcourse);

  useEffect(() => {
    if (batch) {
      setbatchs(batch);
    }
    if (user) {
      setuserdata(user);
    }
    if (course) {
      setcourselist(course);
    }
  }, [batch, user, course]);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(getfee());
  }, []);

  const getallresult = () => {
    serverInstance("test/GetAllResult", "post", {
      date: todate,
      classname: scoursename,
    }).then((res) => {
      if (res?.status === true) {
        // toast.success(res?.msg, {
        //   autoClose: 1000,
        // });
        setisData(res?.data);
        setloading(false);
      }
      if (res?.status === false) {
        // toast.error(res?.msg, {
        //   autoClose: 1000,
        // });

        setloading(false);
      }
    });
  };

  useEffect(() => {
    getallresult();
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    serverInstance("test/GetAllResult", "post", {
      date: todate,
      classname: scoursename,
    }).then((res) => {
      if (res?.status === true) {
        // toast.success(res?.msg, {
        //   autoClose: 1000,
        // });
        setisData(res?.data);
        setloading(false);
      }
      if (res?.status === false) {
        // toast.error(res?.msg, {
        //   autoClose: 1000,
        // });

        setloading(false);
      }
    });
  };

  const reset = () => {
    settodate("");
    setscoursename("");
    setsbatch("");
    getallresult();
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const ExportToExcel = (isData) => {
    const fileName = "RseultReport";
    const exportType = "xls";
    var data = [];

    isData.map((item, index) => {
      data.push({
        Date: moment(item?.EnquiryDate).format("MM/DD/YYYY"),
        Session: item?.studentdel?.Session,
        Section: item?.studentdel?.Section,
        "Sr Number": item?.studentdel?.SrNumber,
        "Student name": item?.studentdel?.name,
        Class: item?.studentdel?.courseorclass,
        "Test Title": item?.data?.testname,
        Date: moment(item?.data?.testdate).format("DD-MM-YYYY"),
        Questions: item?.data?.totalQuestions,
        Pass_if: item?.data?.passmark,
        Marks_per_question: item?.data?.marksperquestion,
        Obtain_marks: item?.data?.obtainmarks,
        Total_marks: item?.data?.Totalmarks,
        Status:
          item?.data?.Totalmarks === item?.data?.obtainmarks ? "Pass" : "Fail",
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };
  return (
    <>
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <form onSubmit={filterdata} className={styles.searchoptiondiv}>
                <label>Test Date</label>
                <input
                  className={styles.opensearchinput}
                  type="date"
                  value={todate}
                  name="todate"
                  onChange={(e) => settodate(e.target.value)}
                />

                <select
                  className={styles.opensearchinput}
                  sx={{
                    width: "18.8rem",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={scoursename}
                  name="scoursename"
                  onChange={(e) => setscoursename(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    All Class
                  </option>
                  {course?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.coursename}
                      >
                        {item?.coursename}
                      </option>
                    );
                  })}
                </select>

                <button>Search</button>
              </form>
              <button onClick={() => reset()}>Reset</button>
            </div>
            <div className={styles.imgdivformat}>
              <img
                onClick={() => handlePrint()}
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />
              {/* <img
                className={styles.imgdivformatimg}
                src="/images/ExportPdf.png"
                alt="img"
              /> */}
              <img
                onClick={() => ExportToExcel(isdata)}
                src="/images/ExportExcel.png"
                alt="img"
              />
            </div>
          </div>

          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable} ref={componentRef}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Sr.No</th>
                    <th className={styles.tableth}>SNO</th>
                    <th className={styles.tableth}>Session</th>
                    <th className={styles.tableth}>Section</th>
                    <th className={styles.tableth}>StudentName</th>
                    <th className={styles.tableth}>Class</th>
                    <th className={styles.tableth}>Test_Title</th>
                    <th className={styles.tableth}>Date</th>
                    <th className={styles.tableth}>Questions</th>
                    <th className={styles.tableth}>Pass_if</th>
                    <th className={styles.tableth}>Marks_per_question</th>
                    <th className={styles.tableth}>Obtain_marks</th>
                    <th className={styles.tableth}>Total_marks</th>
                    <th className={styles.tableth}>Status</th>

                    {/* <th className={styles.tableth}>Action</th> */}
                  </tr>
                  {isdata?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>
                          {item?.studentdel?.SrNumber}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.studentdel?.Session}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.studentdel?.Section}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.studentdel?.name}
                        </td>
                        <td className={styles.tabletd}>{item?.data?.course}</td>
                        <td className={styles.tabletd}>
                          {item?.data?.testname}
                        </td>
                        <td className={styles.tabletd}>
                          {moment(item?.testdate).format("DD/MM/YYYY")}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.data?.totalQuestions}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.data?.passmark}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.data?.marksperquestion}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.data?.obtainmarks}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.data?.Totalmarks}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.data?.passmark === item?.data?.obtainmarks
                            ? "Pass"
                            : "Fail"}
                        </td>

                        {/* <td className={styles.tabkeddd}>
                          <button
                            disabled={
                              userdata?.data &&
                              userdata?.data?.User?.userType === "school"
                                ? false
                                : userdata?.data &&
                                  userdata?.data?.User?.fronroficeDelete ===
                                    true
                                ? false
                                : true
                            }
                          >
                            <img
                              className={
                                userdata?.data &&
                                userdata?.data?.User?.userType === "school"
                                  ? styles.tabkedddimgactive
                                  : userdata?.data &&
                                    userdata?.data?.User?.fronroficeDelete ===
                                      true
                                  ? styles.tabkedddimgactive
                                  : styles.tabkedddimgdisable
                              }
                              onClick={() => ClickOpendelete(item?.id)}
                              src="/images/Delete.png"
                              alt="imgss"
                            />
                          </button>
                          <button
                            disabled={
                              userdata?.data &&
                              userdata?.data?.User?.userType === "school"
                                ? false
                                : userdata?.data &&
                                  userdata?.data?.User?.fronroficeEdit === true
                                ? false
                                : true
                            }
                          >
                            <img
                              className={
                                userdata?.data &&
                                userdata?.data?.User?.userType === "school"
                                  ? styles.tabkedddimgactive
                                  : userdata?.data &&
                                    userdata?.data?.User?.fronroficeEdit ===
                                      true
                                  ? styles.tabkedddimgactive
                                  : styles.tabkedddimgdisable
                              }
                              onClick={() => ClickOpenupdate(item)}
                              src="/images/Edit.png"
                              alt="imgss"
                            />
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Receivedassignment;
