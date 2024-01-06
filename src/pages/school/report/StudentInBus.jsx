import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { getcurrentsession, GetSession } from "../../../redux/actions/commanAction";
import { GetVehiclelist } from "../../../redux/actions/transportActions";
import styles from "../employee/employee.module.css";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
function StudentInBus() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  let date = new Date();
  let fullyear = date.getFullYear();
  let lastyear = date.getFullYear() - 1;
  const [sessionname, setsessionname] = useState(`${lastyear}-${fullyear}`);
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [studentlist, setstudentlist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [sectionname, setsectionname] = useState("NONE");
  const [BusNumber, setBusNumber] = useState("");
  const [buslist, setbuslist] = useState([]);
  const { Sessions } = useSelector((state) => state.GetSession);
  const { Vehicle } = useSelector((state) => state.GetVehicle);
  const { CURRENTSESSION } = useSelector((state) => state.GetCurrentSession);
  console.log("bus list is", buslist);

  useEffect(() => {
    if (Sessions) {
      setsessionList(Sessions);
    }
    if (Vehicle) {
      setbuslist(Vehicle);
    }
    if(CURRENTSESSION)
    {
      setsessionname(CURRENTSESSION)
    }
  }, [Sessions, Vehicle,CURRENTSESSION]);

  useEffect(() => {
    dispatch(GetVehiclelist());
    dispatch(loadUser());
     dispatch(getcurrentsession());
    dispatch(GetSession());
  }, []);

  const filter = () => {
    setloading(true);
    serverInstance("transport/GetVehicleStudent", "post", {
      busno: BusNumber,
      sessionname: sessionname,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setloading(false);
        setstudentlist(res?.data);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setloading(false);
      }
    });
  };
  const reset = () => {
   
    setsessionname();
    setsectionname("");
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const ExportToExcel = (isData) => {
    const fileName = "StudentInBusReport";
    const exportType = "xls";
    var data = [];

    isData.map((item) => {
      data.push({
        SNO: item?.SrNumber,
        "Roll No": item?.rollnumber,
        "Student Name": item?.name,
        "Student Phone": item?.phoneno1,
        "From Route": item?.FromRoute,
        "To Route": item?.ToRoute,
        "Bus Number": item?.BusNumber,
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
                value={BusNumber}
                name="BusNumber"
                onChange={(e) => setBusNumber(e.target.value)}
                displayEmpty
              >
                <option
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Select Bus
                </option>

                {buslist?.length > 0 &&
                  buslist?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.bus?.BusNumber}
                      >
                        {item?.bus?.BusNumber}
                      </option>
                    );
                  })}
              </select>

              <button
                className={styles.saveattendacebutton}
                onClick={() => {
                  filter();
                }}
                disabled={loading ? true : false}
              >
                {loading ? (
                  <CircularProgress size={17} style={{ color: "red" }} />
                ) : (
                  "Search"
                )}
              </button>

              {/* <button
                className={styles.resetattendacebutton}
                onClick={() => reset()}
              >
                Reset
              </button> */}
            </div>
            <div className={styles.imgdivformat}>
              <img
                onClick={() => handlePrint()}
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />

              <img
                onClick={() => ExportToExcel(studentlist)}
                src="/images/ExportExcel.png"
                alt="img"
              />
            </div>
          </div>

          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer} ref={componentRef}>
              {/* <p>Student List</p> */}
              <table className={styles.tabletable} ref={componentRef}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Sr.No</th>
                    <th className={styles.tableth}>SNO</th>
                    <th className={styles.tableth}>Roll_No</th>
                    <th className={styles.tableth}>Student_Name</th>

                    <th className={styles.tableth}>Student_Phone</th>

                    <th className={styles.tableth}>Class</th>
                    <th className={styles.tableth}>From_Route</th>
                    <th className={styles.tableth}>To_Route</th>
                    <th className={styles.tableth}>Bus_Number</th>
                  </tr>
                  {studentlist?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tabletd}>{index + 1}</td>
                        <td className={styles.tabletd}>{item?.SrNumber}</td>
                        <td className={styles.tabletd}>{item?.rollnumber}</td>
                        <td className={styles.tabletd}>{item?.name}</td>

                        <td className={styles.tabletd}>{item?.phoneno1}</td>

                        <td className={styles.tabletd}>
                          {item?.courseorclass}
                        </td>

                        <td className={styles.tabletd}>
                          {item?.FromRoute ? item?.FromRoute : "----"}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.ToRoute ? item?.ToRoute : "----"}
                        </td>
                        <td className={styles.tabletd}>
                          {item?.BusNumber ? item?.BusNumber : "----"}
                        </td>
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

export default StudentInBus;
