import React, { useState, useEffect } from "react";
import TestStudentListSchool from "@/component/parent/SchoolParent/TestStudentList";
import TestStudentListCollege from "@/component/parent/CollegeParent/TestStudentList";
import TestStudentListCoaching from "@/component/parent/CoachingParent/TestStudentList";
import { loadUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
function Test() {
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
          <TestStudentListCoaching />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "school" && (
        <>
          <TestStudentListSchool />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "college" && (
        <>
          <TestStudentListCollege />
        </>
      )}
    </div>
  );
}

export default Test;
