import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";

export default function Invoices() {
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    const getInvoices = async () => {
      const response = await verify("get", "/invoices");
      setInvoices(response);
    };
    getInvoices();
  }, []);
  //make loading first, then call route in useeffect
  return loading ? <div>loading..</div> : <div>{invoices}</div>;
}
