import "./Summary.css";
import PieChart from "./PieChart";
import { useEffect, useState } from "react";
import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import VerticalChart from "./VerticalChart";
import useAuth from "../../../hooks/useAuth";

export default function Summary(props) {
  const { auth } = useAuth();
  const verify = useVerifyForEndpointAction();
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
  const [invoices, setInvoices] = useState([]);
  const [pastSixMonthArray, setPastSixMonthArray] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [productSaleQuantityList, setProductSaleQuantityList] = useState({});
  const [selectedMonthFrame, setSelectedMonthFrame] = useState(6);

  useEffect(() => {
    const getDB = async () => {
      const responseInvoices = await verify("readAll", "/invoices");
      setInvoices(responseInvoices);
    };
    getDB();
  }, []);

  useEffect(() => {
    const getPastMonthData = (responseInvoices, pastMonths) => {
      let currentMonth = new Date().getMonth();
      const pastSixMonths = [];
      const yearMonths = {};
      const monthlySalesTemp = Array(pastMonths).fill(0);
      let productSoldList = {};
      let year = new Date().getFullYear();
      currentMonth -= pastMonths - 1;
      if (currentMonth < 0) {
        year--;
        currentMonth = 12 + currentMonth;
      }
      for (let i = 0; i < pastMonths; i++) {
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
      for (let invoice of responseInvoices) {
        let invoiceCreatedDate = new Date(invoice.date_created);
        let invoiceCreatedYear = invoiceCreatedDate.getFullYear();
        let invoiceCreatedMonth = monthArray[invoiceCreatedDate.getMonth()];
        if (yearMonths[String(invoiceCreatedMonth)] === invoiceCreatedYear) {
          let foundIndex = pastSixMonths.findIndex((month) => {
            return month === invoiceCreatedMonth;
          });
          monthlySalesTemp[foundIndex] = monthlySalesTemp[foundIndex] + invoice.total;
          for (let product of invoice.product) {
            if (!productSoldList[product.name]) {
              productSoldList[product.name] = product.quantity * product.price;
            } else {
              productSoldList[product.name] += product.quantity * product.price;
            }
          }
        } else {
          break;
        }
      }
      setProductSaleQuantityList(productSoldList);
      setMonthlySales(monthlySalesTemp);
    };
    getPastMonthData(invoices, selectedMonthFrame);
  }, [selectedMonthFrame, invoices]);
  return (
    <div>
      <div className="dashboardInfoHeaderContainer">
        <div className="dashboardInfoHeader">
          <h3 className="infoPageTitle" data-aos="fade-down">
            Welcome back, <div id="infoPageCompanyName">{auth.info.company_name}</div>
          </h3>
        </div>
      </div>
      <div className="tablePadding">
        {" "}
        <div id="dashboardInfo">
          <div>
            <div id="timeframeButtonContainer" data-aos="fade-left">
              <div id="timeframeTitle">Timeframe Dashboard</div>
              <div
                className={selectedMonthFrame === 6 ? "timeframeButton selectedtimeframeButton" : "timeframeButton"}
                onClick={() => {
                  setSelectedMonthFrame(6);
                }}
              >
                6 month
              </div>
              <div
                className={selectedMonthFrame === 3 ? "timeframeButton selectedtimeframeButton" : "timeframeButton"}
                onClick={() => {
                  setSelectedMonthFrame(3);
                }}
              >
                3 month
              </div>
              <div
                className={selectedMonthFrame === 1 ? "timeframeButton selectedtimeframeButton" : "timeframeButton"}
                onClick={() => {
                  setSelectedMonthFrame(1);
                }}
              >
                1 month
              </div>
            </div>
          </div>

          <div id="chartContainer">
            <div className="chartCard">
              <PieChart productSaleQuantityList={productSaleQuantityList} selectedMonthFrame={selectedMonthFrame}></PieChart>
            </div>
            <div className="chartCard">
              <VerticalChart pastSixMonthArray={pastSixMonthArray} monthlySales={monthlySales} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
