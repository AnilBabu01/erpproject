import React, { useEffect, useState } from "react";
import TopCard from "../../component/MainAdmin/TopCard";
import Barchart from "../../component/Institute/Charts/Barchart";
import Linechart from "../../component/Institute/Charts/Linechart";
import LinechartPaidFee from "@/component/Institute/Charts/LinechartPaidFee";
import BarPaidFeeChart from "@/component/Institute/Charts/BarPaidFee";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSession,
  getcurrentsession,
} from "../../redux/actions/commanAction";
import { serverInstance } from "../../API/ServerInstance";
function Dashboard() {
  const dispatch = useDispatch();

  const [alltotaldata, setalltotaldata] = useState("");
  const [sessionList, setsessionList] = useState([]);
  const [LineChartSession, setLineChartSession] = useState("Short by Session");
  const [BarCharSession, setBarCharSession] = useState("Short by Session");
  const [LinstFeepaidList, setLinstFeepaidList] = useState([]);
  const [BarFeepaidList, setBarFeepaidList] = useState([]);

  const [LineChartSessionExpenses, setLineChartSessionExpenses] =
    useState("Short by Session");
  const [BarCharSessionExpenses, setBarCharSessionExpenses] =
    useState("Short by Session");
  const [LinstExpensesList, setLinstExpensesList] = useState([]);
  const [BarExpensesList, setBarExpensesList] = useState([]);
  const { CURRENTSESSION } = useSelector((state) => state.GetCurrentSession);
  const { Sessions } = useSelector((state) => state.GetSession);
  const getTotalDashborData = () => {
    serverInstance("dashboard/GetAllTotalData", "post").then((res) => {
      if (res?.status === true) {
        setalltotaldata(res?.data);
        setLinstFeepaidList(res?.data?.ReceiptChartdata);
        setBarFeepaidList(res?.data?.ReceiptChartdata);
        setBarExpensesList(res?.data?.ExpensesChartdata);
        setLinstExpensesList(res?.data?.ExpensesChartdata);
      }
    });
  };

  const getPaidFeeLineChart = (session) => {
    serverInstance("dashboard/GetFeePaidChart", "post", {
      sessionname: session ? session : LineChartSession,
    }).then((res) => {
      if (res?.status === true) {
        setLinstFeepaidList(res?.data);
      }
    });
  };

  const getPaidFeeBarChart = (session) => {
    serverInstance("dashboard/GetFeePaidChart", "post", {
      sessionname: session ? session : LineChartSession,
    }).then((res) => {
      if (res?.status === true) {
        setBarFeepaidList(res?.data);
      }
    });
  };

  const getExpensesLineChart = (session) => {
    serverInstance("dashboard/GetExpensesChart", "post", {
      sessionname: session ? session : LineChartSession,
    }).then((res) => {
      if (res?.status === true) {
        setLinstExpensesList(res?.data);
      }
    });
  };

  const getExpensesBarChart = (session) => {
    serverInstance("dashboard/GetExpensesChart", "post", {
      sessionname: session ? session : LineChartSession,
    }).then((res) => {
      if (res?.status === true) {
        setBarExpensesList(res?.data);
      }
    });
  };

  const totalpresent = (attendance) => {
    let count = 0;
    attendance?.filter((item) => {
      if (
        item?.attendaceStatusIntext === "Present" ||
        item?.attendaceStatusIntext === "Present Half"
      ) {
        count = count + 1;
      }
    });

    return count;
  };

  const totalexpenses = (data) => {
    let total = 0;
    data?.map((item) => {
      total = total + Number(item?.total_paidamount);
    });
    return total;
  };

  const totalrecovery10 = (data) => {
    let total = 0;
    data?.map((item) => {
      total = total + Number(item?.PaidAmount);
    });
    return total;
  };
  const totalrecovery = (data) => {
    let total = 0;
    data?.map((item) => {
      total = total + Number(item?.total_paidamount);
    });
    return total;
  };

  useEffect(() => {
    getTotalDashborData();
    // dispatch(loadUser());
    dispatch(GetSession());
    dispatch(getcurrentsession());
  }, []);
  useEffect(() => {
    if (Sessions) {
      setsessionList(Sessions);
    }
    setLineChartSession(CURRENTSESSION);
    setBarCharSession(CURRENTSESSION);
    setLineChartSessionExpenses(CURRENTSESSION);
    setBarCharSessionExpenses(CURRENTSESSION);
  }, [Sessions, CURRENTSESSION]);

  const comparePaidFeeMonths = (a, b) => {
    const monthsOrder = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];

    return monthsOrder.indexOf(a.monthno) - monthsOrder.indexOf(b.monthno);
  };

  const compareExpensesFeeMonths = (a, b) => {
    const monthsOrder = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];

    return monthsOrder.indexOf(a.MonthNO) - monthsOrder.indexOf(b.MonthNO);
  };

  return (
    <>
      <div className="mainContainer">
        <div className="top-info-main-div">
          <TopCard
            img="/images/staff.png"
            value={
              alltotaldata?.TotalEmployee ? alltotaldata?.TotalEmployee : 0
            }
            text={"Employees"}
          />
          <TopCard
            img="/images/students.webp"
            value={alltotaldata?.TotalStudent ? alltotaldata?.TotalStudent : 0}
            text={"Students"}
          />
          <TopCard
            img="/images/parents.png"
            value={alltotaldata?.TotalParents ? alltotaldata?.TotalParents : 0}
            text={"Parents"}
          />

          <TopCard
            img="/images/staff.png"
            value={
              alltotaldata?.AllEmployeeAttendance
                ? totalpresent(alltotaldata?.AllEmployeeAttendance)
                : 0
            }
            text={"Present Teachers"}
          />
          <TopCard
            img="/images/students.webp"
            value={
              alltotaldata?.AllStudentAttendance
                ? totalpresent(alltotaldata?.AllStudentAttendance)
                : 0
            }
            text={"Present Students"}
          />
          <TopCard
            img="/images/rupee1.png"
            value={
              alltotaldata?.allreceiptdata
                ? `₹${totalrecovery10(alltotaldata?.allTodayreceiptdata)}`
                : "₹0"
            }
            text={"Today Paid Fees"}
          />
          <TopCard
            img="/images/rupee1.png"
            value={
              alltotaldata?.allreceiptdata
                ? `₹${totalrecovery(alltotaldata?.allreceiptdata)}`
                : "₹0"
            }
            text={"Paid Fees"}
          />
          <TopCard
            img="/images/redrupee.png"
            value={
              alltotaldata?.allStudentPending
                ? `${
                    Number(
                      alltotaldata?.allStudentPending[0]?.pendingfee
                        ? alltotaldata?.allStudentPending[0]?.pendingfee
                        : 0
                    ) +
                    Number(
                      alltotaldata?.allStudentPending[0]?.HostelPendingFee
                        ? alltotaldata?.allStudentPending[0]?.HostelPendingFee
                        : 0
                    ) +
                    Number(
                      alltotaldata?.allStudentPending[0]?.TransportPendingFee
                        ? alltotaldata?.allStudentPending[0]
                            ?.TransportPendingFee
                        : 0
                    )
                  }`
                : "₹0"
            }
            text={"Pending Fees"}
          />
          <TopCard
            img="/images/rupppe.png"
            value={
              alltotaldata?.allexpenses
                ? `₹${totalexpenses(alltotaldata?.allexpenses)}`
                : "₹0"
            }
            text={"Expenses"}
          />
          <TopCard
            img="/images/rupee2.png"
            value={
              alltotaldata?.allreceiptdata
                ? `₹${
                    Number(totalrecovery(alltotaldata?.allreceiptdata)) -
                    Number(totalexpenses(alltotaldata?.allexpenses))
                  }`
                : "₹0"
            }
            text={"Profit"}
          />
        </div>

        <div className="middle-chart-main-div">
          <div className="bottom-chart-left-div">
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Paid Fees Data</p>
                <div className="SortDown-div-bottom">
                  <select
                    sx={{
                      width: "18.8rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={LineChartSession}
                    name="LineChartSession"
                    onChange={(e) => {
                      getPaidFeeLineChart(e.target.value);
                      setLineChartSession(e.target.value);
                    }}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Short by Session
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
                </div>
              </div>

              <LinechartPaidFee
                value={"Paid Fees Data"}
                pdata={LinstFeepaidList?.sort(comparePaidFeeMonths)}
              />
            </div>

            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Paid Fees Data</p>
                <div className="SortDown-div-bottom">
                  <select
                    sx={{
                      width: "18.8rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={BarCharSession}
                    name="BarCharSession"
                    onChange={(e) => {
                      getPaidFeeBarChart(e.target.value);
                      setBarCharSession(e.target.value);
                    }}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Short by Session
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
                </div>
              </div>

              <BarPaidFeeChart
                value={"Paid Fees"}
                pdata={BarFeepaidList?.sort(comparePaidFeeMonths)}
              />
            </div>
          </div>
        </div>
        <div className="middle-chart-main-div">
          <div className="bottom-chart-left-div">
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Expenses Data</p>
                <div className="SortDown-div-bottom">
                  <select
                    sx={{
                      width: "18.8rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={LineChartSessionExpenses}
                    name="LineChartSessionExpenses"
                    onChange={(e) => {
                      getExpensesLineChart(e.target.value);
                      setLineChartSessionExpenses(e.target.value);
                    }}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Short by Session
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
                </div>
              </div>

              <Linechart
                value={"Expenses Data"}
                pdata={LinstExpensesList?.sort(compareExpensesFeeMonths)}
              />
            </div>

            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Expenses Data</p>
                <div className="SortDown-div-bottom">
                  <select
                    sx={{
                      width: "18.8rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={BarCharSessionExpenses}
                    name="BarCharSessionExpenses"
                    onChange={(e) => {
                      getExpensesBarChart(e.target.value);
                      setBarCharSessionExpenses(e.target.value);
                    }}
                    displayEmpty
                  >
                    <option
                      sx={{
                        fontSize: 14,
                      }}
                      value={""}
                    >
                      Short by Session
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
                </div>
              </div>

              <Barchart
                value={"Expenses Data"}
                pdata={BarExpensesList?.sort(compareExpensesFeeMonths)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
