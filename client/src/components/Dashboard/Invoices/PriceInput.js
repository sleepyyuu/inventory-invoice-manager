export default function PriceInput(props) {
  const { priceRef, newInvoicePrice, setNewInvoicePrice, identifier } = props;
  return (
    <input
      type="text"
      id={identifier}
      name={identifier}
      ref={priceRef ? priceRef : null}
      value={newInvoicePrice}
      onChange={(e) => {
        setNewInvoicePrice(e.target.value);
      }}
      onBlur={(e) => {
        if (!e.target.value || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
          setNewInvoicePrice("0.00");
        } else {
          setNewInvoicePrice(Number(newInvoicePrice).toFixed(2));
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
