import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import "./Buyers.css";
import Header from "../Header/Header";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Popup from "reactjs-popup";

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
  const title = "Buyers";
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
                    <div className="modalHeader"> {menuStateCreate ? "Add buyer" : "Update buyer"} </div>
                    <div className="modalContent">
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
                          <fieldset>
                            <legend>Name</legend>
                            <label htmlFor="name"></label>
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
                          </fieldset>
                          <fieldset>
                            <legend>Phone Number</legend>
                            <label htmlFor="phoneNumber"></label>
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
                          </fieldset>
                          <fieldset>
                            <legend>Address</legend>
                            <label htmlFor="address"></label>
                            <input
                              required
                              type="text"
                              id="address"
                              name="address"
                              onChange={(e) => {
                                setNewBuyerAddress(e.target.value);
                              }}
                              value={newBuyerAddress}
                            ></input>
                          </fieldset>
                        </div>
                        <button
                          className="postActionButton"
                          onClick={(e) => {
                            handlePostAction(e);
                          }}
                        >
                          {menuStateCreate ? "Add buyer" : "Update buyer"}
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
          <input type="text" name="searchBar" id="searchBar" placeholder={`Search ${title}`}></input>
        </div>
      </div>
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
                      <div className="actionButtonContainer">
                        <FaRegEdit
                          className="actionButton"
                          size="18"
                          onClick={() => {
                            handleEdit(buyer);
                            setmenuStateCreate(false);
                          }}
                        ></FaRegEdit>
                        <FaRegTrashAlt
                          className="actionButton"
                          size="18"
                          onClick={() => {
                            handleDelete(buyer._id);
                          }}
                        ></FaRegTrashAlt>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>{error && !showMenu ? <div>{error}</div> : null}</div>
        </div>
      )}
    </div>
  );
}
