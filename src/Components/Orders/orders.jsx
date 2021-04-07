import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "./orders.css";
import { StoreContext } from "../../Store/data";
import Login from "../Login/login";
import Register from "../Register/register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Orders = () => {
  document.title = "Orders";
  const [order, setOrder] = useState([]);
  const [check, setcheck] = useState(false);
  const { value } = useContext(StoreContext);
  const [isLogin, setisLogin] = value;
  const [loginmodal, setloginmodal] = useState(false);
  const [registermodal, setregistermodal] = useState(false);
  useEffect(() => {
    if (isLogin) {
      fetch("http://localhost:5555/order", {
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
          setcheck(true);
          if (data.orderDetail.length > 0) setOrder(data.orderDetail);
          else setOrder([]);
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
          setcheck(true);
        });
    }
  }, [isLogin]);
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
  const getDate = (time) => {
    const yr = new Date().getFullYear() - new Date(time).getFullYear();
    const mon = new Date().getMonth() - new Date(time).getMonth();
    const dy = new Date().getDate() - new Date(time).getDate();
    const hr = new Date().getHours() - new Date(time).getHours();
    const mn = new Date().getMinutes() - new Date(time).getMinutes();
    const sc = new Date().getSeconds() - new Date(time).getSeconds();
    if (yr > 0) return `${yr} years ago`;
    else if (mon > 0) return `${mon + 1} months ago`;
    else if (dy > 0) return `${dy} days ago`;
    else if (hr > 0 && hr < 24) return `${hr} hours ago`;
    else if (mn > 0) return `${mn} minutes ago`;
    else if (sc > 0) return `${sc} seconds ago`;
    else return "just now";
  };
  return (
    <>
      {isLogin ? (
        <div className="container-fluid">
          <div className="row">
            <div className="order-table">
              {order.length > 0 ? (
                <>
                  <div className="order-heading">
                    <i className="fas fa-truck-moving iOrder"></i>
                    <h1>My Orders</h1>
                  </div>
                  <Table
                    responsive="md"
                    className="wishlist-tab align-middle text-center shadow-lg"
                  >
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Product name</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Ordered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((val, index) => (
                        <tr key={index}>
                          <td className="order-product">
                            <Link
                              to={`/product/${val.idealFor}/${val._id}`}
                              exact={true}
                            >
                              <img
                                style={{
                                  width: "10vw",
                                  height: "10vh",
                                  objectFit: "contain",
                                }}
                                src={val.image}
                                alt={val.name}
                                className="img-fluid "
                              />
                            </Link>
                          </td>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              {val.name}
                            </span>
                          </td>
                          <td>{val.size}</td>
                          <td>{val.color}</td>
                          <td>
                            {Math.floor(
                              val.price - (val.price * val.discount) / 100
                            )}
                          </td>
                          <td>{val.quantity}</td>
                          <td>
                            <span className="badge bg-dark">
                              {Math.floor(
                                val.price - (val.price * val.discount) / 100
                              ) * val.quantity}
                            </span>
                          </td>
                          <td>{getDate(val.time)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              ) : check ? (
                <Link to="/" exact={true}>
                  <div className="order-empty">
                    <img
                      style={{
                        width: "100vw",
                        height: "70vh",
                        objectFit: "contain",
                      }}
                      src="/noOrderFound.jpg"
                      alt="noOrderFound"
                      className="img-fluid"
                    />
                    <h4 className="text-muted">
                      Seems like you have no ordered anything yet
                    </h4>
                  </div>
                </Link>
              ) : (
                <Skeleton
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "50px",
                  }}
                  width={600}
                  height={50}
                  count={7}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="col-md-6 offset-md-3 cart-Login">
          <h3>
            Please <span onClick={() => setloginmodal(true)}>Login</span> to
            view orders
          </h3>
        </div>
      )}
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

export default Orders;
