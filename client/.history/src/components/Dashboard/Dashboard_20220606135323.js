import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import "reactjs-popup/dist/index.css";
import "./Popup.css";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { FaFileInvoiceDollar, FaHome, FaStore, FaProductHunt, FaSignOutAlt, FaUserCircle, FaUser } from "react-icons/fa";

export default function Dashboard(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const [userCompanyName, setUserCompanyName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");
  const [userZip, setUserZip] = useState("");

  return auth.accessToken ? (
    <div className="dashboardPage">
      <div className="sidebarContainer">
        <div className="navLinks">
          <NavLink
            to="/dashboard"
            exact="true"
            end
            className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
            id="navBuyersButton"
          >
            <FaHome className="sidebarIcon" size={30}></FaHome>
          </NavLink>
          <NavLink
            to="/dashboard/products"
            exact="true"
            className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
            id="navProductsButton"
          >
            <FaProductHunt className="sidebarIcon" size={30}></FaProductHunt>
          </NavLink>
          <NavLink
            to="/dashboard/buyers"
            exact="true"
            className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
            id="navBuyersButton"
          >
            <FaStore className="sidebarIcon" size={30}></FaStore>
          </NavLink>
          <NavLink
            to="/dashboard/invoices"
            exact="true"
            className={({ isActive }) => (isActive ? "active navButton" : "inactive navButton")}
            id="navInvoicesButton"
          >
            <FaFileInvoiceDollar className="sidebarIcon" size={30}></FaFileInvoiceDollar>
          </NavLink>
        </div>
        <div className="miscButtonsContainer">
          <FaUserCircle
            className="sidebarIcon navButton miscButtons"
            size={35}
            onClick={() => {
              setShowUserMenu(true);
            }}
          ></FaUserCircle>
          <FaSignOutAlt className="sidebarIcon navButton miscButtons" size={35} onClick={logout}></FaSignOutAlt>
        </div>
      </div>
      <div className="dashboardInfoContainer">
        <div className="dashboardInfoPage">
          <div className="infoPagePadding">
            <div className="infoContainer">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
      <Popup
        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
        modal
        open={showUserMenu}
        closeOnDocumentClick
        onClose={() => {
          setShowUserMenu(false);
        }}
      >
        {(close) => {
          return (
            <div className="modal">
              <button
                className="modalClose"
                onClick={() => {
                  setShowUserMenu(false);
                }}
              >
                &times;
              </button>
              <div className="modalHeader">Company info</div>
              <div className="modalContent">
                <form>
                  <div>
                    <div className="buyerInputRow">
                      <fieldset>
                        <legend>Name</legend>
                        <label htmlFor="name"></label>
                        <input
                          required
                          type="text"
                          id="name"
                          name="name"
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                          value={userName}
                        ></input>
                      </fieldset>
                      <fieldset>
                        <legend>Phone</legend>
                        <label htmlFor="phoneNumber"></label>
                        <input
                          required
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          onChange={(e) => {
                            setUserPhoneNumber(e.target.value);
                          }}
                          value={userPhoneNumber}
                        ></input>
                      </fieldset>
                    </div>
                    <div className="buyerInputRow">
                      <fieldset>
                        <legend>Address</legend>
                        <label htmlFor="address"></label>
                        <input
                          required
                          type="text"
                          id="address"
                          name="address"
                          onChange={(e) => {
                            setUserAddress(e.target.value);
                          }}
                          value={userAddress}
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
                            setUserCity(e.target.value);
                          }}
                          value={userCity}
                        ></input>
                      </fieldset>
                    </div>
                    <div className="buyerInputRow">
                      <fieldset>
                        <legend>State</legend>
                        <label htmlFor="address"></label>
                        <select
                          id="address"
                          name="address"
                          onChange={(e) => {
                            setUserState(e.target.value);
                          }}
                          value={userState}
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
                            setUserZip(e.target.value);
                          }}
                          value={userZip}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        ></input>
                      </fieldset>
                    </div>
                  </div>
                  <button className="postActionButton" onClick={(e) => {}}>
                    {"Update Info"}
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Popup>
    </div>
  ) : (
    <div>please login</div>
  );
}
