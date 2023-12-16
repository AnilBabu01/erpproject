import React, { useState, useEffect } from "react";
import styles from "@/styles/register.module.css";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import ViewDeails from "./ViewDeails";
function SchoolFee({ studentid }) {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState("");
  const [paymentdate, setpaymentdate] = useState("");
  const [feereceiptlist, setfeereceiptlist] = useState("");
  const [acadminfee, setacadminfee] = useState(true);
  const [hostelfee, sethostelfee] = useState(false);
  const [transport, settransport] = useState(false);
  const [othersfee, setothersfee] = useState(false);
  const [Ledger, setLedger] = useState(false);
  const [showreceiptotions, setshowreceiptotions] = useState(false);
  const [receiptdata, setreceiptdata] = useState("");
  const [schoolfee, setschoolfee] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [itemdetails, setitemdetails] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = (data) => {
    setOpen(true);
    setitemdetails(data);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);

  useEffect(() => {
    if (user) {
      setuserdata(user);
    }
  }, [user]);

  const downloadReceipt = () => {
    navigation.push({
      pathname: "/coaching/student/receipt",
      query: {
        receiptdata: JSON.stringify(receiptdata),
      },
    });
  };
  const getstudentfee = () => {
    serverInstance("Student/getStudentFee", "post", {
      studentid: studentid,
    }).then((res) => {
      if (res?.status) {
        console.log("get fee detauils", res);
        setschoolfee(res?.data);
      }
    });
  };

  const GetStudentFeeLedger = () => {
    serverInstance("Student/GetStudentFeeLedger", "post", {
      studentid: studentid,
    }).then((res) => {
      if (res?.status) {
        console.log("get fee detauils", res);
        setfeereceiptlist(res?.data);
      }
    });
  };
  useEffect(() => {
    getstudentfee();
    GetStudentFeeLedger();
    // dispatch(loadUser());
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

  return (
    <>
      {open && (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "60rem",
                },
              },
            }}
          >
            <ViewDeails receiptdata={itemdetails} setOpen={setOpen} />
          </Dialog>
        </div>
      )}
      <div className="bottom-chart-left-div10">
        <div className="bottom-chart-left-div-inearattdendance">
          <div>
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
                {true ? (
                  <>
                    <div className={styles.paybtndiv10}>
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
                          setLedger(false);
                        }}
                      >
                        School Fee
                      </button>
                      {userdata?.data?.User?.hostal === true && (
                        <>
                          <button
                            onClick={() => {
                              setacadminfee(false);
                              sethostelfee(true);
                              settransport(false);
                              setothersfee(false);
                              setLedger(false);
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

                      {userdata?.data?.User?.Transport === true && (
                        <>
                          <button
                            onClick={() => {
                              setacadminfee(false);
                              sethostelfee(false);
                              settransport(true);
                              setothersfee(false);
                              setLedger(false);
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
                          setLedger(false);
                        }}
                        className={
                          othersfee
                            ? styles.searchbtnactive
                            : styles.searchoptiondivbutton
                        }
                      >
                        Others Fee
                      </button>
                      <button
                        onClick={() => {
                          setacadminfee(false);
                          sethostelfee(false);
                          settransport(false);
                          setothersfee(false);
                          setLedger(true);
                        }}
                        className={
                          Ledger
                            ? styles.searchbtnactive
                            : styles.searchoptiondivbutton
                        }
                      >
                        Ledger
                      </button>
                    </div>

                    <div>
                      {acadminfee === true && (
                        <>
                          <div className={styles.add_divmarginn}>
                            <div className={styles.tablecontainer}>
                              <table className={styles.tabletable}>
                                <tbody>
                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>
                                      Month/Year
                                    </th>
                                    {schoolfee?.schollfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {item?.MonthName} {item?.Year}
                                          </td>
                                        );
                                      })}
                                  </tr>
                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>Amount</th>
                                    {schoolfee?.schollfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {item?.PerMonthFee}
                                          </td>
                                        );
                                      })}
                                  </tr>

                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>Status</th>
                                    {schoolfee?.schollfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td className={styles.tableth}>
                                            {item?.paidStatus === true
                                              ? "Paid"
                                              : "Dues"}
                                          </td>
                                        );
                                      })}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}

                      {hostelfee === true && (
                        <>
                          <div className={styles.add_divmarginn}>
                            <div className={styles.tablecontainer}>
                              <table className={styles.tabletable}>
                                <tbody>
                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>
                                      Month/Year
                                    </th>
                                    {schoolfee?.hostelfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {item?.MonthName} {item?.Year}
                                          </td>
                                        );
                                      })}
                                  </tr>
                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>Amount</th>
                                    {schoolfee?.hostelfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {item?.PerMonthFee}
                                          </td>
                                        );
                                      })}
                                  </tr>

                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>Status</th>
                                    {schoolfee?.hostelfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {item?.paidStatus === true
                                              ? "Paid"
                                              : "Dues"}
                                          </td>
                                        );
                                      })}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}
                      {transport === true && (
                        <>
                          <div className={styles.add_divmarginn}>
                            <div className={styles.tablecontainer}>
                              <table className={styles.tabletable}>
                                <tbody>
                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>
                                      Month/Year
                                    </th>
                                    {schoolfee?.transportfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {item?.MonthName} {item?.Year}
                                          </td>
                                        );
                                      })}
                                  </tr>
                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>Amount</th>
                                    {schoolfee?.transportfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {item?.PerMonthFee}
                                          </td>
                                        );
                                      })}
                                  </tr>

                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>Status</th>
                                    {schoolfee?.transportfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {item?.paidStatus === true
                                              ? "Paid"
                                              : "Dues"}
                                          </td>
                                        );
                                      })}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}

                      {othersfee === true && (
                        <>
                          <div className={styles.add_divmarginn}>
                            <div className={styles.tablecontainer}>
                              <table className={styles.tabletable}>
                                <tbody>
                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>Fee Type</th>
                                    {schoolfee?.otherfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {item?.OtherFeeName}
                                          </td>
                                        );
                                      })}
                                  </tr>
                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>
                                      Dues Date
                                    </th>
                                    {schoolfee?.otherfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {moment(item?.DuesDate).format(
                                              "MM/DD/YYYY"
                                            )}
                                          </td>
                                        );
                                      })}
                                  </tr>
                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>Amount</th>
                                    {schoolfee?.otherfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td
                                            key={index}
                                            className={styles.tableth}
                                          >
                                            {item?.FeeAmount}
                                          </td>
                                        );
                                      })}
                                  </tr>

                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>Status</th>
                                    {schoolfee?.otherfee
                                      ?.sort(compareMonths)
                                      ?.map((item, index) => {
                                        return (
                                          <td className={styles.tableth}>
                                            {item?.paidStatus === true
                                              ? "Paid"
                                              : "Dues"}
                                          </td>
                                        );
                                      })}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}

                      {Ledger === true && (
                        <>
                          <div className={styles.add_divmarginn}>
                            <div className={styles.tablecontainer}>
                              <table className={styles.tabletable}>
                                <tbody>
                                  <tr className={styles.tabletr}>
                                    <th className={styles.tableth}>SR.NO</th>
                                    <th className={styles.tableth}>
                                      Paid_Date
                                    </th>
                                    <th className={styles.tableth}>
                                      Paid_Amount
                                    </th>
                                    <th className={styles.tableth}>Details</th>
                                  </tr>

                                  {feereceiptlist?.length > 0 &&
                                    feereceiptlist?.map((item, index) => {
                                      return (
                                        <tr
                                          key={index}
                                          className={styles.tabletr}
                                        >
                                          <td className={styles.tableth}>
                                            {index + 1}
                                          </td>
                                          <td className={styles.tableth}>
                                            {moment(item?.PaidDate).format(
                                              "MM/DD/YYYY"
                                            )}
                                          </td>
                                          <td className={styles.tableth}>
                                            {item?.PaidAmount}
                                          </td>
                                          <td className={styles.tableth}>
                                            <button
                                              onClick={() =>
                                                handleClickOpen(item)
                                              }
                                              className={styles.searchbtnactive}
                                            >
                                              View
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SchoolFee;
