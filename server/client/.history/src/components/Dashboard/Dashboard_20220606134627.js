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
          <FaUserCircle className="sidebarIcon navButton miscButtons" size={35}></FaUserCircle>
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
        open={showMenu}
        closeOnDocumentClick
        onClose={() => {
          setCustomError(null);
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
              <div className="modalHeader"> {menuStateCreate ? "Add product" : "Update product"} </div>
              <div className="modalContent">
                <form>
                  <div>
                    <fieldset>
                      <legend>Name</legend>
                      <label htmlFor="name"></label>
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
                    </fieldset>
                    <div className="numberValues">
                      <fieldset>
                        <legend>Quantity</legend>
                        <label htmlFor="quantity"></label>
                        <input
                          required
                          type="text"
                          id="quantity"
                          name="quantity"
                          onChange={(e) => {
                            setNewProductQuantity(e.target.value);
                          }}
                          onBlur={(e) => {
                            if (!e.target.value || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
                              setNewProductQuantity("0.0");
                            } else {
                              setNewProductQuantity(Number(newProductQuantity).toFixed(1));
                            }
                          }}
                          onKeyPress={(e) => {
                            if (!/[0-9.]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          value={newProductQuantity}
                        ></input>
                      </fieldset>
                      <fieldset>
                        <legend>Price</legend>
                        <label htmlFor="price"></label>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          onChange={(e) => {
                            setNewProductPrice(e.target.value);
                          }}
                          onBlur={(e) => {
                            if (!e.target.value || Number(e.target.value) === 0 || isNaN(Number(e.target.value))) {
                              setNewProductPrice("0.00");
                            } else {
                              setNewProductPrice(Number(newProductPrice).toFixed(2));
                            }
                          }}
                          onKeyPress={(e) => {
                            if (!/[0-9.]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          value={newProductPrice}
                        ></input>
                      </fieldset>
                    </div>
                  </div>
                  <button
                    className="postActionButton"
                    onClick={(e) => {
                      handlePostAction(e);
                    }}
                  >
                    Update info
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
