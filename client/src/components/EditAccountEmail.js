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
          currentEmail
        ) : (
          <div>
            <input
              type="email"
              defaultValue={currentEmail}
              onChange={handleEmailChange}
            />
            <button className="btn btn-success">Save Email</button>
          </div>
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
