import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useState } from "react";

export default function InvoiceDetail() {
  const verify = useVerifyForEndpointAction();
  const [invoice, setInvoice] = useState({});
  const getInitialDB = async () => {
    const responseInvoices = await verify("readAll", "urlparam");
    setInvoices(responseInvoices);
  };
  return <div></div>;
}
