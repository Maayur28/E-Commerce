import React, { useState, createContext } from "react";
export const StoreContext = createContext();
export const StoreProvider = (props) => {
  const [isLogin, setisLogin] = useState(
    localStorage.length > 0 ? true : false
  );
  const [cartCount, setcartCount] = useState(localStorage.count?localStorage.count:'');
  const [cartitemsTotal,setcartitemsTotal]=useState([]);
  return (
    <StoreContext.Provider value={{value:[isLogin, setisLogin], value1:[cartCount,setcartCount],value2:[cartitemsTotal,setcartitemsTotal]}}>
      {props.children}
    </StoreContext.Provider>
  );
};
