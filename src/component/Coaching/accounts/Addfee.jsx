import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

function Addfee({ data, monthname, paidmonth, setOpen }) {
  const navigation = useRouter();
  const [paymentdate, setpaymentdate] = useState("");
  const [montharray, setmontharray] = useState([]);
  const [checked, setChecked] = useState([]);
  const [feetype, setfeetype] = useState("Registration");
  const [discount, setdiscount] = useState(false);
  const [showreceiptotions, setshowreceiptotions] = useState("");
  const [receiptdata, setreceiptdata] = useState("");
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
        paymentdate: paymentdate,
      };

      serverInstance("Student/pacoachingfee", "post", datas).then((res) => {
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          // dispatch(getHolidays());
          setaddloading(false);
          // setOpen(false);
          setshowreceiptotions(true);
          setreceiptdata(res?.data[0]?.receiptdata);
        }

        if (res?.status === false) {
          toast.error(res?.msg, { autoClose: 1000 });
          // dispatch(getHolidays());
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
    setpaymentdate(new Date().toISOString().substring(0, 10));
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
                <h1>Fee Pay</h1>
                <form>
                  <div className={styles.mainfeedetails}>
                    <div>
                      <div className={styles.inputdivpay}>
                        <p>Student Name</p>
                        <p className={styles.hightlighttext}>{data?.name}</p>
                      </div>
                      <div className={styles.inputdivpay}>
                        <p>Course</p>
                        <p className={styles.hightlighttext}>
                          {data?.courseorclass}
                        </p>
                      </div>
                      <div className={styles.inputdivpay}>
                        <p>Batch</p>
                        <p className={styles.hightlighttext}>{data?.batch}</p>
                      </div>
                    </div>
                    <div>
                      <div className={styles.inputdivpay}>
                        <p>Total Fee</p>
                        <p className={styles.hightlighttext}>
                          {data?.studentTotalFee}
                        </p>
                      </div>
                      <div className={styles.inputdivpay}>
                        <p>Fee per month</p>
                        <p className={styles.hightlighttext}>
                          {data?.permonthfee}
                        </p>
                      </div>
                      <div className={styles.inputdivpay}>
                        <p>Registration Fee</p>
                        <p className={styles.hightlighttext}>
                          {data?.regisgrationfee}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className={styles.inputdivpay}>
                        <p>Dues</p>
                        <p className={styles.hightlighttext}>
                          {Number(data?.studentTotalFee) -
                            Number(data?.paidfee) -
                            Number(data?.permonthfee) *
                              Number(montharray.length)}
                        </p>
                      </div>
                      <div className={styles.inputdivpay}>
                        <p>Paid</p>
                        <p className={styles.hightlighttext}>
                          {Number(data?.paidfee) +
                            Number(data?.permonthfee) *
                              Number(montharray.length)}
                        </p>
                      </div>
                      <div className={styles.inputdivpay}>
                        <p>Admission date</p>
                        <p className={styles.hightlighttext}>
                          {moment(data?.admissionDate).format("MM/DD/YYYY")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className={styles.inputdivpay}>
                        <p>Course Duraion</p>
                        <p className={styles.hightlighttext}>
                          {data?.courseduration}
                        </p>
                      </div>
                      <div className={styles.inputdivpay}>
                        <p>Roll No</p>
                        <p className={styles.hightlighttext}>
                          {data?.rollnumber}
                        </p>
                      </div>
                      <div className={styles.inputdivpay}>
                        <p>Contact No</p>
                        <p className={styles.hightlighttext}>
                          {data?.phoneno1}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.addpaymaingintable}>
                    <div className={styles.tablecontainer}>
                      <table className={styles.tabletable}>
                        <tbody>
                          <tr className={styles.tabletr}>
                            {monthname &&
                              monthname
                                ?.slice(
                                  paidmonth[0]?.startmonth,
                                  paidmonth[0]?.startmonth +
                                    data?.courseduration
                                )
                                ?.map((item, index) => {
                                  return (
                                    <th key={index} className={styles.tableth}>
                                      {item?.month} {item?.year}
                                    </th>
                                  );
                                })}
                          </tr>
                          <tr className={styles.tabletr}>
                            {paidmonth &&
                              paidmonth
                                ?.slice(
                                  paidmonth[0]?.startmonth,
                                  paidmonth[0]?.startmonth +
                                    data?.courseduration
                                )
                                ?.map((item, index) => {
                                  return (
                                    <td key={index} className={styles.tableth}>
                                      {item?.value}
                                      {item?.value === "Paid" ? (
                                        <>
                                          <input
                                            type="checkbox"
                                            value={index}
                                            checked={item?.value === "Paid"}
                                            disabled={item?.value === "Paid"}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <input
                                            type="checkbox"
                                            value={
                                              paidmonth[0]?.startmonth + index
                                            }
                                            onChange={(e) => {
                                              let updatedList = [...montharray];
                                              if (e.target.checked) {
                                                updatedList = [
                                                  ...montharray,
                                                  e.target.value,
                                                ];
                                              } else {
                                                updatedList.splice(
                                                  checked.indexOf(
                                                    e.target.value
                                                  ),
                                                  1
                                                );
                                              }
                                              setmontharray(updatedList);
                                              console.log("eddd", updatedList);
                                              setfeetype("fee");
                                            }}
                                          />
                                        </>
                                      )}
                                    </td>
                                  );
                                })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </form>
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
