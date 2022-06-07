export default function QuantityInput(props) {
  const { quantityRef, newInvoiceQuantity, setNewInvoiceQuantity, quantityStock, identifier } = props;
  return (
    <input
      type="text"
      id={identifier}
      name={identifier}
      pattern="[0-9.]"
      ref={quantityRef ? quantityRef : null}
      onChange={(e) => {
        if (Number(e.target.value) > quantityStock) {
          setNewInvoiceQuantity(quantityStock.toFixed(1));
        } else {
          console.log(typeof e.target.value);
          setNewInvoiceQuantity(e.target.value);
        }
      }}
      onBlur={(e) => {
        if (!e.target.value || Number(e.target.value) === 0) {
          setNewInvoiceQuantity("0.0");
        } else {
          setNewInvoiceQuantity(Number(newInvoiceQuantity).toFixed(1));
        }
      }}
      value={newInvoiceQuantity}
    ></input>
  );
}
