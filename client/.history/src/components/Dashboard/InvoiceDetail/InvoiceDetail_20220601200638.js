import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useState, useEffect } from "react";

export default function InvoiceDetail(props) {
  const verify = useVerifyForEndpointAction();
  const [invoice, setInvoice] = useState({});
  const getInitialDB = async () => {
    const responseInvoice = await verify("readAll", "/invoices/sds");
    setInvoice(responseInvoice);
  };
  useEffect(() => {
    getInitialDB();
    console.log(invoice);
  });
  return <div></div>;
}
