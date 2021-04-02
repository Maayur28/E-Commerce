import React,{useState,createContext} from 'react';
export const StoreContext=createContext();
export const StoreProvider = (props) => {
    const[isLogin,setisLogin]=useState(localStorage.length>0?true:false);
    return ( <StoreContext.Provider value={[isLogin,setisLogin]}>
        {props.children}
    </StoreContext.Provider> );
}
 