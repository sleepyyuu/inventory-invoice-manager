import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";

export default function Invoices() {
  const verifyForEndpointAction = useVerifyForEndpointAction();
  useEffect(() => {
    verifyForEndpointAction("get", "/invoices");
  }, []);
  return <div>invoices here</div>;
}
