import React, { useState, useEffect } from "react";
import RadioButtons from "./RadioButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [currentButtonsDivId, setCurrentButtonsDivId] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const fetchRatings = () => {
    fetch("http://localhost:3001/api/v1/ratings", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setCurrentButtonsDivId(null);
        setRatings(json.groupDivs);
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

  let groupDivs = ratings.map((group, idx) => {
    let names = group.map((name) => (
      <li className="list-group-item d-flex justify-content-between" key={name}>
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col text-muted">{name}</div>
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
    let rating = 11 - (idx + 1);
    let color;
    if (rating >= 7) {
      color = "success";
    } else if (rating >= 5) {
      color = "muted";
    } else {
      color = "danger";
    }
    if (redirect) {
      <Redirect to="/login" />;
    }
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
  return (
    <div className="container">
      <div className="container mt-2">{groupDivs}</div>
    </div>
  );
};

export default Ratings;
