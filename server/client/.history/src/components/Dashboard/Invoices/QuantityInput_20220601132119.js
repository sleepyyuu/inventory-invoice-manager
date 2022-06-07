export default function QuantityInput(props) {
  const { quantityRef, setNewInvoiceQuantity } = props;
  return (
    <input
      type="text"
      id="invoiceQuantityEdit"
      name="invoiceQuantityEdit"
      pattern="[0-9.]"
      ref={quantityRef}
      onChange={(e) => {
        //handle max quantity if quantity
        let eventValue = e.target.valueAsNumber || e.target.value;
        if (eventValue > products[newInvoiceCurrentProductEdit].quantity) {
          setNewInvoiceQuantity(products[newInvoiceCurrentProductEdit].quantity);
        } else {
          setNewInvoiceQuantity(eventValue);
        }
      }}
      onBlur={(e) => {
        if (!e.target.value) {
          setNewInvoiceQuantity(0);
        } else {
          setNewInvoiceQuantity(Math.round(newInvoiceCurrentProductQuantityEdit * 10) / 10 + "");
        }
      }}
      onKeyPress={(e) => {
        if (!/[0-9.]/.test(e.key)) {
          e.preventDefault();
        }
      }}
      value={setNewInvoiceQuantity}
    ></input>
  );
}
