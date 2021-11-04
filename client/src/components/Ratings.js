import React, { useState, useEffect, useRef } from "react";
import RadioButtons from "./RadioButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import NameInfoModal from "./NameInfoModal";
import styled from "styled-components";

const NameSpan = styled.div`
  &:hover {
    font-weight: bold;
  }
  cursor: pointer;
`;

const ResponsiveListItem = styled.li`
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [currentButtonsDivId, setCurrentButtonsDivId] = useState(null);
  const [ratingsLoading, setRatingsLoading] = useState(true);

  //solution to get rid of "cannot update state on unmounted component" error
  let _isMounted = useRef(true);

  const fetchRatings = (isMounted) => {
    fetch("http://localhost:3001/api/v1/ratings", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (isMounted.current) {
          setRatingsLoading(true);
        }

        return res.json();
      })
      .then((json) => {
        if (isMounted.current) {
          setCurrentButtonsDivId(null);
          setRatings(json.groupDivs);
          setRatingsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    _isMounted.current = true;
    fetchRatings(_isMounted);
    return () => {
      _isMounted.current = false;
    };
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
      <ResponsiveListItem className="list-group-item" key={name}>
        <div className="col col-sm"></div>
        <div
          className="col col-sm text-muted"
          data-bs-toggle="modal"
          data-bs-target={`#${name}`}
        >
          <NameSpan>{name}</NameSpan>
          <NameInfoModal name={name} />
        </div>

        <div className="col col-sm">
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
          <div hidden={currentButtonsDivId === name ? false : true} id={name}>
            <RadioButtons name={name} fetchRatings={fetchRatings}>
              <div>
                <button className="btn btn-secondary">Submit Rating</button>
              </div>
            </RadioButtons>
          </div>
        </div>
      </ResponsiveListItem>
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
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  return (
    <div className="container">
      <div className="container mt-2">
        {ratingsLoading ? loadingDiv : groupDivs}
      </div>
    </div>
  );
};

export default Ratings;
