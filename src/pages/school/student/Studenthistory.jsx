import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import {
  getcourse,
  getbatch,
  getstudent,
  getfee,
  getcategory,
  GetSession,
  GetSection,
  getcurrentsession,
} from "../../../redux/actions/commanAction";
import {
  GetHostel,
  GetFacility,
  GetCategory,
} from "../../../redux/actions/hostelActions";
import { GetRoute } from "../../../redux/actions/transportActions";
import styles from "../../coaching/employee/employee.module.css";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];
function Studenthistory() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const [seno, setseno] = useState("");
  const [gendersearch, setgendersearch] = useState("");
  const [scoursename, setscoursename] = useState("");
  const [sfathers, setsfathers] = useState("");
  const [sstudent, setsstudent] = useState("");
  const [sbatch, setsbatch] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [batchs, setbatchs] = useState([]);
  const [isdata, setisData] = useState([]);
  const [courselist, setcourselist] = useState([]);
  const [status, setstatus] = useState("");
  const [rollnumber, setrollnumber] = useState("");
  const [categoryname, setcategoryname] = useState("");
  const [categorylist, setcategorylist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [sessionname, setsessionname] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { loading, student } = useSelector((state) => state.getstudent);
  const { batch } = useSelector((state) => state.getbatch);
  const { course } = useSelector((state) => state.getcourse);
  const { category } = useSelector((state) => state.getcategory);
  const { sections } = useSelector((state) => state.GetSection);
  const { Sessions } = useSelector((state) => state.GetSession);
  const { CURRENTSESSION } = useSelector((state) => state.GetCurrentSession);
  useEffect(() => {
    if (student) {
      setisData(student);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (user) {
      setuserdata(user);
    }
    if (course) {
      setcourselist(course);
    }
    if (category) {
      setcategorylist(category);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
    if (sections) {
      setsectionList(sections);
    }
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
  }, [
    student,
    batch,
    user,
    course,
    category,
    Sessions,
    sections,
    CURRENTSESSION,
  ]);

  useEffect(() => {
    dispatch(getstudent());
  }, []);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getbatch());
    dispatch(getcourse());
    dispatch(getfee());
    dispatch(getcategory());
    dispatch(GetCategory());
    dispatch(GetHostel());
    dispatch(GetFacility());
    dispatch(GetRoute());
    dispatch(GetSection());
    dispatch(GetSession());
    dispatch(getcurrentsession());
  }, []);

  const filterdata = (e) => {
    e.preventDefault();
    dispatch(
      getstudent(
        fromdate,
        todate,
        scoursename,
        sbatch,
        sstudent,
        sfathers,
        rollnumber,
        status,
        categoryname,
        "",
        sessionname,
        sectionname,
        seno,
        "",
        gendersearch
      )
    );
  };

  const reset = () => {
    setrollnumber("");
    setsstudent("");
    setsfathers("");
    setfromdate("");
    settodate("");
    setscoursename("");
    setsbatch("");
    setcategoryname("");
    setseno('');
    setsessionname(CURRENTSESSION);
    setsectionname("");
    setgendersearch("");
    dispatch(getstudent());
  };

  const ExportToExcel = (isData) => {
    const fileName = "StudentList";
    const exportType = "xls";
    var data = [];

    isData.map((item, index) => {
      data.push({
        Addmission_Date: moment(item?.admissionDate).format("MM/DD/YYYY"),
        Session: item?.Session,
        Section: item?.Section,
        "Roll Number": item?.rollnumber,
        SRNO: item?.SrNumber,
        Student_Name: item?.name,
        Gender: item?.Gender,
        Student_Email: item?.email,
        "Student_Mobile NO": item?.phoneno1,
        "Father's_Name": item?.fathersName,
        "Father's_Mobile NO": item?.fathersPhoneNo,
        Class: item?.courseorclass,
        Category: item?.StudentCategory,
        Status: item?.Status,
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <form onSubmit={filterdata} className={styles.searchoptiondiv}>
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
                  value={sessionname}
                  name="sessionname"
                  onChange={(e) => setsessionname(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    Select Session
                  </option>

                  {sessionList?.length > 0 &&
                    sessionList?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.Session}
                        >
                          {item?.Session}
                        </option>
                      );
                    })}
                </select>
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
                    ALL Class
                  </option>

                  {courselist?.map((item, index) => {
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
                  value={sectionname}
                  name="sectionname"
                  onChange={(e) => setsectionname(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={"NONE"}
                  >
                    NONE
                  </option>

                  {sectionList?.length > 0 &&
                    sectionList?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.section}
                        >
                          {item?.section}
                        </option>
                      );
                    })}
                </select>
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
                  value={status}
                  name="status"
                  onChange={(e) => setstatus(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    ALL Status
                  </option>

                  {studentStatus?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.value}
                      >
                        {item?.value}
                      </option>
                    );
                  })}
                </select>
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
                  value={categoryname}
                  name="categoryname"
                  onChange={(e) => setcategoryname(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    Category
                  </option>

                  {categorylist?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.category}
                      >
                        {item?.category}
                      </option>
                    );
                  })}
                </select>
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
                  value={gendersearch}
                  name="gendersearch"
                  onChange={(e) => setgendersearch(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    All Gender
                  </option>
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={"Male"}
                  >
                    Male
                  </option>
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={"Female"}
                  >
                    Female
                  </option>
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={"Other"}
                  >
                    Other
                  </option>
                </select>
                <input
                  className={styles.opensearchinput10}
                  type="text"
                  placeholder="Student's name"
                  value={sstudent}
                  name="sstudent}"
                  onChange={(e) => setsstudent(e.target.value)}
                />

                <input
                  className={styles.opensearchinput10}
                  type="text"
                  placeholder="Sr Number"
                  value={seno}
                  name="seno"
                  onChange={(e) => setseno(e.target.value)}
                />

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
                    <th className={styles.tableth}>Session</th>
                    <th className={styles.tableth}>SRNO</th>
                    <th className={styles.tableth}>Roll_No</th>
                    <th className={styles.tableth}>Section</th>
                    <th className={styles.tableth}>Class</th>
                    <th className={styles.tableth}>Student_Name</th>
                    <th className={styles.tableth}>Gender</th>
                    <th className={styles.tableth}>Father&apos;s_Name</th>
                    <th className={styles.tableth}>Student_Phone</th>
                    <th className={styles.tableth}>Adminssion_Date</th>

                    <th className={styles.tableth}>Category</th>
                    <th className={styles.tableth}>Student_Status</th>
                  </tr>
                  {isdata?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>{item?.Session}</td>
                        <td className={styles.tabletd}>{item?.SrNumber}</td>
                        <td className={styles.tabletd}>{item?.rollnumber}</td>
                        <td className={styles.tabletd}>{item?.Section}</td>
                        <td className={styles.tabletd}>
                          {item?.courseorclass}
                        </td>
                        <td className={styles.tabletd}>{item?.name}</td>
                        <td className={styles.tabletd}>{item?.Gender}</td>
                        <td className={styles.tabletd}>{item?.fathersName}</td>
                        <td className={styles.tabletd}>{item?.phoneno1}</td>
                        <td className={styles.tabletd}>
                          {moment(item?.admissionDate).format("DD/MM/YYYY")}
                        </td>

                        <td className={styles.tabletd}>
                          {item?.StudentCategory}
                        </td>
                        <td className={styles.tabletd}>{item?.Status}</td>
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

export default Studenthistory;
