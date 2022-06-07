import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import "./Invoices.css";
import { FaRegEdit, FaRegTrashAlt, FaPlusSquare } from "react-icons/fa";
import Popup from "reactjs-popup";
import QuantityInput from "./QuantityInput";
import PriceInput from "./PriceInput";
import DiscountInput from "./DiscountInput";
import { useNavigate } from "react-router-dom";

export default function Invoices(props) {
  const { finishedLoading } = props;
  const quantityRef = useRef(null);
  const priceRef = useRef(null);
  const discountRef = useRef(null);
  const editRowRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const defaultTaxRate = "7.25";
  const navigate = useNavigate();
  const [inputFocus, setInputFocus] = useState("");
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [details, setDetails] = useState("");
  const [taxRate, setTaxRate] = useState(defaultTaxRate);
  const [otherDiscount, setOtherDiscount] = useState("0.00");
  const [productsLeft, setProductsLeft] = useState([]);
  const [newInvoiceId, setNewInvoiceId] = useState("");
  const [newInvoiceBuyerId, setNewInvoiceBuyerId] = useState("");
  const [newInvoiceBuyerName, setNewInvoiceBuyerName] = useState("");
  const [editInvoiceQuantityMax, setEditInvoiceQuantityMax] = useState();
  const [editInvoice, setEditInvoice] = useState();
  const [newInvoiceProducts, setNewInvoiceProducts] = useState([]);
  const [newInvoiceCurrentProduct, setNewInvoiceCurrentProduct] = useState("");
  const [newInvoiceCurrentProductQuantity, setnewInvoiceCurrentProductQuantity] = useState("0.0");
  const [newInvoiceCurrentProductPrice, setNewInvoiceCurrentProductPrice] = useState("0.00");
  const [newInvoiceCurrentProductDiscount, setNewInvoiceCurrentProductDiscount] = useState("0.00");
  const [newInvoiceCurrentProductEdit, setNewInvoiceCurrentProductEdit] = useState();
  const [newInvoiceCurrentProductQuantityEdit, setnewInvoiceCurrentProductQuantityEdit] = useState("0.0");
  const [newInvoiceCurrentProductPriceEdit, setNewInvoiceCurrentProductPriceEdit] = useState("0.00");
  const [newInvoiceCurrentProductDiscountEdit, setNewInvoiceCurrentProductDiscountEdit] = useState("0.00");
  const [newInvoiceEdit, setNewInvoiceEdit] = useState(null);
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
    finishedLoading();
  };
  useEffect(() => {
    getInitialDB();
  }, []);

  useEffect(() => {
    if (inputFocus === "quantity") {
      quantityRef.current.focus();
    } else if (inputFocus === "price") {
      priceRef.current.focus();
    } else if (inputFocus === "discount") {
      discountRef.current.focus();
    }
    setInputFocus("");
  }, [inputFocus]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editRowRef.current && !editRowRef.current.contains(e.target)) {
        setnewInvoiceCurrentProductQuantity("0.0");
        setNewInvoiceCurrentProductPrice("0.00");
        setNewInvoiceEdit("");
        setNewInvoiceCurrentProductEdit();
        setnewInvoiceCurrentProductQuantityEdit("0.0");
        setNewInvoiceCurrentProductPriceEdit("0.00");
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

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
    let total = 0;
    for (let product of newInvoiceProducts) {
      total += product.price * product.quantity - product.quantity * product.discountPerUnit;
    }
    total = Math.round(total * 100) / 100;
    let matchBuyer = buyers.find((element) => {
      return element.company_name === newInvoiceBuyerName;
    });
    let body = {
      buyer: matchBuyer._id,
      //array of product id's
      product: newInvoiceProducts,
      buyer_name: newInvoiceBuyerName,
      buyer_address: { address: matchBuyer.address, city: matchBuyer.city, state: matchBuyer.state, zip: matchBuyer.zip },
      total: total,
      tax_rate: Number(taxRate),
      details: details,
      other_discount: Number(otherDiscount),
    };

    if (menuStateCreate) {
      response = await verify("create", route, body);
      for (let product of newInvoiceProducts) {
        let currentProduct = products.find((prod) => prod.name === product.name);
        let productBody = {
          quantity: currentProduct.quantity - product.quantity,
        };
        await verify("update", "/products/" + currentProduct._id, productBody);
      }
    } else {
      response = await verify("update", route + "/" + newInvoiceId, body);
      for (let product of newInvoiceProducts) {
        let currentProduct = products.find((prod) => prod.name === product.name);
        if (!currentProduct) {
          continue;
        }
        let oldInvoiceProduct = editInvoice["product"].find((prod) => prod.name === product.name);
        let quantityDifference;
        if (!oldInvoiceProduct) {
          quantityDifference = -product.quantity;
        } else {
          quantityDifference = oldInvoiceProduct.quantity - product.quantity;
        }
        let productBody = {
          quantity: currentProduct.quantity + quantityDifference,
        };
        await verify("update", "/products/" + currentProduct._id, productBody);
      }
    }
    if (response.status === 200) {
      getDB();
      setShowMenu(false);
      setCustomError(null);
      setNewInvoiceBuyerId(buyers[0]._id);
      setNewInvoiceProducts([]);
      setNewInvoiceId("");
      setNewInvoiceBuyerName(buyers[0].company_name);
    } else {
      setCustomError(response);
    }
  };

  const handleEdit = async (invoice) => {
    setTaxRate(invoice.tax_rate.toFixed(2));
    setnewInvoiceCurrentProductQuantity("0.0");
    setNewInvoiceCurrentProductPrice("0.00");
    setNewInvoiceEdit("");
    setNewInvoiceCurrentProductEdit();
    setnewInvoiceCurrentProductQuantityEdit("0.0");
    setNewInvoiceCurrentProductPriceEdit("0.00");
    setNewInvoiceCurrentProductDiscount("0.00");
    setNewInvoiceCurrentProductDiscountEdit("0.00");
    setOtherDiscount(invoice.other_discount.toFixed(2));
    setDetails(invoice.details);
    setCustomError(null);
    setEditInvoice(invoice);
    setNewInvoiceId(invoice._id);
    setNewInvoiceBuyerId(invoice.buyer);
    setNewInvoiceBuyerName(invoice.buyer_name);
    setNewInvoiceProducts(invoice.product);
    let productQuantityMax = {};
    for (let prod of products) {
      let invoiceQuantity = 0;
      let productMatch = invoice.product.find((temp) => {
        return temp.name === prod.name;
      });
      if (productMatch) {
        invoiceQuantity = productMatch.quantity;
      } else {
      }
      let quantity = prod.quantity + invoiceQuantity;
      productQuantityMax[prod.name] = quantity;
    }
    setEditInvoiceQuantityMax(productQuantityMax);
    setShowMenu(true);
    let indexArray = [];
    for (let i = 0; i < products.length; i++) {
      let found = false;
      for (let j = 0; j < invoice.product.length; j++) {
        if (products[i].name === invoice.product[j].name) {
          found = true;
        }
      }
      if (!found) {
        indexArray.push(i);
      }
    }
    setNewInvoiceCurrentProduct(indexArray[0]);
    setProductsLeft(indexArray);
    if (indexArray.length === 0) {
      setNewInvoiceCurrentProductPrice("0.00");
    } else {
      setNewInvoiceCurrentProductPrice(products[indexArray[0]].price.toFixed(2));
    }
  };

  const handleAdd = () => {
    setTaxRate(defaultTaxRate);
    setOtherDiscount("0.00");
    setDetails("");
    setnewInvoiceCurrentProductQuantity("0.0");
    setNewInvoiceCurrentProductPrice("0.00");
    setNewInvoiceEdit("");
    setNewInvoiceCurrentProductEdit();
    setnewInvoiceCurrentProductQuantityEdit("0.0");
    setNewInvoiceCurrentProductPriceEdit("0.00");
    setNewInvoiceCurrentProductDiscount("0.00");
    setNewInvoiceCurrentProductDiscountEdit("0.00");
    setCustomError(null);
    setmenuStateCreate(true);
    setNewInvoiceBuyerId(buyers[0]._id);
    setNewInvoiceProducts([]);
    setNewInvoiceId("");
    setNewInvoiceBuyerName(buyers[0].company_name);
    setShowMenu(true);
    setNewInvoiceCurrentProduct(0);
    let productQuantityMax = {};
    for (let prod of products) {
      productQuantityMax[prod.name] = prod.quantity;
    }
    setEditInvoiceQuantityMax(productQuantityMax);
    setNewInvoiceCurrentProductPrice(products[0].price.toFixed(2));
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

  const handleProductDelete = (e, index, product) => {
    e.preventDefault();
    //an array with object with id, quantity, and price
    const filteredArray = newInvoiceProducts.filter((temp, filterIndex) => {
      return filterIndex !== index;
    });
    setNewInvoiceProducts(filteredArray);
    let productIndex = 0;
    products.forEach((temp, i) => {
      if (temp.name === product.name) {
        productIndex = i;
      }
    });
    setProductsLeft(() => [...productsLeft, productIndex]);
    setNewInvoiceEdit("");
    setNewInvoiceCurrentProductEdit();
    setnewInvoiceCurrentProductQuantityEdit("0.0");
    setNewInvoiceCurrentProduct(productIndex);
    setNewInvoiceCurrentProductPriceEdit("0.00");
    setNewInvoiceCurrentProductDiscountEdit("0.00");
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
                    <div className="modalHeader"> {menuStateCreate ? "Create invoice" : "Update invoice"} </div>
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
                              <legend>From</legend>
                              <div className="invoiceConstantValue">{companyName}</div>
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
                              <legend>Tax Rate</legend>
                              <label htmlFor="invoiceTaxRate"></label>
                              <input
                                type="text"
                                id="invoiceTaxRate"
                                name="invoiceTaxRate"
                                value={taxRate}
                                onChange={(e) => {
                                  setTaxRate(e.target.value);
                                }}
                                onBlur={(e) => {
                                  if (!e.target.value || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
                                    setTaxRate(defaultTaxRate);
                                  } else {
                                    setTaxRate(Number(taxRate).toFixed(2));
                                  }
                                }}
                                onKeyPress={(e) => {
                                  if (!/[0-9.]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              ></input>
                              <div>%</div>
                            </fieldset>
                          </div>
                          <fieldset id="discountFieldset">
                            <legend>Other Discount</legend>
                            <label htmlFor="invoiceDiscountInput"></label>
                            <div>-$</div>
                            <input
                              type="text"
                              id="invoiceDiscountInput"
                              name="invoiceDiscountInput"
                              value={otherDiscount}
                              onChange={(e) => {
                                setOtherDiscount(e.target.value);
                              }}
                              onBlur={(e) => {
                                if (!e.target.value || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
                                  setOtherDiscount("0.00");
                                } else {
                                  setOtherDiscount(Number(otherDiscount).toFixed(2));
                                }
                              }}
                              onKeyPress={(e) => {
                                if (!/[0-9.]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            ></input>
                          </fieldset>
                          <fieldset id="detailsFieldset">
                            <legend>Notes</legend>
                            <label htmlFor="detailsInput"></label>
                            <input
                              type="text"
                              id="detailsInput"
                              name="detailsInput"
                              value={details}
                              onChange={(e) => {
                                setDetails(e.target.value);
                              }}
                            ></input>
                          </fieldset>
                          <fieldset className="invoiceProducts">
                            <legend>Items</legend>
                            <div className="invoiceProductTableHeaderContainer">
                              <div className="invoiceProductTableHeader">
                                <div>Product</div>
                                <div>Quantity</div>
                                <div>Unit Price</div>
                                <div>Unit Discount</div>
                                <div>Total Price</div>
                                <div>Delete</div>
                              </div>
                              {newInvoiceProducts.length === 0 ? (
                                <div className="invoiceProductTableNotice">Add product below</div>
                              ) : (
                                <div className="invoiceProductTableBody">
                                  {newInvoiceProducts.map((product, index) => {
                                    return (
                                      <div key={index}>
                                        <div>
                                          {product.name === newInvoiceEdit ? (
                                            <div
                                              className="invoiceProductTableEditRow"
                                              ref={editRowRef}
                                              onBlur={(e) => {
                                                const newProductObject = {
                                                  product: product._id ? product._id : product.product,
                                                  quantity: newInvoiceCurrentProductQuantityEdit
                                                    ? Number(newInvoiceCurrentProductQuantityEdit)
                                                    : 0,
                                                  price: newInvoiceCurrentProductPriceEdit ? Number(newInvoiceCurrentProductPriceEdit) : 0,
                                                  discountPerUnit: newInvoiceCurrentProductDiscountEdit
                                                    ? Number(newInvoiceCurrentProductDiscountEdit)
                                                    : 0,
                                                  name: product.name,
                                                };
                                                let newInvoiceProductCopy = [...newInvoiceProducts];
                                                let index = newInvoiceProducts.findIndex((temp) => {
                                                  return temp.name === product.name;
                                                });
                                                newInvoiceProductCopy[index] = newProductObject;
                                                setNewInvoiceProducts(newInvoiceProductCopy);
                                              }}
                                            >
                                              <div id="productName">{product.name}</div>
                                              <div className="invoiceQuantityEditContainer">
                                                <label htmlFor="invoiceQuantityEdit"></label>
                                                <QuantityInput
                                                  quantityRef={quantityRef}
                                                  identifier="invoiceQuantityEdit"
                                                  newInvoiceQuantity={newInvoiceCurrentProductQuantityEdit}
                                                  setNewInvoiceQuantity={setnewInvoiceCurrentProductQuantityEdit}
                                                  quantityStock={editInvoiceQuantityMax[product["name"]]}
                                                ></QuantityInput>
                                              </div>
                                              <div className="invoicePriceEditContainer">
                                                <label htmlFor="invoicePriceEdit"></label>
                                                <PriceInput
                                                  priceRef={priceRef}
                                                  identifier="invoicePriceEdit"
                                                  newInvoicePrice={newInvoiceCurrentProductPriceEdit}
                                                  setNewInvoicePrice={setNewInvoiceCurrentProductPriceEdit}
                                                ></PriceInput>
                                              </div>
                                              <div className="invoiceDiscountEditContainer">
                                                <label htmlFor="invoiceDiscountEdit"></label>
                                                <DiscountInput
                                                  discountRef={discountRef}
                                                  identifier="invoiceDiscountEdit"
                                                  newInvoiceDiscount={newInvoiceCurrentProductDiscountEdit}
                                                  setNewInvoiceDiscount={setNewInvoiceCurrentProductDiscountEdit}
                                                  discountMax={newInvoiceCurrentProductPriceEdit}
                                                ></DiscountInput>
                                              </div>
                                              <div>
                                                {"$" +
                                                  (
                                                    newInvoiceCurrentProductPriceEdit * newInvoiceCurrentProductQuantityEdit -
                                                    newInvoiceCurrentProductQuantityEdit * newInvoiceCurrentProductDiscountEdit
                                                  ).toFixed(2)}
                                              </div>
                                              <div>
                                                <FaRegTrashAlt
                                                  className="actionButton"
                                                  onClick={(e) => {
                                                    handleProductDelete(e, index, product);
                                                  }}
                                                ></FaRegTrashAlt>
                                              </div>
                                            </div>
                                          ) : (
                                            <div
                                              className="invoiceProductTableRow"
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
                                                setnewInvoiceCurrentProductQuantityEdit(newInvoiceProducts[index].quantity.toFixed(1));
                                                setNewInvoiceCurrentProductPriceEdit(newInvoiceProducts[index].price.toFixed(2));
                                                setNewInvoiceCurrentProductDiscountEdit(
                                                  newInvoiceProducts[index].discountPerUnit.toFixed(2)
                                                );
                                              }}
                                            >
                                              <div id="productName">{product.name}</div>
                                              <div
                                                onClick={() => {
                                                  setInputFocus("quantity");
                                                }}
                                                className="quantityDisplay"
                                              >
                                                {product.quantity.toFixed(1)}
                                              </div>
                                              <div
                                                onClick={() => {
                                                  setInputFocus("price");
                                                }}
                                                className="priceDisplay"
                                              >
                                                {product.price.toFixed(2)}
                                              </div>
                                              <div
                                                onClick={() => {
                                                  setInputFocus("discount");
                                                }}
                                                className="discountDisplay"
                                              >
                                                {" "}
                                                {product.discountPerUnit.toFixed(2)}
                                              </div>
                                              <div>
                                                {"$" +
                                                  (product.quantity * product.price - product.quantity * product.discountPerUnit).toFixed(
                                                    2
                                                  )}
                                              </div>
                                              <div>
                                                <FaRegTrashAlt
                                                  className="actionButton"
                                                  onClick={(e) => {
                                                    handleProductDelete(e, index, product);
                                                  }}
                                                ></FaRegTrashAlt>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </fieldset>
                          {0 === productsLeft.length ? (
                            <div>No more available products to add</div>
                          ) : (
                            <div className="invoiceProductTableAddRow">
                              <div id="invoiceProductContainer">
                                <label htmlFor="invoiceProduct"></label>
                                <select
                                  id="invoiceProduct"
                                  name="invoiceProduct"
                                  onChange={(e) => {
                                    setNewInvoiceCurrentProduct(e.target.value);
                                    if (products[e.target.value].quantity < newInvoiceCurrentProductQuantity) {
                                      setnewInvoiceCurrentProductQuantity(products[e.target.value].quantity);
                                    }
                                    setNewInvoiceCurrentProductPrice(products[e.target.value].price.toFixed(2));
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
                              <div className="invoiceQuantityEditContainer">
                                <label htmlFor="invoiceQuantity"></label>
                                <QuantityInput
                                  identifier="invoiceQuantity"
                                  newInvoiceQuantity={newInvoiceCurrentProductQuantity}
                                  setNewInvoiceQuantity={setnewInvoiceCurrentProductQuantity}
                                  quantityStock={editInvoiceQuantityMax[products[newInvoiceCurrentProduct]["name"]]}
                                ></QuantityInput>
                              </div>
                              <div className="invoicePriceEditContainer">
                                <label htmlFor="invoicePrice"></label>
                                <PriceInput
                                  identifier="invoicePrice"
                                  newInvoicePrice={newInvoiceCurrentProductPrice}
                                  setNewInvoicePrice={setNewInvoiceCurrentProductPrice}
                                ></PriceInput>
                              </div>
                              <div className="invoiceDiscountEditContainer">
                                <label htmlFor="invoiceDiscount"></label>
                                <DiscountInput
                                  identifier="invoiceDiscount"
                                  newInvoiceDiscount={newInvoiceCurrentProductDiscount}
                                  setNewInvoiceDiscount={setNewInvoiceCurrentProductDiscount}
                                  discountMax={newInvoiceCurrentProductPrice}
                                ></DiscountInput>
                              </div>
                              <div>
                                {"$" +
                                  (
                                    newInvoiceCurrentProductQuantity * newInvoiceCurrentProductPrice -
                                    newInvoiceCurrentProductQuantity * newInvoiceCurrentProductDiscount
                                  ).toFixed(2)}
                              </div>
                              <div className="invoiceProductAddContainer">
                                <FaPlusSquare
                                  className="invoiceProductAdd"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    //an array with object with id, quantity, and price
                                    const newProductObject = {
                                      product: products[newInvoiceCurrentProduct]._id,
                                      quantity: Number(newInvoiceCurrentProductQuantity),
                                      price: Number(newInvoiceCurrentProductPrice),
                                      name: products[newInvoiceCurrentProduct].name,
                                      discountPerUnit: Number(newInvoiceCurrentProductDiscount),
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
                                    setnewInvoiceCurrentProductQuantity("0.0");
                                    setNewInvoiceCurrentProductPrice("0.00");
                                    setNewInvoiceEdit("");
                                    setNewInvoiceCurrentProductEdit();
                                    setnewInvoiceCurrentProductQuantityEdit("0.0");
                                    setNewInvoiceCurrentProductPriceEdit("0.00");
                                    setNewInvoiceCurrentProductDiscount("0.00");
                                    setNewInvoiceCurrentProductDiscountEdit("0.00");
                                  }}
                                  size="23"
                                ></FaPlusSquare>
                              </div>
                            </div>
                          )}
                        </div>
                        <button
                          className="postActionButton"
                          onClick={(e) => {
                            handlePostAction(e);
                          }}
                        >
                          {menuStateCreate ? "Create invoice" : "Update invoice"}
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
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder={`Search ${title}`}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
          ></input>
        </div>
      </div>
      {loading ? null : (
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
                if (searchTerm === "" || invoice.buyer_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  let paddedInvoiceString = "" + invoice.invoice_number;
                  paddedInvoiceString = paddedInvoiceString.padStart(5, "0");
                  let invoiceDate = new Date(invoice.date_created);
                  return (
                    <tr key={uniqid()}>
                      <td>
                        <button
                          className="invoiceLink"
                          onClick={() => {
                            navigate(invoice._id);
                          }}
                        >
                          {paddedInvoiceString}
                        </button>
                      </td>
                      <td>{invoiceDate.toLocaleDateString()}</td>
                      <td>{invoice.buyer_name}</td>
                      <td>${invoice.total.toFixed(2)}</td>
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
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
          <div> {customError && !showMenu ? { customError } : null}</div>
        </div>
      )}
    </div>
  );
}
