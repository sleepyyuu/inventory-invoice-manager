import "./Summary.css";
import { useEffect, useState } from "react";
import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";

export default function Summary(props) {
  const verify = useVerifyForEndpointAction();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getDB = async () => {
      const responseInvoices = await verify("readAll", "/invoices");
      setInvoices(responseInvoices);
    };
    getDB();
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
            <div>sales per week graph</div>
            <div>pie chart product sold</div>
          </div>
        </div>
      </div>
    </div>
  );
}
