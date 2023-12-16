import React, { useState, useEffect } from "react";
import CoachingFee from "../../component/Student/Coaching/CoachingFee";
import SchoolFee from "@/component/Student/School/SchoolFee";
import CollegeFee from "@/component/Student/College/CollegeFee";
import { loadUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
function Fee() {
 
  const dispatch = useDispatch();
  const router = useRouter();
  const { StudentId } = router.query;
  const [studentid, setstudentid] = useState("");
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    // dispatch(loadUser());
  }, []);


  useEffect(() => {
    if (StudentId) {
      setstudentid(JSON.parse(StudentId));
    }
    if (user) {
      setuserdata(user);
    }
  }, [user]);
  return (
    <div className="mainContainer">
      {userdata?.data?.CredentailsData?.userType === "institute" && (
        <>
          <CoachingFee studentid={studentid} />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "school" && (
        <>
          <SchoolFee  studentid={studentid}/>
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "college" && (
        <>
          <CollegeFee studentid={studentid} />
        </>
      )}
    </div>
  );
}

export default Fee;
