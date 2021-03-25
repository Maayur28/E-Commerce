import React from "react";
import { useState, useEffect } from "react";
import "./productDetail.css";
import {useHistory} from 'react-router-dom';
const ProductDetail = () => {
  const history=useHistory();
  const data = [
    {
      _id: 1001,
      name: "Nike Air Max 2020",
      description: "A lightweight and comfortable shoes for men",
      rating: 4.4,
      idealFor: "Men",
      category: "Sports",
      size: [36, 38, 40, 42],
      price: 1999,
      color: ["Red", "Blue", "Green"],
      image: ["/images/shoe1.png", "/images/shoe2.png", "/images/shoe3.png"],
      discount: 20,
      quantity: 90,
      shippingCharges: 49,
    },
  ];
  const [size, setSize] = useState(data[0].size[0]);
  const [color, setColor] = useState(data[0].color[0]);
  const [star, setStar] = useState([]);
  const [icon, setIcon] = useState(false);
  // const [activeImg,setactiveImg]=useState(data[0].image[0]);
  const [currentThumbnail,setcurrentThumbnail]=useState(0);
  const toggleIcon = () => {
    setIcon(!icon);
  };
  const thumbImg=(val)=>{
    setcurrentThumbnail(data[0].image.indexOf(val));
  }
  const rightIcon=()=>{
    if(currentThumbnail===data[0].image.length-1)
    {
      setcurrentThumbnail(0)
    }
    else
    setcurrentThumbnail(prevState=>prevState+1)
  }
  const leftIcon=()=>{
    if(currentThumbnail===0)
    {
      setcurrentThumbnail(data[0].image.length-1)
    }
    else
    setcurrentThumbnail(prevState=>prevState-1)
  }
  const settheSize=(val)=>{
    setSize(val);
  }
  const settheColor=(val)=>{
    setColor(val);
  }
  useEffect(() => {
    setStar([]);
    for (let i = 1; i <= 5; i++) {
      if (Math.round(data[0].rating) >= i)
        setStar((prevState) => [...prevState, "fas fa-star"]);
      else setStar((prevState) => [...prevState, "far fa-star"]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="left-content col-sm-10 offset-sm-1 col-md-4 offset-md-0">
          <h2>{data[0].name}</h2>
          <h5 className="text-muted">{data[0].description}</h5>
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
            <span onClick={()=>history.goBack()}>
              <i className="fas fa-long-arrow-alt-left"></i>Back
            </span>
          </div>
          <img
            src={data[0].image[currentThumbnail]}
            alt={data[0].name}
            className="img-fluid"
          />
          <div className="imageThumbnail">
            <i className="fas fa-caret-square-left" onClick={leftIcon}></i>
            {
              data[0].image.map((val, index) => (
                <img
                  key={index}
                  src={val}
                  className={val===data[0].image[currentThumbnail]?"img-thumbnail masking":"img-thumbnail"}
                  alt="imagesShoes"
                  onClick={()=>thumbImg(val)}
                />
              ))
            }
            <i className="fas fa-caret-square-right" onClick={rightIcon}></i>
          </div>
        </div>
        <div className="right-content col-sm-10 offset-sm-1 col-md-4 offset-md-0">
          <div className="right size">
            <h5>Size</h5>
            {data[0].size.map((val, index) => (
              <span
                key={index}
                className={val === size ? "activeSize" : "sizeBox"}
                onClick={()=>settheSize(val)}
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
            {data[0].color.map((val, index) => (
              <span
                key={index}
                className="colorBox"
                style={{ backgroundColor: val }}
                onClick={()=>settheColor(val)}
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
    </div>
  );
};

export default ProductDetail;
