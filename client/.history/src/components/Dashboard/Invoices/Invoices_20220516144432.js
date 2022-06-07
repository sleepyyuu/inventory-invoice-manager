import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";

export default function Invoices() {
  const verifyForEndpointAction = useVerifyForEndpointAction();
  const [loading, isLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    const response = verifyForEndpointAction("get", "/invoices");
    console.log(response);
  }, []);
  //make loading first, then call route in useeffect
  return loading ? <div>loading..</div> : <div>{invoices}</div>;
}
