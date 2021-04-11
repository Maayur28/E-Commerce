import React, { useState, useContext } from "react";
import "./login.css";
import { Modal } from "react-bootstrap";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { StoreContext } from "../../Store/data";
import ForgetPass from '../ForgetPassword/forgetpass';
const Login = (props) => {
  const [passShow, setpassShow] = useState(false);
  const [show, setShow] = useState(true);
  const { value1 } = useContext(StoreContext);
  // eslint-disable-next-line
  const [cartCount, setcartCount] = value1;
  const [errorOccur, seterrorOccur] = useState();
  const [forget,setforget]=useState(false);
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
  const launchforgetPass=()=>{
    setShow(false);
    setforget(true);
  }
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
            <img className="login-logo" src="/favilogo.png" alt="logo" />
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
              seterrorOccur();
              fetch("https://mayur28user.herokuapp.com/login", {
              // fetch("http://localhost:3333/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
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
                  localStorage.setItem("x-auth-token", datarec.authToken);
                  fetch("https://mayur28cart.herokuapp.com/cartcount",{
                    headers:{
                      "x-auth-token":localStorage.getItem('x-auth-token')
                    }
                  })
                    .then((response) => response.json())
                    .then((datacount) => {setcartCount(datacount.count);})
                    .catch((err) => console.error(err));
                  datarec &&
                    toast.success("Login Successful", {
                      position: "bottom-center",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      progress: undefined,
                    });
                  resetForm();
                  setSubmitting(false);
                  handleLoginStatus(true);
                })
                .catch((err) => {
                  setSubmitting(false);
                  seterrorOccur(err.message);
                });
            }}
          >
            {(formprops) => (
              <form onSubmit={formprops.handleSubmit} autoComplete="on">
                <div className="login-form">
                  <CustomInput
                    type="email"
                    name="username"
                    id="username"
                    placeholder="example@gmail.com"
                    label="Username"
                    onChange={formprops.handleChange}
                    autoComplete="on"
                  />
                  <CustomInput
                    type={passShow ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="a2b2c3d4e5"
                    label="Password"
                    onChange={formprops.handleChange}
                    autoComplete="on"
                  />
                  <button type="submit" className="login-button">
                    {formprops.isSubmitting ? (
                      <span
                        style={{ marginRight: "5px" }}
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : null}
                    Login
                  </button>
                  {errorOccur ? (
                    <div style={{width:'88%',marginTop:'10px',marginLeft:'10px',textAlign:'center' }} className="alert alert-danger" role="alert">
                      {errorOccur}
                    </div>
                  ) : null}
                  <div className="login-forgetButton">
                    <button
                      type="button"
                      className="login-forget login-buttoncommon"
                      onClick={launchforgetPass}
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
              </form>
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
      {forget ? (
          <ForgetPass handleForgetlaunch={handleClose}/>
        ) : null}
    </>
  );
};

export default Login;
