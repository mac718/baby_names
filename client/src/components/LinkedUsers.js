import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SendLinkCodeModal from "./SendLinkCodeModal";

const LinkedUsers = () => {
  const [users, setUsers] = useState([]);
  let userCards = <p className="fs-1">No linked users yet!</p>;

  useEffect(() => {
    const getLinkedUsers = () => {
      fetch("http://localhost:3001/users/linked", {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setUsers(json);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getLinkedUsers();
  }, []);

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
      <button
        className="btn btn-secondary btn-large"
        data-bs-toggle="modal"
        data-bs-target={`#sendLinkCodeModal`}
      >
        <FontAwesomeIcon icon={faPlus} /> Send Link Code!
      </button>
      <SendLinkCodeModal />
      <div d-flex>{userCards}</div>
    </div>
  );
};

export default LinkedUsers;
