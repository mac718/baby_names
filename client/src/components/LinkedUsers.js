import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SendLinkCodeModal from "./SendLinkCodeModal";
import EnterLinkCodeModal from "./EnterLinkCodeModal";

const LinkedUsers = () => {
  const [users, setUsers] = useState([]);
  let userCards = <p className="fs-1">No linked users yet!</p>;

  useEffect(() => {
    const getLinkedUsers = () => {
      fetch("http://localhost:3001/api/v1/users/linked", {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setUsers(json.linkedUsers);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getLinkedUsers();
  }, []);

  if (users.length > 0) {
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
      <button
        className="btn btn-secondary btn-large"
        data-bs-toggle="modal"
        data-bs-target={`#sendLinkCodeModal`}
      >
        <FontAwesomeIcon icon={faPlus} /> Send Link Code!
      </button>

      <button
        className="btn btn-primary btn-large"
        data-bs-toggle="modal"
        data-bs-target={`#enterLinkCodeModal`}
      >
        <FontAwesomeIcon icon={faPlus} /> Enter Link Code!
      </button>

      <SendLinkCodeModal />
      <EnterLinkCodeModal />
      <div>
        <div className="d-flex">{userCards}</div>
      </div>
    </div>
  );
};

export default LinkedUsers;
