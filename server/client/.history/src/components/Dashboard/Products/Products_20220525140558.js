import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Products(props) {
  const { setSelectedCategory } = props;
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductId, setNewProductId] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductQuantity, setNewProductQuantity] = useState(0);
  const [customError, setCustomError] = useState();
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
  };
  useEffect(() => {
    setSelectedCategory("Products");
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
      price: newProductPrice,
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
      setCustomError(null);
      setNewProductName("");
      setNewProductPrice(0);
      setNewProductId("");
    } else {
      setCustomError(response);
    }
  };

  const handleEdit = async (product) => {
    setCustomError(null);
    setNewProductId(product._id);
    setNewProductName(product.name);
    setNewProductQuantity(product.quantity);
    setNewProductPrice(product.price);
    setShowMenu(true);
  };

  const handleAdd = async () => {
    setCustomError(null);
    setmenuStateCreate(true);
    setNewProductName("");
    setNewProductPrice(0);
    setNewProductId("");
    setNewProductQuantity(0);
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
            <Popup
              trigger={
                <button
                  className="addNewButton"
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  + New {title.slice(0, title.length - 1)}
                </button>
              }
              position="center"
            ></Popup>
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
                return (
                  <tr key={uniqid()}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{"$" + product.price}</td>
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
              })}
            </tbody>
          </table>
          {customError && !showMenu ? <div>{customError}</div> : null}
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
                  <label htmlFor="name">Name</label>
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
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    required
                    type="text"
                    id="quantity"
                    name="quantity"
                    onChange={(e) => {
                      setNewProductQuantity(e.target.value);
                    }}
                    value={newProductQuantity}
                  ></input>
                </div>
                <div>
                  <div>Price range</div>
                  <label htmlFor="price"></label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step=".01"
                    onChange={(e) => {
                      setNewProductPrice(e.target.value);
                    }}
                    value={newProductPrice}
                  ></input>
                </div>
                <button
                  onClick={(e) => {
                    handlePostAction(e);
                  }}
                >
                  {menuStateCreate ? "add product" : "update product"}
                </button>
              </form>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
