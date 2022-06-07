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
    state: "California",
    zip: "49204",
    phoneNumber: "424-244-2424",
  };
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(true);

  const getInitialDB = async () => {
    const responseInvoice = await verify("readAll", "/invoices/" + invoiceId);
    setInvoice(responseInvoice);
    setLoading(false);
  };

  useEffect(() => {
    getInitialDB();
  }, []);

  return loading ? <div>loading...</div> : <div className="invoice">invoice</div>;
}
