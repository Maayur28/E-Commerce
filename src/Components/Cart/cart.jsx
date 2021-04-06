/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import "./cart.css";
import { StoreContext } from "../../Store/data";
import Login from "../Login/login";
import Register from "../Register/register";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {useHistory} from 'react-router-dom';
const Cart = () => {
  document.title="Cart";
  const history=useHistory();
  const { value, value1, value2 } = useContext(StoreContext);
  const [isLogin, setisLogin] = value;
  const [cartCount, setcartCount] = value1;
  // eslint-disable-next-line
  const [cartitemsTotal, setcartitemsTotal] = value2;
  const [loginmodal, setloginmodal] = useState(false);
  const [registermodal, setregistermodal] = useState(false);
  const [cartItem, setcartItem] = useState([]);
  const [outofstock, setoutofstock] = useState([]);
  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalShippingPrice = 0;
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
  useEffect(() => {
    if(isLogin)
    {

      fetch("http://localhost:4444/cart", {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.cartDetail.length > 0) {
          setcartItem(data.cartDetail);
          setcartCount(data.cartDetail.length);
          localStorage.setItem("count", data.cartDetail.length);
          setcartitemsTotal(data.cartDetail);
        } else {
          setcartCount(0);
          setcartItem([]);
          localStorage.setItem("count", 0);
          setcartitemsTotal([]);
        }
      })
      .catch((err) => console.error(err));
    }
  }, [isLogin]);
  const updatedQuan = (e, val) => {
    let resdata = { ...val };
    resdata.quantity = e.target.value;
    fetch("http://localhost:4444/cartquantity", {
      method: "PUT",
      body: JSON.stringify(resdata),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setcartItem(data.cartDetail);
        toast.success("Quantity has been updated successfully", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      })
      .catch((err) => console.error(err));
  };
  const cartRemove = (val) => {
    fetch("http://localhost:4444/cartdelete", {
      method: "DELETE",
      body: JSON.stringify(val),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.cartDetail);
        if (data.cartDetail.length === 0) {
          setcartItem([]);
          setcartCount(0);
          localStorage.setItem("count", 0);
          setcartitemsTotal([]);
        } else {
          setcartItem(data.cartDetail);
          setcartCount(data.cartDetail.length);
          localStorage.setItem("count", data.cartDetail.length);
          setcartitemsTotal(data.cartDetail);
        }
        toast.error("Item has been removed successfully", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      })
      .catch((err) => console.error(err));
  };
  const cartplaceOrder = () => {
    fetch("http://localhost:1111/getprod", {
      method: "PUT",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.prod.length === 0) {
          setoutofstock([]);
          fetch("http://localhost:4444/cartempty", {
            method: "DELETE",
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token"),
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.cart);
              fetch("http://localhost:5555/order", {
                method: "POST",
                body: JSON.stringify(data.cart),
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": localStorage.getItem("x-auth-token"),
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.order) {
                    toast.success("Order has been placed successfully", {
                      position: "bottom-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      progress: undefined,
                    });
                    history.replace('/order');
                  } else {
                    toast.error(
                      "Sorry! Error occured while placing the order",
                      {
                        position: "bottom-center",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        progress: undefined,
                      }
                    );
                  }
                  setcartItem([]);
                  setcartCount(0);
                  localStorage.setItem("count", 0);
                  setcartitemsTotal([]);
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        } else setoutofstock(data.prod);
      })
      .catch((err) => console.error(err));
  };
  if (outofstock.length > 0) {
    toast.error("Sorry! Some items went out of stock", {
      position: "bottom-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {isLogin ? (
            <>
              <div className="cart-productSummary col-lg-8">
                {cartItem.length > 0 && (
                  <h5 style={{ marginLeft: "20px", marginTop: "10px" }}>
                    MY CART({cartItem.length})
                  </h5>
                )}
                {cartItem.length > 0 ? (
                  (cartItem.forEach(
                    (val) => (
                      // eslint-disable-next-line
                      (totalShippingPrice += val.shippingCharges),
                      (totalDiscountedPrice +=
                        Math.floor(
                          val.price - (val.price * val.discount) / 100
                        ) * val.quantity),
                      (totalPrice += val.price * val.quantity)
                    )
                  ),
                  cartItem.map((val, index) => (
                    <div className="card" key={index}>
                      <div
                        className={
                          outofstock.find((value) => value === val._id)
                            ? "cart-bodyoutofStock card-body"
                            : "cart-body card-body"
                        }
                      >
                        <div
                          className="cart-image"
                          style={{
                            height: "30vh",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{
                              width: "150px",
                              height: "100px",
                              objectFit: "contain",
                            }}
                            src={val.image}
                            alt={val.name}
                            className="img-fluid"
                          />
                        </div>
                        <div className="cart-detail">
                          <h5 className="card-title">{val.name}</h5>
                          <h6>{val.description}</h6>
                          <p>Size: {val.size}</p>
                          <p>Color: {val.color}</p>
                          <div className="cart-quantityAlign">
                            <div className="cart-priceShipping">
                              <div className="cart-selectDiv">
                                <span className="select-quantity">Qty: </span>
                                <select
                                  className="cart-select"
                                  name="quantity"
                                  id="quantity"
                                  onChange={(e) => updatedQuan(e, val)}
                                  value={val.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                                <i className="cart-selectIcon fas fa-sort-down"></i>
                              </div>
                            </div>
                          </div>
                          <div className="cart-price">
                            <h6 className="cart-discountedPrice">
                              <i className="fas fa-rupee-sign"></i>
                              {Math.floor(
                                val.price - (val.price * val.discount) / 100
                              )}
                            </h6>
                            <del className="cart-originalPrice">
                              {val.price}
                            </del>
                            <p className="cart-discount">{val.discount}% Off</p>
                          </div>
                          <p className="cart-shipping">
                            Shipping Charges:
                            <i
                              style={{ fontSize: "14px" }}
                              className="text-muted fas fa-rupee-sign"
                            ></i>
                            {val.shippingCharges}
                          </p>
                          <p className="cart-removeDiv">
                            <i className="cart-removeIcon fas fa-trash-alt"></i>
                            <span
                              className="cart-remove"
                              onClick={() => cartRemove(val)}
                            >
                              Remove
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )))
                ) : cartCount === 0 ? (
                  <div className="cart-empty">
                    <img
                      style={{
                        width: "100vw",
                        height: "80vh",
                        objectFit: "contain",
                      }}
                      src="/emptyCart.gif"
                      alt="emptyCart"
                      className="img-fluid"
                    />
                    <h4 className="text-muted">
                      Seems like you have no product in cart
                    </h4>
                  </div>
                ) : (
                  <Skeleton
                    width={800}
                    height={250}
                    count={3}
                    style={{
                      marginTop: "45px",
                      marginLeft: "20px",
                      marginBottom: "20px",
                    }}
                  />
                )}
              </div>
              {cartItem.length > 0 ? (
                <div className="cart-priceSummary col-lg-3">
                  <div className="card cart-summarySticky">
                    <div className="card-body">
                      <h6 className="cart-priceSummaryHead text-muted">
                        PRICE DETAILS
                      </h6>
                      <div className="cart-priceSummaryPrice">
                        <h6>Price</h6>
                        <span>
                          <i className="fas fa-rupee-sign"></i>
                          {cartItem.length > 0 ? totalDiscountedPrice : null}
                        </span>
                      </div>
                      <div className="cart-priceSummaryShipping">
                        <h6>Shipping Charges</h6>
                        <span>
                          <i className="fas fa-rupee-sign"></i>
                          {cartItem.length > 0 ? totalShippingPrice : null}
                        </span>
                      </div>

                      <div className="cart-priceSummaryTotal">
                        <h6 className="cart-totalAmount">Total Amount</h6>
                        <span>
                          <i className="fas fa-rupee-sign"></i>
                          {cartItem.length > 0
                            ? totalShippingPrice + totalDiscountedPrice
                            : null}
                        </span>
                      </div>
                      <div>
                        <p className="cart-Saving">
                          Your Total Saving on this order
                          <i className="fas fa-rupee-sign"></i>
                          {totalPrice -
                            totalDiscountedPrice -
                            totalShippingPrice}
                        </p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button
                        className="cart-placeOrder"
                        onClick={cartplaceOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                cartCount !== 0 && (
                  <Skeleton
                    style={{ position: "absolute", right: "5%", top: "18%" }}
                    width={400}
                    height={300}
                  />
                )
              )}
            </>
          ) : (
            <div className="col-md-6 offset-md-3 cart-Login">
              <h3>
                Please <span onClick={() => setloginmodal(true)}>Login</span> to
                view cart
              </h3>
            </div>
          )}
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
    </>
  );
};
export default Cart;
