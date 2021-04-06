import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "./orders.css";
import { StoreContext } from "../../Store/data";
import Login from "../Login/login";
import Register from "../Register/register";

const Orders = () => {
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
        .then((response) => response.json())
        .then((data) => {
          setcheck(true);
          setOrder(data.orderDetail);
        })
        .catch((err) => console.error(err));
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
    return `${new Date(time).getDate()}/${
      new Date(time).getMonth() + 1
    }/${new Date(time).getFullYear()}`;
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
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Date</th>
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
                  <img
                    src="/wishlistEmpty.webp"
                    alt="wishlistempty"
                    style={{
                      width: "100vw",
                      height: "88vh",
                      objectFit: "contain",
                    }}
                  />
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
