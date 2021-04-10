import React, { useState, useEffect, useContext } from "react";
import "./carousel.css";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../Store/data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Skeleton from "react-loading-skeleton";
const Carousel = () => {
  document.title = "Shoes App";
  const [arr, setarr] = useState([]);
  const [current, setcurrent] = useState(0);
  const [active, setactive] = useState(1);
  const [size, setsize] = useState();
  const [color, setcolor] = useState();
  const [check, setcheck] = useState(false);
  const { value, value1, value2 } = useContext(StoreContext);
  const [isLogin] = value;
  // eslint-disable-next-line
  const [cartCount, setcartCount] = value1;
  const [cartitemsTotal, setcartitemsTotal] = value2;
  useEffect(() => {
    fetch("https://mayur28product.herokuapp.com/product")
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((val) => {
        setcheck(true);
        setarr(val.prod);
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "bottom-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
        setcheck(true);
      });
  }, []);
  const prev = () => {
    setactive(0);
    setcurrent((prevState) => {
      return prevState === 0 ? arr.length - 1 : prevState - 1;
    });
  };
  const next = () => {
    setactive(1);
    setcurrent((prevState) => {
      return prevState === arr.length - 1 ? 0 : prevState + 1;
    });
  };
  const selectsize = (e) => {
    setsize(e.target.value);
  };
  const selectcolor = (e) => {
    setcolor(e.target.value);
  };
  const addtoCart = () => {
    if (isLogin) {
      if (cartitemsTotal.find((val) => val._id === arr[current]._id)) {
        toast.info("Already present in cart", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      } else {
        if (!size && !color) {
          toast.error("Please select size & color", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
        } else if (!size) {
          toast.error("Please select size", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
        } else if (!color) {
          toast.error("Please select color", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
        } else {
          const userData = { ...arr[current] };
          userData.size = size;
          userData.color = color;
          delete userData.quantity;
          fetch(`https://mayur28cart.herokuapp.com/cart`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
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
            .then((datarec) => {
              setcartCount(datarec.cartItems.length);
              setcartitemsTotal([...datarec.cartItems]);
              setsize();
              setcolor();
              toast.success("Added to cart", {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
              });
            })
            .catch((err) => {
                toast.error(err.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
              });
              setsize();
              setcolor();
            });
        }
      }
    } else {
      toast.error("Please login to continue", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        {arr.length > 0 ? (
          <div className="carousel">
            <div className="carousel-navigate">
              <i
                className="fas fa-long-arrow-alt-left carousel-navigateArrowleft"
                onClick={prev}
              ></i>
              <h3 className="carousel-heading">{arr[current].name}</h3>
              <i
                className="fas fa-long-arrow-alt-right carousel-navigateArrowright"
                onClick={next}
              ></i>
            </div>
            <div className="carousel-imageDiv">
              {arr.map((slide, index) => {
                return (
                  <span
                    key={index}
                    className={
                      active === 1
                        ? index === current
                          ? "carousel-activeImg"
                          : undefined
                        : index === current
                        ? "carousel-passiveImg"
                        : undefined
                    }
                  >
                    {index === current && (
                      <NavLink
                        to={`/product/${arr[current].category}/${arr[current].id}`}
                        exact
                      >
                        <img
                          className="carousel-img"
                          src={arr[current].image[0]}
                          alt={arr[current].name}
                        />
                      </NavLink>
                    )}
                  </span>
                );
              })}
            </div>
            <div className="carousel-cardPaper card">
              <div className="card-body">
                <div className="carousel-cardBody">
                  <div className="carousel-selectDiv">
                    <span className="carousel-def">Size: </span>
                    <select
                      className="carousel-select"
                      name="size"
                      id="size"
                      onChange={selectsize}
                      value={size}
                    >
                      <option value="">--select--</option>
                      {arr[current].size.map((val, index) => (
                        <option key={index} value={val}>
                          {val}
                        </option>
                      ))}
                    </select>
                    <i className="carousel-selectIcon fas fa-sort-down"></i>
                  </div>
                  <div className="carousel-selectDiv">
                    <span className="carousel-def">Color: </span>
                    <select
                      className="carousel-select"
                      name="color"
                      id="color"
                      onChange={selectcolor}
                      value={color}
                    >
                      <option value="">--select--</option>
                      {arr[current].color.map((val, index) => (
                        <option key={index} value={val}>
                          {val}
                        </option>
                      ))}
                    </select>
                    <i className="carousel-selectIcon fas fa-sort-down"></i>
                  </div>
                  <div className="carousel-price">
                    <i className="carousel-priceicon fas fa-rupee-sign"></i>
                    <h3>
                      {Math.floor(
                        arr[current].price -
                          (arr[current].price * arr[current].discount) / 100
                      )}
                    </h3>
                  </div>
                </div>
                <div className="carousel-cart" onClick={addtoCart}>
                  <i className="carousel-cartIcon fas fa-cart-arrow-down"></i>
                </div>
              </div>
            </div>
          </div>
        ) : check ? (
          <img
            src="/500Error.gif"
            alt="500 Error"
            style={{ width: "100vw", height: "88vh", objectFit: "contain" }}
          />
        ) :<div style={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center',height:'88vh'}}><Skeleton width={400} height={50} style={{marginBottom:'20px'}}/><div style={{display:'flex',flexDirection:'column'}}><Skeleton width={600} height={150} style={{marginBottom:'20px'}}/><Skeleton width={600} height={150}/></div></div>}
      </div>
    </div>
  );
};

export default Carousel;
