import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./forgetpass.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const ForgetPass = (props) => {
  const [show, setshow] = useState(true);
  const [mail, setmail] = useState();
  const [call, setcall] = useState(false);
  const [resp, setresp] = useState();
  const [check, setcheck] = useState(false);
  const [iswait, setiswait] = useState(false);
  const handleClose = () => {
    setshow(false);
  };
  const updateState = (e) => {
    setcheck(false);
    setcall(false);
    setmail(e.target.value);
  };
  const forgetPassword = () => {
    setcall(true);
  };
  const handleCloseLoginNav = () => {
    setshow(false);
    props.handleForgetlaunch();
  };
  useEffect(() => {
    if (call) {
      setcheck(false);
      setiswait(true);
      fetch("http://localhost:3333/forgetpassword", {
        method: "POST",
        body: JSON.stringify({ email: mail }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .then((datarec) => {
          console.log(datarec === null);
          if (datarec === null) {
            toast.error("Server is busy,Please try again later", {
              position: "bottom-center",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
            });
            setcheck(false);
          } else {
            setresp(datarec);
            setcheck(true);
          }
          setiswait(false);
        })
        .catch((err) => {
          setiswait(false);
        });
    }
    // eslint-disable-next-line
  }, [call]);
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="forget-modalDiv">
          <i
            className="fas fa-times"
            style={{ position: "absolute", right: "5%", cursor: "pointer" }}
            onClick={handleCloseLoginNav}
          ></i>
          <img
            style={{ marginBottom: "20px" }}
            src="/favilogo.png"
            alt="Logo"
          />
          <h2>Forget Password</h2>
          <div className="forget-inputDiv">
            <i className="forget-icon fas fa-envelope"></i>
            <input
              value={mail}
              onChange={updateState}
              type="email"
              name="forgetpassword"
              id="forgetpasword"
              className="forget-input"
              placeholder="For exp: xyz@gmail.com"
            />
            <label htmlFor="forgetpassword" className="forget-label">
              Email
            </label>
          </div>
          {check ? (
            resp ? (
              <div className="alert alert-success">
                Password reset link has been sent to your mail
              </div>
            ) : (
              <div class="alert alert-danger">Email address is not found</div>
            )
          ) : null}
          <button
            type="submit"
            className="forget-button"
            onClick={forgetPassword}
          >
            {iswait ? (
              <span
                className="spinner-grow spinner-grow-sm"
                style={{ marginRight: "10px" }}
              ></span>
            ) : null}
            Reset Password
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ForgetPass;
