import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import "./Buyers.css";
import Header from "../Header/Header";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export default function Buyers(props) {
  const { setSelectedCategory } = props;
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [buyers, setBuyers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [newBuyerName, setNewBuyerName] = useState("");
  const [newBuyerId, setNewBuyerId] = useState("");
  const [newBuyerPhoneNumber, setNewBuyerPhoneNumber] = useState("");
  const [newBuyerAddress, setNewBuyerAddress] = useState("");
  const [error, setError] = useState();
  const route = "/buyers";
  const getDB = async () => {
    const responseBuyers = await verify("readAll", route);
    setBuyers(responseBuyers);
    setLoading(false);
  };
  useEffect(() => {
    setSelectedCategory("Buyers");
    getDB();
  }, []);

  const handlePostAction = async (e) => {
    e.preventDefault();
    if (newBuyerName === "") {
      setError([{ msg: "Name is required" }]);
      return;
    }
    let response;
    const body = {
      company_name: newBuyerName,
      address: newBuyerAddress,
      phone_number: newBuyerPhoneNumber,
    };
    if (menuStateCreate) {
      response = await verify("create", route, body);
    } else {
      body.buyerId = newBuyerId;
      response = await verify("update", route + "/" + newBuyerId, body);
    }
    if (response.status === 200) {
      getDB();
      setShowMenu(false);
      setError(null);
      setNewBuyerName("");
      setNewBuyerPhoneNumber("");
      setNewBuyerAddress("");
      setNewBuyerId("");
    } else {
      setError(response);
    }
  };

  const handleEdit = async (buyer) => {
    setError(null);
    setNewBuyerId(buyer._id);
    setNewBuyerName(buyer.company_name);
    setNewBuyerPhoneNumber(buyer.phone_number);
    setNewBuyerAddress(buyer.address);
    setShowMenu(true);
  };

  const handleAdd = async () => {
    setError(null);
    setNewBuyerName("");
    setNewBuyerPhoneNumber("");
    setNewBuyerAddress("");
    setNewBuyerId("");
    setmenuStateCreate(true);
    setShowMenu(true);
  };

  const handleDelete = async (id) => {
    let originalArray = buyers;
    let filteredArray = buyers.filter((buyer) => {
      return buyer._id !== id;
    });
    setBuyers(filteredArray);
    const response = await verify("delete", route + "/" + id, { buyerId: id });
    if (response.status === 200) {
    } else {
      setBuyers(originalArray);
      setError(response);
    }
  };

  return (
    <div>
      <Header title="Buyers" handleAdd={handleAdd}></Header>
      {loading ? (
        <div>loading..</div>
      ) : (
        <div>
          <table className="buyerTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer) => {
                return (
                  <tr key={uniqid()}>
                    <td>{buyer.company_name}</td>
                    <td>{buyer.phone_number}</td>
                    <td>{buyer.address}</td>
                    <td>
                      <FaRegEdit
                        className="actionButton"
                        size="20"
                        onClick={() => {
                          handleEdit(buyer);
                          setmenuStateCreate(false);
                        }}
                      ></FaRegEdit>
                      <FaRegTrashAlt
                        className="actionButton"
                        size="20"
                        onClick={() => {
                          handleDelete(buyer._id);
                        }}
                      ></FaRegTrashAlt>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <div></div>
            {error && !showMenu ? <div>{error}</div> : null}

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
                        setNewBuyerName(e.target.value);
                      }}
                      value={newBuyerName}
                    ></input>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      required
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      onChange={(e) => {
                        setNewBuyerPhoneNumber(e.target.value);
                      }}
                      value={newBuyerPhoneNumber}
                    ></input>
                    <label htmlFor="adddress">Address</label>
                    <input
                      required
                      type="text"
                      id="adddress"
                      name="adddress"
                      onChange={(e) => {
                        setNewBuyerAddress(e.target.value);
                      }}
                      value={newBuyerAddress}
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
        </div>
      )}
    </div>
  );
}
