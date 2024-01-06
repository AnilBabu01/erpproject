import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { GetHostel, GetCategory } from "../../../redux/actions/hostelActions";
import { GetSession, getcurrentsession, } from "../../../redux/actions/commanAction";
import styles from "../employee/employee.module.css";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
function StudentRoom() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  let date = new Date();
  let fullyear = date.getFullYear();
  let lastyear = date.getFullYear() - 1;
  const [sessionname, setsessionname] = useState(`${lastyear}-${fullyear}`);
  const [sessionlist, setsessionlist] = useState([]);
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [loading, setloading] = useState(false);
  const [categoryname, setcategoryname] = useState("");
  const [hostelname, sethostelname] = useState("");
  const [categorylist, setcategorylist] = useState([]);
  const [hostellist, sethostellist] = useState([]);
  const [checkinlist, setcheckinlist] = useState([]);
  const { roomcategory } = useSelector((state) => state.GetCategory);
  const { hostel } = useSelector((state) => state.GetHostel);
  const { user } = useSelector((state) => state.auth);
  const { Sessions } = useSelector((state) => state.GetSession);
  const { CURRENTSESSION } = useSelector((state) => state.GetCurrentSession);
  useEffect(() => {
    if (roomcategory) {
      setcategorylist(roomcategory);
    }

    if (hostel) {
      sethostellist(hostel);
    }
    if (Sessions) {
      setsessionlist(Sessions);
    }
    if(CURRENTSESSION)
    {
      setsessionname(CURRENTSESSION)
    }
  }, [roomcategory, hostel, Sessions,CURRENTSESSION]);

  const getCheckinlist = () => {
    setloading(true);
    serverInstance("hostel/GetOccupiedRoom", "post", {
      hostelname: hostelname,
      Category: categoryname,
      sessionname: sessionname,
      fromdate: fromdate,
      todate: todate,
    }).then((res) => {
      if (res?.status === true) {
        setcheckinlist(res?.data);
        setloading(false);
      }
    });
  };

  const reset = () => {
    sethostellist("");
    setcategoryname("");
    setsessionname(CURRENTSESSION);
    setfromdate("");
    settodate("");
    serverInstance("hostel/GetOccupiedRoom", "post").then((res) => {
      if (res?.status === true) {
        setcheckinlist(res?.data);
        setloading(false);
      }
    });
  };

  useEffect(() => {
    dispatch(loadUser());
    dispatch(GetHostel());
    dispatch(GetCategory());
    dispatch(GetSession());
    dispatch(getcurrentsession());
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const ExportToExcel = (isData) => {
    const fileName = "AvailableRoomsReport";
    const exportType = "xls";
    var data = [];

    isData.map((item) => {
      data.push({
        "Room No": item?.RoomNo,
        "Hostel Name": item?.hostelname,
        Category: item?.Category,
        Facility: item?.Facility,
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

                {sessionlist?.length > 0 &&
                  sessionlist?.map((item, index) => {
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
                  Select Category
                </option>

                {categorylist?.length > 0 &&
                  categorylist?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.roomCategory}
                      >
                        {item?.roomCategory}
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
                value={hostelname}
                name="hostelname"
                onChange={(e) => sethostelname(e.target.value)}
                displayEmpty
              >
                <option
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Select Hostel
                </option>

                {hostellist?.length > 0 &&
                  hostellist?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.HostelName}
                      >
                        {item?.HostelName}
                      </option>
                    );
                  })}
              </select>
              <label>From Date</label>
              <input
                className={styles.opensearchinput}
                type="date"
                value={fromdate}
                name="fromdate"
                onChange={(e) => setfromdate(e.target.value)}
              />

              <label>To Date</label>
              <input
                className={styles.opensearchinput}
                type="date"
                value={todate}
                name="todate"
                onChange={(e) => settodate(e.target.value)}
              />
              <button
                className={styles.saveattendacebutton}
                onClick={() => {
                  getCheckinlist();
                }}
                disabled={loading ? true : false}
              >
                {loading ? (
                  <CircularProgress size={17} style={{ color: "red" }} />
                ) : (
                  "Search"
                )}
              </button>
              <button
                className={styles.resetattendacebutton}
                onClick={() => reset()}
              >
                Reset
              </button>
            </div>

            <div className={styles.imgdivformat}>
              <img
                onClick={() => handlePrint()}
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />

              <img
                onClick={() => ExportToExcel(checkinlist)}
                src="/images/ExportExcel.png"
                alt="img"
              />
            </div>
          </div>

          <div className={styles.add_divmarginn} ref={componentRef}>
            <div className={styles.tablecontainer}>
              <p>Student In Room List</p>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>SNO</th>
                    <th className={styles.tableth}>Student_Name</th>
                    <th className={styles.tableth}>Mobile_No</th>
                    <th className={styles.tableth}>Class</th>
                    <th className={styles.tableth}>Room_NO</th>
                    <th className={styles.tableth}>Hostel</th>
                    <th className={styles.tableth}>Category</th>
                    <th className={styles.tableth}>Facility</th>
                  </tr>
                  {checkinlist?.length > 0 &&
                    checkinlist?.map((item, index) => {
                      return (
                        <tr key={index} className={styles.tabletr}>
                          <td className={styles.tabletd}>{item?.SNO}</td>
                          <td className={styles.tabletd}>
                            {item?.StudentName}
                          </td>
                          <td className={styles.tabletd}>{item?.MobileNO}</td>
                          <td className={styles.tabletd}>
                            {item?.StudentClass}
                          </td>

                          <td className={styles.tabletd}>{item?.RoomNo}</td>
                          <td className={styles.tabletd}>{item?.hostelname}</td>
                          <td className={styles.tabletd}>{item?.Category}</td>
                          <td className={styles.tabletd}>{item?.Facility}</td>
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

export default StudentRoom;
