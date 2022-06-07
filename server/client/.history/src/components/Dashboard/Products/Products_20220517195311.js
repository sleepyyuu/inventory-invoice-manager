import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState, useRef } from "react";

export default function Products() {
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
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

  const handleCreate = async (e) => {
    e.preventDefault();
    const body = { name: newProductName, price_range_min: newProductPriceMin, price_range_max: newProductPriceMax };
    const response = await verify("create", route, body);
    if (response.status === 200) {
      setShowMenu(false);
      setError(null);
      setNewProductName("");
      setNewProductPriceMin(0);
      setNewProductPriceMax(0);
      getDB();
    } else {
      setError(response);
    }
  };

  const handleDelete = () => {};

  return loading ? (
    <div>loading..</div>
  ) : (
    <div>
      <div>products</div>
      {products.map((product, counter) => {
        return (
          <div key={counter}>
            <div>
              Name: {product.name} ||| product ID : {product._id}
              <button>delete</button>
            </div>
            <br></br>
          </div>
        );
      })}
      <button
        onClick={() => {
          setShowMenu(true);
        }}
      >
        {" "}
        add a product
      </button>
      {showMenu ? (
        <div>
          <form>
            <div>
              {error ? (
                <div>
                  {error.map((err, counter) => {
                    return (
                      <div key={counter}>
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
            <button onClick={handleCreate}>add product</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
