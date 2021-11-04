import { useState } from "react";

const EditPassword = ({ getCurrentUser }) => {
  const [hidden, setHidden] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState();

  const handleCurrentPasswordChange = (e) => {
    let value = e.target.value;
    setCurrentPassword(value);
  };

  const handleNewPasswordChange = (e) => {
    let value = e.target.value;
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    let value = e.target.value;
    setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users", {
      method: "PATCH",
      body: JSON.stringify({
        property: "password",
        currentPassword,
        newPassword,
        confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        setError(false);
        if (res.status === 200) {
          setHidden(!hidden);
          setSuccessMessage("Password successfully changed!");
          getCurrentUser();
        } else {
          return res.json();
        }
      })
      .then((json) => {
        if (json) {
          setError(json.msg);
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      <button
        className="btn btn-info fw-bold"
        onClick={() => setHidden(!hidden)}
      >
        Change Password
      </button>
      <div hidden={hidden} style={{ "min-width": "60vw" }}>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          className="form-control w-50 me-1 mb-4"
          type="password"
          id="currentPassword"
          onChange={handleCurrentPasswordChange}
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          className="form-control w-50 me-1 mb-1"
          type="password"
          id="newPassword"
          onChange={handleNewPasswordChange}
        />
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          className="form-control w-50 me-1 mt-1"
          type="password"
          id="confirmPassword"
          onChange={handleConfirmPasswordChange}
        />
        <button className="btn btn-primary mt-3 m-auto" onClick={handleSubmit}>
          Save Password
        </button>
      </div>
      {successMessage && <div className="text-success">{successMessage}</div>}
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default EditPassword;
