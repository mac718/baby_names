import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enteredFname, setEnteredFname] = useState(false);
  const [enteredLname, setEnteredLname] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState(false);
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

            setFirstName(value);
            if (value && value !== "") {
              console.log("fn");
              setEnteredFname(true);
            } else {
              setEnteredFname(false);
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

            setLastName(value);
            if (value && value !== "") {
              setEnteredLname(true);
            } else {
              setEnteredLname(false);
            }
          }}
        />
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          type="email"
          id="email"
          onChange={(e) => {
            let value = e.target.value;

            setEmail(value);
            if (value && value !== "") {
              setEnteredEmail(true);
            } else {
              setEnteredEmail(false);
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
            if (value && value !== "") {
              setEnteredPassword(true);
            } else {
              setEnteredPassword(false);
            }
          }}
        />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <button
            className="btn btn-primary mt-2"
            disabled={
              !enteredFname ||
              !enteredLname ||
              !enteredEmail ||
              !enteredPassword
            }
            onClick={(e) => {
              e.preventDefault();
              fetch("http://localhost:3001/api/v1/users/register", {
                method: "POST",
                body: JSON.stringify({ firstName, lastName, email, password }),
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => {
                  console.log("thing", res);
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
            Sign Up!
          </button>
        </div>
        <div className="mt-2">
          Already have an account? Log in{" "}
          <Link to="/login" class="text-decoration-none fw-bold">
            here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
