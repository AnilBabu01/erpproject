import React, { useEffect, useState } from "react";
import styles from "../../Student/Coaching.module.css";
import { serverInstance } from "../../../API/ServerInstance";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import Image from "next/image";
import studentimg from "../../../../public/images/students.webp";
import attendance from "../.././../../public/images/attendance1.png";
import HomeChangeingImg from "./HomeChangeingImg";
import { useRouter } from "next/router";
function SchoolOptions() {
  const navigate = useRouter();
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
      <div className="service-container">
        <HomeChangeingImg />

        <div
          onClick={() =>
            navigate.push({
              pathname: "/parent/Studentlist",
            })
          }
          className="service-item"
          data-wow-delay="0.1s"
        >
          <div className="service-icon">
            <Image src={studentimg} height={80} width={80} alt="" />
          </div>
          <h5>Attendance</h5>
          <a className="btn " href="#">
            ➨
          </a>
        </div>
        <div className="service-item" data-wow-delay="0.1s">
          <div className="service-icon">
            <Image src={studentimg} height={80} width={80} alt="" />
          </div>
          <h5>Test</h5>
          <a className="btn " href="#">
            ➨
          </a>
        </div>
        <div className="service-item" data-wow-delay="0.1s">
          <div className="service-icon">
            <Image src={studentimg} height={80} width={80} alt="" />
          </div>
          <h5>Fee</h5>
          <a className="btn " href="#">
            ➨
          </a>
        </div>
        <div className="service-item" data-wow-delay="0.1s">
          <div className="service-icon">
            <Image src={studentimg} height={80} width={80} alt="" />
          </div>
          <h5>Hostel</h5>
          <a className="btn " href="#">
            ➨
          </a>
        </div>
        <div className="service-item" data-wow-delay="0.1s">
          <div className="service-icon">
            <Image src={studentimg} height={80} width={80} alt="" />
          </div>
          <h5>Bus Tracking</h5>
          <a className="btn " href="#">
            ➨
          </a>
        </div>
      </div>
      {loader && <LoadingSpinner />}
    </>
  );
}

export default SchoolOptions;
