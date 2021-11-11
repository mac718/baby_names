import { useState } from "react";

const EditLastName = ({ currentLastName, getCurrentUser }) => {
  const [newLastName, setNewLastName] = useState("");
  const [editLastName, setEditLastName] = useState(false);
  console.log(editLastName);

  const handleLastNameChange = (e) => {
    let value = e.target.value;
    setNewLastName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users", {
      method: "PATCH",
      body: JSON.stringify({ property: "lastName", lastName: newLastName }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(() => {
        setEditLastName(false);
        getCurrentUser();
      })
      .catch((err) => alert(err));
  };

  return (
    <section id="editLastName">
      <div className="fw-bold">Last Name</div>
      <div className="d-flex justify-content-between">
        {editLastName ? (
          <div className="d-flex">
            <input
              type="text"
              defaultValue={currentLastName}
              onChange={handleLastNameChange}
            />
            <button
              className="btn btn-outline-info ms-2"
              onClick={handleSubmit}
            >
              Save Last Name
            </button>
          </div>
        ) : (
          currentLastName
        )}
        <button
          className="btn text-primary ms-2"
          onClick={() => setEditLastName(!editLastName)}
        >
          edit Last name
        </button>
      </div>
    </section>
  );
};

export default EditLastName;
