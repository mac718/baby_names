import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

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
  width: 350px;
  height: 350px;
  border-radius: 5%;
  border: 1px solid black;
  background-color: ${(props) => props.color};
  color: white;
  position: relative;
`;

const TopNameDiv = styled.div`
  height: 33%;
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
  justify-content: center;
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

const BabyNameCard = () => {
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [currentRating, setCurrentRating] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [cardColor, setCardColor] = useState("");
  const [animate, setAnimate] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const fetchNames = () => {
    fetch("http://localhost:3001/api/v1/names", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        let randomIndex = Math.floor(Math.random() * json.names.length);
        let color;
        color =
          json.names[randomIndex]["gender"] === "m" ? "lightBlue" : "lightPink";
        setNames(json.names);
        setCurrentName(json.names[randomIndex]["name"]);
        setCardColor(color);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchNames();
    console.log("fetched");
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

    setAnimate(!animate);
    fetch("http://localhost:3001/api/v1/ratings", {
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
        setTimeout(() => {
          setHidden(true);
          setAnimate(false);
        }, 400);

        if (res.status === 401) {
          setRedirect(true);
        }

        return res.json();
      })
      .then((json) => {
        let randomIndex = Math.floor(Math.random() * json.unratedNames.length);
        let color;
        color =
          json.unratedNames[randomIndex]["gender"] === "m"
            ? "lightBlue"
            : "lightPink";
        setTimeout(() => {
          setNames(json.names);
          setCurrentName(json.unratedNames[randomIndex]["name"]);
          setDisabled(true);
          setCardColor(color);
        }, 400);
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
  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Container className="container" style={{ height: "100vh" }}>
        <NameBox className="shadow" color={cardColor}>
          <TopNameDiv></TopNameDiv>
          <NameDiv>{currentName}</NameDiv>
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
        <RatingOverlay animate={animate} hidden={hidden}>
          {currentRating}
        </RatingOverlay>
        {/* <RatingOverlay
          className="fs-1 fw-bold"
          animation={animate}
          isHidden={hidden}
          rating={currentRating}
        /> */}
      </Container>
    </div>
  );
};

export default BabyNameCard;
