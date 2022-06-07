import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function InvoiceDetail(props) {
  const verify = useVerifyForEndpointAction();
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
  return loading ? <div>loading...</div> : <div>invoice</div>;
}
