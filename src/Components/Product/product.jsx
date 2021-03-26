import React, { useState, useEffect } from "react";
import './product.css';
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
  return ( 
   <div className="container-fluid">
       <div className="row">
           <div className="filterLeft col-md-2 offset-md-1">
               Hello
           </div>
           <div className="productRight col-md-9">
               World
           </div>
       </div>
   </div>
  );
};

export default Product;
