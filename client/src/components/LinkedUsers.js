import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SendLinkCodeModal from "./SendLinkCodeModal";
import EnterLinkCodeModal from "./EnterLinkCodeModal";
import styled from "styled-components";

const ButtonDiv = styled.div`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  width: 25%;
  height: 100%;
  margin-left: 10px;
  margin-righ: 10px;
  @media (max-width: 500px) {
    width: 90vw;
    height: 50%;
    margin-bottom: 5px;
  }
`;
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
        <div className="card shadow-sm m-2" style={{ width: "20%" }}>
          <img
            src="..."
            class="card-img-top w-25 h-25 rounded-circle"
            alt="..."
          />
          <div className="card-body">
            <Link
              to={{
                pathname: `/linked-ratings/${user._id}`,
              }}
            >
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
      <ButtonDiv className="d-flex justify-content-center h-25 w-100 mb-3">
        <Button
          className="btn btn-secondary shadow-sm fs-3"
          data-bs-toggle="modal"
          data-bs-target={`#sendLinkCodeModal`}
        >
          <FontAwesomeIcon icon={faPlus} /> Send link request!
        </Button>

        <Button
          className="btn btn-primary shadow-sm fs-3"
          data-bs-toggle="modal"
          data-bs-target={`#enterLinkCodeModal`}
        >
          <FontAwesomeIcon icon={faCheck} /> Enter Link Code!
        </Button>
      </ButtonDiv>

      <SendLinkCodeModal />
      <EnterLinkCodeModal />
      <div className="w-100">
        <div className="d-flex justify-content-center">{userCards}</div>
      </div>
    </div>
  );
};

export default LinkedUsers;
