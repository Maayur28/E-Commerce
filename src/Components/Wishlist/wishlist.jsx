import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./wishlist.css";
import Skeleton from "react-loading-skeleton";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const Wishlist = () => {
  const [wish, setwish] = useState([]);
  const [check,setcheck]=useState(false);
  useEffect(() => {
    fetch("http://localhost:2222/getwishlist", {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => response.json())
      .then((datawish) =>{setcheck(true); if(datawish.wish.length>0){setwish(datawish.wish)} else{ setwish([])}})
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);
  const wishRemove = (val) => {
    fetch("http://localhost:2222/removewishlist", {
      method: "DELETE",
      body: JSON.stringify(val),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.error("Item has been removed from wishlist", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
        setcheck(true);
        setwish([...data.wish]);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="wishlist-table">
          {wish.length > 0 ? (
            <>
          <i className="far fa-heart iwishlist"></i>
          <h1>My Wishlist</h1>
            <Table
              responsive="md"
              className="wishlist-tab align-middle text-center shadow-lg"
            >
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Product name</th>
                  <th>Rating</th>
                  <th>Unit Price(now)</th>
                  <th>Unit Price(when added)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {wish.map((val, index) => (
                  <tr key={index}>
                    <td className="wishlist-product">
                      <Link to={`/product/${val.idealFor}/${val._id}`} exact={true}>
                      <img
                        style={{
                          width: "10vw",
                          height: "10vh",
                          objectFit: "contain",
                        }}
                        src={val.image}
                        alt={val.name}
                        className="img-fluid "
                        />
                        </Link>
                    </td>
                    <td>
                      <span className="">{val.name}</span>
                    </td>
                    <td>
                      <span class="badge bg-success">{val.rating}</span>
                    </td>
                    <td style={{ fontWeight: "bolder" }}>{Math.floor(val.price -val.price*val.discount/100)}</td>
                    <td >{val.price}</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Remove</Tooltip>}
                      >
                        <i
                          className="wishlist-remove fas fa-times"
                          onClick={() => wishRemove(val)}
                        ></i>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </>
          ) : check? <Link to="/" exact={true}><img src="/wishlistEmpty.webp" alt="wishlistempty" style={{width:'100vw',height:'88vh',objectFit:'contain'}} /></Link> : 
          (
            <Skeleton
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
              width={600}
              height={50}
              count={7}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
