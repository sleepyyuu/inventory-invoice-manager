import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import "./Invoices.css";

export default function Invoices(props) {
  const { setSelectedCategory } = props;
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [productsLeft, setProductsLeft] = useState([]);
  const [newInvoiceId, setNewInvoiceId] = useState("");
  const [newInvoiceBuyer, setNewInvoiceBuyer] = useState("");
  const [newInvoiceProducts, setNewInvoiceProducts] = useState([]);
  const [newInvoiceDetails, setNewInvoiceDetails] = useState("");
  const [newInvoiceCurrentProduct, setNewInvoiceCurrentProduct] = useState("");
  const [newInvoiceCurrentProductQuantity, setnewInvoiceCurrentProductQuantity] = useState(0);
  const [newInvoiceCurrentProductPrice, setNewInvoiceCurrentProductPrice] = useState(0);
  const [newInvoiceCurrentProductEdit, setNewInvoiceCurrentProductEdit] = useState("");
  const [newInvoiceCurrentProductQuantityEdit, setnewInvoiceCurrentProductQuantityEdit] = useState(0);
  const [newInvoiceCurrentProductPriceEdit, setNewInvoiceCurrentProductPriceEdit] = useState(0);
  const [newInvoiceEdit, setNewInvoiceEdit] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [customError, setCustomError] = useState();
  const route = "/invoices";
  const getInitialDB = async () => {
    // const [responseInvoices, responseBuyers, responseProducts] = await Promise.all([
    //   verify("readAll", route, {}, true),
    //   verify("readAll", "/buyers", {}, true),
    //   verify("readAll", "/products", {}, true),
    // ]);
    const responseInvoices = await verify("readAll", route);
    const responseBuyers = await verify("readAll", "/buyers");
    const responseProducts = await verify("readAll", "/products");
    setInvoices(responseInvoices);
    setBuyers(responseBuyers);
    setProducts(responseProducts);
    setLoading(false);
  };
  const getDB = async () => {
    const responseInvoices = await verify("readAll", route);
    setInvoices(responseInvoices);
    setLoading(false);
  };
  useEffect(() => {
    setSelectedCategory("Invoices");
    getInitialDB();
  }, []);

  const handlePostAction = async (e) => {
    e.preventDefault();
    if (newInvoiceBuyer === "") {
      setCustomError([{ msg: "A buyer is required" }]);
      return;
    }
    if (newInvoiceProducts === []) {
      setCustomError([{ msg: "Products are required" }]);
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
      setCustomError(null);
      setNewInvoiceBuyer("");
      setNewInvoiceProducts([]);
      setNewInvoiceDetails("");
      setNewInvoiceId("");
    } else {
      setCustomError(response);
    }
  };

  const handleEdit = async (invoice) => {
    setCustomError(null);
    setNewInvoiceId(invoice._id);
    setNewInvoiceBuyer(invoice.buyer);
    setNewInvoiceDetails(invoice.details);
    setNewInvoiceProducts(invoice.product);
    setInvoiceNumber((invoice.invoice_number + "").padStart(5, "0"));
    setShowMenu(true);
    setNewInvoiceCurrentProduct(0);
    let indexArray = [];
    for (let i = 0; i < products.length; i++) {
      indexArray.push(i);
    }
    setProductsLeft(indexArray);
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
      setCustomError(response);
    }
  };

  return (
    <div>
      <div className="dashboardInfoHeader">
        <h3 className="infoPageTitle">Invoices</h3>
        <div className="dashboardButtons">
          <button>add thing button</button>
          <button>other button</button>
        </div>
      </div>
    </div>
  );
}
