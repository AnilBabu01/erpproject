import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
import { getstudent } from "../../../redux/actions/commanAction";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
const MonthanameArray = {
  1: "April",
  2: "May",
  3: "June",
  4: "July",
  5: "August",
  6: "September",
  7: "October",
  8: "November",
  9: "December",
  10: "January",
  11: "February",
  12: "March",
};


function Addfee({ data, setOpen }) {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [montharray, setmontharray] = useState([]);
  const [feetype, setfeetype] = useState("Registration");
  const [discount, setdiscount] = useState(false);
  const [showreceiptotions, setshowreceiptotions] = useState("");
  const [receiptdata, setreceiptdata] = useState("");
  const [schoolfee, setschoolfee] = useState([]);
  const [addloading, setaddloading] = useState(false);
  const submit = () => {
    try {
      setaddloading(true);
      const datas = {
        id: data?.id,
        paymonths: montharray,
        studentData: data,
        feetype: feetype,
        discount: discount,
      };

      serverInstance("Student/pacoachingfee", "post", datas).then((res) => {
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          dispatch(getstudent());
          setaddloading(false);
          setOpen(false);
          setshowreceiptotions(true);
          setreceiptdata(res?.data[0]?.receiptdata);
        }

        if (res?.status === false) {
          toast.error(res?.msg, { autoClose: 1000 });
          dispatch(getstudent());
          setOpen(false);
          setaddloading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setaddloading(false);
    }
  };

  const downloadReceipt = () => {
    navigation.push({
      pathname: "/coaching/student/receipt",
      query: {
        receiptdata: JSON.stringify(receiptdata),
      },
    });
  };

  useEffect(() => {
    serverInstance("Student/schoolfee", "post", {
      id: data?.id,
    }).then((res) => {
      if (res?.status) {
        console.log("get fee detauils", res);
        setschoolfee(res?.data);
      }
    });
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>

        {showreceiptotions ? (
          <>
            <div className={styles.mainbtnndivcancel}>
              <button
                onClick={() => setOpen(false)}
                className={styles.cancelbtn}
              >
                Ok
              </button>

              <button
                className={styles.cancelbtn}
                onClick={() => downloadReceipt()}
              >
                View Receipt
              </button>
            </div>
          </>
        ) : (
          <>
            {data?.Registrationfeestatus ? (
              <>
                <div className={styles.mainbtnndivcancel10}>
                  <div>
                    <h1> Academin Fee</h1>
                    <div>
                      <table className={styles.tabletable}>
                        <tbody>
                          <tr className={styles.tabletr}>
                            <th className={styles.tableth}>Month Name</th>
                            <th className={styles.tableth}>Year</th>
                            <th className={styles.tableth}>Amount</th>
                            <th className={styles.tableth}>Mark Paid</th>
                            <th className={styles.tableth}>Status</th>
                          </tr>
                          {schoolfee?.schollfee?.map((item, index) => {
                            return (
                              <tr key={index} className={styles.tabletr}>
                                <th className={styles.tableth}>
                                  {MonthanameArray[index + 1]}
                                </th>
                                <th className={styles.tableth}>
                                  {item?.PerMonthFee}
                                </th>
                                <th className={styles.tableth}>{item?.Year}</th>
                                <th className={styles.tableth}>
                                  <input
                                    type="checkbox"
                                    name="vehicle1"
                                    value="Bike"
                                  />
                                </th>
                                <th className={styles.tableth}>Status</th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h1> Hostel Fee</h1>
                    <div>
                      <table className={styles.tabletable}>
                        <tbody>
                          <tr className={styles.tabletr}>
                            <th className={styles.tableth}>Month Name</th>
                            <th className={styles.tableth}>Year</th>
                            <th className={styles.tableth}>Amount</th>
                            <th className={styles.tableth}>Mark Paid</th>
                            <th className={styles.tableth}>Status</th>
                          </tr>

                          {schoolfee?.hostelfee?.map((item, index) => {
                            return (
                              <tr key={index} className={styles.tabletr}>
                                <th className={styles.tableth}>
                                  {MonthanameArray[index + 1]}
                                </th>
                                <th className={styles.tableth}>
                                  {item?.PerMonthFee}
                                </th>
                                <th className={styles.tableth}>{item?.Year}</th>
                                <th className={styles.tableth}>
                                  <input
                                    type="checkbox"
                                    name="vehicle1"
                                    value="Bike"
                                  />
                                </th>
                                <th className={styles.tableth}>Status</th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h1>Transport Fee</h1>
                    <div>
                      <table className={styles.tabletable}>
                        <tbody>
                          <tr className={styles.tabletr}>
                            <th className={styles.tableth}>Month Name</th>
                            <th className={styles.tableth}>Year</th>
                            <th className={styles.tableth}>Amount</th>
                            <th className={styles.tableth}>Mark Paid</th>
                            <th className={styles.tableth}>Status</th>
                          </tr>

                          {schoolfee?.transportfee?.map((item, index) => {
                            return (
                              <tr key={index} className={styles.tabletr}>
                                <th className={styles.tableth}>
                                  {MonthanameArray[index + 1]}
                                </th>
                                <th className={styles.tableth}>
                                  {item?.PerMonthFee}
                                </th>
                                <th className={styles.tableth}>{item?.Year}</th>
                                <th className={styles.tableth}>
                                  <input
                                    type="checkbox"
                                    name="vehicle1"
                                    value="Bike"
                                  />
                                </th>
                                <th className={styles.tableth}>Status</th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1>Registration Fee</h1>
                <h1>Payable Amount ({data?.regisgrationfee})</h1>
                <div className={styles.regisFeepayDiv}>
                  <div className={styles.regisFeepayDiv}>
                    <div className={styles.regisFeepayDivinnear}>
                      <input
                        type="radio"
                        value={"Registration"}
                        onChange={(e) => setfeetype(e.target.value)}
                        name="same"
                      />
                      <label>Pay</label>
                    </div>
                    <div className={styles.regisFeepayDivinnear}>
                      <input
                        type="radio"
                        value={discount}
                        onChange={(e) => setdiscount(e.target.value)}
                        name="same"
                      />
                      <label>Discount</label>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className={styles.mainbtnndivcancel}>
              <button
                onClick={() => setOpen(false)}
                className={styles.cancelbtn}
              >
                Back
              </button>

              <button
                disable={montharray.length === 0 ? true : false}
                className={styles.cancelbtn}
                onClick={() => submit()}
                disabled={addloading ? true : false}
              >
                {addloading ? (
                  <CircularProgress size={25} style={{ color: "red" }} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Addfee;
