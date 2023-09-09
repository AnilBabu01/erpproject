import React,{useEffect,useState} from "react";
import { useRouter } from "next/router";
function receipt() {
  const router = useRouter();
  const { receiptdata } = router.query;
  const [data, setData] = React.useState({});

  console.log("receipt data is", data);

  
  useEffect(() => {
    if (receiptdata) setData(JSON.parse(receiptdata));
  }, []);

  return <div className="mainContainer">receipt</div>;
}

export default receipt;
