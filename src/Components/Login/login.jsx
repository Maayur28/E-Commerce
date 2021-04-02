import React, { useState } from "react";
import "./login.css";
import { Modal } from "react-bootstrap";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Login = (props) => {
  const [passShow, setpassShow] = useState(false);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    props.handleloginLaunch(false);
  };
  const launchRegister = () => {
    setShow(false);
    props.handleloginLaunch(true);
  };
  const handleLoginStatus = (val) => {
    setShow(false);
    props.handleisLogin(val);
  };
  const CustomInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <div className="login-inputDiv">
          <input {...field} {...props} className="login-input" />
          <i
            className={label === "Username" ? "fas fa-envelope" : "fas fa-lock"}
          ></i>
          {label === "Password" ? (
            <i
              className={
                passShow
                  ? "login-passwordEye fas fa-eye-slash"
                  : "login-passwordEye fas fa-eye"
              }
              onClick={() => setpassShow(!passShow)}
            ></i>
          ) : null}
          <label className="login-label" htmlFor={props.name}>
            {label}
          </label>
          <div className="login-inputfieldError">
            {meta.touched && meta.error ? meta.error : null}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        // keyboard={false}
      >
        <Modal.Body>
          <i className="login-cross fas fa-times" onClick={handleClose}></i>
          <div className="login-heading">
            <img className="login-logo" src="/favicon.ico" alt="logo" />
            <h2>Welcome Back</h2>
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
              username: Yup.string()
                .email("Invalid Email")
                .required("Please enter username"),
              password: Yup.string()
                .min(8, "Password is too short")
                .required("Please enter password"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              fetch("http://localhost:3333/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((response) => response.json())
                .then((datarec) => {
                  localStorage.setItem("x-auth-token", datarec.authToken);
                  datarec && toast.success("Login Successful", {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                  })
                  resetForm();
                  setSubmitting(false);
                  handleLoginStatus(true);
                })
                .catch((error) => {
                  console.error("Error:", error.message);
                });
            }}
          >
            {(formprops) => (
              <Form onSubmit={formprops.handleSubmit}>
                <div className="login-form">
                  <CustomInput
                    type="email"
                    name="username"
                    id="username"
                    placeholder="example@gmail.com"
                    label="Username"
                    onChange={formprops.handleChange}
                  />
                  <CustomInput
                    type={passShow ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="a2b2c3d4e5"
                    label="Password"
                    onChange={formprops.handleChange}
                  />
                  <button type="submit" className="login-button">
                    {formprops.isSubmitting ? (
                      <span
                        style={{ marginRight: "5px" }}
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <span
                        style={{ marginRight: "5px", color: "transparent" }}
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Login
                  </button>
                  <div className="login-forgetButton">
                    <button
                      type="button"
                      className="login-forget login-buttoncommon"
                    >
                      Forget Password?
                    </button>
                    <button
                      type="button"
                      className="login-register login-buttoncommon"
                    >
                      New user?<span onClick={launchRegister}> Register</span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      <ToastContainer
        position="bottom-center"
        autoClose={1999}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
      </Modal>
    </>
  );
};

export default Login;
