import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./contexts/UserContext";

const DropdownMenu = styled.li`
  @media only screen and (max-width: 500px) {
    & > button:after {
      float: left;
    }
  }
`;

const NavBar = ({ user, getCurrentUser }) => {
  const history = useHistory();

  const handleSignOut = (e) => {
    e.preventDefault();
    fetch("/api/v1/users/sign-out", {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        getCurrentUser(null);
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <span
            style={{
              background: "linear-gradient(lightPink, blue)",
              color: "white",
            }}
            className="rounded p-2"
          >
            Nominfans
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">thing</span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/cards">
                Rank Names
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/ratings"
              >
                Your Ratings
              </a>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start bg-light"
                aria-labelledby="navbarDropdown"
              >
                <li className="dropdown-item">
                  <Link
                    to="/account"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Account
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link
                    to="/linked"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Linked Account Ratings
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={handleSignOut}>
                    Sign Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {user ? (
          <div className="text-decoration-none fw-bold">
            Hi,{" "}
            <Link to="/account" className="text-decoration-none">
              {user}
            </Link>
            !
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary float-right">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
