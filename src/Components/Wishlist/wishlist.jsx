import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./wishlist.css";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { StoreContext } from "../../Store/data";
import Login from "../Login/login";
import Register from "../Register/register";
import "react-toastify/dist/ReactToastify.min.css";
const Wishlist = () => {
  document.title = "Wishlist";
  const [wish, setwish] = useState([]);
  const [check, setcheck] = useState(false);
  const { value } = useContext(StoreContext);
  const [isLogin, setisLogin] = value;
  const [loginmodal, setloginmodal] = useState(false);
  const [registermodal, setregistermodal] = useState(false);
  useEffect(() => {
    if (isLogin) {
      fetch("http://localhost:2222/getwishlist", {
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
        .then((datawish) => {
          setcheck(true);
          if (datawish.wish.length > 0) {
            setwish(datawish.wish);
          } else {
            setwish([]);
          }
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
  const wishRemove = (val) => {
    fetch("http://localhost:2222/removewishlist", {
      method: "DELETE",
      body: JSON.stringify(val),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.error("Item has been removed from wishlist", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
        setcheck(true);
        setwish([...data.wish]);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      {isLogin ? (
        <div className="container-fluid">
          <div className="row">
            <div className="wishlist-table">
              {wish.length > 0 ? (
                <>
                  <i className="far fa-heart iwishlist"></i>
                  <h1>My Wishlist</h1>
                  <Table
                    responsive="md"
                    className="wishlist-tab align-middle text-center shadow-lg"
                  >
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Product name</th>
                        <th>Rating</th>
                        <th>Unit Price(now)</th>
                        <th>Unit Price(when added)</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wish.map((val, index) => (
                        <tr key={index}>
                          <td className="wishlist-product">
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
                            <span className="">{val.name}</span>
                          </td>
                          <td>
                            <span class="badge bg-success">{val.rating}</span>
                          </td>
                          <td style={{ fontWeight: "bolder" }}>
                            {Math.floor(
                              val.price - (val.price * val.discount) / 100
                            )}
                          </td>
                          <td>{val.price}</td>
                          <td>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Remove</Tooltip>}
                            >
                              <i
                                className="wishlist-remove fas fa-times"
                                onClick={() => wishRemove(val)}
                              ></i>
                            </OverlayTrigger>
                          </td>
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
            view wishlist
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

export default Wishlist;
