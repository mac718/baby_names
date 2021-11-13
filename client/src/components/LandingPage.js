import { Link } from "react-router-dom";

const LandingPage = () => {
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
    </div>
  );
};

export default LandingPage;
