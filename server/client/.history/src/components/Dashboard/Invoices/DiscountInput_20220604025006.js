export default function DiscountInput(props) {
  const { discountRef, newInvoiceDiscount, setNewInvoiceDiscount, identifier } = props;
  return (
    <input
      type="text"
      id={identifier}
      name={identifier}
      ref={discountRef ? discountRef : null}
      value={newInvoiceDiscount}
      onChange={(e) => {
        setNewInvoiceDiscount(e.target.value);
      }}
      onBlur={(e) => {
        if (!e.target.value || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
          setNewInvoiceDiscount("0.00");
        } else {
          setNewInvoiceDiscount(Number(newInvoiceDiscount).toFixed(2));
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
