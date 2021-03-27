import React, { useState, useEffect } from "react";
import "./product.css";
// import Skeleton from "react-loading-skeleton";
const Product = (props) => {
  const [data, setData] = useState([]);
  const [modaldata, setModalData] = useState();
  const [modalsize, setmodalSize] = useState();
  const [modalcolor, setmodalColor] = useState();
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
  const productmodalColor = (val) => {
    setmodalColor(val);
  };
  const productmodalSize = (val) => {
    setmodalSize(val);
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
          {data.map((val, index) => (
            <div className="product-Card" key={val._id || index}>
              <span className="product-Heart">
                <i className="far fa-heart" onClick={productWishlist}></i>
              </span>

              <div className="product-flipCard">
                <div className="product-flipCardInner">
                  <div className="product-flipCardFront">
                    <img
                      src={val.image[0]}
                      alt="Avatar"
                      style={{
                        width: "250px",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="product-flipCardBack">
                    <h4>{val.name}</h4>
                    <p>{val.description}</p>
                    <div className="product-cardRating">
                      <h6>Rating-</h6>
                      <span className="badge bg-success">{val.rating}</span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
