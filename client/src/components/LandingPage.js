import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

const squishExpand = keyframes`
	0% {
		transform: scale(0, .025);
	}
	50% {
		transform: scale(1, .025);
	}
`;

const FeaturesSection = styled.div`
  background: orange;
  animation: ${(props) =>
    props.animate &&
    css`
      ${squishExpand} 1s linear
    `};
`;

const LandingPage = () => {
  const [animate, setAnimate] = useState(false);
  const features = useRef(null);
  console.log(features.current);
  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       setAnimate(true);
  //     }
  //   });
  // });
  // console.log(document.querySelector(".features"));
  // observer.observe(features);
  // const handleScroll = (e, observer) => {
  //   console.log(animate);
  // };
  let topPosition;
  useLayoutEffect(() => {
    topPosition = features.current.getBoundingClientRect().top;
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    if (topPosition < scrollPosition) {
      setAnimate(true);
    }
  };

  return (
    <div>
      <div
        className="container-fluid vh-100 rounded d-flex flex-column justify-content-center align-items-center"
        style={{ background: "linear-gradient(lightPink, lightBlue)" }}
      >
        <div
          className="text-center"
          style={{ fontSize: "6rem", color: "white" }}
        >
          Rank Baby Names!
        </div>
        <div className="fs-3 text-light text-center w-50">
          Collaborate with friends and family to come up with the perfect name
          for your new edition!
        </div>
        <button className="btn btn-light mt-3">
          <Link
            to="/sign-up"
            className="text-decoration-none"
            style={{ color: "purple" }}
          >
            <span>Sign Up!</span>
          </Link>
        </button>
      </div>
      <FeaturesSection
        className="row "
        ref={features}
        animate={animate}
        onScroll={onScroll}
      >
        <div className="fs-1 col-6 features">Hi</div>
        <div className="fs-1 col-6">Yo</div>
      </FeaturesSection>
    </div>
  );
};

export default LandingPage;
