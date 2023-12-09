import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { getstudent, GetSession } from "../../../redux/actions/commanAction";
import styles from "../../school/employee/employee.module.css";
import Slide from "@mui/material/Slide";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import moment from "moment";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
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
    name: "Mark",
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
  const dispatch = useDispatch();
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [isdata, setisData] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [sessionname, setsessionname] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [userdata, setuserdata] = useState("");
  const [allExpensesList, setallExpensesList] = useState([]);
  const [allRecoveryList, setallRecoveryList] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { loading, student } = useSelector((state) => state.getstudent);
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
    serverInstance("expenses/getexpensesanalysis", "post", {
      sessionname: sessionname,
      month: month,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        console.log("Analasis data is ", res?.data[0]);
        setallExpensesList(res?.data[0]?.allexpenses);
        setallRecoveryList(res?.data[0]?.allreceiptdata);
      }

      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
      }
    });
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
        total = total + Number(item?.ExpensesAmount);
      }
    });
    return total;
  };

  const totalonlineexpenses = (data) => {
    let total = 0;
    data?.map((item) => {
      if (item?.PayOption === "Online") {
        total = total + Number(item?.ExpensesAmount);
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
                <button onClick={() => filterdata()}>Search</button>
              </div>
              <button onClick={() => reset()}>Reset</button>
            </div>
            <div className={styles.imgdivformat}>
              <img
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />
              <img
                className={styles.imgdivformatimg}
                src="/images/ExportPdf.png"
                alt="img"
              />
              <img src="/images/ExportExcel.png" alt="img" />
            </div>
          </div>

          <div className={styles.add_divmarginn}>
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
                          {/* <th className={styles.tableth}>Date</th> */}
                          <th className={styles.tableth}>Payment_Out_Type</th>
                          <th className={styles.tableth}>Amount</th>
                          {/* <th className={styles.tableth}>Comment</th> */}
                          <th className={styles.tableth}>Payment_Mode</th>
                        </tr>
                        {allExpensesList?.length > 0 &&
                          allExpensesList?.map((item, index) => {
                            return (
                              <tr key={index} className={styles.tabletr}>
                                <td className={styles.tabletd}>{index + 1}</td>
                                {/* <td className={styles.tabletd}>06/02/2023</td> */}
                                <td className={styles.tabletd}>
                                  {item?.Expensestype}
                                </td>
                                <td className={styles.tabletd}>
                                  {item?.ExpensesAmount}
                                </td>
                                {/* <td className={styles.tabletd}>
                                  {item?.Comment}
                                </td> */}

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
                      Total Cash Payment Out Type = &nbsp;
                      <span className={styles.mainfivrupee10p}>
                        {totalcashexpenses(allExpensesList)}
                      </span>
                    </p>
                    <p>
                      Total Online Payment Out Type = &nbsp;
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
                          <th className={styles.tableth}>Paid_Amount</th>
                          {/* <th className={styles.tableth}>Pending_Amount</th> */}
                          <th className={styles.tableth}>Payment_Mode</th>
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
                                {/* <td className={styles.tabletd}>
                                {item?.rollnumber}
                              </td> */}
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
                      Total Cash Recovery = &nbsp;
                      <span className={styles.mainfivrupee10p}>
                        {totalcashrecovery(allRecoveryList)}
                      </span>
                    </p>
                    <p>
                      Total Online Recovery = &nbsp;
                      <span className={styles.mainfivrupee10p}>
                        {totalonlineexrecovery(allRecoveryList)}
                      </span>
                    </p>
                  </div>

                  <p>
                    Total Cash Recovery = &nbsp;
                    <span className={styles.mainfivrupee10p}>
                      ({totalcashrecovery(allRecoveryList)})
                    </span>
                    &nbsp; - Cash Payment Out Type = &nbsp;
                    <span className={styles.mainfivrupee10p}>
                      ({totalcashexpenses(allExpensesList)})
                    </span>
                    &nbsp; = &nbsp;
                    <span className={styles.mainfivrupee10p}>
                      {Number(totalcashrecovery(allRecoveryList)) -
                        Number(totalcashexpenses(allExpensesList))}
                    </span>
                  </p>
                  <p>
                    Total Online Recovery = &nbsp;
                    <span className={styles.mainfivrupee10p}>
                      ({totalonlineexrecovery(allRecoveryList)})
                    </span>
                    &nbsp; - Cash Payment Out Type&nbsp;
                    <span className={styles.mainfivrupee10p}>
                      ( {totalonlineexpenses(allExpensesList)})
                    </span>
                    &nbsp; = &nbsp;
                    <span className={styles.mainfivrupee10p}>
                      {Number(totalonlineexrecovery(allRecoveryList)) -
                        Number(totalonlineexpenses(allExpensesList))}
                    </span>
                  </p>
                  <p>
                    Total Profit = &nbsp;
                    <span className={styles.mainfivrupee10p}>
                      {Number(totalonlineexrecovery(allRecoveryList)) -
                        Number(totalonlineexpenses(allExpensesList)) +
                        Number(totalcashrecovery(allRecoveryList)) -
                        Number(totalcashexpenses(allExpensesList))}{" "}
                    </span>
                  </p>
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
