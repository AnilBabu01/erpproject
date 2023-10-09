import React, { useState, useEffect } from "react";
import Resultshow from "../../component/Student/Resultshow";
import { useRouter } from "next/router";
function ResultShow() {
  const router = useRouter();
  const [datais, setdatais] = useState("");
  const { result } = router.query;

  useEffect(() => {
    if (result) {
      setdatais(JSON.parse(result));

   
    }
  }, []);

  return (
    <div className="mainContainer">
      <Resultshow data={datais} />
    </div>
  );
}

export default ResultShow;
