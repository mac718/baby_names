import { useState } from "react";

const EditAccountEmail = ({ currentEmail }) => {
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleEmailChange = (e) => {
    let value = e.target.value;
    setNewEmail(value);
  };

  return (
    <section id="editEmail">
      <div className="fw-bold">Email</div>
      <div className="d-flex justify-content-between">
        {editEmail ? (
          <div className="d-flex">
            <input
              type="text"
              defaultValue={currentEmail}
              onChange={handleEmailChange}
            />
            <button className="btn btn-success ms-2">Save Email</button>
          </div>
        ) : (
          currentEmail
        )}
        <button
          className="btn text-primary"
          onClick={() => setEditEmail(!editEmail)}
        >
          edit email
        </button>
      </div>
    </section>
  );
};

export default EditAccountEmail;
