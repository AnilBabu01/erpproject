import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Barchart = ({ value }) => {
  const labels = [
    "May 2022",
    "June 2022",
    "July 2022",
    "April 2022",
    "July 2022",
    "Sep 2022",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: value,
        backgroundColor: "#5ECD07",
        borderColor: "#5ECD07",
        data: [5, 10, 5, 28, 20, 30, 45],
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
