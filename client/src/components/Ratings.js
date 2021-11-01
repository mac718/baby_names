import React, { useState, useEffect } from "react";
import RadioButtons from "./RadioButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import NameInfoModal from "./NameInfoModal";

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [currentButtonsDivId, setCurrentButtonsDivId] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [ratingsLoading, setRatingsLoading] = useState(true);

  const fetchRatings = () => {
    fetch("http://localhost:3001/api/v1/ratings", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        setRatingsLoading(true);
        return res.json();
      })
      .then((json) => {
        setCurrentButtonsDivId(null);
        setRatings(json.groupDivs);
        setRatingsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const handleDeleteRating = (e) => {
    e.preventDefault();
    let name = e.target.parentElement.parentElement.children[1].innerHTML;
    fetch("http://localhost:3001/api/v1/ratings", {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({
        name,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).catch((err) => alert(err));
  };

  const handleShowRadioButtons = (e, name) => {
    e.preventDefault();
    setHidden(!hidden);
    setCurrentButtonsDivId(currentButtonsDivId ? null : name);
  };

  const setRatingNumberColor = (idx) => {
    let rating = 11 - (idx + 1);
    if (rating >= 7) {
      return "success";
    } else if (rating >= 5) {
      return "muted";
    } else {
      return "danger";
    }
  };

  let groupDivs = ratings.map((group, idx) => {
    let names = group.map((name) => (
      <li className="list-group-item d-flex justify-content-between" key={name}>
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div
              className="col text-muted"
              data-bs-toggle="modal"
              data-bs-target={`#${name}`}
            >
              {name}
              <NameInfoModal name={name} />
            </div>

            <div className="col">
              <FontAwesomeIcon
                icon={faEdit}
                className="float-end m-2"
                onClick={(e) => handleShowRadioButtons(e, name)}
                cursor="pointer"
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="float-end m-2"
                onClick={handleDeleteRating}
                cursor="pointer"
              />
              <div
                hidden={currentButtonsDivId === name ? false : true}
                id={name}
              >
                <RadioButtons name={name} fetchRatings={fetchRatings}>
                  <div>
                    <button className="btn btn-secondary">Submit Rating</button>
                  </div>
                </RadioButtons>
              </div>
            </div>
          </div>
        </div>
      </li>
    ));
    let color = setRatingNumberColor(idx);
    return (
      <div
        className="container border border-dark rounded mt-3 h-10"
        key={idx / 10}
      >
        <div className="fs-2 text-center fw-light">
          <div className={`fs-1 fw-bold text-${color} m-auto mt-2`}>
            {11 - (idx + 1)}
          </div>
        </div>
        <ul className="text-center fs-4 list-group list-group-flush">
          {names}
        </ul>
      </div>
    );
  });
  const loadingDiv = (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100">
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (redirect) {
    <Redirect to="/login" />;
  }
  return (
    <div className="container">
      <div className="container mt-2">
        {ratingsLoading ? loadingDiv : groupDivs}
      </div>
    </div>
  );
};

export default Ratings;
