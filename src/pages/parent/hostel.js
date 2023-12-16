import React, { useState, useEffect } from "react";
import HostelStudentSchool from "@/component/parent/SchoolParent/HostelStudent";
import HostelStudentCollege from "@/component/parent/CollegeParent/HostelStudent";
import HostelStudenCoachingt from "@/component/parent/CoachingParent/HostelStudent";
import { loadUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
function Hostel() {
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
          <HostelStudenCoachingt />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "school" && (
        <>
          <HostelStudentSchool />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "college" && (
        <>
          <HostelStudentCollege />
        </>
      )}
    </div>
  );
}

export default Hostel;
