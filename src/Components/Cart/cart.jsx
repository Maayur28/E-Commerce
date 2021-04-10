/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import "./cart.css";
import { StoreContext } from "../../Store/data";
import Login from "../Login/login";
import Register from "../Register/register";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useHistory } from "react-router-dom";
const Cart = () => {
  document.title = "Cart";
  const history = useHistory();
  const { value, value1, value2 } = useContext(StoreContext);
  const [isLogin, setisLogin] = value;
  const [cartCount, setcartCount] = value1;
  // eslint-disable-next-line
  const [cartitemsTotal, setcartitemsTotal] = value2;
  const [loginmodal, setloginmodal] = useState(false);
  const [registermodal, setregistermodal] = useState(false);
  const [cartItem, setcartItem] = useState([]);
  const [outofstock, setoutofstock] = useState([]);
  const [iswait, setiswait] = useState(false);
  const [check, setcheck] = useState(false);
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
    if (isLogin) {
      setcheck(false);
      fetch("https://mayur28cart.herokuapp.com/cart", {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .then((data) => {
          if (data.cartDetail.length > 0) {
            setcartItem(data.cartDetail);
            setcartCount(data.cartDetail.length);
            setcartitemsTotal(data.cartDetail);
          } else {
            setcartItem([]);
            setcartCount(0);
            setcartitemsTotal([]);
            setcheck(true);
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
          setcheck(true);
        });
    }
  }, [isLogin]);
  const updatedQuan = (e, val) => {
    let resdata = { ...val };
    resdata.quantity = e.target.value;
    fetch("https://mayur28cart.herokuapp.com/cartquantity", {
      method: "PUT",
      body: JSON.stringify(resdata),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        setcartItem(data.cartDetail);
        toast.success("Quantity has been updated", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      })
      .catch((err) => { toast.error(err.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      })
    });
  };
  const cartRemove = (val) => {
    fetch("https://mayur28cart.herokuapp.com/cartdelete", {
      method: "DELETE",
      body: JSON.stringify(val),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        console.log(data.cartDetail);
        if (data.cartDetail.length === 0) {
          setcartItem([]);
          setcartCount(0);
          setcartitemsTotal([]);
          setcheck(true);
        } else {
          setcartItem(data.cartDetail);
          setcartCount(data.cartDetail.length);
          setcartitemsTotal(data.cartDetail);
        }
        toast.error("Item has been removed", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      })
      .catch((err) => toast.error(err.message, {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      })
      );
      setcheck(true);
  };
  const cartplaceOrder = () => {
    setiswait(true);
    fetch("https://mayur28product.herokuapp.com/getprod", {
      method: "PUT",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        if (data.prod.length === 0) {
          setoutofstock([]);
          fetch("https://mayur28cart.herokuapp.com/cartempty", {
            method: "DELETE",
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token"),
            },
          })
            .then((response) => {
              if (response.status >= 200 && response.status <= 299) {
                return response.json();
              } else {
                return response.text().then((text) => {
                  throw new Error(text);
                });
              }
            })
            .then((data) => {
              fetch("http://localhost:5555/order", {
                method: "POST",
                body: JSON.stringify(data.cart),
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": localStorage.getItem("x-auth-token"),
                },
              })
                .then((response) =>  {
                  if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                  } else {
                    return response.text().then((text) => {
                      throw new Error(text);
                    });
                  }
                })
                .then((data) => {
                  if (data.order) {
                    setiswait(false);
                    toast.success("Order has been placed successfully", {
                      position: "bottom-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      progress: undefined,
                    });
                    history.replace("/order");
                  } else {
                    setiswait(false);
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
                  setcartitemsTotal([]);
                })
                .catch((err) =>  {toast.error(
                    "Sorry! Server is busy,Please try again later",
                  {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                  });setiswait(false) });
            })
            .catch((err) =>  {toast.error(
              "Sorry! Server is busy,Please try again later",
            {
              position: "bottom-center",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
            }
          );setiswait(false)});
        } else {
          setoutofstock(data.prod);
          setiswait(false);
        }
      })
      .catch((err) =>  {toast.error(
        "Sorry! Server is busy,Please try again later",
      {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      }
    );setiswait(false)});
  };
  if (outofstock.length > 0) {
    setiswait(false);
    toast.error("Sorry! Some items went out of stock", {
      position: "bottom-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });
  }
useEffect(() => {
  if(cartItem.length>0)
  setcheck(true);
}, [cartItem])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {isLogin ? (
            <>
              {cartItem.length > 0 ? (
                <>
                  <div className="cart-productSummary col-lg-8">
                    <h5 style={{ marginLeft: "20px", marginTop: "10px" }}>
                      MY CART({cartItem.length})
                    </h5>
                    {
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
                                    <span className="select-quantity">
                                      Qty:{" "}
                                    </span>
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
                                <p className="cart-discount">
                                  {val.discount}% Off
                                </p>
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
                    }
                  </div>
                  {
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
                              {cartItem.length > 0
                                ? totalDiscountedPrice
                                : null}
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
                          disabled={iswait}
                            className="cart-placeOrder"
                            onClick={cartplaceOrder}
                          >
                            {iswait ? (
                              <span
                                className="spinner-grow spinner-grow-sm"
                                style={{ marginRight: "5px" }}
                              ></span>
                            ) : null}
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                </>
              ) : !check ? (
                <div style={{ marginLeft: "50px" }}>
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
                </div>
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
                <img
                  src="/500Error.gif"
                  alt="500 Error"
                  style={{
                    width: "100vw",
                    height: "80vh",
                    objectFit: "contain",
                  }}
                />
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
