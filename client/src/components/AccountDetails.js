import { useState, useEffect } from "react";
import EditAccountEmail from "./EditAccountEmail";
import EditFirstName from "./EditFirstName";
import EditLastName from "./EditLastName";

const AccountDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const [editEmail, setEditEmail] = useState(false);

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
          <EditLastName currentLastName={lastName} />
        </li>
        <li className="list-group-item">
          <EditAccountEmail currentEmail={email} />
        </li>
        <li className="list-group-item">
          <button
            className="btn btn-info fw-bold"
            onClick={() => setHidden(!hidden)}
          >
            Change Password
          </button>
          <div hidden={hidden}>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              className="form-control w-50 me-1 mb-4"
              type="password"
              id="currentPassword"
            />
            <label htmlFor="newPassword">New Password</label>
            <input
              className="form-control w-50 me-1 mb-1"
              type="password"
              id="newPassword"
            />
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              className="form-control w-50 me-1 mt-1"
              type="password"
              id="confirmPassword"
            />
            <button className="btn btn-primary mt-3 m-auto">
              Save Password
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AccountDetails;
