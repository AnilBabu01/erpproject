import React, { useEffect, useState } from "react";
import styles from "../Coaching.module.css";
import { serverInstance } from "../../../API/ServerInstance";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import Image from "next/image";
function HostelDetails({ studentid }) {
  const [busdetails, setbusdetails] = useState("");
  const [loader, setloader] = useState(false);

  console.log("ID from hhhhhostel details", studentid);

  const getmonthAttendance = () => {
    setloader(true);
    serverInstance("hostel/GetStudentCheckin", "post", {
      studentid: studentid,
    }).then((res) => {
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
    if (studentid) {
      getmonthAttendance();
    }
  }, []);

  const filterdata = (data) => {
    let filterdats = data?.filter((item) => {
      return item?.RouteId === busdetails[0]?.vehicledetails?.routeId;
    });

    return filterdats;
  };
  return (
    <>
      <div className="service-container">
        <div className="service-item" data-wow-delay="0.1s">
          <h5>Hostel Details</h5>
          <p>
            Session :- &nbsp;
            {busdetails?.Session ? busdetails?.Session : "---"}
          </p>
          <p>
            Section :- &nbsp;
            {busdetails?.Section ? busdetails?.Section : "---"}
          </p>
          <p>
            Hostel Name :- &nbsp;
            {busdetails?.hostelname ? busdetails?.hostelname : "---"}
          </p>
          <p>
            Category :-&nbsp;
            {busdetails?.Category ? busdetails?.Category : "---"}
          </p>
          <p>
            Facility :-&nbsp;
            {busdetails?.Facility ? busdetails?.Facility : "---"}
          </p>
          <p>
            Room No :-&nbsp;
            {busdetails?.RoomNo ? busdetails?.RoomNo : "---"}
          </p>
          <a className="btn " href="#">
            ➨
          </a>
        </div>
      </div>

      {loader && <LoadingSpinner />}
    </>
  );
}

export default HostelDetails;
