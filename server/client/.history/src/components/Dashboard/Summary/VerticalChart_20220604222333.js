import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

export default function VerticalChart() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const months = ["January", "February", "March", "April", "May", "June", "July"];
  const currentMonth = new Date().getMonth();
  const pastSixMonths = months.slice(currentMonth - 6).concat(months.slice(0, currentMonth));
  console.log(currentMonth);
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
