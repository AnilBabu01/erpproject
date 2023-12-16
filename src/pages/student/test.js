import React, { useState, useEffect } from "react";
import CoachingTest from "../../component/Student/CoachingTest";
import { useRouter } from "next/router";
function Test() {
  const router = useRouter();
  const { StudentId } = router.query;
  const [studentid, setstudentid] = useState("");

  useEffect(() => {
    if (StudentId) {
      setstudentid(JSON.parse(StudentId));
    }
  }, []);
  return (
    <div className="mainContainer">
      <CoachingTest  studentid={studentid}/>
    </div>
  );
}

export default Test;
