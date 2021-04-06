import React, { useContext } from "react";
import "./productDetail.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../Store/data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const ProductDetail = (props) => {
  const history = useHistory();
  const category = props.match.params.category;
  const id = props.match.params.id;
  const [data, setData] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [star, setStar] = useState([]);
  const [icon, setIcon] = useState(false);
  const [currentThumbnail, setcurrentThumbnail] = useState(0);
  const { value, value1, value2 } = useContext(StoreContext);
  const [isLogin] = value;
  // eslint-disable-next-line
  const [cartCount, setcartCount] = value1;
  const [cartitemsTotal, setcartitemsTotal] = value2;
  useEffect(() => {
    fetch(`http://localhost:1111/product/${category}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setSize(data.size[0]);
        setColor(data.color[0]);
        setStar([]);
        for (let i = 1; i <= 5; i++) {
          if (Math.round(data.rating) >= i)
            setStar((prevState) => [...prevState, "fas fa-star"]);
          else setStar((prevState) => [...prevState, "far fa-star"]);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [category, id]);
  useEffect(() => {
    if (isLogin) {
      fetch("http://localhost:2222/getwishlist", {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
        .then((response) => response.json())
        .then((datawish) => {
          console.log(datawish.wish, data);
          if (datawish.wish.find((val) => val._id === data._id)) setIcon(true);
          else setIcon(false);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [isLogin,data]);
  const toggleIcon = (val) => {
    if (isLogin) {
      fetch("http://localhost:2222/togglewishlist", {
        method: "POST",
        body: JSON.stringify(val),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
        .then((response) => response.json())
        .then((datarec) => {
          if (datarec.toggle) setIcon(true);
          else setIcon(false);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
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
  const thumbImg = (val) => {
    setcurrentThumbnail(data.image.indexOf(val));
  };
  const rightIcon = () => {
    if (currentThumbnail === data.image.length - 1) {
      setcurrentThumbnail(0);
    } else setcurrentThumbnail((prevState) => prevState + 1);
  };
  const leftIcon = () => {
    if (currentThumbnail === 0) {
      setcurrentThumbnail(data.image.length - 1);
    } else setcurrentThumbnail((prevState) => prevState - 1);
  };
  const settheSize = (val) => {
    setSize(val);
  };
  const settheColor = (val) => {
    setColor(val);
  };
  const addprducttoCart = () => {
    if (isLogin) {
      if (cartitemsTotal.find((val) => val._id === data._id)) {
        history.push("/cart");
      } else {
        const userData = { ...data };
        userData.size = size;
        userData.color = color;
        delete userData.quantity;
        fetch(`http://localhost:4444/cart`, {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-auth-token": localStorage.getItem("x-auth-token"),
          },
        })
          .then((response) => response.json())
          .then((datarec) => {
            localStorage.setItem("count", datarec.cartItems.length);
            setcartCount(datarec.cartItems.length);
            setcartitemsTotal([...datarec.cartItems]);
            toast.success("Added to cart successfully", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
            });
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
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
      {data ? (
        <div className="row">
          <div className="left-content col-10 offset-1 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-4 offset-lg-0">
            <h2>{data.name}</h2>
            <h5 className="text-muted">{data.description}</h5>
            <div className="cartWish">
              <button className="addToCart " onClick={addprducttoCart}>
                {cartitemsTotal.find((val) => val._id === data._id)
                  ? "GO TO CART"
                  : "ADD TO CART"}
              </button>
              <i
                className={icon ? "fas fa-heart" : "far fa-heart"}
                onClick={() => toggleIcon(data)}
              ></i>
            </div>
          </div>
          <div className="middle-content col-10 offset-1 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-4 offset-lg-0">
            <div className="back">
              <span onClick={() => history.goBack()}>
                <i className="fas fa-long-arrow-alt-left"></i>Back
              </span>
            </div>
            <img
              src={data.image[currentThumbnail]}
              alt={data.name}
              className="img-fluid"
            />
            <div className="imageThumbnail">
              <i className="fas fa-caret-square-left" onClick={leftIcon}></i>
              {data.image.map((val, index) => (
                <img
                  key={index}
                  src={val}
                  className={
                    val === data.image[currentThumbnail]
                      ? "img-thumbnail masking"
                      : "img-thumbnail"
                  }
                  alt="imagesShoes"
                  onClick={() => thumbImg(val)}
                />
              ))}
              <i className="fas fa-caret-square-right" onClick={rightIcon}></i>
            </div>
          </div>
          <div className="right-content col-10 offset-1  col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-4 offset-lg-0">
            <div className="right size">
              <h5>Size</h5>
              {data.size.map((val, index) => (
                <span
                  key={index}
                  className={val === size ? "activeSize" : "sizeBox"}
                  onClick={() => settheSize(val)}
                >
                  {val}
                </span>
              ))}
            </div>
            <div className="right rating">
              <h5 className="text-muted">Rating</h5>
              <span className="star">
                {star.map((val, index) => (
                  <i key={index} className={val}></i>
                ))}
              </span>
            </div>
            <div className="right price">
              <h5 className="text-muted">Price</h5>
              <span> $750</span>
            </div>
            <div className="right color">
              <h5>Color</h5>
              {data.color.map((val, index) => (
                <span
                  key={index}
                  className="colorBox"
                  style={{ backgroundColor: val }}
                  onClick={() => settheColor(val)}
                >
                  {val === color ? (
                    <i className="active fas fa-check-circle"></i>
                  ) : (
                    <i className="passive fas fa-check-circle"></i>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
