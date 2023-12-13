import React, { useState, useEffect } from "react";
import CoachingAttendance from "../../component/Student/Coaching/CoachingAttendance";
import SchoolAttendance from "@/component/Student/School/SchoolAttendance";
import CollegeAttendance from "@/component/Student/College/CollegeAttendance";
import { loadUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
function Attendance() {
  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  console.log("from attendance", userdata?.data?.CredentailsData?.userType);
  useEffect(() => {
    if (user) {
      setuserdata(user);
    }
  }, [user]);
  return (
    <div className="mainContainer">
      {userdata?.data?.CredentailsData?.userType === "institute" && (
        <>
          <CoachingAttendance />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "school" && (
        <>
          <SchoolAttendance />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "college" && (
        <>
          <CollegeAttendance />
        </>
      )}
    </div>
  );
}

export default Attendance;
