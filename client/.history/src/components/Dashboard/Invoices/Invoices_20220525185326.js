import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import "./Invoices.css";
import Header from "../Header/Header";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Popup from "reactjs-popup";

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
  const [newInvoiceBuyerId, setNewInvoiceBuyerId] = useState("");
  const [newInvoiceBuyerName, setNewInvoiceBuyerName] = useState("");
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
  const title = "Invoices";
  const route = "/invoices";
  const companyName = "Company Name";
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
    if (newInvoiceBuyerId === "") {
      setCustomError([{ msg: "A buyer is required" }]);
      return;
    }
    if (newInvoiceProducts === []) {
      setCustomError([{ msg: "Products are required" }]);
      return;
    }
    let response;
    let body = {
      buyer: newInvoiceBuyerId,
      //array of product id's
      product: newInvoiceProducts,
      buyer_name: newInvoiceBuyerName,
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
      setNewInvoiceBuyerId(buyers[0]._id);
      setNewInvoiceProducts([]);
      setNewInvoiceDetails("");
      setNewInvoiceId("");
      setNewInvoiceBuyerName(buyers[0].company_name);
    } else {
      setCustomError(response);
    }
  };

  const handleEdit = async (invoice) => {
    setCustomError(null);
    setNewInvoiceId(invoice._id);
    setNewInvoiceBuyerId(invoice.buyer);
    setNewInvoiceBuyerName(invoice.buyer_name);
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

  const handleAdd = () => {
    setCustomError(null);
    setmenuStateCreate(true);
    setNewInvoiceBuyerId(buyers[0]._id);
    setNewInvoiceProducts([]);
    setNewInvoiceDetails("");
    setNewInvoiceId("");
    if (invoices.length === 0) {
      setInvoiceNumber("00000");
    } else {
      setInvoiceNumber((invoices[0].invoice_number + 1 + "").padStart(5, "0"));
    }
    setNewInvoiceBuyerName(buyers[0].company_name);
    setShowMenu(true);
    setNewInvoiceCurrentProduct(0);
    let indexArray = [];
    for (let i = 0; i < products.length; i++) {
      indexArray.push(i);
    }
    setProductsLeft(indexArray);
  };

  const handleDelete = async (id) => {
    let originalArray = invoices;
    let filteredArray = invoices.filter((invoice) => {
      return invoice._id !== id;
    });
    const response = await verify("delete", route + "/" + id, { invoiceId: id });
    if (response.status === 200) {
      setInvoices(filteredArray);
    } else {
      setInvoices(originalArray);
      setCustomError(response);
    }
  };

  return (
    <div>
      <div className="dashboardInfoHeaderContainer">
        <div className="dashboardInfoHeader">
          <h3 className="infoPageTitle">{title}</h3>
          <div className="dashboardButtons">
            <button
              className="addNewButton"
              onClick={() => {
                handleAdd();
                setShowMenu(true);
              }}
            >
              + New {title.slice(0, title.length - 1)}
            </button>
            <Popup
              overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
              modal
              open={showMenu}
              closeOnDocumentClick
              className="invoice-popup"
              onClose={() => {
                setShowMenu(false);
              }}
            >
              {(close) => {
                return (
                  <div className="modal invoice">
                    <button
                      className="modalClose"
                      onClick={() => {
                        setShowMenu(false);
                      }}
                    >
                      &times;
                    </button>
                    <div className="modalHeader"> {menuStateCreate ? "Add invoice" : "Update invoice"} </div>
                    <div className="modalContent">
                      <form>
                        <div>
                          {customError ? (
                            <div>
                              {customError.map((err) => {
                                return (
                                  <div key={uniqid()}>
                                    <div>{err.msg}</div>
                                    <br></br>
                                  </div>
                                );
                              })}
                            </div>
                          ) : null}
                          <div className="invoiceConstants">
                            <fieldset>
                              <legend>Invoice Number</legend>
                              <div className="invoiceConstantValue">{invoiceNumber}</div>
                            </fieldset>
                            <fieldset>
                              <legend>Date</legend>
                              <div className="invoiceConstantValue">{new Date().toLocaleDateString()}</div>
                            </fieldset>
                          </div>
                          <div className="invoiceToFrom">
                            <fieldset>
                              <legend>To:</legend>
                              <label htmlFor="invoiceBuyer"></label>
                              <select
                                id="invoiceBuyer"
                                name="invoiceBuyer"
                                onChange={(e) => {
                                  setNewInvoiceBuyerName(e.target.value);
                                  setNewInvoiceBuyerId(
                                    buyers.find((element) => {
                                      return element.company_name === e.target.value;
                                    })._id
                                  );
                                }}
                                value={newInvoiceBuyerName}
                              >
                                {buyers.map((buyer) => {
                                  return (
                                    <option value={buyer.company_name} key={uniqid()}>
                                      {buyer.company_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </fieldset>
                            <fieldset>
                              <legend>From</legend>
                              <div className="invoiceConstantValue">{companyName}</div>
                            </fieldset>
                          </div>
                          <fieldset className="invoiceProducts">
                            <legend>Items</legend>
                            <div>
                              <div className="invoiceProductTableHeader">
                                <div>Product</div>
                                <div>Quantity</div>
                                <div>Price</div>
                                <div>Edit</div>
                              </div>
                              {0 === productsLeft.length ? (
                                <div>no more products</div>
                              ) : (
                                <div className="invoiceProductTableBody">
                                  <div>
                                    <label htmlFor="invoiceProduct"></label>
                                    <select
                                      id="invoiceProduct"
                                      name="invoiceProduct"
                                      onChange={(e) => {
                                        setNewInvoiceCurrentProduct(e.target.value);
                                        if (products[e.target.value].quantity < newInvoiceCurrentProductQuantity) {
                                          setnewInvoiceCurrentProductQuantity(products[e.target.value].quantity);
                                        }
                                      }}
                                      value={newInvoiceCurrentProduct}
                                    >
                                      {productsLeft.map((temp) => {
                                        return (
                                          <option value={temp} key={uniqid()}>
                                            {products[temp].name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                  <label htmlFor="invoiceQuantity"></label>
                                  <input
                                    type="number"
                                    id="invoiceQuantity"
                                    name="invoiceQuantity"
                                    max={products[newInvoiceCurrentProduct].quantity}
                                    onChange={(e) => {
                                      if (e.target.value > products[newInvoiceCurrentProduct].quantity) {
                                        setnewInvoiceCurrentProductQuantity(products[newInvoiceCurrentProduct].quantity);
                                      } else {
                                        setnewInvoiceCurrentProductQuantity(e.target.value);
                                      }
                                    }}
                                    value={newInvoiceCurrentProductQuantity}
                                  ></input>
                                  <label htmlFor="invoicePrice"></label>
                                  <input
                                    type="text"
                                    id="invoicePrice"
                                    name="invoicePrice"
                                    value={newInvoiceCurrentProductPrice}
                                    onChange={(e) => {
                                      setNewInvoiceCurrentProductPrice(e.target.value);
                                    }}
                                  ></input>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      //an array with object with id, quantity, and price
                                      const newProductObject = {
                                        product: products[newInvoiceCurrentProduct]._id,
                                        quantity: newInvoiceCurrentProductQuantity,
                                        price: newInvoiceCurrentProductPrice,
                                        name: products[newInvoiceCurrentProduct].name,
                                      };
                                      setNewInvoiceProducts([...newInvoiceProducts, newProductObject]);
                                      setProductsLeft(() => {
                                        let newProductsLeft = productsLeft.filter((temp) => {
                                          return products[temp].name !== products[newInvoiceCurrentProduct].name;
                                        });
                                        if (newProductsLeft.length === 0) {
                                          return [];
                                        } else {
                                          setNewInvoiceCurrentProduct([newProductsLeft[0]]);
                                          if (newInvoiceCurrentProductQuantity > products[[newProductsLeft[0]]].quantity) {
                                            setnewInvoiceCurrentProductQuantity(products[newProductsLeft[0]].quantity);
                                          }
                                          return newProductsLeft;
                                        }
                                      });
                                    }}
                                  >
                                    add product
                                  </button>
                                </div>
                              )}
                            </div>
                          </fieldset>
                        </div>
                        <button
                          className="postActionButton"
                          onClick={(e) => {
                            handlePostAction(e);
                          }}
                        >
                          {menuStateCreate ? "Add invoice" : "Update invoice"}
                        </button>
                      </form>
                    </div>
                  </div>
                );
              }}
            </Popup>
          </div>
        </div>
        <div className="searchbar">
          <label htmlFor="searchBar"></label>
          <input type="text" name="searchBar" id="searchBar" placeholder={`Search ${title}`}></input>
        </div>
      </div>
      {loading ? (
        <div>loading..</div>
      ) : (
        <div>
          <table className="invoiceTable">
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Date</th>
                <th>Buyer</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => {
                let paddedInvoiceString = "" + invoice.invoice_number;
                paddedInvoiceString = paddedInvoiceString.padStart(5, "0");
                let invoiceDate = new Date(invoice.date_created);
                return (
                  <tr key={uniqid()}>
                    <td>{paddedInvoiceString}</td>
                    <td>{invoiceDate.toLocaleDateString()}</td>
                    <td>{invoice.buyer_name}</td>
                    <td>amount here</td>
                    <td>
                      <div className="actionButtonContainer">
                        <FaRegEdit
                          className="actionButton"
                          size="18"
                          onClick={() => {
                            handleEdit(invoice);
                            setmenuStateCreate(false);
                          }}
                        ></FaRegEdit>
                        <FaRegTrashAlt
                          className="actionButton"
                          size="18"
                          onClick={() => {
                            handleDelete(invoice._id);
                          }}
                        ></FaRegTrashAlt>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div> {customError && !showMenu ? { customError } : null}</div>
        </div>
      )}
    </div>
  );
}
