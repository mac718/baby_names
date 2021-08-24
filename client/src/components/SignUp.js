import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <form className="mh-25 h-auto w-25 border border-secondary rounded p-3">
        <div className="fs-2 text-center">Sign Up!</div>
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
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <button
            className="btn btn-primary mt-2"
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();
              fetch("http://localhost:3001/createUser", {
                method: "POST",
                body: JSON.stringify({ email }),
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
              }).catch((err) => {
                console.log(err);
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
