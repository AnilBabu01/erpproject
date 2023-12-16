import React, { useState, useEffect } from "react";
import FeeStudentListSchool from "@/component/parent/SchoolParent/FeeStudentList";
import FeeStudentListCollege from "@/component/parent/CollegeParent/FeeStudentList";
import FeeStudentListCoaching from "@/component/parent/CoachingParent/FeeStudentList";
import { loadUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
function Fee() {
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
          <FeeStudentListCoaching />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "school" && (
        <>
          <FeeStudentListSchool />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "college" && (
        <>
          <FeeStudentListCollege />
        </>
      )}
    </div>
  );
}

export default Fee;
