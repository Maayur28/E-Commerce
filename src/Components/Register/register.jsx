import React, { useState } from "react";
import "./register.css";
import { Modal } from "react-bootstrap";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const Register = (props) => {
    const [passShow, setpassShow] = useState(false);
    const [show, setShow] = useState(true);
    const handleClose = () => {
      setShow(false);
      props.handleRegisterLaunch(false);
    };
    const handleLoginLaunch = () => {
      setShow(false);
      props.handleRegisterLaunch(true);
    };
  const CustomInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <div className="register-inputDiv">
          <input {...field} {...props} className="register-input" />
          <i
            className={label === "Username" ? "fas fa-envelope" : "fas fa-lock"}
          ></i>
          {label === "Password" ? (
            <i
              className={
                passShow
                  ? "register-passwordEye fas fa-eye-slash"
                  : "register-passwordEye fas fa-eye"
              }
              onClick={() => setpassShow(!passShow)}
            ></i>
          ) : null}
          <label className="register-label" htmlFor={props.name}>
            {label}
          </label>
          <div className="register-inputfieldError">
            {meta.touched && meta.error ? meta.error : null}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="register-heading">
            <img className="register-logo" src="/favicon.ico" alt="logo" />
            <h2>Please Register</h2>
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
              console.log(values);
              setTimeout(() => {
                resetForm();
                setSubmitting(false);
              }, 2000);
            }}
          >
            {(formprops) => (
              <Form onSubmit={formprops.handleSubmit}>
                <div className="register-form">
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
                    Login
                  </button>
                  <div className="register-forgetButton">
                    <button
                      type="button"
                      className="register-login"
                    >
                      Already Register?<span onClick={handleLoginLaunch}> Login</span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;