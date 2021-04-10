import React, { useState, useEffect, useContext } from "react";
import "./product.css";
import CheckboxComp from "./checkbox";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { StoreContext } from "../../Store/data";
import { Modal } from "react-bootstrap";
const Product = (props) => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  let count = 0;
  const categoryArray = ["Sports", "Formal", "Casual"];
  const sizeArray = ["XS", "S", "M", "L", "XL"];
  const [categoryCheck, setcategoryCheck] = useState([]);
  const [modaldata, setModalData] = useState();
  const [modalsize, setmodalSize] = useState();
  const [modalcolor, setmodalColor] = useState();
  const [pricerangeMin, setpricerangeMin] = useState();
  const [pricerangeMax, setpricerangeMax] = useState();
  const [pricerangeValue, setpricerangeValue] = useState();
  const [filterSize, setfilterSize] = useState([]);
  const [filtercolorArray, setfiltercolorArray] = useState([]);
  const [filtercolorData, setfiltercolorData] = useState([]);
  const [productCount, setproductCount] = useState(0);
  const [wishlist, setwishlist] = useState([]);
  const [check, setcheck] = useState(false);
  const category = props.match.params.category;
  const { value, value1, value2 } = useContext(StoreContext);
  const [isLogin] = value;
  // eslint-disable-next-line
  const [cartCount, setcartCount] = value1;
  const [cartitemsTotal, setcartitemsTotal] = value2;
  // eslint-disable-next-line
  useEffect(() => {
    setData([]);
    document.title = category.toUpperCase();
    setproductCount(0);
    setcheck(false);
    fetch(`https://mayur28product.herokuapp.com/product/${category}`)
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
        setData(data);
        setpricerangeMin(
          data
            .map((val) => {
              return val.price;
            })
            .reduce((prev, curr) => {
              return prev < curr ? prev : curr;
            })
        );
        setpricerangeMax(
          data
            .map((val) => {
              return val.price;
            })
            .reduce((prev, curr) => {
              return prev > curr ? prev : curr;
            })
        );
        setpricerangeValue(
          data
            .map((val) => {
              return val.price;
            })
            .reduce((prev, curr) => {
              return prev > curr ? prev : curr;
            })
        );
        data.map((val) =>
          setfiltercolorArray((prevState) => [...prevState, ...val.color])
        );
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
    if (isLogin) {
      setcheck(false);
      fetch("http://localhost:2222/getwishlist", {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
        .then((response) =>{
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .then((datawish) => {setwishlist(datawish.wish)})
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [category, isLogin]);
  useEffect(() => {
   if(data.length>0)
    setcheck(true);
  }, [data]);
  const collapse = (e) => {
    if (e.target.nextSibling.style.display === "none") {
      e.target.children[0].className = "fas fa-minus";
      e.target.nextSibling.style.display = "block";
    } else {
      e.target.nextSibling.style.display = "none";
      e.target.children[0].className = "fas fa-plus";
    }
  };
  const productWishlist = (e, val) => {
    if (isLogin) {
      fetch("http://localhost:2222/togglewishlist", {
        method: "POST",
        body: JSON.stringify(val),
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
          if (datarec.toggle) e.target.className = "fas fa-heart";
          else e.target.className = "far fa-heart";
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
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

  const gotoDetails = (category, id) => {
    props.history.push(`/product/${category}/${id}`);
  };
  const productmodalColor = (val) => {
    setmodalColor(val);
  };
  const productmodalSize = (val) => {
    setmodalSize(val);
  };
  const changeSelectArrow = (e) => {
    if (e.target.nextSibling.className === "fas fa-angle-double-down")
      e.target.nextSibling.className = "fas fa-angle-double-up";
    else e.target.nextSibling.className = "fas fa-angle-double-down";
  };
  const handleCategoryCheckBox = (e) => {
    count = 0;
    setproductCount(0);
    if (categoryCheck.includes(e.target.value)) {
      setcategoryCheck(
        categoryCheck.filter((val) => {
          return val !== e.target.value;
        })
      );
    } else setcategoryCheck((prevState) => [...prevState, e.target.value]);
  };
  const getSliderValue = (e) => {
    count = 0;
    setproductCount(0);
    setpricerangeValue(e.target.value);
  };
  const handleFilterSize = (e) => {
    count = 0;
    setproductCount(0);
    if (filterSize.includes(e.target.value)) {
      setfilterSize(
        filterSize.filter((val) => {
          return val !== e.target.value;
        })
      );
    } else setfilterSize((prevState) => [...prevState, e.target.value]);
  };
  const handlefilterColor = (value) => {
    count = 0;
    setproductCount(0);
    if (filtercolorData.includes(value)) {
      setfiltercolorData(
        filtercolorData.filter((val) => {
          return val !== value;
        })
      );
    } else setfiltercolorData((prevState) => [...prevState, value]);
    console.log(filtercolorData);
  };
  const productSortRight = (e) => {
    if (e.target.value === "price(ltoh)") {
      setData((prevState) => [
        ...prevState.sort((a, b) => {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        }),
      ]);
    } else if (e.target.value === "price(htol)") {
      setData((prevState) => [
        ...prevState.sort((a, b) => {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        }),
      ]);
    } else if (e.target.value === "rating") {
      setData((prevState) => [
        ...prevState.sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return 1;
          return 0;
        }),
      ]);
    } else {
      setData((prevState) => [
        ...prevState.sort((a, b) => {
          if (a._id > b._id) return 1;
          if (a._id < b._id) return -1;
          return 0;
        }),
      ]);
    }
  };
  const checkwishlistpresent = (val) => {
    if (wishlist.length > 0)
      for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i]._id === val._id) return true;
      }
    return false;
  };
  const settingmodalDataShow = (val) => {
    setModalData(val);
    setModalShow(true);
  };
  const addprducttoCart = (data) => {
    if (!modalsize && !modalcolor) {
      toast.error("Please select Size and Color", {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    } else if (!modalsize) {
      toast.error("Please select Size", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    } else if (!modalcolor) {
      toast.error("Please Select Color", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    } else {
      if (isLogin) {
        if (cartitemsTotal.find((val) => val._id === data._id)) {
          toast.info("Already present in cart", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
          setModalHideShow();
        } else {
          const userData = { ...data };
          userData.size = modalsize;
          userData.color = modalcolor;
          delete userData.quantity;
          setModalShow(false);
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
              setcartitemsTotal([...datarec.cartItems]);
              setcartCount(datarec.cartItems.length);
              toast.success("Added to cart successfully", {
                position: "bottom-center",
                autoClose: 2000,
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
    }
  };
  const setModalHideShow = () => {
    setModalShow(false);
    setmodalSize();
    setmodalColor();
  };
  return (
    <div className="container-fluid">
      <div className="product-row row">
        {data.length > 0 ? (
          <>
            <div className="product-filterLeft col-lg-3">
              <button
                type="button"
                className="productfilter-collapsible"
                onClick={collapse}
              >
                Category<i className="fas fa-plus"></i>
              </button>
              <div className="product-contentBtn" style={{ display: "none" }}>
                <div className="product-catgoryForm">
                  {categoryArray.map((val, index) => (
                    <CheckboxComp
                      key={index}
                      onChangeProps={handleCategoryCheckBox}
                      value={val}
                      name="category"
                    />
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="productfilter-collapsible"
                onClick={collapse}
              >
                Price<i className="fas fa-plus"></i>
              </button>
              <div className=" product-contentBtn" style={{ display: "none" }}>
                <div className="product-rangeDiv">
                  <div className="productPriceSlider">
                    <i className="productPriceSymbol fas fa-rupee-sign"></i>
                    <span className="productRange">{pricerangeMin}</span>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    id="customRange1"
                    onChange={getSliderValue}
                    min={pricerangeMin}
                    max={pricerangeMax}
                    value={pricerangeValue}
                    step={500}
                  />
                  <div className="productPriceSlider">
                    <i className="productPriceSymbol fas fa-rupee-sign"></i>
                    <span className="productRange">{pricerangeMax}</span>
                  </div>
                </div>
                <div className="productrangevalueDiv">
                  <span className="productrangevalueShow">{pricerangeMin}</span>
                  <span className="font-weight-bold mt-1"> ---- </span>
                  <span className="productrangevalueShow">
                    {pricerangeValue}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="productfilter-collapsible"
                onClick={collapse}
              >
                Size<i className="fas fa-plus"></i>
              </button>
              <div className="product-contentBtn" style={{ display: "none" }}>
                <div className="product-filterSize">
                  {sizeArray.map((val, index) => (
                    <CheckboxComp
                      key={index}
                      onChangeProps={handleFilterSize}
                      value={val}
                    />
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="productfilter-collapsible"
                onClick={collapse}
              >
                Color<i className="fas fa-plus"></i>
              </button>
              <div className="product-contentBtn" style={{ display: "none" }}>
                <div className="filtercolorDiv">
                  {data.length > 0 &&
                    Array.from(new Set(filtercolorArray)).map(
                      (value, index) => (
                        <div
                          style={{ backgroundColor: value }}
                          className="filtercolor"
                          key={index}
                          onClick={() => handlefilterColor(value)}
                        >
                          {filtercolorData.includes(value) ? (
                            <i
                              className="filtercolorIcon fas fa-check-square"
                              style={{ color: "#999" }}
                            ></i>
                          ) : (
                            <i
                              className="filtercolorIcon fas fa-check-square"
                              style={{ color: "transparent" }}
                            ></i>
                          )}
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
            <div className="product-listRightTop col-lg-9">
              {data.length > 0 ? (
                <div className="product-sortTop">
                  <div className="product-itemFound font-weight-bold">
                    {productCount} <span>items found</span>
                  </div>
                  <div className="product-itemSort">
                    <div className="product-selectDiv">
                      <span className="font-weight-bold">Sort By:</span>
                      <select
                        onClick={changeSelectArrow}
                        className="product-sortSelect"
                        name="product-select"
                        id="product-select"
                        onChange={productSortRight}
                      >
                        <option value="popular">Popular</option>
                        <option value="rating">Rating</option>
                        <option value="price(ltoh)">Price(low to high)</option>
                        <option value="price(htol)">Price(high to low)</option>
                      </select>
                      <i className="fas fa-angle-double-down"></i>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="product-borderTop"></div>
              <div className="product-listRight ">
                {modaldata && (
                  <Modal
                    show={modalShow}
                    onHide={setModalHideShow}
                    size="sm"
                    backdrop="static"
                    centered
                    style={{ userSelect: "none" }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="product-modalheader">
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                          }}
                          src={modaldata.image[0]}
                          alt={modaldata.name}
                          className="img-thumbnail"
                        />
                        <h5 className="modal-title">{modaldata.name}</h5>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="product-modalBody">
                      <div className="product-modalDiv">
                        <h6 className="font-weight-bold">Size</h6>
                        {modaldata.size.map((val, index) => (
                          <span
                            className={
                              val === modalsize
                                ? "product-modalSizeActive"
                                : "product-modalSize"
                            }
                            key={index}
                            onClick={() => productmodalSize(val)}
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                      <div className="product-modalDiv">
                        <h6 className="font-weight-bold">Color</h6>
                        {modaldata.color.map((val, index) => (
                          <span
                            className="product-modalColor"
                            key={index}
                            style={{ backgroundColor: val }}
                            onClick={() => productmodalColor(val)}
                          >
                            {val === modalcolor ? (
                              <i className="product-modalColorcheck fas fa-check-circle"></i>
                            ) : (
                              <i className="product-modalColornotCheck fas fa-check-circle"></i>
                            )}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="product-modalAddtoCart"
                        onClick={() => addprducttoCart(modaldata)}
                      >
                        ADD TO CART
                      </button>
                    </Modal.Body>
                  </Modal>
                )}
                {data.map((val, index) =>
                  (categoryCheck.length === 0 ||
                    categoryCheck.includes(val.category)) &&
                  val.price <= pricerangeValue &&
                  (filterSize.length === 0 ||
                    filterSize.some((valu) => val.size.includes(valu))) &&
                  (filtercolorData.length === 0 ||
                    filtercolorData.some((valu) =>
                      val.color.includes(valu)
                    )) ? (
                    <div className="product-Card" key={val._id || index}>
                      {productCount < ++count ? setproductCount(count) : null}
                      <span className="product-Heart">
                        <i
                          className={
                            wishlist.length > 0 && checkwishlistpresent(val)
                              ? "fas fa-heart"
                              : "far fa-heart"
                          }
                          onClick={(e) => productWishlist(e, val)}
                        ></i>
                      </span>
                      <div className="product-flipCard">
                        <div className="product-flipCardInner">
                          <div className="product-flipCardFront">
                            {
                              <img
                                className="product-imageDesc"
                                src={val.image[0]}
                                alt="Avatar"
                              />
                            }
                          </div>
                          <div className="product-flipCardBack">
                            <h5>{val.name}</h5>
                            <p>{val.description}</p>
                            <div className="product-cardRating">
                              <h6>Rating-</h6>
                              <span
                                className={
                                  val.rating >= 4
                                    ? "badge bg-success"
                                    : "badge bg-warning"
                                }
                              >
                                {val.rating}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="btn btn-dark"
                              onClick={() => settingmodalDataShow(val)}
                            >
                              Select Size
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="product-cardBottom">
                        <h4 className="product-price">
                          <i className="fas fa-rupee-sign"></i>
                          {Math.floor(
                            val.price - (val.price * val.discount) / 100
                          )}
                        </h4>
                        <button
                          className="product-viewDetails"
                          onClick={() => gotoDetails(val.idealFor, val._id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ) : null
                )}
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
            </div>
          </>
        ) : !check ? (
          <div style={{marginLeft:'50px',display:'flex'}}>
            <Skeleton width={300} height={30} count={6} style={{display:'flex',flexDirection:'column',marginBottom:'10px'}}/>
          <Skeleton width={270} height={250} count={12} style={{ marginLeft: "30px", marginBottom: "20px" }}/>
          </div>
        ) : (
          <img
            src="/500Error.gif"
            alt="500 Error"
            style={{ width: "100vw", height: "75vh", objectFit: "contain" }}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
