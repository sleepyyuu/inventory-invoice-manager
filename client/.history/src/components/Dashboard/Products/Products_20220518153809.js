import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";

export default function Products() {
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPriceMin, setNewProductPriceMin] = useState(0);
  const [newProductPriceMax, setNewProductPriceMax] = useState(0);
  const [error, setError] = useState();
  const route = "/products";
  const getDB = async () => {
    const responseProducts = await verify("readAll", route);
    console.log(responseProducts);
    setProducts(responseProducts);
    setLoading(false);
  };
  useEffect(() => {
    getDB();
  }, []);

  const handlePostAction = async (e) => {
    e.preventDefault();
    const body = { name: newProductName, price_range_min: newProductPriceMin, price_range_max: newProductPriceMax };
    const response = await verify("create", route, body);
    if (response.status === 200) {
      getDB();
      setShowMenu(false);
      setError(null);
      setNewProductName("");
      setNewProductPriceMin(0);
      setNewProductPriceMax(0);
    } else {
      setError(response);
    }
  };

  const handleEdit = async (product) => {
    setError(null);
    setShowMenu(true);
    setNewProductName(product.name);
    if (product.price_range_min) {
      setNewProductPriceMin(product.price_range_min);
    }
    if (product.price_range_max) {
      setNewProductPriceMax(product.price_range_max);
    }
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
              Name: {product.name} ||| product ID : {product._id}
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
                type="text"
                id="name"
                name="name"
                onChange={(e) => {
                  setNewProductName(e.target.value);
                }}
                value={newProductName}
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
              onClick={() => {
                handlePostAction();
              }}
            >
              add product
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
