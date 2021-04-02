import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Login from "../Login/login";
import Register from "../Register/register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const Navbar = () => {
  const [loginmodal, setloginmodal] = useState(false);
  const [registermodal, setregistermodal] = useState(false);
  const [isLogin, setisLogin] = useState(localStorage.length>0?true:false);
  const handleLoginLaunch = (val) => {
    setloginmodal(false);
    setregistermodal(val);
  };
  const handleRegisterLaunch = (val) => {
    setregistermodal(false);
    setloginmodal(val);
  };
  const handleisLogin = (val) => {
    setregistermodal(false);
    setloginmodal(false);
    setisLogin(val);
  };
  const handleloginLogout = () => {
    if (!isLogin) setloginmodal(true);
    else {
      localStorage.clear();
      setisLogin(false);
      toast.error("Logout Successful", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      })
    }
  };
  return (
    <>
    <div className="navbar">
      <div className="navbar-logoNav">
        <Link to="/">
          <img src={"/images/logos.png"} alt="logo" />
        </Link>
      </div>
      <ul className="navbar-menuBar">
        <li>
          <Link to="/product/men" exact>
            Men
          </Link>
        </li>
        <li>
          <Link to="/product/women" exact>
            Women
          </Link>
        </li>
        <li>
          <Link to="/product/kids" exact>
            Kids
          </Link>
        </li>
      </ul>
      <div className="navbar-searchCart">
        <div className="navbar-searchBar">
          <input
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/images/magnifier.png"
              })`,
              backgroundPosition: "47vw 5px",
              backgroundRepeat: "no-repeat",
            }}
            type="text"
            className="navbar-searchInput"
            placeholder="Search..."
          />
        </div>
        <div className="navbar-cartDiv">
          <Link to="/cart" exact>
            <i className="navbar-cartIcon fas fa-cart-plus"></i>
          </Link>
          <span className="navbar-cartBadge badge rounded-pill bg-dark">0</span>
        </div>
        <div className="navbar-profileDiv dropstart">
          <i
            className="navbar-profile fas fa-user-alt"
            data-bs-toggle="dropdown"
          ></i>
          <ul className="navbar-prodfileDropdown dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/orders" exact>
                My Orders
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/wishlist" exact>
                My Wishlist
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Button
                className="dropdown-item"
                type="button"
                onClick={handleloginLogout}
              >
                {isLogin ? "Sign out" : "Sign in"}
              </Button>
            </li>
          </ul>
        </div>
      </div>
      {loginmodal ? <Login handleloginLaunch={handleLoginLaunch} handleisLogin={handleisLogin} /> : null}
      {registermodal ? (
        <Register
          handleRegisterLaunch={handleRegisterLaunch}
          handleisLogin={handleisLogin}
        />
      ) : null}
    </div>
       <ToastContainer
        position="bottom-center"
        autoClose={1999}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </>
  );
};

export default Navbar;
