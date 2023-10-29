import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
function Addfee({ setOpen, data }) {
  const dispatch = useDispatch();
  const [isdata, setisdata] = useState("");

  console.log("receipt data from options screens", data);

  useEffect(() => {
    if (data) {
      setisdata(data);
    }
  }, []);

  const downloadReceipt = () => {
    navigation.push({
      pathname: "/coaching/accounts/collectfee",
      query: {
        receiptdata: JSON.stringify(student?.data[0]?.user),
      },
    });
  };

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>

        <div className={styles.mainbtnndivcancel}>
          <button onClick={() => setOpen(false)} className={styles.cancelbtn}>
            Ok
          </button>

          <button
            className={styles.cancelbtn}
            // onClick={() => submit()}
          >
            View Receipt
          </button>
        </div>
      </div>
    </>
  );
}

export default Addfee;
