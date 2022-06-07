export default function InputBox() {
  return (
    <div>
      <label htmlFor="invoiceQuantityEdit"></label>
      <input type="number" id="invoiceQuantityEdit" step="0.01" name="invoiceQuantityEdit"></input>
    </div>
  );
}
