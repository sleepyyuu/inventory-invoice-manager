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
  const getDB = async () => {
    const responseProducts = await verify("readAll", "/products");
    console.log(responseProducts);
    setProducts(responseProducts);
    setLoading(false);
  };
  useEffect(() => {
    getDB();
  }, []);

  //make functions for button onclicks, post method, setInvices to after change
  const handleAdd = () => {};
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
        add a product
      </button>
      {showMenu ? (
        <div>
          <form>
            <div>
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
            <button>add product</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
