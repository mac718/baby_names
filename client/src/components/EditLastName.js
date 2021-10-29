import { useState } from "react";

const EditLastName = ({ currentLastName }) => {
  const [newLasttName, setNewLastName] = useState("");
  const [editLastName, setEditLastName] = useState(false);
  console.log(editLastName);

  const handleLastNameChange = (e) => {
    let value = e.target.value;
    setNewLastName(value);
  };

  return (
    <section id="editLastName">
      <div className="fw-bold">First Name</div>
      <div className="d-flex justify-content-between">
        {editLastName ? (
          <div>
            <input
              type="text"
              defaultValue={currentLastName}
              onChange={() => handleLastNameChange}
            />
            <button className="btn btn-success ms-2">Save Last Name</button>
          </div>
        ) : (
          currentLastName
        )}
        <button
          className="btn text-primary"
          onClick={() => setEditLastName(!editLastName)}
        >
          edit Last name
        </button>
      </div>
    </section>
  );
};

export default EditLastName;
