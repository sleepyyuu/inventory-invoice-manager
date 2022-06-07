import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";

export default function Invoices() {
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [newInvoiceId, setNewInvoiceId] = useState("");
  const [newInvoiceBuyer, setNewInvoiceBuyer] = useState({});
  const [newInvoiceProducts, setNewInvoiceProducts] = useState([]);
  const [error, setError] = useState();
  const route = "/invoices";
  const getDB = async () => {
    const [responseInvoices, responseBuyers, responseProducts] = await Promise.all([
      verify("readAll", route),
      verify("readAll", "/buyers"),
      verify("readAll", "/products"),
    ]);
    setInvoices(responseInvoices);
    setBuyers(responseBuyers);
    setProducts(responseProducts);
    setLoading(false);
  };
  useEffect(() => {
    getDB();
  }, []);

  const handlePostAction = async (e) => {
    e.preventDefault();
    if (newProductName === "") {
      setError([{ msg: "Name is required" }]);
      return;
    }
    let response;
    let body = {
      name: newProductName,
      price_range_min: newProductPriceMin,
      price_range_max: newProductPriceMax,
      quantity: newProductQuantity,
    };
    if (menuStateCreate) {
      response = await verify("create", route, body);
    } else {
      body.productId = newProductId;
      response = await verify("update", route + "/" + newProductId, body);
    }
    if (response.status === 200) {
      getDB();
      setShowMenu(false);
      setError(null);
      setNewProductName("");
      setNewProductPriceMin(0);
      setNewProductPriceMax(0);
      setNewProductId("");
    } else {
      setError(response);
    }
  };

  const handleEdit = async (product) => {
    setError(null);
    setNewProductId(product._id);
    setNewProductName(product.name);
    setNewProductQuantity(product.quantity);
    setNewProductPriceMin(product.price_range_min);
    setNewProductPriceMax(product.price_range_max);
    setShowMenu(true);
  };

  const handleDelete = async (id) => {
    let originalArray = products;
    let filteredArray = products.filter((product) => {
      return product._id !== id;
    });
    setProducts(filteredArray);
    const response = await verify("delete", route + "/" + id, { productId: id });
    if (response.status === 200) {
    } else {
      setProducts(originalArray);
      setError(response);
    }
  };

  return loading ? (
    <div>loading..</div>
  ) : (
    <div>
      <div>invoices</div>
      {invoices.map((invoice, counter) => {
        let paddedInvoiceString = "" + invoice.invoice_number;
        paddedInvoiceString = paddedInvoiceString.padStart(5, "0");
        return (
          <div key={counter}>
            <div>
              Invoice number : {paddedInvoiceString} ||| Invoice ID : {invoice._id}
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
