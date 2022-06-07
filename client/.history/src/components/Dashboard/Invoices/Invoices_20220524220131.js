import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import "./Invoices.css";
import Header from "../Header/Header";

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
  const [newInvoiceBuyer, setNewInvoiceBuyer] = useState({});
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
      buyer_name: newInvoiceBuyer.company_name,
    };
    if (newInvoiceDetails !== "") {
      body.details = newInvoiceDetails;
    }
    if (menuStateCreate) {
      body.buyer = newInvoiceBuyer._id;
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
      <Header title="Invoices"></Header>
      {loading ? (
        <div>loading..</div>
      ) : (
        <div>
          <div>Invoices</div>
          {customError && !showMenu ? <div>{customError}</div> : null}
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
              setCustomError(null);
              setmenuStateCreate(true);
              setNewInvoiceBuyer("");
              setNewInvoiceProducts([]);
              setNewInvoiceDetails("");
              setNewInvoiceId("");
              setInvoiceNumber((invoices.length + "").padStart(5, "0"));
              setShowMenu(true);
              setNewInvoiceCurrentProduct(0);
              let indexArray = [];
              for (let i = 0; i < products.length; i++) {
                indexArray.push(i);
              }
              setProductsLeft(indexArray);
            }}
          >
            add a invoice
          </button>
          {showMenu ? (
            <div>
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
                  <div>Invoice Number : {invoiceNumber}</div>
                  <label htmlFor="invoiceBuyer">To :</label>
                  <select
                    id="invoiceBuyer"
                    name="invoiceBuyer"
                    onChange={(e) => {
                      setNewInvoiceBuyer(
                        buyers.find((element) => {
                          return element.company_name === e.target.value;
                        })
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
                  <div>{new Date().toLocaleDateString()}</div>
                  <div>
                    <div>Items</div>
                    <div>
                      {newInvoiceProducts.map((product, index) => {
                        return (
                          <div key={index}>
                            <div>
                              {product.name === newInvoiceEdit ? (
                                <div>
                                  <div>{product.name}</div>
                                  <label htmlFor="invoiceQuantityEdit">Quantity</label>
                                  <input
                                    type="number"
                                    id="invoiceQuantityEdit"
                                    name="invoiceQuantityEdit"
                                    max={products[newInvoiceCurrentProductEdit].quantity}
                                    onChange={(e) => {
                                      if (e.target.value > products[newInvoiceCurrentProductEdit].quantity) {
                                        setnewInvoiceCurrentProductQuantityEdit(products[newInvoiceCurrentProductEdit].quantity);
                                      } else {
                                        setnewInvoiceCurrentProductQuantityEdit(e.target.value);
                                      }
                                    }}
                                    value={newInvoiceCurrentProductQuantityEdit}
                                  ></input>
                                  <label htmlFor="invoicePriceEdit">Price</label>
                                  <input
                                    type="text"
                                    id="invoicePriceEdit"
                                    name="invoicePriceEdit"
                                    value={newInvoiceCurrentProductPriceEdit}
                                    onChange={(e) => {
                                      setNewInvoiceCurrentProductPriceEdit(e.target.value);
                                    }}
                                  ></input>

                                  <button>submit changes</button>
                                </div>
                              ) : (
                                <div>
                                  <div>{product.name}</div>
                                  <div>{product.quantity}</div>
                                  <div>{product.price}</div>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      let index = 0;
                                      newInvoiceProducts.forEach((temp, i) => {
                                        if (temp.name === product.name) {
                                          index = i;
                                        }
                                      });
                                      setNewInvoiceEdit(product.name);
                                      setNewInvoiceCurrentProductEdit(index);
                                      setnewInvoiceCurrentProductQuantityEdit(newInvoiceProducts[index].quantity);
                                      setNewInvoiceCurrentProductPriceEdit(newInvoiceProducts[index].price);
                                    }}
                                  >
                                    edit this listing
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {0 === productsLeft.length ? (
                        <div>no more products</div>
                      ) : (
                        <div>
                          <label htmlFor="invoiceProduct">Product</label>
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
                          <label htmlFor="invoiceQuantity">Quantity</label>
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
                          <label htmlFor="invoicePrice">Price</label>
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
                                setNewInvoiceCurrentProduct([newProductsLeft[0]]);
                                if (newInvoiceCurrentProductQuantity > products[[newProductsLeft[0]]].quantity) {
                                  setnewInvoiceCurrentProductQuantity(products[newProductsLeft[0]].quantity);
                                }
                                return newProductsLeft;
                              });
                            }}
                          >
                            add another product
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
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
      )}
    </div>
  );
}
