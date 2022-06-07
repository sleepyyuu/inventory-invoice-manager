import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import "./Buyers.css";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Popup from "reactjs-popup";
import LoadingBar from "../../LoadingBar";

export default function Buyers(props) {
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [buyers, setBuyers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [newBuyerName, setNewBuyerName] = useState("");
  const [newBuyerId, setNewBuyerId] = useState("");
  const [newBuyerPhoneNumber, setNewBuyerPhoneNumber] = useState("");
  const [newBuyerAddress, setNewBuyerAddress] = useState("");
  const [newBuyerCity, setNewBuyerCity] = useState("");
  const [newBuyerState, setNewBuyerState] = useState("");
  const [newBuyerZip, setNewBuyerZip] = useState("");
  const [error, setError] = useState();
  const title = "Buyers";
  const route = "/buyers";
  const getDB = async () => {
    const responseBuyers = await verify("readAll", route);
    setBuyers(responseBuyers);
    // setLoading(false);
  };
  useEffect(() => {
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
      city: newBuyerCity,
      state: newBuyerState,
      zip: newBuyerZip,
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
    setNewBuyerCity(buyer.city);
    setNewBuyerState(buyer.state);
    setNewBuyerZip(buyer.zip);
    setShowMenu(true);
  };

  const handleAdd = async () => {
    setError(null);
    setNewBuyerName("");
    setNewBuyerPhoneNumber("");
    setNewBuyerAddress("");
    setNewBuyerId("");
    setNewBuyerCity("");
    setNewBuyerState("");
    setNewBuyerZip("");
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
                          <fieldset>
                            <legend>City</legend>
                            <label htmlFor="city"></label>
                            <input
                              required
                              type="text"
                              id="city"
                              name="city"
                              onChange={(e) => {
                                setNewBuyerCity(e.target.value);
                              }}
                              value={newBuyerCity}
                            ></input>
                          </fieldset>
                          <fieldset>
                            <legend>State</legend>
                            <label htmlFor="address"></label>
                            <select
                              id="address"
                              name="address"
                              onChange={(e) => {
                                setNewBuyerState(e.target.value);
                              }}
                              value={newBuyerState}
                            >
                              <option value="AL">AL</option>
                              <option value="AK">AK</option>
                              <option value="AR">AR</option>
                              <option value="AZ">AZ</option>
                              <option value="CA">CA</option>
                              <option value="CO">CO</option>
                              <option value="CT">CT</option>
                              <option value="DC">DC</option>
                              <option value="DE">DE</option>
                              <option value="FL">FL</option>
                              <option value="GA">GA</option>
                              <option value="HI">HI</option>
                              <option value="IA">IA</option>
                              <option value="ID">ID</option>
                              <option value="IL">IL</option>
                              <option value="IN">IN</option>
                              <option value="KS">KS</option>
                              <option value="KY">KY</option>
                              <option value="LA">LA</option>
                              <option value="MA">MA</option>
                              <option value="MD">MD</option>
                              <option value="ME">ME</option>
                              <option value="MI">MI</option>
                              <option value="MN">MN</option>
                              <option value="MO">MO</option>
                              <option value="MS">MS</option>
                              <option value="MT">MT</option>
                              <option value="NC">NC</option>
                              <option value="NE">NE</option>
                              <option value="NH">NH</option>
                              <option value="NJ">NJ</option>
                              <option value="NM">NM</option>
                              <option value="NV">NV</option>
                              <option value="NY">NY</option>
                              <option value="ND">ND</option>
                              <option value="OH">OH</option>
                              <option value="OK">OK</option>
                              <option value="OR">OR</option>
                              <option value="PA">PA</option>
                              <option value="RI">RI</option>
                              <option value="SC">SC</option>
                              <option value="SD">SD</option>
                              <option value="TN">TN</option>
                              <option value="TX">TX</option>
                              <option value="UT">UT</option>
                              <option value="VT">VT</option>
                              <option value="VA">VA</option>
                              <option value="WA">WA</option>
                              <option value="WI">WI</option>
                              <option value="WV">WV</option>
                              <option value="WY">WY</option>
                            </select>
                          </fieldset>
                          <fieldset>
                            <legend>Zip Code</legend>
                            <label htmlFor="zip"></label>
                            <input
                              required
                              type="text"
                              id="zip"
                              name="zip"
                              placeholder="00000"
                              maxLength="5"
                              onChange={(e) => {
                                setNewBuyerZip(e.target.value);
                              }}
                              value={newBuyerZip}
                              onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
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
        <LoadingBar></LoadingBar>
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
