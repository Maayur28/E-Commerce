import React, { useState, createContext } from "react";
export const StoreContext = createContext();
export const StoreProvider = (props) => {
  const [isLogin, setisLogin] = useState(
    localStorage.length > 0 ? true : false
  );
  const [cartCount, setcartCount] = useState(localStorage.count?localStorage.count:0);
  return (
    <StoreContext.Provider value={{value:[isLogin, setisLogin], value1:[cartCount,setcartCount]}}>
      {props.children}
    </StoreContext.Provider>
  );
};
