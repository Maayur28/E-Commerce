import React, { useState } from "react";
import "./carousel.css";
import { NavLink } from "react-router-dom";
const Carousel = () => {
  const arr = [
    {
      image: "/images/men/m1.png",
      category: "men",
      id: 1001,
      heading: "Nike Air Max 2020",
    },
    {
      image: "/images/men/m2.png",
      category: "men",
      id: 1002,
      heading: "Nike Air Pro 2002",
    },
    {
      image: "/images/men/m3.png",
      category: "men",
      id: 1003,
      heading: "Nike Air Pro 2001",
    },
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
    <div className="container-fluid">
      <div className="row">
        <div className="carousel">
          <div className="carousel-navigate">
            <i
              className="fas fa-long-arrow-alt-left carousel-navigateArrowleft"
              onClick={prev}
            ></i>
            <h3 className="carousel-heading">{arr[current].heading}</h3>
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
                      ? index === current && "carousel-activeImg"
                      : index === current && "carousel-passiveImg"
                  }
                >
                  {index === current && (
                    <NavLink
                      to={`/product/${arr[current].category}/${arr[current].id}`}
                      exact
                    >
                      <img
                        className="carousel-img"
                        src={arr[current].image}
                        alt={arr[current].heading}
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
                  <select className="carousel-select" name="size" id="size">
                    <option value="US 10">US 10</option>
                    <option value="US 9">US 9</option>
                    <option value="US 8">US 8</option>
                    <option value="US 7">US 7</option>
                    <option value="US 6">US 6</option>
                  </select>
                  <i className="carousel-selectIcon fas fa-sort-down"></i>
                </div>
                <div className="carousel-price">
                  <h3>Rs. 1999</h3>
                </div>
              </div>
              <div className="carousel-cart">
                <i className="carousel-cartIcon fas fa-cart-arrow-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
