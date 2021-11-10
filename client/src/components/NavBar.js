import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Baby Names
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
              <a className="nav-link active" aria-current="page" href="/">
                Rank Names
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/ratings/"
              >
                Your Ratings
              </a>
            </li>
            <li class="nav-item dropdown">
              <FontAwesomeIcon
                icon={faBars}
                class="nav-link dropdown-toggle"
                style={{ width: "10%" }}
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />

              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
