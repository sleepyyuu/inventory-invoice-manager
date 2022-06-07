import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./InvoiceDetail.css";

export default function InvoiceDetail(props) {
  const verify = useVerifyForEndpointAction();
  const companyInfo = {
    name: "test company name",
    address: "13255 Etc Rd",
    city: "San Diego",
    state: "CA",
    zip: "49204",
    phoneNumber: "424-244-2424",
  };
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(true);

  const getInitialDB = async () => {
    const responseInvoice = await verify("readAll", "/invoices/" + invoiceId);
    console.log(responseInvoice);
    setInvoice(responseInvoice);
    setLoading(false);
  };

  useEffect(() => {
    getInitialDB();
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : (
    <div id="invoice">
      <div id="invoiceHeader">
        <h3 id="invoiceTitle">Invoice</h3>
        <div id="sellerInfo">
          <div id="sellerName">{companyInfo.name}</div>
          <div id="sellerAddress">
            <div className="address">{companyInfo.address}</div>
            <div className="city">{companyInfo.city + ", " + companyInfo.state + " " + companyInfo.zip}</div>
            <div className="zip">{companyInfo.zip}</div>
          </div>
        </div>
      </div>
      <div id="invoiceMiscDetail">
        <div id="invoiceBillTo">Bill To:</div>
        <div id="customerDetail">
          <div id="customerName">{invoice.buyer_name}</div>
          <div id="customerAddress">
            <div className="address">{companyInfo.address}</div>
            <div className="city">{companyInfo.city + ", " + companyInfo.state + " " + companyInfo.zip}</div>
            <div className="zip">{companyInfo.zip}</div>
          </div>
        </div>
        <div id="invoiceNumber">{invoice.invoice_number}</div>
        <div id="invoiceDate">{new Date(invoice.date_created).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
