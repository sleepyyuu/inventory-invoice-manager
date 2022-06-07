import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";

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
  const [newProductBuyerName, setNewProductBuyerName] = useState("");
  const [newProductBuyerPrice, setNewProductBuyerPrice] = useState(0);
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

  const handlePriceArrayAdd = (e) => {
    e.preventDefault();
    const buyerPrice = { buyer: newProductBuyerName, price: newProductBuyerPrice };
    setNewProductPriceArray((newProductPriceArray) => {
      return [...newProductPriceArray, buyerPrice];
    });
    setNewProductBuyerName("");
    setNewProductBuyerPrice(0);
  };

  return (
    <div>
      <div className="dashboardInfoHeader">
        <h3 className="infoPageTitle">Products</h3>
        <div className="dashboardButtons">
          <button>add thing button</button>
          <button>other button</button>
        </div>
      </div>{" "}
      {}
    </div>
  );
}
