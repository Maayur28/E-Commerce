import React from "react";
import "./navbar.css";
import logo from "../../images/logos.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logoNav">
        <img src={logo} alt="logo" />
      </div>
      <div className="menuBar">
        <div className="menu">
        <span>Men</span>
        <span className="menuline"></span>
        </div>
        <div className="menu">
        <span>Women</span>
        <span className="menuline"></span>
        </div>
        <div className="menu">
        <span>Kids</span>
        <span className="menuline"></span>
        </div>
      </div>
      <div className="searchCart">
        <div className="searchBar">
          <input
            type="text"
            className="searchInput"
            placeholder="Search..."
          />
        </div>
        <div className="cartDiv">
          <i className="cartIcon fas fa-cart-plus"></i>
          <span className="badge rounded-pill bg-dark">0</span>
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
