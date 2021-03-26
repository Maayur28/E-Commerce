import React, { useState, useEffect } from "react";
import "./product.css";
const Product = (props) => {
  const [data, setData] = useState([]);
  const category = props.match.params.category;
  useEffect(() => {
    fetch(`http://localhost:1111/product/${category}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
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
  return (
    <div className="container-fluid">
      <div className="product-row row">
        <div className="product-filterLeft col-md-3 offset-md-0">
          <button
            type="button"
            className="productfilter-collapsible"
            onClick={collapse}
          >
            Open Section 1<i className="fas fa-plus"></i>
          </button>
          <div className="product-contentBtn" style={{ display: "none" }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <button
            type="button"
            className="productfilter-collapsible"
            onClick={collapse}
          >
            Open Section 2<i className="fas fa-plus"></i>
          </button>
          <div className="product-contentBtn" style={{ display: "none" }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <button
            type="button"
            className="productfilter-collapsible"
            onClick={collapse}
          >
            Open Section 3<i className="fas fa-plus"></i>
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
        <div className="product-listRight col-md-8">
          {data.map((val) => (
            <div className="product-Card" key={val._id}>
              <span className="product-Heart">
                <i className="far fa-heart" onClick={productWishlist}></i>
              </span>
              <div className="product-flipCard">
                <div className="product-flipCardInner">
                  <div className="product-flipCardFront">
                    <img
                      src={val.image[0]}
                      alt="Avatar"
                      style={{ width: "250px", height: "200px" }}
                    />
                  </div>
                  <div className="product-flipCardBack">
                    <h4>{val.name}</h4>
                    <p>{val.description}</p>
                  </div>
                </div>
              </div>
              <div className="product-cardBottom">
                <h4>
                  <i className="fas fa-rupee-sign"></i>
                  {val.price}
                </h4>
                <button
                  className="product-addToCart btn"
                  onClick={() => gotoDetails(val.idealFor, val._id)}
                >
                  Select Size
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
