import React, { useState, useEffect } from "react";
import CoachingAttendance from "../../component/Student/Coaching/CoachingAttendance";
import SchoolAttendance from "@/component/Student/School/SchoolAttendance";
import CollegeAttendance from "@/component/Student/College/CollegeAttendance";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
function Attendance() {
  const router = useRouter();
  const { StudentId } = router.query;
  const [studentid, setstudentid] = useState("");
  const [userdata, setuserdata] = useState("");
  const { user } = useSelector((state) => state.auth);

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
          <CoachingAttendance studentid={studentid} />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "school" && (
        <>
          <SchoolAttendance studentid={studentid} />
        </>
      )}
      {userdata?.data?.CredentailsData?.userType === "college" && (
        <>
          <CollegeAttendance studentid={studentid} />
        </>
      )}
    </div>
  );
}

export default Attendance;
