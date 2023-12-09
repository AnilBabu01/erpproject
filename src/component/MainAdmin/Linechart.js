import React from "react";
import { Line } from "react-chartjs-2";

const labels = [
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "March",
];
const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);
const compareExpensesFeeMonths = (a, b) => {
  const monthsOrder = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];

  return monthsOrder.indexOf(a) - monthsOrder.indexOf(b);
};
const Linechart = ({ value, pdata }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: value,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: allMonths?.sort(compareExpensesFeeMonths)?.map((monthNumber) => {
          // Find the data for the current month
          const dataForMonth = pdata.find(
            (data) => data.MonthNO === monthNumber
          );

          // Display the data if it exists, otherwise display 0
          const displayValue = dataForMonth ? dataForMonth?.total : 0;
          return displayValue;
        }),
      },
    ],
  };
  return (
    <>
      <Line data={data} />
    </>
  );
};

export default Linechart;
