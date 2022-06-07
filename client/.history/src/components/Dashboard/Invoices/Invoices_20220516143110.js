import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect } from "react";

export default function Invoices() {
  const verifyForEndpointAction = useVerifyForEndpointAction();
  useEffect(() => {
    verifyForEndpointAction;
  }, []);
  return <div>invoices here</div>;
}
