import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

export default function VerticalChart() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let currentMonth = 2;
  const pastSixMonths = [];
  currentMonth -= 6;
  if (currentMonth < 0) {
    currentMonth = 12 + currentMonth;
  }
  for (let i = 0; i < 6; i++) {
    if (currentMonth === 11) {
      currentMonth = 0;
    }
    pastSixMonths.push(months[currentMonth]);
    currentMonth++;
  }
  console.log(pastSixMonths);
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
  };

  const data = {
    pastSixMonths,
    datasets: [
      {
        label: "Monthly sales",
        data: [32, 24, 32],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
