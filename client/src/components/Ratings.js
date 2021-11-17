import React, { useState, useEffect, useRef } from "react";
import RadioButtons from "./RadioButtons";
import Filters from "./Filters";
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

const Ratings = ({ getCurrentUser }) => {
  const [ratings, setRatings] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [currentButtonsDivId, setCurrentButtonsDivId] = useState(null);
  const [ratingsLoading, setRatingsLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedOrigin, setSelectedOrigin] = useState("All");

  //solution to get rid of "cannot update state on unmounted component" error
  let _isMounted = useRef(true);

  const groupRatings = (ratings) => {
    let groupDivs = [];

    for (let score = 10; score >= 1; score -= 1) {
      let groupRatings = ratings.filter(
        (rating) => Number(rating.score) === score
      );
      let group = groupRatings.map((rating) => rating.name);
      groupDivs.push(group);
    }

    return groupDivs;
  };

  const filterRatingsToBeShown = (genderFilter, originFilter, ratings) => {
    if (genderFilter !== "All") {
      if (genderFilter === "Male") {
        ratings = ratings.filter((rating) => rating.name.gender === "m");
      } else if (genderFilter === "Female") {
        ratings = ratings.filter((rating) => rating.name.gender === "f");
      } else {
        ratings = ratings.filter((rating) => rating.name.gender === "n");
      }
    }

    if (originFilter !== "All") {
      if (originFilter === "USA") {
        ratings = ratings.filter((rating) => rating.name.origin === "USA");
      } else if (originFilter === "Europe") {
        ratings = ratings.filter((rating) => rating.name.origin === "Europe");
      } else if (originFilter === "Africa") {
        ratings = ratings.filter((rating) => rating.name.origin === "Africa");
      } else {
        ratings = ratings.filter((rating) => rating.name.origin === "Asia");
      }
    }
    return ratings;
  };

  const fetchRatings = (genderFilter, originFilter, isMounted = _isMounted) => {
    fetch("api/v1/ratings/id", {
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
          setSelectedGender(genderFilter);
          setSelectedOrigin(originFilter);
          let ratingsToBeShown = filterRatingsToBeShown(
            genderFilter,
            originFilter,
            json.ratings
          );
          setCurrentButtonsDivId(null);
          let groupDivs = groupRatings(ratingsToBeShown);
          setRatings(groupDivs);
          setRatingsLoading(false);
          getCurrentUser(json.username);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    _isMounted.current = true;
    fetchRatings(selectedGender, selectedOrigin, _isMounted);
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const handleDeleteRating = (e) => {
    e.preventDefault();
    let name = e.target.parentElement.parentElement.children[1].innerHTML;
    fetch("api/v1/ratings", {
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
    let names = group.map((name) => {
      let nameColor;
      name.gender === "m"
        ? (nameColor = "lightBlue")
        : (nameColor = "lightPink");
      return (
        <ResponsiveListItem className="list-group-item" key={name.name}>
          <div className="col col-sm"></div>
          <div className="col col-sm text-muted">
            <NameSpan
              className="d-inline-block"
              style={{ color: nameColor }}
              data-bs-toggle="modal"
              data-bs-target={`#${name.name}`}
            >
              {name.name}
            </NameSpan>
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
      );
    });
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
      <Filters fetchFn={fetchRatings} />
      <div className="container mt-2">
        {ratingsLoading ? loadingDiv : groupDivs}
      </div>
    </div>
  );
};

export default Ratings;
