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

  const handleFirstNameChange = (e) => {
    let value = e.target.value;

    setFirstName(value);
    if (value && value !== "") {
      setEnteredFname(true);
    } else {
      setEnteredFname(false);
    }
  };

  const handleLastNameChange = (e) => {
    let value = e.target.value;

    setLastName(value);
    if (value && value !== "") {
      setEnteredLname(true);
    } else {
      setEnteredLname(false);
    }
  };

  const handleEmailChange = (e) => {
    let value = e.target.value;

    setEmail(value);
    const emailValidator = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (emailValidator.test(value)) {
      setEnteredEmail(true);
    } else {
      setEnteredEmail(false);
    }
  };

  const handlePasswordChange = (e) => {
    let value = e.target.value;
    const MINIMUM_PASSWORD_LENGTH = 5;
    setPassword(value);
    if (value.length >= MINIMUM_PASSWORD_LENGTH) {
      setEnteredPassword(true);
    } else {
      setEnteredPassword(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://rocky-temple-34078.herokuapp.com/api/v1/users/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
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
        setError(err);
      });
  };

  if (redirect) {
    return <Redirect to="/cards" />;
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
          onChange={handleFirstNameChange}
        />
        <label htmlFor="lname">Last Name</label>
        <input
          className="form-control"
          type="text"
          id="lname"
          onChange={handleLastNameChange}
        />
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          type="email"
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
            disabled={
              !enteredFname ||
              !enteredLname ||
              !enteredEmail ||
              !enteredPassword
            }
            onClick={handleSubmit}
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
