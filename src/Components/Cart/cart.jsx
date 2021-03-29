import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  function Cart(){
    const notify = () => toast("Wow so easy!");

    return (
      <div>
        <button style={{marginTop:"200px"}} onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }
  export default Cart;