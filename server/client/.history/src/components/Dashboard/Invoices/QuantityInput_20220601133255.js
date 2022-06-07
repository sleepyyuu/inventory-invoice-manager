export default function QuantityInput(props) {
  const { quantityRef, newInvoiceQuantity, setNewInvoiceQuantity, quantityStock, identifier } = props;
  return (
    <input
      type="text"
      id={identifier}
      name={identifier}
      pattern="[0-9.]"
      ref={quantityRef}
      onChange={(e) => {
        if (Number(e.target.value) > quantityStock) {
          setNewInvoiceQuantity(quantityStock);
        } else {
          setNewInvoiceQuantity(e.target.value);
        }
      }}
      onBlur={(e) => {
        if (!e.target.value) {
          setNewInvoiceQuantity("0.0");
        } else {
          setNewInvoiceQuantity(newInvoiceQuantity.toFixed(1));
        }
      }}
      value={newInvoiceQuantity}
    ></input>
  );
}
