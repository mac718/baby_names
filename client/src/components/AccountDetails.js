import { useState, useEffect } from "react";
import EditEmail from "./EditEmail";
import EditFirstName from "./EditFirstName";
import EditLastName from "./EditLastName";
import EditPassword from "./EditPassword";

const AccountDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getCurrentUser = () => {
    fetch("http://localhost:3001/api/v1/users/getUser", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setFirstName(json.firstName);
        setLastName(json.lastName);
        setEmail(json.email);
        setPassword(json.password);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="container">
      <div className="fs-1 text-center mt-5 mb-5">Account Details</div>
      <ul className="list-group-flush w-50 m-auto">
        <li className="list-group-item">
          <EditFirstName
            currentFirstName={firstName}
            getCurrentUser={getCurrentUser}
          />
        </li>
        <li className="list-group-item">
          <EditLastName
            currentLastName={lastName}
            getCurrentUser={getCurrentUser}
          />
        </li>
        <li className="list-group-item">
          <EditEmail currentEmail={email} getCurrentUser={getCurrentUser} />
        </li>
        <li className="list-group-item">
          <EditPassword getCurrentUser={getCurrentUser} />
        </li>
      </ul>
    </div>
  );
};

export default AccountDetails;
