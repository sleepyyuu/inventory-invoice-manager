import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState, useRef } from "react";

export default function Products() {
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const isInitialMount = useRef(true);
  const getDB = async () => {
    const responseProducts = verify("get", "/products");
    setProducts(responseProducts);
    setLoading(false);
  };
  useEffect(() => {
    getDB();
  }, []);

  //make functions for button onclicks, post method, setInvices to after change
  const handleAdd = () => {};
  return loading ? (
    <div>loading..</div>
  ) : (
    <div>
      <div>products</div>
      {products.map((invoice, counter) => {
        return (
          <div key={counter}>
            <div>
              Invoice number : {invoice.invoice_number} ||| Invoice ID : {invoice._id}
            </div>
            <br></br>
          </div>
        );
      })}
      <button
        onClick={() => {
          setShowMenu(true);
        }}
      >
        add an invoice
      </button>
      {showMenu ? (
        <div>
          <form>
            <label htmlFor="Buyer">Buyer</label>
            <select id="Buyer">
              {buyers.map((buyer, counter) => {
                return (
                  <option key={counter} name={buyer.company_name}>
                    {buyer.company_name}
                  </option>
                );
              })}
            </select>
            <label htmlFor="Product">Product</label>
            <select id="Product">
              {products.map((product, counter) => {
                return (
                  <option key={counter} name={product.company_name}>
                    {product.name}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
      ) : null}
    </div>
  );
}
