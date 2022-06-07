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
  const pageStyle = `#invoice {
    display: flex;
    flex-direction: column;
    padding: 50px 65px;
    font-size: 1.3rem;
  }
  
  #invoiceTitle {
    font-family: "Alegreya Sans SC", sans-serif;
    font-size: 4rem;
    padding: 0;
  }
  
  .disclaimer {
    font-weight: bold;
    padding-bottom: 3px;
    color: rgb(32, 40, 134);
  }
  
  #invoiceHeader {
    display: flex;
    justify-content: space-between;
  }
  
  #invoiceMiscDetail {
    display: flex;
    justify-content: space-between;
  }
  
  #invoiceSmallDetails {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  #invoiceProducts {
    border-top: 2px solid rgb(32, 40, 134);
    border-bottom: 2px solid rgb(32, 40, 134);
    padding: 10px 0;
    margin: 30px 0 20px;
    height: 400px;
  }
  
  #printInvoiceHead {
    border: none;
  }
  
  #printInvoiceHeadtr > th {
    color: rgb(32, 40, 134);
  }
  
  #printInvoiceBodytr > td {
    border: none;
  }
  
  @page {
    size: A4;
    margin: 0;
  }
  @media print {
    html,
    body {
      width: 210mm;
      height: 297mm;
    }
  }`;
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
      <div id="invoice" ref={printPageRef} pageStyle={pageStyle}>
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
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.product.map((prod) => {
                return (
                  <tr key={uniqid()} id="printInvoiceBodytr">
                    <td>{prod.name}</td>
                    <td>{prod.quantity.toFixed(1)}</td>
                    <td>${prod.price.toFixed(2)}</td>
                    <td>${(prod.quantity * prod.price).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div id="invoicePriceAdjustments"></div>
        <div id="invoicePriceTotal">total price</div>
        <div id="invoiceNotes"></div>
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