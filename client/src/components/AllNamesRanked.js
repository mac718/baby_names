import { Link } from "react-router-dom";
const AllNamesRanked = () => {
  return (
    <div className="d-flex justify-content-center w-100">
      <div className="card" style={{ maxWidth: "25vw" }}>
        <div className="card-body bg-light">
          You've ranked all of the names that match the selected criteria! You
          can edit your ratings <Link to="/ratings">here </Link> or change
          filters above.
        </div>
      </div>
    </div>
  );
};

export default AllNamesRanked;
