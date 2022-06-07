import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export default function PieChart() {
  ChartJS.register(ArcElement, Tooltip, Legend);
}
