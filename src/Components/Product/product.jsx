import React, { useState, useEffect } from "react";
import "./product.css";
// import Skeleton from "react-loading-skeleton";
const Product = (props) => {
  const [data, setData] = useState([]);
  const [categoryCheck, setcategoryCheck] = useState([]);
  const [modaldata, setModalData] = useState();
  const [modalsize, setmodalSize] = useState();
  const [modalcolor, setmodalColor] = useState();
  const [pricerangeMin, setpricerangeMin] = useState();
  const [pricerangeMax, setpricerangeMax] = useState();
  const [pricerangeValue, setpricerangeValue] = useState();
  const [filterSize, setfilterSize] = useState([]);
  const category = props.match.params.category;
  useEffect(() => {
    fetch(`http://localhost:1111/product/${category}`)
      .then((response) => response.json())
      .then((data) => {
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
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [category]);
  const collapse = (e) => {
    if (e.target.nextSibling.style.display === "none") {
      e.target.children[0].className = "fas fa-minus";
      e.target.nextSibling.style.display = "block";
    } else {
      e.target.nextSibling.style.display = "none";
      e.target.children[0].className = "fas fa-plus";
    }
  };
  const productWishlist = (e) => {
    if (e.target.className === "far fa-heart")
      e.target.className = "fas fa-heart";
    else e.target.className = "far fa-heart";
  };
  const gotoDetails = (category, id) => {
    console.log(category, id);
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
    if (categoryCheck.includes(e.target.value)) {
      setcategoryCheck(
        categoryCheck.filter((val) => {
          return val !== e.target.value;
        })
      );
    } else setcategoryCheck((prevState) => [...prevState, e.target.value]);
  };
  const getSliderValue = (e) => {
    console.log(e);
    setpricerangeValue(e.target.value);
  };
  const handleFilterSize = (e) => {
    if (filterSize.includes(e.target.value)) {
      setfilterSize(
        filterSize.filter((val) => {
          return val !== e.target.value;
        })
      );
    } else setfilterSize((prevState) => [...prevState, e.target.value]);
    console.log(filterSize);
  };
  return (
    <div className="container-fluid">
      <div className="product-row row">
        <div className="product-filterLeft col-md-3 offset-md-0">
          <button
            type="button"
            className="productfilter-collapsible"
            onClick={collapse}
          >
            Category<i className="fas fa-plus"></i>
          </button>
          <div className="product-contentBtn" style={{ display: "none" }}>
            <div className="product-catgoryForm">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Sports"
                  id="sports"
                  onChange={handleCategoryCheckBox}
                />
                <label
                  className="form-check-label font-weight-bold"
                  htmlFor="sports"
                >
                  Sports
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Formal"
                  id="formal"
                  onChange={handleCategoryCheckBox}
                />
                <label
                  className="form-check-label font-weight-bold"
                  htmlFor="formal"
                >
                  Formal
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Casual"
                  id="casual"
                  onChange={handleCategoryCheckBox}
                />
                <label
                  className="form-check-label font-weight-bold"
                  htmlFor="casual"
                >
                  Casual
                </label>
              </div>
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
              <span className="productrangevalueShow">{pricerangeValue}</span>
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
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="XS"
                  id="XS"
                  onChange={handleFilterSize}
                />
                <label className="form-check-label" htmlFor="XS">
                  XS
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="S"
                  id="S"
                  onChange={handleFilterSize}
                />
                <label className="form-check-label" htmlFor="S">
                  S
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="M"
                  id="M"
                  onChange={handleFilterSize}
                />
                <label className="form-check-label" htmlFor="M">
                  M
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="L"
                  id="L"
                  onChange={handleFilterSize}
                />
                <label className="form-check-label" htmlFor="L">
                  L
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="XL"
                  id="XL"
                  onChange={handleFilterSize}
                />
                <label className="form-check-label" htmlFor="XL">
                  XL
                </label>
              </div>
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="product-listRightTop col-md-8">
          <div className="product-sortTop">
            <div className="product-itemFound font-weight-bold">
              {data.length} <span>items found</span>
            </div>
            <div className="product-itemSort">
              <div className="product-selectDiv">
                <span className="font-weight-bold">Sort By:</span>
                <select
                  onClick={changeSelectArrow}
                  className="product-sortSelect font-weight-bold"
                  name="product-select"
                  id="product-select"
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
          <div className="product-borderTop"></div>
          <div className="product-listRight ">
            <div
              className="modal fade"
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-sm modal-dialog-centered"
                role="document"
              >
                {modaldata && (
                  <div className="modal-content">
                    <div className="modal-header">
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
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        {modaldata.name}
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="product-modalBody modal-body">
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
                        className="btn product-modalAddtoCart"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {data.map((val, index) =>
              (categoryCheck.length === 0 ||
                categoryCheck.includes(val.category)) &&
              val.price <= pricerangeValue &&
              (filterSize.length === 0 ||
                filterSize.every((valu) => val.size.includes(valu))) ? (
                <div className="product-Card" key={val._id || index}>
                  <span className="product-Heart">
                    <i className="far fa-heart" onClick={productWishlist}></i>
                  </span>
                  <div className="product-flipCard">
                    <div className="product-flipCardInner">
                      <div className="product-flipCardFront">
                        {
                          <img
                            src={val.image[0]}
                            alt="Avatar"
                            style={{
                              width: "250px",
                              height: "200px",
                              objectFit: "contain",
                            }}
                          />
                        }
                      </div>
                      <div className="product-flipCardBack">
                        <h4>{val.name}</h4>
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
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          onClick={() => setModalData(val)}
                        >
                          Select Size
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="product-cardBottom">
                    <h4>
                      <i className="fas fa-rupee-sign"></i>
                      {val.price}
                    </h4>
                    <button
                      className="product-viewDetails btn"
                      onClick={() => gotoDetails(val.idealFor, val._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
