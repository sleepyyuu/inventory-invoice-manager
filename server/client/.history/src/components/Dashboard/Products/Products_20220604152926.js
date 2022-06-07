import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Popup from "reactjs-popup";

export default function Products(props) {
  const { finishedLoading } = props;
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductId, setNewProductId] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("0.00");
  const [newProductQuantity, setNewProductQuantity] = useState("0.0");
  const [customError, setCustomError] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const route = "/products";
  const title = "Products";
  const getInitialDB = async () => {
    // const [responseBuyers, responseProducts] = await Promise.all([verify("readAll", "/buyers"), verify("readAll", "/products")]);
    const responseProducts = await verify("readAll", "/products");
    setProducts(responseProducts);
    setLoading(false);
  };
  const getDB = async () => {
    const responseProducts = await verify("readAll", route);
    setProducts(responseProducts);
    setLoading(false);
    finishedLoading();
  };
  useEffect(() => {
    getInitialDB();
  }, []);

  const handlePostAction = async (e) => {
    e.preventDefault();
    if (newProductName === "") {
      setCustomError([{ msg: "Name is required" }]);
      return;
    }
    let response;
    let body = {
      name: newProductName,
      price: Number(newProductPrice),
      quantity: newProductQuantity,
    };
    if (menuStateCreate) {
      response = await verify("create", route, body);
    } else {
      response = await verify("update", route + "/" + newProductId, body);
    }
    if (response.status === 200) {
      getDB();
      setShowMenu(false);
      setCustomError(null);
      setNewProductName("");
      setNewProductPrice("0.00");
      setNewProductQuantity("0.0");
      setNewProductId("");
    } else {
      setCustomError(response);
    }
  };

  const handleEdit = async (product) => {
    setCustomError(null);
    setNewProductId(product._id);
    setNewProductName(product.name);
    setNewProductQuantity(product.quantity.toFixed(1));
    setNewProductPrice(product.price.toFixed(2));
    setShowMenu(true);
  };

  const handleAdd = () => {
    setCustomError(null);
    setmenuStateCreate(true);
    setNewProductName("");
    setNewProductPrice("0.00");
    setNewProductId("");
    setNewProductQuantity("0.0");
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
              onClose={() => {
                setCustomError(null);
                setShowMenu(false);
              }}
            >
              {(close) => {
                return (
                  <div className="modal">
                    <button
                      className="modalClose"
                      onClick={() => {
                        setShowMenu(false);
                      }}
                    >
                      &times;
                    </button>
                    <div className="modalHeader"> {menuStateCreate ? "Add product" : "Update product"} </div>
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
                          <fieldset>
                            <legend>Name</legend>
                            <label htmlFor="name"></label>
                            <input
                              required
                              type="text"
                              id="name"
                              name="name"
                              onChange={(e) => {
                                setNewProductName(e.target.value);
                              }}
                              value={newProductName}
                            ></input>
                          </fieldset>
                          <div className="numberValues">
                            <fieldset>
                              <legend>Quantity</legend>
                              <label htmlFor="quantity"></label>
                              <input
                                required
                                type="text"
                                id="quantity"
                                name="quantity"
                                onChange={(e) => {
                                  setNewProductQuantity(e.target.value);
                                }}
                                onBlur={(e) => {
                                  if (!e.target.value || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
                                    setNewProductQuantity("0.0");
                                  } else {
                                    setNewProductQuantity(Number(newProductQuantity).toFixed(1));
                                  }
                                }}
                                onKeyPress={(e) => {
                                  if (!/[0-9.]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                value={newProductQuantity}
                              ></input>
                            </fieldset>
                            <fieldset>
                              <legend>Price</legend>
                              <label htmlFor="price"></label>
                              <input
                                type="text"
                                id="price"
                                name="price"
                                onChange={(e) => {
                                  setNewProductPrice(e.target.value);
                                }}
                                onBlur={(e) => {
                                  if (!e.target.value || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
                                    setNewProductPrice("0.00");
                                  } else {
                                    setNewProductPrice(Number(newProductPrice).toFixed(2));
                                  }
                                }}
                                onKeyPress={(e) => {
                                  if (!/[0-9.]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                value={newProductPrice}
                              ></input>
                            </fieldset>
                          </div>
                        </div>
                        <button
                          className="postActionButton"
                          onClick={(e) => {
                            handlePostAction(e);
                          }}
                        >
                          {menuStateCreate ? "Add product" : "Update product"}
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
          <table className="productTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                if (searchTerm.toLowerCase().includes(product.name)) {
                  return (
                    <tr key={uniqid()}>
                      <td>{product.name}</td>
                      <td>{product.quantity.toFixed(1)}</td>
                      <td>{"$" + product.price.toFixed(2)}</td>
                      <td>
                        <div className="actionButtonContainer">
                          <FaRegEdit
                            className="actionButton"
                            size="18"
                            onClick={() => {
                              handleEdit(product);
                              setmenuStateCreate(false);
                            }}
                          ></FaRegEdit>
                          <FaRegTrashAlt
                            className="actionButton"
                            size="18"
                            onClick={() => {
                              handleDelete(product._id);
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
          {customError && !showMenu ? <div>{customError}</div> : null}
        </div>
      )}
    </div>
  );
}
