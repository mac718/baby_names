import React, { useState, useEffect } from "react";
import RadioButtons from "./RadioButtons";

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [currentButtonsDivId, setCurrentButtonsDivId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/ratings", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json.groupDivs);
        setRatings(json.groupDivs);
        console.log(json.groupDivs);
      })
      .catch((err) => alert(err));
  }, ratings);

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
    })
      .then(() => {
        window.location.href = "/ratings";
      })
      .catch((err) => alert(err));
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
            <div className="col">{name}</div>
            <div className="col">
              <button
                className="btn btn-primary btn-sm float-end m-1"
                onClick={(e) => handleShowRadioButtons(e, name)}
              >
                Edit Rating
              </button>
              <button
                className="btn btn-danger btn-sm float-end m-1"
                onClick={handleDeleteRating}
              >
                Delete Rating
              </button>
              <div
                hidden={currentButtonsDivId === name ? false : true}
                id={name}
              >
                <RadioButtons name={name} />
              </div>
            </div>
          </div>
        </div>
      </li>
    ));
    return (
      <div
        className="container border border-dark rounded mt-3 h-10"
        key={idx / 10}
      >
        <div className="fs-2 text-center fw-light">
          <div
            className="border border-dark rounded-circle m-auto mt-2 opacity-75"
            style={{ width: "65px", backgroundColor: "lightblue" }}
          >
            {idx + 1}
          </div>
        </div>
        <ul className="text-center fs-4 list-group list-group-flush">
          {names}
        </ul>
      </div>
    );
  });
  console.log(groupDivs);
  return (
    <div className="container">
      <div className="container mt-2">{groupDivs}</div>
    </div>
  );
};

export default Ratings;
