import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const LogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(
    props.location.state ? props.location.state.error : null
  );

  const handleEmailChange = (e) => {
    let value = e.target.value;
    setEmail(value);
    setDisabled(false);
  };

  const handlePasswordChange = (e) => {
    let value = e.target.value;
    setPassword(value);
    setDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://rocky-temple-34078.herokuapp.com/api/v1/users/login", {
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
        console.log(err);
        setError(err.message);
      });
  };

  if (redirect) {
    return <Redirect to="/cards" />;
  }
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <form
        className="border border-secondary rounded p-3"
        style={{ minWidth: "25vw", minHeight: "25vh" }}
      >
        <div className="fs-2 text-center">Log In</div>
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
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          type="password"
          id="password"
          onChange={handlePasswordChange}
        />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <button
            className="btn btn-primary mt-2"
            disabled={disabled}
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
        <div className="mt-2 text-center">
          Don't have an account? Sign up{" "}
          <Link to="/sign-up" class="text-decoration-none fw-bold">
            here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
