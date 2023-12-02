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

function Addfee({ data, setOpen }) {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [montharray, setmontharray] = useState([]);
  const [acadminfee, setacadminfee] = useState(true);
  const [hostelfee, sethostelfee] = useState(false);
  const [transport, settransport] = useState(false);
  const [acadminArray, setacadminArray] = useState([]);
  const [hostelArray, sethostelArray] = useState([]);
  const [transportArray, settransportArray] = useState([]);
  const [feetype, setfeetype] = useState("Registration");
  const [discount, setdiscount] = useState(false);
  const [showreceiptotions, setshowreceiptotions] = useState(false);
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
          navigation.push({
            pathname: "/coaching/student/receipt",
            query: {
              receiptdata: JSON.stringify(res?.data[0]?.receiptdata),
            },
          });
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

  const addSchoolFee = () => {
    try {
      setaddloading(true);
      const datas = {
        id: data?.id,
        acadminArray: acadminArray,
        studentData: data,
        feetype: "Academy Fee",
      };

      serverInstance("Student/addacadmyfee", "post", datas).then((res) => {
        console.log("Receipt data is ", res);
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          dispatch(getstudent());
          setaddloading(false);
          setOpen(false);
          setshowreceiptotions(true);
          setreceiptdata(res?.data[0]?.receiptdata);
          navigation.push({
            pathname: "/coaching/student/receipt",
            query: {
              receiptdata: JSON.stringify(res?.data),
            },
          });
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

  const addHostelFee = () => {
    try {
      setaddloading(true);
      const datas = {
        id: data?.id,
        acadminArray: hostelArray,
        studentData: data,
        feetype: "Hostel Fee",
      };

      serverInstance("Student/addhostelfee", "post", datas).then((res) => {
        console.log("Receipt data is ", res);
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          dispatch(getstudent());
          setaddloading(false);
          setOpen(false);
          setshowreceiptotions(true);
          setreceiptdata(res?.data[0]?.receiptdata);
          navigation.push({
            pathname: "/coaching/student/receipt",
            query: {
              receiptdata: JSON.stringify(res?.data),
            },
          });
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

  const addTransportFee = () => {
    try {
      setaddloading(true);
      const datas = {
        id: data?.id,
        acadminArray: transportArray,
        studentData: data,
        feetype: "Transport Fee",
      };

      serverInstance("Student/addtransportfee", "post", datas).then((res) => {
        console.log("Receipt data is ", res);
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          dispatch(getstudent());
          setaddloading(false);
          setOpen(false);
          setshowreceiptotions(true);
          setreceiptdata(res?.data[0]?.receiptdata);
          navigation.push({
            pathname: "/coaching/student/receipt",
            query: {
              receiptdata: JSON.stringify(res?.data),
            },
          });
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

  const compareMonths = (a, b) => {
    const monthsOrder = [
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
    ];

    return monthsOrder.indexOf(a.MonthName) - monthsOrder.indexOf(b.MonthName);
  };

  console.log("data is data is ", data);
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
                <div className={styles.paybtndiv}>
                  <button
                    className={
                      acadminfee
                        ? styles.searchbtnactive
                        : styles.searchoptiondivbutton
                    }
                    onClick={() => {
                      setacadminfee(true);
                      sethostelfee(false);
                      settransport(false);
                    }}
                  >
                    Academin Fee
                  </button>

                  <button
                    onClick={() => {
                      setacadminfee(false);
                      sethostelfee(true);
                      settransport(false);
                    }}
                    className={
                      hostelfee
                        ? styles.searchbtnactive
                        : styles.searchoptiondivbutton
                    }
                  >
                    Hostel Fee
                  </button>

                  <button
                    onClick={() => {
                      setacadminfee(false);
                      sethostelfee(false);
                      settransport(true);
                    }}
                    className={
                      transport
                        ? styles.searchbtnactive
                        : styles.searchoptiondivbutton
                    }
                  >
                    Transport Fee
                  </button>
                </div>

                <div className={styles.mainbtnndivcancel10}>
                  {acadminfee === true && (
                    <>
                      <div className={styles.mainpaiddiv}>
                        <div>
                          <table className={styles.tabletable}>
                            <tbody>
                              <tr className={styles.tabletr}>
                                <th className={styles.tableth}>Month/Year</th>
                                <th className={styles.tableth}>Amount</th>
                                <th className={styles.tableth}>Mark</th>
                                <th className={styles.tableth}>Status</th>
                              </tr>
                              {schoolfee?.schollfee
                                ?.sort(compareMonths)
                                ?.map((item, index) => {
                                  return (
                                    <tr key={index} className={styles.tabletr}>
                                      <th className={styles.tableth}>
                                        {item?.MonthName}/ {item?.Year}
                                      </th>
                                      <th className={styles.tableth}>
                                        {item?.PerMonthFee}
                                      </th>

                                      <th className={styles.tableth}>
                                        {item?.paidStatus === true ? (
                                          <>
                                            <input
                                              type="checkbox"
                                              checked={true}
                                              disabled={true}
                                              value={item}
                                              onChange={(e) => {
                                                let updatedList = [
                                                  ...acadminArray,
                                                ];
                                                if (e.target.checked) {
                                                  updatedList = [
                                                    ...acadminArray,
                                                    item,
                                                  ];
                                                } else {
                                                  updatedList.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );
                                                }
                                                setacadminArray(updatedList);
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <input
                                              type="checkbox"
                                              value={item}
                                              onChange={(e) => {
                                                let updatedList = [
                                                  ...acadminArray,
                                                ];
                                                if (e.target.checked) {
                                                  updatedList = [
                                                    ...acadminArray,
                                                    item,
                                                  ];
                                                } else {
                                                  updatedList.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );
                                                }
                                                setacadminArray(updatedList);
                                              }}
                                            />
                                          </>
                                        )}
                                      </th>
                                      <th className={styles.tableth}>
                                        {item?.paidStatus === true
                                          ? "Paid"
                                          : "Dues"}
                                      </th>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                        <div className={styles.candidateDetails}>
                          <h1>Student Details</h1>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Student Name</p>
                              <p>{data?.name}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Class</p>
                              <p>{data?.courseorclass}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Roll No</p>
                              <p>{data?.rollnumber}</p>
                            </div>
                          </div>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Fathers Name</p>
                              <p>{data?.fathersName}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Fathers Phone No</p>
                              <p>{data?.fathersPhoneNo}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Student Phone No</p>
                              <p>{data?.phoneno1}</p>
                            </div>
                          </div>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Per Month Fee</p>
                              <p>{data?.permonthfee}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Total Fee</p>
                              <p>{data?.studentTotalFee}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Paid Fee</p>
                              <p>{data?.paidfee}</p>
                            </div>
                          </div>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Pendinng Amount</p>
                              <p>
                                {Number(data?.pendingfee) -
                                  Number(
                                    acadminArray &&
                                      acadminArray?.reduce(
                                        (n, { PerMonthFee }) =>
                                          parseFloat(n) +
                                          parseFloat(PerMonthFee),
                                        0
                                      )
                                  )}
                              </p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Payable Amount</p>
                              <p>
                                {acadminArray &&
                                  acadminArray?.reduce(
                                    (n, { PerMonthFee }) =>
                                      parseFloat(n) + parseFloat(PerMonthFee),
                                    0
                                  )}
                              </p>
                            </div>
                            <div className={styles.fixInnearDivWidth10}>
                              <p>&nbsp;</p>
                              <p>&nbsp;</p>
                            </div>
                          </div>
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
                              onClick={() => addSchoolFee()}
                              disabled={addloading ? true : false}
                            >
                              {addloading ? (
                                <CircularProgress
                                  size={25}
                                  style={{ color: "red" }}
                                />
                              ) : (
                                "Save"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {hostelfee === true && (
                    <>
                      <div className={styles.mainpaiddiv}>
                        <div>
                          <table className={styles.tabletable}>
                            <tbody>
                              <tr className={styles.tabletr}>
                                <th className={styles.tableth}>Month/Year</th>
                                <th className={styles.tableth}>Amount</th>
                                <th className={styles.tableth}>Mark</th>
                                <th className={styles.tableth}>Status</th>
                              </tr>
                              {schoolfee?.hostelfee
                                ?.sort(compareMonths)
                                ?.map((item, index) => {
                                  return (
                                    <tr key={index} className={styles.tabletr}>
                                      <th className={styles.tableth}>
                                        {item?.MonthName}/ {item?.Year}
                                      </th>
                                      <th className={styles.tableth}>
                                        {item?.PerMonthFee}
                                      </th>

                                      <th className={styles.tableth}>
                                        {item?.paidStatus === true ? (
                                          <>
                                            <input
                                              type="checkbox"
                                              checked={true}
                                              disabled={true}
                                              value={item}
                                              onChange={(e) => {
                                                let updatedList = [
                                                  ...hostelArray,
                                                ];
                                                if (e.target.checked) {
                                                  updatedList = [
                                                    ...hostelArray,
                                                    item,
                                                  ];
                                                } else {
                                                  updatedList.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );
                                                }
                                                sethostelArray(updatedList);
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <input
                                              type="checkbox"
                                              value={item}
                                              onChange={(e) => {
                                                let updatedList = [
                                                  ...hostelArray,
                                                ];
                                                if (e.target.checked) {
                                                  updatedList = [
                                                    ...hostelArray,
                                                    item,
                                                  ];
                                                } else {
                                                  updatedList.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );
                                                }
                                                sethostelArray(updatedList);
                                              }}
                                            />
                                          </>
                                        )}
                                      </th>
                                      <th className={styles.tableth}>
                                        {item?.paidStatus === true
                                          ? "Paid"
                                          : "Dues"}
                                      </th>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                        <div className={styles.candidateDetails}>
                          <h1>Student Details</h1>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Student Name</p>
                              <p>{data?.name}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Class</p>
                              <p>{data?.courseorclass}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Roll No</p>
                              <p>{data?.rollnumber}</p>
                            </div>
                          </div>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Fathers Name</p>
                              <p>{data?.fathersName}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Fathers Phone No</p>
                              <p>{data?.fathersPhoneNo}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Student Phone No</p>
                              <p>{data?.phoneno1}</p>
                            </div>
                          </div>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Per Month Fee</p>
                              <p>{data?.HostelPerMonthFee}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Total Fee</p>
                              <p>{data?.TotalHostelFee}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Paid Fee</p>
                              <p>{data?.HostelPaidFee}</p>
                            </div>
                          </div>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Pendinng Amount</p>
                              <p>
                                {Number(data?.HostelPendingFee) -
                                  Number(
                                    hostelArray &&
                                      hostelArray?.reduce(
                                        (n, { PerMonthFee }) =>
                                          parseFloat(n) +
                                          parseFloat(PerMonthFee),
                                        0
                                      )
                                  )}
                              </p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Payable Amount</p>
                              <p>
                                {hostelArray &&
                                  hostelArray?.reduce(
                                    (n, { PerMonthFee }) =>
                                      parseFloat(n) + parseFloat(PerMonthFee),
                                    0
                                  )}
                              </p>
                            </div>
                            <div className={styles.fixInnearDivWidth10}>
                              <p>&nbsp;</p>
                              <p>&nbsp;</p>
                            </div>
                          </div>
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
                              onClick={() => addHostelFee()}
                              disabled={addloading ? true : false}
                            >
                              {addloading ? (
                                <CircularProgress
                                  size={25}
                                  style={{ color: "red" }}
                                />
                              ) : (
                                "Save"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {transport === true && (
                    <>
                      <div className={styles.mainpaiddiv}>
                        <div>
                          <table className={styles.tabletable}>
                            <tbody>
                              <tr className={styles.tabletr}>
                                <th className={styles.tableth}>Month/Year</th>
                                <th className={styles.tableth}>Amount</th>
                                <th className={styles.tableth}>Mark</th>
                                <th className={styles.tableth}>Status</th>
                              </tr>
                              {schoolfee?.transportfee
                                ?.sort(compareMonths)
                                ?.map((item, index) => {
                                  return (
                                    <tr key={index} className={styles.tabletr}>
                                      <th className={styles.tableth}>
                                        {item?.MonthName}/ {item?.Year}
                                      </th>
                                      <th className={styles.tableth}>
                                        {item?.PerMonthFee}
                                      </th>

                                      <th className={styles.tableth}>
                                        {item?.paidStatus === true ? (
                                          <>
                                            <input
                                              type="checkbox"
                                              checked={true}
                                              disabled={true}
                                              value={item}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <input
                                              type="checkbox"
                                              value={item}
                                              onChange={(e) => {
                                                let updatedList = [
                                                  ...transportArray,
                                                ];
                                                if (e.target.checked) {
                                                  updatedList = [
                                                    ...transportArray,
                                                    item,
                                                  ];
                                                } else {
                                                  updatedList.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );
                                                }
                                                settransportArray(updatedList);
                                              }}
                                            />
                                          </>
                                        )}
                                      </th>
                                      <th className={styles.tableth}>
                                        {item?.paidStatus === true
                                          ? "Paid"
                                          : "Dues"}
                                      </th>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                        <div className={styles.candidateDetails}>
                          <h1>Student Details</h1>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Student Name</p>
                              <p>{data?.name}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Class</p>
                              <p>{data?.courseorclass}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Roll No</p>
                              <p>{data?.rollnumber}</p>
                            </div>
                          </div>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Fathers Name</p>
                              <p>{data?.fathersName}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Fathers Phone No</p>
                              <p>{data?.fathersPhoneNo}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Student Phone No</p>
                              <p>{data?.phoneno1}</p>
                            </div>
                          </div>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Per Month Fee</p>
                              <p>{data?.TransportPerMonthFee}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Total Fee</p>
                              <p>{data?.TransportTotalHostelFee}</p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Paid Fee</p>
                              <p>{data?.TransportPaidFee}</p>
                            </div>
                          </div>
                          <div className={styles.mainwrapdiv}>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Pendinng Amount</p>
                              <p>
                                {Number(data?.TransportPendingFee) -
                                  Number(
                                    transportArray &&
                                      transportArray?.reduce(
                                        (n, { PerMonthFee }) =>
                                          parseFloat(n) +
                                          parseFloat(PerMonthFee),
                                        0
                                      )
                                  )}
                              </p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Payable Amount</p>
                              <p>
                                {transportArray &&
                                  transportArray?.reduce(
                                    (n, { PerMonthFee }) =>
                                      parseFloat(n) + parseFloat(PerMonthFee),
                                    0
                                  )}
                              </p>
                            </div>
                            <div className={styles.fixInnearDivWidth10}>
                              <p>&nbsp;</p>
                              <p>&nbsp;</p>
                            </div>
                          </div>
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
                              onClick={() => addTransportFee()}
                              disabled={addloading ? true : false}
                            >
                              {addloading ? (
                                <CircularProgress
                                  size={25}
                                  style={{ color: "red" }}
                                />
                              ) : (
                                "Save"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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
          </>
        )}
      </div>
    </>
  );
}

export default Addfee;
