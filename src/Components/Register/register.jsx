import React, { useState } from "react";
import "./register.css";
import { Modal } from "react-bootstrap";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Register = (props) => {
  const [passShow, setpassShow] = useState(false);
  const [confpassShow, setconfpassShow] = useState(false);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    props.handleRegisterLaunch(false);
  };
  const handleLoginLaunch = () => {
    setShow(false);
    props.handleRegisterLaunch(true);
  };
  const handleLoginStatus=(val)=>{
    setShow(false);
    props.handleisLogin(val);
  }
  const CustomName = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <div className="register-NameDiv">
          <input {...field} {...props} className="register-input" />
          <i className="register-nameIcon fas fa-user"></i>
          <label className="register-namelabel" htmlFor={props.name}>
            {label}
          </label>
          <div className="register-namefieldError">
            {meta.touched && meta.error ? meta.error : null}
          </div>
        </div>
      </>
    );
  };
  const CustomInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <div className="register-inputDiv">
          <input {...field} {...props} className="register-input" />
          <i
            className={
              label === "Username"
                ? "register-username fas fa-envelope"
                : "register-password fas fa-lock"
            }
          ></i>
          {label !== "Username" && label !== "Confirm Password" ? (
            <i
              className={
                passShow
                  ? "register-passwordEye fas fa-eye-slash"
                  : "register-passwordEye fas fa-eye"
              }
              onClick={() => setpassShow(!passShow)}
            ></i>
          ) : null}
          {label !== "Username" && label !== "Password" ? (
            <i
              className={
                confpassShow
                  ? "register-passwordEye fas fa-eye-slash"
                  : "register-passwordEye fas fa-eye"
              }
              onClick={() => setconfpassShow(!confpassShow)}
            ></i>
          ) : null}
          <label className="register-label" htmlFor={props.name}>
            {label}
          </label>
          <div className="register-inputfieldError">
            {label === "Confirm Password"
              ? meta.error && meta.touched
                ? meta.error
                : null
              : meta.touched && meta.error
              ? meta.error
              : null}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Body>
          <i className="login-cross fas fa-times" onClick={handleClose}></i>
          <div className="register-heading">
            <img className="register-logo" src="/favicon.ico" alt="logo" />
            <h2>Please Register</h2>
          </div>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              username: "",
              password: "",
              confirmpassword: "",
            }}
            validationSchema={Yup.object({
              firstname: Yup.string().required("Please enter firstname"),
              lastname: Yup.string().required("Please enter lastname"),
              username: Yup.string()
                .email("Invalid Email")
                .required("Please enter username"),
              password: Yup.string()
                .min(8, "Password is too short")
                .required("Please enter password"),
              confirmpassword: Yup.string()
                .when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Password doesnot match"
                  ),
                })
                .required("Please enter confirm password"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              fetch("http://localhost:3333/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((response) => response.json())
                .then((datarec) => {
                  localStorage.setItem('x-auth-token',datarec.authToken)
                  datarec && toast.success("Registered Successfully", {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                  })
                  handleLoginStatus(true);
                      })
                .catch((error) => {
                  console.error("Error:", error.message);
                })
                resetForm();
                setSubmitting(false);
                handleClose();
            }}
          >
            {(formprops) => (
              <Form onSubmit={formprops.handleSubmit}>
                <div className="register-form">
                  <div className="register-nameAlign">
                    <CustomName
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Mayur"
                      label="FirstName"
                    />
                    <CustomName
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Agarwal"
                      label="LastName"
                    />
                  </div>
                  <CustomInput
                    type="email"
                    name="username"
                    id="username"
                    placeholder="example@gmail.com"
                    label="Username"
                  />
                  <CustomInput
                    type={passShow ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="a2b2c3d4e5"
                    label="Password"
                  />
                  <CustomInput
                    type={confpassShow ? "text" : "password"}
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="a2b2c3d4e5"
                    label="Confirm Password"
                  />
                  <button type="submit" className="register-button">
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
                    Register
                  </button>
                  <div className="register-forgetButton">
                    <button type="button" className="register-login">
                      Already Register?
                      <span onClick={handleLoginLaunch}> Login</span>
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

export default Register;
