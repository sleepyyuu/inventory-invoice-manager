import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

export default function VerticalChart(props) {
  const { invoices } = props;
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let currentMonth = 3;
  const pastSixMonths = [];
  const yearMonths = [];
  let year = new Date().getFullYear();
  currentMonth -= 5;
  if (currentMonth < 0) {
    year--;
    currentMonth = 12 + currentMonth;
  }
  for (let i = 0; i < 6; i++) {
    pastSixMonths.push(months[currentMonth]);
    yearMonths.push(year + months[currentMonth]);
    if (currentMonth === 11) {
      year++;
      currentMonth = 0;
    } else {
      currentMonth++;
    }
  }
  console.log(yearMonths);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly sales",
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return "$ " + value;
          },
        },
      },
    },
  };

  const data = {
    labels: pastSixMonths,
    datasets: [
      {
        label: "Monthly sales (Dollars)",
        data: [32, 24, 32, 24, 24, 24],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return invoices === null ? null : <Bar options={options} data={data} />;
}
