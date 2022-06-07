export default function QuantityInput(props) {
  const { quantityRef, newInvoiceQuantity, setNewInvoiceQuantity, quantityStock, identifier } = props;
  return (
    <input
      type="text"
      id={identifier}
      name={identifier}
      pattern="[0-9.]"
      ref={quantityRef ? quantityRef : null}
      value={newInvoiceQuantity}
      onChange={(e) => {
        console.log(quantityStock);
        if (Number(e.target.value) > quantityStock) {
          setNewInvoiceQuantity(quantityStock.toFixed(1));
        } else {
          setNewInvoiceQuantity(e.target.value);
        }
      }}
      onBlur={(e) => {
        if (!e.target.value || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
          setNewInvoiceQuantity("0.0");
        } else {
          setNewInvoiceQuantity(Number(newInvoiceQuantity).toFixed(1));
        }
      }}
      onKeyPress={(e) => {
        if (!/[0-9.]/.test(e.key)) {
          e.preventDefault();
        }
      }}
    ></input>
  );
}
