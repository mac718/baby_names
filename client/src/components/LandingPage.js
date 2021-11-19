import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import card from "../pics/card.png";
import filter from "../pics/filter.png";
import ratings from "../pics/ratings.png";
import linked from "../pics/linked.png";

const squishExpand = keyframes`
	0% {
		transform: scale(0, .025);
	}
	50% {
		transform: scale(1, .025);
	}
`;

const Hero = styled.div`
  height: 100vh;
  @media (max-width: 500px) {
    height: auto;
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

const FeaturesSectionRatings = styled.div`
  background: white;
  height: 30em;
  animation: ${(props) =>
    props.animate &&
    css`
      ${squishExpand} 1s linear
    `};
`;

const FeaturesSectionLinked = styled.div`
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
  const [animateRatings, setAnimateRatings] = useState(false);
  const [animateLinked, setAnimateLinked] = useState(false);

  const featuresCard = useRef(null);
  const featuresFilter = useRef(null);
  const featuresRatings = useRef(null);
  const featuresLinked = useRef(null);

  let topPositionCard;
  let topPositionFilter;
  let topPositionRatings;
  let topPositionLinked;

  useLayoutEffect(() => {
    topPositionCard = featuresCard.current.getBoundingClientRect().top;
    topPositionFilter = featuresFilter.current.getBoundingClientRect().top;
    topPositionRatings = featuresRatings.current.getBoundingClientRect().top;
    topPositionLinked = featuresLinked.current.getBoundingClientRect().top;

    window.addEventListener("scroll", onScrollCard);
    window.addEventListener("scroll", onScrollFilter);
    window.addEventListener("scroll", onScrollRatings);
    window.addEventListener("scroll", onScrollLinked);

    return () => {
      window.removeEventListener("scroll", onScrollCard);
      window.removeEventListener("scroll", onScrollFilter);
      window.removeEventListener("scroll", onScrollRatings);
      window.removeEventListener("scroll", onScrollLinked);
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
  const onScrollRatings = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    if (topPositionRatings < scrollPosition) {
      setAnimateRatings(true);
    }
  };
  const onScrollLinked = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    if (topPositionLinked < scrollPosition) {
      setAnimateLinked(true);
    }
  };

  return (
    <div>
      <Hero
        className="container-fluid rounded d-flex flex-column justify-content-center align-items-center"
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
      </Hero>
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
      <FeaturesSectionRatings
        className="row"
        ref={featuresRatings}
        animate={animateRatings}
        onScroll={onScrollRatings}
      >
        <div className="fs-4 col-6 d-flex justify-content-center align-items-center text-muted h-100">
          <p>
            Easily view, edit, or delete your ratings and filter them by gender
            and/or origin.
          </p>
        </div>
        <div className="fs-1 col-6 h-100 d-flex justify-content-end align-items-center">
          <img src={ratings} className="w-100 " />
        </div>
      </FeaturesSectionRatings>
      <FeaturesSectionRatings
        className="row"
        ref={featuresLinked}
        animate={animateLinked}
        onScroll={onScrollLinked}
      >
        <div className="fs-1 col-6 h-100 d-flex justify-content-end align-items-center">
          <img src={linked} className="w-100 " />
        </div>
        <div className="fs-4 col-6 d-flex justify-content-center align-items-center text-muted h-100">
          <p>
            Link your account with friends and family to share each others'
            ratings!
          </p>
        </div>
      </FeaturesSectionRatings>
      <div
        className="fs-1 d-flex flex-column justify-content-center align-items-center text-white w-100 rounded"
        style={{
          height: "15em",
          background: "linear-gradient(lightPink, lightBlue)",
        }}
      >
        <p>Ready to start ranking?</p>
        <Link to="/sign-up">
          <button
            className="btn btn-primary fs-4 shadow-sm"
            style={{ width: "10em", height: "5em" }}
          >
            Sign up today!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
