import React, { useState, useEffect } from "react";
import AttendanceStudentlistSchool from "@/component/parent/SchoolParent/AttendanceStudentlist";
import AttendanceStudentlistCollege from "@/component/parent/CollegeParent/AttendanceStudentlist";
import AttendanceStudentlistCoaching from "@/component/parent/CoachingParent/AttendanceStudentlist";
import { loadUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
function Studentlist() {
  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    // dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (user) {
      setuserdata(user);
    }
  }, [user]);
  return (
    
    <div className="mainContainer">
      {userdata?.data?.CredentailsData?.userType === "institute" && (
        <>
          <AttendanceStudentlistCoaching />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "school" && (
        <>
          <AttendanceStudentlistSchool />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "college" && (
        <>
          <AttendanceStudentlistCollege />
        </>
      )}
    </div>
  );
}

export default Studentlist;
