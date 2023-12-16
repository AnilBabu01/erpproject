import React, { useState, useEffect } from "react";
import BustrackingStudentListSchool from "@/component/parent/SchoolParent/BustrackingStudentList";
import BustrackingStudentListColleg from "@/component/parent/CollegeParent/BustrackingStudentList";
import BustrackingStudentListCoaching from "@/component/parent/CoachingParent/BustrackingStudentList";
import { loadUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
function bus() {
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
          <BustrackingStudentListCoaching />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "school" && (
        <>
          <BustrackingStudentListSchool />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "college" && (
        <>
          <BustrackingStudentListColleg />
        </>
      )}
    </div>
  );
}

export default bus;
