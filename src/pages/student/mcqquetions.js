import React, { useState, useEffect } from "react";
import McsQuestions from "../../component/Student/McsQuestions";
import { useRouter } from "next/router";
function Mcqquetions() {
  const router = useRouter();
  const [datais, setdatais] = useState("");
  const { starttestdata } = router.query;

  useEffect(() => {
    if (starttestdata) {
      setdatais( JSON.parse(starttestdata));
    }
  }, []);

  return (
    <div className="mainContainer">
      <McsQuestions data={datais} />
    </div>
  );
}

export default Mcqquetions;
