import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function InvoiceDetail(props) {
  const verify = useVerifyForEndpointAction();
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState({});
  const getInitialDB = async () => {
    const responseInvoice = await verify("readAll", "/invoices/" + invoiceId);
    setInvoice(responseInvoice);
  };
  useEffect(() => {
    getInitialDB();
    console.log(invoice);
  });
  return <div></div>;
}
