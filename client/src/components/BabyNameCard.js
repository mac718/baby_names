import React, {useState} from 'react';
import styled from 'styled-components';

const NameBox = styled.div`
  width: 30%;
  height: 60%;
  border-radius: 5%;
  border: 1px solid black;
  background-color: turquoise;
  color: white;
`

const TopNameDiv = styled.div`
  height: 33%;
`

const NameDiv = styled.div`
  height: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`

const BottomNameDiv = styled.div`
  height: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RadioBox = styled.div` 
  display: flex;
  justify-content: center;
  align-items: center;
`
const RatingButton = styled.input` 
  margin-left: 5px;
  margin-right: 5px;
`

const RatingButtonContainer = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
`

const BabyNameCard = () =>{
  const names = ["Joe", 'Mary', 'Mike', 'Rebecca'];

  let randomIndex = Math.floor(Math.random() * 3);
  const [currentName, setCurrentName] = useState(names[randomIndex]);
  const [currentRating, setCurrentRating] = useState(1);
  const [disabled, setDisabled] = useState(true)
  const ratingButtons = [];
  for (let i = 0; i < 10; i += 1) {
    ratingButtons.push(
      <RatingButtonContainer key={i}>
        <RatingButton className="form-check-input" type="radio" id={i + 1} value={i + 1} name="rating" onClick={e => {
          e.preventDefault();
          let rating = e.target.value;
          console.log(rating);
          setCurrentRating(rating);
          setDisabled(false)
        }}/>
        <label htmlFor={i + 1} style={{fontSize: '0.85rem'}}>{i + 1}</label>
      </RatingButtonContainer>
    )
  }
  return (
    <div className="App">
      <Container className="container" style={{height: '100vh'}}>
        <NameBox>
          <TopNameDiv></TopNameDiv>
          <NameDiv>{currentName}</NameDiv>
          <BottomNameDiv>
            <RadioBox className="input-group">
              {ratingButtons}
              <div className="input-group justify-content-center mt-1">
                <button type='button' className="btn btn-secondary" onClick={e => {
                  e.preventDefault();
                  randomIndex = Math.floor(Math.random() * 3);
                  setCurrentName(names[randomIndex]);
                  setDisabled(true);
                  alert(currentRating);
                }} disabled={disabled}>Submit Rating</button>
              </div>
            </RadioBox>
          </BottomNameDiv>
        </NameBox>
      </Container>
    </div>
  );

}

export default BabyNameCard;