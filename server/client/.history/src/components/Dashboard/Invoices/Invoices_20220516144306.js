import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";

export default function Invoices() {
  const verifyForEndpointAction = useVerifyForEndpointAction();
  const [loading, isLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    verifyForEndpointAction("get", "/invoices");
  }, []);
  //make loading first, then call route in useeffect
  return loading ? <div>loading..</div> : <div></div>;
}
