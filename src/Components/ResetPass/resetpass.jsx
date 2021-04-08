import React, { useState, useEffect } from "react";
import "./resetpass.css";
const ForgetPass = (props) => {
  const [pass, setpass] = useState();
  const [password, setpassword] = useState();
  const [reset, setreset] = useState(false);
  const [check, setcheck] = useState(false);
  const token = props.match.params.token;
  const [verifytoken, setverifytoken] = useState();
  const [verifyreset, setverifyreset] = useState();
  const [userid, setuserid] = useState();
  const [iswait,setiswait]=useState(false);
  const updatePass = (e) => {
    setpass(e.target.value);
  };
  const updatePassword = (e) => {
    setpassword(e.target.value);
  };
  const resetpassword = () => {
    if (pass === password) setreset(true);
  };
  useEffect(() => {
    setcheck(false);
    fetch("http://localhost:3333/verifytoken", {
      method: "POST",
      body: JSON.stringify({ token: token }),
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
        setuserid(datarec.verify);
        setverifytoken(true);
        setcheck(true);
      })
      .catch((err) => {
        setverifytoken(false);
        setcheck(true);
      });
  }, [token]);
  useEffect(() => {
    if (reset) {
      setiswait(true);
      let obj = {};
      obj.userid = userid;
      obj.password = password;
      setcheck(false);
      fetch("http://localhost:3333/setresetpass", {
        method: "POST",
        body: JSON.stringify(obj),
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
          if (datarec.status) setverifyreset(true);
          else setverifyreset(false);
          setcheck(true);
          setiswait(false);
        })
        .catch((err) => {
          setverifyreset(false);
          setcheck(true);
          setiswait(false);
        });
    }
    // eslint-disable-next-line
  }, [reset]);
  return (
    <>
      {check ? (
        <>
          {verifytoken ? (
            <div className="reset-modalDiv">
              <h2>Reset Password</h2>
              <div className="reset-inputDiv">
                <i className="reset-icon fas fa-lock"></i>
                <input
                  value={pass}
                  onChange={updatePass}
                  type="password"
                  name="resetpass"
                  id="resetpass"
                  className="reset-input"
                  placeholder="For exp: An68fr3mqGQXB3MOIQ"
                />
                <label htmlFor="resetpass" className="reset-label">
                  Password
                </label>
              </div>
              <div className="reset-inputDiv">
                <i className="reset-icon fas fa-lock"></i>
                <input
                  value={password}
                  onChange={updatePassword}
                  type="password"
                  name="resetpassword"
                  id="resetpassword"
                  className="reset-input"
                  placeholder="For exp: An68fr3mqGQXB3MOIQ"
                />
                <label htmlFor="resetpassword" className="reset-label">
                  Confirm Password
                </label>
              </div>
              {password && password !== pass && (
                <div class="alert alert-danger">Password does not match</div>
              )}
              {verifyreset ? (
                <div class="alert alert-success">Reset successful</div>
              ) : null}
              {verifyreset === false ? (
                <div class="alert alert-danger">
                  Sorry!Server is busy,Please try again later
                </div>
              ) : null}
              <button
                type="submit"
                className="reset-button"
                onClick={resetpassword}
              >
                 {iswait ? (
              <span
                className="spinner-grow spinner-grow-sm"
                style={{ marginRight: "10px" }}
              ></span>
            ) : null}
                Reset Password
              </button>
            </div>
          ) : (
            <h3 style={{marginLeft:'10px'}}>Sorry! Link has been expired.Please try to generate reset link again.</h3>
          )}
        </>
      ) : (
        null
      )}
    </>
  );
};

export default ForgetPass;
