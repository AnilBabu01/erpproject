import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import moment from "moment";
import { Addpayfee } from "../../../redux/actions/coachingAction";
import { useDispatch, useSelector } from "react-redux";
function Addfee({ data, monthname, paidmonth, setOpen }) {
  const dispatch = useDispatch();
  const [montharray, setmontharray] = useState([]);
  const [checked, setChecked] = useState([]);
  const [feetype, setfeetype] = useState("Registration");
  const [discount, setdiscount] = useState(false);
  const { paycoaching } = useSelector((state) => state.addpayfeecoaching);

  console.log("add fee", data);

  const submit = () => {
    const datas = {
      id: data?.id,
      paymonths: montharray,
      studentData: data,
      feetype: feetype,
      discount: discount,
    };
    dispatch(Addpayfee(datas, setOpen));
  };

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>

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
                    <p className={styles.hightlighttext}>{data?.permonthfee}</p>
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
                        Number(data?.permonthfee) * Number(montharray.length)}
                    </p>
                  </div>
                  <div className={styles.inputdivpay}>
                    <p>Paid</p>
                    <p className={styles.hightlighttext}>
                      {Number(data?.paidfee) +
                        Number(data?.permonthfee) * Number(montharray.length)}
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
                    <p className={styles.hightlighttext}>{data?.rollnumber}</p>
                  </div>
                  <div className={styles.inputdivpay}>
                    <p>Contact No</p>
                    <p className={styles.hightlighttext}>{data?.phoneno1}</p>
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
                              paidmonth[0]?.startmonth + data?.courseduration
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
                              paidmonth[0]?.startmonth + data?.courseduration
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
                                        value={paidmonth[0]?.startmonth + index}
                                        onChange={(e) => {
                                          let updatedList = [...montharray];
                                          if (e.target.checked) {
                                            updatedList = [
                                              ...montharray,
                                              e.target.value,
                                            ];
                                          } else {
                                            updatedList.splice(
                                              checked.indexOf(e.target.value),
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
                  <label>Pay</label>
                  <input
                    type="radio"
                    value={"Registration"}
                    onChange={(e) => setfeetype(e.target.value)}
                    name="same"
                  />
                </div>
                <div className={styles.regisFeepayDivinnear}>
                  <label>Discount</label>
                  <input
                    type="radio"
                    value={discount}
                    onChange={(e) => setdiscount(e.target.value)}
                    name="same"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className={styles.mainbtnndivcancel}>
          <button onClick={() => setOpen(false)} className={styles.cancelbtn}>
            Back
          </button>

          <button
            disable={montharray.length === 0 ? true : false}
            className={styles.cancelbtn}
            onClick={() => submit()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Addfee;
