import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import uniqid from "uniqid";
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
  const pageStyle = ``;
  const { invoiceId } = useParams();
  const printPageRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printPageRef.current });

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
    <div id="page">
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
              <div className="address">{companyInfo.address}</div>
              <div className="city">{companyInfo.city + ", " + companyInfo.state + " " + companyInfo.zip}</div>
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
                    <td className="priceDescription">${(prod.quantity * prod.price).toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr className="pricingInfo">
                <td></td>
                <td></td>
                <td>Subtotal</td>
                <td>{invoice.total}</td>
              </tr>
              <tr className="pricingInfo">
                <td></td>
                <td></td>
                <td>Tax</td>
                <td>{invoice.total}</td>
              </tr>
              <tr className="pricingInfo">
                <td></td>
                <td></td>
                <td>Adjustments</td>
                <td>{invoice.total}</td>
              </tr>
              <tr className="pricingInfo">
                <td></td>
                <td></td>
                <td>Total Due</td>
                <td>{invoice.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="pricingContainer">
          <div id="invoicePriceSubtotal">Subtotal {invoice.total}</div>
          <div id="invoicePriceTax">Tax</div>
          <div id="invoicePriceAdjustments">Adjustments</div>
          <div id="invoicePriceTotal">total price</div>
          <div id="invoiceNotes"></div>
        </div>
      </div>
      <div id="invoiceButtons">
        <div id="printButtonContainer">
          <button id="printButton" onClick={handlePrint}>
            print/save
          </button>
        </div>
      </div>
    </div>
  );
}
