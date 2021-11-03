import { useState } from "react";

const Filters = ({ fetchNames }) => {
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedOrigin, setSelectedOrigin] = useState("All");

  const handleGenderChange = (e) => {
    let value = e.target.innerHTML;
    console.log(value);
    setSelectedGender(value);
  };
  const handleOriginChange = (e) => {
    let value = e.target.innerHTML;
    console.log(value);
    setSelectedOrigin(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNames(selectedGender, selectedOrigin);
  };
  return (
    <form className="d-flex flex-row mt-3" onSubmit={handleSubmit}>
      <div className="dropdown m-2">
        <a
          className="btn btn-outline-secondary dropdown-toggle"
          href="#"
          role="button"
          id="gender"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter Gender
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a
              className="dropdown-item active"
              href="#"
              onClick={handleGenderChange}
            >
              All
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleGenderChange}>
              Male
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleGenderChange}>
              Female
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleGenderChange}>
              Neutral
            </a>
          </li>
        </ul>
        <div>{selectedGender}</div>
      </div>
      <div className="dropdown m-2">
        <a
          className="btn btn-outline-secondary dropdown-toggle"
          href="#"
          role="button"
          id="gender"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          value={selectedGender}
        >
          Filter Origin
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a
              className="dropdown-item active"
              href="#"
              onClick={handleOriginChange}
            >
              All
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleOriginChange}>
              Male
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleOriginChange}>
              Europe
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleOriginChange}>
              Africa
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleOriginChange}>
              Asia
            </a>
          </li>
        </ul>
        <div>{selectedOrigin}</div>
      </div>
      <div>
        <button
          className="btn btn-outline-primary btn-sm mt-2 ms-2"
          type="submit"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default Filters;
