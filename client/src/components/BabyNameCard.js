import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const NameBox = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 5%;
  border: 1px solid black;
  background-color: ${(props) => props.color};
  color: white;
  animation-duration: 1s;
  animation-name: offScreen;
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

class BabyNameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      currentName: "",
      currentRating: 1,
      disabled: true,
      cardColor: "",
    };
  }

  componentDidMount() {
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
        let cardColor;
        cardColor =
          json.names[randomIndex]["gender"] === "m" ? "lightBlue" : "lightPink";
        console.log("cardColor", cardColor);
        this.setState({
          ...this.state,
          names: json.names,
          currentName: json.names[randomIndex]["name"],
          cardColor: cardColor,
        });
      })
      .catch((err) => alert(err));
  }

  render() {
    const handleRatingButtonClick = (e) => {
      e.preventDefault();
      let rating = e.target.value;
      console.log(rating);
      this.setState({
        ...this.state,
        currentRating: rating,
        disabled: false,
      });
    };

    const handleSubmitRating = (e) => {
      e.preventDefault();
      fetch("http://localhost:3001/api/v1/ratings", {
        method: "POST",
        body: JSON.stringify({
          name: this.state.currentName,
          score: this.state.currentRating,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log(json.unratedNames);
          let randomIndex = Math.floor(
            Math.random() * json.unratedNames.length
          );
          let cardColor;
          cardColor =
            json.unratedNames[randomIndex]["gender"] === "m"
              ? "lightBlue"
              : "lightPink";
          console.log("cardColor", cardColor);

          this.setState({
            names: json.names,
            currentName: json.unratedNames[randomIndex]["name"],
            disabled: true,
            cardColor: cardColor,
          });
        })
        .catch((err) => {
          alert(err);
          <Redirect to="/sign-up" />;
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
    return (
      <div>
        <Container className="container" style={{ height: "100vh" }}>
          <NameBox className="shadow opacity-75" color={this.state.cardColor}>
            <TopNameDiv></TopNameDiv>
            <NameDiv>{this.state.currentName}</NameDiv>
            <BottomNameDiv>
              <RadioBox className="input-group">
                {ratingButtons}
                <div className="input-group justify-content-center mt-1">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleSubmitRating}
                    disabled={this.state.disabled}
                  >
                    Submit Rating
                  </button>
                </div>
              </RadioBox>
            </BottomNameDiv>
          </NameBox>
        </Container>
      </div>
    );
  }
}

export default BabyNameCard;
