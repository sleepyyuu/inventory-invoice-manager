import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState, useRef } from "react";

export default function Invoices() {
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    const getInvoices = async () => {
      const response = await verify("get", "/invoices");
      console.log(response);
      setInvoices(response);
      setLoading(false);
    };
    getInvoices();
  }, []);
  //make functions for button onclicks, post method, setInvices to after change

  //make loading first, then call route in useeffect
  return loading ? (
    <div>loading..</div>
  ) : (
    <div>
      {invoices.map((invoice, counter) => {
        return (
          <div key={counter}>
            <div>
              Invoice number : {invoice.invoice_number} ||| Invoice ID : {invoice._id}
            </div>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}
