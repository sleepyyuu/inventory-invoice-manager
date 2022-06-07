import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";

export default function Invoices() {
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [newInvoiceId, setNewInvoiceId] = useState("");
  const [newInvoiceBuyer, setNewInvoiceBuyer] = useState("");
  const [newInvoiceProducts, setNewInvoiceProducts] = useState([]);
  const [newInvoiceDetails, setNewInvoiceDetails] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [error, setError] = useState();
  const route = "/invoices";
  const getDB = async () => {
    const [responseInvoices, responseBuyers, responseProducts] = await Promise.all([
      verify("readAll", route),
      verify("readAll", "/buyers"),
      verify("readAll", "/products"),
    ]);
    setInvoices(responseInvoices);
    setInvoiceNumber(responseInvoices.length);
    setBuyers(responseBuyers);
    setProducts(responseProducts);
    setLoading(false);
  };
  useEffect(() => {
    getDB();
  }, []);

  const handlePostAction = async (e) => {
    e.preventDefault();
    if (newInvoiceBuyer === "") {
      setError([{ msg: "A buyer is required" }]);
      return;
    }
    if (newInvoiceProducts === []) {
      setError([{ msg: "Products are required" }]);
      return;
    }
    let response;
    let body = {
      buyer: newInvoiceBuyer,
      //array of product id's
      product: newInvoiceProducts,
    };
    if (newInvoiceDetails !== "") {
      body.details = newInvoiceDetails;
    }
    if (menuStateCreate) {
      response = await verify("create", route, body);
    } else {
      body.invoiceId = newInvoiceId;
      response = await verify("update", route + "/" + newInvoiceId, body);
    }
    if (response.status === 200) {
      getDB();
      setShowMenu(false);
      setError(null);
      setNewInvoiceBuyer({});
      setNewInvoiceProducts([]);
      setNewInvoiceDetails("");
      setNewInvoiceId("");
    } else {
      setError(response);
    }
  };

  const handleEdit = async (invoice) => {
    setError(null);
    setNewInvoiceId(invoice._id);
    setNewInvoiceBuyer(invoice.buyer);
    setNewInvoiceDetails(invoice.details);
    setNewInvoiceProducts(invoice.product);
    setShowMenu(true);
  };

  const handleDelete = async (id) => {
    let originalArray = products;
    let filteredArray = products.filter((invoice) => {
      return invoice._id !== id;
    });
    setInvoices(filteredArray);
    const response = await verify("delete", route + "/" + id, { invoiceId: id });
    if (response.status === 200) {
    } else {
      setInvoices(originalArray);
      setError(response);
    }
  };

  return loading ? (
    <div>loading..</div>
  ) : (
    <div>
      <div>Invoices</div>
      {error && !showMenu ? <div>{error}</div> : null}
      {invoices.map((invoice) => {
        let paddedInvoiceString = "" + invoice.invoice_number;
        paddedInvoiceString = paddedInvoiceString.padStart(5, "0");
        return (
          <div key={uniqid()}>
            <div>
              Invoice Number: {paddedInvoiceString} ||| Buyer: {invoice.buyer_name} ||| invoice ID : {invoice._id}
              <button
                onClick={() => {
                  handleEdit(invoice);
                  setmenuStateCreate(false);
                }}
              >
                edit
              </button>
              <button
                onClick={() => {
                  handleDelete(invoice._id);
                }}
              >
                delete
              </button>
            </div>
            <br></br>
          </div>
        );
      })}
      <button
        onClick={() => {
          setError(null);
          setmenuStateCreate(true);
          setShowMenu(true);
        }}
      >
        add a invoice
      </button>
      {showMenu ? (
        <div>
          <form>
            <div>
              {error ? (
                <div>
                  {error.map((err) => {
                    return (
                      <div key={uniqid()}>
                        <div>{err.msg}</div>
                        <br></br>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <div>Invoice Number : {invoiceNumber}</div>
              <label htmlFor="invoiceBuyer">To :</label>
              <select id="invoiceBuyer" name="invoiceBuyer">
                {buyers.map((buyer) => {
                  return <option value={buyer.company_name}>buyer.company_name</option>;
                })}
              </select>
            </div>
            <button
              onClick={(e) => {
                handlePostAction(e);
              }}
            >
              {menuStateCreate ? "add invoice" : "update invoice"}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
