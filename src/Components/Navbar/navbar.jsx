import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logoNav">
        <NavLink to="/" exact>
          <img src={"/images/logos.png"} alt="logo" />
        </NavLink>
      </div>
      <ul className="menuBar">
        <li>
          <NavLink to="/product/men" exact>
            Men
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/women" exact>
            Women
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/kids" exact>
            Kids
          </NavLink>
        </li>
      </ul>
      <div className="searchCart">
        <div className="searchBar">
          <input
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL
                + "/images/magnifier.png"})`,
              backgroundPosition: "47vw 5px",
              backgroundRepeat: "no-repeat",
            }}
            type="text"
            className="searchInput"
            placeholder="Search..."
          />
        </div>
        <div className="cartDiv">
          <NavLink to="/cart" exact>
            <i className="cartIcon fas fa-cart-plus"></i>
          </NavLink>
          <span className="badge rounded-pill bg-dark">0</span>
        </div>
        <div className="profileDiv dropstart">
          <i className="profile fas fa-user-alt" data-bs-toggle="dropdown"></i>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="dropdown-item" to="/orders" exact>
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/wishlist" exact>
                My Wishlist
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <NavLink className="dropdown-item" to="/login" exact>
                Sign In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
