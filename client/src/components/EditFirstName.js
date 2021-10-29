import { useState } from "react";

const EditFirstName = ({ currentFirstName }) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [editFirstName, setEditFirstName] = useState(false);
  console.log(editFirstName);

  const handleFirstNameChange = (e) => {
    let value = e.target.value;
    setNewFirstName(value);
  };

  return (
    <section id="editFirstName">
      <div className="fw-bold">First Name</div>
      <div className="d-flex justify-content-between">
        {editFirstName ? (
          <div>
            <input
              type="text"
              defaultValue={currentFirstName}
              onChange={() => handleFirstNameChange}
            />
            <button className="btn btn-success ms-2">Save First Name</button>
          </div>
        ) : (
          currentFirstName
        )}
        <button
          className="btn text-primary"
          onClick={() => setEditFirstName(!editFirstName)}
        >
          edit first name
        </button>
      </div>
    </section>
  );
};

export default EditFirstName;
