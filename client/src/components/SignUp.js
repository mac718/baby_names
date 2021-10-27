import React, { useState } from "react";
import { Redirect } from "react-router";

const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [enteredFname, setEnteredFname] = useState(false);
  const [enteredLname, setEnteredLname] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState(false);
  const [enteredAllFields, setEnteredAllFields] = useState(
    enteredFname && enteredLname && enteredEmail && enteredPassword
  );
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <form className="mh-25 h-auto w-25 border border-secondary rounded p-3">
        <div className="fs-2 text-center">Sign Up!</div>
        {error && (
          <div
            id="error"
            className="text-danger fw-bold text-center w-90 bg-light border border-info rounded"
          >
            {error}
          </div>
        )}
        <label htmlFor="fname">First Name</label>
        <input
          className="form-control"
          type="text"
          id="fname"
          onChange={(e) => {
            let value = e.target.value;
            setFname(value);
            value ? setEnteredFname(true) : setEnteredFname(false);
            if (setEnteredAllFields) {
              setDisabled(false);
            }
          }}
        />
        <label htmlFor="lname">Last Name</label>
        <input
          className="form-control"
          type="text"
          id="lname"
          onChange={(e) => {
            let value = e.target.value;
            setLname(value);
            value ? setEnteredLname(true) : setEnteredLname(false);

            if (setEnteredAllFields) {
              setDisabled(false);
            }
          }}
        />
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          type="text"
          id="email"
          onChange={(e) => {
            let value = e.target.value;
            setEmail(value);
            value ? setEnteredEmail(true) : setEnteredEmail(false);
            if (setEnteredAllFields) {
              setDisabled(false);
            }
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          type="password"
          id="password"
          onChange={(e) => {
            let value = e.target.value;
            setPassword(value);
            value ? setEnteredPassword(true) : setEnteredPassword(false);
            if (setEnteredAllFields) {
              setDisabled(false);
            }
          }}
        />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <button
            className="btn btn-primary mt-2"
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();
              fetch("http://localhost:3001/api/v1/users/register", {
                method: "POST",
                body: JSON.stringify({ fname, lname, email, password }),
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => {
                  if (res.status === 200) {
                    setRedirect(true);
                  } else {
                    return res.json();
                  }
                })
                .then((json) => {
                  if (json) {
                    //setError(json.msg);
                  }
                })
                .catch((err) => {
                  alert(err);
                  console.log(err);
                  //setError(err);
                });
            }}
          >
            Sign Up!
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
