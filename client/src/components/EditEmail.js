import { useState } from "react";

const EditEmail = ({ currentEmail, getCurrentUser }) => {
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleEmailChange = (e) => {
    let value = e.target.value;
    setNewEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users", {
      method: "PATCH",
      body: JSON.stringify({ property: "email", email: newEmail }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(() => {
        setEditEmail(false);
        getCurrentUser();
      })
      .catch((err) => alert(err));
  };

  return (
    <section id="editEmail">
      <div className="fw-bold">Email</div>
      <div className="d-flex justify-content-between min-width-50vw">
        {editEmail ? (
          <div className="d-flex">
            <input
              type="text"
              defaultValue={currentEmail}
              onChange={handleEmailChange}
            />
            <button
              className="btn btn-outline-info ms-2"
              onClick={handleSubmit}
            >
              Save Email
            </button>
          </div>
        ) : (
          currentEmail
        )}
        <button
          className="btn text-primary ms-2"
          onClick={() => setEditEmail(!editEmail)}
        >
          edit email
        </button>
      </div>
    </section>
  );
};

export default EditEmail;
