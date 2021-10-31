import styled, { keyframes, css } from "styled-components";
import { useState } from "react";

const pop = keyframes`
  from {
    opacity: 1;
    top: 0;
  }
  to {
    opacity: 0;
    top: -10rem;
  }
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 1;
  top: 3rem;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  opacity: 0;
  animation: ${(props) =>
    props.animation &&
    css`
      ${pop} 1s linear 1
    `};
`;

const RatingOverlay = ({ rating, isHidden, animation }) => {
  //const [animation, setAnimation] = useState();
  //setAnimation(animate);
  console.log(animation, isHidden);
  return (
    <Overlay className="fs-1 fw-bold" animation={animation} isHidden={isHidden}>
      {rating}
    </Overlay>
  );
};

export default RatingOverlay;
