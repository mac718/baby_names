import React, { useState } from "react";
import { Redirect } from "react-router";

const LogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(props.location.state.error || "");

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
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          type="text"
          id="email"
          onChange={(e) => {
            let value = e.target.value;
            setEmail(value);
            setDisabled(false);
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
            setDisabled(false);
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
              fetch("http://localhost:3001/api/v1/users/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
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
                    setError(json.msg);
                  }
                })
                .catch((err) => {
                  alert(err);
                  console.log(err);
                  setError(err);
                });
            }}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
