import React, { useEffect, useState } from "react";
import styles from "../Coaching.module.css";
import { serverInstance } from "../../../API/ServerInstance";
import LoadingSpinner from "@/component/loader/LoadingSpinner";

function HostelDetails() {
  const [busdetails, setbusdetails] = useState("");
  const [loader, setloader] = useState(false);
  const getmonthAttendance = () => {
    setloader(true);
    serverInstance("transport/GetStudentBus", "get").then((res) => {
      if (res?.status === true) {
        setloader(false);

        setbusdetails(res?.data);
      }
      if (res?.status === false) {
        setloader(false);
      }
    });
  };

  useEffect(() => {
    getmonthAttendance();
  }, []);

  const filterdata = (data) => {
    let filterdats = data?.filter((item) => {
      return item?.RouteId === busdetails[0]?.vehicledetails?.routeId;
    });

    return filterdats;
  };
  return (
    <>
      <div className={styles.busdetailsdiv}>
        <div className={styles.bgbusdetails}>
          <div className={styles.inneardiv10}>
            <p>Bus_NO :- &nbsp; {busdetails[0]?.vehicledetails?.BusNumber}</p>
            <p>From_Route :-&nbsp; {busdetails[0]?.vehicleroute?.FromRoute}</p>
            <p>To_Route :-&nbsp; {busdetails[0]?.vehicleroute?.ToRoute}</p>
            <p>
              Stops :-&nbsp;
              {busdetails[0]?.stops &&
                filterdata(busdetails[0]?.stops)?.map((item, index) => (
                  <span key={index}>{item?.StopName}&nbsp;</span>
                ))}
            </p>
          </div>

          <div className={styles.drivermaindiv}>
            <div className={styles.inneardiv10}>
              <p>Driver No 1 </p>
              <p>
                Driver Name :&nbsp;
                {busdetails[0]?.Driver1?.name
                  ? busdetails[0]?.Driver1?.name
                  : "---"}
              </p>
              <p>
                Driver Mobile No :&nbsp;
                {busdetails[0]?.Driver1?.phoneno1
                  ? busdetails[0]?.Driver1?.phoneno1
                  : "---"}
              </p>
              <p>
                Driver Mobile NO :&nbsp;
                {busdetails[0]?.Driver1?.phoneno2
                  ? busdetails[0]?.Driver1?.phoneno2
                  : "---"}
              </p>
            </div>
            <div className={styles.inneardiv10}>
              <p>Driver No 2</p>
              <p>
                Driver Name :&nbsp;
                {busdetails[0]?.Driver2?.name
                  ? busdetails[0]?.Driver2?.name
                  : "---"}
              </p>
              <p>
                Driver Mobile No :&nbsp;
                {busdetails[0]?.Driver2?.phoneno1
                  ? busdetails[0]?.Driver2?.phoneno1
                  : "---"}
              </p>
              <p>
                Driver Mobile NO :&nbsp;
                {busdetails[0]?.Driver2?.phoneno2
                  ? busdetails[0]?.Driver2?.phoneno2
                  : "---"}
              </p>
            </div>
            <div className={styles.inneardiv10}>
              <p>Helper No 1</p>
              <p>
                Driver Name :&nbsp;
                {busdetails[0]?.Helfer1?.name
                  ? busdetails[0]?.Helfer1?.name
                  : "---"}
              </p>
              <p>
                Driver Mobile No :&nbsp;
                {busdetails[0]?.Helfer1?.phoneno1
                  ? busdetails[0]?.Helfer1?.phoneno1
                  : "---"}
              </p>
              <p>
                Driver Mobile NO :&nbsp;
                {busdetails[0]?.Helfer1?.phoneno2
                  ? busdetails[0]?.Helfer1?.phoneno2
                  : "---"}
              </p>
            </div>
            <div className={styles.inneardiv10}>
              <p>Helper No 2</p>
              <p>
                Driver Name :&nbsp;
                {busdetails[0]?.Helfer2?.name
                  ? busdetails[0]?.Helfer2?.name
                  : "---"}
              </p>
              <p>
                Driver Mobile No :&nbsp;
                {busdetails[0]?.Helfer2?.phoneno1
                  ? busdetails[0]?.Helfer2?.phoneno1
                  : "---"}
              </p>
              <p>
                Driver Mobile NO :&nbsp;
                {busdetails[0]?.Helfer2?.phoneno2
                  ? busdetails[0]?.Helfer2?.phoneno2
                  : "---"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {loader && <LoadingSpinner />}
    </>
  );
}

export default HostelDetails;
