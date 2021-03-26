import React from "react";
import "./productDetail.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  useEffect(() => {
    fetch(`http://localhost:1111/product/${category}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setSize(data.size[0]);
        setColor(data.color[0]);
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
  const toggleIcon = () => {
    setIcon(!icon);
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
  return (
    <div className="container-fluid">
      {data?<div className="row">
        <div className="left-content col-sm-10 offset-sm-1 col-md-4 offset-md-0">
          <h2>{data.name}</h2>
          <h5 className="text-muted">{data.description}</h5>
          <div className="cartWish">
            <button className="addToCart btn">ADD TO CART</button>
            <i
              className={icon ? "fas fa-heart" : "far fa-heart"}
              onClick={toggleIcon}
            ></i>
          </div>
        </div>
        <div className="middle-content col-sm-10 offset-sm-1 col-md-4 offset-md-0">
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
        <div className="right-content col-sm-10 offset-sm-1 col-md-4 offset-md-0">
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
      </div>:null}
    </div>
  );
};

export default ProductDetail;
