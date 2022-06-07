import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";

export default function Products() {
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
  const [newProductBuyerName, setNewProductBuyerName] = useState("");
  const [newProductBuyerPrice, setNewProductBuyerPrice] = useState(0);
  const [error, setError] = useState();
  const route = "/products";
  const getInitialDB = async () => {
    const [responseBuyers, responseProducts] = await Promise.all([verify("readAll", "/buyers"), verify("readAll", "/products")]);
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
    getInitialDB();
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
      <div>products</div>
      {error && !showMenu ? <div>{error}</div> : null}
      {products.map((product) => {
        return (
          <div key={uniqid()}>
            <div>
              Name: {product.name} ||| Quantity: {product.quantity} ||| product ID : {product._id}
              <button
                onClick={() => {
                  handleEdit(product);
                  setmenuStateCreate(false);
                }}
              >
                edit
              </button>
              <button
                onClick={() => {
                  handleDelete(product._id);
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
          setNewProductName("");
          setNewProductPriceMin(0);
          setNewProductPriceMax(0);
          setNewProductId("");
          setNewProductPriceArray([]);
          setShowMenu(true);
        }}
      >
        add a product
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
              <div>
                Buyer prices
                {newProductPriceArray.map(() => {
                  return <div></div>;
                })}
                <label htmlFor="productBuyerName">Buyer name</label>
                <input
                  type="text"
                  id="productBuyerName"
                  name="productBuyerName"
                  onChange={(e) => {
                    setNewProductBuyerName(e.target.value);
                  }}
                  value={newProductBuyerName}
                ></input>
                <label htmlFor="productBuyerPrice">Buyer price</label>
                <input
                  type="number"
                  id="productBuyerPrice"
                  min="0"
                  step=".01"
                  name="productBuyerPrice"
                  onChange={(e) => {
                    setNewProductBuyerPrice(e.target.value);
                  }}
                  value={newProductBuyerPrice}
                ></input>
                <button>Add buyer price to product</button>
              </div>
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
  );
}
