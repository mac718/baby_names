import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LinkedUsers = ({ users }) => {
  let userCards = <p className="fs-1">No linked users yet!</p>;

  if (users) {
    userCards = users.map((user) => {
      return (
        <div className="card">
          <div className="card-body">
            <Link>
              {user.firstName} {user.lastName}
            </Link>
          </div>
        </div>
      );
    });
  }
  return (
    <div
      className="
      d-flex
      flex-column
      justify-content-center
      align-items-center
      w-90
      vh-100"
    >
      <button className="btn btn-secondary btn-large">
        <FontAwesomeIcon icon={faPlus} /> Send Link Code!
      </button>
      <div d-flex>{userCards}</div>
    </div>
  );
};

export default LinkedUsers;
