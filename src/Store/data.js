import React, { useState, createContext, useEffect } from "react";
export const StoreContext = createContext();
export const StoreProvider = (props) => {
  const [cartCount, setcartCount] = useState();
  const [cartitemsTotal, setcartitemsTotal] = useState([]);
  const [isLogin, setisLogin] = useState(
    localStorage.length > 0 ? true : false
  );
  useEffect(() => {
    if (isLogin) {
      fetch(`http://localhost:4444/cart`, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
        .then((response) => response.json())
        .then((datarec) => {
          setcartCount(datarec.cartDetail.length);
          setcartitemsTotal([...datarec.cartDetail]);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [isLogin]);
  return (
    <StoreContext.Provider
      value={{
        value: [isLogin, setisLogin],
        value1: [cartCount, setcartCount],
        value2: [cartitemsTotal, setcartitemsTotal],
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
