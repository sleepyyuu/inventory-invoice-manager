import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useState } from "react";

export default function InvoiceDetail() {
  const verify = useVerifyForEndpointAction();
  const [invoice, setInvoice] = useState({});
  const getInitialDB = async () => {
    const responseInvoice = await verify("readAll", "urlparam");
    setInvoice(responseInvoices);
  };
  return <div></div>;
}
