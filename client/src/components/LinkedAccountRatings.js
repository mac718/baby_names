import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import NameInfoModal from "./NameInfoModal";
import Filters from "./Filters";
import styled from "styled-components";

const NameSpan = styled.div`
  &:hover {
    font-weight: bolder;
  }
  cursor: pointer;
`;

const LinkedAccountRatings = (props) => {
  const [ratings, setRatings] = useState([]);
  const [ratingsLoading, setRatingsLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedOrigin, setSelectedOrigin] = useState("All");
  let params = useParams();

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
        ratings = ratings.filter((rating) => rating.name.gender === "b");
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
    fetch(`http://localhost:3001/api/v1/ratings/${params.id}`, {
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
          let groupDivs = groupRatings(ratingsToBeShown);
          console.log(groupDivs);
          setRatings(groupDivs);
          setRatingsLoading(false);
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
        <li
          className="list-group-item d-flex justify-content-between"
          key={name}
        >
          <div className="container">
            <div className="text-center">
              <div className="col">
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
            </div>
          </div>
        </li>
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

export default LinkedAccountRatings;
