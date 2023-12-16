import React, { useState, useEffect } from "react";
import HostelDetails from "../../component/Student/School/HostelDetails";
import { useRouter } from "next/router";
function Hostel() {
  const router = useRouter();

  return (
    <>
      <div className="mainContainer">
        <HostelDetails studentid={router?.query?.StudentId} />
      </div>
    </>
  );
}

export default Hostel;
