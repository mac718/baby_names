import React, { useState } from "react";
import styled from "styled-components";

const NameBox = styled.div`
  width: 30%;
  height: 60%;
  border-radius: 5%;
  border: 1px solid black;
  background-color: turquoise;
  color: white;
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
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/getNames", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json.names);
        let randomIndex = Math.floor(Math.random() * json.names.length);
        this.setState({
          ...this.state,
          names: json.names,
          currentName: json.names[randomIndex]["name"],
        });
      })
      .catch((err) => alert(err));
  }

  render() {
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
            onClick={(e) => {
              e.preventDefault();
              let rating = e.target.value;
              console.log(rating);
              this.setState({
                ...this.state,
                currentRating: rating,
                disabled: false,
              });
            }}
          />
          <label htmlFor={i + 1} style={{ fontSize: "0.85rem" }}>
            {i + 1}
          </label>
        </RatingButtonContainer>
      );
    }
    return (
      <div className="App">
        <Container className="container" style={{ height: "100vh" }}>
          <NameBox>
            <TopNameDiv></TopNameDiv>
            <NameDiv>{this.state.currentName}</NameDiv>
            <BottomNameDiv>
              <RadioBox className="input-group">
                {ratingButtons}
                <div className="input-group justify-content-center mt-1">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      fetch("http://localhost:3001/saveRating", {
                        method: "POST",
                        body: JSON.stringify({
                          name: this.state.currentName,
                          rating: this.state.currentRating,
                        }),
                        credentials: "include",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                        .then(() => {
                          let randomIndex = Math.floor(Math.random() * 3);
                          this.setState({
                            ...this.state,
                            currentName: this.state.names[randomIndex],
                            disabled: false,
                          });
                        })
                        .catch((err) => {
                          alert(err);
                        });
                    }}
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
