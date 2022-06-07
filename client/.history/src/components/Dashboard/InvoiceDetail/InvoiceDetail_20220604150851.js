import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import uniqid from "uniqid";
import { FaPrint } from "react-icons/fa";
import "./InvoiceDetail.css";

export default function InvoiceDetail(props) {
  const { finishedLoading } = props;
  const verify = useVerifyForEndpointAction();
  const companyInfo = {
    name: "test company name",
    address: "13255 Etc Rd",
    city: "San Diego",
    state: "CA",
    zip: "49204",
    phoneNumber: "424-244-2424",
  };
  const pageStyle = ``;
  const { invoiceId } = useParams();
  const printPageRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printPageRef.current });

  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(true);

  const getInitialDB = async () => {
    const responseInvoice = await verify("readAll", "/invoices/" + invoiceId);
    setInvoice(responseInvoice);
    setLoading(false);
    finishedLoading();
  };

  useEffect(() => {
    getInitialDB();
  }, []);

  return loading ? null : (
    <div id="page">
      <div id="invoiceButtons">
        <div id="printButtonContainer">
          <FaPrint onClick={handlePrint} id="printButton" size="40"></FaPrint>
        </div>
      </div>
      <div id="invoice" ref={printPageRef}>
        <div id="invoiceHeader">
          <h3 id="invoiceTitle">Invoice</h3>
          <div id="sellerInfo">
            <div id="sellerName">{companyInfo.name}</div>
            <div id="sellerAddress">
              <div className="address">{companyInfo.address}</div>
              <div className="city">{companyInfo.city + ", " + companyInfo.state + " " + companyInfo.zip}</div>
            </div>
          </div>
        </div>
        <div id="invoiceMiscDetail">
          <div id="customerDetail">
            <div id="invoiceBillTo" className="disclaimer">
              Bill To:
            </div>
            <div id="customerName">{invoice.buyer_name}</div>
            <div id="customerAddress">
              <div className="address">{invoice.buyer_address.address}</div>
              <div className="city">
                {invoice.buyer_address.city + ", " + invoice.buyer_address.state + " " + invoice.buyer_address.zip}
              </div>
            </div>
          </div>
          <div id="invoiceSmallDetails">
            <div id="invoiceDateContainer">
              <div id="invoiceDateTitle" className="disclaimer">
                Date:
              </div>
              <div id="invoiceDate">{new Date(invoice.date_created).toLocaleDateString()}</div>
            </div>
            <div id="invoiceNumberContainer">
              <div id="invoiceNumberTitle" className="disclaimer">
                Invoice No:
              </div>
              <div id="invoiceNumber">{(invoice.invoice_number + "").padStart(5, "0")}</div>
            </div>
          </div>
        </div>
        <div id="invoiceProducts">
          <table>
            <thead id="printInvoiceHead">
              <tr id="printInvoiceHeadtr">
                <th id="itemHeader">Item</th>
                <th className="priceDescription">Quantity</th>
                <th className="priceDescription">Unit Cost</th>
                <th className="priceDescription">Unit Discount</th>
                <th className="priceDescription">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.product.map((prod) => {
                return (
                  <tr key={uniqid()} id="printInvoiceBodytr">
                    <td id="itemDescription">{prod.name}</td>
                    <td className="priceDescription">{prod.quantity.toFixed(1)}</td>
                    <td className="priceDescription">${prod.price.toFixed(2)}</td>
                    <td className="priceDescription">-${prod.discountPerUnit.toFixed(2)}</td>
                    <td className="priceDescription">${(prod.quantity * prod.price - prod.quantity * prod.discountPerUnit).toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr className="pricingInfo" id="subtotal">
                <td></td>
                <td></td>
                <td></td>
                <td className="priceInfoDetail">Subtotal</td>
                <td className="priceInfoDetail">${invoice.total.toFixed(2)}</td>
              </tr>
              <tr className="pricingInfo">
                <td></td>
                <td></td>
                <td></td>
                <td className="priceInfoDetail">Tax ({invoice.tax_rate}%)</td>
                <td className="priceInfoDetail">+${((invoice.total * invoice.tax_rate) / 100).toFixed(2)}</td>
              </tr>
              <tr className="pricingInfo">
                <td></td>
                <td></td>
                <td></td>
                <td>Other discounts (-15%)</td>
                <td>${invoice.total}</td>
              </tr>
              <tr className="pricingInfo">
                <td></td>
                <td></td>
                <td></td>
                <td className="totalInfo priceInfoDetail">Total Due</td>
                <td className="totalInfo priceInfoDetail">${(invoice.total + (invoice.total * invoice.tax_rate) / 100).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
