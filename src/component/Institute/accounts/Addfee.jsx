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
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };
function Addfee({ data, setOpen }) {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [SrNumber, setSrNumber] = useState("");
  const [paymentdate, setpaymentdate] = useState("");
  const [PayOption, setPayOption] = useState("Cash");
  const [annualfee, setannualfee] = useState("");
  const [checked, setChecked] = useState([]);
  const [montharray, setmontharray] = useState([]);
  const [acadminfee, setacadminfee] = useState(true);
  const [hostelfee, sethostelfee] = useState(false);
  const [transport, settransport] = useState(false);
  const [othersfee, setothersfee] = useState(false);
  const [otherfeearray, setotherfeearray] = useState([]);
  const [acadminArray, setacadminArray] = useState([]);
  const [hostelArray, sethostelArray] = useState([]);
  const [transportArray, settransportArray] = useState([]);

  const [editotherfeearray, seteditotherfeearray] = useState([]);
  const [editacadminArray, seteditacadminArray] = useState([]);
  const [edithostelArray, setedithostelArray] = useState([]);
  const [edittransportArray, setedittransportArray] = useState([]);

  const [feetype, setfeetype] = useState("");
  const [discount, setdiscount] = useState(false);
  const [showreceiptotions, setshowreceiptotions] = useState(false);
  const [receiptdata, setreceiptdata] = useState("");
  const [schoolfee, setschoolfee] = useState([]);
  const [addloading, setaddloading] = useState(false);

  const [unlockfeeOptions, setunlockfeeOptions] = useState(false);

  const handleChange = () => {
    setunlockfeeOptions(!unlockfeeOptions);
    seteditacadminArray([]);
    setedithostelArray([]);
    seteditotherfeearray([]);
    setedittransportArray([]);
  };

  var options = { year: "numeric", month: "short", day: "2-digit" };
  var today = new Date();
  const currDate = today
    .toLocaleDateString("en-IN", options)
    .replace(/-/g, " ");
  const currTime = today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const submit = () => {
    try {
      setaddloading(true);
      const datas = {
        id: data?.id,
        feetype: feetype,
        annualfee: annualfee,
        PayOption: PayOption,
        paymentdate: paymentdate,
      };

      serverInstance("Student/payschoolanualregister", "post", datas).then(
        (res) => {
          console.log("paid receipt data is", res);
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
        }
      );
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
        PayOption: PayOption,
        paymentdate: paymentdate,
        unlockfeeOptions: unlockfeeOptions,
        editacadminArray: editacadminArray,
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

          if (res?.msg != "Academy Fee Edit Successfully!!") {
            navigation.push({
              pathname: "/coaching/student/receipt",
              query: {
                receiptdata: JSON.stringify(res?.data),
              },
            });
          }
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
        PayOption: PayOption,
        paymentdate: paymentdate,
        unlockfeeOptions: unlockfeeOptions,
        edithostelArray: edithostelArray,
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

          if (res?.msg != "Academy Fee Edit Successfully!!") {
            navigation.push({
              pathname: "/coaching/student/receipt",
              query: {
                receiptdata: JSON.stringify(res?.data),
              },
            });
          }
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
        PayOption: PayOption,
        paymentdate: paymentdate,
        unlockfeeOptions: unlockfeeOptions,
        edittransportArray: edittransportArray,
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

          if (res?.msg != "Academy Fee Edit Successfully!!") {
            navigation.push({
              pathname: "/coaching/student/receipt",
              query: {
                receiptdata: JSON.stringify(res?.data),
              },
            });
          }
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

  const addOtherFee = () => {
    try {
      setaddloading(true);
      const datas = {
        id: data?.id,
        acadminArray: otherfeearray,
        studentData: data,
        feetype: "Other Fee",
        PayOption: PayOption,
        paymentdate: paymentdate,
        unlockfeeOptions: unlockfeeOptions,
        editotherfeearray: editotherfeearray,
      };

      serverInstance("Student/addotherfee", "post", datas).then((res) => {
        console.log("other fee  data is ", res);
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          dispatch(getstudent());
          setaddloading(false);
          setOpen(false);
          setshowreceiptotions(true);
          setreceiptdata(res?.data[0]?.receiptdata);

          if (res?.msg != "Academy Fee Edit Successfully!!") {
            navigation.push({
              pathname: "/coaching/student/receipt",
              query: {
                receiptdata: JSON.stringify(res?.data),
              },
            });
          }
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
  const getstudentfee = () => {
    serverInstance("Student/schoolfee", "post", {
      id: data?.id,
      SrNumber: SrNumber,
    }).then((res) => {
      if (res?.status) {
        console.log("get fee detauils", res);
        setschoolfee(res?.data);
      }
    });
  };
  useEffect(() => {
    getstudentfee();
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

  const TotalOtherFee = (data) => {
    let total = 0;
    data?.map((item) => {
      if (item?.PaidStatus === false) {
        total = total + Number(item?.FeeAmount);
      }
    });
    return total;
  };

  useEffect(() => {
    setpaymentdate(new Date().toISOString().substring(0, 10));
  }, []);

  console.log("edit data is", acadminArray, editacadminArray);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <Typography variant="body2" color="primary" align="right">
            {currDate} / {currTime}
          </Typography>
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
            {data?.Registrationfeestatus && data?.AnnualFeeStatus ? (
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
                      setothersfee(false);
                      setunlockfeeOptions(false);
                    }}
                  >
                    Academin Fee
                  </button>
                  {data?.hostal === true && (
                    <>
                      <button
                        onClick={() => {
                          setacadminfee(false);
                          sethostelfee(true);
                          settransport(false);
                          setothersfee(false);
                          setunlockfeeOptions(false);
                        }}
                        className={
                          hostelfee
                            ? styles.searchbtnactive
                            : styles.searchoptiondivbutton
                        }
                      >
                        Hostel Fee
                      </button>
                    </>
                  )}

                  {data?.Transport === true && (
                    <>
                      <button
                        onClick={() => {
                          setacadminfee(false);
                          sethostelfee(false);
                          settransport(true);
                          setothersfee(false);
                          setunlockfeeOptions(false);
                        }}
                        className={
                          transport
                            ? styles.searchbtnactive
                            : styles.searchoptiondivbutton
                        }
                      >
                        Transport Fee
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => {
                      setacadminfee(false);
                      sethostelfee(false);
                      settransport(false);
                      setothersfee(true);
                      setunlockfeeOptions(false);
                    }}
                    className={
                      othersfee
                        ? styles.searchbtnactive
                        : styles.searchoptiondivbutton
                    }
                  >
                    Others Fee
                  </button>

                  <Switch {...label} onChange={handleChange} />
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
                                        {item?.paidStatus === true &&
                                        unlockfeeOptions === false ? (
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

                                                let editacadminList = [
                                                  ...editacadminArray,
                                                ];

                                                if (e.target.checked) {
                                                  updatedList = [
                                                    ...acadminArray,
                                                    item,
                                                  ];

                                                  editacadminList.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );
                                                } else {
                                                  updatedList.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );

                                                  editacadminList = [
                                                    ...editacadminArray,
                                                    item,
                                                  ];
                                                }
                                                setacadminArray(updatedList);
                                                seteditacadminArray(
                                                  editacadminList
                                                );

                                                console.log(
                                                  "Click on second input box"
                                                );
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
                                  ) +
                                  Number(
                                    editacadminArray &&
                                      editacadminArray?.reduce(
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
                            <div className={styles.fixInnearDivWidth}>
                              <div className={styles.payfeeoption}>
                                <div>
                                  <input
                                    type="radio"
                                    value={"Cash"}
                                    checked={PayOption === "Cash"}
                                    name="same"
                                    onChange={(e) =>
                                      setPayOption(e.target.value)
                                    }
                                  />
                                  <label>Cash</label>
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    value={"Online"}
                                    name="same"
                                    onChange={(e) =>
                                      setPayOption(e.target.value)
                                    }
                                  />
                                  <label>Online</label>
                                </div>
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
                              onClick={() => addSchoolFee()}
                              disabled={addloading ? true : false}
                            >
                              {addloading ? (
                                <CircularProgress
                                  size={25}
                                  style={{ color: "red" }}
                                />
                              ) : unlockfeeOptions === false ? (
                                "Save"
                              ) : (
                                "Update"
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
                                        {item?.paidStatus === true &&
                                        unlockfeeOptions === false ? (
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

                                                let edithostelist = [
                                                  ...editacadminArray,
                                                ];

                                                if (e.target.checked) {
                                                  updatedList = [
                                                    ...hostelArray,
                                                    item,
                                                  ];
                                                  edithostelist.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );
                                                } else {
                                                  updatedList.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );

                                                  edithostelist = [
                                                    ...edithostelArray,
                                                    item,
                                                  ];
                                                }
                                                sethostelArray(updatedList);
                                                setedithostelArray(
                                                  edithostelist
                                                );
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
                                  ) +
                                  Number(
                                    edithostelArray &&
                                      edithostelArray?.reduce(
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
                            <div className={styles.fixInnearDivWidth}>
                              <div className={styles.payfeeoption}>
                                <div>
                                  <input
                                    type="radio"
                                    value={"Cash"}
                                    name="same"
                                    checked={PayOption === "Cash"}
                                    onChange={(e) =>
                                      setPayOption(e.target.value)
                                    }
                                  />
                                  <label>Cash</label>
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    value={"Online"}
                                    name="same"
                                    onChange={(e) =>
                                      setPayOption(e.target.value)
                                    }
                                  />
                                  <label>Online</label>
                                </div>
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
                              onClick={() => addHostelFee()}
                              disabled={addloading ? true : false}
                            >
                              {addloading ? (
                                <CircularProgress
                                  size={25}
                                  style={{ color: "red" }}
                                />
                              ) : unlockfeeOptions === false ? (
                                "Save"
                              ) : (
                                "Update"
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
                                        {item?.paidStatus === true &&
                                        unlockfeeOptions === false ? (
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

                                                let edittransportList = [
                                                  ...edittransportArray,
                                                ];

                                                if (e.target.checked) {
                                                  updatedList = [
                                                    ...transportArray,
                                                    item,
                                                  ];
                                                  edittransportList.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );
                                                } else {
                                                  updatedList.splice(
                                                    checked.indexOf(item),
                                                    1
                                                  );
                                                  edittransportList = [
                                                    ...edittransportArray,
                                                    item,
                                                  ];
                                                }
                                                settransportArray(updatedList);
                                                setedittransportArray(
                                                  edittransportList
                                                );
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
                                  ) +
                                  Number(
                                    edittransportArray &&
                                    edittransportArray?.reduce(
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
                            <div className={styles.fixInnearDivWidth}>
                              <div className={styles.payfeeoption}>
                                <div>
                                  <input
                                    type="radio"
                                    value={"Cash"}
                                    name="same"
                                    checked={PayOption === "Cash"}
                                    onChange={(e) =>
                                      setPayOption(e.target.value)
                                    }
                                  />
                                  <label>Cash</label>
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    value={"Online"}
                                    name="same"
                                    onChange={(e) =>
                                      setPayOption(e.target.value)
                                    }
                                  />
                                  <label>Online</label>
                                </div>
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
                              onClick={() => addTransportFee()}
                              disabled={addloading ? true : false}
                            >
                              {addloading ? (
                                <CircularProgress
                                  size={25}
                                  style={{ color: "red" }}
                                />
                              ) : unlockfeeOptions === false ? (
                                "Save"
                              ) : (
                                "Update"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {othersfee === true && (
                    <>
                      <div className={styles.mainpaiddiv}>
                        <div>
                          <table className={styles.tabletable}>
                            <tbody>
                              <tr className={styles.tabletr}>
                                <th className={styles.tableth}>Fee_Type</th>
                                <th className={styles.tableth}>Amount</th>
                                <th className={styles.tableth}>Mark</th>
                                <th className={styles.tableth}>Status</th>
                              </tr>
                              {schoolfee?.otherfee?.map((item, index) => {
                                return (
                                  <tr key={index} className={styles.tabletr}>
                                    <th className={styles.tableth}>
                                      {item?.OtherFeeName}
                                    </th>
                                    <th className={styles.tableth}>
                                      {item?.FeeAmount}
                                    </th>

                                    <th className={styles.tableth}>
                                      {item?.PaidStatus === true &&
                                      unlockfeeOptions === false ? (
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
                                                ...otherfeearray,
                                              ];

                                              let editotherfee = [
                                                ...editotherfeearray,
                                              ];

                                              if (e.target.checked) {
                                                updatedList = [
                                                  ...otherfeearray,
                                                  item,
                                                ];
                                                editotherfee.splice(
                                                  checked.indexOf(item),
                                                  1
                                                );
                                              } else {
                                                updatedList.splice(
                                                  checked.indexOf(item),
                                                  1
                                                );

                                                editotherfee = [
                                                  ...editotherfeearray,
                                                  item,
                                                ];
                                              }
                                              setotherfeearray(updatedList);
                                              seteditotherfeearray(
                                                editotherfee
                                              );
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
                              <p>Pendinng Amount</p>
                              <p>
                                {TotalOtherFee(schoolfee?.otherfee) -
                                  Number(
                                    otherfeearray &&
                                      otherfeearray?.reduce(
                                        (n, { FeeAmount }) =>
                                          parseFloat(n) + parseFloat(FeeAmount),
                                        0
                                      )
                                  ) +
                                  Number(
                                    editotherfeearray &&
                                      editotherfeearray?.reduce(
                                        (n, { FeeAmount }) =>
                                          parseFloat(n) + parseFloat(FeeAmount),
                                        0
                                      )
                                  )}
                              </p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <p>Payable Amount</p>
                              <p>
                                {otherfeearray &&
                                  otherfeearray?.reduce(
                                    (n, { FeeAmount }) =>
                                      parseFloat(n) + parseFloat(FeeAmount),
                                    0
                                  )}
                              </p>
                            </div>
                            <div className={styles.fixInnearDivWidth}>
                              <div className={styles.payfeeoption}>
                                <div>
                                  <input
                                    type="radio"
                                    value={"Cash"}
                                    checked={PayOption === "Cash"}
                                    name="same"
                                    onChange={(e) =>
                                      setPayOption(e.target.value)
                                    }
                                  />
                                  <label>Cash</label>
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    value={"Online"}
                                    name="same"
                                    onChange={(e) =>
                                      setPayOption(e.target.value)
                                    }
                                  />
                                  <label>Online</label>
                                </div>
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
                              onClick={() => addOtherFee()}
                              disabled={addloading ? true : false}
                            >
                              {addloading ? (
                                <CircularProgress
                                  size={25}
                                  style={{ color: "red" }}
                                />
                              ) : unlockfeeOptions === false ? (
                                "Save"
                              ) : (
                                "Update"
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
                <div className={styles.regisFeepayDiv10}>
                  <div className={styles.payoption}>
                    <input
                      type="radio"
                      value={"Cash"}
                      name="same"
                      id="cashid"
                      checked={PayOption === "Cash"}
                      onChange={(e) => setPayOption(e.target.value)}
                    />
                    <label htmlFor="cashid">Cash</label>
                  </div>
                  <div className={styles.payoption}>
                    <input
                      type="radio"
                      value={"Online"}
                      name="same"
                      id="online"
                      onChange={(e) => setPayOption(e.target.value)}
                    />
                    <label htmlFor="online">Online</label>
                  </div>
                </div>

                <h1>Registration And Annual Fee</h1>
                {/* <div className={styles.regisFeepayDiv}> */}
                <div className={styles.regisFeepayDiv}>
                  <div className={styles.regisFeepayDivinnear}>
                    {data?.Registrationfeestatus === true ? (
                      <>
                        <input
                          type="checkbox"
                          value={"Registration"}
                          disabled={true}
                          checked={true}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setfeetype(e.target.value);
                            } else {
                              setfeetype("");
                            }
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          id="Registration"
                          value={"Registration"}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setfeetype(e.target.value);
                            } else {
                              setfeetype("");
                            }
                          }}
                        />
                      </>
                    )}

                    <label htmlFor="Registration">
                      Registration Fee ({data?.regisgrationfee})
                    </label>
                  </div>
                  <div className={styles.regisFeepayDivinnear}>
                    {data?.AnnualFeeStatus === true ? (
                      <>
                        <input
                          id="Registration"
                          type="checkbox"
                          value={"Annual"}
                          disabled={true}
                          checked={true}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setannualfee(e.target.value);
                            } else {
                              setannualfee("");
                            }
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          id="Annual"
                          value={"Annual"}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setannualfee(e.target.value);
                            } else {
                              setannualfee("");
                            }
                          }}
                        />
                      </>
                    )}

                    <label htmlFor="Annual">
                      Annual Fee ({data?.AnnualFee})
                    </label>
                  </div>
                </div>
                {/* </div> */}
                <div className={styles.regisFeepayDiv}>
                  <p>
                    Payable Amount (
                    {feetype === "Registration" && annualfee === "Annual"
                      ? Number(data?.regisgrationfee) + Number(data?.AnnualFee)
                      : feetype === "Registration"
                      ? Number(data?.regisgrationfee)
                      : annualfee === "Annual"
                      ? Number(data?.AnnualFee)
                      : 0}
                    )
                  </p>
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
                      "Pay"
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
