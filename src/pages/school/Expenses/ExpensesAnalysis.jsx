import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { getstudent, GetSession } from "../../../redux/actions/commanAction";
import styles from "../../school/employee/employee.module.css";
import Slide from "@mui/material/Slide";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
const monthlist = [
  {
    id: 1,
    name: "January",
  },
  {
    id: 2,
    name: "February",
  },
  {
    id: 3,
    name: "March",
  },
  {
    id: 4,
    name: "April",
  },
  ,
  {
    id: 5,
    name: "May",
  },
  {
    id: 6,
    name: "Jun",
  },
  {
    id: 7,
    name: "July",
  },
  {
    id: 8,
    name: "August",
  },
  {
    id: 8,
    name: "September",
  },
  {
    id: 10,
    name: "October",
  },
  {
    id: 11,
    name: "November",
  },
  {
    id: 12,
    name: "December",
  },
];
function ExpensesAnalysis() {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [isdata, setisData] = useState([]);
  const [loading, setloading] = useState(false);
  const [sessionList, setsessionList] = useState([]);
  const [sessionname, setsessionname] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [userdata, setuserdata] = useState("");
  const [assetlist, setassetlist] = useState([]);
  const [allExpensesList, setallExpensesList] = useState([]);
  const [allRecoveryList, setallRecoveryList] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { student } = useSelector((state) => state.getstudent);
  const { Sessions } = useSelector((state) => state.GetSession);

  useEffect(() => {
    if (student) {
      setisData(student);
    }

    if (user) {
      setuserdata(user);
    }

    if (Sessions) {
      setsessionList(Sessions);
    }
  }, [student, user, Sessions]);
  const filterdata = () => {
    try {
      setloading(true);

      let date = new Date();
      let fullyear = date.getFullYear();
      let lastyear = date.getFullYear() - 1;
      let combine = `${lastyear}-${fullyear}`;
      serverInstance("expenses/getexpensesanalysis", "post", {
        sessionname: sessionname ? sessionname : combine,
        month: month,
      }).then((res) => {
        if (res?.status === true) {
          // toast.success(res?.msg, {
          //   autoClose: 1000,
          // });
          // console.log("Analasis data is ", res?.data[0]);
          setloading(false);
          setallExpensesList(res?.data[0]?.allexpenses);
          setallRecoveryList(res?.data[0]?.allreceiptdata);
          setassetlist(res?.data[0]?.allexpensesAsset);
        }

        if (res?.status === false) {
          toast.error(res?.msg, {
            autoClose: 1000,
          });
          setloading(false);
        }
      });
    } catch (error) {
      setloading(false);
    }
  };
  useEffect(() => {
    dispatch(getstudent());
    filterdata();
  }, []);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getstudent());
    dispatch(GetSession());
  }, []);

  const reset = () => {
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
    setsectionname("");
    serverInstance("expenses/getexpensesanalysis", "post", {
      sessionname: sessionname,
      month: month,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        console.log("Analasis data is ", res);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
      }
    });
  };

  useEffect(() => {
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
  }, []);

  const totalcashexpenses = (data) => {
    let total = 0;
    data?.map((item) => {
      if (item?.PayOption === "Cash") {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const totalonlineexpenses = (data) => {
    let total = 0;
    data?.map((item) => {
      if (item?.PayOption === "Online") {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const totalcashrecovery = (data) => {
    let total = 0;
    data?.map((item) => {
      if (item?.PayOption === "Cash") {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const totalonlineexrecovery = (data) => {
    let total = 0;
    data?.map((item) => {
      if (item?.PayOption === "Online") {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const removeasset = (data) => {
    // let filterData = data.filter(
    //   (item) => item.Expensestype === "Expenses" || item.Expensestype === "Liability"
    // );

    return data;
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const ExportToExcel = (isData) => {
    const fileName = "BookListReport";
    const exportType = "xls";
    var data = [];

    isData.map((item) => {
      data.push({
        Class_Name: item?.courseorclass,
        Book_Id: item?.BookId,
        Book_Title: item?.BookTitle,
        Auther_Name: item?.auther,
        Add_Date: moment(item?.admissionDate).format("MM/DD/YYYY"),
        Book_Quantity: item?.Realquantity,
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };
  return (
    <>
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <div className={styles.searchoptiondiv}>
                <select
                  className={styles.opensearchinput}
                  sx={{
                    width: "18.8rem",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={sessionname}
                  name="sessionname"
                  onChange={(e) => setsessionname(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    Select Session
                  </option>

                  {sessionList?.length > 0 &&
                    sessionList?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.Session}
                        >
                          {item?.Session}
                        </option>
                      );
                    })}
                </select>
                <select
                  className={styles.opensearchinput}
                  sx={{
                    width: "18.8rem",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={month}
                  name="month"
                  onChange={(e) => {
                    setmonth(e.target.value);
                  }}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    Month
                  </option>

                  {monthlist?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.id}
                      >
                        {item?.name}
                      </option>
                    );
                  })}
                </select>
                <button onClick={() => filterdata()}>
                  {loading ? (
                    <CircularProgress size={25} style={{ color: "red" }} />
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
              {/* <button onClick={() => reset()}>Reset</button> */}
            </div>
            <div className={styles.imgdivformat}>
              <img
                onClick={() => handlePrint()}
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />
            </div>
          </div>

          <div className={styles.add_divmarginn} ref={componentRef}>
            <div className={styles.tablecontainer}>
              <div className={styles.expensesDiv}>
                <div className={styles.innearexpensesdiv}>
                  <div className={styles.mainrecoveryp}>
                    <p>Expenses</p>
                  </div>

                  <div className={styles.onlytablescroll}>
                    <table className={styles.tabletable}>
                      <tbody>
                        <tr className={styles.tabletr}>
                          <th className={styles.tableth}>Sr.No</th>

                          <th className={styles.tableth}>Type</th>
                          <th className={styles.tableth}>Amount</th>

                          <th className={styles.tableth}>Mode</th>
                        </tr>
                        {allExpensesList?.length > 0 &&
                          removeasset(allExpensesList)?.map((item, index) => {
                            return (
                              <tr key={index} className={styles.tabletr}>
                                <td className={styles.tabletd}>{index + 1}</td>

                                <td className={styles.tabletd}>
                                  {item?.Expensestype}
                                </td>
                                <td className={styles.tabletd}>
                                  {item?.total_paidamount}
                                </td>

                                <td className={styles.tabletd}>
                                  {item?.PayOption}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className={styles.mainfivrupee}>
                    <p>
                      Total Cash Out = &nbsp;
                      <span className={styles.mainfivrupee10p}>
                        {totalcashexpenses(allExpensesList)}
                      </span>
                    </p>
                    <p>
                      Total Online Out = &nbsp;
                      <span className={styles.mainfivrupee10p}>
                        {totalonlineexpenses(allExpensesList)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={styles.innearexpensesdiv10}>
                  <div className={styles.mainrecoveryp}>
                    <p>Recovery</p>
                  </div>

                  <div className={styles.onlytablescroll}>
                    <table className={styles.tabletable}>
                      <tbody>
                        <tr className={styles.tabletr}>
                          <th className={styles.tableth}>Sr.No</th>
                          <th className={styles.tableth}>Class</th>
                          <th className={styles.tableth}>Amount</th>

                          <th className={styles.tableth}>Mode</th>
                        </tr>
                        {allRecoveryList?.length > 0 &&
                          allRecoveryList?.map((item, index) => {
                            return (
                              <tr key={index} className={styles.tabletr}>
                                <td className={styles.tabletd}>{index + 1}</td>
                                <td className={styles.tabletd}>
                                  {item?.Course}
                                </td>
                                <td className={styles.tabletd}>
                                  {item?.total_paidamount}
                                </td>

                                <td className={styles.tabletd}>
                                  {item?.PayOption}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <p>
                     Total Cash (Cash Recovery - Cash Asset) = &nbsp;
                      <span className={styles.mainfivrupee10p}>
                        {totalcashrecovery(allRecoveryList) -
                          totalcashexpenses(assetlist)}
                      </span>
                    </p>
                    <p>
                    Total Bank (Online Recovery - Online Asset) = &nbsp;
                      <span className={styles.mainfivrupee10p}>
                        {totalonlineexrecovery(allRecoveryList) -
                          totalonlineexpenses(assetlist)}
                      </span>
                    </p>
                    <p>
                      Total Profit = &nbsp;
                      <span className={styles.mainfivrupee10p}>
                        {totalcashrecovery(allRecoveryList)+totalonlineexrecovery(allRecoveryList)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <LoadingSpinner />}
    </>
  );
}

export default ExpensesAnalysis;
