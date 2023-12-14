import React, { useState, useEffect } from "react";
import CoachingFee from "../../component/Student/Coaching/CoachingFee";
import SchoolFee from "@/component/Student/School/SchoolFee";
import CollegeFee from "@/component/Student/College/CollegeFee";
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
          <CoachingFee />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "school" && (
        <>
          <SchoolFee />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "college" && (
        <>
          <CollegeFee />
        </>
      )}
    </div>
  );
}

export default Fee;
