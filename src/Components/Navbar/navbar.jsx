import React, { useState, useContext } from "react";
import "./navbar.css";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Login from "../Login/login";
import Register from "../Register/register";
import { StoreContext } from "../../Store/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const Navbar = () => {
  const history = useHistory();
  const { value, value1 } = useContext(StoreContext);
  const [isLogin, setisLogin] = value;
  const [cartCount, setcartCount] = value1;
  const [loginmodal, setloginmodal] = useState(false);
  const [registermodal, setregistermodal] = useState(false);
  const [togglewidth, settogglewidth] = useState(0);
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
      setcartCount(0);
      toast.error("Logout Successful", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  };
  const navigateComp = (val) => {
    settogglewidth(0);
    history.push(`/product/${val}`);
  };
  return (
    <>
      <div className="navbar-mainDiv">
        <div className="navbar-logoNav">
          <Link to="/">
            <img src={"/images/logos.png"} alt="logo" />
          </Link>
        </div>
        <div className="navbar-cartDivAlignResponsive">
          <div className="navbar-cartDiv">
            <Link to="/cart" exact>
              <i className="navbar-cartIcon fas fa-cart-plus"></i>
            </Link>
            <span className="navbar-cartBadge badge rounded-pill bg-dark">
              {cartCount}
            </span>
          </div>
        </div>
        <i className="fas fa-sliders-h" onClick={() => settogglewidth(110)}></i>
        <ul
          className="navbar-menuBarResponsive"
          style={{ width: `${togglewidth}vw` }}
        >
          <i
            className="navbar-responsiveCross fas fa-times"
            onClick={() => settogglewidth(0)}
          ></i>
          <li onClick={() => navigateComp("men")}>
            <Link>
              <i className="fas fa-male"></i> Men
            </Link>
          </li>
          <li onClick={() => navigateComp("men")}>
            <Link>
              <i className="fas fa-female"></i> Women
            </Link>
          </li>
          <li onClick={() => navigateComp("men")}>
            <Link>
              <i className="fas fa-child"></i> Kids
            </Link>
          </li>
          <li onClick={() => navigateComp("men")}>
            <Link>
              <i className="fas fa-store"></i> My Orders
            </Link>
          </li>
          <li onClick={() => navigateComp("men")}>
            <Link>
              <i className="fas fa-clipboard-list"></i> My Wishlist
            </Link>
          </li>
        </ul>
        <div className="navbar-content">
          <ul className="navbar-menuBar">
            <li>
              <Link to="/product/men">Men</Link>
            </li>
            <li>
              <Link to="/product/women">Women</Link>
            </li>
            <li>
              <Link to="product/kids">Kids</Link>
            </li>
          </ul>
          <div className="navbar-cartDivAlign">
            <div className="navbar-cartDiv">
              <Link to="/cart" exact>
                <i className="navbar-cartIcon fas fa-cart-plus"></i>
              </Link>
              <span className="navbar-cartBadge badge rounded-pill bg-dark">
                {cartCount}
              </span>
            </div>
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
        {loginmodal ? (
          <Login
            handleloginLaunch={handleLoginLaunch}
            handleisLogin={handleisLogin}
          />
        ) : null}
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
