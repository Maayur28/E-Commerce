import React, { useState } from "react";
import "./carousel.css";

import img1 from "../../images/shoe1.png";
import img2 from "../../images/shoe2.png";
import img3 from "../../images/shoe3.png";
const Carousel = () => {
  const arr = [
    { image: img1, heading: "Nike Air Max 2020" },
    { image: img2, heading: "Nike Air Pro 2000" },
    { image: img3, heading: "Nike Air Pro 2010" },
    { image: img1, heading: "Nike Air Pro 2015" },
    { image: img2, heading: "Nike Air Pro 2005" },
    { image: img3, heading: "Nike Air Pro 2001" },
  ];
  const [current, setcurrent] = useState(0);
  const [active, setactive] = useState(1);
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
  return (
    <div className="home">
    <div className="carousel">
      <div className="navigate">
        <i className="fas fa-long-arrow-alt-left arrowleft" onClick={prev}></i>
        <h3>{arr[current].heading}</h3>
        <i
          className="fas fa-long-arrow-alt-right arrowright"
          onClick={next}
          ></i>
      </div>
      <div className="image">
        {arr.map((slide, index) => {
          return (
            <span
              key={index}
              className={
                active === 1
                  ? index === current && "activeImg"
                  : index === current && "passiveImg"
                }
            >
              {index === current && (
                <img src={arr[current].image} alt={arr[current].heading} />
              )}
            </span>
          );
        })}
      </div>
      <div className="cardPaper">
        <div className="card">
        <div className="card-body">
            <div className="cardBody">
              <div className="select">
                <select name="size" id="size">
                  <option value="US 10">US 10</option>
                  <option value="US 9">US 9</option>
                  <option value="US 8">US 8</option>
                  <option value="US 7">US 7</option>
                  <option value="US 6">US 6</option>
                </select>
                <i className="select-icon fas fa-sort-down"></i>
              </div>
              <div className="price">
                <h3>Rs. 1999</h3>
              </div>
            </div>
            <div className="cart">
            <i className="cartIcon fas fa-cart-arrow-down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Carousel;
