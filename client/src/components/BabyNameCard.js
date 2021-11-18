import React, { useState, useEffect, useRef, useContext } from "react";
import { Redirect } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import Filters from "./Filters";
import AllNamesRanked from "./AllNamesRanked";
import { UserContext } from "./contexts/UserContext";

const pop = keyframes`
  from {
    opacity: 1;
    top: 0;
    font-size: 48px;
    color: black;
  }
  to {
    opacity: 0;
    top: 0;
    font-size: 250px;
    color: white;
  }
`;

const RatingOverlay = styled.div`
  position: absolute;
  z-index: 1;
  top: 4rem;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-weight: bold;
  opacity: 0;
  animation: ${(props) =>
    props.animate &&
    css`
      ${pop} 0.8s linear 1
    `};
`;

const NameBox = styled.div`
  width: 400px;
  height: 400px;
  max-width: 90%;
  border-radius: 2%;
  border: 1px solid black;
  background-color: ${(props) => props.color};
  color: white;
  position: relative;
`;

const TopNameDiv = styled.div`
  height: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const NameDiv = styled.div`
  height: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

const BottomNameDiv = styled.div`
  height: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const RadioBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RatingButton = styled.input`
  margin-left: 5px;
  margin-right: 5px;
`;

const RatingButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
`;

const BabyNameCard = ({ getCurrentUser }) => {
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [currentRating, setCurrentRating] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [cardColor, setCardColor] = useState("");
  const [animate, setAnimate] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedOrigin, setSelectedOrigin] = useState("All");
  const [showNoNamesMessage, setShowNoNamesMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState(null);

  const filterNamesToBeRated = (genderFilter, originFilter, namesToBeRated) => {
    if (genderFilter !== "All") {
      if (genderFilter === "Male") {
        namesToBeRated = namesToBeRated.filter((name) => name.gender === "m");
      } else if (genderFilter === "Female") {
        namesToBeRated = namesToBeRated.filter((name) => name.gender === "f");
      } else {
        namesToBeRated = namesToBeRated.filter((name) => name.gender === "n");
      }
    }

    if (originFilter !== "All") {
      if (originFilter === "USA") {
        namesToBeRated = namesToBeRated.filter((name) => name.origin === "USA");
      } else if (originFilter === "Europe") {
        namesToBeRated = namesToBeRated.filter(
          (name) => name.origin === "Europe"
        );
      } else if (originFilter === "Africa") {
        namesToBeRated = namesToBeRated.filter(
          (name) => name.origin === "Africa"
        );
      } else {
        namesToBeRated = namesToBeRated.filter(
          (name) => name.origin === "Asia"
        );
      }
    }

    return namesToBeRated;
  };

  const getCardColor = (names, index) => {
    let color;
    if (names[index]["gender"] === "m") {
      color = "lightBlue";
    } else if (names[index]["gender"] === "f") {
      color = "lightPink";
    } else {
      color = "purple";
    }
    return color;
  };

  //solution to get rid of "cannot update state on unmounted component" error
  let _isMounted = useRef(true);

  const fetchNames = (
    genderFilter = "All",
    originFilter = "All",
    isMounted = _isMounted
  ) => {
    fetch(`/api/v1/names`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (isMounted.current) {
          setIsLoading(true);
        }
        return res.json();
      })
      .then((json) => {
        if (isMounted.current) {
          setSelectedGender(genderFilter);
          setSelectedOrigin(originFilter);

          const namesToBeRated = filterNamesToBeRated(
            genderFilter,
            originFilter,
            json.names
          );

          if (namesToBeRated.length === 0) {
            setShowNoNamesMessage(true);
          } else {
            let randomIndex = Math.floor(Math.random() * namesToBeRated.length);
            let color = getCardColor(namesToBeRated, randomIndex);

            setShowNoNamesMessage(false);
            setNames(namesToBeRated);
            setCurrentName(namesToBeRated[randomIndex]);
            setCardColor(color);
            setIsLoading(false);
            getCurrentUser(json.username);
            setUserName(json.userName);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    _isMounted.current = true;
    fetchNames(selectedGender, selectedOrigin, _isMounted);
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const handleRatingButtonClick = (e) => {
    e.preventDefault();
    let rating = e.target.value;
    setCurrentRating(rating);
    setDisabled(false);
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();
    setHidden(!hidden);

    fetch(`/api/v1/ratings`, {
      method: "POST",
      body: JSON.stringify({
        name: currentName,
        score: currentRating,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setAnimate(!animate);

        setHidden(true);
        setAnimate(false);

        if (res.status === 401) {
          setRedirect(true);
        }

        return res.json();
      })
      .then((json) => {
        const namesToBeRated = filterNamesToBeRated(
          selectedGender,
          selectedOrigin,
          json.unratedNames
        );

        let randomIndex = Math.floor(Math.random() * namesToBeRated.length);
        let color = getCardColor(namesToBeRated, randomIndex);

        if (namesToBeRated.length === 0) {
          setShowNoNamesMessage(true);
        } else {
          setNames(namesToBeRated);
          setCurrentName(namesToBeRated[randomIndex]);
          setDisabled(true);
          setCardColor(color);
        }
      })
      .catch((err) => {
        setRedirect(true);
      });
  };
  const ratingButtons = [];
  for (let i = 0; i < 10; i += 1) {
    ratingButtons.push(
      <RatingButtonContainer key={i}>
        <RatingButton
          className="form-check-input"
          type="radio"
          id={i + 1}
          value={i + 1}
          name="rating"
          onClick={handleRatingButtonClick}
        />
        <label htmlFor={i + 1} style={{ fontSize: "0.85rem" }}>
          {i + 1}
        </label>
      </RatingButtonContainer>
    );
  }

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
  if (redirect) {
    return <Redirect to="/login" />;
  }
  if (showNoNamesMessage) {
    return (
      <div>
        <div className="w-100 d-flex justify-content-center">
          <Filters fetchNames={fetchNames} className="position-fixed" />
        </div>
        <AllNamesRanked />
      </div>
    );
  }
  return (
    <div>
      <Filters fetchFn={fetchNames} className="position-fixed" />
      <Container className="container" style={{ height: "100vh" }}>
        {isLoading ? (
          loadingDiv
        ) : (
          <NameBox className="shadow" color={cardColor}>
            <TopNameDiv className="text-muted">
              <em>origin: {currentName.origin}</em>
            </TopNameDiv>
            <NameDiv>{currentName.name}</NameDiv>
            <BottomNameDiv>
              <RadioBox className="input-group">
                {ratingButtons}
                <div className="input-group justify-content-center mt-1">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleSubmitRating}
                    disabled={disabled}
                  >
                    Submit Rating
                  </button>
                </div>
              </RadioBox>
            </BottomNameDiv>
          </NameBox>
        )}
        <RatingOverlay animate={animate} hidden={hidden}>
          {currentRating}
        </RatingOverlay>
      </Container>
    </div>
  );
};

export default BabyNameCard;
