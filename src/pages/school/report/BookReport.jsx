import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBooks } from "../../../redux/actions/liraryAction";
import styles from "../employee/employee.module.css";
import moment from "moment";
import { getcourse } from "@/redux/actions/commanAction";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
function BookReport() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const [courseorclass, setcourseorclass] = useState("");
  const [BookId, setBookId] = useState("");
  const [auther, setauther] = useState("");
  const [isdata, setisData] = useState([]);
  const [userdata, setuserdata] = useState("");
  const [courselist, setcourselist] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { loading, books } = useSelector((state) => state.GetBookslist);
  const { course } = useSelector((state) => state.getcourse);

  const filter = (e) => {
    e.preventDefault();
    dispatch(GetBooks(courseorclass, BookId, auther));
  };
  const reset = () => {
    setcourseorclass("");
    setauther("");
    setBookId("");
    dispatch(GetBooks());
  };
  useEffect(() => {
    if (books) {
      setisData(books);
    }
    if (user) {
      setuserdata(user);
    }
    if (course) {
      setcourselist(course);
    }
  }, [books, user, course]);
  useEffect(() => {
    dispatch(GetBooks());
    dispatch(getcourse());
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const ExportToExcel = (isData) => {
    const fileName = "BookListReport";
    const exportType = "xls";
    var data = [];

    isData.map((item) => {
      data.push({
        Class_Name:item?.courseorclass	,
        Book_Id: item?.BookId,
        Book_Title: item?.BookTitle,
        Auther_Name: item?.auther,
        Add_Date:  moment(item?.admissionDate).format("MM/DD/YYYY"),
        Book_Quantity: item?.Realquantity,
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
              <form onSubmit={filter} className={styles.searchoptiondiv}>
                <select
                  className={styles.opensearchinput}
                  value={courseorclass}
                  name="courseorclass"
                  onChange={(e) => setcourseorclass(e.target.value)}
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
                <input
                  className={styles.opensearchinput}
                  type="text"
                  placeholder="Search by Book Id"
                  value={BookId}
                  name="BookId"
                  onChange={(e) => setBookId(e.target.value)}
                />
                <input
                  className={styles.opensearchinput}
                  type="text"
                  placeholder="Search by Auther"
                  value={auther}
                  name="auther"
                  onChange={(e) => setauther(e.target.value)}
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
                    <th className={styles.tableth}>Class_Name</th>
                    <th className={styles.tableth}>Book_Id</th>
                    <th className={styles.tableth}>Book_Title</th>
                    <th className={styles.tableth}>Auther_Name</th>
                    <th className={styles.tableth}>Add_Date</th>
                    <th className={styles.tableth}>Book_Quantity</th>
                  </tr>

                  {isdata?.length > 0 &&
                    isdata?.map((item, index) => {
                      return (
                        <tr key={index} className={styles.tabletr}>
                          <td className={styles.tabletd}>{index + 1}</td>
                          <td className={styles.tableth}>
                            {item?.courseorclass}
                          </td>
                          <td className={styles.tableth}>{item?.BookId}</td>
                          <td className={styles.tableth}>{item?.BookTitle}</td>
                          <td className={styles.tableth}>{item?.auther}</td>
                          <td className={styles.tableth}>
                            {moment(item?.addDate).format("DD/MM/YYYY")}
                          </td>
                          <th className={styles.tableth}>
                            {item?.Realquantity}
                          </th>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <>
          <LoadingSpinner />
        </>
      )}
    </>
  );
}

export default BookReport;
