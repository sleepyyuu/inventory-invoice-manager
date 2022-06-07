import "./Summary.css";
import "./VerticalChart";
import { useEffect, useState } from "react";
import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import VerticalChart from "./VerticalChart";

export default function Summary(props) {
  const verify = useVerifyForEndpointAction();
  const [invoices, setInvoices] = useState([]);
  const [monthArray, setMonthArray] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [pastSixMonthArray, setPastSixMonthArray] = useState([]);

  useEffect(() => {
    const getDB = async () => {
      const responseInvoices = await verify("readAll", "/invoices");
      setInvoices(responseInvoices);
    };

    const getSixMonthData = () => {
      let currentMonth = new Date().getMonth();
      const pastSixMonths = [];
      const yearMonths = {};
      const monthlySales = [0, 0, 0, 0, 0, 0];
      let year = new Date().getFullYear();
      currentMonth -= 5;
      if (currentMonth < 0) {
        year--;
        currentMonth = 12 + currentMonth;
      }
      for (let i = 0; i < 6; i++) {
        pastSixMonths.push(monthArray[currentMonth]);
        yearMonths[monthArray[currentMonth]] = year;
        if (currentMonth === 11) {
          year++;
          currentMonth = 0;
        } else {
          currentMonth++;
        }
      }
      setPastSixMonthArray(pastSixMonths);
      for (let invoice of invoices) {
        let invoiceCreatedDate = new Date(invoice.date_created);
        let invoiceCreatedYear = invoiceCreatedDate.getFullYear();
        let invoiceCreatedMonth = monthArray[invoiceCreatedDate.getMonth()];
        if (yearMonths[String(invoiceCreatedMonth)] === invoiceCreatedYear) {
          console.log("test");
          let foundIndex = pastSixMonths.findIndex((month) => {
            return month === invoiceCreatedMonth;
          });
          monthlySales[foundIndex] = monthlySales[foundIndex] + invoice.total;
        } else {
          break;
        }
      }
    };
    getDB();
    getSixMonthData();
  }, []);
  return (
    <div>
      <div className="dashboardInfoHeaderContainer">
        <div className="dashboardInfoHeader">
          <h3 className="infoPageTitle">Welcome back, user</h3>
        </div>
      </div>
      <div className="tablePadding">
        {" "}
        <div id="dashboardInfo">
          <div id="overviewTitle">Overview</div>
          <div id="chartContainer">
            <div>
              <VerticalChart invoices={invoices} />
            </div>
            <div>pie chart product sold</div>
          </div>
        </div>
      </div>
    </div>
  );
}
