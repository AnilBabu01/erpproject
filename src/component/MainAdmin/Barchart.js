import React from "react";
import { Bar } from "react-chartjs-2";

const Barchart = ({ value, pdata }) => {
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
  const data = {
    labels: labels,
    datasets: [
      {
        label: value,
        backgroundColor: "#5ECD07",
        borderColor: "#5ECD07",
        data:allMonths?.sort(compareExpensesFeeMonths)?.map((monthNumber) => {
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
      <Bar data={data} />
    </>
  );
};

export default Barchart;
