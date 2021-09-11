import styled from "styled-components";
const { useState } = require("react");

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

const RadioButtons = ({ name }) => {
  const [newRating, setNewRating] = useState(5);
  const [disabled, setDisabled] = useState(true);
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

            setNewRating(rating);
            setDisabled(false);
          }}
        />
        <label htmlFor={i + 1} style={{ fontSize: "0.85rem" }}>
          {i + 1}
        </label>
      </RatingButtonContainer>
    );
  }
  return (
    <RadioBox className="input-group">
      {ratingButtons}
      <div className="input-group justify-content-center mt-1">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            fetch("http://localhost:3001/updateRating", {
              method: "PUT",
              body: JSON.stringify({
                name: name,
                rating: newRating,
              }),
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => {
                window.location.href = "/ratings";
              })
              .catch((err) => {
                alert(err);
              });
          }}
          disabled={disabled}
        >
          Submit Rating
        </button>
      </div>
    </RadioBox>
  );
};

export default RadioButtons;
