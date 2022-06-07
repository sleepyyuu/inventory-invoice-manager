import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";

export default function Buyers() {
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [buyers, setBuyers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductId, setNewProductId] = useState("");
  const [newProductPriceMin, setNewProductPriceMin] = useState(0);
  const [newProductPriceMax, setNewProductPriceMax] = useState(0);
  const [newProductQuantity, setNewProductQuantity] = useState(0);
  const [error, setError] = useState();
  const route = "/buyers";
  const getDB = async () => {
    const responseProducts = await verify("readAll", route);
    setBuyers(responseProducts);
    setLoading(false);
  };
  useEffect(() => {
    getDB();
  }, []);

  const handlePostAction = async (e) => {
    e.preventDefault();
    if (newProductName === "") {
      setError([{ msg: "Name is required" }]);
      return;
    }
    let response;
    const body = {
      name: newBuyer,
      address: newBuyerAddress,
      phone_number: newBuyerPhoneNumber,
    };
    if (menuStateCreate) {
      response = await verify("create", route, body);
    } else {
      body.buyerId = newBuyerId;
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
    let originalArray = buyers;
    let filteredArray = buyers.filter((buyer) => {
      return buyer._id !== id;
    });
    setBuyers(filteredArray);
    const response = await verify("delete", route + "/" + id, { productId: id });
    if (response.status === 200) {
    } else {
      setBuyers(originalArray);
      setError(response);
    }
  };

  return loading ? (
    <div>loading..</div>
  ) : (
    <div>
      <div>buyers</div>
      {error && !showMenu ? <div>{error}</div> : null}
      {buyers.map((buyer) => {
        return (
          <div key={uniqid()}>
            <div>
              Name: {buyer.company_name} ||| phone number: {buyer.phone_number} ||| buyer ID : {buyer._id}
              <button
                onClick={() => {
                  handleEdit(buyer);
                  setmenuStateCreate(false);
                }}
              >
                edit
              </button>
              <button
                onClick={() => {
                  handleDelete(buyer._id);
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
        add a buyer
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
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                required
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={(e) => {
                  setNewProductQuantity(e.target.value);
                }}
                value={newProductQuantity}
              ></input>
            </div>
            <button
              onClick={(e) => {
                handlePostAction(e);
              }}
            >
              {menuStateCreate ? "add buyer" : "update buyer"}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
