import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export default function PieChart(props) {
  const { productSaleQuantityList } = props;
  ChartJS.register(ArcElement, Tooltip, Legend);
  let productNameArray = [];
  let productQuantitySoldArray = [];
  for (let productName in productSaleQuantityList) {
    productNameArray.push(productName);
    productQuantitySoldArray.push(productSaleQuantityList[productName]);
  }

  const options = {
    responsive: true,
  };

  const data = {
    labels: productNameArray,
    datasets: [
      {
        label: "# of Products Sold",
        data: productQuantitySoldArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} options={options} />;
}
