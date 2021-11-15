import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import card from "../pics/card.png";
import filter from "../pics/filter.png";

const squishExpand = keyframes`
	0% {
		transform: scale(0, .025);
	}
	50% {
		transform: scale(1, .025);
	}
`;

const FeaturesSectionCard = styled.div`
  background: white;
  height: 30em;
  animation: ${(props) =>
    props.animate &&
    css`
      ${squishExpand} 1s linear
    `};
`;

const FeaturesSectionFilter = styled.div`
  background: white;
  height: 30em;
  animation: ${(props) =>
    props.animate &&
    css`
      ${squishExpand} 1s linear
    `};
`;

const LandingPage = () => {
  const [animateCard, setAnimateCard] = useState(false);
  const [animateFilter, setAnimateFilter] = useState(false);

  const featuresCard = useRef(null);
  const featuresFilter = useRef(null);
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
  let topPositionCard;
  let topPositionFilter;
  useLayoutEffect(() => {
    topPositionCard = featuresCard.current.getBoundingClientRect().top;
    topPositionFilter = featuresFilter.current.getBoundingClientRect().top;
    window.addEventListener("scroll", onScrollCard);
    window.addEventListener("scroll", onScrollFilter);

    return () => {
      window.removeEventListener("scroll", onScrollCard);
      window.removeEventListener("scroll", onScrollFilter);
    };
  }, []);

  const onScrollCard = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    if (topPositionCard < scrollPosition) {
      setAnimateCard(true);
    }
  };
  const onScrollFilter = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    if (topPositionFilter < scrollPosition) {
      setAnimateFilter(true);
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
      <FeaturesSectionCard
        className="row"
        ref={featuresCard}
        animate={animateCard}
        onScroll={onScrollCard}
      >
        <div className="fs-4 col-6 d-flex justify-content-center align-items-center text-muted h-100">
          <p>Rate names on a scale of 1-10.</p>
        </div>
        <div className="fs-1 col-6 h-100 d-flex justify-content-end align-items-center">
          <img src={card} className="w-100 " />
        </div>
      </FeaturesSectionCard>
      <FeaturesSectionFilter
        className="row"
        ref={featuresFilter}
        animate={animateFilter}
        onScroll={onScrollFilter}
      >
        <div className="fs-1 col-6 h-100 d-flex justify-content-end align-items-center">
          <img src={filter} className="w-100 " />
        </div>
        <div className="fs-4 col-6 d-flex justify-content-center align-items-center text-muted h-100">
          <p>Use filters to select which names to see.</p>
        </div>
      </FeaturesSectionFilter>
    </div>
  );
};

export default LandingPage;
