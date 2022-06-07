import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import Header from "../Header/Header";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export default function Products(props) {
  const { setSelectedCategory } = props;
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductId, setNewProductId] = useState("");
  const [newProductPriceMin, setNewProductPriceMin] = useState(0);
  const [newProductPriceMax, setNewProductPriceMax] = useState(0);
  const [newProductQuantity, setNewProductQuantity] = useState(0);
  const [newProductPriceArray, setNewProductPriceArray] = useState([]);
  const [customError, setCustomError] = useState();
  const route = "/products";
  const getInitialDB = async () => {
    // const [responseBuyers, responseProducts] = await Promise.all([verify("readAll", "/buyers"), verify("readAll", "/products")]);
    const responseBuyers = await verify("readAll", "/buyers");
    const responseProducts = await verify("readAll", "/products");
    setBuyers(responseBuyers);
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
      price_range_min: newProductPriceMin,
      price_range_max: newProductPriceMax,
      quantity: newProductQuantity,
      buyer_prices: newProductPriceArray,
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
      setNewProductPriceMin(0);
      setNewProductPriceMax(0);
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
    setNewProductPriceMin(product.price_range_min);
    setNewProductPriceMax(product.price_range_max);
    setNewProductPriceArray(product.buyer_prices);
    setShowMenu(true);
  };

  const handleAdd = async () => {
    setCustomError(null);
    setmenuStateCreate(true);
    setNewProductName("");
    setNewProductPriceMin(0);
    setNewProductPriceMax(0);
    setNewProductId("");
    setNewProductPriceArray([]);
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
      <Header title="Products" handleAdd={handleAdd}></Header>
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
                    <td>price here</td>
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
                  <label htmlFor="priceRangeMin"></label>
                  <input
                    type="number"
                    id="priceRangeMin"
                    name="priceRangeMin"
                    min="0"
                    step=".01"
                    onChange={(e) => {
                      setNewProductPriceMin(e.target.value);
                    }}
                    value={newProductPriceMin}
                  ></input>
                  <div>-</div>
                  <label htmlFor="priceRangeMax"></label>
                  <input
                    type="number"
                    id="priceRangeMax"
                    name="priceRangeMax"
                    min="0"
                    step=".01"
                    onChange={(e) => {
                      setNewProductPriceMax(e.target.value);
                    }}
                    value={newProductPriceMax}
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
