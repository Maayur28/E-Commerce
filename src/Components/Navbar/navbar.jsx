import React from "react";
import "./navbar.css";
import logo from "../../images/logos.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logoNav">
        <img src={logo} alt="logo" />
      </div>
      <ul className="menuBar">
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
      </ul>
      <div className="searchCart">
        <div className="searchBar">
          <input
            type="search"
            className="searchInput"
            placeholder="Search..."
          />
        </div>
        <div className="cartDiv">
          <i className="cartIcon fas fa-cart-plus"></i>
          <span class="badge rounded-pill bg-dark">0</span>
        </div>
        <div className="profileDiv dropstart">
          <i className="profile fas fa-user-alt" data-bs-toggle="dropdown"></i>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="s">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="s">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="s">
                Something else here
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="s">
                Separated link
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
