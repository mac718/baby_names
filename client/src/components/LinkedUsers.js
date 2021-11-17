import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SendLinkCodeModal from "./SendLinkCodeModal";
import EnterLinkCodeModal from "./EnterLinkCodeModal";
import styled from "styled-components";
import DeleteLinkedUserModal from "./DeleteLinkedUserModal";

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
  margin-right: 10px;
  @media (max-width: 500px) {
    width: 90vw;
    height: 50%;
    margin-bottom: 5px;
  }
`;

const LinkedUserCardContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const LinkedUserCard = styled.div`
  width: 20%;
  @media (max-width: 500px) {
    width: 90%;
  }
`;
const LinkedUsers = ({ getCurrentUser }) => {
  const [users, setUsers] = useState([]);
  let userCards = <p className="fs-1">No linked users!</p>;

  const getLinkedUsers = () => {
    fetch("https://rocky-temple-34078.herokuapp.com/api/v1/users/linked", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setUsers(json.linkedUsers);
        getCurrentUser(json.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLinkedUsers();
  }, []);

  const handleDeleteLink = (e, id) => {
    e.preventDefault();
    console.log("hello");
    fetch(
      `https://rocky-temple-34078.herokuapp.com/api/v1/users/delete-link/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => getLinkedUsers())
      .catch((err) => console.log(err));
  };

  if (users.length > 0) {
    let imgDivBg = "";
    userCards = users.map((user) => {
      if (!user.pic) imgDivBg = "bg-dark";
      return (
        <LinkedUserCard className="card shadow-sm m-2 bg-light" key={user._id}>
          <div className="card-title justify-center">
            <button
              className="btn btn-warning btn-sm m-2 text-white"
              data-bs-toggle="modal"
              data-bs-target={`#deleteLinkedUserModal${user._id}`}
              //onClick={(e) => handleDeleteLink(e, user._id)}
            >
              Delete account link
            </button>
            <DeleteLinkedUserModal
              id={user._id}
              handleDeleteLink={handleDeleteLink}
            />
          </div>
          <div
            className={
              "d-flex justify-content-center m-2 w-50 h-100 m-auto" + imgDivBg
            }
          >
            <img src={user.pic} class="card-img-top rounded-circle" alt="..." />
          </div>
          <div className="card-body d-flex justify-content-center">
            <Link
              to={{
                pathname: `/linked-ratings/${user._id}`,
              }}
              className="text-decoration-none text-dark fw-bold"
            >
              {user.firstName} {user.lastName}
            </Link>
          </div>
        </LinkedUserCard>
      );
    });
  }
  return (
    <div>
      <div className="fs-1 text-center mb-2">Linked Users</div>
      <div
        className="
      d-flex
      flex-column
      justify-content-center
      align-items-center
      w-90
      vh-90"
      >
        <ButtonDiv className="d-flex justify-content-center h-25 w-100 mb-3">
          <Button
            className="btn btn-secondary shadow fs-4"
            data-bs-toggle="modal"
            data-bs-target={`#sendLinkCodeModal`}
          >
            <FontAwesomeIcon icon={faPlus} /> Send link request!
          </Button>

          <Button
            className="btn btn-primary shadow fs-4"
            data-bs-toggle="modal"
            data-bs-target={`#enterLinkCodeModal`}
          >
            <FontAwesomeIcon icon={faCheck} /> Enter Link Code!
          </Button>
        </ButtonDiv>

        <SendLinkCodeModal />
        <EnterLinkCodeModal getLinkedUsers={getLinkedUsers} />
        <div className="w-100">
          <LinkedUserCardContainer>{userCards}</LinkedUserCardContainer>
        </div>
      </div>
    </div>
  );
};

export default LinkedUsers;
