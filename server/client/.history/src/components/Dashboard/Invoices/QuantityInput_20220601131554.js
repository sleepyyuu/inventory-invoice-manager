export default function QuantityInput(props) {
  return (
    <input
      type="number"
      id="invoiceQuantityEdit"
      step="0.01"
      name="invoiceQuantityEdit"
      ref={quantityRef}
      max={products[newInvoiceCurrentProductEdit].quantity}
      onChange={(e) => {
        let eventValue = e.target.valueAsNumber || e.target.value;
        if (eventValue > products[newInvoiceCurrentProductEdit].quantity) {
          setnewInvoiceCurrentProductQuantityEdit(products[newInvoiceCurrentProductEdit].quantity);
        } else {
          setnewInvoiceCurrentProductQuantityEdit(eventValue);
        }
      }}
      onBlur={(e) => {
        if (!e.target.value) {
          setnewInvoiceCurrentProductQuantityEdit(0);
        } else {
          setnewInvoiceCurrentProductQuantityEdit(Math.round(newInvoiceCurrentProductQuantityEdit * 10) / 10 + "");
        }
      }}
      onKeyPress={(e) => {
        if (!/[0-9.]/.test(e.key)) {
          e.preventDefault();
        }
      }}
      value={newInvoiceCurrentProductQuantityEdit}
    ></input>
  );
}
