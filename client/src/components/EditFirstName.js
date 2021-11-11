import { useState } from "react";

const EditFirstName = ({ currentFirstName, getCurrentUser }) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [editFirstName, setEditFirstName] = useState(false);
  console.log(editFirstName);

  const handleFirstNameChange = (e) => {
    let value = e.target.value;
    setNewFirstName(value);
    console.log(newFirstName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users", {
      method: "PATCH",
      body: JSON.stringify({ property: "firstName", firstName: newFirstName }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(() => {
        setEditFirstName(false);
        getCurrentUser();
      })
      .catch((err) => alert(err));
  };

  return (
    <section id="editFirstName">
      <div className="fw-bold">First Name</div>
      <div className="d-flex justify-content-between">
        {editFirstName ? (
          <div className="d-flex">
            <input
              type="text"
              defaultValue={currentFirstName}
              onChange={handleFirstNameChange}
              className="min-vw-50"
            />
            <button
              className="btn btn-outline-info ms-2"
              onClick={handleSubmit}
            >
              Save First Name
            </button>
          </div>
        ) : (
          currentFirstName
        )}
        <button
          className="btn text-primary ms-2"
          onClick={() => setEditFirstName(!editFirstName)}
        >
          edit first name
        </button>
      </div>
    </section>
  );
};

export default EditFirstName;
