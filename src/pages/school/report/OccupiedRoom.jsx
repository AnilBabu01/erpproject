import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { GetHostel, GetCategory } from "../../../redux/actions/hostelActions";
import styles from "../employee/employee.module.css";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
function OccupiedRoom() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [categoryname, setcategoryname] = useState("");
  const [hostelname, sethostelname] = useState("");
  const [categorylist, setcategorylist] = useState([]);
  const [hostellist, sethostellist] = useState([]);
  const [checkinlist, setcheckinlist] = useState([]);
  const { roomcategory } = useSelector((state) => state.GetCategory);
  const { hostel } = useSelector((state) => state.GetHostel);

  useEffect(() => {
    if (roomcategory) {
      setcategorylist(roomcategory);
    }

    if (hostel) {
      sethostellist(hostel);
    }
  }, [roomcategory, hostel]);

  const getCheckinlist = () => {
    setloading(true);
    serverInstance("hostel/GetOccupiedRoom", "post", {
      hostelname: hostelname,
      Category: categoryname,
    }).then((res) => {
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
              <p>Occupied Rooms List</p>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Room_NO</th>
                    <th className={styles.tableth}>Hostel</th>
                    <th className={styles.tableth}>Category</th>
                    <th className={styles.tableth}>Facility</th>
                  </tr>
                  {checkinlist?.length > 0 &&
                    checkinlist?.map((item, index) => {
                      return (
                        <tr key={index} className={styles.tabletr}>
                          <td className={styles.tabletd}>{item?.RoomNo}</td>
                          <td className={styles.tabletd}>{item?.hostelname}</td>
                          <td className={styles.tabletd}>
                            {item?.Category}
                          </td>
                          <td className={styles.tabletd}>
                            {item?.Facility}
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

export default OccupiedRoom;
