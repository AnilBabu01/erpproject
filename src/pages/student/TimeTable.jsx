import React, { useState, useEffect } from "react";
import CoachingTimetable from "../../component/Student/Coaching/CoachingTimetable";
import SchoolTimetable from "@/component/Student/School/SchoolTimetable";
import CollegeTimetable from "@/component/Student/College/CollegeTimetable";
import { loadUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
function TimeTable() {
  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);


  useEffect(() => {
    if (user) {
      setuserdata(user);
    }
  }, [user]);
  return (
    <div className="mainContainertimetable">
      {userdata?.data?.CredentailsData?.userType === "institute" && (
        <>
          <CoachingTimetable />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "school" && (
        <>
          <SchoolTimetable />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "college" && (
        <>
          <CollegeTimetable />
        </>
      )}
    </div>
  );
}

export default TimeTable;
